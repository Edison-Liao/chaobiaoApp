mui.init();
mui.plusReady(function() {
	var api = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/",
		userName = window.localStorage.getItem("userName"),
		userID = window.localStorage.getItem("userID"),
		UserDepart = window.localStorage.getItem("UserDepart"),
		apiArr = ["GetYonghuList", "GetYonghuChaoBiao", "GetYonghuList", "GetYonghuGouqiMx"],
		titleArr = ["档案查询", "抄表录入", "费用收取", "收费日报", "我的档案"],
		fileContent =
		"<form class=\"mui-input-group condition-list\">\n\t\t\t<div class=\"mui-input-row selection-conditions\" id=\"community\">\n\t\t\t\t<label>\u6240\u5C5E\u5C0F\u533A\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u9009\u62E9\">\n\t\t\t</div> \n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u7528\u6237\u7F16\u53F7\uFF1A</label>\n\t\t\t\t<input type=\"number\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u7528\u6237\u59D3\u540D\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u8054\u7CFB\u5730\u5740\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t</form>",
		readingContent =
		"<form class=\"mui-input-group condition-list\">\n\t\t\t<div class=\"mui-input-row selection-conditions\" id=\"account-book\">\n\t\t\t\t<label>\u6284\u8868\u8D26\u672C\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u9009\u62E9\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\" id=\"read-book\">\n\t\t\t\t<label>\u6284\u8868\u518C \uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u9009\u62E9\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u7528\u6237\u7F16\u53F7\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u7528\u6237\u59D3\u540D\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u7528\u6237\u7535\u8BDD\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t</form>",
		chargeContent =
		"<form class=\"mui-input-group condition-list\">\n\t\t\t<div class=\"mui-input-row selection-conditions\" id=\"community\">\n\t\t\t\t<label>\u6240\u5C5E\u5C0F\u533A\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u9009\u62E9\">\n\t\t\t</div> \n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u7528\u6237\u7F16\u53F7\uFF1A</label>\n\t\t\t\t<input type=\"number\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u7528\u6237\u59D3\u540D\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t\t<div class=\"mui-input-row selection-conditions\">\n\t\t\t\t<label>\u8054\u7CFB\u5730\u5740\uFF1A</label>\n\t\t\t\t<input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u8F93\u5165\">\n\t\t\t</div>\n\t\t</form>",
		dailyContent =
		"<form class=\"mui-input-group condition-list\">\n        <div class=\"mui-input-row selection-conditions start-time\">\n            <label>\u5F00\u59CB\u65F6\u95F4\uFF1A</label>\n            <input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u9009\u62E9\">\n        </div>\n        <div class=\"mui-input-row selection-conditions end-time\">\n            <label>\u7ED3\u675F\u65F6\u95F4 \uFF1A</label>\n            <input type=\"text\" class=\"mui-input-clear\" placeholder=\"\u8BF7\u9009\u62E9\">\n        </div>\n        <div class=\"mui-input-row selection-conditions\">\n            <label>\u64CD\u4F5C\u5458\uFF1A</label>\n            <input type=\"text\" class=\"mui-input-clear admin-name\" value=" +
		userName + " readonly=\"readonly\">\n        </div>\n    </form>",
		meContent =
		"<ul class=\"mui-table-view user-info\">\n    <li class=\"mui-table-view-cell\"><span class=\"\">\u767B\u9646\u8D26\u53F7\uFF1A" +
		userID +
		"</span></li>\n    <li class=\"mui-table-view-cell\"><span class=\"\">\u64CD\u4F5C\u5458\u59D3\u540D\uFF1A" +
		userName + "</span></li>\n    <li class=\"mui-table-view-cell\"><span class=\"\">\u6240\u5C5E\u90E8\u95E8\uFF1A" +
		UserDepart + "</span></li>\n     </ul>",
		contentArr = [fileContent, readingContent, chargeContent, dailyContent, meContent],
		usersList = {
			url: "/pages/users_list.html",
			id: "users_list"
		},
		userInfo = {
			url: "/pages/user_info.html",
			id: "user_info"
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
			},
			/* 用戶列表展示功能
			 *
			 * 
			 */
			usersList: function usersList(herfIndex, herf, data, usersList) {
				var index = window.localStorage.getItem(herfIndex);
				$.ajax({
					url: api + herf[index],
					type: "Post",
					data: data,
					success: function success(data) {
						var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue),
							dataTwo = data.ResultDataTwo,
							yhname = [],
							yonhuID = [],
							yhcode = [],
							AddressMS = [];
						for (var x in data.ResultData) {
							yhname.push(data.ResultData[x].yhname)
							yonhuID.push(data.ResultData[x].yonhuID)
							yhcode.push(data.ResultData[x].yhcode)
							AddressMS.push((data.ResultData[x].AddressMS == undefined ? data.ResultData[x].adr : data.ResultData[x].AddressMS))

						}
						window.localStorage.setItem("yhname", yhname)
						window.localStorage.setItem("yonhuID", yonhuID)
						window.localStorage.setItem("yhcode", yhcode)
						window.localStorage.setItem("AddressMS", AddressMS)
						dataTwo == null ? window.localStorage.setItem("dataTwo", dataTwo) : window.localStorage.setItem("dataTwo",
							dataTwo.isRead)
						mui.openWindow(usersList)

					},
					error: function error(data) {
						//200的响应也有可能被认定为error，responseText中没有Message部分
						mui.alert(JSON.parse(data.responseText).Message);
					},
					complete: function complete(data) {
						//after success or error
					}
				});
			},
			/* 时间方法 */
			time: function(herfIndex, herf, data, userInfo) {
				var index = window.localStorage.getItem(herfIndex);
				$.ajax({
					url: api + herf[index],
					type: "POST",
					data: data,
					success: function(data) {
						var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue).ResultData,
							data = JSON.parse(data),
							startTime = window.localStorage.getItem("startTime"),
							endTime = window.localStorage.getItem("endTime"),
							userName = window.localStorage.getItem("userName"),
							timeYhcode = [],
							timeYhname = [],
							timeSshoutotalje = [],
							timeIsOffset = [],
							timeGouqimxid = [],
							sshoutotalje = 0;
						for (var i = 0; i < data.length; i++) {
							timeYhcode.push(data[i].yhcode)
							timeYhname.push(data[i].yhname)
							timeSshoutotalje.push(data[i].sshoutotalje)
							timeIsOffset.push(data[i].isOffset)
							timeGouqimxid.push(data[i].gouqimxid)
							sshoutotalje += parseFloat(data[i].sshoutotalje)
						}
						window.localStorage.setItem("timeYhcode", timeYhcode)
						window.localStorage.setItem("timeYhname", timeYhname)
						window.localStorage.setItem("timeSshoutotalje", timeSshoutotalje)
						window.localStorage.setItem("timeIsOffset", timeIsOffset)
						window.localStorage.setItem("timeGouqimxid", timeGouqimxid)
						var dataTime =
							"<ul class=\"mui-table-view user-info\">\n            <li class=\"mui-table-view-cell\"><span class=\"\">\u6536\u8D39\u5458\uFF1A" +
							userName +
							"</span></li>\n            <li class=\"mui-table-view-cell\"><span class=\"\">\u8D77\u6B62\u65F6\u95F4\uFF1A" +
							startTime +
							"</span></li>\n            <li class=\"mui-table-view-cell\"><span class=\"\">\u7ED3\u675F\u65F6\u95F4\uFF1A" +
							endTime +
							"</span></li>\n            <li class=\"mui-table-view-cell\"><span class=\"\">\u7968\u636E\u6570\uFF1A" +
							data.length +
							"\u5F20</span></li>\n            <li class=\"mui-table-view-cell\"><span class=\"\">\u5408\u8BA1\u91D1\u989D\uFF1A" +
							sshoutotalje + "</span></li>\n        </ul>";
						window.localStorage.setItem("dataTime", dataTime)
						mui.openWindow(userInfo)
					},
					error: function(data) {
						//alert($.parseJSON(data.responseText).Message);
						/*				var jsonData = JSON.stringify(data); // 转成JSON格式
										var result = $.parseJSON(jsonData); // 转成JSON对象*/
						console.log(data)
					},
					complete: function(data) { //after success or error
					}
				})
			}

		},
		$title = $("#title"),
		//获取标题标签
		$content = $("#content"); //获取内容标签
	/* 调用渲染页面功能 */
	loadPages.pages("herfIndex", $title, $content, titleArr, contentArr);
	$("#content").on("tap", ".search-btn", function() {
		var condition1 = window.localStorage.getItem("xiaoquid"),
			condition2 = $(".selection-conditions>input").eq(1).val(),
			condition3 = $(".selection-conditions>input").eq(2).val(),
			condition4 = $(".selection-conditions>input").eq(3).val(),
			condition5 = $(".selection-conditions>input").eq(4).val(),
			condition6 = window.localStorage.getItem("readBook"),
			index = window.localStorage.getItem("herfIndex"),
			dataArr = window.localStorage.getItem("dataArr"),
			userID = window.localStorage.getItem("userID"),
			startTime = $(".start-time>input").eq(0).val(),
			endTime = $(".end-time>input").eq(0).val(),
			data;
		switch (index) {
			case "0":
				data = {
					pageNow: 1,
					pageSize: 100,
					yonghuCode: condition2,
					yonghuName: condition3,
					xiaoquId: condition1,
					adr: condition4
				}
				loadPages.usersList("herfIndex", apiArr, data, usersList)
				break;
			case "1":
				data = {
					pageNow: 1,
					pageSize: 100,
					caobiaoceId: condition6,
					yhcode: condition3,
					yhname: condition4,
					yhphone: condition5
				}
				loadPages.usersList("herfIndex", apiArr, data, usersList)
				break;
			case "2":
				data = {
					pageNow: 1,
					pageSize: 100,
					yonghuCode: condition2,
					yonghuName: condition3,
					xiaoquId: condition1,
					adr: condition4
				}
				loadPages.usersList("herfIndex", apiArr, data, usersList)
				break;
			case "3":
				data = {
					pageNow: 1,
					pageSize: 100,
					userId: userID,
					fromDate: startTime,
					endDate: endTime
				}
				window.localStorage.setItem("startTime", startTime)
				window.localStorage.setItem("endTime", endTime)
				loadPages.time("herfIndex", apiArr, data, userInfo)
				break;
			case "4":
				mui.openWindow(userInfo)
				$("#content").append(meContent)
				break;

		}
		/* loadPages.usersList("herfIndex", apiArr, data, usersList); */
		$(".selection-conditions>input").not(".admin-name").val("")
		window.localStorage.removeItem("accountBook")
		window.localStorage.removeItem("readBook")

	});
});
