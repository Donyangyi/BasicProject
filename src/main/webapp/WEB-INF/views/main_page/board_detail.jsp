<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="root" value="${pageContext.request.contextPath}/" />
<!DOCTYPE html>
<html>
<head>
    <title>${boardBean.boardTitle}</title> <!-- 게시글 제목으로 페이지 타이틀 설정 -->
    <link href="${root}css/board_detail.css" rel="stylesheet" />
    <c:import url="/WEB-INF/views/include/version.jsp" />
</head>
<body>
    <c:import url="/WEB-INF/views/include/sidebar.jsp" />
    <c:import url="/WEB-INF/views/include/top_logo.jsp" />
    <div class="content">
        <div class="board-details">
            <h2>${boardBean.boardTitle}</h2>
            <p>${boardBean.boardContent}</p>
            <p>작성일: ${boardBean.boardRegiDate} | 작성자: ${boardBean.userNm}</p>
            <!-- 댓글 섹션 -->
            <div class="comments-section">
                <h3>댓글</h3>
                <div class="comment-form">
                    <textarea id="commentText" rows="4" placeholder="댓글을 입력하세요."></textarea>
                    <button type="button" onclick="submitComment()">댓글 작성</button>
                </div>
                <div class="comments-list">
                    <c:forEach items="${commentBean}" var="comment">
                        <div class="comment-item">
                            <p class="comment-text">${comment.commentText}</p>
                            <p class="comment-info">${comment.userNm} | ${comment.commentRegiDate}</p>
                            <!-- 대댓글 작성 폼 (대댓글 기능은 추가 구현 필요) -->
                            <div class="reply-form">
                                <textarea rows="2" placeholder="대댓글을 입력하세요."></textarea>
                                <button type="button">대댓글 작성</button>
                            </div>
                            <!-- 대댓글 목록 (대댓글 로딩 및 표시 로직은 추가 구현 필요) -->
                        </div>
                    </c:forEach>
                </div>
            </div>
        </div>
    </div>
    <c:import url="/WEB-INF/views/include/footer.jsp" />
</body>
</html>
