$(document).ready(function() {
    const $productRowsWrapper = $('#product-rows-wrapper');

    $productRowsWrapper.on('click', '.add-to-favorites-button', function (event) {
        event.stopPropagation();
        let button = $(this);
        if (!button || !button.length) {
            console.error('Invalid button element:', button);
            return;
        }
        var data = {
            productId: button.closest('.product-row').attr('id'),
        };
        console.log("DATA ", data);
        if (!button.hasClass('add-fav-btn-active')) {
            addToFavorites(data);
        } else {
            removeFromFavorites(data);
        }

        var allIcons = button.find('img');
        var icon1 = allIcons.eq(0);
        var icon2 = allIcons.eq(1);

        icon1.toggleClass('favorite-active-icon');
        icon2.toggleClass('favorite-active-icon');

        button.toggleClass('add-fav-btn-active');
    });
});


function addToFavorites(data) {
    $.ajax({
        url: 'http://localhost:8070/saved_products',
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (jsonData) {
            console.log('Получены данные:', jsonData);
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', error);
        }
    });
}

function removeFromFavorites(data) {
    $.ajax({
        url: 'http://localhost:8070/saved_products/' + data.productId,
        type: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        success: function (jsonData) {
            console.log('Получены данные:', jsonData);
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', error);
        }
    });
}


