$(function () {
    let token = localStorage.getItem('token')
    //封装 调用物流列表接口
    function getOrderList() {
        $.get('/qfApi/collect/index.jsp', {
            token,
        }, res => {
            console.log(res.data)
            let html = ''
            $.each(res.data, (index, item) => {
                html += `
					<tr> 
						<td>${item.goods_id}</td>
						<td>${item.goods_name}</td>
						<td><img src="http://tmp00001.zhaodashen.cn/${item.goods_img}"/></td>
						<td>
							<a href="javascript:;" gid="${item.goods_id}" class="wl" >加入购物车</a>
					</tr>
				`
            })
            $('.orders tbody').html(html)
        }, 'json')
    }
    getOrderList()

    //添加至购物车
	$('.orders').on('click', '.wl', function (e) {
		// console.log(1);
		e.preventDefault()
        let goodsId = $(this).attr('gid')
		$.post('/qfApi/cart/create.jsp', {
			goodsId,
			buyNum: 1,
			token
		}, res => {
			// console.log(res.data);
			if (confirm('是否前往购物车界面')) location.href = './../flow1.html'
		}, 'json')
	})
})