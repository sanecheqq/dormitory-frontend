$(document).ready(function() {
    const wmPanel = $('#wm-panel-wrapper');

    wmPanel.on('click', '.change-status-button', function () {
        changeWmStatus($(this));
    });

    wmPanel.on('click', '.delete-wm-button', function () {
        deleteWm($(this));
    });

    $('#modal-container-id').on('click', '.add-wm-modal-button', function () {
        addNewWM($(this));
    });
});


function changeWmStatus(button) {
    let wmNumber = button.closest('.wm-item-admin').attr('wmNumber');

    $.ajax({
        url: 'http://127.0.0.1:8086/booking/admin',
        type: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        contentType: 'application/json',
        data: JSON.stringify({ wmNumber: wmNumber}),
        success: function (jsonData) {
            console.log('Получен ответ:', jsonData);
            window.location.reload();
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', error);
        }
    });
}

function deleteWm(button) {
    $.ajax({
        url: 'http://127.0.0.1:8086/booking/admin',
        type: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        contentType: 'application/json',
        data: JSON.stringify({ wmNumber: button.closest('.wm-item-admin').attr('wmNumber') }),
        success: function (jsonData) {
            console.log('Получен ответ:', jsonData);
            window.location.reload();
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', error);
        }
    });
}

function addNewWM(button) {
    let wmNumber = button.closest('.modal-content-body-wrapper').find('#new-wm-number').val();
    if (!wmNumber || wmNumber <= 0) {
        console.log("неверный wmNumber:", wmNumber);
        return;
    }$.ajax({
        url: 'http://127.0.0.1:8086/booking/admin',
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        contentType: 'application/json',
        data: JSON.stringify({ wmNumber: wmNumber }),
        success: function (jsonData) {
            console.log('Получен ответ:', jsonData);
            window.location.reload();
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', error);
        }
    });
}