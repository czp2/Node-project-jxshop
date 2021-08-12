$(function () {
	// let goodsId = location.href.split('?')[1].split('=')[1]
	//获取传过来的参数
	let goodsId = getParams('gid')
	let token = localStorage.getItem('token')
	// console.log(goodsId);
	/**
	 * Description 封装 调用评论列表接口
	 */
	/**
	 * Description 封装 调用是否收藏接口
	 * @returns {any}
	 */
	function checkFolk() {
		$.ajax({
			async: true,
			url: '/qfApi/collect/find.jsp',
			type: 'get',
			data: {
				goodsId,
				token
			},
			success: (res) => {
				// console.log(res.data);
				if (res.meta.msg === '已收藏') {
					$('.summary .folk').addClass('folk_y')
					$('.summary .folk').val('已收藏')
				}
			},
			error: (err) => {},
			dataType: 'json'
		})
	}

	/**
	 * Description
	 * @returns {any}
	 */
	function getCommentList() {
		//获取所有评论
		$.ajax({
			async: true,
			url: '/qfApi/comment/index.jsp',
			type: 'get',
			data: {
				goodsId
			},
			success: (res) => {
				console.log(res.data);
				let html = ''
				html += `<div class="comment_summary">
								<div class="rate fl">
									<strong><em>90</em>%</strong> <br />
									<span>好评度</span>
								</div>
								<div class="percent fl">
									<dl>
										<dt>好评（90%）</dt>
										<dd>
											<div style="width:90px;"></div>
										</dd>
									</dl>
									<dl>
										<dt>中评（5%）</dt>
										<dd>
											<div style="width:5px;"></div>
										</dd>
									</dl>
									<dl>
										<dt>差评（5%）</dt>
										<dd>
											<div style="width:5px;"></div>
										</dd>
									</dl>
								</div>
								<div class="buyer fl">
									<dl>
										<dt>买家印象：</dt>
										<dd><span>屏幕大</span><em>(1953)</em></dd>
										<dd><span>外观漂亮</span><em>(786)</em></dd>
										<dd><span>系统流畅</span><em>(1091)</em></dd>
										<dd><span>功能齐全</span><em>(1109)</em></dd>
										<dd><span>反应快</span><em>(659)</em></dd>
										<dd><span>分辨率高</span><em>(824)</em></dd>
									</dl>
								</div>
							</div>`
				if (res.data.length != 0) {
					$.each(res.data, (index, item) => {
						html += `<div class="comment_items mt10">
						<div class="user_pic">
							<dl>
								<dt><a href=""><img src="./imgs/user1.gif" alt="" /></a></dt>
								<dd><a href="">${item.username}</a></dd>
							</dl>
						</div>
						<div class="item">
							<div class="title">
								<span>${timestampToTime(item.add_time)}</span>
								<strong class="star star${item.star}"></strong> <!-- star5表示5星级 start4表示4星级，以此类推 -->
							</div>
							<div class="comment_content">
								<dl>
									<dt>心得：</dt>
									<dd>${decodeURI(item.content)}</dd>
								</dl>
								<!--<dl>
									<dt>优点：</dt>
									<dd>${decodeURI(item.content)}</dd>
								</dl>-->
								<!--<dl>
									<dt>不足：</dt>
									<dd>${decodeURI(item.content)}</dd>
								</dl>-->
								<!--<dl>
									<dt>购买日期：</dt>
									<dd>2013-11-24</dd>
								</dl>-->
							</div>
							<div class="btns">
								<a href="" class="reply">回复(0)</a>
								<a href="" class="useful">有用(0)</a>
							</div>
						</div>
						<div class="cornor"></div>
					</div>
					`
					})
				} else {
					html += `
							<div class="comment_items mt10">
							<div class="user_pic">
								<dl>
									<dt><a href=""><img src="./imgs/user1.gif" alt="" /></a></dt>
									<dd><a href="">小爱同学</a></dd>
								</dl>
							</div>
							<div class="item">
								<div class="title">
									<strong>你好</strong>
								</div>
								<div class="comment_content">
									暂时没有评论
								</div>
								<div class="comment_content">
									快来发布吧
								</div>
								<div class="comment_content">
									！！！！！！
								</div>
							</div>
							<div class="cornor"></div>
						</div>
							`
				}
				html += `
				<!--  评论表单 start-->
						<div class="comment_form mt20">
							<form action="">
								<ul>
									<li>
										<label for=""> 评分：</label>
										<input type="radio" name="grade" value="5"/> <strong class="star star5"></strong>
										<input type="radio" name="grade" value="4"/> <strong class="star star4"></strong>
										<input type="radio" name="grade" value="3"/> <strong class="star star3"></strong>
										<input type="radio" name="grade" value="2"/> <strong class="star star2"></strong>
										<input type="radio" name="grade" value="1"/> <strong class="star star1"></strong>
									</li>

									<li>
										<label for="">评价内容：</label>
										<textarea name="content" id="" cols="" rows=""></textarea>
									</li>
									<li>
										<label for="">&nbsp;</label>
										<input type="submit" value="提交评论" class="comment_btn" />
									</li>
								</ul>
							</form>
						</div>
					<!--  评论表单 end-->`
				$('.comment').html(html)
			},
			error: (err) => {},
			dataType: 'json'
		})
	}

	//调用商品详情接口
	$.get('/qfApi/goods/detail.jsp', {
		goodsId
	}, res1 => {
		console.log('/qfApi/goods/detail.jsp,返回值：', res1.data);
		let r1 = res1.data;
		//类别id
		let cat = r1.cat_id;
		//调用商品属性接口（暂时没用）
		$.post('/qfApi/category/attr.jsp', {
			cat
		}, res2 => {
			console.log('/qfApi/category/attr.jsp,返回值：', res2.data);
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
									<a class="zoomThumbActive" href="javascript:void(0);" rel="{gallery: 'gal1', smallimage: 'images/preview_m1.jpg',largeimage: 'images/preview_l1.jpg'}">
                                    <img src="http://tmp00001.zhaodashen.cn/${r1.goods_img}"></a>
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
							<li>
								<dl>
									<dt>&nbsp;</dt>
									<dd>
									<input type="button" class="folk"/>
									</dd>
								</dl>
							</li>
					</ul>
					<form action="" method="post" class="choose">
						<ul>
							<!--<li class="product">
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
							</li>-->

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

		//调用商品所有分类接口
		$.get('/qfApi/category/index.jsp', {}, res => {
			$.each(res.data, function (index, item) {
				// console.log(index,item);
				//判断类别id是否一致
				$('.breadcrumb').html('没有此分类')
				$('.goods_left div').eq(0).html('没有此分类')
				if (item.cat_id === cat) {
					// console.log(item);
					$('.breadcrumb').html(`<h2>当前位置：<a href="">首页</a> > <a href="">${item.cat_name}</a> > <a href="">${item.keywords}</a> >${item.children[0].cat_name}</h2>`)
					let html = ``
					html += `<h2><strong>相关分类</strong></h2>`
					html += `<div class="leftbar_wrap">`
					html += `<ul>`
					// console.log(item.children[0].keywords.split('，'));
					item.children[0].keywords.split('，').forEach(function (keword) {
						html += `<li><a href="">${keword}</a></li>`
					})
					html += `</ul>`
					html += `</div>`
					$('.goods_left div').eq(0).html(html)
				};
			})
		}, 'json')

		getCommentList()
		checkFolk()

	}, 'json')

	//添加至购物车
	$('.summary').on('click', '.add_btn', function (e) {
		// console.log(1);
		e.preventDefault()
		$.post('/qfApi/cart/create.jsp', {
			goodsId,
			buyNum: 2,
			token
		}, res => {
			console.log(res.data);
			if (confirm('是否前往购物车界面')) location.href = './../flow1.html'
		}, 'json')
	})

	//添加至我的收藏
	$('.summary').on('click', '.folk', function (e) {
		// console.log(1);
		e.preventDefault()
		$.post('/qfApi/collect/create.jsp', {
			goodsId,
			token
		}, res => {
			// console.log(res.data);
			if (res.meta.state == 201) checkFolk()
			// if (confirm('是否前往我的收藏')) location.href = './../flow1.html'
		}, 'json')
	})

	//添加评论
	$('.comment').on('click', '.comment_form .comment_btn', function (e) {
		e.preventDefault()
		let sac = $(this).parents('.comment_form form').serialize()
		// console.log(sac.split('&')[0].split('=')[1]);
		let star = sac.split('&')[0].split('=')[1]
		let content = decodeURI(sac.split('&')[1].split('=')[1])
		console.log(content);
		$.ajax({
			async: true,
			url: '/qfApi/comment/create.jsp',
			type: 'get',
			data: {
				star,
				content,
				goodsId,
				token,
			},
			success: (res) => {
				alert(res.meta.msg)
				$(this).parents('.comment_form form')[0].reset()
				getCommentList()

			},
			error: (err) => {},
			dataType: 'json'
		})
	})
})