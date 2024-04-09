function compileProducts() {
    $.ajax({
        url: 'http://192.168.0.11:8100/products/my', // URL вашего сервера
        type: 'GET', // Метод запроса
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:63342', // Добавляем заголовок
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        dataType: 'json', // Тип данных, которые вы ожидаете получить от сервера
        success: function (jsonData) {
            console.log('Получены данные:', jsonData);

            $.get('/market-pages/templates/my-product-template.html', function(productTemplate) {
                let templateHtml = $(productTemplate).filter('#my-product-template').html();

                let template = Handlebars.compile(templateHtml);
                $('#product-rows-wrapper').append(template(jsonData));
                jsonData.products.forEach(function(product) {
                    var status = product.status;
                    var $productStatus = $('#' + product.id).find('.product-status');
                    switch (status) {
                        case 'На проверке':
                            $productStatus.css('color', 'orange');
                            break;
                        case 'Опубликован':
                            $productStatus.css('color', 'green');
                            break;
                        case 'Требует изменений':
                            $productStatus.css('color', 'red');
                            break;
                        case 'Снят с публикации':
                            $productStatus.css('color', 'grey');
                            break;
                    }
                });
            }).fail(function(xhr, status, error) {
                console.error('Ошибка при загрузке шаблона:', error);
            });

        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', error);
            // window.location.href = '/dormitory-frontend/auth-page.html';
        }
    });
}

compileProducts();

