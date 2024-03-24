$('.filter-button').on('click', function() {
    $('.input-search').val('');
    $('.filter-button').removeClass('active-filter-button');
    $(this).addClass('active-filter-button');
    var category = $(this).data('category');
    if (category === 'ALL') {
        $('.news-row').show();

    } else {
        // Скрываем все новости
        $('.news-item:not([data-category="' + category + '"]').closest('.news-row').hide();

        // Показываем родительские элементы, соответствующие выбранной категории
        $('.news-item[data-category="' + category + '"]').closest('.news-row').show();
    }
});