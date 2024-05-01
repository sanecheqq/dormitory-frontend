$(document).ready(function() {
    let postBtn = $('#update-product-button');
    postBtn.text("Сохранить");
    $('.form').submit(function(event) {
        event.preventDefault();

        postBtn.prop('disabled', true);
        postBtn.css('cursor', 'wait');
        postBtn.text("Сохранение...");

        if ($('#price').val() >= 1000000) {
            $('#errorMessageImages').text('Слишком большая стоимость');
            postBtn.prop('disabled', false);
            postBtn.css('cursor', 'pointer');
            postBtn.text("Сохранить");
        }

        var formData = new FormData();
        formData.append('name', $('#name').val());
        formData.append('category', $('#category').val());
        formData.append('description', $('#description').val());
        formData.append('price', $('#price').val());

        var imageIds = [];
        $('#old-images-wrapper .edit-product-image').each(function() {
            var imageUrl = $(this).attr('src');
            var imageId = imageUrl.substring(imageUrl.lastIndexOf('/') + 1, imageUrl.lastIndexOf('.'));
            imageIds.push(imageId);
        });
        console.log(imageIds);

        var images = $('#images')[0].files;
        for (var i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        formData.append('address', decodedJWT.userAddress);

        $.ajax({
            url: 'http://192.168.0.15:8100/products',
            type: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:63342',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log('Запрос успешно отправлен');
                console.log(response);
                window.location.href = 'market-my-products.html';
            },
            error: function(xhr, status, error) {
                console.error('Произошла ошибка при отправке запроса:', status, error);
                $('#post-news-button').prop('disabled', false);
                postBtn.css('cursor', 'pointer');
                postBtn.text("Создать");
            }
        });
    });

});