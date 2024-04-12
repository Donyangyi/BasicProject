$(document).ready(function() {
    $('.latest').click(function() {
        var targetId = $(this).data('target');
        $(targetId).toggleClass('active-row');
    });
});