mui.init();
mui.plusReady(function () {
	var api = "http://223.85.248.171:8012/ashx/WebAppUserInfo.asmx/GetUserLogin", //调用登陆接口
		loginMes = "内容不能为空", //报错提示
		indexHtml = {
			url: "/index.html",
			id: "index.html"
		},
		/*登录方法
		 * api:string(ajax调用地址),
		 * userID：string(管理员id),
		 * userPass:string(管理员password)，
		 * mes：string(错误提示信息)
		 * */
		login = function (api, userID, userPass, openInfo, mes) {
			$.ajax({
				url: api,
				type: "Post",
				data: {
					userCode: userID,
					userPass: userPass
				},
				beforeSend: function() {
					plus.nativeUI.showWaiting("等待中");
				},
				success: function success(data) {
					plus.nativeUI.closeWaiting();
					var data = JSON.parse(data.getElementsByTagName("string")[0].childNodes[0].nodeValue),
						userName = data.ResultData.UserName,
						userId = data.ResultData.userId,
						UserDepart=data.ResultData.UserDepart,
						zuticode=data.ResultData.zuticode;
					if (data.DataSuccess) {
						mui.openWindow(openInfo)
						window.localStorage.setItem("userID", userId);
						window.localStorage.setItem("userName", userName);
						window.localStorage.setItem("userPass", userPass);
						window.localStorage.setItem("UserDepart", UserDepart);
						window.localStorage.setItem("zuticode",zuticode)
						mui.toast('登录成功');
					} else {
						mui.alert(mes)
					}
				},
				error: function (data) {
					//200的响应也有可能被认定为error，responseText中没有Message部分
					plus.nativeUI.closeWaiting();
					mui.alert(JSON.parse(data.responseText).Message);

				},
				complete: function (data) {
					//after success or error
				}
			});
		}
	/*调用登录功能*/
	mui(".login-form").on("tap", ".login-btn", function () {
		var userID = $("#user-id").val(),
			userPass = $("#user-pass").val();
		login(api, userID, userPass, indexHtml, loginMes)
	})

})