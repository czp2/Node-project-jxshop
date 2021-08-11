$(function () {
    let token = localStorage.getItem('token')
    //封装 获取地址列表
    function getAddressList() {
        $.ajax({
            async: false,
            url: "http://kg.zhaodashen.cn/v1/address/index.jsp",
            type: "get",
            data: {
                token,
            },
            success: (res) => {
                console.log(res.data);
                let html = ``
                html += `<h3>收货地址薄</h3>`
                $.each(res.data, (index, item) => {
                    html += `
                    <dl aid="${item.address_id}">
                        <dt>${index+1}.${item.consignee} ${item.provinceName} ${item.cityName} ${item.districtName} ${item.mobile} </dt>
                        <dd>
                            <a href="javascript:;" class='del'>删除</a>`
                    if (item.is_default==0) html += ` <a href="javascript:;" class='default'>设为默认地址</a>`
                    html += `</dd></dl>`
                })
                $('.address_hd').html(html)
            },
            error: (err) => {},
            dataType: 'json'
        })
    }
    getAddressList()
    //删除地址
    $('.address_hd').on('click', 'dl dd a.del', function () {
        $.ajax({
            async: false,
            url: "http://kg.zhaodashen.cn/v1/address/delete.jsp",
            type: "post",
            data: {
                token,
                address_id: $(this).parents('dl').attr('aid')
            },
            success: (res) => {
                console.log(res.data);
                getAddressList()
            },
            error: (err) => {},
            dataType: 'json'
        })
    })
    //设置为默认地址
    $('.address_hd').on('click', 'dl dd a.default', function () {
        console.log($(this));
        $.ajax({
            async: false,
            url: "http://kg.zhaodashen.cn/v1/address/default.jsp",
            type: "post",
            data: {
                token,
                address_id: $(this).parents('dl').attr('aid')
            },
            success: (res) => {
                console.log(res.data);
                getAddressList()
            },
            error: (err) => {},
            dataType: 'json'
        })
    })
    //选框 是否设为默认
    $('.address_bd .check').click(function (e) {
        // e.preventDefault()
        // console.log($(this).attr('value'));
        $(this).attr('value') == 1 ? $(this).attr('value', '0') : $(this).attr('value', '1')
    })
    //点击保存
    $('.address_bd .btn').click(function (e) {
        e.preventDefault()
        let formData = 'token=' + token + '&' + $('.address_bd form').serialize()
        // console.log(formData);
        $.ajax({
            async: false,
            url: "http://kg.zhaodashen.cn/v1/address/create.jsp",
            type: "post",
            data: formData,
            success: (res) => {
                $('.address_bd form')[0].reset()
                getAddressList()
            },
            error: (err) => {},
            dataType: 'json'
        })
    })
    // 省
    $('.address_bd ul li:eq(1) select:eq(0)').html('<option value="">请求中...</option>')
    $.get('http://kg.zhaodashen.cn/v1/area/index.jsp', {
        type: '省',
        pid: 1
    }, res => {
        // 遍历拼接数据
        let html = '<option value="">请选择</option>'
        $.each(res.data, (index, item) => {
            html += `<option value="${item.region_id}">${item.region_name}</option>`
        })
        // 放数据
        $('.address_bd ul li:eq(1) select:eq(0)').html(html)
    }, 'json')
    // 市
    $('.address_bd ul li:eq(1) select:eq(0)').change(function () {
        $('.address_bd ul li:eq(1) select:eq(1)').html('<option value="">请求中...</option>')
        // 1. 获取数据
        let val = $(this).val()
        // console.log(val)
        // 2. 继续发送异步请求
        $.get('http://kg.zhaodashen.cn/v1/area/index.jsp', {
            type: '市',
            pid: val
        }, res => {
            // 遍历拼接数据
            let html = '<option value="">请选择</option>'
            $.each(res.data, (index, item) => {
                html += `<option value="${item.region_id}">${item.region_name}</option>`
            })
            // 放数据
            $('.address_bd ul li:eq(1) select:eq(1)').html(html)
        }, 'json')
    })
    // 区县
    $('.address_bd ul li:eq(1) select:eq(1)').change(function () {
        $('.address_bd ul li:eq(1) select:eq(2)').html('<option value="">请求中...</option>')
        // 1. 获取数据
        let val = $(this).val()
        // console.log(val)
        // 2. 继续发送异步请求
        $.get('http://kg.zhaodashen.cn/v1/area/index.jsp', {
            type: '区/县',
            pid: val
        }, res => {
            // 遍历拼接数据
            let html = '<option value="">请选择</option>'
            $.each(res.data, (index, item) => {
                html += `<option value="${item.region_id}">${item.region_name}</option>`
            })
            // 放数据
            $('.address_bd ul li:eq(1) select:eq(2)').html(html)
        }, 'json')
    })
})