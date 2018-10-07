mui.init();
mui.plusReady(function() {
	var userInfo = window.localStorage.getItem("infoList"),
		readlist = window.localStorage.getItem("readlist"),
		infoId = window.localStorage.getItem("data-id"),
		herfIndex = window.localStorage.getItem("herfIndex"),
		chargeList = window.localStorage.getItem("chargeList"),
		costingList = window.localStorage.getItem("costList"),
		readingList = window.localStorage.getItem("readingList"),
		dataTime = window.localStorage.getItem("dataTime"),
		endTime = window.localStorage.getItem("endTime"),
		userName = window.localStorage.getItem("userName"),
		userID = window.localStorage.getItem("userID"),
		readingApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/MakeYongChaoBiao",
		costList = {
			url: "/pages/cost_list.html",
			id: "cost_list.html"
		},
		info = {
	
			/* 抄表返回 */
			reading: function(api, yhcode, userID, ztbz, xh, zidsInput, usersList) {
				$.ajax({
					url: api,
					type: "Post",
					data: {
						yhcode: yhcode,
						userId: userID,
						zutiCode: ztbz,
						xh: xh,
						zids: zidsInput
					},
					success: function success(data) {
						var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue);
						mui.toast(data.DataMessage)
						if (data.DataSuccess) {
							mui.openWindow(usersList)
						}
						/* mui.openWindow(usersList) */

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
			/* 收费列表 */
			costing: function() {

			}
		};
	switch (herfIndex) {
		case "0":
			$("#content").append(userInfo)
			$("#content").append(readlist)
			$("#content").append(chargeList)
			break;
		case "1":
			$("#content").append(userInfo)
			$("#content").append(readingList)
			var yhCode = $(".mui-table-view-cell>span").eq(0).attr("code"),
				ztbz = $(".mui-table-view-cell>span").eq(0).attr("ztbz"),
				xh = $(".mui-table-view-cell>span").eq(1).attr("xh");
			zidsInput = $(".reading-input").val();
			console.log(window.localStorage.getItem("readBook"))
			$("#content").on("tap", ".confirm-btn", function() {
				var zidsInput = $(".reading-input").val();
				info.reading(readingApi, yhCode, userID, ztbz, xh, zidsInput, costList)
			})
			break;
		case "2":
			$("#content").append(userInfo)
			$("#content").append(costingList)
			break;
		case "3":
			$("#content").prepend(dataTime)
			var timeYhcode = window.localStorage.getItem("timeYhcode").length > 1 ? window.localStorage.getItem("timeYhcode").split(
					",") :
				window.localStorage.getItem("timeYhcode"),
				timeYhname = window.localStorage.getItem("timeYhname").length > 1 ? window.localStorage.getItem("timeYhname").split(
					",") :
				window.localStorage.getItem("timeYhname"),
				timeSshoutotalje = window.localStorage.getItem("timeSshoutotalje").length > 1 ? window.localStorage.getItem(
					"timeSshoutotalje").split(",") :
				window.localStorage.getItem("timeSshoutotalje"),
				timeIsOffset = window.localStorage.getItem("timeIsOffset").length > 1 ? window.localStorage.getItem(
					"timeIsOffset").split(",") :
				window.localStorage.getItem("timeIsOffset"),
				timeGouqimxid = window.localStorage.getItem("timeGouqimxid").length > 1 ? window.localStorage.getItem(
					"timeGouqimxid").split(",") :
				window.localStorage.getItem("timeGouqimxid");
			for (var i = 0; i < timeYhcode.length; i++) {
				if (timeIsOffset[i] !== "true") {
					$(".cost-list").append(
						" \n            <li class=\"mui-table-view-cell cost-li-list\">\n            <p class=\"money-table-number\"><span class=\"mui-pull-left users-name\">\u6237\u53F7: " +
						timeYhcode[i] + "</span><span class=\"users-number mui-pull-left\">\u91D1\u989D\uFF1A" + timeSshoutotalje[i] +
						"\u5143</span><span class=\"mui-pull-left is-read is-read-false\")}>" + (timeIsOffset[i] == "true" ? "正常" :
							"已作废") +
						"</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\"><span class=\"address\">\u6237\u540D\uFF1A" +
						timeYhname[i] + "</span></p>\n        </li>")
				} else {
					$(".cost-list").append(
						" \n            <li class=\"mui-table-view-cell cost-li-list\">\n            <p class=\"money-table-number\"><span class=\"mui-pull-left users-name\">\u6237\u53F7: " +
						timeYhcode[i] + "</span><span class=\"users-number mui-pull-left\">\u91D1\u989D\uFF1A" + timeSshoutotalje[i] +
						"\u5143</span><span class=\"mui-pull-left is-read is-read-true\")}>" + (timeIsOffset[i] == "true" ? "正常" :
							"已作废") +
						"</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\"><span class=\"address\">\u6237\u540D\uFF1A" +
						timeYhname[i] + "</span></p>\n        </li>")
				}
			}
			
			$('.cost-li-list').each(function(index, item) {

				$(item).attr('gouqimx-id', timeGouqimxid[index]);
			});

			$('.cost-list').on("tap", ".mui-table-view-cell", function() {
				console.log($(this).attr("gouqimx-id"))
			})
			break;

	}
	/* $("#content").append(userInfo)
	$("#content").append(readlist)
	$("#content").append(chargeList) */
	$("#content").on("tap", ".cost-record-btn", function() {
		/* 调用费用记录方法 */
		mui.openWindow(costList)
	})
})
