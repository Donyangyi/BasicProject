// commentFunctions.js
function submitComment() {
    var commentText = $('#commentText').val();
    $('#commentText').val(''); // 댓글 입력창 초기화
    var newComment = $('<div class="comment-item"></div>');
    newComment.append('<p class="comment-text">' + commentText + '</p>');
    newComment.append('<p class="comment-info">방금 전</p>');
    newComment.append('<button onclick="showReplyForm(this)">대댓글 작성</button>');
    $('#commentsList').prepend(newComment); // 댓글을 리스트 상단에 추가
}

function showReplyForm(button) {
    var replyForm = '<div class="reply-form">' +
                    '<textarea rows="2" placeholder="대댓글을 입력하세요."></textarea>' +
                    '<button type="button" onclick="submitReply(this)">대댓글 등록</button>' +
                    '</div>';
    $(button).after(replyForm);
    //$(button).remove(); // 기존 버튼 삭제
}

function submitReply(button) {
    var replyText = $(button).prev().val();
    var replyItem = '<div class="reply-item"><p class="comment-text">-> ' + replyText + '</p></div>';
    $(button).parent().after(replyItem); // 대댓글 추가
    $(button).parent().remove(); // 대댓글 입력 폼 제거
}
