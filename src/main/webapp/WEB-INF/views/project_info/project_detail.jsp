<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="root" value="${pageContext.request.contextPath}/" />
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>OJT</title>
    <link href="${root}css/project_detail.css" rel="stylesheet" />
    <link href="${root}css/modal.css" rel="stylesheet" /> <!-- 모달창 -->
    <c:import url="/WEB-INF/views/include/version.jsp" /> <!-- 버전 관리 -->
    <script src="${root}js/user_search.js"></script> <!-- 테이블 기능 -->
    <script src="${root}js/project_search.js"></script> <!-- 모달 기능 -->
    <script src="${root}js/popup_project.js"></script> <!-- 프로젝트명, 고객사명 유효성 검사 기능 -->
    <script src="${root}js/popup_user.js"></script>
    <script src="${root}js/project_detail.js"></script>
    <script src="${root}js/date_validation.js"></script> <!-- 날짜 유효성 검사 -->
    <script type="text/javascript">
    	var now = 'prjDetail';
    </script>
</head>
<body class="prjDetail">
    <c:import url="/WEB-INF/views/include/top_logo.jsp" />
    <c:import url="/WEB-INF/views/include/sidebar.jsp" />
    <div class="container">
        <div class="left-panel">
            <div class="user-info">
                <div class="info-panel">
                    <div style="display: none;"><label for="projectSeq">프로젝트 번호:</label>
                    <input type="hidden" id="projectSeq" readonly value="${prjInfo.prjSeq}"></div>
                    
                    <div><label for="projectName">프로젝트명:</label>
                    <input type="text" id="projectName" readonly value="${prjInfo.prjNm}"></div>
                    
                    <div><label for="clientName">고객사명:</label>
                    <input type="text" id="clientName" readonly value="${prjInfo.customerNm}"></div>
                    
                    <div><label for="projectPeriod">프로젝트 기간:</label>
                    <input type="date" id="startDate" value="${prjInfo.prjStartDate}" readonly="readonly"> ~
                    <input type="date" id="endDate" value="${prjInfo.prjEndDate}" readonly="readonly"></div>
                    
                    <div><label for="requiredSkills">필요 기술:</label>
                    <input type="text" id="requiredSkills" readonly value="${prjInfo.skill}"></div>
                </div>
            </div>
        </div>
        <div class="right-panel">
            <div class="detail-info-header">
                <label for="detailInfo">상세 정보:</label>
                <div class="edit-button">
                    <button onclick="location.href='${root}project_info/project_edit?prjSeq=${prjInfo.prjSeq}'">프로젝트 수정</button>
                </div>
            </div>
            <textarea id="detailInfo">${prjInfo.prjDetail}</textarea>
        </div>
    </div>
    <!-- 테이블 부분 -->
    <div class="search-results">
    	 <div class="table-scroll">
        <table class="table">
            <thead>
                <tr>
                    <th><input type="checkbox" id="select-all"></th>
                    <th>사원번호</th>
                    <th>사원명</th>
                    <th>투입일</th>
                    <th>철수일</th>
                    <th>역할</th>
                </tr>
            </thead>
            <tbody>
	            <c:forEach items="${userList}" var="user">
	            	<tr>
	                    <td><input type="checkbox"></td>
	                    <td>${user.userSeq}</td>
	                    <td>${user.userNm}</td>
	                    <td><input type="date" class="date-valid" id="start-date" value="${user.upStartDate}" max="9999-12-31" pattern="\d{4}-\d{2}-\d{2}" required></td>
	                    <td><input type="date" class="date-valid" id="end-date" value="${user.upEndDate}" max="9999-12-31" pattern="\d{4}-\d{2}-\d{2}"></td>
	                    <td>
	                        <select required>
	                        	<c:forEach items="${roleList}" var="role">
	                        		<c:choose>
		                        		<c:when test="${user.roleCd == role.dtlCode}">
		                        			<option value="${role.dtlCode}" selected>${role.dtlCodeNm}</option>
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
            <button class="update-project-user">변경 사항 저장</button>
            <button class="manage-people">추가</button>
            <button class="delete-project-user">삭제</button>
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
