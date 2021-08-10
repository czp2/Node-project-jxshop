$(function () {
    $('.login_btn').click(function (e) {
        e.preventDefault()

        let uname = $('input[name="username"]').val()
        let pwd = $('input[name="password"]').val()
        let captcha = $('input[name="checkcode"]').val()

        $.post('http://kg.zhaodashen.cn/v1/public/login.jsp', {
            uname,
            pwd,
            captcha
        }, res => {
            // console.log(res);
            alert(res.meta.msg)
            if (res.meta.state == 200) {
                let status = $('.chb').val()
                if(!status){
                    sessionStorage.setItem('uname', res.data.uname)
                    sessionStorage.setItem('token', res.data.token)
                }else{
                    localStorage.setItem('uname', res.data.uname)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('login_time', new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
                }
                history.back()
            }
        }, 'json')
    })


})