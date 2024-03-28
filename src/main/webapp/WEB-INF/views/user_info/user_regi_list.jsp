<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="root" value="${pageContext.request.contextPath}/" />
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>사원 등록 대기 리스트</title>
    <link href="${root}css/user_regi_list.css" rel="stylesheet" />
    <c:import url="/WEB-INF/views/include/version.jsp" />
</head>
<body>
	<c:import url="/WEB-INF/views/include/top_logo.jsp" /> <!-- 상단 로고 (헤더 영역) -->
    <c:import url="/WEB-INF/views/include/sidebar.jsp" /> <!-- 사이드 메뉴 바 -->
    <div class="main-container">
        <h2>사원 등록 대기 리스트</h2>
        <table>
            <thead>
                <tr>
                    <th><input type="checkbox"></th>
                    <th>사원번호</th>
                    <th>사원명</th>
                    <th>등록일</th>
                    <th>아이디</th>
                    <th>이메일</th>
                    <th>전화번호</th>
                    <th>주소</th>
                </tr>
            </thead>
            <tbody>
                <!-- 동적으로 생성되는 데이터의 예시 -->
                <tr>
                    <td><input type="checkbox"></td>
                    <td>0001</td>
                    <td>홍길동</td>
                    <td>2024-03-07</td>
                    <td>gildong</td>
                    <td>gildong@example.com</td>
                    <td>010-1234-5678</td>
                    <td>서울시 어딘가</td>
                </tr>
            </tbody>
        </table>
        <div class="buttons">
            <button class="approve">승인</button>
            <button class="reject">거절</button>
        </div>
    </div>
</body>
</html>