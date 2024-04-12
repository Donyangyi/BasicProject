<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="root" value="${pageContext.request.contextPath}/" />
<!DOCTYPE html>
<html>
<head>
    <title>OJT</title>
    <link href="${root}css/main_detail.css" rel="stylesheet" />
    <c:import url="/WEB-INF/views/include/version.jsp" />
    <script src="${root}js/main_detail.js"></script>
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
                <c:forEach items="${boards}" var="board" varStatus="status">
				    <tr class="${status.index == 0 ? 'board-row latest' : 'board-row'}" data-target="#detail-${status.index}">
				        <td>${board.boardSeq}</td>
				        <td><a href="${root}main_page/board_detail?boardSeq=${board.boardSeq}">${board.boardTitle}</a></td>
				        <td>${board.boardContent}</td>
				        <td>${board.boardRegiDate}</td>
				        <td>${board.userNm}</td>
				    </tr>
				    <!-- 상세 내용 행 -->
				    <%-- <tr id="detail-${status.index}" class="detail-row">
					    <td colspan="5" class="detail-content">${board.boardContent}</td>
					</tr> --%>
					<tr id="detail-${status.index}" class="detail-row">
					    <td colspan="5">
					        <div class="detail-content">${board.boardContent}</div>
					    </td>
					</tr>
				</c:forEach>
            </table>
        </div>
    </div>
    <c:import url="/WEB-INF/views/include/footer.jsp" />
</body>
</html>