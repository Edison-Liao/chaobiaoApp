mui.init();
mui.plusReady(function() {
	var api = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/",
		userName = window.localStorage.getItem("userName"),
		userID = window.localStorage.getItem("userID"),
		UserDepart = window.localStorage.getItem("UserDepart"),
		apiArr = ["GetYonghuList", "GetYonghuChaoBiao", "GetYonghuList", "GetYonghuGouqiMx"],
		titleArr = ["档案查询", "抄表录入", "费用收取", "收费日报", "我的档案"],
		newDate = window.localStorage.getItem("newDate"),
		fileContent =
		"<form class=\"mui-input-group condition-list\">\n\t\t\t<div class=\"mui-input-row selection-conditions\" id=\"community\">\n\t\t\t\t<label>\u6240\u5C5E\u5C0F\u533A\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u9009\u62E9\" readonly=\"readonly\">\n\t\t\t</div> \n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u7528\u6237\u7F16\u53F7\uFF1A</label>\n\t\t\t\t<input type=\"number\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u7528\u6237\u59D3\u540D\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u8054\u7CFB\u5730\u5740\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t</form>",
		readingContent =
		"<form class=\"mui-input-group condition-list\">\n\t\t\t<div class=\"mui-input-row selection-conditions\" id=\"account-book\">\n\t\t\t\t<label>\u6284\u8868\u8D26\u672C\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u9009\u62E9\" readonly=\"readonly\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\" id=\"read-book\">\n\t\t\t\t<label>　\u6284\u8868\u518C\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u9009\u62E9\" readonly=\"readonly\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u7528\u6237\u7F16\u53F7\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u7528\u6237\u59D3\u540D\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u7528\u6237\u7535\u8BDD\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div><span class=\"input-must must\">*</span><span class=\"input-must must\">*</span>\n\t\t</form>",
		chargeContent =
		"<form class=\"mui-input-group condition-list\">\n\t\t\t<div class=\"mui-input-row selection-conditions\" id=\"community\">\n\t\t\t\t<label>\u6240\u5C5E\u5C0F\u533A\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u9009\u62E9\" readonly=\"readonly\">\n\t\t\t</div> \n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u7528\u6237\u7F16\u53F7\uFF1A</label>\n\t\t\t\t<input type=\"number\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u7528\u6237\u59D3\u540D\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u8054\u7CFB\u5730\u5740\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t</form>",
		dailyContent =
		"<form class=\"mui-input-group condition-list\">        \n<div class=\"mui-input-row selection-conditions start-time\">            \n<label>\u5F00\u59CB\u65E5\u671F\uFF1A</label>\n<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u9009\u62E9\" value=" +
		newDate +
		" readonly=\"readonly\">\n</div>\n<div class=\"mui-input-row selection-conditions end-time\">            \n<label>\u7ED3\u675F\u65E5\u671F\uFF1A</label>\n<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\" value=" +
		newDate +
		" readonly=\"readonly\">\n</div>\n<div class=\"mui-input-row selection-conditions\">            \n<label>　\u64CD\u4F5C\u5458：</label>            \n<input type=\"text\" class=\"mui-input-clear admin-name\" readonly=\"readonly\" value=" +
		userName + ">\n</div>\n</form>",
		meContent =
		"<ul class=\"mui-table-view user-info\">\n    <li class=\"mui-table-view-cell\"><span class=\"\">　\u767B\u9646\u8D26\u53F7\uFF1A" +
		+userID +
		"</span></li>\n    <li class=\"mui-table-view-cell\"><span class=\"\">\u64CD\u4F5C\u5458\u59D3\u540D\uFF1A" +
		userName + "</span></li>\n    <li class=\"mui-table-view-cell\"><span class=\"\">　\u6240\u5C5E\u90E8\u95E8\uFF1A" +
		UserDepart + "</span></li>\n     </ul>",
		contentArr = [fileContent, readingContent, chargeContent, dailyContent, meContent],
		usersList = {
			url: "/pages/users_list.html",
			id: "users_list",
			createNew: true
		},
		loadPages = {
			/* 渲染页面功能
			 *herf:string(判断页面显示内容),
			 *titleEle:element(标题标签),
			 *contentEle:element(内容标签),
			 *titleArr:arr(标题内容数组),
			 *contentArr:arr(内容数组)
			 */
			pages: function pages(herf, titleEle, contentEle, titleArr, contentArr) {
				var herfIndex = window.localStorage.getItem(herf);
				titleEle.text(titleArr[herfIndex]);
				contentEle.prepend(contentArr[herfIndex]);
				$(".search-btn").removeClass("search-btn-none")
				if (herfIndex == "4") {
					$(".search-btn").addClass("search-btn-none")
				}
			}
		},
		$title = $("#title"), //获取标题标签
		$content = $("#content"); //获取内容标签
	/* 调用渲染页面功能 */
	loadPages.pages("herfIndex", $title, $content, titleArr, contentArr);
	$("#content").on("tap", ".search-btn", function() {
		var index = window.localStorage.getItem("herfIndex"),
			dataArr = window.localStorage.getItem("dataArr"),
			userID = window.localStorage.getItem("userID"),
			startTime = $(".start-time>input").eq(0).val(),
			endTime = $(".end-time>input").eq(0).val(),
			accountBook = $(".selection-conditions>input").eq(0).val(),
			readBook = $(".selection-conditions>input").eq(1).val(),
			data;
		switch (index) {
			case "0":
				window.localStorage.setItem("yonghuCode", $(".selection-conditions>input").eq(1).val())
				window.localStorage.setItem("yonghuName", $(".selection-conditions>input").eq(2).val())
				window.localStorage.setItem("yonghuAdr", $(".selection-conditions>input").eq(3).val())
				mui.openWindow(usersList)
				break;
			case "1":
				if (accountBook !== "" && readBook !== "") {
					window.localStorage.setItem("yonghuCode", $(".selection-conditions>input").eq(2).val())
					window.localStorage.setItem("yonghuName", $(".selection-conditions>input").eq(3).val())
					window.localStorage.setItem("yhphone", $(".selection-conditions>input").eq(4).val())
					mui.openWindow(usersList)
				} else {
					mui.alert("抄表账本和抄表册为必选项，请正确选择再搜索", "温馨提示", "确定", function() {}, "div")
				}
				break;
			case "2":
				window.localStorage.setItem("yonghuCode", $(".selection-conditions>input").eq(1).val())
				window.localStorage.setItem("yonghuName", $(".selection-conditions>input").eq(2).val())
				window.localStorage.setItem("yonghuAdr", $(".selection-conditions>input").eq(3).val())
				mui.openWindow(usersList)
				break;
			case "3":
				if (new Date(startTime).getTime() <= new Date(endTime).getTime()) {
					window.localStorage.setItem("startTime", startTime)
					window.localStorage.setItem("endTime", endTime)
					mui.openWindow(usersList)
				} else {
					mui.alert("开始日期大于结束日期", "温馨提示", "确定", function() {}, "div")
				}
				break;
		}
		// 点击搜索按钮之后清空input框
		$(".selection-conditions>input").not(".admin-name,.start-time>input,.end-time>input").val("")
	});
});
