function compileProducts() {
    $.ajax({
        url: 'http://192.168.0.18:8100/products/my',
        type: 'GET',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:63343',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        dataType: 'json',
        success: function (jsonData) {
            console.log('Получены данные:', jsonData);
            if (!jsonData.products || jsonData.products.length === 0) {
                $('#empty-result-warning-text').text("Вы не опубликовывали товаров!");
                console.log("products are empty");
                return;
            }
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
                        case 'Опубликовано':
                            $productStatus.css('color', 'green');
                            break;
                        case 'Требует изменений':
                            $productStatus.css('color', 'red');
                            break;
                        case 'Снято с публикации':
                            $productStatus.css('color', 'grey');
                            break;
                    }
                });
            }).fail(function(xhr, status, error) {
                console.error('Ошибка при загрузке шаблона:', error);
            });

        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', xhr);
            if (xhr.status === 404) {
                $('#empty-result-warning-text').text("Вы не опубликовывали товаров");
            } else {
                $('#empty-result-warning-text').text("Непредвиденная ошибка на сервере");
            }
            // window.location.href = '/dormitory-frontend/auth-page.html';
        }
    });
}

compileProducts();

