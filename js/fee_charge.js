mui.init();
mui.plusReady(function() {
	var costingApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GernarlPayMoney",
		indexHtml = {
			url: "/index.html",
			id: "/index",
			createNew: true
		},
		userID = window.localStorage.getItem("userID"),
		zuticode = window.localStorage.getItem("zuticode"),

		number = 0,
		/* 收费列表 */
		costing = function(api, ickaBh, inputVal, yingShouFeiId, userID, zuticode, indexHtml) {
			$.ajax({
				url: api,
				type: "Post",
				data: {
					ickaBh: ickaBh,
					biaoHao: "",
					je: inputVal,
					yingShouFeiId: yingShouFeiId + ",",
					remark: "",
					userId: userID,
					zuticode: zuticode
				},
				timeout: 10000,
				beforeSend: function() {
					plus.nativeUI.showWaiting("等待中");
				},
				success: function success(data) {
					plus.nativeUI.closeWaiting();
					var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue);

					if (data.DataSuccess) {
						var data1 = data.ResultDataTwo,
							//测试打印
							PrintText = data.ResultData;
						window.localStorage.setItem("gouqiMXid", data1.gouqiId)
						bleObj.gotoPrint("\r\n\r\n" + PrintText + "\r\n\r\n\r\n");
					} else {
						mui.alert(data.DataMessage, "温馨提示", "确定", function() {}, "div")
						plus.nativeUI.closeWaiting();
					}
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
		};
	// 计算本次余额
	$("#content").on("change", ".cost-input", function() {
		var inputVal = Number($(".cost-input").val()),
			totalje = $(".yonghu-yingshoufei-totalje-ys").text(),
			bcye = Number($(".yonghu-yingshoufei-bcye").text()),
			zhye = Number($(".yonghu-info-balance").text());
		$(".yonghu-yingshoufei-this-balance").text((inputVal - totalje + zhye).toFixed(2))

	})
	var savedBleId = localStorage.getItem("bleId");
	if (savedBleId) {
		var bleObj = new ConnectPrinter(savedBleId);
	} else {
		plus.nativeUI.confirm("打印机未设置，是否前往设置？", function(e) {
			if (e.index === 0) {
				mui.openWindow({
					url: "/pages/printer.html",
					id: "/pages/printer.html"

				});
			}
		});
	}
	if (window.localStorage.getItem("isConnected") == null) {
		$("#content").on("tap", ".confirm-btn", function() {
			number++;
			if (number <= 1) {
				var ickaBh = $(".yonghu-info-number").text(),
					inputVal = Number($(".cost-input").val()),
					totalje = $(".yonghu-yingshoufei-totalje-ys").text(),
					bcye = Number($(".yonghu-yingshoufei-bcye").text()),
					zhye = Number($(".yonghu-info-balance").text());

				yingShouFeiId = $(".yonghu-yingshoufei-length").eq(0).attr("yingshoufei-id");
				// 输入收费金额不能为0
				if (inputVal <= 0 || inputVal == "") {
					mui.alert("收费金额必须大于0", "温馨提示", "确定", function() {}, "div")
				} else {
					costing(costingApi, ickaBh, inputVal, yingShouFeiId, userID, zuticode, indexHtml)
					$(".yonghu-yingshoufei-this-balance").text((inputVal - totalje + zhye).toFixed(2))
					$(".confirm-btn").addClass("first-btn-active")
					mui.alert("收费成功！", "温馨提示", "确定", function(e) {
						if (e.index == 0) {
							mui.openWindow(indexHtml)
						}
					}, "div")

				}
			} else {
				mui.alert("不能重复收费", "温馨提示", "确定", function() {}, "div")

			}

		})
	} else {

		$("#content").on("tap", ".confirm-btn", function() {
			mui.alert("请先返回上级页面,检查蓝牙或打印机", "温馨提示", "确定", function() {}, "div")
		})
	}

})
