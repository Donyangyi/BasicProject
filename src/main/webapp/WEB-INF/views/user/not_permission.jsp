<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="root" value="${pageContext.request.contextPath}/" />
<script>
	alert('권한이 부족합니다. 메인으로 이동합니다.');
	location.href='${root}main_page/main';
</script>
