$(document).ready(function(){
	// 오늘 날짜 값 지정
	var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    
    // 날짜 유효성 검사 (이벤트 위임 사용)
    $(document).on('blur', '.date-valid, .datepicker', function() {
        console.log("유효성 검사 시작")
        var enteredDateStr = $(this).val();
        if(enteredDateStr == null || enteredDateStr == ''){
			return;
        }
        
        var dateCheckResult = isValidDate(enteredDateStr);
        if (!dateCheckResult.valid) {
            alert('유효하지 않은 날짜입니다. 다시 입력해주세요.');
            $(this).val('');
            $('#regiDateValidationMessage').text('유효하지 않은 날짜입니다.').show();
            return;
        }

        if (dateCheckResult.year < 2000) {
            alert('년도는 2000년도 미만의 값을 넣을 수 없습니다.');
            $(this).val('');
            $('#regiDateValidationMessage').text('년도는 2000년 이상이어야 합니다.').show();
            return;
        }
        
        if(now == 'prjRegi' || now == 'userSearch' || now == 'userDetail'){
			return false;
		}

        var enteredDate = new Date(enteredDateStr);
        enteredDate.setHours(0,0,0,0);
        
        var today = new Date();
        today.setHours(0,0,0,0);

        if (enteredDate > today) {
            alert('오늘 날짜 이후로 설정할 수 없습니다.');
            $(this).val('');
            $('#regiDateValidationMessage').text('오늘 날짜 이전이어야 합니다.').show();
        } else {
            $('#regiDateValidationMessage').text('').hide();
        }
        
    });
}); // document.ready

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