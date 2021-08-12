    /**
     * 获取地址栏GET参数
     * @param  {string} key 要获取的参数
     * @return {stirng}
     */
    function getParams(key) {
        // http://xxxx.com/?a=1&b=2&c=3
        // location.href                 http://xxxx.com/?a=1&b=2&c=3
        // location.search.substring(1)  a=1&b=2&c=3
        var params = window.location.search.substring(1); // cat=28&a=1&b=2
        var paramsArr = params.split("&")
        for (var i = 0; i < paramsArr.length; i++) {
            var temp = paramsArr[i].split("=")
            if (temp[0] == key) return decodeURI(temp[1])
        }
        return '';
    }

    /**
     * Description
     * @param {any} timestamp
     * @returns {any}
     */
    function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
    }

    $(function () {
        let token = localStorage.getItem('token')
        if (!token) {
            alert('请登录，跳转中...')
            location.href = 'login.html'
            return
        }
    })