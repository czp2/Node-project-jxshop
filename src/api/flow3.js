$(function() {
	let sn = getParams('sn')
	let price = getParams('price')

	// 支付宝支付
	$('.payUrl').attr('href', `http://kg.zhaodashen.cn/v1/alipay/pagepay/pagepay.jsp?trade_no=${sn}&amount=${price}`)

	// 微信支付
	$('.box iframe').attr('src', 'http://kg.zhaodashen.cn/v1/wxpay/native.jsp?out_trade_no='+sn)

	$('#wxpay').click(function() {
		$('.box').css('display', 'block')
	})
	
	$('body').click(function(e) {
		if (e.target.nodeName=='IMG') return
		$('.box').css('display', 'none')
	})

	setInterval(() =>{
		$.post('http://kg.zhaodashen.cn/v1/wxpay/ispay.jsp?out_trade_no='+sn, {}, res => {
			if(res.meta.state == 201){
				alert('支付成功，跳转中...')
				location.href="./../order.html"
			}
		}, 'json')
	}, 1000)
})