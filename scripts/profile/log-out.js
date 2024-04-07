$(document).ready(function() {
    $(".button-log-out").click(function() {
        localStorage.removeItem('jwt');
        window.location.href = '/dormitory-frontend/auth-page.html';
    });
});