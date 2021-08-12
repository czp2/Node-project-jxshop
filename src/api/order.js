$(function () {
    let token = localStorage.getItem('token')
    $.ajax({
        async: false,
        url: "http://kg.zhaodashen.cn/v1/cart/index.jsp",
        type: "get",
        // headers: {},
        data: {
            token
        },
        success: (res1) => {
            // console.log(res1.data);
            let html = ``
            $.each(res1.data, (index, item) => {
                console.log(item);
                $.ajax({
                    async: false,
                    url: "http://kg.zhaodashen.cn/v1/goods/detail.jsp",
                    type: "get",
                    data: {
                        goodsId: item.goods_id
                    },
                    success: (res2) => {
                        console.log(res2.data);
                        html +=
                            `<tr>
                            <td class="col1"><a href=""><img src="http://tmp00001.zhaodashen.cn/${res2.data.goods_img}" alt="" /></a>  
                            <strong><a href="">${item.goods_name}</a></strong></td>
                            <td class="col2"> <p>颜色：073深红</p> <p>尺码：170/92A/S</p> </td>
                            <td class="col3">￥<span>${item.goods_price}</span></td>
                            <td class="col4"> 
                                <a href="javascript:;" style="display:inline-block" class="reduce_num"></a>
                                <input type="text" style="display:inline-block;width:20px" name="amount" value="${item.goods_number}" class="amount"/>
                                <a href="javascript:;" style="display:inline-block" class="add_num"></a>
                            </td>
                            <td class="col5">￥<span>${item.goods_price*item.goods_number}</span></td>
                            <td class="col6"><a href="">删除</a></td>
                        </tr>
                        `
                    },
                    error: (err) => {},
                    dataType: 'json'
                })
            })
            $('.orders tbody').html(html)
        },
        error: (err) => {},
        dataType: 'json'
    })
})