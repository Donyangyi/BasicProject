let modifyFlag = false;
$(document).ready(function(){
	togglePhoneInput();
	
	let phoneNumber = $("#hiddenPhoneNumber").val();
	$('#phone').val(phoneNumber);
	
	// hiddenEmail 입력 필드에서 이메일 주소 가져오기
    var email = $("#hiddenEmail").val();
    
    // 이메일 주소가 정의되어 있는지 확인
    if (email) {
        // '@'를 기준으로 이메일 주소를 나눔
        var emailParts = email.split('@');
        
        // 나눠진 값 설정
        if (emailParts.length === 2) {
            $('#email').val(emailParts[0]); // 사용자 이름 부분
            $('#emailDetail').val(emailParts[1]); // 도메인 부분
        }
    }
    
    // '직접입력' 옵션이 선택되어 있지 않으면 선택하기
    if ($("#emailDetail").val() !== "") {
        $('#emailPrefix').val("write-email"); // '직접입력' 옵션 선택
    }
    
	$(document).on('click', '#modify-button', function(){
		modifyFlag = true;
		$('#search-address').show();
		$('#address-detail').show();
		$('#modify-button').hide();
	});
});

