<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="root" value="${pageContext.request.contextPath}/" />

<html>
<head>
    <title>게시글 작성</title>
    <link href="${root}css/board.css" rel="stylesheet" />
    <c:import url="/WEB-INF/views/include/version.jsp" />
    <script src="${root}js/board.js"></script>
</head>
<body>
    <c:import url="/WEB-INF/views/include/sidebar.jsp" />
    <c:import url="/WEB-INF/views/include/top_logo.jsp" />
    <div class="contain">
        <form action="submitPost" method="post">
            <div class="post-form">
            	<input type="hidden" id="categoriCd" name="categoriCd" value="${categoriCd}">
                <input type="text" id="boardTitle" name="boardTitle" placeholder="제목을 입력하세요..." maxlength="20">
                <textarea id="boardContent" name="boardContent" placeholder="내용을 입력하세요..." maxlength="1000"></textarea>
                <button type="submit" class="submitPost">작성</button>
            </div>
        </form>
    </div>
</body>
</html>
