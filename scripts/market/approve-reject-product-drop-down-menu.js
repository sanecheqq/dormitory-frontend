$(document).ready(function() {
    const $productRowsWrapper = $('#product-rows-wrapper');

    $productRowsWrapper.on('click', '.admin-menu-button', function (event) {
        event.stopPropagation();
    });

    $productRowsWrapper.on('click', '.approve-product-button', function (event) {
        event.stopPropagation();
        var productRow = $(this).closest('.product-row');
        sendPatchStatusRequest(productRow.attr('id'), 'PUBLISHED');
        window.location.reload();
    });

    $productRowsWrapper.on('click', '.reject-product-button', function (event) {
        event.stopPropagation();
        var productRow = $(this).closest('.product-row');
        sendPatchStatusRequest(productRow.attr('id'), 'REJECTED');
        window.location.reload();
    });
});



