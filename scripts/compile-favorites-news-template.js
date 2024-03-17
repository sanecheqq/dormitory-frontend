function compileFavoriteNews() {
    $.ajax({
        url: 'http://192.168.0.11:8090/news/favorites',
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
        }
    });
}

compileFavoriteNews();
