let currentPage =0;
let isLoading = false;
let isDataAvailable = true;
let searchText = null;

$(document).ready(function() {
    loadNextPage();

    $('.search-button').click(function() {
        doFirstSearch();
    });

    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            if (isLoading || !isDataAvailable) return;

            loadNextPage();
        }
    });
});

function doFirstSearch() {
    searchText = $('#products-search-input').val();
    console.log(searchText);
    $.ajax({
        url: 'http://192.168.0.11:8100/products',
        type: 'GET',
        data: { page: 0, search_pattern: searchText }, // Указываем страницу 1 и текст поиска
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:63342',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        dataType: 'json',
        success: function (jsonData) {
            console.log('Получены данные по результатам поиска:', jsonData);
             $.get('/market-pages/templates/product-template.html', function(productTemplate) {
                    let templateHtml = $(productTemplate).filter('#product-template').html();
                    let template = Handlebars.compile(templateHtml);
                    $('#product-rows-wrapper').html(template(jsonData));
                }).fail(function(xhr, status, error) {
                    console.error('Ошибка при загрузке шаблона:', error);
                });

            currentPage = 1;
            isDataAvailable = true;
            console.log("search end");
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе поиска:', error);
        }
    });
}

function loadNextPage() {
    isLoading = true;
    console.log("load next page")
    $.ajax({
        url: 'http://192.168.0.11:8100/products',
        type: 'GET',
        data: { page: currentPage, searchPattern: searchText},
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:63342',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        dataType: 'json',
        success: function (jsonData) {
            console.log('Получены данные:', jsonData);
            currentPage++;


            if (jsonData.products && jsonData.products.length > 0) {
                $.get('/market-pages/templates/product-template.html', function(productTemplate) {
                    let templateHtml = $(productTemplate).filter('#product-template').html();
                    let template = Handlebars.compile(templateHtml);
                    $('#product-rows-wrapper').append(template(jsonData));
                }).fail(function(xhr, status, error) {
                    console.error('Ошибка при загрузке шаблона:', error);
                });
            } else {
                isDataAvailable = false;
            }

            isLoading = false;
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', error);
            isLoading = false;
        }
    });
}
