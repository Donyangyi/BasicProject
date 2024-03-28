$(document).ready(function(){
	var isComposing = false; // 한글 입력 중인지를 나타내는 플래그
	
	// 프로젝트 검색
	$("#simple-search").on('click', function(){
		simpleSearch();
	})
	
	// 검색 조건 입력 후 엔터 누르면 검색 실행
    $("#simple-project-name, #simple-client-name").keypress(function(event) {
        if (event.which == 13) { // 엔터
            event.preventDefault();
            simpleSearch();
        }
    });
	
	// 프로젝트 추가
	$("#add").on('click', function(){
		addProject();
	});
	
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
	
	// 입력 필드 또는 선택 필드의 값이 변경되었을 때 로직
    $('.search-results-popup').on('change', 'input[type="date"], select', function() {
        var initialValue = $(this).data('initial');
        var currentValue = $(this).val();
        var $checkbox = $(this).closest('tr').find('input[type="checkbox"]');

        // 값이 초기 값과 다르면 체크박스를 체크, 같으면 체크 해제
        if (initialValue !== currentValue) {
            $checkbox.prop('checked', true);
        } else {
            // 모든 필드를 검사하여 하나라도 변경된 값이 있으면 체크박스를 체크된 상태로 유지
            var isAnyChanged = false;
            $(this).closest('tr').find('input[type="date"], select').each(function() {
                if ($(this).val() !== $(this).data('initial')) {
                    isAnyChanged = true;
                }
            });
            $checkbox.prop('checked', isAnyChanged);
        }
    });
    
    // 날짜 변경 유효성 검사
    $(document).on('change', '#modal-body .start-date', function() {
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
    
}); //$(document).ready

// 해당 유저가 참여하지 않으며 검색 조건의 의한 프로젝트 조회
function simpleSearch() {
	if (now === 'userSearch') {
		var userSeq = selectedUserSeq
	}
	
	if (now === 'userDetail') {
		var userSeq = $("#employee_number").val();
	}
	
	var userProjectInfo = {
		userSeq : userSeq,
		prjNm: $("#project-name").val(),
		customerNm: $("#client-name").val()
	};
	
	$.ajax({
		url: "simple_project_search_pro",
		type: "POST",
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify(userProjectInfo),
		success: function(response){
			updateProjectTable(response.projects, response.roleList);
		},
		error: function(xhr){
			alert("오류 발생");
			console.error(xhr.status);
		}
	});
}

function updateProjectTable(projects, roleList) {
    var htmlContent = "";
    if (projects.length === 0) {
        htmlContent = '<tr><td colspan="10">프로젝트가 존재하지 않습니다.</td></tr>';
    } else {
        projects.forEach(function(project) {
            // 역할 선택 옵션 생성 로직
            var roleOptions = roleList.map(function(role) {
                return `<option value="${role.dtlCode}" ${project.roleCd === role.dtlCode ? 'selected' : ''}>${role.dtlCodeNm}</option>`;
            }).join('');

            htmlContent += `<tr>
                <td><input type="checkbox"></td>
                <td>${project.prjSeq}</td>
                <td>${project.prjNm}</td>
                <td>${project.customerNm}</td>
                <td>${project.skill}</td>
                <td class="prj-start-date">${project.prjStartDate}</td>
                <td class="prj-end-date">${project.prjEndDate}</td>
                <td><input type="date" class="start-date" value="" onkeydown="return false;"></td>
                <td><input type="date" class="end-date" value="" onkeydown="return false;"></td>
                <td><select class="role-select">${roleOptions}</select></td>
            </tr>`;
        });
    }
    $(".search-results-popup tbody").html(htmlContent);
}

// 프로젝트 추가
function addProject(){
	var userProjectInfo = [];
	
	// user_search.jsp 페이지에서 동작 할 때 
    if (now === 'userSearch') {
        $(".search-results-popup tbody input[type='checkbox']:checked").each(function(){
			var row = $(this).closest("tr");
			var projectData = {
				userSeq: selectedUserSeq,
				prjSeq: row.find("td:eq(1)").text(),
				upStartDate: row.find(".start-date").val(),
				upEndDate: row.find(".end-date").val(),
				roleCd: row.find("select").val()
			};
			userProjectInfo.push(projectData);
		});
    }
    
    // user_detail.jsp 페이지에서 동작 할 때
    if (now === 'userDetail') {
        // 체크된 모든 행 순회
		$(".search-results-popup tbody input[type='checkbox']:checked").each(function(){
			var row = $(this).closest("tr");
			var projectData = {
				userSeq: $("#employee_number").val(),
				prjSeq: row.find("td:eq(1)").text(),
				upStartDate: row.find(".start-date").val(),
				upEndDate: row.find(".end-date").val(),
				roleCd: row.find("select").val()
			};
			userProjectInfo.push(projectData);
		});
    }

	if(userProjectInfo.length > 0){
		$.ajax({
			url: "prj_join_pro",
			type: "POST",
			dataType: "json",
			contentType: "application/json",
			traditional: true, 
			data: JSON.stringify(userProjectInfo),
			success: function(response){
				if(response.success){
                    alert(response.message);
                    simpleSearch();
                }else{
                    alert(response.message);
                }
			},
			error: function(xhr){
                console.error(xhr.status);
                alert("입력 값에 오류가 발생 했습니다.");
			}
		});
	}else{
		alert("추가할 프로젝트를 선택해 주세요.");
	}
}