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
		/* 收费列表 
		*api:(url)调用接口地址
		*ickaBh:(string)每一个user唯一的标识
		*inputVal:(string)输入收费的金额 
		*yingShouFeiId:(string)用户应收费ID
		*userID:(string)登录的管理员ID
		*zuticode(string)登录管理员的code
		*indexHtml(object)跳转的页面 
		*/
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
						bleObj.gotoPrint("\r\n\r\n" + PrintText + "\r\n\r\n\r\n\r\n\r\n\r\n");
						mui.alert("收费成功！", "温馨提示", "确定", function(e) {
							if (e.index == 0) {
								mui.openWindow(indexHtml)
							}
						}, "div")
					} else {
						mui.toast(data.DataMessage, {
							duration: 'short',
							type: 'div'
						})
						plus.nativeUI.closeWaiting();
					}
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
		};

	var savedBleId = localStorage.getItem("bleId");
	if (savedBleId) {
		var bleObj = new ConnectPrinter(savedBleId);
	} else {
		mui.confirm("打印机未设置，是否前往设置？", "温馨提示", ["确定", "取消"], function(e) {
			if (e.index === 0) {
				mui.openWindow({
					url: "/pages/printer.html",
					id: "/pages/printer.html"

				});
			} else {
				window.localStorage.removeItem("bleId");
				$(".confirm-btn").addClass("first-btn-active")
				mui.toast("请先连接打印机!", {
					duration: 'short',
					type: 'div'
				})
			}
		}, "div");
	}
	if (window.localStorage.getItem("isConnected") == null && savedBleId !== null) {
		// 计算本次余额
		$("#content").on("change", ".cost-input", function() {
			var inputVal = Number($(".cost-input").val()),
				totalje = Number($(".yonghu-yingshoufei-totalje-ys").text()),
				bcye = Number($(".yonghu-yingshoufei-bcye").text()),
				zhye = Number($(".yonghu-info-balance").text()),
				lateFee = Number($(".yonghu-yingshoufei-lateFee").text()),
				qfje = Number($(".yonghu-yingshoufei-totalje").text());
			if (totalje == "0") {
				$(".yonghu-yingshoufei-this-balance").text((zhye - (qfje + lateFee) + inputVal).toFixed(2))
			} else {
				if (inputVal > qfje + lateFee-bcye || inputVal == qfje + lateFee-bcye) {
					$(".confirm-btn").removeClass("first-btn-active")
					$(".yonghu-yingshoufei-this-balance").text((inputVal - (qfje + lateFee) + zhye).toFixed(2))
				} else {
					$(".confirm-btn").addClass("first-btn-active")
					mui.alert("收费金额必须大于欠费", "温馨提示", "确定", function() {}, "div")
				}
			}
		})
		$("#content").on("tap", ".confirm-btn", function() {
			var inputVal = Number($(".cost-input").val()),
				totalje = Number($(".yonghu-yingshoufei-totalje-ys").text()),
				bcye = Number($(".yonghu-yingshoufei-bcye").text()),
				zhye = Number($(".yonghu-info-balance").text()),
				lateFee = Number($(".yonghu-yingshoufei-lateFee").text()),
				qfje = Number($(".yonghu-yingshoufei-totalje").text()),
				ickaBh = $(".yonghu-info-number").attr("icka-bh"),
				yingShouFeiId = $(".yonghu-yingshoufei-length").eq(0).attr("yingshoufei-id");
			// 输入收费金额不能小于欠费金额
			if (inputVal != "0" && inputVal >= totalje&&inputVal != "") {
				if (totalje == 0) {
					$(".yonghu-yingshoufei-this-balance").text((zhye - (qfje + lateFee) + inputVal).toFixed(2))
					costing(costingApi, ickaBh, inputVal, yingShouFeiId, userID, zuticode, indexHtml)
				} else {
					if (inputVal > qfje + lateFee-bcye || inputVal == qfje + lateFee-bcye) {
						costing(costingApi, ickaBh, inputVal, yingShouFeiId, userID, zuticode, indexHtml)
						$(".confirm-btn").removeClass("first-btn-active")
						$(".yonghu-yingshoufei-this-balance").text((inputVal - (qfje + lateFee) + zhye).toFixed(2))
					} else {
						$(".confirm-btn").addClass("first-btn-active")
						mui.alert("收费金额必须大于欠费", "温馨提示", "确定", function() {}, "div")
					}
				}
			} else {
				// $(".confirm-btn").removeClass("first-btn-active")
				mui.alert("收费金额错误，请核对收费金额！", "温馨提示", "确定", function() {}, "div")
			}

		})
	} else {

		$("#content").on("tap", ".confirm-btn", function() {
			mui.alert("请先返回上级页面,检查蓝牙或打印机", "温馨提示", "确定", function() {}, "div")
		})
	}

})
