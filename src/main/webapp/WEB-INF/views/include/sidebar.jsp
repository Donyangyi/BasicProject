<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="root" value="${pageContext.request.contextPath}/" />

<link href="${root}css/sidebar.css" rel="stylesheet" />

<div class="sidebar">
    <div class="menu-item">
        <button onclick="location.href='${root}user_info/user_search'">사원 관리</button>
        <div class="sub-menu">
            <button onclick="location.href='${root}user_info/user_search'">사원 정보 조회</button>
            <button onclick="location.href='${root}user_info/user_regi_list'">사원 등록 대기 리스트</button>
            <button onclick="location.href='${root}user/user_regi'">사원 등록</button>
        </div>
    </div>
    <div class="menu-item">
        <button onclick="location.href='${root}project_info/project_search'">프로젝트 관리</button>
        <div class="sub-menu">
            <button onclick="location.href='${root}project_info/project_search'">프로젝트 정보 조회</button>
            <button onclick="location.href='${root}project_info/project_register'">프로젝트 등록</button>
        </div>
    </div>
    <div class="spacer"></div>
    <div class="menu-item">
        <button>권한 관리</button>
    </div>
</div>

<script src="${root}js/sidebar.js"></script>