mui.init();
var herfIndex = window.localStorage.getItem("herfIndex"),
	dataTwo = window.localStorage.getItem("dataTwo");
var xiaoquid = window.localStorage.getItem("xiaoquid"),
	readBook = window.localStorage.getItem("readBook"),
	herfIndex = window.localStorage.getItem("herfIndex"),
	yonghuCode = window.localStorage.getItem("yonghuCode"),
	yonghuName = window.localStorage.getItem("yonghuName"),
	yonghuAdr = window.localStorage.getItem("yonghuAdr"),
	yhphone = window.localStorage.getItem("yhphone"),
	userID = window.localStorage.getItem("userID"),
	userName = window.localStorage.getItem("userName"),
	startTime = window.localStorage.getItem("startTime"),
	endTime = window.localStorage.getItem("endTime"),
	apiUsers = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuList",
	apiReading = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuChaoBiao",
	apiTime = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuGouqiMx",
	totalPage,
	userJson = {
		pageNow: 1,
		pageSize: 10,
		yonghuCode: yonghuCode,
		yonghuName: yonghuName,
		xiaoquId: xiaoquid,
		adr: yonghuAdr
	},
	readingJson = {
		pageNow: 1,
		pageSize: 10,
		caobiaoceId: readBook,
		yhcode: yonghuCode,
		yhname: yonghuName,
		yhphone: yhphone
	},
	timeJson = {
		pageNow: 1,
		pageSize: 10,
		userId: userID,
		fromDate: startTime,
		endDate: endTime
	}
list = {
	/*   用户list */
	usersList: function(dataJson, apiUsers) {
		$.ajax({
			url: apiUsers,
			type: "Post",
			data: dataJson,
			beforeSend: function() {
				plus.nativeUI.showWaiting("等待中");
			},
			timeout: 10000,
			success: function success(data) {
				plus.nativeUI.closeWaiting();
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue);
				for (var i = 0; i < data.ResultData.length; i++) {
					$(".users-list").append(
						"<li class=\"mui-table-view-cell user-id\"  data-id=" + data.ResultData[i].yonhuID +
						">\n            <p class=\"name-table-number\"><span class=\"mui-pull-left users-name\">\u59D3\u540D: " +
						data.ResultData[i].yhname + "</span><span class=\"users-number mui-pull-left\">" + data.ResultData[i]
						.yhcode +
						"</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\">\u8054\u7CFB\u5730\u5740: <span class=\"address\">" +
						data.ResultData[i].AddressMS + "</span></p>\n         </li>");
				}
				//这里很重要，这里获取页码 公式：总条数/每页显示条数
				totalPage = data.ResultTotal % userJson.pageSize != 0 ?
					parseInt(data.ResultTotal / userJson.pageSize) + 1 :
					data.ResultTotal / userJson.pageSize;
				if (totalPage == userJson.pageNow || data.ResultTotal == 0) { //总页码等于当前页码，停止上拉下拉
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				} else {
					userJson.pageNow++;
					mui('#pullrefresh').pullRefresh().refresh(true);
				}

				window.localStorage.setItem("xiaoquid", "")
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
	},
	/* 抄表list */
	readingList: function(dataJson, apiReading) {
		$.ajax({
			url: apiReading,
			type: "Post",
			data: dataJson,
			beforeSend: function() {
				plus.nativeUI.showWaiting("等待中");
			},
			timeout: 10000,
			success: function success(data) {
				plus.nativeUI.closeWaiting();
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue);
				for (var i = 0; i < data.ResultData.length; i++) {
					if (data.ResultData[i].Qids == data.ResultData[i].Zhids && data.ResultData[i].sfztcodeYsf == "2") {
						$(".users-list").append(
							"<li class=\"mui-table-view-cell user-id\"  data-id=" + data.ResultData[i].yonhuID +
							">\n            <p class=\"name-table-number\"><span class=\"mui-pull-left users-name\">\u59D3\u540D: " +
							data.ResultData[i].yhname + "</span><span class=\"users-number mui-pull-left\">" + data.ResultData[i].yhcode +
							"</span><span class=\"mui-pull-left is-read is-read-false\">\u672A\u6284\u8868</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\">\u8054\u7CFB\u5730\u5740: <span class=\"address\">" +
							data.ResultData[i].adr + "</span></p>\n        </li>");
					} else {
						$(".users-list").append(
							"<li class=\"mui-table-view-cell user-id\" data-id=" + data.ResultData[i].yonhuID +
							">\n            <p class=\"name-table-number\"><span class=\"mui-pull-left users-name\">\u59D3\u540D: " +
							data.ResultData[i].yhname + "</span><span class=\"users-number mui-pull-left\">" + data.ResultData[i].yhcode +
							"</span><span class=\"mui-pull-left is-read is-read-true\">\u5DF2\u6284\u8868</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\">\u8054\u7CFB\u5730\u5740: <span class=\"address\">" +
							data.ResultData[i].adr + "</span></p>\n        </li>");
					}
				}
				//这里很重要，这里获取页码 公式：总条数/每页显示条数
				totalPage = data.ResultTotal % readingJson.pageSize != 0 ?
					parseInt(data.ResultTotal / readingJson.pageSize) + 1 :
					data.ResultTotal / readingJson.pageSize;
				if (totalPage == readingJson.pageNow || data.ResultTotal == 0) { //总页码等于当前页码，停止上拉下拉
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				} else {
					readingJson.pageNow++;
					mui('#pullrefresh').pullRefresh().refresh(true);
				}

				window.localStorage.setItem("xiaoquid", "")
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
	},
	/* 日报表list*/
	timeList: function(timeJson, apiTime) {
		$.ajax({
			url: apiTime,
			type: "POST",
			data: timeJson,
			timeout: 10000,
			beforeSend: function() {
				plus.nativeUI.showWaiting("等待中");
			},
			success: function success(data) {
				plus.nativeUI.closeWaiting();
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue),
					dataResultData = JSON.parse(data.ResultData),
					sshoutotalje = 0;
				$(".user-info").removeClass("date-active")
				$(".date-user-name").text(userName)
				$(".start-time").text(startTime)
				$(".end-time").text(endTime)
				$(".date-bill-number").text(data.ResultTotal)
				$(".date-sshoutotalje").text(Number(data.ResultDataTwo.totalMoney).toFixed(2))
				for (var i = 0; i < dataResultData.length; i++) {
					if (!dataResultData[i].isOffset) {
						$(".users-list").append(
							" \n            <li class=\"mui-table-view-cell cost-li-list\" gouqimx-id=" + dataResultData[i].gouqimxid +
							" data-id=" + dataResultData[i].yonhuID +
							">\n            <p class=\"money-table-number\"><span class=\"mui-pull-left users-name\" >\u6237\u53F7: " +
							dataResultData[i].yhcode + "</span><span class=\"users-number mui-pull-left\">\u91D1\u989D\uFF1A" +
							Number(dataResultData[i].sshoutotalje).toFixed(2) +
							"\u5143</span><span class=\"mui-pull-left is-read is-read-true\")}>" + (!dataResultData[i].isOffset ?
								"正常" :
								"已作废") +
							"</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\"><span class=\"address\">\u6237\u540D\uFF1A" +
							dataResultData[i].yhname + "</span></p>\n        </li>")
					} else {
						$(".users-list").append(
							" \n            <li class=\"mui-table-view-cell cost-li-list\" gouqimx-id=" + dataResultData[i].gouqimxid +
							" data-id=" + dataResultData[i].yonhuID +
							">\n            <p class=\"money-table-number\"><span class=\"mui-pull-left users-name\">\u6237\u53F7: " +
							dataResultData[i].yhcode + "</span><span class=\"users-number mui-pull-left\">\u91D1\u989D\uFF1A" +
							Number(dataResultData[i].sshoutotalje).toFixed(2) +
							"\u5143</span><span class=\"mui-pull-left is-read is-read-false\")}>" + (dataResultData[i].isOffset ?
								"已作废" :
								"正常") +
							"</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\"><span class=\"address\">\u6237\u540D\uFF1A" +
							dataResultData[i].yhname + "</span></p>\n        </li>")
					}
				}
				//这里很重要，这里获取页码 公式：总条数/每页显示条数
				totalPage = data.ResultTotal % timeJson.pageSize != 0 ?
					parseInt(data.ResultTotal / timeJson.pageSize) + 1 :
					data.ResultTotal / timeJson.pageSize;
				if (totalPage == timeJson.pageNow || data.ResultTotal == 0) { //总页码等于当前页码，停止上拉下拉
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				} else {
					timeJson.pageNow++;
					mui('#pullrefresh').pullRefresh().refresh(true);
				}


			},
			error: function(data) {
				mui.alert("获取数据失败，请返回上级页面", "温馨提示", "确定", function() {}, "div")
				plus.nativeUI.closeWaiting();
			},
			complete: function(data) { //after success or error
			}
		})
	}


};
/* 上拉刷新，下拉翻页 */
mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: { //下拉刷新
			auto: false, //可选,默认false.自动下拉刷新一次
			contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
			contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
			callback: function pulldownRefresh() {
				setTimeout(function() {
					switch (herfIndex) {
						case "0":
							list.usersList(userJson, apiUsers)
							break;
						case "1":
							list.readingList(readingJson, apiReading)
							break;
						case "2":
							list.usersList(userJson, apiUsers)
							break;
						case "3":
							list.timeList(timeJson, apiTime)
							break;
					}
				}, 1500);
			}
		},
		up: { //上拉加载
			auto: true, //可选,默认false.自动上拉加载一次
			contentrefresh: '正在加载...',
			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: function pulldownRefresh() {
				setTimeout(function() {
					switch (herfIndex) {
						case "0":
							list.usersList(userJson, apiUsers)
							break;
						case "1":
							list.readingList(readingJson, apiReading)
							break;
						case "2":
							list.usersList(userJson, apiUsers)
							break;
						case "3":
							list.timeList(timeJson, apiTime)
							break;
					}

				}, 1500);
			}
		}

	}
});
switch (herfIndex) {
	case "0":
		/* 每一个list添加点击事件并存储data_id */
		$('.users-list').on("tap", ".mui-table-view-cell", function() {
			var $this = $(this).attr("data-id");
			mui.openWindow({
				url: "/pages/user_info/user_info.html",
				createNew: true
			})
			window.localStorage.setItem("data-id", $this);
		})
		break;
	case "1":

		$('.users-list').on("tap", ".mui-table-view-cell", function() {
			var $this = $(this).attr("data-id");
			mui.openWindow({
				url: "/pages/meter_reading/meter_reading.html",
				createNew: true
			})
			window.localStorage.setItem("data-id", $this);
		})

		break;
	case "2":

		$('.users-list').on("tap", ".mui-table-view-cell", function() {
			var $this = $(this).attr("data-id");
			mui.openWindow({
				url: "/pages/fee_charge/fee_charge.html",
				id:"fee_charge.html",
				createNew: true
			})
			window.localStorage.setItem("data-id", $this);
		})

		break;
	case "3":

		$('.users-list').on("tap", ".cost-li-list", function() {
			var $this = $(this).attr("data-id"),
				$gouqimxId = $(this).attr("gouqimx-id");

			mui.openWindow({
				url: "/pages/fee_charge/charge_results.html",
				id:"charge_results",
				createNew: true
			})
			window.localStorage.setItem("data-id", $this);
			window.localStorage.setItem("gouqiMXid", $gouqimxId)
		})

		break;
}
