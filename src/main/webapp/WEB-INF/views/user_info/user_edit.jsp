<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="root" value="${pageContext.request.contextPath}/" />
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>인사관리프로그램</title>
    <link href="${root}css/user_regi.css" rel="stylesheet" />
    <c:import url="/WEB-INF/views/include/version.jsp" />
    <script src="${root}js/user_regi.js"></script>
    <script src="${root}js/user_edit.js"></script>
    <script type="text/javascript">
    	const now = "user_edit";
    </script>
</head>
<body class="user_edit">
	<div class="container">
		<div class="left-panel">
			<div class="logo">
				<a href="#" onclick="window.history.go(-1);"> <img src="${root}image/Basic_Logo.png" alt="Logo"></a>
			</div>
			<div class="user-image">
			    <img src="${root}upload/${userBean.userImage}" alt="User Image" id="userImgPreview">
			    <input type="file" id="userImage" class="userImage" onchange="previewImage();" style="display: none;">
			    <button id="customFileUpload">파일 선택</button> <!-- 사용자 정의 버튼 추가 -->
			    <div class="limit-file-size">5MB까지만 허용 합니다.</div>
			    <div class="validation-message" id="fileValidationMessage"></div>
			</div>
		</div>
		<div class="form-panel">
			<div class="right-panel">
				<div class="left-side">
					<p>*는 필수입력 입니다.</p>
					<form>
						<input type="hidden" id="userSeq" value="${userSeq}">
						<div class="form-group">
							<label for="name">사원명<span class="required-star">*</span></label>
							<input type="text" class="input-field name" id="name" maxlength="15" value="${userBean.userNm}" required>
							<div class="validation-message" id="userNmValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="userId">아이디<span class="required-star">*</span></label>
							<input type="text" class="input-field userId" id="userId" maxlength="20" value="${userBean.userId}" readonly>
							<div class="validation-message" id="userIdValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="password">비밀번호<span class="required-star">*</span></label>
							<input type="password" class="input-field password" maxlength="20" id="password" value="${userBean.userPw}" required>
							<div class="validation-message" id="userPwValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="confirmPassword">비밀번호 확인<span class="required-star">*</span></label> 
							<input type="password" class="input-field" id="confirmPassword" maxlength="20" value="${userBean.userPw}" required>
						</div>
						<div id="passwordMismatch" style="display: none;">비밀번호가
							서로다릅니다.</div>
						<fieldset>
						    <legend>보유 기술</legend>
						    <c:forEach items="${skillBean}" var="skill">
						        <c:set var="skillChecked" value="false" />
						        <c:forEach items="${skillList}" var="userSkill">
						            <c:if test="${skill.dtlCode == userSkill.dtlCode}">
						                <c:set var="skillChecked" value="true" />
						            </c:if>
						        </c:forEach>
						        <label>
						            <input type="checkbox" name="skills" class="skill" value="${skill.dtlCode}" ${skillChecked ? 'checked' : ''}>${skill.dtlCodeNm}
						        </label>
						    </c:forEach>
						</fieldset>
					</form>
				</div>
				<div class="right-side">
					<form>
						<div class="form-group">
							<label for="gender">성별<span class="required-star">*</span></label>
							<select id="gender" class="gender" required>
								<option value="">선택</option>
								<c:forEach items="${genderBean}" var="gender">
									<c:if test="${userBean.genderCd == gender.dtlCode}">
										<option value="${gender.dtlCode}" selected>${gender.dtlCodeNm}</option>
									</c:if>
									<c:if test="${userBean.genderCd != gender.dtlCode}">
										<option value="${gender.dtlCode}">${gender.dtlCodeNm}</option>
									</c:if>
								</c:forEach>														
							</select>
							<div class="validation-message" id="userGenderValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="phone">전화번호<span class="required-star">*</span></label>
							<select id="phonePrefix" class="phone-prefix" style="width: auto;">
								<option value="write-phone">직접입력</option>
								<c:forEach items="${phoneNumberBean}" var="phoneNumber">
									<option value="${phoneNumber.dtlCodeNm}">${phoneNumber.dtlCodeNm}</option>
								</c:forEach>
							</select>
							<input type="text" class="input-field phone" id="phone" style="width: auto;" maxlength="9" required>
							<input type="hidden" id="hiddenPhoneNumber" value="${userBean.phoneNumber}" />
							<div class="validation-message" id="phoneNumberValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="entryDate">입사 일<span class="required-star">*</span></label>
							<input type="date" class="regiDate" id="regiDate" name="regiDate" max="" pattern="\d{4}-\d{2}-\d{2}" value="${userBean.regiDate}" required>
							<input type="hidden" id="hiddenEmail" value="${userBean.email}" />
							<div class="validation-message" id="regiDateValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="position">직급</label>
							<select id="position" class="position">
								<option value="">선택</option>
								<c:forEach items="${positionBean}" var="pos">
									<c:if test="${userBean.posCd == pos.dtlCode}">
										<option value="${pos.dtlCode}" selected>${pos.dtlCodeNm}</option>
									</c:if>
									<c:if test="${userBean.posCd != pos.dtlCode}">
										<option value="${pos.dtlCode}">${pos.dtlCodeNm}</option>
									</c:if>
								</c:forEach>
							</select>
							<div class="validation-message" id="userPositionValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="skillLevel">기술등급</label>
							<select id="skillLevel">
								<option value="">선택</option>
								<c:forEach items="${skillLevelBean}" var="skillLevel">
									<c:if test="${userBean.skillRankCd == skillLevel.dtlCode}">
										<option value="${skillLevel.dtlCode}" selected>${skillLevel.dtlCodeNm}</option>
									</c:if>
									<c:if test="${userBean.skillRankCd != skillLevel.dtlCode}">
										<option value="${skillLevel.dtlCode}">${skillLevel.dtlCodeNm}</option>
									</c:if>
								</c:forEach>
							</select>
							<div class="validation-message" id="userSkillValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="workState">재직상태</label>
							<select id="workState">
								<c:forEach items="${workStateBean}" var="workState">
									<c:if test="${workState.dtlCode == userBean.workStateCd}">
										<option value="${workState.dtlCode}" selected="selected">${workState.dtlCodeNm}</option>
									</c:if>
									<c:if test="${workState.dtlCode != userBean.workStateCd}">
										<option value="${workState.dtlCode}">${workState.dtlCodeNm}</option>
									</c:if>
								</c:forEach>
							</select>
							<div class="validation-message" id="workStateCdValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="email">이메일<span class="required-star">*</span></label>
							<input type="text" class="input-field email" id="email" maxlength="50" style="width: 100px;">
							<div style="display: inline-block">@</div>
							<select id="emailPrefix" class="email-prefix" style="width: auto;">
								<option value="write-email" selected>직접입력</option>
								<c:forEach items="${emailBean}" var="email">
									<option value="${email.dtlCode}">${email.dtlCodeNm}</option>
								</c:forEach>
							</select>
							<input type="text" class="input-field email" id="emailDetail" maxlength="50" style="width: 100px;">
							<div class="validation-message" id="emailValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="address">주소<span class="required-star">*</span></label>
							<input type="text" class="input-field address" id="address" value="${userBean.address}" required placeholder="도로명 주소" readonly>
							<input type="text" class="input-field address-detail" id="address-detail" maxlength="50" style="display: none" placeholder="상세 주소">
							<div class="validation-message" id="addressValidationMessage"></div>
							<div class="validation-message" id="addressDetailValidationMessage"></div>
							<button id="search-address" type="button" style="margin-left: 73%; width: 100px; display: none;">주소 검색</button>
							<button id="modify-button" type="button" style="margin-left: 73%; width: 100px;">주소 변경</button>
						</div>
					</form>
				</div>
			</div>
			<div class="form-button">
				<button type="button" class="submitRegistration">수정</button>
				<button type="button" onclick="window.history.go(-1)">취소</button>
			</div>
		</div>
	</div>
</body>
</html>