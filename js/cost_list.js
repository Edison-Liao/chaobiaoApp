mui.init();
mui.plusReady(function() {
	var costApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuGouqiMxBybyUser",
		userInfoApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuInfo",
		infoId = window.localStorage.getItem("data-id"),
		infoList = window.localStorage.getItem("infoList"),
		btnIndex = window.localStorage.getItem("btn-index"),
		readingList = window.localStorage.getItem("readingList"),
		costingList = window.localStorage.getItem("costList"),
		arrears = window.localStorage.getItem("Arrears"),
		Qids = window.localStorage.getItem("Qids"),
		Zhids = window.localStorage.getItem("Zhids"),
		/* 获取收费记录方法 */
		costRecord = function(api, data) {
			$.ajax({
				url: api,
				type: "Post",
				data: {
					pageNow: 1,
					pageSize: 100,
					yonghuId: data
				},
				success: function success(data) {
					var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue).ResultData,
						data = JSON.parse(data);

					for (var i = 0; i < data.length; i++) {
						if (data[i].sfztcode == "2") {
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
		yonghuInfo = function(api, infoId, content) {
			$.ajax({
				url: api,
				type: "Post",
				data: {
					yonghuId: infoId
				},
				success: function success(data) {
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
						"<li class='mui-table-view-cell'>" + "<span>" + "一阶气费：" + (Number(data.yonghuChaobiao.bcql1) * Number(data.yonghuChaobiao
							.jg1)) + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "二阶气量：" + data.yonghuChaobiao.bcql2 + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "二阶单价：" + data.yonghuChaobiao.jg2 + "</span>" + "</li>" +
						"<li class='mui-table-view-cell'>" + "<span>" + "二阶气费：" + (Number(data.yonghuChaobiao.bcql2) * Number(data.yonghuChaobiao
							.jg2)) + "</span>" + "</li>" +
						"</ul>");

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

	switch (btnIndex) {
		case "0":
			$("#content").append(costingList)
			break;
		case "1":
			costRecord(costApi, infoId)
			break;
		case "2":
			$("#content").append(readingList)
			console.log(typeof(Qids)+"-----------"+typeof(Zhids))
			if (Qids != "0" && Zhids != "0") {
				yonghuInfo(userInfoApi, infoId, "#content")
			}
			break;
		case "3":
			$("#content").append(costingList)
			break;
	}
	$("#content").prepend(infoList)
	/* 是否可以预收费 */
	arrears == "true" ? $(".pre-charge-btn").removeClass("first-btn-active") : $(".pre-charge-btn").addClass(
		"first-btn-active")



})
