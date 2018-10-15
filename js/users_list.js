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
		dataTwo = window.localStorage.getItem("dataTwo");
	/* 显示list页面 */
	for (var i = 0; i < yhname.length; i++) {
		/* 在非抄表录入搜索显示内容 */
		if (dataTwo == "null" && herfIndex !== "1") {
			$(".users-list").append(
				"<li class=\"mui-table-view-cell user-id\">\n            <p class=\"name-table-number\"><span class=\"mui-pull-left users-name\">\u59D3\u540D: " +
				yhname[i] + "</span><span class=\"users-number mui-pull-left\">" + yhcode[i] +
				"</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\">\u8054\u7CFB\u5730\u5740: <span class=\"address\">" +
				AddressMS[i] + "</span></p>\n         </li>");
			/* 抄表录入显示已抄表 */
		} else if (isChaoBiao[i] == "false" && herfIndex == "1") {
			$(".users-list").append(
				"<li class=\"mui-table-view-cell user-id\">\n            <p class=\"name-table-number\"><span class=\"mui-pull-left users-name\">\u59D3\u540D: " +
				yhname[i] + "</span><span class=\"users-number mui-pull-left\">" + yhcode[i] +
				"</span><span class=\"mui-pull-left is-read is-read-true\">\u5DF2\u6284\u8868</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\">\u8054\u7CFB\u5730\u5740: <span class=\"address\">" +
				AddressMS[i] + "</span></p>\n        </li>");
			/* 抄表录入显示未抄表 */
		} else if (isChaoBiao[i] == "true" && herfIndex == "1") {
			$(".users-list").append(
				"<li class=\"mui-table-view-cell user-id\">\n            <p class=\"name-table-number\"><span class=\"mui-pull-left users-name\">\u59D3\u540D: " +
				yhname[i] + "</span><span class=\"users-number mui-pull-left\">" + yhcode[i] +
				"</span><span class=\"mui-pull-left is-read is-read-false\">\u672A\u6284\u8868</span></p>\n            <a class=\"fa fa-angle-right mui-pull-right list-right\"></a>\n            <p class=\"users-address\">\u8054\u7CFB\u5730\u5740: <span class=\"address\">" +
				AddressMS[i] + "</span></p>\n        </li>");
		}
	}
	/* 给每一个list添加data_id属性 */
	$('.user-id').each(function(index, item) {
		$(item).attr("data-id", yonhuID[index]);
	});
	switch (herfIndex) {
		case "0":
			/* 每一个list添加点击事件并存储data_id */
			$('.users-list').on("tap", ".mui-table-view-cell", function() {
				var $this = $(this).attr("data-id");
				mui.openWindow({
					url: "/pages/user_info/user_info.html"
				})
				window.localStorage.setItem("data-id", $this);
			})
			break;
		case "1":

			$('.users-list').on("tap", ".mui-table-view-cell", function() {
				var $this = $(this).attr("data-id");
				mui.openWindow({
					url: "/pages/meter_reading/meter_reading.html"
				})
				window.localStorage.setItem("data-id", $this);
			})

			break;
		case "2":

			$('.users-list').on("tap", ".mui-table-view-cell", function() {
				var $this = $(this).attr("data-id");
				mui.openWindow({
					url: "/pages/fee_charge/fee_charge.html"
				})
				window.localStorage.setItem("data-id", $this);
			})

			break;
		case "3":

			$('.cost-list').on("tap", ".cost-li-list", function() {
				var $this = $(this).attr("data-id");
				/* 	console.log($('.cost-list').html()) */
				mui.openWindow({
					url: "/pages/fee_charge/charge_results.html"
				})
				window.localStorage.setItem("data-id", $this);
			})

			break;
	}
});
