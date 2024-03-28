<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="root" value="${pageContext.request.contextPath}/" />
<!DOCTYPE html>
<html>
<head>
    <title>OJT</title>
    <link href="${root}css/project_search.css" rel="stylesheet" />
    <link href="${root}css/modal.css" rel="stylesheet" /> <!-- 모달창 -->
    <c:import url="/WEB-INF/views/include/version.jsp" /> <!-- 버전 관리 -->
    <script src="${root}js/user_search.js"></script> <!-- 테이블 기능 -->
    <script src="${root}js/project_search.js"></script> 
    <script src="${root}js/popup_project.js"></script> <!-- 프로젝트명, 고객사명 유효성 검사 기능 -->
    <script src="${root}js/popup_user.js"></script>
    <script type="text/javascript">
    	var now = 'prjSearch';
    </script>
</head>
<body class="prjSearch">
    <c:import url="/WEB-INF/views/include/top_logo.jsp" />
    <c:import url="/WEB-INF/views/include/sidebar.jsp" />
    <div class="search-container">
	    <div class="project-search-criteria">
	    <div class="project-criteria-title">검색 조건</div>
	        <div class="criteria-row">
	            <label for="project_name">프로젝트 명</label>
	            <input type="text" id="project-name" name="project-name" placeholder="프로젝트 명">
	            <label for="client_name">고객사명</label>
	            <input type="text" id="client-name" name="client-name" placeholder="고객사명">
	        </div>
	        <div class="criteria-row">
	            <label for="start-date">시작 일</label>
	            <input type="date" id="launch-start-date" name="start-date" onkeydown="return false;">
	            ~
	            <input type="date" class="end-group" id="launch-end-date" name="end-date" onkeydown="return false;">
	            <label for="completion-start-date">종료 일</label>
	            <input type="date" id="completion-start-date" name="completion-start-date" onkeydown="return false;">
	            ~
	            <input type="date" class="end-group" id="completion-end-date" name="completion-end-date" onkeydown="return false;">
	            <button class="project-search-button">조회</button>
	        </div>
	    </div>
        <div class="search-results">
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" id="select-all"></th>
                        <th>프로젝트 번호</th>
                        <th>프로젝트 명</th>
                        <th>고객사명</th>
                        <th>필요기술</th>
                        <th>시작일</th>
                        <th>종료일</th>
                        <th>인원관리</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="delete-button-container">
			<button class="add-project-button" style="display: none;" onclick="location.href='${root}project_info/project_register'">추가</button>
	        <button class="delete-project-button" style="display: none;">삭제</button>
	    </div>
    </div>
    <!-- 모달 마크업 -->
    <div id="modal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <div id="modal-body"></div> <!-- popup_user.jsp의 내용이 로드될 곳 -->
      </div>
    </div>
</body>
</html>
