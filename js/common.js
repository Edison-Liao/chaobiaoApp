mui.init();
mui.plusReady(function() {
	var clickNum = 0, //记录点击次数
		userName = "userName",
		adminName = $("#admin-name"),
		indexHtml = {
			url: "/index.html",
			id: "index.html",
			createNew: true
		},
		loginHtml = {
			url: "/pages/login.html",
			id: "login.html",
			createNew: true
		},
		searchHtml = {
			url: "/pages/search.html",
			id: "search.html",
			createNew: true
		},
		herfIndex = "herfIndex",
		titleNode = "首页",
		homeMes = "这已经是首页了！",
		ouTmes = ["确定", "取消"],
		/*封装函数方法*/
		reading_method = {
			/*判断是否需要登陆
			 *userName:string(获取存储id)，
			 *index:string(加载index页面)，
			 *openInfo():{url:url,id:id}(跳转地址)
			 * */
			judge: function(userName, ele, openInfo) {
				/*获取当前页面的localStorage，判断是否需要呈现login*/
				var user_id = window.localStorage.getItem(userName); //读取user_id的值
				if (user_id == null || user_id == false) { //判断是否为空，如果为空，则打开登录页面,否则打开主页面
					mui.openWindow(openInfo);
				} else {
					ele.text(user_id)
				}
			},
			/*返回首页方法
			 *title:$().text(),
			 *titleIf:string(判断条件),
			 *mes:string(报错),
			 *openInfo():{url:url,id:id}(跳转地址)
			 */
			goHome: function(title, titleIf, mes, openInfo) {
				var title = title.text();
				if (title !== titleIf) {
					mui.openWindow(openInfo)
					window.localStorage.removeItem("herfIndex")
				}
			},
			/*退出功能
			 * number:number,
			 * mes:string(提示)
			 * */
			goOut: function(mes) {

				mui.confirm('是否退出app？', '温馨提示', mes, function(e) {
					if (e.index == 0) {
						window.localStorage.clear();
						plus.runtime.quit();
					}
				}, "div");

			},
			/*跳转页面功能
			 * ele：$()(点击的元素)
			 * openInfo():{url:url,id:id}(跳转地址)
			 * herfIndex：string(存储localStorage的key)
			 * */
			goPages: function(ele, openInfo, herfIndex) {
				var index = ele.index();
				mui.openWindow(openInfo)
				window.localStorage.setItem(herfIndex, index)
			},

		};
	/* 自动轮播图 */
	swipeBack: true //启用右滑关闭功能【一旦取值为false，左右触控滑动将会失效！】
	var slider = mui("#slider");
	slider.slider({
		interval: 5000
	});
	/* 点击顶部返回顶部 */
	mui("body").on("tap", "header", function() {
		$('body,html').animate({
			scrollTop: 0
		}, 650);
	});
	/* 调用是否登陆功能 */
	reading_method.judge(userName, adminName, loginHtml)
	if (title = $(".header-title>h1").text() == "首页") {
		//首页返回键处理
		var first = null;
		//处理逻辑：1秒内，连续两次按返回键，则退出应用；
		mui.back = function() {
			if (!first) {
				first = new Date().getTime();
				mui.toast('再按一次退出应用');
				setTimeout(function() {
					first = null;
				}, 1000);
			} else {
				if (new Date().getTime() - first < 1000) {
					window.localStorage.clear();
					plus.runtime.quit();
				}
			}
		};
	}
	/*调用返回首页功能*/
	mui(".footer-nav").on("tap", "#go-home", function() {
		mui.init();
		var title = $(".header-title>h1");
		reading_method.goHome(title, titleNode, homeMes, indexHtml)
	})
	/*调用退出功能*/
	mui(".footer-nav").on("tap", "#go-out", function() {
		mui.init();
		reading_method.goOut(ouTmes)
	})
	/*调用点击跳转事件*/
	mui(".mui-grid-9").on("tap", ".mui-media", function() {
		var $this = $(this);
		reading_method.goPages($this, searchHtml, herfIndex)
	})
})
