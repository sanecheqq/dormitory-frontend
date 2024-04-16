let currentPage =0;
let isLoading = false;
let isDataAvailable = true;
let searchText = null;
let category = null;
let min_price = 0;
let max_price = 10000000;

$(document).ready(function() {
    loadNextPage();

    $('.search-button').click(function() {
        $('#empty-result-warning-text').empty();
        doFirstSearch();
    });

    $('.filter-button').click(function() {
        $('#empty-result-warning-text').empty();
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
    checkCategoryForUpdate();
    checkPriceForUpdate();
    console.log("Цена " + min_price + " " + max_price);

    searchText = $('#products-search-input').val();
    console.log(searchText);
    $.ajax({
        url: 'http://192.168.0.18:8100/products',
        type: 'GET',
        data: { page: 0, search_pattern: searchText, category: category, min_price: min_price, max_price: max_price }, // Указываем страницу 1 и текст поиска
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:63342',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        dataType: 'json',
        success: function (jsonData) {
            console.log('Получены данные по результатам поиска:', jsonData);
            if (!jsonData.products || jsonData.products.length === 0) {
                $('#empty-result-warning-text').text("По вашему запросу ничего не найдено");
                $('#product-rows-wrapper').empty();
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

            currentPage = 1;
            isDataAvailable = true;
            console.log("search end");
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе поиска:', error);
            if (xhr.status === 404) {
                $('#empty-result-warning-text').text("Вы не опубликовывали товаров!");
            } else {
                $('#empty-result-warning-text').text("Непредвиденная ошибка на сервере");
            }
        }
    });
}

function loadNextPage() {
    checkCategoryForUpdate();
    checkPriceForUpdate();
    isLoading = true;
    console.log("load next page")
    $.ajax({
        url: 'http://192.168.0.18:8100/products',
        type: 'GET',
        data: { page: currentPage, search_pattern: searchText, category: category, min_price: min_price, max_price: max_price},
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

function checkCategoryForUpdate() {
    let categoryVal = $('#category-filter').val();
    console.log(categoryVal);
    if (categoryVal !== "") {
        category = categoryVal;
    }
}

function checkPriceForUpdate() {
    let priceFrom = $('#price-from').val();
    let priceTo = $('#price-to').val();
    console.log(priceFrom + " " + priceTo);
    if (priceFrom >= 0) {
        min_price = priceFrom;
    } else {
        min_price = 0;
    }
    if (priceTo >= 0) {
        max_price = priceTo;
    } else {
        max_price = 10000000;
    }
}