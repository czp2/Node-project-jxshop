//显示登录信息
let localUname = new Date().getTime() > localStorage.getItem('login_time') ? '' : localStorage.getItem('uname')
let localToken = new Date().getTime() > localStorage.getItem('login_time') ? '' : localStorage.getItem('token')

let sessionUname = localStorage.getItem('uname')
let sessionToken = localStorage.getItem('token')

let uname = localUname ? localUname : sessionUname
let token = localToken ? localToken : sessionToken

if(uname) document.write(`[<a href="user.html">${uname}</a>] [<a href="logout.html">退出</a>]`)
else document.write(`您好，欢迎来到京西！[<a href="login.html">登录</a>] [<a href="regist.html">免费注册</a>]`) 