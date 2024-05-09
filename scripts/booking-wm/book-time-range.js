$(document).ready(function() {
    const modalContainer = $('#modal-container-id');

    modalContainer.on('click', '.book-button', function (event) {

        let button = $(this);
        if (!button || !button.length) {
            console.error('Invalid button element:', button);
            return;
        }
        let contentBody = button.closest('.modal-content-body-wrapper');
        let tr_status = contentBody.find('#modal-status-span').text();
        if (tr_status === 'Занято') {
            console.log("куда лезем??");
            return;
        }

        let time = contentBody.find('#modal-time-span').text().split(" - ");
        var data = {
            wmNumber: contentBody.find('#modal-wm-number-span').text(),
            startTime: time[0],
            endTime: time[1],
            date: contentBody.find('#modal-date-span').text(),
            withDrier: contentBody.find('#with-drier').prop('checked'),
        };
        console.log("DATA ", data);
        bookTimeRange(data);
    });
});


function bookTimeRange(data) {
    $.ajax({
        url: 'http://127.0.0.1:8086/booking',
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (jsonData) {
            console.log('Получен ответ:', jsonData);
            window.location.reload();
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', error);
        }
    });
}