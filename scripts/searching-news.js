$(document).ready(function() {
    $('.input-search').on('keypress', function(event) {
        if (event.which === 13) { // Проверяем, была ли нажата клавиша Enter
            var searchText = $(this).val().toLowerCase(); // Получаем текст из поля поиска и приводим его к нижнему регистру

            $('.news-item').each(function() { // Проходим по всем элементам с классом "news-item"
                var category = $(this).data('category').toLowerCase(); // Получаем категорию новости и приводим её к нижнему регистру

                // Проверяем, является ли категория текущей выбранной категорией
                var isCurrentCategory = $('.filter-button.active-filter-button').length === 0 || $('.filter-button.active-filter-button').data('category').toLowerCase() === 'all' || $('.filter-button.active-filter-button').data('category').toLowerCase() === category;
                var newsTitle = $(this).find('.news-title').text().toLowerCase(); // Получаем текст новостного заголовка и приводим его к нижнему регистру
                var newsRow = $(this).closest('.news-row')

                if (isCurrentCategory && newsTitle.indexOf(searchText) !== -1) { // Если текст заголовка содержит текст из поля поиска и соответствует текущей категории
                    newsRow.show(); // Показываем текущий элемент новости
                } else {
                    newsRow.hide(); // Иначе скрываем текущий элемент новости
                }
            });
        }
    });
});