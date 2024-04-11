$(document).ready(function(){
	$('.login-btn').on('click', function(){
		checkLogin();
	});
	
	$(".login-left input").keypress(function(event) {
        if (event.which == 13) { // 엔터
            event.preventDefault();
            checkLogin();
        }
    });
});

function regPage(){
	location.href="user/user_regi";
}

function checkLogin() {
	data = {
		 userId: $('#user_id').val(),
		 userPw: $('#user_pw').val()
	}
	
	console.log(data.userId);
	console.log(data.userPw);
	
	if(data.userId == null || data.userPw == null){
		alert('아이디와 비밀번호를 확인해 주세요.')
		return;
	}
	
	$.ajax({
		url: 'check_login_pro',
		type: 'POST',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(data),
		success: function(response){
			if(response.success){
				alert(response.message);
				location.href="main_page/main";
			} else {
				alert(response.message);
				$('user_pw').val('');
			}
		},
		error: function(xhr){
			alert('아이디와 비밀번호 입력이 올바른지 확인해 주세요.')
			console.log(xhr.status);
		}
	});
}