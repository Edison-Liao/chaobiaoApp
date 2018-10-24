mui.init();
mui.plusReady(function() {
	var costApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuGouqiMxBybyUser",
		dataId = window.localStorage.getItem("data-id"),
		userInfoApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuInfo",
		chargeResults = {
			url: "/pages/fee_charge/charge_results.html",
			id: "charge_results.html",
			createNew: true
		},
		feeCharge = {
			url: "/pages/fee_charge/fee_charge.html",
			id: "fee_charge",
			createNew: true
		},
		costRecord = function(api, dataId) {
			$.ajax({
				url: api,
				type: "Post",
				data: {
					pageNow: 1,
					pageSize: 100,
					yonghuId: dataId
				},
				timeout: 10000,
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
								$(".costing-list").append("<li class=\"mui-table-view-cell cost-record-list\" caobiaoid=\"" + data[i].caobiaoid +
									"\" gouqimx-id=\"" + data[i].gouqimxid +
									"\">\n        <p class=\"cost-record mui-pull-left\"><span class=\"cost-record-left\">\u8D26\u671F:" +
									data[i].kjyear + "-" + data[i].period + "</span><span class=\"cost-record-left\">\u8D77\u6570:" +
									data[i].Qids +
									"</span><span class=\"cost-record-left\">\u6B62\u6570:" + data[i].Zhids +
									"</span></p>\n        <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n        <p class=\"cost-record mui-pull-right\"><span class=\"cost-record-right charge-state\">\u72B6\u6001:\u5DF2\u6536\u8D39</span><span class=\"cost-record-right\">\u6C14\u91CF\uFF1A" +
									data[i].qcTotalql + "</span><span class=\"cost-record-right\">\u91D1\u989D\uFF1A" + data[i].qctotalje +
									"</span></p>\n    </li>"
								)
							} else {
								$(".costing-list").append("<li class=\"mui-table-view-cell cost-record-list\" caobiaoid=\"" + data[i].caobiaoid +
									"\" gouqimx-id=\"" + data[i].gouqimxid +
									"\">\n        <p class=\"cost-record mui-pull-left\"><span class=\"cost-record-left\">\u8D26\u671F:" +
									data[i].kjyear + "-" + data[i].period + "</span><span class=\"cost-record-left\">\u8D77\u6570:" +
									data[i]
									.Qids + "</span><span class=\"cost-record-left\">\u6B62\u6570:" + data[i].Zhids +
									"</span></p>\n        <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n        <p class=\"cost-record mui-pull-right\"><span class=\"cost-record-right charge-state\">\u72B6\u6001:\u672A\u6536\u8D39</span><span class=\"cost-record-right\">\u6C14\u91CF\uFF1A" +
									data[i].qcTotalql + "</span><span class=\"cost-record-right\">\u91D1\u989D\uFF1A" + data[i].qctotalje +
									"</span></p>\n    </li>"
								)
							}

						}
					}
					/* mui.openWindow(usersList) */

				},
				error: function error(data) {
					//200的响应也有可能被认定为error，responseText中没有Message部分
					//mui.alert(JSON.parse(data.responseText).Message);
					mui.alert("获取数据失败，请返回上级页面", "温馨提示", "确定", function() {}, "div")
					plus.nativeUI.closeWaiting();
				},
				complete: function complete(data) {
					//after success or error
				}


			});
		}
	costRecord(costApi, dataId)
	$(".costing-list").on("tap", ".cost-record-list", function() {
		window.localStorage.setItem("gouqiMXid", $(this).attr("gouqimx-id"))
		//判断收费状态跳转已收费收费页面或重打小票页面
		$(".charge-state").text == "状态：未收费" ? mui.openWindow(feeCharge) : mui.openWindow(chargeResults)
	})
})
