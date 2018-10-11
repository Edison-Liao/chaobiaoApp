(function($) {
	$.init();
	mui.plusReady(function() {
		/*---小区-----*/
		var communityApi = "http://223.85.248.171:8012/ashx/WebBaseInfo.asmx/GetXiaoqu",
			accountApi = "http://223.85.248.171:8012/ashx/WebBaseInfo.asmx/GetZhangBen",
			readApi = "http://223.85.248.171:8012/ashx/WebBaseInfo.asmx/GetChaoBiaoCe",
			userID = window.localStorage.getItem("userID"),
			herfIndex = window.localStorage.getItem("herfIndex"),
			newDate = new Date(),
			/* 	newDate.setDate(newDate.getDate() - 1), */
			newYear = newDate.getFullYear(),
			newMonth = newDate.getMonth() + 1 <= 9 ? "0" + (newDate.getMonth() + 1) : newDate.getMonth() + 1,
			newDay = newDate.getDate() <= 9 ? "0" + newDate.getDate() : newDate.getDate(),
			date = window.localStorage.setItem("newDate", newYear + "-" + newMonth + "-" + newDay),
			dataList = [],
			inputList = {
				/* 小区列表方法 */
				communityList: function(api) {
					$.ajax({
						url: api,
						type: "POST",
						dataType: "xml",
						data: "",
						beforeSend: function() {
							plus.nativeUI.showWaiting("等待中");
						},
						success: function(data, dataList) {
							plus.nativeUI.closeWaiting();
							var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue).ResultData,
								dataList = [];
							for (var i = 0; i < data.length; i++) {
								var obj = {
									value: data[i].xiaoquid,
									text: data[i].xqname
								};
								dataList.push(obj);
							}
							userPicker.setData(dataList);
						},
						error: function(data) {
							//alert($.parseJSON(data.responseText).Message);
							/*				var jsonData = JSON.stringify(data); // 转成JSON格式
											var result = $.parseJSON(jsonData); // 转成JSON对象*/
							mui.alert("获取数据失败，请返回上级页面")
							plus.nativeUI.closeWaiting();
						},
						complete: function(data) { //after success or error
						}
					})
				},
				/* 账本列表方法 */
				accountBook: function(api, dataID, dataList) {
					$.ajax({
						url: api,
						type: "POST",
						data: {
							userId: dataID
						},
						timeout: 10000, //超时时间设置为10秒；
						beforeSend: function() {
							plus.nativeUI.showWaiting("等待中");
						},
						success: function success(data) {
							plus.nativeUI.closeWaiting();
							var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue).ResultData,
								dataList = [];
							for (var i = 0; i < data.length; i++) {
								var obj = {
									value: data[i].caobiaoZBid,
									text: data[i].caobiaoZBNAME
								};
								dataList.push(obj);
							}
							userPicker.setData(dataList);
						},
						error: function(data) {
							//alert($.parseJSON(data.responseText).Message);
							/*				var jsonData = JSON.stringify(data); // 转成JSON格式
											var result = $.parseJSON(jsonData); // 转成JSON对象*/
							mui.alert("获取数据失败，请返回上级页面")
							plus.nativeUI.closeWaiting();
						},
						complete: function(data) { //after success or error
						}
					})
				},
				/* 抄表册列表方法 */
				readBook: function(api, dataID, dataList) {
					$.ajax({
						url: api,
						type: "POST",
						data: {
							zbId: dataID
						},
						beforeSend: function() {
							plus.nativeUI.showWaiting("等待中");
						},
						success: function success(data) {
							plus.nativeUI.closeWaiting();
							var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue).ResultData,
								dataList = [];
							for (var i = 0; i < data.length; i++) {
								var obj = {
									value: data[i].caobiaoCEid,
									text: data[i].caobiaoCeName
								};
								dataList.push(obj);
							}
							userPicker.setData(dataList);
						},
						error: function(data) {
							//alert($.parseJSON(data.responseText).Message);
							/*				var jsonData = JSON.stringify(data); // 转成JSON格式
											var result = $.parseJSON(jsonData); // 转成JSON对象*/
							mui.alert("获取数据失败，请返回上级页面")
							plus.nativeUI.closeWaiting();
						},
						complete: function(data) { //after success or error
						}
					})
				},

			};

		var userPicker = new $.PopPicker();
		/* 调用小区方法 */
		$("#content").on("tap", "#community", function(event) {
			inputList.communityList(communityApi, dataList)
			var community = document.getElementById("community").getElementsByTagName("input")[0];
			userPicker.show(function(items, index) {
				community.value = items[0].text;
				window.localStorage.setItem("xiaoquid", items[0].value)
			})
		}, false);
		/* 调用账本方法 */
		$("#content").on("tap", "#account-book", function(event) {
			inputList.accountBook(accountApi, userID, dataList)
			var accountBook = document.getElementById("account-book").getElementsByTagName("input")[0];
			userPicker.show(function(items, index) {
				accountBook.value = items[0].text;
				window.localStorage.setItem("accountBook", items[0].value)
			})
		}, false);
		/* 调用抄表册方法 */
		$("#content").on("tap", "#read-book", function(event) {
			var accountID = window.localStorage.getItem("accountBook");
			if (accountID !== null) {
				inputList.readBook(readApi, accountID, dataList)
				var readBook = document.getElementById("read-book").getElementsByTagName("input")[0];

				userPicker.show(function(items, index) {
					readBook.value = items[0].text;
					window.localStorage.setItem("readBook", items[0].value)
				})
			}
		}, false);
		/* 调用时间方法 */
		$("#content").on("tap", ".start-time", function(event) {
			var startTime = document.getElementsByClassName("start-time")[0].getElementsByTagName("input")[0],
				startPicker = new mui.DtPicker({
					type: 'date'
				});
			startPicker.show(function(items) {

				startTime.value = items.text;
			})

		}, false);
		$("#content").on("tap", ".end-time", function(event) {
			var endTime = document.getElementsByClassName("end-time")[0].getElementsByTagName("input")[0],
				endPicker = new mui.DtPicker({
					type: 'date'
				});
			endPicker.show(function(items) {
				endTime.value = items.text;
			})

		}, false);
	})

})(mui);
