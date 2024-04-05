var selectPrjSeq = "";

$(document).ready(function() {
    // 모달 창 띄우기
    $(document).on('click', '.manage-people', function() {
	var currentButton = $(this);
	
        $.ajax({
            url: "popup_user",
            success: function(result) {
                $("#modal-body").html(result);
                $("#modal").show();
                if(now === 'prjDetail'){
					var prjSeq = $('#projectSeq').val();
					selectPrjSeq = prjSeq;
				}
				
				if(now === 'prjSearch'){
					var prjSeq = currentButton.closest('tr').find('td:nth-child(2)').text();
					selectPrjSeq = prjSeq;
					console.log(selectPrjSeq);
				}
            }
        });
    });

	// 검색 조건 입력 후 엔터 누르면 검색 실행
    $(".project-search-criteria input").keypress(function(event) {
        if (event.which == 13) { // 엔터
            event.preventDefault();
            searchProject();
        }
    });
    
    // 검색 버튼 클릭 이벤트
    $(document).on('click', '.project-search-button', function(){
		searchProject();
	});
	
	// 삭제 버튼 클릭 이벤트
    $(document).on('click', '.delete-project-button', function(){
		deleteProject();
	});
    
    // 시작 일자 from 박스 변경 시 유효성 검사
    $('#launch-start-date').change(function() {
        var startDate = $('#launch-start-date').val();
        var endDate = $('#launch-end-date').val();
        var completionStartDate = $('#completion-start-date').val();
        var completionEndDate = $('#completion-end-date').val();
        
        if(startDate && endDate && startDate > endDate){
			alert("시작일의 from 부분은 시작일의 to 부분보다 값이 클 수 없습니다.");
			$('#launch-start-date').val('');
		} else if(startDate && completionStartDate && startDate > completionStartDate){
			alert("시작일의 from 부분은 종료일의 from 부분보다 값이 클 수 없습니다.");
			$('#launch-start-date').val('');
		} else if(startDate && completionEndDate && startDate > completionEndDate) {
			alert("시작일의 from 부분은 종료일의 to 부분보다 값이 클 수 없습니다.");
			$('#launch-start-date').val('');
		}
    });
    
    // 시작 일자 to 박스 변경 시 유효성 검사
    $('#launch-end-date').change(function() {
        var startDate = $('#launch-start-date').val();
        var endDate = $('#launch-end-date').val();
        var completionStartDate = $('#completion-start-date').val();
        var completionEndDate = $('#completion-end-date').val();
        
        if(startDate && endDate && endDate < startDate){
			alert("시작일의 to 부분은 시작일의 from 부분보다 값이 작을 수 없습니다.");
			$('#launch-end-date').val('');
		} else if(endDate && completionStartDate && endDate > completionStartDate){
			alert("시작일의 to 부분은 종료일의 from 부분보다 값이 클 수 없습니다.");
			$('#launch-end-date').val('');
		} else if(endDate && completionEndDate && endDate > completionEndDate){
			alert("시작일의 to 부분은 종료일의 to 부분보다 값이 클 수 없습니다.");
			$('#launch-end-date').val('');
		}
    });
	
	// 종료 일자 from 박스 변경 시 유효성 검사
    $('#completion-start-date').change(function() {
        var startDate = $('#launch-start-date').val();
        var endDate = $('#launch-end-date').val();
        var completionStartDate = $('#completion-start-date').val();
        var completionEndDate = $('#completion-end-date').val();
        
        if(completionStartDate && startDate && completionStartDate < startDate) {
            alert("종료일의 from 부분은 시작일의 from 부분보다 값이 작을 수 없습니다.");
            $('#completion-start-date').val('');
        } else if(completionStartDate && endDate && completionStartDate < endDate) {
            alert("종료일의 from 부분은 시작일의 to 부분보다 값이 작을 수 없습니다.");
            $('#completion-start-date').val('');
        } else if(completionStartDate && completionEndDate && completionStartDate > completionEndDate) {
            alert("종료일의 from 부분은 종료일의 to 부분보다 값이 클 수 없습니다.");
            $('#completion-start-date').val('');
        }
    });

    // 종료 일자 to 박스 변경 시 유효성 검사
    $('#completion-end-date').change(function() {
        var startDate = $('#launch-start-date').val();
        var endDate = $('#launch-end-date').val();
        var completionStartDate = $('#completion-start-date').val();
        var completionEndDate = $('#completion-end-date').val();
        
        if(completionEndDate && startDate && completionEndDate < startDate) {
            alert("종료일의 to 부분은 시작일의 from 부분보다 값이 작을 수 없습니다.");
            $('#completion-end-date').val('');
        } else if(completionEndDate && endDate && completionEndDate < endDate) {
            alert("종료일의 to 부분은 시작일의 to 부분보다 값이 작을 수 없습니다.");
            $('#completion-end-date').val('');
        } else if(completionEndDate && completionStartDate && completionEndDate < completionStartDate) {
            alert("종료일의 to 부분은 종료일의 from 부분보다 값이 작을 수 없습니다.");
            $('#completion-end-date').val('');
        }
    });
});


// 프로젝트 검색
function searchProject() {
    var searchCriteria = {
        prjNm: $('#project_name').val(),
        customerNm: $('#client_name').val(),
        startFromDate: $('#launch-start-date').val(),
        startToDate: $('#launch-end-date').val(),
        endFromDate: $('#completion-start-date').val(),
        endToDate: $('#completion-end-date').val()
    };
    
    console.log('')

    $.ajax({
        url: 'search_project_pro',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(searchCriteria),
        success: function(response) {
			projectDataManager.update(response);
            updateProject(projectDataManager.get());
            $(".delete-project-button").show();
            $(".add-project-button").show();
        },
        error: function(xhr, status, error) {
            console.error(xhr.status);
        }
    });
}

// 프로젝트 업데이트
function updateProject(response) {
    var tbody = $('table tbody');
    tbody.empty(); // 테이블 초기화
    $.each(response, function(i, prj) {
        var skill = prj.skill ? prj.skill : '요구하는 스킬이 없습니다.';
        var row = `<tr>
            <td><input type="checkbox"></td>
            <td>${prj.prjSeq}</td>
            <td><a href="project_detail?prjSeq=${prj.prjSeq}">${prj.prjNm}</a></td>
            <td>${prj.customerNm}</td>
            <td>${skill}</td>
            <td>${prj.prjStartDate}</td>
            <td>${prj.prjEndDate}</td>
            <td><button class="manage-people">인원 관리</button></td>
        </tr>`;
        tbody.append(row); // 새로운 행을 테이블에 추가
    });
}

function deleteProject() {
    // 체크된 체크박스의 사원번호를 수집
    var checkedProject = $('.search-results tbody input[type="checkbox"]:checked').map(function() {
        return $(this).closest('tr').find('td:nth-child(2)').text();
    }).get();
    
    console.log(checkedProject);

    if (checkedProject.length === 0) {
        alert("삭제할 프로젝트를 선택해주세요.");
        return;
    }

    // 확인 대화상자를 통해 삭제 의사 결정
    if (!confirm("선택한 프로젝트를 삭제하시겠습니까?")) {
        return;
    }
    
    var queryString = checkedProject.map(function(prjSeq) {
        return "prjSeqList=" + prjSeq;
    }).join('&');

    // AJAX 요청을 통해 서버에 삭제 처리 요청
	$.ajax({
	    url: "project_delete_pro?" + queryString,
	    type: "DELETE",
	    dataType: "json",
	    success: function(response) {
	        if(response.success) {
	            alert(response.message);
	            searchProject();
	        } else {
	            alert(response.message);
	        }
	    },
	    error: function(xhr, status, error) {
	        alert("오류 발생: " + error);
	    }
	});
}

var projectDataManager = (function() {
    // 프라이빗 변수로 응답 데이터 저장
    let _response = [];

    // 응답 데이터 업데이트 메서드
    function updateResponse(newResponse) {
        _response = newResponse;
    }

    // 응답 데이터 가져오는 메서드
    function getResponse() {
        return _response;
    }

    // 공개 메서드를 반환하는 객체
    return {
        update: updateResponse,
        get: getResponse
    };
})();