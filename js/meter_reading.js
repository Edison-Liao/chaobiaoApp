mui.init();
mui.plusReady(function() {
	var readingApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/MakeYongChaoBiao",
		entryDetails = {
			url: "/pages/meter_reading/entry_details.html",
			id: "entry_details"
		},
		userID = window.localStorage.getItem("userID"),
		zuticode = window.localStorage.getItem("zuticode"),


		/* 抄表返回 */
		reading = function(api, yhcode, userID, zutiCode, xh, zidsInput,entryDetails) {
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
						mui.openWindow(entryDetails)
					}
					/* mui.openWindow(entryDetails) */

				},
				error: function error(data) {
					//200的响应也有可能被认定为error，responseText中没有Message部分
					//mui.alert(JSON.parse(data.responseText).Message);
					mui.alert("获取数据失败，请返回上级页面")
					plus.nativeUI.closeWaiting();
				},
				complete: function complete(data) {
					//after success or error
				}
			});
		};

	$("#content").on("tap", ".save-btn", function() {
		var yhcode = $(".yonghu-info-code").text(),
			zidsInput = $(".reading-input").val(),
			xh = $(".yonghu-info-code").attr("xh");
		reading(readingApi, yhcode, userID, zuticode, xh, zidsInput,entryDetails)
	})

})
