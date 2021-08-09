$(function () {
    //猜你喜欢
    $('.floor1 .goodslist div:first ul').html('')
    $.get('http://kg.zhaodashen.cn//v1/goods/like.jsp', {}, res => {
        // console.log(res);
        let html = ''
        $.each(res.data, (index, item) => {
            // console.log(item);
            //拼接
            html += `
            <li>
                <dl>
                    <dt><a href=""><img src="http://tmp00001.zhaodashen.cn/${item.goods_img}" alt="" /></a></dt>
                    <dd><a href="">${item.goods_name}</a></dd>
                    <dd><span>售价：</span> <strong>￥${item.market_price}</strong></dd>
                </dl>
            </li>
            `
        })
        //覆盖
        $('.floor1 .goodslist div:first ul').html(html)
    }, 'json')

    //热卖商品等
    let goodsTypes = {
        '热卖商品': 'hot',
        '推荐商品': 'best',
        '新品上架': 'new'
    }
    getGoodList(goodsTypes['热卖商品'], 0)
    $('.guide_content h2 span').mouseover(function () {
        let spanIndex = $(this).index();
        getGoodList(goodsTypes[$(this).text()], spanIndex)
    })

    /**
     * Description
     * @param {any} type
     * @param {any} spanIndex
     * @returns {any}
     */
    function getGoodList(type, spanIndex) {
        $.get('http://kg.zhaodashen.cn//v1/goods/index.jsp', {
            type,
        }, res => {
            let html = ``
            $.each(res.data.list, (index, item) => {
                html += `
					<li>
						<dl>
							<dt><a href="./goods.html?id=${item.goods_id}"><img src="http://tmp00001.zhaodashen.cn/${item.goods_img}" alt="" /></a></dt>
							<dd><a href="./goods.html?id=${item.goods_id}">${item.goods_name}</a></dd>
							<dd><span>售价：</span><strong> ￥${item.shop_price}</strong></dd>
						</dl>
					</li>
				`
            })
            // 放到页面中   
            $(`.guide_wrap div:eq(${spanIndex}) ul`).html(html)
        }, 'json')
    }

    //商品左侧列表
    $('.category .cat_bd').html('')
    $.get('http://kg.zhaodashen.cn/v1/category/index.jsp', {}, res => {
        // console.log(res.data);
        let html = ``
        $.each(res.data, (index, menu) => {
            if (index > 12) return
            // 一级
            html += `<div class="cat item1">`
            html += `<h3><a href="${menu.url ? menu.url : './list.html?keywords='+menu.keywords}">${menu.cat_name}</a> <b></b></h3>`
            html += `<div class="cat_detail">`
            // 二级
            $.each(menu.children, (index, menu2) => {
                if (index > 8) return
                html += `<dl class="dl_1st">`
                html += `<dt><a href="${menu2.url ? menu2.url : './list.html?keywords='+menu2.keywords}">${menu2.cat_name}</a></dt>`
                html += `<dd>`
                // 三级
                $.each(menu2.children, (index, menu3) => {
                    html += `<a href="${menu3.url ? menu3.url : './list.html?cat='+menu3.cat_id}">${menu3.cat_name}</a>`
                })
                html += `</dd>`
                html += `</dl>`
            })
            html += `</div>`
            html += `</div>`
        })
        // 放到页面中
        $('.category .cat_bd').html(html)
    }, 'json')

    //定位
    let locCity = sessionStorage.getItem('location') || '请选择城市'
    $('#location').text(locCity)
})