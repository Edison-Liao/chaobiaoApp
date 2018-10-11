mui.init();
mui.plusReady(function() {
	var costApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuGouqiMxBybyUser",
		userInfoApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuInfo",
		costDetailedApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuOneGouqiMx",
		infoId = window.localStorage.getItem("data-id"),
		herfIndex = window.localStorage.getItem("herfIndex"),
		infoList2 = window.localStorage.getItem("infoList2"),
		btnIndex = window.localStorage.getItem("btn-index"),
		readList2 = window.localStorage.getItem("readList2"),
		chargeList2 = window.localStorage.getItem("chargeList2"),
		arrears = window.localStorage.getItem("Arrears"),
		Qids = window.localStorage.getItem("Qids"),
		Zhids = window.localStorage.getItem("Zhids"),
		gouqiMXid = window.localStorage.getItem("gouqiMXid"),
		printData = window.localStorage.getItem("printData").split(","),
		userInfo = {
			url: "/pages/user_info.html",
			id: "user_info"
		},
		/* 获取收费记录方法 */
		costRecord = function(api, infoId) {
			$.ajax({
				url: api,
				type: "Post",
				data: {
					pageNow: 1,
					pageSize: 100,
					yonghuId: infoId
				},
				beforeSend: function() {
					plus.nativeUI.showWaiting("等待中");
				},
				success: function success(data) {
					plus.nativeUI.closeWaiting();
					var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue).ResultData,
						data = JSON.parse(data);
					if (data.length != 0) {
						for (var i = 0; i < data.length; i++) {
							if (data[i].sfztcode == "3") {
								$(".costing-list").append("<li class=\"mui-table-view-cell\" caobiaoid=\"" + data[i].caobiaoid +
									"\" gouqimxid=\"" + data[i].gouqimxid +
									"\">\n        <p class=\"cost-record mui-pull-left\"><span class=\"cost-record-left\">\u8D26\u671F:" +
									data[i].kjyear + "-" + data[i].period + "</span><span class=\"cost-record-left\">\u8D77\u6570:" + data[i]
									.Qids +
									"</span><span class=\"cost-record-left\">\u6B62\u6570:" + data[i].Zhids +
									"</span></p>\n        <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n        <p class=\"cost-record mui-pull-right\"><span class=\"cost-record-right\">\u72B6\u6001:\u5DF2\u6536\u8D39</span><span class=\"cost-record-right\">\u6C14\u91CF\uFF1A0</span><span class=\"cost-record-right\">\u91D1\u989D\uFF1A0</span></p>\n    </li>"
								)
							} else {
								$(".costing-list").append("<li class=\"mui-table-view-cell\" caobiaoid=\"" + data[i].caobiaoid +
									"\" gouqimxid=\"" + data[i].gouqimxid +
									"\">\n        <p class=\"cost-record mui-pull-left\"><span class=\"cost-record-left\">\u8D26\u671F:" +
									data[i].kjyear + "-" + data[i].period + "</span><span class=\"cost-record-left\">\u8D77\u6570:" + data[i]
									.Qids + "</span><span class=\"cost-record-left\">\u6B62\u6570:" + data[i].Zhids +
									"</span></p>\n        <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n        <p class=\"cost-record mui-pull-right\"><span class=\"cost-record-right\">\u72B6\u6001:\u672A\u6536\u8D39</span><span class=\"cost-record-right\">\u6C14\u91CF\uFF1A0</span><span class=\"cost-record-right\">\u91D1\u989D\uFF1A0</span></p>\n    </li>"
								)
							}

						}
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
		/* 抄表记录 */
		yonghuInfo = function(api, infoId, content) {
			$.ajax({
				url: api,
				type: "Post",
				data: {
					yonghuId: infoId
				},
				beforeSend: function() {
					plus.nativeUI.showWaiting("等待中");
				},
				success: function success(data) {
					plus.nativeUI.closeWaiting();
					var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue).ResultData;
					$(content).append("<ul class='mui-table-view user-info'>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "当前账期：" + data.yonghuChaobiao.kjyear + "年" + data.yonghuChaobiao
						.period + "月账期" + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "抄表状态：" + (data.yonghuChaobiao.isChaobiao ? "已抄表" : "未抄表") +
						"</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "上次读数：" + data.yonghuChaobiao.Qids + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "本次读数：" + data.yonghuChaobiao.Zhids + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "抄见气量：" + data.yonghuChaobiao.bcql + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "一阶气量：" + data.yonghuChaobiao.bcql1 + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "一阶单价：" + data.yonghuChaobiao.jg1 + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "一阶气费：" + ((Number(data.yonghuChaobiao.bcql1) * Number(data
							.yonghuChaobiao
							.jg1))).toFixed(2) + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "二阶气量：" + data.yonghuChaobiao.bcql2 + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "二阶单价：" + data.yonghuChaobiao.jg2 + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "二阶气费：" + ((Number(data.yonghuChaobiao.bcql2) * Number(data
							.yonghuChaobiao
							.jg2))).toFixed(2) + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "三阶气量：" + data.yonghuChaobiao.bcql3 + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "三阶单价：" + data.yonghuChaobiao.jg3 + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "三阶气费：" + ((Number(data.yonghuChaobiao.bcql3) * Number(data
							.yonghuChaobiao
							.jg3))).toFixed(2) + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "四阶气量：" + data.yonghuChaobiao.bcql4 + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "四阶单价：" + data.yonghuChaobiao.jg4 + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "四阶气费：" + ((Number(data.yonghuChaobiao.bcql4) * Number(data
							.yonghuChaobiao
							.jg4))).toFixed(2) + "</span>" + "</li>" +
						"<button type='button' class='mui-btn-blue last-btn again-reading-btn'>" + "重新录入" + "</button>" +
						"</ul>");
					/* 	$(content).append(chargeList2) */

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
		gouqiMX = function(api, gouqiMXid, content) {
			$.ajax({
				url: api,
				type: "Post",
				data: {
					gouqimxId: gouqiMXid
				},
				beforeSend: function() {
					plus.nativeUI.showWaiting("等待中");
				},
				success: function success(data) {
					plus.nativeUI.closeWaiting();
					var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue);
					$(content).append(
						"<ul class='mui-table-view user-info'>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "收费时间：" + printData[0] + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "操作员：" + printData[1] + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "票据号：" + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "实收金额：" + printData[2] + "元" + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "收费期数：" + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "收费气量：" + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "应收起量：" + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "实收金额：" + printData[3] + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "滞纳金：" + printData[4] + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "账户余额：" + printData[5] + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "本次应收：" + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "本次余额：" + printData[6] + "</span>" + "</li>" +
						"</ul>" +
						"<button type='button' class='mui-btn mui-btn-blue mui-btn-block confirm-btn'>" + "重打小票" + "</button>");

				},
				error: function error(data) {
					//200的响应也有可能被认定为error，responseText中没有Message部分
					mui.alert(JSON.parse(data.responseText).Message);
				},
				complete: function complete(data) {
					//after success or error
				}


			});
		};
	$("#content").prepend(infoList2)
	console.log(gouqiMXid)
	switch (btnIndex) {
		case "1":
			costRecord(costApi, infoId)
			$(".costing-list").on("tap", ".mui-table-view-cell", function() {

			})
			break;
		case "2":
			$("#content").append(readList2)
		case "4":
			yonghuInfo(userInfoApi, infoId, "#content")
			$("#content").on("tap", ".again-reading-btn", function() {
				mui.openWindow(userInfo)
			})
			break;
		case "5":
			gouqiMX(costDetailedApi, gouqiMXid, "#content")
			$("#content").on("tap", ".confirm-btn", function() {
				var savedBleId = localStorage.getItem("bleId");
				var bleObj = new ConnectPrinter(savedBleId);
				bleObj.gotoPrint(1);

			})
			break;
	}

	/* 是否可以预收费 */
	/* 	arrears == "true" ? $(".pre-charge-btn").removeClass("first-btn-active") : $(".pre-charge-btn").addClass(
			"first-btn-active") */



})
