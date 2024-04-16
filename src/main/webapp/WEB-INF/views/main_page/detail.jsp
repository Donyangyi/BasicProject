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
                    <th><input type="checkbox" id="selectAll" onclick="toggleCheckboxes(this)"/></th> <!-- Checkbox to select/deselect all -->
                    <th>번호</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>작성일</th>
                    <th>작성자</th>
                </tr>
                <c:forEach items="${boards}" var="board" varStatus="status">
                    <tr class="${status.index == 0 ? 'board-row latest' : 'board-row'}" data-target="#detail-${status.index}">
                        <td><input type="checkbox" name="boardSeqs" value="${board.boardSeq}" onchange="checkIndividual()" /></td>
                        <td>${board.boardSeq}</td>
                        <td><a href="${root}main_page/board_detail?boardSeq=${board.boardSeq}">${board.boardTitle}</a></td>
                        <td>${board.boardContent}</td>
                        <td>${board.boardRegiDate}</td>
                        <td>${board.userNm}</td>
                    </tr>
                </c:forEach>
            </table>
            <div class="pagination">
                <c:if test="${pageBean.currentPage > 1}">
                    <a href="${root}main_page/detail?categoriCd=${categoriCd}&page=${pageBean.currentPage - 1}">이전</a>
                </c:if>
                <c:forEach begin="${pageBean.min}" end="${pageBean.max}" var="i">
                    <c:choose>
                        <c:when test="${i == pageBean.currentPage}">
                            <a href="#" class="active">${i}</a>
                        </c:when>
                        <c:otherwise>
                            <a href="${root}main_page/detail?categoriCd=${categoriCd}&page=${i}">${i}</a>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
                <c:if test="${pageBean.currentPage < pageBean.pageCnt}">
                    <a href="${root}main_page/detail?categoriCd=${categoriCd}&page=${pageBean.currentPage + 1}">다음</a>
                </c:if>
            </div>
            <c:forEach items="${loginUserBean.authorityCd}" var="userAuth">
            	<c:if test="${userAuth == '1'}">
            		<button class="add_board" onclick="location.href='${root}main_page/board?categoriCd=${categoriCd}'">추가</button>
            		<button class="delete_board" onclick="deleteBoardPro()">삭제</button>
            	</c:if>
            </c:forEach>
        </div>
    </div>
    <script>
        function toggleCheckboxes(source) {
            var checkboxes = document.getElementsByName('boardSeqs');
            for(var i = 0, n = checkboxes.length; i < n; i++) {
                checkboxes[i].checked = source.checked;
            }
        }

        function checkIndividual() {
        	console.log("실행중")
            var checkboxes = document.getElementsByName('boardSeqs');
            var allChecked = true;
            for(var i = 0; i < checkboxes.length; i++) {
                if(!checkboxes[i].checked) {
                    allChecked = false;
                    break;
                }
            }
            document.getElementById('selectAll').checked = allChecked;
        }
        
        function deleteBoardPro(){
            var checkedBoxes = document.querySelectorAll('input[name="boardSeqs"]:checked');
            
            var boardSeqsToDelete = Array.from(checkedBoxes).map(function(checkbox) {
                return checkbox.value;
            });
            
            console.log(boardSeqsToDelete);

            if (boardSeqsToDelete.length > 0) {
                $.ajax({
                	type: "DELETE",
                    url: "${root}delete-board-pro",
                    data: JSON.stringify(boardSeqsToDelete), // JSON 문자열로 변환
                    contentType: "application/json", // JSON 형식 명시
                    dataType: "json",
                    success: function(response) {
                        if (response.success) {
                            alert("선택한 게시글이 삭제되었습니다.");
                            location.reload();
                        } else {
                            alert("게시글 삭제에 실패했습니다: " + response.message);
                        }
                    },
                    error: function(xhr, status, error) {
                        alert("삭제 처리 중 오류가 발생했습니다. 오류 상세: " + xhr.statusText);
                    }
                });
            } else {
                alert("삭제할 게시글을 선택하세요.");
            }
        }
    </script>
</body>
</html>
