mui.init();
mui.plusReady(function() {
	var infoId = window.localStorage.getItem("data-id"),
		herfIndex = window.localStorage.getItem("herfIndex"),
		dataTime = window.localStorage.getItem("dataTime"),
		endTime = window.localStorage.getItem("endTime"),
		userName = window.localStorage.getItem("userName"),
		userID = window.localStorage.getItem("userID"),
		costList = {
			url: "/pages/cost_list.html",
			id: "cost_list.html"
		},
		chargeResults = {
			url: "/pages/fee_charge/charge_results.html",
			id: "charge_results.html"
		};

	/* 根据不同的点击id渲染不同的页面 */
	switch (herfIndex) {

			/* 从收费日报id点击查询 */
		case "3":
			$("#content").prepend(dataTime)
			console.log(window.localStorage.getItem("printData"))
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
				window.localStorage.getItem("timeGouqimxid"),
				timeYonghuid = window.localStorage.getItem("timeYonghuid").length > 1 ? window.localStorage.getItem(
					"timeYonghuid").split(",") :
				window.localStorage.getItem("timeYonghuid");
			
			for (var i = 0; i < timeYhcode.length; i++) {
				if (!timeIsOffset[i]) {
					$(".cost-list").append(
						" \n            <li class=\"mui-table-view-cell cost-li-list\">\n            <p class=\"money-table-number\"><span class=\"mui-pull-left users-name\">\u6237\u53F7: " +
						timeYhcode[i] + "</span><span class=\"users-number mui-pull-left\">\u91D1\u989D\uFF1A" + Number(timeSshoutotalje[i]).toFixed(2) +
						"\u5143</span><span class=\"mui-pull-left is-read is-read-false\")}>" + (timeIsOffset[i] ? "正常" : "已作废") +
						"</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\"><span class=\"address\">\u6237\u540D\uFF1A" +
						timeYhname[i] + "</span></p>\n        </li>")
				} else {
					$(".cost-list").append(
						" \n            <li class=\"mui-table-view-cell cost-li-list\">\n            <p class=\"money-table-number\"><span class=\"mui-pull-left users-name\">\u6237\u53F7: " +
						timeYhcode[i] + "</span><span class=\"users-number mui-pull-left\">\u91D1\u989D\uFF1A" + Number(timeSshoutotalje[i]).toFixed(2) +
						"\u5143</span><span class=\"mui-pull-left is-read is-read-true\")}>" + (!timeIsOffset[i] ? "已作废" : "正常") +
						"</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\"><span class=\"address\">\u6237\u540D\uFF1A" +
						timeYhname[i] + "</span></p>\n        </li>")
				}
			}

			/* 购气明细记录id */
			$(".cost-li-list").each(function(index, item) {

				$(item).attr("gouqimx-id", timeGouqimxid[index]);
				$(item).attr("data-id",timeYonghuid[index]);
			});
			/* 点击列表每一个获取购气明细id */
			$('.cost-list').on("tap", ".cost-li-list", function() {
				window.localStorage.setItem("gouqiMXid",$(this).attr("gouqimx-id"))
			})
			break;

	}





})
