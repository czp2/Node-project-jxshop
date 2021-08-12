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