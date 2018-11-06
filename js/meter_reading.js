mui.init();
mui.plusReady(function() {
	var readingApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/MakeYongChaoBiao",
		entryDetails = {
			url: "/pages/meter_reading/entry_details.html",
			id: "entry_details",
			createNew: true
		},
		userID = window.localStorage.getItem("userID"),
		zuticode = window.localStorage.getItem("zuticode"),


		/* 抄表返回 */
		reading = function(api, yhcode, userID, zutiCode, xh, zidsInput, entryDetails) {
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
				timeout: 10000,
				beforeSend: function() {
					plus.nativeUI.showWaiting("等待中");
				},
				success: function success(data) {
					plus.nativeUI.closeWaiting();
					var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue);
					if (data.DataSuccess) {
						mui.toast(data.DataMessage)
						plus.nativeUI.closeWaiting();
						mui.openWindow(entryDetails)

					} else {
						mui.alert(data.DataMessage, "温馨提示", "确定", function() {}, "div")
						plus.nativeUI.closeWaiting();
					}

				},
				error: function error(data) {
					mui.alert("获取数据失败，请返回上级页面", "温馨提示", "确定", function() {}, "div")
					plus.nativeUI.closeWaiting();
				},
				complete: function complete(data) {
					//after success or error
				}
			});
		};
	$("#content").on("tap", ".save-btn", function() {
		var qids = $(".yonghu-chaobiao-Qids").text(),
			zidsInput = $(".reading-input").val(),
			yhcode = $(".yonghu-info-code").text(),
			xh = $(".yonghu-info-code").attr("xh");
		if (zidsInput > qids) {
			reading(readingApi, yhcode, userID, zuticode, xh, zidsInput, entryDetails)
		} else {
			mui.alert("请正确输入止数！", "温馨提示", "确定", function() {}, "div")
		}

	})
	var users_list = plus.webview.getWebviewById("users_list");
	var old_back = mui.back;
	mui.back = function() {
		if (users_list != null && users_list.id == "users_list") {
			users_list.reload(true);
		}
		old_back()
	}


})
