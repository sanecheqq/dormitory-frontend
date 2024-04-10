$(document).ready(function() {
    $(".back-to-products-button").on("click", function () {
        window.location.href = "/dormitory-frontend/market-pages/market-home.html";
    });
    // Обработчик нажатия на кнопку "Мои товары"
    $(".my-products-button").on("click", function () {
        window.location.href = "/dormitory-frontend/market-pages/market-my-products.html";
    });

    // Обработчик нажатия на кнопку "Разместить товар"
    $(".add-product-button").on("click", function () {
        window.location.href = "/dormitory-frontend/market-pages/market-create-product.html";
    });

    // Обработчик нажатия на кнопку "Избранные"
    $(".favorite-products-button").on("click", function () {
        window.location.href = "/dormitory-frontend/market-pages/market-favorites.html";
    });
});