$(document).ready(function(){
	$(document).on('click', '#modify-button', function(){
		modifyProject();
	});
	
});

function modifyProject() {
	var prjSeq = $('#prjSeq').val();
    var data = {
		prjSeq: prjSeq,
        prjNm: $('#project-name').val(),
        customerCd: $('#customer-select').val(),
        prjStartDate: $('#projectStart').val(),
        prjEndDate: $('#projectEnd').val(),
        prjDetail: $('#details').val(),
        skills: []
    };
    
    $('input[name="skills"]:checked').each(function() {
        data.skills.push($(this).val());
    });

    $.ajax({
        url: "modify_prj_pro",
        type: "PUT",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        success: function(response) {
			console.log(response.success)
			if(response.success){
				alert("프로젝트가 성공적으로 수정되었습니다.");
				location.href = "project_detail?prjSeq=" + prjSeq;
            	//window.history.go(-1);
			} else {
				alert("프로젝트 업데이트 중 오류가 발생했습니다.")
			}
            
        },
        error: function(xhr, status, error) {
            // 오류 처리
            alert("프로젝트 업데이트에 실패했습니다. 오류: " + xhr.statusText);
        }
    });
}