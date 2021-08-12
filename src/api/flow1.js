function getOrderList(token) {
    $.ajax({
        async: false,
        url: "/qfApi/cart/index.jsp",
        type: "get",
        // headers: {},
        data: {
            token
        },
        success: (res1) => {
            let html = ``
            let totalPrice = 0
            $.each(res1.data, (index, item) => {
                console.log(item);
                totalPrice += item.goods_price * item.goods_number
                //数据填充
                $.ajax({
                    async: false,
                    url: "/qfApi/goods/detail.jsp",
                    type: "get",
                    data: {
                        goodsId: item.goods_id
                    },
                    success: (res2) => {
                        console.log(res2.data);
                        html += `
                                    <tr gid="${item.goods_id}">
                                        <td class="col1"><a href=""><img src="http://tmp00001.zhaodashen.cn/${res2.data.goods_img}" alt="" /></a> 
                                        <strong><a href="">${item.goods_name}</a></strong></td>
                                        <td class="col2"> <p>颜色：073深红</p> <p>尺码：170/92A/S</p> </td>
                                        <td class="col3">￥<span>${item.goods_price}</span></td>
                                        <td class="col4"> 
                                            <a href="javascript:;" class="reduce_num"></a>
                                            <input type="text" name="amount" value="${item.goods_number}" class="amount"/>
                                            <a href="javascript:;" class="add_num"></a>
                                        </td>
                                        <td class="col5">￥<span>${item.goods_price*item.goods_number}</span></td>
                                        <td class="col6"><a href="javascript:;">删除</a></td>
                                    </tr>
                                `
                    },
                    error: (err) => {},
                    dataType: 'json'
                })
            })
            // 放到页面
            $('#total').html(totalPrice)
            $('.mycart table tbody').html(html)
        },
        error: (err) => {},
        dataType: 'json'
    })

}
$(function () {
    // ###列表
    let token = localStorage.getItem('token')
    if (!token) {
        alert('请登录，跳转中...')
        location.href = 'login.html'
        return
    }

    // 显示loading
    $('.mycart table tbody').html(`<tr><td colspan="7"><img style="width:200px;height:200px;" src="./../imgs/loading.gif" /></td></tr>`)
    getOrderList(token)

    //删除商品
    $('.mycart').on('click', `.col6 a`, function () {
        // console.log($(this).parents('tr').attr('gid'));
        let goods_id = $(this).parents('tr').attr('gid')
        $.ajax({
            async: false,
            url: "/qfApi/cart/delete.jsp",
            type: "post",
            data: {
                token,
                goods_id,
            },
            success: (res) => {
                getOrderList(token)
            },
            error: (err) => {},
            dataType: 'json'
        })
    })


    //数量增加
    $('.mycart').on('click', `.col4 .add_num`, function () {
        // console.log(1);
        let goodsId = $(this).parents('tr').attr('gid')
        $.ajax({
            async: false,
            url: "/qfApi/cart/update.jsp",
            type: "post",
            data: {
                goodsId,
                buyNum: parseInt($(this).prev().val()) + 1,
                token
            },
            success: (res) => {
                console.log(res.data);
                getOrderList(token)
            },
            error: (err) => {},
            dataType: 'json'
        })
    })

    //数量减少
    $('.mycart').on('click', `.col4 .reduce_num`, function () {
        // console.log(1);
        let goodsId = $(this).parents('tr').attr('gid')
        $.ajax({
            async: false,
            url: "/qfApi/cart/update.jsp",
            type: "post",
            data: {
                goodsId,
                buyNum: parseInt($(this).next().val()) - 1,
                token
            },
            success: (res) => {
                console.log(res.data);
                getOrderList(token)
            },
            error: (err) => {},
            dataType: 'json'
        })
    })

    //修改input
    $('.mycart').on('input', `.col4 input`, function () {
        // console.log(1);
        $(this).val($(this).val().replace(/\D/g,''))
    })
    $('.mycart').on('blur', `.col4 input`, function () {
        if($(this).val()<1) $(this).val(1)
        let goodsId = $(this).parents('tr').attr('gid')
        $.ajax({
            async: false,
            url: "/qfApi/cart/update.jsp",
            type: "post",
            data: {
                goodsId,
                buyNum: parseInt($(this).val()),
                token
            },
            success: (res) => {
                console.log(res.data);
                getOrderList(token)
            },
            error: (err) => {},
            dataType: 'json'
        })
    })
})