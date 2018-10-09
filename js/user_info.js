mui.init();
mui.plusReady(function() {
	var infoId = window.localStorage.getItem("data-id"),
		herfIndex = window.localStorage.getItem("herfIndex"),
		userInfo1 = window.localStorage.getItem("infoList1"),
		userInfo2 = window.localStorage.getItem("infoList2"),
		readList1 = window.localStorage.getItem("readList1"),
		chargeList1 = window.localStorage.getItem("chargeList1"),
		readList2 = window.localStorage.getItem("readList2"),
		chargeList2 = window.localStorage.getItem("chargeList2"),
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
		PrintText = "",
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
			costing: function(api, ickaBh, inputVal, yingShouFeiId, userID, zuticode) {
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
					success: function success(data) {
						var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue);
						PrintText = data.ResultData
						/* 	mui.toast(data.DataMessage)
							if (data.DataSuccess) {
								mui.openWindow(usersList)
							} */
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
			}
		};
	switch (herfIndex) {
		case "0":

			if (readList1 !== undefined && chargeList1 !== undefined) {
				$("#content").append(userInfo1)
			} else if (chargeList1 !== undefined) {
				$("#content").append(userInfo1)
				$("#content").append(readList1)
			} else {
				$("#content").append(userInfo1)
				$("#content").append(chargeList1)
			}
			break;
		case "1":
			$("#content").append(userInfo2)
			if (Qids == Zhids && Qids != "0" && Zhids != "0") {
				$("#content").append(readingList2)
				var yhCode = $(".mui-table-view-cell>span").eq(0).attr("code"),
					xh = $(".mui-table-view-cell>span").eq(0).attr("xh");
				$("#content").on("tap", ".confirm-btn", function() {
					var zidsInput = $(".reading-input").val();
					info.reading(readingApi, yhCode, userID, zuticode, xh, zidsInput, costList)
				})
			}
			break;
		case "2":
			$("#content").append(userInfo2)
			if (chargeList2 == "undefined") {
				window.localStorage.removeItem("chargeList2")
			}
			$("#content").append(chargeList2)
			var savedBleId = localStorage.getItem("bleId");
			if (savedBleId) {
				var bleObj = new ConnectPrinter(savedBleId);
			} else {
				plus.nativeUI.confirm('打印机为设置，是否前往设置？', function(e) {
					if (e.index === 0) {
						mui.openWindow({
							id: "printer.html",
							url: "printer.html"
						});
					}
				});
			};
			$("#content").on("tap", ".confirm-btn", function() {
				var accountBalance = $(".account-balance").text().replace(/[^\-?\d.]/g, ''),
					accountIndex = accountBalance.indexOf("-"),
					costInput = Number($(".cost-input").val()),
					totalje = Number($(".totalje-text").text),
					resultNumber = totalje == 0 || accountIndex == 0 ? Number(accountBalance) + costInput : Number(accountBalance) -
					costInput,
					ickaBh = $(".user-info span").eq(0).attr("ickaBh");
				$(".result-number").text("本次余额：" + resultNumber);
				info.costing(costingApi, ickaBh, $(".cost-input").val(), yingShoufeiID, userID, zuticode)
				//测试打印
				bleObj.gotoPrint(PrintText);


			})
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
	if (!arrears) {
		$(".pre-charge-btn").addClass("first-btn-active")
		$("#content").on("tap", ".pre-charge-btn", function() {
			mui.openWindow(costList)
			window.localStorage.setItem("btn-index", "0")

		})
	} else {
		$(".pre-charge-btn").removeClass("first-btn-active")
	}
	$("#content").on("tap", ".cost-record-btn", function() {
		/* 调用费用记录方法 */
		mui.openWindow(costList)
		window.localStorage.setItem("btn-index", "1")
	})
	
	$("#content").on("tap", ".reading-btn", function() {
		mui.openWindow(costList)
		/* 	window.localStorage.setItem("btn-index", "2") */
		window.localStorage.setItem("herfIndex", "1")
	})
	$("#content").on("tap", ".costing-btn", function() {
		mui.openWindow(costList)
		window.localStorage.setItem("btn-index", "3")
	})


})
