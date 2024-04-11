<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="root" value="${pageContext.request.contextPath}/" />
<!DOCTYPE html>
<html>
<head>
    <title>OJT</title>
    <link href="${root}css/main_detail.css" rel="stylesheet" />
    <c:import url="/WEB-INF/views/include/version.jsp" />
</head>
<body>
    <c:import url="/WEB-INF/views/include/sidebar.jsp" />
    <c:import url="/WEB-INF/views/include/top_logo.jsp" />
    <div class="content">
        <!-- 게시판 상세 목록 -->
        <div class="board-details" style="width: 80%">
            <h2 style="margin-left: 10%">게시판 상세보기</h2>
            <table class="board">
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>작성일</th>
                    <th>작성자</th>
                </tr>
                <!-- 서버에서 categoryCd에 해당하는 게시글 리스트를 boards 변수로 전달한다고 가정 -->
                <c:forEach items="${boards}" var="board">
                    <tr>
                        <td>${board.boardSeq}</td>
                        <td>${board.boardTitle}</td>
                        <td>${board.boardContent}</td>
                        <td>${board.boardRegiDate}</td>
                        <td>${board.userNm}</td>
                    </tr>
                </c:forEach>
            </table>
        </div>
    </div>
    <c:import url="/WEB-INF/views/include/footer.jsp" />
</body>
</html>