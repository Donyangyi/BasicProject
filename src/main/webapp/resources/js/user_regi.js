// 중복 체크 된 아이디 값
var checkedUserId = "";

$(document).ready(function() {
	var isComposing = false; // 한글 입력 중인지를 나타내는 플래그
	
	// 오늘 날짜 값 지정
	var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('regiDate').setAttribute("max", today);
	
	$(".input-field").on('compositionstart', function() {
        isComposing = true; // 한글 입력 시작
    });

    $(".input-field").on('compositionend', function() {
        isComposing = false; // 한글 입력 종료
        $(this).trigger('input');
    });
	
	// 패스워드 일치 여부 판단
	$('#confirmPassword').on('input', function() {
		const password = $('#password').val();
		const confirmPassword = $(this).val();
		const mismatchMessage = $('#passwordMismatch');
		if (password !== confirmPassword) {
			mismatchMessage.show();
		} else {
			mismatchMessage.hide();
		}
	});

    // 사용자 이름 유효성 검사 및 입력 제한
    $('#name').on('input', function() {
        if (!isComposing) {
            restrictInput(this, /^[가-힣a-zA-Z]+$/, 2, 15, '#userNmValidationMessage', '사원명은 한글 또는 영문 대소문자로 구성되며, 2~15자 사이여야 합니다.');
        }
    });

    // 사용자 ID 유효성 검사 및 입력 제한
    $('#userId').on('input', function() {
        if (!isComposing) {
            restrictInput(this, /^[a-zA-Z0-9]+$/, 7, 20, '#userIdValidationMessage', '아이디는 영문 대소문자와 숫자만 포함할 수 있으며, 7~20자 사이여야 합니다.');
        }
    });

    // 비밀번호 유효성 검사 및 입력 제한
    $('#password, #confirmPassword').on('input', function() {
        if (!isComposing) {
            restrictInput(this, /^[a-zA-Z0-9!@#$]+$/, 7, 20, '#userPwValidationMessage', '비밀번호는 영문 대소문자, 숫자 및 특수문자(!@#$)를 모두 포함해야 하며, 7~20자 사이여야 합니다.');
        }
    });
    
    // 비밀번호 조합 유효성 검사
    $('#password, #confirmPassword').on('input', function() {
	    if (!isComposing) {
	        var inputVal = $(this).val();
	        // 길이 체크
	        var lengthCheck = inputVal.length >= 7 && inputVal.length <= 20;
	        // 조합 체크 (대문자, 소문자, 숫자, 특수문자)
	        var combinationCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$]).*$/.test(inputVal);
	
	        if (lengthCheck && !combinationCheck) {
	            $('#userPwValidationMessage').text('비밀번호는 영문 대소문자, 숫자, 특수문자(!@#$)의 4가지 조합으로 이루어져야 합니다.').show();
	        }
	    }
	});

    // 주소 상세 유효성 검사 및 입력 제한
    $('#address-detail').on('input', function() {
        if (!isComposing) {
            restrictInput(this, /^[가-힣a-zA-Z0-9\s-]+$/, 0, 50, '#addressValidationMessage', '주소는 하이픈(-)을 제외한 특수문자를 포함할 수 없습니다.');
        }
    });
    
    // 입사일 입력 필드에 대한 blur 이벤트 리스너 추가
    $('#regiDate').on('blur', function() {
        var enteredDateStr = $(this).val();
        var dateCheckResult = isValidDate(enteredDateStr);

        if (!dateCheckResult.valid) {
            alert('유효하지 않은 날짜입니다. 다시 입력해주세요.');
            $(this).val('');
            $('#regiDateValidationMessage').text('유효하지 않은 날짜입니다.').show();
            return; // 유효하지 않은 날짜일 경우 여기서 함수를 종료합니다.
        }

        // 년도가 2000년 이하인지 검사
        if (dateCheckResult.year < 2000) {
            alert('년도는 2000년도 미만의 값을 넣을 수 없습니다.');
            $(this).val('');
            $('#regiDateValidationMessage').text('년도는 2000년 이상이어야 합니다.').show();
            return; // 년도가 2000년 이하일 경우 여기서 함수를 종료합니다.
        }

        var enteredDate = new Date(enteredDateStr);
        var today = new Date();
        today.setHours(0,0,0,0); // 오늘 날짜의 시간을 00:00:00.000으로 설정

        // 입력된 날짜가 오늘 날짜 이후인 경우 경고 메시지 표시
        if (enteredDate > today) {
            alert('입사일은 오늘 날짜 이후로 설정할 수 없습니다.');
            $(this).val('');
            $('#regiDateValidationMessage').text('입사일은 오늘 날짜 이전이어야 합니다.').show();
        } else {
            // 유효한 날짜인 경우, 유효성 검사 메시지를 숨김
            $('#regiDateValidationMessage').text('').hide();
        }
    });

	// 업로드 파일 버튼 이벤트
	$('#customFileUpload').on('click', function() {
		$('#userImage').click();
	});

	// 파일 등록 시 이미지 미리보기
	$('#userImage').on('change', function() {
	    const [file] = this.files;
	    if (file && file.size > 5 * 1024 * 1024) {
	        alert('파일 크기가 5MB를 초과합니다. 다른 파일을 선택해 주세요.');
	        $(this).val('');
	        // 기존 이미지(placeholder)로 다시 설정
	        $('#userImgPreview').attr('src', '../image/user-placeholder.png');
	    } else if (file) {
	        // 파일이 적절한 크기일 때만 이미지 미리보기
	        $('#userImgPreview').attr('src', URL.createObjectURL(file));
	    } else {
	        // 파일 선택이 취소되었을 경우 기존 이미지로 유지
	        $('#userImgPreview').attr('src', '../image/user-placeholder.png');
	    }
	});
	
	// 등록 버튼 이벤트
	$('.submitRegistration').on('click', function(e) {
		e.preventDefault();
       
       // 파일 선택 여부 확인
	    var fileInput = $('#userImage')[0];
	    if (!fileInput.files.length) {
		    alert('파일을 선택해주세요.');
		    $('#fileValidationMessage').text('파일을 선택해주세요.').show(); // 파일 선택 안내 메시지 출력
		    return; // 파일이 선택되지 않았으므로 여기서 함수 종료
		} else {
		    $('#fileValidationMessage').text('').hide(); // 에러 메시지 숨김
		}
    
       checkValid();
    });
    
    // 지역번호 및 개인번호 변경시 이벤트
    $('#phonePrefix').on('change', function() {
		togglePhoneInput();
	});
	
	// 전화번호 입력 필드에 대한 이벤트 리스너 추가
    $('#phone').on('input', function() {
        var input = $(this).val();
        // 숫자만 입력되었는지 확인하고, 숫자 이외의 문자를 제거
        var numericInput = input.replace(/[^0-9]/g, '');

        // 숫자 4개가 입력되었을 때 자동으로 대시(-) 추가
        if (numericInput.length == 4 && !numericInput.includes('-')) {
            $(this).val(numericInput + '-');
        }
    });
    
    // 이메일 변경 시 이벤트
    $('#emailPrefix').on('change', function() {
        toggleEmailInput();
    });
    
    // 아이디 중복 검사
    $('#duplicate-check').on('click', function(e){
		e.preventDefault();
		duplicateCheck();
	});
	
	// 주소 조회
	$('#search-address').on('click', function(e){
		e.preventDefault();
		searchAddress();
	});
});

// 로그인 창으로 돌아가기
function prevPage() {
	location.href = "${root}main";
}

// 유효성 검사
function checkValid(){
	addr = $('#address').val();
	addrDetail = $('#address-detail').val()
	var email = $("#email").val() + "@" + $("#emailDetail").val();
	var userId = $('#userId').val()
	var areaNumber = document.getElementById("phonePrefix").value;
	var telNumber = $('#phone').val();
	var phoneNumber = "";

	// 아이디 변경시 중복 검사 수행을 부탁하는 alert 
	if(checkedUserId != userId){
		alert("아이디 중복 검사를 해주세요.")
		return false;
	}
	
	// 폰 번호가 직접입력과 선택입력에 따른 값 처리
	if (areaNumber === "write-phone") {
		phoneNumber = telNumber
	} else {
		phoneNumber = areaNumber + "-" + telNumber;
	}
	
	console.log(phoneNumber);
	
	// 주소 합치기
	var addressCombined = addr + " " + addrDetail;
	if (addressCombined.trim() === "") {
	    addressCombined = null;
	}

    var userInfo = {
            userNm: $('.name').val(),
            userId: $('.userId').val(),
            userPw: $('.password').val(),
            phoneNumber: phoneNumber,
            regiDate: $('.regiDate').val(),
            email: email,
            address: addressCombined
        };
    
	$.ajax({
        url: 'user_valid_pro',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userInfo),
        dataType: 'json',
        success: function(response) {
			if(response.success){
				$('.validation-message').text('').hide();
				submitForm();
			} else{
				alert("오류 발생!")
			}
        },
        error: function(xhr, status, error) {
            if(xhr.status === 400) {
		        var errors = JSON.parse(xhr.responseText);
		        $('.validation-message').text('').hide();
		        for(var key in errors) {
		            var message = errors[key];
		            $("#" + key + "ValidationMessage").text(message).show();
		        }
		    } else {
				console.log(xhr.status);
		    }
        }
    });
}

// 유저 추가
function submitForm() {
	var areaNumber = document.getElementById("phonePrefix").value;
	var telNumber = $('#phone').val();
	var phoneNumber = "";
	var email = $("#email").val() + "@" + $("#emailDetail").val();
	
	if (areaNumber === "write-phone") {
		phoneNumber = telNumber
	} else {
		phoneNumber = areaNumber + "-" + telNumber;
	}
	
    // FormData 객체를 사용하여 폼 데이터 수집
    var formData = new FormData();
    formData.append('name', $('.name').val());
    formData.append('userId', $('.userId').val());
    formData.append('userPw', $('.password').val());
    formData.append('genderCd', $('.gender').val());
    formData.append('phone', phoneNumber);
    formData.append('regiDate', $('.regiDate').val());
    formData.append('posCd', $('.position').val());
    formData.append('skillRankCd', $('#skillLevel').val());
    formData.append('email', email);
    formData.append('address', $('#address').val());
    formData.append('addressDetail', $('#address-detail').val());
    $('input[name="skills"]:checked').each(function() {
        formData.append('skills', $(this).val());
    });
    formData.append('userImage', $('#userImage')[0].files[0]);
	
    $.ajax({
        url: 'user_regi_pro',
        type: 'POST',
        dataType: 'json',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
			console.log(response.success)
			if(response.success){
				alert('등록 성공!');
            	window.history.go(-1);
			}else{
				alert('계정 생성에 문제가 발생 하였습니다. 관리자에게 문의 해주시기 바랍니다.');
			}
            
        },
        error: function(xhr, status, error) {
            console.error(error);
            alert('필수 입력 사항을 입력하지 않았습니다. 다시 한번 확인해 주세요.');
        }
    });
}

// 핸드폰 번호 입력
function togglePhoneInput() {
    var prefix = document.getElementById("phonePrefix").value;
    var phoneInput = document.getElementById("phone");
    

    if (prefix === "write-phone") {
		phoneInput.maxLength = "13";
		
		phoneInput.oninput = function() {
        var numbers = this.value.replace(/\D/g, '');
        var char = {3:'-', 7:'-'};
        var phoneNumber = '';
        for (var i = 0; i < numbers.length; i++) {
            phoneNumber += (char[i]||'') + numbers[i];
        }
        this.value = phoneNumber;
    	};
		
        phoneInput.style.display = "inline-block";
        phoneInput.placeholder = "000-0000-0000";
        phoneInput.value = '';
    } else {
		phoneInput.maxLength = 9;
		phoneInput.oninput = function() {
	        var numbers = this.value.replace(/\D/g, '');
	        var char = {4:'-'};
	        var phoneNumber = '';
	        for (var i = 0; i < numbers.length; i++) {
	            phoneNumber += (char[i]||'') + numbers[i];
	        }
	        this.value = phoneNumber;
	    };
    	
        phoneInput.placeholder = "0000-0000";
        phoneInput.value = '';
    }
}

// 이메일 입력
function toggleEmailInput() {
    var emailPrefix = $('#emailPrefix').val();
    var emailText = $('#emailPrefix option:selected').text();
    
    if (emailPrefix === "write-email") {
        $('#emailDetail').val("");
        $('#emailDetail').show();
    } else {
		$('#emailDetail').val("");
		$('#emailDetail').val(emailText);
        $('#emailDetail').hide();
    }
}

function duplicateCheck(){
	var userId = $('#userId').val();
	
	if(userId == "" || userId == null){
		alert("아이디를 입력해 주세요.");
		return false;
	}
	
	$.ajax({
		url: "duplicate_check_pro/" + userId,
		type: "GET",
		dataType: "json",
		success: function(response){
			if(response.success){
				alert(response.message);
				checkedUserId = userId;
			} else {
				alert(response.message);
			}
		},
		error: function(xhr, error){
			alert("오류 발생: ", error, " 오류 코드 : " ,xhr.status);
		}
	})
}

function searchAddress() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ') ';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("address").value = extraAddr;
            
            } else {
                document.getElementById("address").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('address').value += ("(우:" + data.zonecode + ") ");
            document.getElementById("address").value += addr;
            $("#address").val(document.getElementById("address").value);
            
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("address-detail").focus();
        }
    }).open();
}

// input feild 유효성 검사
function restrictInput(selector, pattern, minLength, maxLength, errorMessageSelector, message) {
    var inputVal = $(selector).val();
    var modifiedInput = inputVal.split('').filter(char => pattern.test(char)).join('');

    if (inputVal !== modifiedInput || modifiedInput.length < minLength || modifiedInput.length > maxLength) {
        $(selector).val(modifiedInput);
        $(errorMessageSelector).text(message).show();
    } else {
        $(errorMessageSelector).text('').hide();
    }
}

// 날짜 유효성 검사 함수
function isValidDate(dateString) {
    var parts = dateString.split("-");
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1; // JavaScript의 월은 0부터 시작합니다.
    var day = parseInt(parts[2], 10);
    var date = new Date(year, month, day);
    if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
        return { valid: true, year: year }; // 유효한 날짜입니다.
    } else {
        return { valid: false }; // 유효하지 않은 날짜입니다.
    }
}