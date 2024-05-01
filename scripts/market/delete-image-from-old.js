window.addEventListener('load', function() {
    let oldImagesWrapper = $('#old-images-wrapper');
    oldImagesWrapper.on('click', '.delete-img-icon', function () {
        let closestWrapper = $(this).closest('.image-with-button-wrapper');
        let confirmRes = confirm("Вы уверены, что хотите удалить это изображение?");
        if (confirmRes) {
            closestWrapper.remove();
        }
        let imagesCount = oldImagesWrapper.find('.image-with-button-wrapper').length;
        if (imagesCount === 0) {
            $('#old-images-warning-message').text("Изображений нет");
        }
    });
});


