$(document).ready(function(){
	$('.approve').on('click', function(){
		updateUserState();
	});
});

function updateUserState(){
	let userSeqList = []
	$(".main-container tbody input[type='checkbox']:checked").each(function(){
		let row = $(this).closest("tr");
		userSeqList.push(row.find("td:eq(1)").text());
	});
	
	if(userSeqList.length == 0){
		alert("유저를 선택해 주세요.");
		return;
	}
	
	$.ajax({
		url: "update-userState",
		type: "PUT",
		dataType: "json",
		contentType: "application/json",
		traditional: true,
		data: JSON.stringify(userSeqList),
		success: function(response){
			if(response.success){
				alert(response.message);
				location.reload();
			} else {
				alert(response.messge);
			}
		},
		error: function(xhr){
			console.log(xhr.status);
		}
		
	})
}