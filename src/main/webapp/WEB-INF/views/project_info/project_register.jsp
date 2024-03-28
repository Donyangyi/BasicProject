<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="root" value="${pageContext.request.contextPath}/" />
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OJT</title>
    <link href="${root}css/project_register.css" rel="stylesheet" />
    <c:import url="/WEB-INF/views/include/version.jsp" /> <!-- 버전 관리 -->
</head>
<body>
	<c:import url="/WEB-INF/views/include/top_logo.jsp" /> <!-- 상단 로고 (헤더 영역) -->
    <c:import url="/WEB-INF/views/include/sidebar.jsp" /> <!-- 사이드 메뉴 바 -->
    <div class="main-container">
        <div class="form-container">
            <div class="left-section">
                <label class="important">*는 필수 입력입니다.</label>
                <div class="form-row">
                    <label for="projectName">프로젝트명*</label>
                    <input type="text" id="projectName">
                </div>
                <div class="form-row">
                    <label for="clientName">고객사명*</label>
                    <input type="text" id="clientName">
                </div>
                <div class="form-row">
                    <label for="projectStart">프로젝트 기간*</label>
                    <input type="date" id="projectStart"> ~ <input type="date" id="projectEnd">
                </div>
                <fieldset>
					<legend>보유 기술</legend>
					<label><input type="checkbox" name="skills" value="Java">Java</label>
					<label><input type="checkbox" name="skills" value="JavaScript">JavaScript</label>
					<label><input type="checkbox" name="skills" value="Spring">Spring</label>
					<label><input type="checkbox" name="skills" value="HTML/CSS">HTML/CSS</label>
					<label><input type="checkbox" name="skills" value="C#">C#</label>
					<label><input type="checkbox" name="skills" value="jQuery">jQuery</label>
					<label><input type="checkbox" name="skills" value="SQL">SQL</label>
					<label><input type="checkbox" name="skills" value="React">React</label>
				</fieldset>
            </div>
            <div class="right-section">
			    <label for="details">상세 설명</label>
			    <textarea id="details"></textarea>
			    <div class="buttons-container">
			        <button type="submit" class="btn">등록</button>
			        <button type="button" class="btn cancel">취소</button>
			    </div>
			</div>
        </div>
    </div>
</body>
</html>