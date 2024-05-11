window.addEventListener('load', function() {
    $('.all-news-container').on('click', '.add-to-favorites-button', function () {
        toggleFavorite($(this));
    });
});

function toggleFavorite(button) {
    if (!button || !button.length) {
        console.error('Invalid button element:', button);
        return;
    }
    var data = {
        newsId: button.closest('.news-item').attr('id'),
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

    icon1.toggleClass('active-add-icon');
    icon2.toggleClass('active-add-icon');

    button.toggleClass('add-fav-btn-active');
}

function addToFavorites(data) {
    $.ajax({
        url: 'http://localhost:8070/saved-news',
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
        url: 'http://localhost:8070/saved-news/' + data.newsId,
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