$(function () {
    $('.login_btn').click(function (e) {
        e.preventDefault()

        let uname = $('input[name="username"]').val()
        let pwd = $('input[name="password"]').eq(0).val()
        let checkpwd = $('input[name="password"]').eq(1).val()
        let captcha = $('input[name="checkcode"]').val()

        if (checkpwd !== pwd) {
            alert('两次密码不一致')
            return
        }
        $.post('/qfApi/public/reg.jsp', {
            uname,
            pwd,
            captcha
        }, res => {
            // console.log(res);
            alert(res.meta.msg)
            if (res.meta.state == 201) {
                // location.href = './../login.html'
                history.back()
            }
        }, 'json')
    })

})