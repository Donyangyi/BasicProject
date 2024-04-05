//var getUserList = [];
//var getRoleList = []

$(document).ready(function() {
	var isComposing = false; // 한글 입력 중인지를 나타내는 플래그\
	
	// '추가' 버튼 클릭 이벤트
	$(document).on('click', '#add', function(){
		addUserToProject();
	});
	
    // '조회' 버튼 클릭 이벤트
    $(document).on('click', '#search', function() {
		clickSearch();
    });
	
	//프로젝트 명 유효성 검사 (입력 방지)
	$("#project-name, #client-name").on('compositionstart', function() {
        isComposing = true;
    });

    $("#project-name, #client-name").on('compositionend', function() {
        isComposing = false;
        $(this).trigger('input');
    });

    $("#project-name, #client-name").on('input', function() {
        if (isComposing) {
            return;
        }

        var value = $(this).val();
        var specialCharPattern = /[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\s0-9]/g; 
        if (specialCharPattern.test(value)) {
            alert("특수 문자는 입력할 수 없습니다.");
            $(this).val(value.replace(specialCharPattern, ''));
        }
    });
    
    // 날짜 변경 유효성 검사
    $(document).on('blur', '#modal-body .start-date', function() {
	    var $thisRow = $(this).closest('tr');
	    var startDate = new Date($(this).val());
	    var endDate = new Date($thisRow.find('.end-date').val());
	    var prjStartDate = new Date($thisRow.find('.prj-start-date').text());
	    var prjEndDate = new Date($thisRow.find('.prj-end-date').text());
	    var today = new Date();
	
	    startDate.setHours(0, 0, 0, 0);
	    endDate.setHours(0, 0, 0, 0);
	    prjStartDate.setHours(0, 0, 0, 0);
	    prjEndDate.setHours(0, 0, 0, 0);
	    today.setHours(0, 0, 0, 0);
	
	    if (startDate > prjEndDate) {
	        alert('투입일은 프로젝트 종료일 보다 늦을 수 없습니다.');
	        $(this).val(formatDate(prjEndDate));
	    } else if (startDate < prjStartDate) {
	        alert('투입일은 프로젝트 시작일 보다 빠를 수 없습니다.');
	        $(this).val(formatDate(prjStartDate));
	    } else if (startDate > endDate) {
	        alert('투입일은 철수일보다 늦을 수 없습니다.');
	        $(this).val($(this).closest('tr').find('.end-date').val());
	    } else if (startDate > today){
			alert('투입일은 오늘 날짜보다 늦을 수 없습니다.')
		}
	});
	
	$(document).on('change', '#modal-body .end-date', function() {
	    var $thisRow = $(this).closest('tr');
	    var startDate = new Date($thisRow.find('.start-date').val());
	    var endDate = new Date($(this).val());
	    var prjStartDate = new Date($thisRow.find('.prj-start-date').text());
	    var prjEndDate = new Date($thisRow.find('.prj-end-date').text());
	
	    startDate.setHours(0, 0, 0, 0);
	    endDate.setHours(0, 0, 0, 0);
	    prjStartDate.setHours(0, 0, 0, 0);
	    prjEndDate.setHours(0, 0, 0, 0);
	
	    if (endDate > prjEndDate) {
	        alert('철수일은 프로젝트 종료일 보다 늦을 수 없습니다.');
	        $(this).val(formatDate(prjEndDate));
	    } else if (endDate < prjStartDate) {
	        alert('철수일은 프로젝트 시작일 보다 빠를 수 없습니다.');
	        $(this).val(formatDate(prjStartDate));
	    } else if (endDate < startDate) {
	        alert('철수일은 투입일보다 빠를 수 없습니다.');
	        $(this).val($(this).closest('tr').find('.start-date').val());
	    }
	});
});
function clickSearch(){
	var data = {
		userNm: $('#user_name').val(),
    	skillRankCd: $('#skillLevel').val(),
    	prjSeq: selectPrjSeq
	}
   	
    $.ajax({
        url: 'get_condition_user',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data),
        success: function(response) {
            updateUserInfoTable(response.users, response.roleList);
            //getUserList = response.users;
            //getRoleList = response.roleList;
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
}

// 사용자 정보 테이블 업데이트 함수
function updateUserInfoTable(users, roleList) {
    var tbody = $('.project-table tbody');
    tbody.empty();
    
    if (!users || users.length === 0) {
        var htmlContent = '<tr><td colspan="6">사용자 정보가 존재하지 않습니다.</td></tr>';
        tbody.append(htmlContent);
        return; // 함수 종료
	}
    
    var roleOptions = roleList.map(function(role) {
        return `<option value="${role.dtlCode}">${role.dtlCodeNm}</option>`;
    }).join('');

    // 응답 데이터로 테이블 내용 채우기
    $.each(users, function(i, user) {
        var row = `<tr>
            <td><input type="checkbox"></td>
            <td>${user.userSeq}</td>
            <td>${user.userNm}</td>
            <td><input type="date" class="edit-input datepicker start-date" max="9999-12-31" pattern="\d{4}-\d{2}-\d{2}"></td>
            <td><input type="date" class="edit-input datepicker end-date" max="9999-12-31" pattern="\d{4}-\d{2}-\d{2}"></td>
            <td><select class="role-select">${roleOptions}</select></td>
        </tr>`;
        tbody.append(row);
    });
}

function addUserToProject() {
    var selectedUsers = [];
    $('.project-table tbody input[type="checkbox"]:checked').each(function() {
        var row = $(this).closest("tr");
        var startDate = row.find(".edit-input.datepicker:eq(0)").val();
        var endDate = row.find(".edit-input.datepicker:eq(1)").val();
        var role = row.find(".role-select").val();
        var userSeq = row.find("td:eq(1)").text();
        
        if (now === 'prjDetail') {
			var prjSeq = $('#projectSeq').val();
		    selectedUsers.push({
		        userSeq: userSeq,
		        prjSeq: prjSeq,
		        upStartDate: startDate,
		        upEndDate: endDate,
		        roleCd: role
		    });
        } else if (now === 'prjSearch') {
			selectedUsers.push({
		        userSeq: userSeq,
		        prjSeq: selectPrjSeq,
		        upStartDate: startDate,
		        upEndDate: endDate,
		        roleCd: role
		    });
		}
    });
    if(selectedUsers.length > 0){
	    $.ajax({
	        url: 'prj_join_pro',
	        type: 'POST',
	        contentType: 'application/json',
	        dataType: 'json',
	        traditional: true,
	        data: JSON.stringify(selectedUsers),
	        success: function(response) {
	            if (response.success) {
	                alert(response.message);
	                clickSearch();
	            } else {
	                alert(response.message);
	            }
	        },
	        error: function(xhr, status, error) {
	            alert('오류 발생: ' + error);
	        }
	    });
	} else {
		alert("추가할 사원을 선택 해 주세요.")
	}
    
}
