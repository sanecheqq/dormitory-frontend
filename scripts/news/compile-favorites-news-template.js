function compileFavoriteNews() {
    $.ajax({
        url: 'http://localhost:8070/news/favorites',
        type: 'GET',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:63342',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        dataType: 'json',
        success: function (jsonData) {
            console.log('Получены данные:', jsonData);
            let template = Handlebars.compile($('#news-template').html());
            $('.all-news-container').html(template(jsonData));
            $('.carousel-item').first().addClass('active');
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', error);
            window.location.href = '/dormitory-frontend/auth-page.html';
        }
    });
}

compileFavoriteNews();
