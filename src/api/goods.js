$(function () {
    // let goodsId = location.href.split('?')[1].split('=')[1]
    let goodsId = getParams('gid')
    // console.log(goodsId);
    $.get('http://kg.zhaodashen.cn/v1/goods/detail.jsp', {
        goodsId
    }, res1 => {
        console.log('http://kg.zhaodashen.cn/v1/goods/detail.jsp,返回值：',res1.data);
        let r1 = res1.data;
        let cat = r1.cat_id;
        $.post('http://kg.zhaodashen.cn/v1/category/attr.jsp', {
            cat
        }, res2 => {
            console.log('http://kg.zhaodashen.cn/v1/category/attr.jsp,返回值：',res2.data);
            let html = `
				<h3><strong>${r1.goods_name}</strong></h3>
				
				<!-- 图片预览区域 start -->
				<div class="preview fl">
					<div class="midpic">
						<a href="images/preview_l1.jpg" class="jqzoom" rel="gal1">   <!-- 第一幅图片的大图 class 和 rel属性不能更改 -->
							<img src="http://tmp00001.zhaodashen.cn/${r1.goods_img}" width="100%" alt="" />               <!-- 第一幅图片的中图 -->
						</a>
					</div>
	
					<!--使用说明：此处的预览图效果有三种类型的图片，大图，中图，和小图，取得图片之后，分配到模板的时候，把第一幅图片分配到 上面的midpic 中，其中大图分配到 a 标签的href属性，中图分配到 img 的src上。 下面的smallpic 则表示小图区域，格式固定，在 a 标签的 rel属性中，分别指定了中图（smallimage）和大图（largeimage），img标签则显示小图，按此格式循环生成即可，但在第一个li上，要加上cur类，同时在第一个li 的a标签中，添加类 zoomThumbActive  -->

					<div class="smallpic">
						<a href="javascript:;" id="backward" class="off"></a>
						<a href="javascript:;" id="forward" class="on"></a>
						<div class="smallpic_wrap">
							<ul>
								<li class="cur">
									<a class="zoomThumbActive" href="javascript:void(0);" rel="{gallery: 'gal1', smallimage: 'images/preview_m1.jpg',largeimage: 'images/preview_l1.jpg'}"><img src="./imgs/preview_s1.jpg"></a>
								</li>
								<li>
									<a href="javascript:void(0);" rel="{gallery: 'gal1', smallimage: 'images/preview_m2.jpg',largeimage: 'images/preview_l2.jpg'}"><img src="./imgs/preview_s2.jpg"></a>
								</li>
								<li>
									<a href="javascript:void(0);" 
									rel="{gallery: 'gal1', smallimage: 'images/preview_m3.jpg',largeimage: 'images/preview_l3.jpg'}">  
	    							<img src="./imgs/preview_s3.jpg"></a>
								</li>
								<li>
									<a href="javascript:void(0);" 
									rel="{gallery: 'gal1', smallimage: 'images/preview_m4.jpg',largeimage: 'images/preview_l4.jpg'}">  
	    							<img src="./imgs/preview_s4.jpg"></a>
								</li>
								<li>
									<a href="javascript:void(0);" 
									rel="{gallery: 'gal1', smallimage: 'images/preview_m5.jpg',largeimage: 'images/preview_l5.jpg'}">  
	    							<img src="./imgs/preview_s5.jpg"></a>
								</li>
								<li>
									<a href="javascript:void(0);" 
									rel="{gallery: 'gal1', smallimage: 'images/preview_m6.jpg',largeimage: 'images/preview_l6.jpg'}">  
	    							<img src="./imgs/preview_s6.jpg"></a>
								</li>
								<li>
									<a href="javascript:void(0);" 
									rel="{gallery: 'gal1', smallimage: 'images/preview_m7.jpg',largeimage: 'images/preview_l7.jpg'}">  
	    							<img src="./imgs/preview_s7.jpg"></a>
								</li>
								<li>
									<a href="javascript:void(0);" 
									rel="{gallery: 'gal1', smallimage: 'images/preview_m8.jpg',largeimage: 'images/preview_l8.jpg'}">  
	    							<img src="./imgs/preview_s8.jpg"></a>
								</li>
								<li>
									<a href="javascript:void(0);" 
									rel="{gallery: 'gal1', smallimage: 'images/preview_m9.jpg',largeimage: 'images/preview_l9.jpg'}">  
	    							<img src="./imgs/preview_s9.jpg"></a>
								</li>
							</ul>
						</div>
						
					</div>
				</div>
				<!-- 图片预览区域 end -->

				<!-- 商品基本信息区域 start -->
				<div class="goodsinfo fl ml10">
					<ul>
						<li><span>商品编号： </span>${r1.goods_id}</li>
						<li class="market_price"><span>定价：</span><em>￥${r1.market_price}</em></li>
						<li class="shop_price"><span>本店价：</span> <strong>￥${r1.shop_price}</strong> <a href="">(降价通知)</a></li>
						<li><span>上架时间：</span>${r1.add_time}</li>
						<li class="star"><span>商品评分：</span> <strong></strong><a href="">(已有${r1.click_count}人评价)</a></li> <!-- 此处的星级切换css即可 默认为5星 star4 表示4星 star3 表示3星 star2表示2星 star1表示1星 -->
					</ul>
					<form action="" method="post" class="choose">
						<ul>
							<li class="product">
								<dl>
									<dt>颜色：</dt>
									<dd>
										<a class="selected" href="javascript:;">黑色 <input type="radio" name="color" value="黑色" checked="checked" /></a>
										<a href="javascript:;">白色 <input type="radio" name="color" value="白色" /></a>
										<a href="javascript:;">蓝色 <input type="radio" name="color" value="蓝色" /></a>
										<input type="hidden" name="" value="" />
									</dd>
								</dl>
							</li>

							<li class="product">
								<dl>
									<dt>版本：</dt>
									<dd>
										<a href="javascript:;">i3 4G内存版 <input type="radio" name="ver" value="" /></a>
										<a href="javascript:;">i5 4G内存版 <input type="radio" name="ver" value=""  /></a>
										<a class="selected" href="javascript:;">i5 8G内存版<input type="radio" name="ver" value="" checked="checked" /></a>
										<a href="javascript:;">SSD超极本 <input type="radio" name="ver" value="" /></a>
										<input type="hidden" name="" value="" />
									</dd>
								</dl>
							</li>
							
							<li>
								<dl>
									<dt>购买数量：</dt>
									<dd>
										<a href="javascript:;" id="reduce_num"></a>
										<input type="text" name="amount" value="1" class="amount"/>
										<a href="javascript:;" id="add_num"></a>
									</dd>
								</dl>
							</li>

							<li>
								<dl>
									<dt>&nbsp;</dt>
									<dd>
										<input type="submit" value="" class="add_btn" />
									</dd>
								</dl>
							</li>

						</ul>
					</form>
				</div>
				<!-- 商品基本信息区域 end -->
			</div>
			<!-- 商品概要信息 end -->
            `
            $('.summary').html(html)
            $('.introduce div:eq(0) ul').html(`
                <li><span>商品名称：</span>${r1.goods_name}</li>
                <li><span>商品编号：</span>${r1.goods_id}</li>
                <li><span>品牌：</span>联想（Thinkpad）</li>
                <li><span>上架时间：</span>${r1.add_time}</li>
                <li><span>商品毛重：</span>${r1.goods_weight}</li>
                <li><span>商品产地：</span>中国大陆</li>
                <li><span>显卡：</span>集成显卡</li>
                <li><span>触控：</span>非触控</li>
                <li><span>厚度：</span>正常厚度（>25mm）</li>
                <li><span>处理器：</span>Intel i5</li>
                <li><span>尺寸：</span>12英寸</li>
            `)

        }, 'json')

        $.get('http://kg.zhaodashen.cn/v1/category/index.jsp', {
            cat_id: 662
        }, res => {
            $.each(res.data, function (index, item) {
                // console.log(index,item);
                if (item.cat_id === cat) {
                    // console.log(item);
                    $('.breadcrumb').html(`<h2>当前位置：<a href="">首页</a> > <a href="">${item.cat_name}</a> > <a href="">${item.keywords}</a> >${item.children[0].cat_name}</h2>`)
                    let html = ``
                    html+=`<h2><strong>相关分类</strong></h2>`
                    html+=`<div class="leftbar_wrap">`
                    html+=`<ul>`
                    // console.log(item.children[0].keywords.split('，'));
                    item.children[0].keywords.split('，').forEach(function(keword){
                        html+=`<li><a href="">${keword}</a></li>`
                    })
                    html+=`</ul>`
                    html+=`</div>`
                    $('.goods_left div').eq(0).html(html)
                };
            })
        }, 'json')
    }, 'json')
})