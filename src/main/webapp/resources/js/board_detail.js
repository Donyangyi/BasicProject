// comment.js 파일
document.addEventListener('DOMContentLoaded', function() {
    const comments = document.querySelectorAll('.comment-text');

    comments.forEach(comment => {
        comment.addEventListener('click', function() {
            // 현재 클릭한 댓글의 ID에서 숫자 부분 추출
            const commentId = comment.parentNode.id.split('-')[1];
            const replyForm = document.querySelector('.reply-form-' + commentId);

            // 다른 모든 reply-form 요소들을 숨김
            const allReplyForms = document.querySelectorAll('.reply-form');
            allReplyForms.forEach(form => {
                if (form !== replyForm) {
                    form.style.display = 'none';
                }
            });

            // 클릭한 댓글의 대댓글 폼 display 상태 토글
            if (replyForm) {
                replyForm.style.display = (replyForm.style.display === 'block' ? 'none' : 'block');
            }
        });
    });
});


$(document).ready(function(){
	$('.submitComment').on('click', function(){
		var $replyForm = $(this).closest('.reply-form');
        var commentText = $replyForm.find('#comment-text').val();
        var commentSeq = $replyForm.find('#comment-seq').val();
        
        if(commentText == null || commentText == ""){
			alert("댓글 내용을 입력해주세요.");
			return;
		}
		
        submitReply(commentSeq, commentText);
	});
	
	$('.submitNewComment').on('click', function(){
		submitNewComment();
	});
});

function submitReply(commentSeq, commentText){
    var boardSeq = $('#boardSeq').val();
    $.ajax({
        url: 'submit_reply_pro',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            boardSeq: boardSeq,
            parentCommentSeq: commentSeq,
            commentText: commentText
        }),
        success: function(response) {
            if (response.success) {
                alert(response.message);
                window.location.reload();
            } else {
                alert(response.message);
            }
        },
        error: function() {
            alert('댓글 등록 중 문제가 발생했습니다.');
        }
    });
}

function submitNewComment(){
	var boardSeq = $('#boardSeq').val();
	var commentText = $('#new-comment-text').val();
	$.ajax({
        url: 'submit_new_comment_pro',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            boardSeq: boardSeq,
            commentText: commentText
        }),
        success: function(response) {
            if (response.success) {
                alert(response.message);
                window.location.reload();
            } else {
                alert(response.message);
            }
        },
        error: function() {
            alert('댓글 등록 중 문제가 발생했습니다.');
        }
    });
}