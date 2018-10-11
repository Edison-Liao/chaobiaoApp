mui.init();
mui.plusReady(function() {
	var dataId = window.localStorage.getItem("data-id"),
		userInfoApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuInfo",
		userInfo = function(api, dataId) {
			$.ajax({
				url: api,
				type: "Post",
				data: {
					pageNow: 1,
					pageSize: 100,
					yonghuId: dataId
				},
				beforeSend: function() {
					plus.nativeUI.showWaiting("等待中");
				},
				success: function success(data) {
					plus.nativeUI.closeWaiting();
					var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue).ResultData;
					/* 用户详情列表 */
					$(".yonghu-info-code").text(data.yonghuInfo.yhcode)
					$(".yonghu-info-name").text(data.yonghuInfo.yhname)
					$(".yonghu-info-address").text(data.yonghuInfo.AddressMS)
					$(".yonghu-info-phone").text(data.yonghuInfo.handPhone)
					$(".yonghu-info-balance").text(data.yonghuInfo.bcye)
					$(".yonghu-info-state").text(data.yonghuInfo.ztbz == 1 ? "正常" : data.yonghuInfo.ztbz == 2 ? "停用" : "未启用")
					$(".yonghu-info-number").text(data.yonghuInfo.ickaBH)
					$(".yonghu-info-standard").text(data.yonghuInfo.JGName)
					/* 立即抄表列表 */
					if (data.yonghuChaobiao !== null) {
						$(".reading-chaobiao").removeClass("search-btn-none")
						$(".yonghu-chaobiao-year").text(data.yonghuChaobiao.kjyear)
						$(".yonghu-chaobiao-period").text(data.yonghuChaobiao.period)
						$(".yonghu-chaobiao-ischaobiao").text(data.yonghuChaobiao.Qids == data.yonghuChaobiao.Zhids ? "未抄表" :
							"已抄表")
						$(".yonghu-chaobiao-Qids").text(data.yonghuChaobiao.Qids)
						$(".yonghu-chaobiao-Zhids").text(data.yonghuChaobiao.Zhids)
					} else {
						$(".reading-chaobiao").addClass("search-btn-none")
					}
					/* 立即收费 */
					if (data.yonghuYingShouFei !== "") {
						for (var i = 0; i < data.yonghuYingShouFei.length; i++) {
							yingshoufeiID.push(data.yonghuYingShouFei[i].yshoufeiid)
							bcql += parseFloat(data.yonghuYingShouFei[i].bcql);
							qctotalje += parseFloat((data.yonghuYingShouFei[i].qctotalje).toFixed(2));
							totalje += parseFloat((data.yonghuYingShouFei[i].totalje).toFixed(2));
							lateFee += parseFloat((data.yonghuYingShouFei[i].lateFee).toFixed(2));
						}

						$(".yonghu-yingshoufei-length").text(data.yonghuYingShouFei.length)
						data.yonghuYingShouFei.length == 0 ? $(".yonghu-yingshoufei-bcql").text(0) : $(".yonghu-yingshoufei-bcql")
							.text(bcql)
						data.yonghuYingShouFei.length == 0 ? $(".yonghu-yingshoufei-qctotalje").text(0) : $(
							".yonghu-yingshoufei-qctotalje").text(qctotalje.toFixed(2))
							window.localStorage.setItem("arrears","false")
					}
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
	userInfo(userInfoApi, dataId)
	$("#content").on("tap", ".cost-record-btn", function() {
		mui.openWindow({
			url: "/pages/cost_record.html",
			id: "cost_record.html"
		})
	})
/* 	console.log(typeof(window.localStorage.getItem("arrears"))) */
	if(window.localStorage.getItem("arrears")=="false"){
		$("#content").on("tap", ".pre-charge-btn", function() {
			mui.openWindow({
				url: "/pages/cost_record.html",
				id: "cost_record.html"
			})
		})
	}
	
})
