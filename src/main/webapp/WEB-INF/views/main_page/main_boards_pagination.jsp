<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="root" value="${pageContext.request.contextPath}/" />
<c:set var="hasNotice" value="false"/>
<c:set var="hasInternal" value="false"/>
<!DOCTYPE html>
<html>
<head>
    <title>OJT</title>
    <link href="${root}css/main_page.css" rel="stylesheet" />
    <c:import url="/WEB-INF/views/include/version.jsp" />
</head>
<body>
    <c:import url="/WEB-INF/views/include/sidebar.jsp" />
    <c:import url="/WEB-INF/views/include/top_logo.jsp" />
    <div class="content">
        <!-- 공지사항 게시판 -->
        <div class="left">
            <h2>공지사항</h2>
            <div class="table-wrapper">
                <table class="board">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>작성자</th>
                    </tr>
                    <c:forEach items="${boards}" var="board">
                        <c:if test="${board.detailNm == '공지사항 게시판'}">
                            <c:set var="hasNotice" value="true"/>
                            <tr>
                                <td>${board.boardSeq}</td>
                                <td>${board.boardTitle}</td>
                                <td>${board.boardRegiDate}</td>
                                <td>${board.userNm}</td>
                            </tr>
                        </c:if>
                    </c:forEach>
                    <c:if test="${!hasNotice}">
                        <tr>
                            <td colspan="4">데이터가 존재하지 않습니다.</td>
                        </tr>
                    </c:if>
                </table>
                <div class="pagination">
				    <c:forEach var="pageBean" items="${pageBeans}" begin="0" end="0">
				        <c:if test="${pageBean.currentPage > 1}">
				            <a href="${root}main_page/main?page=1">이전</a>
				        </c:if>
				        <c:forEach begin="${pageBean.min}" end="${pageBean.max}" var="i">
				            <a href="${root}main_page/main?page=${i}" class="${i == pageBean.currentPage ? 'active' : ''}">${i}</a>
				        </c:forEach>
				        <c:if test="${pageBean.currentPage <= pageBean.pageCnt}">
				            <a href="${root}main_page/main?page=${pageBean.pageCnt}">다음</a>
				        </c:if>
				    </c:forEach>
				</div>
            </div>
        </div>
        <!-- 사내 게시판 -->
        <div class="right">
            <h2>사내 게시판</h2>
            <div class="table-wrapper">
                <table class="board">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>작성자</th>
                    </tr>
                    <c:forEach items="${boards}" var="board">
                        <c:if test="${board.detailNm == '사내 게시판'}">
                            <c:set var="hasInternal" value="true"/>
                            <tr>
                                <td>${board.boardSeq}</td>
                                <td>${board.boardTitle}</td>
                                <td>${board.boardRegiDate}</td>
                                <td>${board.userNm}</td>
                            </tr>
                        </c:if>
                    </c:forEach>
                    <c:if test="${!hasInternal}">
                        <tr>
                            <td colspan="4">데이터가 존재하지 않습니다.</td>
                        </tr>
                    </c:if>
                </table>
                <div class="pagination">
				    <c:forEach var="pageBean" items="${pageBeans}" begin="1" end="1">
				        <c:if test="${pageBean.currentPage > 1}">
				            <a href="main_page/main?page=1">이전</a>
				        </c:if>
				        <c:forEach begin="${pageBean.min}" end="${pageBean.max}" var="i">
				            <a href="main_page/main?page=${i}" class="${i == pageBean.currentPage ? 'active' : ''}">${i}</a>
				        </c:forEach>
				        <c:if test="${pageBean.currentPage <= pageBean.pageCnt}">
				            <a href="main_page/main?page=${pageBean.pageCnt}">다음</a>
				        </c:if>
				    </c:forEach>
				</div>
            </div>
        </div>
    </div>
    <c:import url="/WEB-INF/views/include/footer.jsp" />
</body>
</html>