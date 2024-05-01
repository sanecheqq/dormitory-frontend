function compileProducts() {
    $.ajax({
        url: 'http://192.168.0.15:8100/products/favorites',
        type: 'GET',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:63343',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        dataType: 'json',
        success: function (jsonData) {
            console.log('Получены данные:', jsonData);
            if (!jsonData.products || jsonData.products.length === 0) {
                $('#empty-result-warning-text').text("У вас нет избранных публикаций");
                console.log("products are empty");
                return;
            }
            $.get('/market-pages/templates/product-template.html', function(productTemplate) {
                let templateHtml = $(productTemplate).filter('#product-template').html();
                let template = Handlebars.compile(templateHtml);
                $('#product-rows-wrapper').html(template(jsonData));
            }).fail(function(xhr, status, error) {
                console.error('Ошибка при загрузке шаблона:', error);
            });

        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', xhr);
            if (xhr.status === 404) {
                $('#empty-result-warning-text').text("У вас нет избранных публикаций");
            } else {
                $('#empty-result-warning-text').text("Непредвиденная ошибка на сервере");
            }
        }
    });
}

compileProducts();

