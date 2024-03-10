window.addEventListener('load', function() {
    const imagesContainer = document.querySelectorAll('.content-images-wrapper');
    imagesContainer.forEach(container => {
        const imageRows = container.querySelectorAll('.row');
        const rowsCount = imageRows.length;
        imageRows.forEach((row, rowIdx) => {
            const images = row.querySelectorAll('img');
            const rowImagesCount = images.length;
            if (rowIdx === 0) { // Первая строка - 2 изображения
                images.forEach((image, imgIdx) => {
                    image.style.objectFit = 'cover'
                    if (imgIdx === 0) {
                        image.style.borderTopLeftRadius = '10px';
                    }
                    if (imgIdx === rowImagesCount-1) {
                        image.style.borderTopRightRadius = '10px';
                    }
                    if (rowImagesCount === 1) {
                        image.style.width = '600px';
                        image.style.height = '250px';
                    }
                    if (rowImagesCount === 2) {
                        image.style.width = '300px';
                        image.style.height = '250px';
                    }

                });
            } else if (rowIdx === 1) { // вторая строка - 3 изображения
                images.forEach((image, imgIdx) => {
                    image.style.objectFit = 'cover'
                    if (rowsCount === 2) {
                        if (imgIdx === 0) {
                            image.style.borderBottomLeftRadius = '10px';
                        }
                        if (imgIdx === rowImagesCount-1) {
                            image.style.borderBottomRightRadius = '10px';
                        }
                    }

                    if (rowImagesCount === 2) {
                        image.style.width = '300px';
                        image.style.height = '150px';
                    }
                    if (rowImagesCount === 3) {
                        image.style.width = '200px';
                        image.style.height = '150px';
                    }
                });
            } else { // 3 строка - 4 изображения

            }
        });
    });

});