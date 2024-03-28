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

    $.ajax({
        url: 'search_project_pro',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(searchCriteria),
        success: function(response) {
            updateProject(response);
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
