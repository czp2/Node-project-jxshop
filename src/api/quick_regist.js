$(function () {
    let t
    let time = 60
    var handler = function (captchaObj) {
		captchaObj.appendTo('#captcha');
		captchaObj.onReady(function () {
			$("#wait").hide();
		});

		// 获取验证码
        $('.login_form .captchaBtn').click(function () {
            let mobile = $('.login_form input').eq(0).val()
            if (!/^1\d{10}$/.test(mobile)) return alert('手机号有误')
            var result = captchaObj.getValidate();
			if (!result) return alert('请完成验证');
            $.post('http://kg.zhaodashen.cn/v1/public/sendMsg.jsp', {
                mobile,
            }, res => {
                alert(res.meta.msg)
                if (res.meta.state == 201) {
                    $(this).attr('disabled', 'true')
                    $(this).css('background-color', 'gray')
                    t = setInterval(() => {
                        $(this).text(time)
                        time--
                        if (time < 0) {
                            $(this).text('获取验证码')
                            time = 60
                            $(this).removeAttr('disabled')
                            $(this).css('background-color', 'cornflowerblue')
                            clearInterval(t)
                        }
                    }, 1000)
                }
            }, 'json')
    
        })

		// 提交创建
        $('.login_form .createBtn').click(function (e) {
            let mobile = $('.login_form input').eq(0).val()
			if (!/^1\d{10}$/.test(mobile)) return alert('手机号有误')
            var result = captchaObj.getValidate();
			if (!result) return alert('请完成验证');
            let code = $('.login_form input').eq(1).val()
            let pwd = $('.login_form input').eq(2).val()
			if (!/^\d{4}$/.test(code)) return alert('验证码有误')
            $.post('http://kg.zhaodashen.cn/v1/public/reg2.jsp', {
                mobile,
                pwd,
                code
            }, res => {
                alert(res.meta.msg)
                if (res.meta.state == 201) {
                    history.back()
                }
            }, 'json')
        })
		window.gt = captchaObj;
	};
    
    // 默认即可验证码需要的别管。
	$.ajax({
		url: "https://www.geetest.com/demo/gt/register-slide?t=" + (new Date()).getTime(), // 加随机数防止缓存
		type: "get",
		dataType: "json",
		success: function (data) {

			$('#text').hide();
			$('#wait').show();
			// 调用 initGeetest 进行初始化
			// 参数1：配置参数
			// 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
			initGeetest({
				// 以下 4 个配置参数为必须，不能缺少
				gt: data.gt,
				challenge: data.challenge,
				offline: !data.success, // 表示用户后台检测极验服务器是否宕机
				new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机

				product: "popup", // 产品形式，包括：float，popup
				width: "300px",
				https: true

				// 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
			}, handler);
		}
	});
})