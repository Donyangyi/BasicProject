<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="root" value="${pageContext.request.contextPath}/" />

<link href="${root}css/sidebar.css" rel="stylesheet" />

<div class="sidebar">
    <c:forEach var="menu" items="${menuBean}">
        <c:if test="${menu.menuType == 'main'}">
            <div class="menu-item">
                <button onclick="location.href='${menu.menuUrl}'">${menu.menuNm}</button>
                <!-- 서브 메뉴 컨테이너 시작 -->
                <div class="sub-menu">
                    <c:forEach var="subMenu" items="${menuBean}">
                        <c:if test="${subMenu.parentSeq == menu.menuSeq}">
                            <button onclick="location.href='${subMenu.menuUrl}'">${subMenu.menuNm}</button>
                        </c:if>
                    </c:forEach>
                </div>
                <!-- 서브 메뉴 컨테이너 끝 -->
            </div>
        </c:if>
    </c:forEach>
    <div class="spacer"></div>
</div>

<script src="${root}js/sidebar.js"></script>
