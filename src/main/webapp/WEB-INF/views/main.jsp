<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="root" value="${pageContext.request.contextPath}/" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>OJT</title>
<link href="${root}css/login.css" rel="stylesheet" />
<c:import url="/WEB-INF/views/include/version.jsp" />
</head>
<body>
    <div class="login-container">
	    <div class="login-left">
	        <div class="login-title">
	            <h2>로그인</h2>
	        </div>
	        <div class="login-form">
	            <div>
	                <label for="user_id">아이디 :</label>
	                <input id="user_id" class="input-field" type="text" name="id" maxlength="20" placeholder="아이디를 입력해주세요" required="required">
	            </div>
	            <div>
	                <label for="user_pw">비밀번호 :</label>
	                <input id="user_pw" class="input-field" type="password" name="password" maxlength="20" placeholder="비밀번호를 입력해주세요" required="required">
	            </div>
	            <div>
	                <img src="${root}image/Basic_Logo.png" alt="Logo">
	            </div>
	        </div>
	    </div>
	    <div class="login-right">
	        <button type="submit" class="login-btn" onclick="mainPage()">로그인</button>
	        <button type="button" class="register-btn" onclick="regPage()">회원등록</button>
	    </div>
	</div>
<script>
// 회원등록 페이지로 전환
function regPage(){
	location.href="${root}user/user_regi";
}

// 로그인 성공 후 메인 페이지로 전환
function mainPage(){
	location.href="${root}main_page/main"
}
</script>
</body>
</html>