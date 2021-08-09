/**
 * Description 异步请求封装函数--商品列表
 * @param {any} pageno
 * @param {any} pagesize=8
 * @param {any} keywords=''
 * @returns {any}
 */
function getListData(pageno, pagesize = 8, keywords = '', cat = '') {
    $.get('http://kg.zhaodashen.cn/v1/goods/index.jsp', {
        pageno,
        pagesize,
        keywords,
        cat
    }, res => {
        // console.log(res.data);
        let html = ''
        $.each(res.data.list, (index, item) => {
            html += `
                <li>
                    <dl>
                        <dt><a href=""><img src="http://tmp00001.zhaodashen.cn/${item.goods_img}" alt="" /></a></dt>
                            <dd><a href="">${item.goods_name}</a></dt>
                            <dd><strong>￥${item.market_price}</strong></dt>
                            <dd><a href=""><em>已有10人评价</em></a></dt>
                    </dl>
                </li>
            `
        })
        $('.goodslist ul').html(html)

        //分页控件
        // let pageTotal = Math.ceil(res.data.total / pagesize)
        // // console.log(pageTotal);
        // let pageHtml = ''
        // for (let i = 1; i <= pageTotal; i++) {
        //     if (i > 10 && i == parseInt(pageTotal / 2)) pageHtml += `<a href="javascript:">···</a>`
        //     else if (i > 5 && i < pageTotal - 5) pageHtml += ''
        //     else pageHtml += (i == pageno) ? `<a href="javascript:" class="cur">${i}</a>` : `<a href="javascript:">${i}</a>`
        // }
        // $('.page').html(pageHtml)
        var page1 = new Page('.page1', {
            pageTag : { // 分页标签
                first: '首页',
                prev: '上一页',
                box:  '待填充',
                next: '下一页',
                last: '末页',
            },
            pageInfo: {// 分页页码的数据
                pageNum:  pageno,     // 当前页数
                pageSize: 8,    // 每页显示条数  
                totalData: res.data.total, // 总条数 
                // totalPage: 100,  // 总页数 = 向上取整（总条数 / 每页显示条数）
            },
            callback(pagenum) { // 当你点击分页之后会触发callback返回第几页
                getListData(pagenum, 8)
            }
        })
    }, 'json')
}
$(function () {
    //首次进入调用函数请求
    let keywords = getParams('keywords')
    let cat = getParams('cat')
    // console.log(keywords);
    if (keywords) getListData(1, 8, keywords)
    else if (cat) getListData(1, 8, '', cat)
    else getListData(1)
    //点击搜索按钮发送请求
    let val = ''
    $('.search_form .btn').click(function (e) {
        // console.log(this);
        e.preventDefault()
        val = $(this).prev().val()
        getListData(1, 8, val)
    })
    //点击底部分页按钮跳转
    // $('.page').on('click', 'a', function () {
    //     if ($(this).text() !== '···') getListData($(this).text(), 8, val)
    // })

})