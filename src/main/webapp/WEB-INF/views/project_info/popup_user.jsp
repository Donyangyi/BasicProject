<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="root" value="${pageContext.request.contextPath}/" />
<!DOCTYPE html>
<html>
<head>
    <title>프로젝트 관리</title>
    <link href="${root}css/popup.css" rel="stylesheet" />
    <c:import url="/WEB-INF/views/include/version.jsp" /> <!-- 버전 관리 -->
</head>
<body>
    
    <div class="search-area">
    	<label for="project_name">사원 명</label>
        <input type="text" id="user_name">
        <label for="skillLevel">기술등급</label>
		<select id="skillLevel">
			<option value="">선택...</option>
			<option value="1">특급</option>
			<option value="2">고급</option>
			<option value="3">중급</option>
			<option value="4">초급</option>
		</select>
        <button id="search">조회</button>
    </div>

    <div class="project-management">
        <!-- <div class="list-size-selector" style="text-align:right;">
            <label for="listSize">리스트 수:</label>
            <select id="listSize" name="listSize">
                <option value="5">5</option>
                <option value="10" selected>10</option>
                <option value="15">15</option>
            </select>
        </div> -->
		<div class="search-results-popup">
	        <table class="project-table">
	            <thead class="fixed-header">
	                <tr>
	                	<th>선택</th>
	                    <th>사원번호</th>
	                    <th>사원명</th>
	                    <th>투입일</th>
	                    <th>철수일</th>
	                    <th>역할</th>
	                </tr>
	            </thead>
	            <tbody>
	                <!-- 동적 할당 부분 -->
	            </tbody>
	        </table>
		</div>
        <div class="action-buttons">
            <button id="add">추가</button>
            <button id="cancel">취소</button>
        </div>
    </div>
</body>
</html>
