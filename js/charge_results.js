mui.init();
mui.plusReady(function() {
	var savedBleId = localStorage.getItem("bleId"),
		gouqiMXid = localStorage.getItem("gouqiMXid"),
		gouqiMXapi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuOneGouqiMx",
		userName = window.localStorage.getItem("userName");
	if (savedBleId) {
		var bleObj = new ConnectPrinter(savedBleId);
	} else {
		plus.nativeUI.confirm("打印机未设置，是否前往设置？", function(e) {
			if (e.index === 0) {
				mui.openWindow({
					id: "/pages/printer.html",
					url: "/pages/printer.html",
				});
			}
		});
	}
	replayTicket = function(api, gouqiMXid) {
		$.ajax({
			url: api,
			type: "Post",
			data: {
				gouqimxId: gouqiMXid
			},
			timeout: 10000,
			beforeSend: function() {
				plus.nativeUI.showWaiting("等待中");
			},
			success: function success(data) {
				plus.nativeUI.closeWaiting();
				var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue).ResultData;
				$(".yingshoufei-xiaopiao-rq").text(data.rq)
				$(".yingshoufei-xiaopiao-username").text(userName)
				$(".yingshoufei-xiaopiao-je").text(data.yhYE.toFixed(2))
				$(".yingshoufei-xiaopiao-bcje").text(data.sshoutotalje.toFixed(2))
				$(".yingshoufei-xiaopiao-latefee").text(data.Surcharge.toFixed(2))
				$(".yingshoufei-xiaopiao-zhje").text((data.yhYE + data.sshoutotalje - data.Surcharge).toFixed(2))
				window.localStorage.setItem("xiaopiao", data.fapiaoInfo)
			},
			error: function error(data) {
				//200的响应也有可能被认定为error，responseText中没有Message部分
				//mui.alert(JSON.parse(data.responseText).Message);
				mui.alert("获取数据失败，请返回上级页面","温馨提示","确定",function(){},"div")
				plus.nativeUI.closeWaiting();
			},
			complete: function complete(data) {
				//after success or error
			}
		})
	};
	replayTicket(gouqiMXapi, gouqiMXid)
	$("#content").on("tap", ".re-charge-btn", function() {
		var fapiaoInfo=window.localStorage.getItem("xiaopiao")
		bleObj.gotoPrint("\r\n\r\n" +fapiaoInfo +"\r\n\r\n\r\n\r\n");
		bleObj = new ConnectPrinter(savedBleId);
	})
})
