function compileAllNews() {
    $.ajax({
        url: 'http://192.168.0.11:8090/news', // URL вашего сервера
        type: 'GET', // Метод запроса
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:63342', // Добавляем заголовок
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        dataType: 'json', // Тип данных, которые вы ожидаете получить от сервера
        success: function (jsonData) {
            console.log('Получены данные:', jsonData);
            let userRole = decodeJWT(localStorage.getItem('jwt')).userRole;
            if (userRole === 'ADMIN') {
                jsonData.isAdmin = true ;
            }
            let template = Handlebars.compile($('#news-template').html());
            $('.all-news-container').html(template(jsonData));
            $('.carousel-item').first().addClass('active');
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', error);
        }
    });
}

compileAllNews();

function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}