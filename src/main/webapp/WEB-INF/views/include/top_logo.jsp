<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="root" value="${pageContext.request.contextPath}/" />

<link href="${root}css/top_logo.css" rel="stylesheet" />

<div class="header">
    <div class="logo">
        <a href="${root}main_page/main"><img alt="Logo" src="${root}image/Basic_Logo.png"></a>
    </div>
    <div class="user-info">
        <div class="username">${loginUserBean.userNm}님</div>
        <!-- 드롭다운 컨테이너 추가 -->
        <div class="dropdown-content">
            <button class="logout-button" onclick="logout()">로그아웃</button>
        </div>
    </div>
</div>

<script>
function logout(){
	alert("로그아웃 되었습니다.");
	location.href = "${root}user/logout_pro";
}
</script>