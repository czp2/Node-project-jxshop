$(function () {
    //获取token
    const token = localStorage.getItem('token')

    //封装 调用地址接口
    function getAddressList() {
        $.ajax({
            async: false,
            url: "http://kg.zhaodashen.cn/v1/address/index.jsp",
            type: "get",
            data: {
                token
            },
            success: (res) => {
                console.log(res.data);

                let html = ``
                $('.address_select ul').html(html)
                $.each(res.data, (index, item) => {
                    if (item.is_default == 1) {
                        $('.address_info').html(`
                            <p>${item.consignee}  ${item.mobile} </p>
                            <p>${item.provinceName} ${item.cityName} ${item.districtName} ${item.address}</p>
                        `)
                        html += `
                            <li class="cur" aid="${item.address_id}">
                                <input type="radio" name="address" checked="checked" />${item.consignee} ${item.provinceName} ${item.cityName} ${item.districtName} ${item.address} ${item.mobile}
                                <a class="default" href="javascript:;">设为默认地址</a>
                                <a class="edit" href="./../address.html">编辑</a>
                                <a class="del" href="javascript:;">删除</a>
                            </li>
                            `
                    } else {
                        html += `
                        <li aid="${item.address_id}">
                            <input type="radio" name="address"/>${item.consignee} ${item.provinceName} ${item.cityName} ${item.districtName} ${item.address} ${item.mobile}
                            <a class="default" href="javascript:;">设为默认地址</a>
                            <a class="edit" href="./../address.html">编辑</a>
                            <a class="del" href="javascript:;">删除</a>
                        </li>
                        `
                    }
                })
                html += `<li><input type="radio" name="address" class="new_address"  onclick="location.href='./../address.html'"/>使用新地址</li>`
                $('.address_select>ul').html(html)
            },
            error: (err) => {},
            dataType: 'json'
        })
    }
    getAddressList()
    //设置为默认地址
    $('.address_select').on('click', 'a.default', function () {
        $.ajax({
            async: false,
            url: "http://kg.zhaodashen.cn/v1/address/default.jsp",
            type: "post",
            data: {
                token,
                address_id: $(this).parents('li').attr('aid')
            },
            success: (res) => {
                console.log(res.data);
                getAddressList()
            },
            error: (err) => {},
            dataType: 'json'
        })
    })
    //删除地址
    $('.address_select').on('click', 'a.del', function () {
        $.ajax({
            async: false,
            url: "http://kg.zhaodashen.cn/v1/address/delete.jsp",
            type: "post",
            data: {
                token,
                address_id: $(this).parents('li').attr('aid')
            },
            success: (res) => {
                console.log(res.data);
                getAddressList()
            },
            error: (err) => {},
            dataType: 'json'
        })
    })
    // 使用当前选中的地址
    $('.address_select').on('click', 'ul:eq(0) li:not(last)', function () {
        $(this).parent().children().removeAttr('class')
        $(this).addClass('cur')
        // console.log($(this).parent().children());
    })
    $('.address_select .confirm_btn').click(function () {
        let html = []
        $.each($('.address_select ul li.cur').text().trim().split(' '), (index, item) => {
            item = item.replaceAll(/\s/g, '')
            item = item.replaceAll(/设为默认地址编辑删除/g, '')
            // console.log(item);
            html.push(item);
        });
        // console.log(html);
        $('.address_info').html(`
            <p>${html[0]}  ${html[5]} </p>
            <p>${html[1]}  ${html[2]}  ${html[3]}  ${html[4]} </p>
        `)
        $('.address_select').hide()
        $(".address_info").show();
        $('#address_modify').show()
    })
    //商品列表
    $.ajax({
        async: false,
        url: "http://kg.zhaodashen.cn/v1/cart/index.jsp",
        type: "get",
        // headers: {},
        data: {
            token
        },
        success: (res1) => {
            let html = ``
            let totalNum = 0
            let totalPrice = 0
            $.each(res1.data, (index, item) => {
                totalNum++
                // console.log(item);
                totalPrice += item.goods_price * item.goods_number
                //数据填充
                $.ajax({
                    async: false,
                    url: "http://kg.zhaodashen.cn/v1/goods/detail.jsp",
                    type: "get",
                    data: {
                        goodsId: item.goods_id
                    },
                    success: (res2) => {
                        // console.log(res2.data);
                        html += `
                        <tr>
                        <td class="col1"><a href=""><img src="http://tmp00001.zhaodashen.cn/${res2.data.goods_img}" alt="" /> ${item.goods_name}</a></strong></td>
                        <td class="col2"> <p>颜色：073深红</p> <p>尺码：170/92A/S</p> </td>
                        <td class="col3">￥${item.goods_price}</td>
                        <td class="col4"> ${item.goods_number}</td>
                        <td class="col5"><span>￥${item.goods_price*item.goods_number}</span></td>
                        </tr>
                        `
                    },
                    error: (err) => {},
                    dataType: 'json'
                })
            })
            // 放到页面
            $('#total').html(totalPrice)
            $('.goods tbody').html(html)
            $('.goods tfoot').html(`
                        <tr>
							<td colspan="5">
								<ul>
									<li>
										<span>${totalNum} 件商品，总商品金额：</span>
										<em>￥${totalPrice}</em>
									</li>
									<li>
										<span>返现：</span>
										<em>-￥0.00</em>
									</li>
									<li>
										<span>运费：</span>
										<em>￥0.00</em>
									</li>
									<li>
										<span>应付总额：</span>
										<em>￥${totalPrice}</em>
									</li>
								</ul>
							</td>
						</tr>
            `)
            $('.fillin_ft p').html(`应付总额：<strong>￥${totalPrice}元</strong>`)
        },
        error: (err) => {},
        dataType: 'json'
    })

    $('.fillin_ft a').click(function(){
        $.ajax({
            async: false,
            url: "http://kg.zhaodashen.cn/v1/order/create.jsp",
            type: "post",
            data: {
                token,
            },
            success: (res) => {
                console.log(res.data);
                if(res.meta.state == 201){
                    alert('订单创建成功')
                    setTimeout(()=>{
                        location.href = `./../flow3.html?sn=${res.data.order_sn}&price=${res.data.total_price}`
                    },500)
                }
            },
            error: (err) => {},
            dataType: 'json'
        })
    })
})