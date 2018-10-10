mui.init();
mui.plusReady(function() {
	var yhname = window.localStorage.getItem("yhname").length > 1 ? window.localStorage.getItem("yhname").split(",") :
		window.localStorage.getItem("yhname"),
		yonhuID = window.localStorage.getItem("yonhuID").length > 1 ? window.localStorage.getItem("yonhuID").split(",") :
		window.localStorage.getItem("yonhuID"),
		yhcode = window.localStorage.getItem("yhcode").length > 1 ? window.localStorage.getItem("yhcode").split(",") :
		window.localStorage.getItem("yhcode"),
		AddressMS = window.localStorage.getItem("AddressMS").length > 1 ? window.localStorage.getItem("AddressMS").split(
			",") : window.localStorage.getItem("AddressMS"),
		isChaoBiao = window.localStorage.getItem("isChaoBiao").length > 1 ? window.localStorage.getItem("isChaoBiao").split(
			",") : window.localStorage.getItem("isChaoBiao"),
		herfIndex = window.localStorage.getItem("herfIndex"),
		dataTwo = window.localStorage.getItem("dataTwo"),
		usersinfoApi = "http://223.85.248.171:8012/ashx/WebYonghuManagement.asmx/GetYonghuInfo",
		userInfo = {
			url: "/pages/user_info.html",
			id: "user_info"
		},
		usersInfo = function(api, infoData, userInfo) {
			$.ajax({
				url: api,
				type: "POST",
				data: infoData,
				success: function(data) {
					var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue).ResultData,
						/* 欠费气量 */
						bcql = 0,
						/* 欠费金额 */
						qctotalje = 0,
						/* 账户余额 */
						totalje = 0,
						/* 滞纳金 */
						lateFee = 0,
						yingshoufeiID = [];

					/* 欠费气量和金额累加 */
					for (var i = 0; i < data.yonghuYingShouFei.length; i++) {
						yingshoufeiID.push(data.yonghuYingShouFei[i].yshoufeiid)
						bcql += parseFloat(data.yonghuYingShouFei[i].bcql);
						qctotalje += parseFloat((data.yonghuYingShouFei[i].qctotalje).toFixed(2));
						totalje += parseFloat((data.yonghuYingShouFei[i].totalje).toFixed(2));
						lateFee += parseFloat((data.yonghuYingShouFei[i].lateFee).toFixed(2));

					}
					window.localStorage.setItem("yingshoufeiID", yingshoufeiID)
					/* 从list点击显示用户详情信息 */
					var infoList1 =
						"<ul class=\"mui-table-view user-info\">\n<li class=\"mui-table-view-cell\" xh=\"" + data.yonghuInfo.xh +
						"\">\n<span class=\"yonghu-info-code\" code= \"" + data.yonghuInfo.yhcode +
						"\">\u7528\u6237\u7F16\u53F7\uFF1A" + data.yonghuInfo.yhcode +
						"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"yonghu-info-name\">\u7528\u6237\u540D\u79F0\uFF1A" +
						data.yonghuInfo.yhname +
						"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"yonghu-info-address\">\u8054\u7CFB\u5730\u5740\uFF1A" +
						data.yonghuInfo.AddressMS +
						"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"yonghu-info-phone\">\u8054\u7CFB\u7535\u8BDD\uFF1A" +
						data.yonghuInfo.handPhone +
						"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"yonghu-info-balance\">\u8D26\u6237\u4F59\u989D\uFF1A" +
						data.yonghuInfo.bcye +
						"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"yonghu-info-state\">\u7528\u6237\u72B6\u6001\uFF1A" +
						(data.yonghuInfo.ztbz == 1 ? "正常" : data.yonghuInfo.ztbz == 2 ? "停用" : "未启用") +
						"</span></li>\n<li class=\"mui-table-view-cell\">\n<span class=\"yonghu-info-number\" ickaBH= \"" + data.yonghuInfo
						.ickaBH + "\">\u6C14\u8868\u7F16\u53F7\uFF1A" + data.yonghuInfo.ickaBH +
						"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"yonghu-info-standard\">\u4EF7\u683C\u6807\u51C6:" +
						data.yonghuInfo.JGName +
						"</span>\n</li>\n<button type=\"button\" class=\"mui-btn-blue first-btn pre-charge-btn\">\u9884\u6536\u8D39\u7528</button>\n<button type=\"button\" class=\"mui-btn-blue last-btn cost-record-btn\">\u8D39\u7528\u8BB0\u5F55</button>\n</ul>";

					/* 从详情列表点击显示用户详情信息 */
					var infoList2 = "<ul class=\"mui-table-view user-info\">\n<li class=\"mui-table-view-cell\" xh=\"" + data.yonghuInfo
						.xh + "\">\n<span class=\"yonghu-info-code\" code= \"" + data.yonghuInfo.yhcode +
						"\">\u7528\u6237\u7F16\u53F7\uFF1A" + data.yonghuInfo.yhcode +
						"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"yonghu-info-name\">\u7528\u6237\u540D\u79F0\uFF1A" +
						data.yonghuInfo.yhname +
						"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"yonghu-info-address\">\u8054\u7CFB\u5730\u5740\uFF1A" +
						data.yonghuInfo.AddressMS +
						"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"yonghu-info-phone\">\u8054\u7CFB\u7535\u8BDD\uFF1A" +
						data.yonghuInfo.handPhone +
						"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"yonghu-info-balance\">\u8D26\u6237\u4F59\u989D\uFF1A" +
						data.yonghuInfo.bcye +
						"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"yonghu-info-state\">\u7528\u6237\u72B6\u6001\uFF1A" +
						(data.yonghuInfo.ztbz == 1 ? "正常" : data.yonghuInfo.ztbz == 2 ? "停用" : "未启用") +
						"</span></li>\n<li class=\"mui-table-view-cell\">\n<span class=\"yonghu-info-number\" ickaBH= \"" + data.yonghuInfo
						.ickaBH + "\">\u6C14\u8868\u7F16\u53F7\uFF1A" + data.yonghuInfo.ickaBH +
						"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"yonghu-info-standard\">\u4EF7\u683C\u6807\u51C6:" +
						data.yonghuInfo.JGName + "</span>\n</li>\n</ul>";

					if (data.yonghuChaobiao !== null) {
						/* 档案搜索详情抄表列表 */
						var readList1 =
							"<ul class=\"mui-table-view user-info reading-true\" reading=\"true\">\n<li class=\"mui-table-view-cell\">\n<span class=\"\">\n\u5F53\u524D\u8D26\u671F\uFF1A" +
							data.yonghuChaobiao.kjyear + "\u5E74" + data.yonghuChaobiao.period +
							"\u6708\u8D26\u671F</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"\">\n\u6284\u8868\u72B6\u6001\uFF1A" +
							(data.yonghuChaobiao.Qids == data.yonghuChaobiao.Zhids ? "未抄表" : "已抄表") +
							" \n</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"\">\u4E0A\u6B21\u8BFB\u6570\uFF1A" +
							data.yonghuChaobiao.Qids +
							"\n</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"\">\u672C\u6B21\u8BFB\u6570\uFF1A" +
							data.yonghuChaobiao.Zhids +
							"</span>\n</li>\n<button type=\"button\" class=\"mui-btn-blue last-btn reading-btn\">\u7ACB\u5373\u6284\u8868</button>\n</ul>";

						/* 抄表搜索详情抄表列表 */
						var readList2 =
							"<ul class=\"mui-table-view user-info reading-true\" reading=\"true\">\n<li class=\"mui-table-view-cell\">\n<span class=\"\">\n\u5F53\u524D\u8D26\u671F\uFF1A" +
							data.yonghuChaobiao.kjyear + "\u5E74" + data.yonghuChaobiao.period +
							"\u5E74\u8D26\u671F\n</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"\">\n\u6284\u8868\u72B6\u6001\uFF1A" +
							(data.yonghuChaobiao.Qids == data.yonghuChaobiao.Zhids ? "未抄表" : "已抄表") +
							"\n</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"\">\n\u4E0A\u6B21\u8BFB\u6570\uFF1A" +
							data.yonghuChaobiao.Qids +
							"\n</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<label class=\"reading-lable mui-pull-left\">\u672C\u6B21\u8BFB\u6570\uFF1A</label>\n<input type=\"text\" class=\"mui-input-clear reading-input mui-pull-left\" \nplaceholder=\"\u8BF7\u8F93\u5165\">\n</li>\n</ul>\n<button type=\"button\" class=\"mui-btn mui-btn-blue mui-btn-block confirm-btn\">\n\u4FDD\u5B58\n</button>"
						window.localStorage.setItem("Qids", data.yonghuChaobiao.Qids)
						window.localStorage.setItem("Zhids", data.yonghuChaobiao.Zhids)

					}

					if (JSON.stringify(data.yonghuYingShouFei) !== "[]") {
						/* 档案搜索详情欠费列表 */
						var chargeList1 =
							"<ul class=\"mui-table-view user-info\" arrears=\"true\">\n<li class=\"mui-table-view-cell\">\n<span class=\"\">\u6B20\u8D39\u671F\u6570\uFF1A" +
							data.yonghuYingShouFei.length +
							"\n</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"\">\u6B20\u8D39\u6C14\u91CF\uFF1A" +
							bcql +
							"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"\">\u6B20\u8D39\u91D1\u989D\uFF1A" +
							qctotalje.toFixed(2) +
							"</span>\n</li>\n<button type=\"button\" class=\"mui-btn-blue last-btn costing-btn\">\u7ACB\u5373\u6536\u8D39</button>\n</ul>";

						/* 收费列表搜索收费详情 */
						var chargeList2 =
							"<ul class=\"mui-table-view user-info cost-info\" arrears=\"true\">\n<li class=\"mui-table-view-cell\">\n<span class=\"mui-pull-left\">\u6B20\u8D39\u671F\u6570\uFF1A" +
							data.yonghuYingShouFei.length + "</span>\n<span class=\"mui-pull-right\">\u6B20\u8D39\u6C14\u91CF\uFF1A" +
							bcql +
							"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"mui-pull-left totalje-text\">\u6B20\u8D39\u91D1\u989D\uFF1A" +
							totalje.toFixed(2) + "</span>\n<span class=\"mui-pull-right\">\u6EDE\u7EB3\u91D1\uFF1A" + lateFee.toFixed(2) +
							"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"mui-pull-left account-balance\">\n\u8D26\u6237\u4F59\u989D\uFF1A" +
							data.yonghuInfo.bcye.toFixed(2) +
							"\n</span>\n<span class=\"mui-pull-right\">\u672C\u6B21\u5E94\u6536\uFF1A" + qctotalje.toFixed(2) +
							"</span>\n</li>\n<li class=\"mui-table-view-cell\">\n<label class=\"reading-lable mui-pull-left\">\u6536\u5230\u91D1\u989D\uFF1A</label>\n<input type=\"text\" class=\"mui-input-clear cost-input mui-pull-left\" \nplaceholder=\"\u8BF7\u8F93\u5165\">\n</li>\n<li class=\"mui-table-view-cell\">\n<span class=\"mui-pull-left result-number\">\u672C\u6B21\u4F59\u989D\uFF1A\n</span>\n</li>\n</ul>\n<button type=\"button\" class=\"mui-btn mui-btn-blue mui-btn-block confirm-btn\">\n\u786E\u8BA4\u6536\u8D39\n</button>\n";

					}
					/* 存储用户列表 */
					window.localStorage.setItem("infoList1", infoList1)
					window.localStorage.setItem("infoList2", infoList2)
					window.localStorage.setItem("readList1", readList1)
					window.localStorage.setItem("readList2", readList2)
					window.localStorage.setItem("chargeList1", chargeList1)
					window.localStorage.setItem("chargeList2", chargeList2)


					/* 跳转详情页 */
					mui.openWindow(userInfo)

				},
				error: function(data) {
					//alert($.parseJSON(data.responseText).Message);
					/*				var jsonData = JSON.stringify(data); // 转成JSON格式
									var result = $.parseJSON(jsonData); // 转成JSON对象*/
					console.log(data)
				},
				complete: function(data) { //after success or error
				}
			})
		};
	for (var i = 0; i < yhname.length; i++) {

		/* 在档案查询显示内容 */
		if (dataTwo == "null" && herfIndex !== "1") {
			$(".users-list").append(
				"<li class=\"mui-table-view-cell\">\n            <p class=\"name-table-number\"><span class=\"mui-pull-left users-name\">\u59D3\u540D: " +
				yhname[i] + "</span><span class=\"users-number mui-pull-left\">" + yhcode[i] +
				"</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\">\u8054\u7CFB\u5730\u5740: <span class=\"address\">" +
				AddressMS[i] + "</span></p>\n         </li>");
			/* 抄表录入显示已抄表 */
		} else if (isChaoBiao[i] == "false" && herfIndex == "1") {
			$(".users-list").append(
				"<li class=\"mui-table-view-cell\">\n            <p class=\"name-table-number\"><span class=\"mui-pull-left users-name\">\u59D3\u540D: " +
				yhname[i] + "</span><span class=\"users-number mui-pull-left\">" + yhcode[i] +
				"</span><span class=\"mui-pull-left is-read is-read-true\">\u5DF2\u6284\u8868</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\">\u8054\u7CFB\u5730\u5740: <span class=\"address\">" +
				AddressMS[i] + "</span></p>\n        </li>");
			/* 抄表录入显示未抄表 */
		} else if (isChaoBiao[i] == "true" && herfIndex == "1") {
			$(".users-list").append(
				"<li class=\"mui-table-view-cell\">\n            <p class=\"name-table-number\"><span class=\"mui-pull-left users-name\">\u59D3\u540D: " +
				yhname[i] + "</span><span class=\"users-number mui-pull-left\">" + yhcode[i] +
				"</span><span class=\"mui-pull-left is-read is-read-false\">\u672A\u6284\u8868</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\">\u8054\u7CFB\u5730\u5740: <span class=\"address\">" +
				AddressMS[i] + "</span></p>\n        </li>");
		}
	}
	/* 给每一个list添加data_id属性 */
	$('.mui-table-view-cell').each(function(index, item) {
		$(item).attr('data-id', yonhuID[index]);
	});
	/* 每一个list添加点击事件并存储data_id */
	$('.users-list').on("tap", ".mui-table-view-cell", function() {
		var $this = $(this).attr("data-id"),
			data = {
				yonghuId: $this
			};
		usersInfo(usersinfoApi, data, userInfo)
		window.localStorage.setItem("data-id", $this);
	})
});
