<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="root" value="${pageContext.request.contextPath}/" />

<html>
<head>
    <title>OJT</title>
    <link href="${root}css/board_detail.css" rel="stylesheet" />
    <c:import url="/WEB-INF/views/include/version.jsp" />
    <script src="${root}js/board_detail.js"></script>
</head>
<body>
    <c:import url="/WEB-INF/views/include/sidebar.jsp" />
    <c:import url="/WEB-INF/views/include/top_logo.jsp" />
    <div class="contain" style="margin-left: 250px;">
        <div class="post-details">
        	<input type="hidden" id="boardSeq" value="${boardBean.boardSeq}">
            <h1>${boardBean.boardTitle}
            <button type="button" style="margin-left: auto; width: auto; display: flex;" onclick="location.href='${root}main_page/board_modify?boardSeq=${boardBean.boardSeq}'">수정</button>
            </h1>
            
            <p class="author">작성자: ${boardBean.userNm}</p>
            <p class="date">작성일: ${boardBean.boardRegiDate}</p>
            <div class="content" style="white-space: pre-wrap;">${boardBean.boardContent}</div>
        </div>

        <div class="comments">
            <c:forEach var="comment" items="${commentBean}">
	            <c:if test="${empty comment.parentCommentSeq}">
	                <div class="comment" id="comment-${comment.commentSeq}">
	                        <p class="comment-text">${comment.commentText}</p>
	                    <c:forEach items="${commentBean}" var="checkReply">
	                    	<c:if test="${not empty checkReply.parentCommentSeq && checkReply.parentCommentSeq == comment.commentSeq}">
		                        <div class="reply" id="reply-${checkReply.commentSeq}">
		                            <p class="comment-text"> -> ${checkReply.commentText}</p>
		                        </div>
		                    </c:if>
	                    </c:forEach>
	                </div>
	                <div class="reply-form reply-form-${comment.commentSeq}" style="display: none;">
		                <input type="hidden" id="comment-seq" value="${comment.commentSeq}">
		                <input type="text" id="comment-text" value="">
		                <button class="submitComment">작성</button>
	                </div>
                </c:if>
            </c:forEach>
            <div class="comment-form">
		        <textarea id="new-comment-text" placeholder="댓글을 입력하세요..."></textarea>
		        <button class="submitNewComment">작성</button>
		    </div>
        </div>
    </div>
</body>
</html>
