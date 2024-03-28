var getUserList = [];
var getRoleList = []

$(document).ready(function() {
    // '조회' 버튼 클릭 이벤트
    $(document).on('click', '#search', function() {
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
                getUserList = response.users;
                getRoleList = response.roleList;
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });
    
    $(document).on('click', '#add', function(){
		addUserToProject();
	});
});

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
            <td><input type="date" class="edit-input datepicker" value="" onkeydown="return false;"></td>
            <td><input type="date" class="edit-input datepicker" value="" onkeydown="return false;"></td>
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
	                updateUserInfoTable(getUserList, getRoleList);
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
