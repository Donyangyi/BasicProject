<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="root" value="${pageContext.request.contextPath}/" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>OJT</title>
<c:import url="/WEB-INF/views/include/version.jsp" /> <!-- 버전 관리 -->
<link href="${root}css/user_detail.css" rel="stylesheet" />
<link href="${root}css/modal.css" rel="stylesheet" />
<script src="${root}js/date_validation.js"></script> <!-- 날짜 유효성 검사 (02/31 처리) -->
<script src="${root}js/user_search.js"></script> <!-- 모달 창 및 테이블 기능 (행 선택, 전체 선택) -->
<script src="${root}js/user_detail.js"></script>

<script>
    var now = 'userDetail';
</script>
</head>
<body class="user-detail-page">
    <c:import url="/WEB-INF/views/include/top_logo.jsp" /> <!-- 상단 로고 (헤더 영역) -->
    <c:import url="/WEB-INF/views/include/sidebar.jsp" /> <!-- 사이드 메뉴 바 -->
    <div class="user-detail-container">
        <div class="user-info">
            <!-- 이미지 패널 -->
            <div class="image-panel">
                <img src="${root}upload/${userBean.userImage}" alt="Profile Image" />
            </div>
            <!-- 사원 정보 -->
            <div class="info-panel">
                <label for="employee_number">사원번호:</label>
                <input type="text" id="employee_number" readonly value="${userBean.userSeq}" />
                <label for="employee_name">사원명:</label>
                <input type="text" id="employee_name" readonly value="${userBean.userNm}" />
                <label for="position">직급:</label>
                <input type="text" id="position" readonly value="${userBean.position}" />
                <label for="tech_grade">기술등급:</label>
                <input type="text" id="tech_grade" readonly value="${userBean.skillRank}" />
                <label for="skills">보유기술:</label>
                <input type="text" id="skills" readonly value="${userSkills}" />
            </div>
            <!-- 수정 버튼 -->
            <div class="edit-button">
                <button onclick="location.href='${root}user_info/user_edit?userSeq=${userBean.userSeq}'">사원 정보 수정</button>
            </div>
        </div>
        <!-- 프로젝트 리스트 -->
        <div class="search-results">
        	<div class="table-scroll">
	            <table>
	                <thead>
	                    <tr>
	                        <th><input type="checkbox" id="select-all"></th>
	                        <th>프로젝트 번호</th>
	                        <th>프로젝트 명</th>
	                        <th>고객사명</th>
	                        <th>투입일</th>
	                        <th>철수일</th>
	                        <th>역할</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    <c:forEach items="${userProjectInfo}" var="userPrj">
	                    <tr>
	                    	<td><input type="checkbox"></td>
	                        <td>${userPrj.prjSeq}</td>
	                        <td>${userPrj.prjNm}</td>
	                        <td>${userPrj.customerNm}</td>
	                        <td class="hidden-date"><input type="date" class="project-start-date" value="${userPrj.prjStartDate}" onkeydown="return false;"></td>
							<td class="hidden-date"><input type="date" class="project-end-date" value="${userPrj.prjEndDate}" onkeydown="return false;"></td>
							<td><input type="date" class="user-start-date date-valid" value="${userPrj.upStartDate}" max="9999-12-31" pattern="\d{4}-\d{2}-\d{2}" required></td>
							<td><input type="date" class="user-end-date date-valid" value="${userPrj.upEndDate}" max="9999-12-31" pattern="\d{4}-\d{2}-\d{2}"></td>
	                        <td>
	                            <select>
	                                <c:forEach items="${roleList}" var="role">
	                                	<c:choose>
	                                		<c:when test="${role.dtlCode == userPrj.roleCd}">
	                                			<option value="${userPrj.roleCd}" selected>${role.dtlCodeNm}</option>
	                                		</c:when>
	                                		<c:otherwise>
	                                			<option value="${role.dtlCode}">${role.dtlCodeNm}</option>
	                                		</c:otherwise>
	                                	</c:choose>
	                                </c:forEach>
	                            </select>
	                        </td>
	                    </tr>
	                    </c:forEach>
	                </tbody>
	            </table>
            </div>
            <!-- 버튼 그룹 -->
            <div class="button-group">
                <button class="update-button">변경 사항 저장</button>
                <button class="open-popup-project">추가</button>
                <button class="delete-project">삭제</button>
            </div>
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
