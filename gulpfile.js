// 导入模块
const gulp = require('gulp') // gulp模块，用于创建任务的
const uglify = require('gulp-uglify') // 压缩JS 去空格去注释
const babel = require('gulp-babel') // es6转es5 浏览器兼容 babel
const rev = require('gulp-rev') // 加随机名的，内容修改就重新生成新的随机名
const revCollector = require('gulp-rev-collector'); // 根据temp目录记录的规则 替换 html路径
const clean = require('gulp-clean') // 删除目录文件的
const minifyCSS = require('gulp-minify-css') // 压缩CSS 去空格去注释的
const imagemin = require('gulp-imagemin') // 压缩图片
const htmlmin = require('gulp-htmlmin') // 压缩HTML 去空格去注视


// 打包HTML任务
// gulp.task('html', () => {
gulp.task('html', over => {

    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS 
        minifyCSS: true //压缩页面CSS
    };
    gulp
        // .src('./src/html/*.html')
        // .src(['temp/**/*.json', './src/html/*.html'])
        .src(['temp/**/*.json', './src/*.html'])
        .pipe(revCollector())
        .pipe(htmlmin(options))
        // .pipe( gulp.dest('./dist/html/') )
        .pipe(gulp.dest('./dist/'))


    over()
})

// 打包IMG任务（图片不用加随机名）
// gulp.task('imgs', () => {
gulp.task('imgs', over => {
    gulp
        .src('./src/imgs/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/imgs/'))

    // over()

    setTimeout(() => {
        over()
    }, 30000) // 30s
})

// 打包CSS任务
// gulp.task('css', () => {
gulp.task('css', over => {
    gulp
        .src('./src/css/*.css')
        .pipe(minifyCSS())
        .pipe(rev())
        .pipe(gulp.dest('./dist/css/'))
        // ------------------------------
        // 每次打包
        // 将css对应的随机名保存到json中
        // ------------------------------
        .pipe(rev.manifest())
        .pipe(gulp.dest('temp/css'))

    over()
})

// 清除目录
const fs = require('fs');
// gulp.task('clean', () => {
gulp.task('clean', over => {

    if (fs.existsSync('dist/')) {
        gulp.src('dist/', {
                read: false
            })
            .pipe(clean());
    }


    // over()

    setTimeout(() => { // 因为clean这里面的代码都是异步的
        over()
    }, 2000)
})

// 打包JS任务
// gulp.task('js', () => {
// gulp.task('js', (over) => {
gulp.task('js', over => {
    // gulp.src('./src/js/a.js')
    // gulp.src(['./src/js/a.js', './src/js/b.js'])
    gulp.src('./src/js/*.js')
        // .pipe(模块名())
        .pipe(babel({
            "presets": ["env"]
        }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/js/'))
        // ------------------------------
        // 每次打包
        // 将js对应的随机名保存到json中
        // ------------------------------
        .pipe(rev.manifest())
        .pipe(gulp.dest('temp/js'))

    over()
})


// ============
// 练习
// gulp.test('test1', gulp.series(任务1,..,任务n, callback))
// gulp.task('a', over => {
//     // console.log('a');
//     setTimeout(()=> {
//         console.log('a');

//         over()
//     },1000)
// })
// gulp.task('b', over => {
//     console.log('b');
//     over()
// })
// // gulp.task('test1', gulp.parallel('a','b', ()=> { console.log('ok'); }))
// gulp.task('test1', gulp.series('a','b', ()=> { console.log('ok'); }))

// 批量打包
// gulp.task('piliangdabao', () => {})
gulp.task('build', gulp.series('clean', 'js', 'css', 'imgs', 'html', () => {
    // gulp clean
    // gulp js
    // gulp css
    // gulp imgs
    // gulp html
    console.log('BUILD打包完成');
}))


// 通过node搞web服务器开发的时候使用
const server = require('browser-sync').create();
const watch = require('gulp-watch');
const {createProxyMiddleware} = require('http-proxy-middleware');
gulp.task('serve', function () {
    server.init({
        server:'./src',
        port: 3000
    })
    // server.init({
    //     server: {
    //         baseDir: './src',
    //         middleware: [
    //             createProxyMiddleware('/api', {
    //                 // 目标服务器网址
    //                 target: "http://kg.zhaodashen.cn/v1/",
    //                 changeOrigin: true, // 是否允许跨域
    //                 secure: false,      // 关闭SSL证书验证https协议接口需要改成true
    //                 pathRewrite: {      // 重写路径请求
    //                     // 移除
    //                     // '^/remove/api' : ''
    //                     '^/api': ''
    //                 },
    //             })
    //         ]
    //     },
    //     port: 3000
    // })

    watch('src/*.html', function () {
        console.log('html change')
        server.reload()
    })

    watch('src/style/*', function () {
        console.log('style change')
        server.reload()
    })

    watch('src/js/*', function () {
        console.log('js change')
        server.reload()
    })

    watch('src/api/*', function () {
        console.log('api change')
        server.reload()
    })
})

// ============