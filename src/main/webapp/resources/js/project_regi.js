$(document).ready(function(){
	$(document).on('click', '#register-button', function(){
		addProject();
	});
	
	$(document).on('click', '#cancel-button', function(){
		window.history.go(-1);
	});
	
	// 날짜 변경 유효성 검사
	$(document).on('blur', '#projectStart', function() {
		console.log('실행중')
	    var prjStartDate = new Date($('#projectStart').val());
	    var prjEndDate = new Date($('#projectEnd').val());

	    prjStartDate.setHours(0, 0, 0, 0);
	    prjEndDate.setHours(0, 0, 0, 0);
		
		if(prjStartDate > prjEndDate){
			alert('프로젝트 시작 기간은 프로젝트 종료 기간보다 늦을 수 없습니다.');
			$('#projectStart').val('');
		}
	});
	
	// 날짜 변경 유효성 검사
	$(document).on('blur', '#projectEnd', function() {
	    var prjStartDate = new Date($('#projectStart').val());
	    var prjEndDate = new Date($('#projectEnd').val());

	    prjStartDate.setHours(0, 0, 0, 0);
	    prjEndDate.setHours(0, 0, 0, 0);
	    
	    if(prjEndDate < prjStartDate){
			alert('프로젝트 종료 기간은 프로젝트 시작 기간보다 빠를 수 없습니다.');
			$('#projectEnd').val('');
			
		}
	});
});

function addProject() {
    var data = {
        prjNm: $('#projectName').val(),
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
        url: "add_prj_pro",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            alert("프로젝트가 성공적으로 등록되었습니다.");
            window.history.go(-1);
        },
        error: function(xhr, status, error) {
            // 오류 처리
            alert("프로젝트 등록에 실패했습니다. 오류: " + xhr.statusText);
        }
    });
}