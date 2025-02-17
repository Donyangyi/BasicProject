$(document).ready(function(){
	$('.delete-project-user').on('click', function(){
		deletePrjToUser();
	});
	
	$('.update-project-user').on('click', function(){
		updatePrjUser();
	});
	
	// 날짜 변경 유효성 검사
	$(document).on('blur', '.date-valid', function() {
	    var $thisRow = $(this).closest('tr');
	    var startDate = new Date($(this).val());
	    var endDate = new Date($thisRow.find('.end-date').val());
	    var prjStartDate = new Date($('#startDate').val());
	    var prjEndDate = new Date($('#endDate').val());
	    var today = new Date();
	
	    startDate.setHours(0, 0, 0, 0);
	    endDate.setHours(0, 0, 0, 0);
	    prjStartDate.setHours(0, 0, 0, 0);
	    prjEndDate.setHours(0, 0, 0, 0);
	    today.setHours(0, 0, 0, 0);
	
	    if (startDate > prjEndDate) {
	        alert('투입일은 프로젝트 종료일 보다 늦을 수 없습니다. (프로젝트 종료일 : ' + formatDate(prjEndDate) + ')');
	        $(this).val(formatDate(endDate));
	    } else if (startDate < prjStartDate) {
	        alert('투입일은 프로젝트 시작일 보다 빠를 수 없습니다. (프로젝트 시작일 : ' + formatDate(prjStartDate) + ')');
	        $(this).val(formatDate(prjStartDate));
	    } else if (startDate > endDate) {
	        alert('투입일은 철수일보다 늦을 수 없습니다.');
	        $(this).val($(this).closest('tr').find('.end-date').val());
	    } else if (startDate > today){
	        alert('투입일은 오늘 날짜보다 늦을 수 없습니다.')
	    }
	});
})

function deletePrjToUser(){
	var selectedUsers = [];
	var selectPrjSeq = $('#projectSeq').val();
	
	// 확인 대화상자를 통해 삭제 의사 결정
    if (!confirm("선택한 사원을 삭제하시겠습니까?")) {
        return;
    }
	
	$('.search-results tbody input[type="checkbox"]:checked').each(function() {
		var row = $(this).closest("tr");
		var selectUserSeq = row.find("td:eq(1)").text();
		
		selectedUsers.push({
			userSeq: selectUserSeq,
			prjSeq: selectPrjSeq	
		});	
	});
	
	if(selectedUsers.length > 0){
		$.ajax({
			url: 'prj-to-user-delete-pro',
			type: 'DELETE',
			dataType: "json",
			contentType: "application/json",
			traditional: true,
			data: JSON.stringify(selectedUsers),
			success: function(response){
				if(response.success){
					alert("성공적으로 삭제 되었습니다.");
					location.reload();
				} else {
					alert('삭제 중 오류가 발생 하였습니다.');
				}
			},
			error: function(xhr){
				alert('오류 발생');
				console.log(xhr.status);
			}
		})
	} else {
		alert('삭제할 사원을 선택해 주세요.')
	}
}

//유저 프로젝트 정보 업데이트 (투입일, 철수일, 역할)
function updatePrjUser(){
	var userProjectInfo = [];

	// 체크된 모든 행 순회
	$(".search-results tbody input[type='checkbox']:checked").each(function(){
		var row = $(this).closest("tr");
		var projectData = {
			userSeq: row.find("td:eq(1)").text(),
			prjSeq: $('#projectSeq').val(),
			upStartDate: row.find("#start-date").val(),
			upEndDate: row.find("#end-date").val(),
			roleCd: row.find("select").val()
		};		
		userProjectInfo.push(projectData);
	});
	

	if(userProjectInfo.length > 0){
		$.ajax({
			url: "prj_user_update_pro",
			type: "PUT",
			dataType: "json",
			contentType: "application/json",
			traditional: true, 
			data: JSON.stringify(userProjectInfo),
			success: function(response){
				if(response.success){
					alert("성공적으로 업데이트 되었습니다.");
					location.reload();
				}else{
					alert("업데이트 중 오류가 발생 했습니다.");
				}
			},
			error: function(xhr){
				alert("입력 값에 문제가 있습니다.");
				console.error(xhr.status);
			}
		});
	}else{
		alert("변경할 프로젝트를 선택해 주세요.");
	}
}