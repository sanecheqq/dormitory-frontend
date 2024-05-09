$(document).ready(function() {
    $(".my-bookings-button").on("click", function () {
        window.location.href = "/dormitory-frontend/booking-wm-pages/booking-my.html";
    });
    // Обработчик нажатия на кнопку "Бронь на сегодня"
    $(".book-on-today-button").on("click", function () {
        window.location.href = "/dormitory-frontend/booking-wm-pages/booking-home.html"
    });

    // Обработчик нажатия на кнопку "Бронь на завтра"
    $(".book-on-tomorrow-button").on("click", function () {
        window.location.href = "/dormitory-frontend/booking-wm-pages/booking-tomorrow.html"
    });

    // Обработчик нажатия на кнопку "Панель управления"
    $(".admin-manage-button").on("click", function () {
        window.location.href = "/dormitory-frontend/booking-wm-pages/booking-admin.html"
    });
});