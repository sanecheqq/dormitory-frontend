
const documentContainers = document.querySelectorAll('.document-container');
documentContainers.forEach(container => {
    // Получаем ссылку на документ
    const documentLink = container.querySelector('.document-content a');

    // Получаем ссылку на элемент <p>, в котором будет отображаться размер файла
    const fileSizeElement = container.querySelector('.file-size');

    // Отправляем запрос HEAD для получения информации о размере файла
    fetch(documentLink.href, { method: 'HEAD' })
        .then(response => {
            // Получаем размер файла из заголовка Content-Length
            const fileSize = response.headers.get('Content-Length');

            // Преобразуем размер файла в килобайты (кБ) или мегабайты (МБ)
            let fileSizeDisplay;
            if (fileSize < 1024 * 1024) {
                // Размер файла менее 1 МБ, отображаем в килобайтах (кБ)
                fileSizeDisplay = Math.round(fileSize / 1024) + ' кБ';
            } else {
                // Размер файла более или равен 1 МБ, отображаем в мегабайтах (МБ)
                fileSizeDisplay = (fileSize / (1024 * 1024)).toFixed(2) + ' МБ';
            }

            // Отображаем размер файла в элементе <p>
            fileSizeElement.textContent = fileSizeDisplay;
        })
        .catch(error => {
            console.error('Ошибка при получении размера файла:', error);
        });

    // Получаем имя файла из ссылки и заменяем символы "%20" на символы "_"
    const hrefValue = documentLink.getAttribute('href');
    documentLink.textContent = decodeURIComponent(hrefValue.split('/').pop()).replace(/ /g, '_');
});
