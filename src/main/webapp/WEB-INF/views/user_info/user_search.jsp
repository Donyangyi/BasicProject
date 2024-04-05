<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="root" value="${pageContext.request.contextPath}/" />

<!DOCTYPE html>
<html>
<head>
    <title>OJT</title>
    <link href="${root}css/user_search.css" rel="stylesheet" />
    <link href="${root}css/modal.css" rel="stylesheet" /> <!-- 모달창 -->
    <c:import url="/WEB-INF/views/include/version.jsp" /> <!-- 버전 관리 -->
    <script src="${root}js/user_search.js"></script>
    <script src="${root}js/date_validation.js"></script> <!-- 날짜 유효성 검사 -->
    <script>
    	var now = 'userSearch';
	</script>
</head>
<body class="user-search-page">
    <c:import url="/WEB-INF/views/include/top_logo.jsp" /> <!-- 상단 로고 (헤더 영역) -->
    <c:import url="/WEB-INF/views/include/sidebar.jsp" /> <!-- 사이드 메뉴 바 -->
    <div class="search-container">
        <!-- 검색 조건 -->
	    <div class="search-criteria">
	        <div class="criteria-title">검색 조건</div>
	        <div class="criteria-content">
		        <label for="employee_name">사원명</label>
		        <input type="text" id="employee_name" maxlength="17" placeholder="사원명">
		        <label for="position">직급</label>
		        <select id="position" name="position">
		        <option value="">선택</option>
		        <c:forEach items="${positionBean}" var="pos">
		        	<option value="${pos.dtlCode}">${pos.dtlCodeNm}</option>
		        </c:forEach>
		        </select>
		        <label for="employment_status">재직 상태</label>
		        <select id="employment_status" name="employment_status">
		            <option value="">선택</option>
		            <c:forEach items="${workStateBean}" var="work">
		            	<option value="${work.dtlCode}">${work.dtlCodeNm}</option>
		            </c:forEach>
		        </select>
	        </div>
	        <div class="recent-dates">
		        <label class="start-label">입사일</label>
		        <input type="date" class="date-valid" id="start-date" name="start-date" max="9999-12-31" pattern="\d{4}-\d{2}-\d{2}">
		        ~
		        <input type="date" class="date-valid" id="end-date" name="end-date" max="9999-12-31" pattern="\d{4}-\d{2}-\d{2}">
		            <button class="date-button">1주일</button>
		            <button class="date-button">1개월</button>
		            <button class="date-button">3개월</button>
		            <button class="date-button">6개월</button>
		            <button class="search-button">조회</button>
		            <button class="reset-button">초기화</button>
	        </div>
	    </div>
        <!-- 검색 결과 -->
        <div class="search-results">
	        <div class="list-size-selector" style="text-align:right; margin-bottom: 10px;">
	            <label for="listSize">리스트 수:</label>
	            <select id="listSize" name="listSize">
	            	<c:forEach items="${listCountBean}" var="listCount">
	            		<option value="${listCount.dtlCodeNm}">${listCount.dtlCodeNm}</option>
	            	</c:forEach>
	            </select>
	        </div>
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" id="select-all"></th>
                        <th>사원번호</th>
                        <th>사원명</th>
                        <th>입사일</th>
                        <th>직급</th>
                        <th>재직상태</th>
                        <th>프로젝트관리</th>
                    </tr>
                </thead>
                <tbody>
                	<!-- 동적으로 검색 결과를 출력할 곳 -->
                </tbody>
            </table>
            <div class="pagination">
				<!-- 동적으로 검색 결과를 출력할 곳 -->
			</div>
			<div class="delete-button-container">
				<button class="add-employee-button" style="display: none;" onclick="location.href='${root}user/user_regi'">추가</button>
		        <button class="delete-button" style="display: none;">삭제</button>
		    </div>
            <input type="hidden" id="page" name="page" value="${page}">
        </div>
    </div>
    <!-- 모달 마크업 -->
    <div id="modal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <div id="modal-body"></div> <!-- popup_project.jsp의 내용이 로드될 곳 -->
      </div>
    </div>
    
</body>
</html>
