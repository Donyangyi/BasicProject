document.addEventListener('DOMContentLoaded', function() {
    var menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(function(item) {
        item.querySelector('button').addEventListener('mouseover', function() {
            closeAllSubMenus();
            item.querySelector('.sub-menu').style.display = 'block';
        });
    });
    
    // 서브 메뉴 닫기
    function closeAllSubMenus() {
        document.querySelectorAll('.sub-menu').forEach(function(subMenu) {
            subMenu.style.display = 'none';
        });
    }
    
    // 바깥쪽 클릭시 서브 메뉴 닫기
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.sidebar')) {
            closeAllSubMenus();
        }
    }, true);
});
