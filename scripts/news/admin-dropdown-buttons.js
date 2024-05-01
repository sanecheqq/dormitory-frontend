window.addEventListener('load', function() {
    $('.all-news-container').on('click', '.delete-news-button', function() {
        const newsId = $(this).closest('.news-item').attr('id');
        $.ajax({
            url: 'http://192.168.0.15:8090/admin/news/' + newsId,
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            success: function(result) {
                console.log("Удаление новсти ответ: ", result);
                // location.reload(true);
                location.href = location.href;
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });

    $('.all-news-container').on('click', '.edit-news-button', function() {
        const newsId = $(this).closest('.news-item').attr('id');
        const title = $(this).closest('.news-item').find('.news-title').text();
        const category = $(this).closest('.news-item').attr('data-category');
        const content = $(this).closest('.news-item').find('.news-text').text();
        window.location.href = `create-edit-news-form.html?mode=update&id=${newsId}&title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}&content=${encodeURIComponent(content)}`;
    });
});