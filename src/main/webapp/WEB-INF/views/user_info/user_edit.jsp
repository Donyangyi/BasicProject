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
</head>
<body>
	<div class="container">
		<div class="left-panel">
			<div class="logo">
				<a href="${root}main"> <img src="${root}image/Basic_Logo.png" alt="Logo"></a>
			</div>
			<div class="user-image">
			    <img src="${root}image/user-placeholder.png" alt="User Image" id="userImgPreview">
			    <input type="file" id="userImage" class="userImage" onchange="previewImage();" style="display: none;">
			    <button id="customFileUpload">파일 선택</button> <!-- 사용자 정의 버튼 추가 -->
			</div>
		</div>
		<div class="form-panel">
			<div class="right-panel">
				<div class="left-side">
					<p>*는 필수입력 입니다.</p>
					<form>
						<div class="form-group">
							<label for="name">사원명<span class="required-star">*</span></label>
							<input type="text" class="input-field name" id="name" required>
							<div class="validation-message" id="userNmValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="userId">아이디<span class="required-star">*</span></label>
							<input type="text" class="input-field userId" id="userId" required>
							<div class="validation-message" id="userIdValidationMessage"></div>
							<button style="margin-left: 80%;">중복 검사</button>
						</div>
						<div class="form-group">
							<label for="password">비밀번호<span class="required-star">*</span></label>
							<input type="password" class="input-field password" id="password" required>
							<div class="validation-message" id="userPwValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="confirmPassword">비밀번호 확인<span class="required-star">*</span></label> 
							<input type="password" class="input-field" id="confirmPassword" required>
						</div>
						<div id="passwordMismatch" style="display: none;">비밀번호가
							서로다릅니다.</div>
						<fieldset>
							<legend>보유 기술</legend>
							<c:forEach items="${skillBean}" var="skill">
								<label><input type="checkbox" name="skills" class="skill" value="${skill.dtlCode}">${skill.dtlCodeNm}</label>
							</c:forEach>
						</fieldset>
					</form>
				</div>
				<div class="right-side">
					<form>
						<div class="form-group">
							<label for="gender">성별<span class="required-star">*</span></label>
							<select id="gender" class="gender" required>
								<option value="">선택...</option>
								<option value="1">남성</option>
								<option value="2">여성</option>
							</select>
							<div class="validation-message" id="userGenderValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="phone">전화번호<span class="required-star">*</span></label>
							<input type="text" class="input-field phone" id="phone" required>
							<div class="validation-message" id="phoneNumberValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="entryDate">입사 일<span class="required-star">*</span></label>
							<input type="date" class="regiDate" id="regiDate" required>
							<div class="validation-message" id="regiDateValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="position">직급</label>
							<select id="position" class="position">
								<option value="">선택...</option>
								<option value="1">사장</option>
								<option value="2">상무</option>
								<option value="3">이사</option>
								<option value="4">부장</option>
								<option value="5">차장</option>
								<option value="6">과장</option>
								<option value="7">대리</option>
								<option value="8">사원</option>
							</select>
							<div class="validation-message" id="userPositionValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="skillLevel">기술등급</label>
							<select id="skillLevel">
								<option value="">선택...</option>
								<option value="1">특급</option>
								<option value="2">고급</option>
								<option value="3">중급</option>
								<option value="4">초급</option>
							</select>
							<div class="validation-message" id="userSkillValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="email">이메일<span class="required-star">*</span></label>
							<input type="email" class="input-field email" id="email">
							<div class="validation-message" id="emailValidationMessage"></div>
						</div>
						<div class="form-group">
							<label for="address">주소<span class="required-star">*</span></label>
							<input type="text" class="input-field address" id="address" required placeholder="도로명 주소">
							<input type="text" class="input-field address-detail" id="address-detail" required placeholder="상세 주소">
							<div class="validation-message" id="addressValidationMessage"></div>
							<button type="button" style="margin-left: 78%">주소 검색</button>
						</div>
					</form>
				</div>
			</div>
			<div class="form-button">
				<button type="button" class="submitRegistration">등록</button>
				<button type="button" onclick="prevPage()">취소</button>
			</div>
		</div>
	</div>
</body>
</html>