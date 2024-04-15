$(document).ready(function() {
    $('#product-rows-wrapper').on('click', '.product-row', function () {
        var productId = $(this).attr('id');
        console.log(productId);
        window.open('/dormitory-frontend/market-pages/product-page.html?id=' + productId, '_blank');
    });
});