$(document).ready(function() {
	//유저 프로젝트 정보 업데이트 (투입일, 철수일, 역할)
	$(".update-button").on('click', function(){
		updateUserPrj();
	});
	
	//유저 프로젝트 삭제
	$(".delete-project").on('click', function(){
		deleteProject();
	})
	
});

//유저 프로젝트 정보 업데이트 (투입일, 철수일, 역할)
function updateUserPrj(){
	var userProjectInfo = [];

	// 체크된 모든 행 순회
	$(".search-results tbody input[type='checkbox']:checked").each(function(){
		var row = $(this).closest("tr");
		var projectData = {
			userSeq: $("#employee_number").val(),
			prjSeq: row.find("td:eq(1)").text(),
			upStartDate: row.find("#start-date").val(),
			upEndDate: row.find("#end-date").val(),
			roleCd: row.find("select").val()
		};		
		userProjectInfo.push(projectData);
	});

	if(userProjectInfo.length > 0){
		$.ajax({
			url: "user_prj_update_pro",
			type: "POST",
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

function deleteProject(){
	var userProjectInfo = [];
	
	// 확인 대화상자를 통해 삭제 의사 결정
    if (!confirm("선택한 프로젝트를 삭제하시겠습니까?")) {
        return;
    }
	
	$(".search-results tbody input[type='checkbox']:checked").each(function(){
		var row = $(this).closest("tr");
		var prjData = {
			userSeq: $("#employee_number").val(),
			prjSeq: row.find("td:eq(1)").text()
		};
		userProjectInfo.push(prjData);
	});
	
	if(userProjectInfo.length > 0){
		$.ajax({
			url: "project_delete_pro",
			type: "POST",
			dataType: "json",
			contentType: "application/json",
			traditional: true,
			data: JSON.stringify(userProjectInfo),
			success: function(response){
				if(response.success){
					alert("성공적으로 삭제 되었습니다.");
					location.reload();
				}else{
					alert("삭제 중 오류가 발생 하였습니다.");
				}
			},
			error: function(xhr){
				alert("입력 값에 문제가 있습니다.");
				console.error(xhr.status);
			}
		});
	} else {
		alert("삭제할 프로젝트를 선택해 주세요.");
	}
}