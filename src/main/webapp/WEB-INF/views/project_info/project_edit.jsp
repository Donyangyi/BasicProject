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
    <script src="${root}js/project_edit.js"></script>
    <script src="${root}js/popup_user.js"></script>
    <script src="${root}js/date_validation.js"></script> <!-- 날짜 유효성 검사 -->
</head>
<body>
	<c:import url="/WEB-INF/views/include/top_logo.jsp" /> <!-- 상단 로고 (헤더 영역) -->
    <c:import url="/WEB-INF/views/include/sidebar.jsp" /> <!-- 사이드 메뉴 바 -->
    <div class="main-container">
        <div class="form-container">
            <div class="left-section">
                <label class="important">*는 필수 입력입니다.</label>
                <input type="hidden" id="prjSeq" value="${prjSeq}">
                <div class="form-row">
                    <label for="projectName">프로젝트명*</label>
                    <input type="text" id="project-name" value="${prjBean.prjNm}" maxlength="30" required>
                </div>
                <div class="form-row">
                    <label for="clientName">고객사명*</label>
                    <select id="customer-select" required>
                    <option value="">선택</option>
                    	<c:forEach items="${customerBean}" var="customer">
                    		<c:if test="${customer.dtlCode == prjBean.customerCd}">
                    			<option value="${customer.dtlCode}" selected>${customer.dtlCodeNm}</option>
                    		</c:if>
                    		<c:if test="${customer.dtlCode != prjBean.customerCd}">
                    			<option value="${customer.dtlCode}">${customer.dtlCodeNm}</option>
                    		</c:if>
                    	</c:forEach>
                    </select>
                </div>
                <div class="form-row">
                    <label for="projectStart">프로젝트 기간*</label>
                    <input type="date" class="date-valid" id="projectStart" value="${prjBean.prjStartDate}" max="9999-12-31" pattern="\d{4}-\d{2}-\d{2}" required>
                    ~ 
                    <input type="date" class="date-valid" id="projectEnd" value="${prjBean.prjEndDate}" max="9999-12-31" pattern="\d{4}-\d{2}-\d{2}" required>
                </div>
                <fieldset>
					<legend>보유 기술</legend>
					<c:forEach items="${skillBean}" var="skill">
						<c:set var="skillChecked" value="false" />
						<c:forEach items="${prjSkillBean}" var="prjSkill">
							<c:if test="${skill.dtlCode == prjSkill.dtlCode }">
								<c:set var="skillChecked" value="true" />
							</c:if>
						</c:forEach>
						<label>
							<input type="checkbox" name="skills" value="${skill.dtlCode}" ${skillChecked ? 'checked' : ''}>${skill.dtlCodeNm}
						</label>
					</c:forEach>
				</fieldset>
            </div>
            <div class="right-section">
			    <label for="details">상세 설명</label>
			    <textarea id="details">${prjBean.prjDetail}</textarea>
			    <div class="buttons-container">
			        <button class="btn" id="modify-button">수정</button>
			        <button class="btn cancel" id="cancel-button">취소</button>
			    </div>
			</div>
        </div>
    </div>
</body>
</html>