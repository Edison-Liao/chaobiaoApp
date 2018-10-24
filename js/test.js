mui.init();
mui.plusReady(function() {
	//获取对应用户id
	var dataId = window.localStorage.getItem("data-id"),
		//获取用户想起api
		userInfoApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuInfo",
		// 未欠费添加状态
		arrears = window.localStorage.getItem("arrears") == "false",
		//获取用户详情方法
		userInfo = function(api, dataId) {
			$.ajax({
				url: api,
				type: "Post",
				data: {
					pageNow: 1,
					pageSize: 100,
					yonghuId: dataId
				},
				timeout: 10000,
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
					$(".yonghu-info-balance").text(data.yonghuInfo.bcye.toFixed(2))
					$(".yonghu-info-state").text(data.yonghuInfo.ztbz == 1 ? "正常" : data.yonghuInfo.ztbz == 2 ? "停用" : "未启用")
					$(".yonghu-info-number").text(data.yonghuInfo.ickaBH)
					$(".yonghu-info-standard").text(data.yonghuInfo.JGName)
					$(".yonghu-info-code").attr("xh", data.yonghuInfo.xh)
					/* 立即抄表列表 */
					if (data.yonghuChaobiao !== null) {
						$(".reading-chaobiao").removeClass("search-btn-none")
						$(".yonghu-chaobiao-year").text(data.yonghuChaobiao.kjyear)
						$(".yonghu-chaobiao-period").text(data.yonghuChaobiao.period)
						$(".yonghu-chaobiao-ischaobiao").text(data.yonghuChaobiao.Qids == data.yonghuChaobiao.Zhids ? "未抄表" :
								"已抄表"),
							$(".yonghu-chaobiao-Qids").text(data.yonghuChaobiao.Qids)
						$(".yonghu-chaobiao-Zhids").text(data.yonghuChaobiao.Zhids)
						$(".reading-input").val(data.yonghuChaobiao.Zhids)
						$(".yonghu-chaobiao-cjql").text(data.yonghuChaobiao.Zhids - data.yonghuChaobiao.Qids)
						$(".yonghu-chaobiao-bcql1").text(data.yonghuChaobiao.bcql1)
						$(".yonghu-chaobiao-je1").text(data.yonghuChaobiao.jg1.toFixed(2))
						$(".yonghu-chaobiao-gas-charge1").text((data.yonghuChaobiao.bcql1 * data.yonghuChaobiao.jg1).toFixed(2))
						$(".yonghu-chaobiao-bcql2").text(data.yonghuChaobiao.bcql2)
						$(".yonghu-chaobiao-je2").text(data.yonghuChaobiao.jg2.toFixed(2))
						$(".yonghu-chaobiao-gas-charge2").text((data.yonghuChaobiao.bcql2 * data.yonghuChaobiao.jg2).toFixed(2))
						$(".yonghu-chaobiao-bcql3").text(data.yonghuChaobiao.bcql3)
						$(".yonghu-chaobiao-je3").text(data.yonghuChaobiao.jg3.toFixed(2))
						$(".yonghu-chaobiao-gas-charge3").text((data.yonghuChaobiao.bcql3 * data.yonghuChaobiao.jg3).toFixed(2))
						$(".yonghu-chaobiao-bcql4").text(data.yonghuChaobiao.bcql4)
						$(".yonghu-chaobiao-je4").text(data.yonghuChaobiao.jg4.toFixed(2))
						$(".yonghu-chaobiao-gas-charge4").text((data.yonghuChaobiao.bcql4 * data.yonghuChaobiao.jg4).toFixed(2))
					} else {
						$(".reading-chaobiao").addClass("search-btn-none")
						$(".save-btn").addClass("search-btn-none")
					}
					/* 立即收费 */
					if (data.yonghuYingShouFei !== "") {
						var bcql = 0, //欠费气量													
							totalje = 0, //应收金额和欠费金额						
							lateFee = 0, //滞纳金
							yingshoufeiID = []; //应收费id
						for (var i = 0; i < data.yonghuYingShouFei.length; i++) {
							yingshoufeiID.push(data.yonghuYingShouFei[i].yshoufeiid) //应收费id
							bcql += parseFloat(data.yonghuYingShouFei[i].bcql); //欠费气量相加
							totalje += parseFloat((data.yonghuYingShouFei[i].totalje).toFixed(2)); //应收金额和欠费金额相加	
							lateFee += parseFloat((data.yonghuYingShouFei[i].lateFee).toFixed(2)); //滞纳金相加
						}
						data.yonghuYingShouFei.length == 0 ? $(".yonghu-yingshoufei-length").text(data.yonghuYingShouFei.length) : $(
							".yonghu-yingshoufei-length").text(data.yonghuYingShouFei.length + "　　") //欠费期数
						data.yonghuYingShouFei.length == 0 ? $(".yonghu-yingshoufei-bcql").text(0) : $(".yonghu-yingshoufei-bcql")
							.text(bcql) //欠费气量
						data.yonghuYingShouFei.length == 0 ? $(".yonghu-yingshoufei-totalje").text(0) : $(
							".yonghu-yingshoufei-totalje").text(totalje.toFixed(2)) //欠费金额
						data.yonghuYingShouFei.length == 0 ? $(".yonghu-yingshoufei-totalje-ys").text(0) : $(
							".yonghu-yingshoufei-totalje-ys").text((totalje + lateFee - data.yonghuInfo.bcye).toFixed(2)) //应收费金额

						data.yonghuYingShouFei.length == 0 ? $(".yonghu-yingshoufei-lateFee").text(0) : $(
							".yonghu-yingshoufei-lateFee").text(lateFee.toFixed(2)) //滞纳金
						$(".yonghu-yingshoufei-bcye").text(data.yonghuInfo.bcye.toFixed(2)) //账户余额
						$(".yonghu-yingshoufei-length").attr("yingshoufei-id", yingshoufeiID)
						$(".cost-input").val() //收到金额
						$(".yonghu-yingshoufei-this-balance").text() //本次余额
						if (totalje == 0) {
							$(".user-info-list").attr("arrears", "false")
							$(".pre-charge-btn").removeClass("first-btn-active") //添加是否欠费属性
						} else {
							$(".user-info-list").attr("arrears", "true") //添加是否欠费属性
							$(".pre-charge-btn").addClass("first-btn-active")
						}

					}
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

			});
		}
	// 调用用户详情页面方法
	userInfo(userInfoApi, dataId)
	// 点击立即抄表跳转抄表页面
	$("#content").on("tap", ".reading-btn", function() {
		mui.openWindow({
			url: "/pages/meter_reading/meter_reading.html",
			id: "meter_reading"
		})
	})
	// 点击立即收费跳转收费页面
	$("#content").on("tap", ".costing-btn", function() {
		mui.openWindow({
			url: "/pages/fee_charge/fee_charge.html",
			id: "fee_charge",
			createNew: true
		})
	})
	// 点击费用记录跳转页面
	$("#content").on("tap", ".cost-record-btn", function() {
		mui.openWindow({
			url: "/pages/user_info/cost_record.html",
			id: "cost_record.html",
			createNew: true
		})
	})

	// 点击预收费按钮跳转首页页面
	$("#content").on("tap", ".pre-charge-btn", function() {
		if ($(".user-info-list").attr("arrears") == "false") {
			mui.openWindow({
				url: "/pages/fee_charge/fee_charge.html",
				id: "fee_charge",
				createNew: true
			})
		}
	})
	//点击跳转档案详情页面
	$("#content").on("tap", ".file-details-btn", function() {
		mui.openWindow({
			url: "/pages/user_info/user_info.html",
			id: "user_info.html",
			createNew: true
		})
	})
	//点击重新录入跳转录入界面
	$("#content").on("tap", ".again-reading-btn", function() {
		mui.openWindow({
			url: "/pages/meter_reading/meter_reading.html",
			id: "meter_reading",
			createNew: true
		})
	})
	//返回搜索按钮跳转收费搜索界面
	$("#content").on("tap", ".return-search-btn", function() {
		mui.openWindow({
			url: "/pages/search.html",
			id: "go-search.html",
			createNew: true
		})
	})
})
