
window.addEventListener('load', function() {
    const documentContainers = document.querySelectorAll('.document-container');
    for (let i = 0; i < documentContainers.length; i++) {
        const container = documentContainers[i]; // Получаем ссылку на контейнер документа
        const documentLink = container.querySelector('.document-link a');
        const fileSizeElement = container.querySelector('.file-size');
        if (!documentLink || !fileSizeElement) {
            continue;
        }

        // Создаем новый объект XMLHttpRequest
        const xhr = new XMLHttpRequest();
        xhr.open('GET', documentLink.href, true);
        xhr.responseType = 'blob'; // Устанавливаем тип ответа как blob

        // Обработчик успешного завершения запроса
        xhr.onload = function () {
            if (xhr.status === 200) {
                const fileSize = xhr.response.size; // Получаем размер файла из объекта Blob

                // Преобразуем размер файла в килобайты (кБ) или мегабайты (МБ)
                let fileSizeDisplay;
                if (fileSize < 1024 * 1024) { // Размер файла менее 1 МБ, отображаем в килобайтах (кБ)
                    fileSizeDisplay = Math.round(fileSize / 1024) + ' кБ';
                } else { // Размер файла более или равен 1 МБ, отображаем в мегабайтах (МБ)
                    fileSizeDisplay = (fileSize / (1024 * 1024)).toFixed(2) + ' МБ';
                }
                fileSizeElement.textContent = fileSizeDisplay;
            } else {
                console.error('Ошибка при загрузке файла:', xhr.statusText);
            }
        };

        // Обработчик ошибки
        xhr.onerror = function () {
            console.error('Ошибка при загрузке файла:', xhr.statusText);
        };

        // Отправляем запрос на сервер
        xhr.send();
    }
});