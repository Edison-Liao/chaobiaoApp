mui.init();
mui.plusReady(function() {
	var costApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuGouqiMxBybyUser",
		infoId = window.localStorage.getItem("data-id"),
		infoList = window.localStorage.getItem("infoList");
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
	};
	$("#content").prepend(infoList)
	costRecord(costApi, infoId)

})
