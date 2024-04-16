<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="root" value="${pageContext.request.contextPath}/" />

<html>
<head>
    <title>OJT - 수정 페이지</title>
    <link href="${root}css/board_detail.css" rel="stylesheet" />
    <c:import url="/WEB-INF/views/include/version.jsp" />
    <script src="${root}js/board_modify.js"></script>
</head>
<body>
    <c:import url="/WEB-INF/views/include/sidebar.jsp" />
    <c:import url="/WEB-INF/views/include/top_logo.jsp" />
    <div class="contain" style="margin-left: 250px;">
        <div class="post-details">
            <input type="hidden" id="boardSeq" value="${boardBean.boardSeq}">
            <h2>제목</h2>
            <input type="text" id="boardTitle" value="${boardBean.boardTitle}" style="font-size: 24px; width: 100%;">
            <h2 class="date">내용</h2>
            <textarea class="content" id="boardContent" style="white-space: pre-wrap; width: 100%; height: 200px;">${boardBean.boardContent}</textarea>
        </div>
    </div>
    <button type="submit" onclick="submitChanges()">저장</button>
    <script type="text/javascript">
	    function submitChanges() {
	        let data = {
	            boardSeq: $('#boardSeq').val(),
	            boardTitle: $('#boardTitle').val(),
	            boardContent: $('#boardContent').val()
	        };
	        
	        if(data.boardTitle == null || data.boardTitle == ''){
	        	alert('제목은 공백일 수 없습니다.');
	        	return;
	        }
	        
	        if(data.boardContent == null || data.boardContent == ''){
	        	alert('게시글 내용은 공백일 수 없습니다.');
	        	return;
	        }
	        
	        $.ajax({
	            type: "PUT",
	            url: "${root}update-board-pro",
	            data: JSON.stringify(data),
	            contentType: "application/json",
	            dataType: "json",
	            success: function(response) {
	                if(response.success) {
	                    alert("게시글이 성공적으로 업데이트 되었습니다.");
	                    location.href = "${root}main_page/board_detail?boardSeq=${boardBean.boardSeq}";
	                } else {
	                    alert("업데이트에 실패했습니다. 에러: " + response.message);
	                }
	            },
	            error: function(xhr, status, error) {
	                alert("업데이트 과정에 오류가 발생했습니다. 상태: " + xhr.status);
	            }
	        });
	    }
    </script>
</body>
</html>
