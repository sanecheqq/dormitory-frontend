$(document).ready(function() {
    const $productRowsWrapper = $('#product-rows-wrapper');

    $productRowsWrapper.on('click', '.user-my-menu-button', function (event) {
        event.stopPropagation();
    });

    $productRowsWrapper.on('click', '.archive-product-button', function (event) {
        event.stopPropagation();
        var productRow = $(this).closest('.product-row');
        sendArchiveProductRequest(productRow.attr('id'));
        window.location.reload();
    });

    $productRowsWrapper.on('click', '.edit-product-button', function (event) {
        event.stopPropagation();
        var productRow = $(this).closest('.product-row');
        let id = productRow.attr('id');
        window.location.href = `market-edit-product.html?id=${id}`;
    });

    $productRowsWrapper.on('click', '.delete-product-button', function (event) {
        event.stopPropagation();
        var productRow = $(this).closest('.product-row');
        sendDeleteProductRequest(productRow.attr('id'));
        window.location.reload();
    });
});

function sendArchiveProductRequest(id) {
    $.ajax({
        url: 'http://localhost:8070/market/products/sold/' + id,
        type: 'PATCH',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:63343',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        success: function () {
            console.log('Запрос изменения статуса на ARCHIVED выполнен. ' + id);
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', xhr);
        }
    });
}

function sendDeleteProductRequest(id) {
    $.ajax({
        url: 'http://localhost:8070/market/products/' + id,
        type: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:63343',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        success: function () {
            console.log('Запрос удаления товара выполнен. ' + id);
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', xhr);
        }
    });
}

