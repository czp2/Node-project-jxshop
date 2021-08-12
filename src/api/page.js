function Page(el, option) {
    // 构造函数中保存常用的属性
    // swiper 移动滑动插件  方向、自动播放时间...
    // page  上一页、下一页、总条数
    this.el = document.querySelector(el)
    option.pageInfo.totalPage =  Math.ceil(option.pageInfo.totalData /  option.pageInfo.pageSize)
    this.option = option
    // 启动插件
    this.init()
}


// 启动插件
Page.prototype.init = function() {
    // 创建分页标签追加到盒子中
    this.createPageTag()
    // 在分页标签的基础上追加分页页码  留心1：在分页标签中创建分页页码
    // 绑定点击事件切换页码
    this.setBoxEvent()
    // ..
}

// 给每个盒子绑定点击事件，切换分页
Page.prototype.setBoxEvent = function() {// this === 构造函数this === new出来对象
    // 盒子绑定点击事件
    // this.el.addEventListener('click', function(e) { // this 事件源
    this.el.addEventListener('click', (e) => { // this === 构造函数this === new出来对象
        // 1. 判断你点击的是谁
        let eObj = e || window.event
        let target = eObj.target || eObj.srcElement
        let val = target.innerText   
        // console.log(target) // 操作的标签
        // 判断
        // 2. 更改当前页
        // 3. 重新调用创建分页标签   1 清空盒子里面的数据 2 创建标签 3 创建页码

        // if (target.nodeName == 'P' && val == '首页')
        if (target.nodeName == 'P' && val == this.option.pageTag.first)
        {
            this.option.pageInfo.pageNum = 1
            this.createPageTag()

            // console.log('当前页', this.option.pageInfo.pageNum)
            if (this.option.callback) this.option.callback(this.option.pageInfo.pageNum)
        }
        
        if (target.nodeName == 'P' && 
        val == this.option.pageTag.prev &&
        this.option.pageInfo.pageNum > 1)
        {
            this.option.pageInfo.pageNum -= 1
            this.createPageTag()

            console.log('当前页', this.option.pageInfo.pageNum)
            if (this.option.callback) this.option.callback(this.option.pageInfo.pageNum)
        }

        // 页码
        // val 上一页、下一页等等  parseInt   NaN     isNaN  true
        // val span ...          parseInt   NaN     isNaN  true
        // val 数字              parseInt   数值型   isNaN  false
        if (target.nodeName == 'P' && !isNaN(parseInt(val)))
        {
            // this.option.pageInfo.pageNum = val
            // 留心：只要从网页获取的数据都是字符串
            this.option.pageInfo.pageNum = parseInt(val)
            this.createPageTag()
            
            console.log('当前页', this.option.pageInfo.pageNum)
            if (this.option.callback) this.option.callback(this.option.pageInfo.pageNum)
        }
        

        if (target.nodeName == 'P' && 
            val == this.option.pageTag.next &&
            this.option.pageInfo.pageNum < this.option.pageInfo.totalPage
            )
        {
            this.option.pageInfo.pageNum += 1
            this.createPageTag()
            
            console.log('当前页', this.option.pageInfo.pageNum)
            if (this.option.callback) this.option.callback(this.option.pageInfo.pageNum)
        }
        
        if (target.nodeName == 'P' && val == this.option.pageTag.last)
        {
            this.option.pageInfo.pageNum = this.option.pageInfo.totalPage
            this.createPageTag()
            
            console.log('当前页', this.option.pageInfo.pageNum)
            if (this.option.callback) this.option.callback(this.option.pageInfo.pageNum)
        }
    })
}

// 创建分页标签
Page.prototype.createPageTag = function() {

    // 清空
    this.el.innerHTML = ''

    // 获取pageTag遍历创建分页标签
    let pageTag = this.option.pageTag
    // 遍历
    for (let key in pageTag){
        // console.log(key, pageTag.key, pageTag[key])
        // 创建标签
        let pObj = document.createElement('p')

        if (pageTag[key] != '待填充')
        {
            pObj.innerText = pageTag[key]
            pObj.style.margin = '0 5px'
            pObj.style.padding = '0 5px'
            pObj.style.border = 'solid 1px black'
        }

        // 追加：父.appendChild(子)
        this.el.appendChild(pObj)
    }

    // 设置禁用
    this.disabled()

    // 创建分页页码
    this.createPageNum()
}

// 禁用标签
Page.prototype.disabled = function() {
    
    let pObjs = this.el.querySelectorAll('p')  // 5 因为标签创建完毕就5个
    if (this.option.pageInfo.pageNum == 1)
    {
        pObjs[0].style.background = '#ccc'
        pObjs[1].style.background = '#ccc'
        pObjs[0].style.cursor = 'not-allowed'
        pObjs[1].style.cursor = 'not-allowed'
    }

    if (this.option.pageInfo.pageNum == this.option.pageInfo.totalPage)
    {
        pObjs[3].style.background = '#ccc'
        pObjs[4].style.background = '#ccc'
        pObjs[3].style.cursor = 'not-allowed'
        pObjs[4].style.cursor = 'not-allowed'
    }
}

// 创建分页页码
Page.prototype.createPageNum = function() {
    // 步骤1：获取box分页标签盒子
    let boxObj = this.el.querySelector('p:nth-child(3)')
    boxObj.style.display = 'flex'

    // 步骤2：通过循环创建5个分页页码
    // for (let i = 1; i<=this.option.pageInfo.totalPage; i++)
    // for (let i = 1; i<=5; i++) this.appendSon(boxObj, 'p', i)

    // 1 2 3 4 5 ... 99 100   pageno < 5
    // 1 2 3 4 5 6 7... 99 100   pageno == 5
    // 1 2 ... 4 5 6 7 8 ... 99 100   pageno > 5 && pageno<总页数-4
    // 1 2 ... 5  pageno>=总页数-4
    if (this.option.pageInfo.pageNum < 5)
    {
        for (let i = 1; i<=5; i++) this.appendSon(boxObj, 'p', i)
        this.appendSon(boxObj, 'span', '...')
        this.appendSon(boxObj, 'p', this.option.pageInfo.totalPage - 1)
        this.appendSon(boxObj, 'p', this.option.pageInfo.totalPage)
    } else if (this.option.pageInfo.pageNum == 5) {
        for (let i = 1; i<=7; i++) this.appendSon(boxObj, 'p', i)
        this.appendSon(boxObj, 'span', '...')
        this.appendSon(boxObj, 'p', this.option.pageInfo.totalPage - 1)
        this.appendSon(boxObj, 'p', this.option.pageInfo.totalPage)
    } else if (this.option.pageInfo.pageNum > 5 && this.option.pageInfo.pageNum < this.option.pageInfo.totalPage - 4) {
        this.appendSon(boxObj, 'p', 1)
        this.appendSon(boxObj, 'p', 2) 
        this.appendSon(boxObj, 'span', '...')
        for (let i = this.option.pageInfo.pageNum - 2; i <= this.option.pageInfo.pageNum+2; i++)  this.appendSon(boxObj, 'p', i)   
        this.appendSon(boxObj, 'span', '...')
        this.appendSon(boxObj, 'p', this.option.pageInfo.totalPage - 1)
        this.appendSon(boxObj, 'p', this.option.pageInfo.totalPage)
    } else if (this.option.pageInfo.pageNum >= this.option.pageInfo.totalPage - 4) {
        this.appendSon(boxObj, 'p', 1)
        this.appendSon(boxObj, 'p', 2)
        this.appendSon(boxObj, 'span', '...')
        for (let i = this.option.pageInfo.totalPage - 4; i<=this.option.pageInfo.totalPage; i++)  this.appendSon(boxObj, 'p', i) 
    } 
}


// 创建标签
Page.prototype.appendSon = function(boxObj, tagName, content){

    // 1. 创建标签
    let tag = document.createElement(tagName)
    tag.innerText = content

    tag.style.margin = '0 5px'
    tag.style.padding = '0 5px'
    tag.style.border = 'solid 1px black'

    // 默认选中  内容 == 当前页
    if (content == this.option.pageInfo.pageNum) tag.style.background = 'orange'

    // 2. 追加
    boxObj.appendChild(tag)
}