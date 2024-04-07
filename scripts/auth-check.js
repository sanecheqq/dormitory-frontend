$(document).ready(function() {
    var jwt = localStorage.getItem('jwt');
    if (!jwt) {
        window.location.href = '/dormitory-frontend/auth-page.html';
    }
});
