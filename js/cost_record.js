mui.init();
var costApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuGouqiMxBybyUser",
	dataId = window.localStorage.getItem("data-id"),
	userInfoApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuInfo",
	chargeResults = {
		url: "/pages/fee_charge/charge_results.html",
		id: "charge_results",
		createNew: true
	},
	feeCharge = {
		url: "/pages/fee_charge/fee_charge.html",
		id: "fee_charge.html",
		createNew: true
	},
	costJson = {
		pageNow: 1,
		pageSize: 10,
		yonghuId: dataId
	}
//费用记录
costRecord = function(api, costJson) {
	$.ajax({
		url: api,
		type: "Post",
		data: costJson,
		timeout: 10000,
		beforeSend: function() {
			plus.nativeUI.showWaiting("等待中");
		},
		success: function success(data) {
			plus.nativeUI.closeWaiting();
			mui('#content').pullRefresh().endPullupToRefresh(true);
			var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue),
				dataResultData = JSON.parse(data.ResultData);
			if (data.length != 0) {
				for (var i = 0; i < dataResultData.length; i++) {
					if (dataResultData[i].sfztcode == "3") {
						$(".costing-list").append("<li class=\"mui-table-view-cell cost-record-list\" caobiaoid=\"" + dataResultData[
								i].caobiaoid +
							"\" gouqimx-id=\"" + dataResultData[i].gouqimxid +
							"\" sfzt-code=\"" + dataResultData[i].sfztcode +
							"\">\n        <p class=\"cost-record mui-pull-left\"><span class=\"cost-record-left\">\u8D26\u671F:" +
							dataResultData[i].kjyear + "-" + dataResultData[i].period +
							"</span><span class=\"cost-record-left\">\u8D77\u6570:" +
							dataResultData[i].Qids +
							"</span><span class=\"cost-record-left\">\u6B62\u6570:" + dataResultData[i].Zhids +
							"</span></p>\n        <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n        <p class=\"cost-record mui-pull-right\"><span class=\"cost-record-right charge-state\">\u72B6\u6001:<span class=\"is-read is-read-true\">\u5DF2\u6536\u8D39</span></span><span class=\"cost-record-right\">\u6C14\u91CF\uFF1A" +
							dataResultData[i].qcTotalql + "</span><span class=\"cost-record-right\">\u91D1\u989D\uFF1A" +
							dataResultData[i].qctotalje +
							"</span></p>\n    </li>"
						)
					} else {
						$(".costing-list").append("<li class=\"mui-table-view-cell cost-record-list\" caobiaoid=\"" + dataResultData[
								i].caobiaoid +
							"\" gouqimx-id=\"" + dataResultData[i].gouqimxid +
							"\" sfzt-code=\"" + dataResultData[i].sfztcode +
							"\">\n        <p class=\"cost-record mui-pull-left\"><span class=\"cost-record-left\">\u8D26\u671F:" +
							dataResultData[i].kjyear + "-" + dataResultData[i].period +
							"</span><span class=\"cost-record-left\">\u8D77\u6570:" +
							dataResultData[i]
							.Qids + "</span><span class=\"cost-record-left\">\u6B62\u6570:" + dataResultData[i].Zhids +
							"</span></p>\n        <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n        <p class=\"cost-record mui-pull-right\"><span class=\"cost-record-right charge-state\">\u72B6\u6001:<span class=\"is-read is-read-false\">\u672A\u6536\u8D39</span></span><span class=\"cost-record-right\">\u6C14\u91CF\uFF1A" +
							dataResultData[i].qcTotalql + "</span><span class=\"cost-record-right\">\u91D1\u989D\uFF1A" +
							dataResultData[i].qctotalje +
							"</span></p>\n    </li>"
						)
					}

				}
			}
			//这里很重要，这里获取页码 公式：总条数/每页显示条数
			totalPage = data.ResultTotal % costJson.pageSize != 0 ?
				parseInt(data.ResultTotal / costJson.pageSize) + 1 :
				data.ResultTotal / costJson.pageSize;
			if (totalPage == costJson.pageNow || data.ResultTotal == 0) { //总页码等于当前页码，停止上拉下拉
				mui('#content').pullRefresh().endPullupToRefresh(true);
			} else {
				costJson.pageNow++;
				mui('#content').pullRefresh().refresh(true);
			}
			/* mui.openWindow(usersList) */

		},
		error: function error(data) {
			//200的响应也有可能被认定为error，responseText中没有Message部分
			mui.alert("获取数据失败，请返回上级页面", "温馨提示", "确定", function() {}, "div")
			plus.nativeUI.closeWaiting();
		},
		complete: function complete(data) {
			//after success or error
		}


	});
}
mui.init({
	pullRefresh: {
		container: '#content',
		down: { //下拉刷新
			auto: false, //可选,默认false.自动下拉刷新一次
			contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
			contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
			callback: function pulldownRefresh() {
				setTimeout(function() {
					costRecord(costApi, costJson)
				}, 1500);
			}
		},
		up: { //上拉加载
			auto: true, //可选,默认false.自动上拉加载一次
			contentrefresh: '正在加载...',
			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: function pulldownRefresh() {
				setTimeout(function() {
					costRecord(costApi, costJson)
				}, 1500);
			}
		}

	}
});
// 费用记录点击事件
$(".costing-list").on("tap", ".cost-record-list", function() {
	window.localStorage.setItem("gouqiMXid", $(this).attr("gouqimx-id"))
	//判断收费状态跳转已收费收费页面或重打小票页面
	$(this).attr("sfzt-code") == "2" ? mui.openWindow(feeCharge) : mui.openWindow(chargeResults)
})
