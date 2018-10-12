mui.init();
mui.plusReady(function() {
	var infoId = window.localStorage.getItem("data-id"),
		herfIndex = window.localStorage.getItem("herfIndex"),
		dataTime = window.localStorage.getItem("dataTime"),
		endTime = window.localStorage.getItem("endTime"),
		userName = window.localStorage.getItem("userName"),
		userID = window.localStorage.getItem("userID"),
		arrears = window.localStorage.getItem("Arrears"),
		yingShoufeiID = window.localStorage.getItem("yingshoufeiID") + ",",
		zuticode = window.localStorage.getItem("zuticode"),
		reading = window.localStorage.getItem("reading"),
		Qids = window.localStorage.getItem("Qids"),
		Zhids = window.localStorage.getItem("Zhids"),
		readingApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/MakeYongChaoBiao",
		costingApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GernarlPayMoney",
		costList = {
			url: "/pages/cost_list.html",
			id: "cost_list.html"
		},
		info = {

			/* 抄表返回 */
			reading: function(api, yhcode, userID, zutiCode, xh, zidsInput, usersList) {

				$.ajax({
					url: api,
					type: "Post",
					data: {
						yhcode: yhcode,
						userId: userID,
						zutiCode: zuticode,
						xh: xh,
						zids: zidsInput
					},
					beforeSend: function() {
						plus.nativeUI.showWaiting("等待中");
					},
					success: function success(data) {
						plus.nativeUI.closeWaiting();
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
			costing: function(api, ickaBh, inputVal, yingShouFeiId, userID, zuticode, PrintText) {

				$.ajax({
					url: api,
					type: "Post",
					data: {
						ickaBh: ickaBh,
						biaoHao: "",
						je: inputVal,
						yingShouFeiId: yingShouFeiId,
						remark: "",
						userId: userID,
						zuticode: zuticode
					},
					beforeSend: function() {
						plus.nativeUI.showWaiting("等待中");
					},
					success: function success(data) {
						plus.nativeUI.closeWaiting();
						var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue),
							data1 = data.ResultDataTwo,
							printData = [data1.rq, data1.UserName, data1.je,data1.bcje,data1.lateFee,data1.bcje,data1.bcje],
							//测试打印
							PrintText = data.ResultData;
						window.localStorage.setItem("gouqiMXid", data1.gouqiId)

						window.localStorage.setItem("printData", printData)
						window.localStorage.setItem("PrintText", data.ResultData)
						bleObj.gotoPrint(PrintText);
						/* 	mui.toast(data.DataMessage)
							if (data.DataSuccess) {
								mui.openWindow(usersList)
							} */
						mui.openWindow(costList)

					},
					error: function error(data) {
						//200的响应也有可能被认定为error，responseText中没有Message部分
						mui.alert(JSON.parse(data.responseText).Message);
					},
					complete: function complete(data) {
						//after success or error
					}
				});
			}
		};
	/* 点击预收费，费用记录，立即抄表，立即收费，保存，确认收费记录不同的id */
	if (arrears == "true") {
		$(".pre-charge-btn").addClass("first-btn-active")
		/* 预收费按钮 */
		$("#content").on("tap", ".pre-charge-btn", function() {
			mui.openWindow(costList)
			window.localStorage.setItem("btn-index", "0")

		})
	} else {
		$(".pre-charge-btn").removeClass("first-btn-active")
	}
	/* 费用记录按钮 */
	$("#content").on("tap", ".cost-record-btn", function() {
		mui.openWindow(costList)
		window.localStorage.setItem("btn-index", "1")
	})
	/* 立即抄表按钮 */
	$("#content").on("tap", ".reading-btn", function() {
		window.localStorage.setItem("btn-index", "2")
		$("#content").html(userInfo2)
		$("#content").append(readList2)
		var xh = $(".mui-table-view-cell").eq(0).attr("xh"),
			yhCode = $(".yonghu-info-code").eq(0).attr("code");
		/* 保存按钮 */
		$("#content").on("tap", ".confirm-btn", function() {
			window.localStorage.setItem("btn-index", "4")
			var zidsInput = $(".reading-input").val();
			info.reading(readingApi, yhCode, userID, zuticode, xh, zidsInput, costList)
		})


	})
	/* 立即收费按钮 */
	$("#content").on("tap", ".costing-btn", function() {
		window.localStorage.setItem("btn-index", "3")
		$("#content").html(userInfo2)
		if (chargeList2 !== "undefined") {
			$("#content").append(chargeList2)
			var savedBleId = localStorage.getItem("bleId");
			if (savedBleId) {
				var bleObj = new ConnectPrinter(savedBleId);
			} else {
				plus.nativeUI.confirm('打印机为设置，是否前往设置？', function(e) {
					if (e.index === 0) {
						mui.openWindow({
							id: "pages/printer.html",
							url: "pages/printer.html"
						});
					}
				});
			};
			/* 确认收费按钮 */
			$("#content").on("tap", ".confirm-btn", function() {
				window.localStorage.setItem("btn-index", "5")
				window.localStorage.removeItem("arrears")
				var accountBalance = $(".account-balance").text().replace(/[^\-?\d.]/g, ''),
					accountIndex = accountBalance.indexOf("-"),
					costInput = Number($(".cost-input").val()),
					totalje = Number($(".totalje-text").text),
					resultNumber = totalje == 0 || accountIndex == 0 ? Number(accountBalance) + costInput : Number(
						accountBalance) -
					costInput,
					ickaBh = $(".yonghu-info-number").eq(0).attr("ickaBh");
				$(".result-number").text("本次余额：" + resultNumber);
				info.costing(costingApi, ickaBh, $(".cost-input").val(), yingShoufeiID, userID, zuticode)
				mui.openWindow(costList)


			})
		}

	})

	/* 根据不同的点击id渲染不同的页面 */
	switch (herfIndex) {
		/* 从档案查询id点击查询 */
		case "0":
			$("#content").append(userInfo1)
			if (readList1 !== "undefined" && Qids == Zhids) {
				$("#content").append(readList1)
			}
			if (chargeList1 !== "undefined") {
				$("#content").append(chargeList1)
			}
			break;
			/* 从抄表录入id点击查询 */
		case "1":
			$("#content").append(userInfo1)
			if (Qids == Zhids && readList2 !== "undefined") {
				$("#content").append(readList2)
				var xh = $(".mui-table-view-cell").eq(0).attr("xh"),
					yhCode = $(".yonghu-info-code").eq(0).attr("code");
				/* 保存按钮 */
				$("#content").on("tap", ".confirm-btn", function() {
					window.localStorage.setItem("btn-index", "4")
					var zidsInput = $(".reading-input").val();
					info.reading(readingApi, yhCode, userID, zuticode, xh, zidsInput, costList)
				})
			}
			break;
			/* 从费用收取id点击查询 */
		case "2":
			$("#content").append(userInfo1)
			if (chargeList2 !== "undefined") {
				$("#content").append(chargeList2)
				var savedBleId = localStorage.getItem("bleId");
				if (savedBleId) {
					var bleObj = new ConnectPrinter(savedBleId);
				} else {
					plus.nativeUI.confirm('打印机为设置，是否前往设置？', function(e) {
						if (e.index === 0) {
							mui.openWindow({
								id: "pages/printer.html",
								url: "pages/printer.html"
							});
						}
					});
				};
				/* 确认收费按钮 */
				$("#content").on("tap", ".confirm-btn", function() {
					window.localStorage.setItem("btn-index", "5")
					window.localStorage.removeItem("arrears")
					var accountBalance = $(".account-balance").text().replace(/[^\-?\d.]/g, ''),
						accountIndex = accountBalance.indexOf("-"),
						costInput = Number($(".cost-input").val()),
						totalje = Number($(".totalje-text").text),
						resultNumber = totalje == 0 || accountIndex == 0 ? Number(accountBalance) + costInput : Number(accountBalance) -
						costInput,
						ickaBh = $(".yonghu-info-number").eq(0).attr("ickaBh");
					$(".result-number").text("本次余额：" + resultNumber);
					info.costing(costingApi, ickaBh, $(".cost-input").val(), yingShoufeiID, userID, zuticode)


				})
			}
			break;
			/* 从收费日报id点击查询 */
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
				if (!timeIsOffset[i]) {
					$(".cost-list").append(
						" \n            <li class=\"mui-table-view-cell cost-li-list\">\n            <p class=\"money-table-number\"><span class=\"mui-pull-left users-name\">\u6237\u53F7: " +
						timeYhcode[i] + "</span><span class=\"users-number mui-pull-left\">\u91D1\u989D\uFF1A" + timeSshoutotalje[i] +
						"\u5143</span><span class=\"mui-pull-left is-read is-read-false\")}>" + (timeIsOffset[i] ? "正常" : "已作废") +
						"</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\"><span class=\"address\">\u6237\u540D\uFF1A" +
						timeYhname[i] + "</span></p>\n        </li>")
				} else {
					$(".cost-list").append(
						" \n            <li class=\"mui-table-view-cell cost-li-list\">\n            <p class=\"money-table-number\"><span class=\"mui-pull-left users-name\">\u6237\u53F7: " +
						timeYhcode[i] + "</span><span class=\"users-number mui-pull-left\">\u91D1\u989D\uFF1A" + timeSshoutotalje[i] +
						"\u5143</span><span class=\"mui-pull-left is-read is-read-true\")}>" + (!timeIsOffset[i] ? "已作废" : "正常") +
						"</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\"><span class=\"address\">\u6237\u540D\uFF1A" +
						timeYhname[i] + "</span></p>\n        </li>")
				}
			}

			/* 购气明细记录id */
			$('.cost-li-list').each(function(index, item) {

				$(item).attr('gouqimx-id', timeGouqimxid[index]);
			});

			/* 点击列表每一个获取购气明细id */
			$('.cost-list').on("tap", ".mui-table-view-cell", function() {
				console.log($(this).attr("gouqimx-id"))
			})
			break;

	}





})
