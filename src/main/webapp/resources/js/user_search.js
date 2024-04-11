var selectedListSize = 5; // 리스트 수 기본 값
var selectedPage = 1; // 현재 선택된 페이지 기본 값
var selectedUserSeq = null;

$(document).ready(function() {	
	var isComposing = false; // 한글 입력 중인지를 나타내는 플래그
	
    $(document).on('compositionstart', '#employee_name', function(){
		isComposing = true; // 한글 입력 시작
	})
	
	$(document).on('compositionend', '#employee_name', function(){
		isComposing = false; // 한글 입력 종료
        $(this).trigger('input');
	})
	
	$(document).on('input', '#employee_name', function(){
		if (isComposing) {
            return;
        }

        var value = $(this).val();
        var specialCharPattern = /[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g; 
        if (specialCharPattern.test(value)) {
            alert("특수 문자와 숫자는 입력할 수 없습니다.");
            $(this).val(value.replace(specialCharPattern, ''));
        }
	})
	
    // 프로젝트 관리 모달 열기
    $(document).on('click', '.open-popup-project', function() {
	
		// user_search.jsp 페이지에서 동작 할 때 
	    if (now === 'userSearch') {
	        var userSeq = $(this).closest('tr').find('td:nth-child(2)').text();
	        selectedUserSeq = userSeq;
	    }
	    
	    // user_detail.jsp 페이지에서 동작 할 때
	    if (now === 'userDetail') {
			var userSeq = $("#employee_number").val()
	    }
		
        $.ajax({
            url: "popup_project?userSeq=" + userSeq,
            success: function(result) {
                $("#modal-body").html(result);
                $("#modal").show();
            }
        });
    });

    // 모달 닫기 및 취소 이벤트
    $(document).on('click', '.close, #cancel', function() {
		$("#modal").hide();
        // user_search.jsp 페이지에서 모달을 닫을 때
	    if (now === 'userSearch') {
	        loadData(selectedPage, selectedListSize);
	    }
	    
	    // user_detail.jsp 페이지에서 모달을 닫을 때
	    if (now === 'userDetail') {
	        location.reload();
	    }
	    
	    // project_detail.jsp 페이지에서 모달을 닫을 때
	    if (now === 'prjDetail') {
	        location.reload();
	    }
    });

    // 모달 외부 클릭으로 닫기 이벤트
    $(document).on('click', function(event) {
        if (event.target == document.getElementById('modal')) {
            $("#modal").hide();
            // user_search.jsp 페이지에서 모달을 닫을 때
		    if (now === 'userSearch') {
		        loadData(selectedPage, selectedListSize);
		    }
		    
		    // user_detail.jsp 페이지에서 모달을 닫을 때
		    if (now === 'userDetail') {
		        location.reload();
		    }
		    
		    // project_detail.jsp 페이지에서 모달을 닫을 때
		    if (now === 'prjDetail') {
		        location.reload();
		    }
        }
    });

    // 검색 조건 입력 후 엔터 누르면 검색 실행
    $(".search-criteria input, .search-criteria select").keypress(function(event) {
        if (event.which == 13) { // 엔터
            event.preventDefault();
            loadData(1, selectedListSize);
        }
    });
    
    // 초기화 버튼 클릭 이벤트
	$(document).on('click', '.reset-button', function() {
	    $("#employee_name").val('');
	    $("#position").prop('selectedIndex', 0);
	    $("#employment_status").prop('selectedIndex', 0);
	    $("#start-date").val('');
	    $("#end-date").val('');
	})

      // 날짜 버튼 클릭 이벤트
    $('.date-button').click(function() {
        var days = 0;
        switch($(this).text()) {
            case '1주일':
                days = 7;
                break;
            case '1개월':
                days = 30;
                break;
            case '3개월':
                days = 90;
                break;
            case '6개월':
                days = 180;
                break;
            default:
                break;
        }

        var endDate = new Date(); // 오늘 날짜
        var startDate = new Date(); // 시작 날짜
        startDate.setDate(endDate.getDate() - days); // 시작 날짜 계산

        // 날짜 형식을 YYYY-MM-DD로 포맷팅
        var formattedStartDate = startDate.toISOString().substring(0, 10);
        var formattedEndDate = endDate.toISOString().substring(0, 10);

        // 입력 필드에 날짜 설정
        $('#start-date').val(formattedStartDate);
        $('#end-date').val(formattedEndDate);
    });
    
	// 날짜 변경 유효성 검사
	$(document).on('blur', '.user-start-date', function() {
	    var $thisRow = $(this).closest('tr');
	    var startDate = new Date($(this).val());
	    var endDate = new Date($thisRow.find('.user-end-date').val());
	    var prjStartDate = new Date($thisRow.find('.project-start-date').val());
	    var prjEndDate = new Date($thisRow.find('.project-end-date').val());
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
	        $(this).val($(this).closest('tr').find('.user-end-date').val());
	    }
	});
	
	// 날짜 변경 유효성 검사
	$(document).on('blur', '.user-end-date', function() {
    	var $thisRow = $(this).closest('tr');
	    var startDate = new Date($thisRow.find('.user-start-date').val());
	    var endDate = new Date($(this).val());
	    var prjStartDate = new Date($thisRow.find('.project-start-date').val());
	    var prjEndDate = new Date($thisRow.find('.project-end-date').val());
	
	    startDate.setHours(0, 0, 0, 0);
	    endDate.setHours(0, 0, 0, 0);
	    prjStartDate.setHours(0, 0, 0, 0);
	    prjEndDate.setHours(0, 0, 0, 0);
	
	    if (endDate > prjEndDate) {
	        alert('철수일은 프로젝트 종료일 보다 늦을 수 없습니다. (프로젝트 종료일 : ' + formatDate(prjEndDate) + ')');
	        $(this).val(formatDate(prjEndDate));
	    } else if (endDate < prjStartDate) {
	        alert('철수일은 프로젝트 시작일 보다 빠를 수 없습니다. (프로젝트 시작일 : ' + formatDate(prjStartDate) + ')');
	        $(this).val(formatDate(startDate));
	    } else if (endDate < startDate) {
	        alert('철수일은 투입일보다 빠를 수 없습니다.');
	        $(this).val($(this).closest('tr').find('.user-start-date').val());
	    }
    });
    
	// 조회 버튼 클릭 이벤트
	$(document).on('click', '.search-button', function() {
		loadData(1, selectedListSize);
	});
	
	// 테이블 행 클릭 시 체크박스 토글
    $(document).on('click', '.search-results tbody tr, .search-results-popup tbody tr', function(e) {
        // 클릭된 요소가 체크박스, 링크, 또는 버튼이 아닌 경우에만 체크박스 상태 변경
        if (!$(e.target).is('input[type="checkbox"], input[type="date"], select, a, button')) {
            var $checkbox = $(this).find('input[type="checkbox"]');
            $checkbox.prop('checked', !$checkbox.prop('checked'));
            updateSelectAllCheckbox(); // 전체 선택 체크박스 상태 업데이트
        }
    });
    
    //입력 필드 또는 선택 필드의 초기 값 저장
    $('.search-results tbody tr, .search-results-popup tbody tr').each(function() {
	console.log("실행중1");
        $(this).find('input[type="date"], select').each(function() {
            $(this).data('initial', $(this).val());
        });
    });
    
    // 입력 필드 또는 선택 필드의 값이 변경되었을 때 로직
    $('.search-results').on('change', 'input[type="date"], select', function() {
	console.log("실행중2");
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
    
    $(document).on('change', '.search-results-popup input[type="date"], .search-results-popup select', function() {
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

    // 체크박스 클릭 시 이벤트 버블링 방지
    $(document).on('click', '.search-results tbody tr input[type="checkbox"]', function(e) {
        e.stopPropagation();
    });
    
    // 전체 선택/해제 체크박스 클릭 이벤트
    $("#select-all").click(function() {
        var isChecked = $(this).is(':checked');
        $('.search-results tbody input[type="checkbox"]').each(function() {
            $(this).prop('checked', isChecked);
        });
        updateSelectAllCheckbox();
    });

    // 개별 체크박스 상태 변경 시 전체 선택 체크박스 상태 업데이트
    $(document).on('change', '.search-results tbody input[type="checkbox"]', function() {
		console.log("호출중")
        updateSelectAllCheckbox();
    });

	// 리스트 수 변경 이벤트
	$(document).on('change', '#listSize', function() {
	    selectedListSize = $(this).val();
	    loadData(1, selectedListSize);
	});
	
	// 유저 삭제
	$(document).on('click', '.delete-button', function() {
	deleteData(selectedPage, selectedListSize);
	});
}); //$(document).ready

// 전체 선택/해제 체크박스 상태 업데이트 함수
function updateSelectAllCheckbox() {
    var totalCheckboxes = $('.search-results tbody input[type="checkbox"]').length;
    var checkedCheckboxes = $('.search-results tbody input[type="checkbox"]:checked').length;
    $('#select-all').prop('checked', totalCheckboxes === checkedCheckboxes);
}

function loadData(selectedPage, listSize = selectedListSize) {
    var userNm = $("#employee_name").val();
    var posCd = $("#position").val();
    var workStateCd = $("#employment_status").val();
    var startDate = $("#start-date").val();
    var endDate = $("#end-date").val();

    $.ajax({
        url: "user_search_pro",
        type: "POST",
        dataType: "json",
        data: {
            userNm: userNm,
            posCd: posCd,
            workStateCd: workStateCd,
            startDate: startDate,
            endDate: endDate,
            page: selectedPage,
            listSize: listSize
        },
        success: function(response) {
			console.log(response.users);
            updateTable(response.users);
            updateButton(response.pageBean, listSize);
            $(".delete-button").show();
            $(".add-employee-button").show();
        },
        error: function(xhr, status, error) {
            console.error("Error: ", xhr.status); // HTTP 상태 코드
		    console.error("Status: ", status); // 오류 상태
		    console.error("Error: ", error); // 오류 메시지
        }
    });
}

// 페이지 버튼 클릭 이벤트 바인딩 함수
function bindPageButtons(selectedListSize) {
    $(".pagination a").off("click").on("click", function(e) {
        e.preventDefault();
        var selectedPage = $(this).data("page");
        loadData(selectedPage, selectedListSize);
    });
}

function updateTable(users) {
    var htmlContent = "";
    
    if (users.length === 0) {
        htmlContent = '<tr><td colspan="7">데이터가 존재하지 않거나 조건에 부합한 데이터가 없습니다.</td></tr>';
    } else {
        users.forEach(function(user) {
            htmlContent += '<tr>' +
                '<td><input type="checkbox"></td>' +
                '<td>' + user.userSeq + '</td>' +
                '<td><a href="user_detail?userSeq=' + user.userSeq + '">' + user.userNm + '</a></td>' +
                '<td>' + user.regiDate + '</td>' +
                '<td>' + user.position + '</td>' +
                '<td>' + user.workState + '</td>' +
                '<td><button class="open-popup-project">프로젝트관리</button></td>' +
                '</tr>';
        });
    }
    $(".search-results tbody").html(htmlContent);
}

function updateButton(pageBean, selectedListSize) {
    var htmlContent = "";
    selectedPage = pageBean.currentPage;
    
    // 이전 페이지 버튼
    if(pageBean.currentPage > 1) {
        htmlContent += '<a href="#" data-page="' + (pageBean.currentPage - 1) + '">이전</a>';
    }

    // 페이지 번호 버튼
    for(var i = pageBean.min; i <= pageBean.max; i++) {
        if(i == pageBean.currentPage) {
            htmlContent += '<a href="#" data-page="' + i + '" class="active">' + i + '</a>';
        } else {
            htmlContent += '<a href="#" data-page="' + i + '">' + i + '</a>';
        }
    }

    // 다음 페이지 버튼
    if(pageBean.currentPage < pageBean.pageCnt) {
        htmlContent += '<a href="#" data-page="' + (pageBean.currentPage + 1) + '">다음</a>';
    }
    
    $(".pagination").html(htmlContent);

    // 페이지 버튼 클릭 이벤트를 다시 바인딩합니다.
    bindPageButtons(selectedListSize);
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function deleteData(selectedPage, selectedListSize) {
    // 체크된 체크박스의 사원번호를 수집
    var checkedUsers = $('.search-results tbody input[type="checkbox"]:checked').map(function() {
        return $(this).closest('tr').find('td:nth-child(2)').text();
    }).get();

    if (checkedUsers.length === 0) {
        alert("삭제할 사원을 선택해주세요.");
        return;
    }

    // 확인 대화상자를 통해 삭제 의사 결정
    if (!confirm("선택한 사원을 삭제하시겠습니까?")) {
        return;
    }

    // AJAX 요청을 통해 서버에 삭제 처리 요청
	$.ajax({
	    url: "user_delete_pro",
	    type: "POST",
	    data: { userSeq: checkedUsers }, 
	    traditional: true, 
	    dataType: "json",
	    success: function(response) {
	        if(response.success) {
	            alert(response.message);
	            loadData(selectedPage, selectedListSize); 
	        } else {
	            alert(response.message);
	        }
	    },
	    error: function(xhr, status, error) {
	        alert("오류 발생: " + error);
	    }
	});
}