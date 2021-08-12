$(function () {
    let token = localStorage.getItem('token')
    //封装 调用物流列表接口
    function getOrderList() {
        $.get('/qfApi/order/index.jsp', {
            token,
            delete: 2
        }, res => {
            console.log(res)
            let orderStatus = ['未确认', '已确认', '已取消', '无效', '退货']
            let shippingStatus = ['未发货', '已发货', '已收货', '备货中']
            let payStatus = ['<font color=red>未付款</font>', '付款中', '<font color=green>已付款</font>']
            let html = ''
            let pendingPayment = rtbc = 0
            $.each(res.data, (index, item) => {
                let payHtml = ''
                if (payStatus[item.pay_status] != '<font color=green>已付款</font>') {
                    payHtml = `<a href="/qfApi/alipay/pagepay/pagepay.jsp?trade_no=${item.order_sn}&amount=${item.order_amount}">付款 |	</a>`
                }
                if(item.pay_status == 0) pendingPayment++
                if(item.shipping_status != 2) rtbc++
                html += `
					<tr> 
						<td>${item.order_sn}</td>
						<td>${orderStatus[item.order_status]}</td>
						<td>${shippingStatus[item.shipping_status]}</td>
						<td>${payStatus[item.pay_status]}</td>
						<td>${item.order_amount}</td>
						<td>${item.add_time_name}</td>
						<td>${item.consignee}</td>
						<td>${item.province}</td>
						<td>${item.city}</td>
						<td>${item.district}</td>
						<td>${item.tel}</td>
						<td>
							<a href="javascript:;" com="${item.com}" no="${item.no}" class="wl" >物流</a> |
							${payHtml}
							<a href="javascript:;" oid ="${item.order_id}" class="del">删除</a></td>
					</tr>
				`
            })
            $('.orders tbody').html(html)
            $('.order_hd dl:eq(0) dd:eq(0)').html(`待付款（${pendingPayment}）`)
            $('.order_hd dl:eq(0) dd:eq(1)').html(`待确认收货（${rtbc}）`)
        }, 'json')
    }
    getOrderList()
    // 查看物流
    $('table').on('click', '.wl', function (res) {
        let no = $(this).attr('no')
        // console.log(no)
        // 异步请求后期数据
        $.get(`https://biz.trace.ickd.cn/auto/${no}?mailNo=${no}`, {}, res => {
            console.log(res.data)
            let html = ''
            $.each(res.data, (index, item) => {
                // console.log(item)
                html += `${item.time}  ${item.context} \r\n`
            })

            alert(html)
        }, 'json')
    })
    // 删除
    $('table').on('click', '.del', function (res) {
        let orderId = $(this).attr('oid')
        // console.log(no)
        // 异步请求后期数据
        $.post(`/qfApi/order/delete.jsp`, {
            orderId,
            token
        }, res => {
            getOrderList()  
        }, 'json')
    })
})