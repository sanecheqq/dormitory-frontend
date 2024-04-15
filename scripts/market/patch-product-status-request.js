function sendPatchStatusRequest(id, status) {
    $.ajax({
        url: 'http://192.168.0.11:8100/admin/product/' + id,
        type: 'PATCH',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:63343',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        data: {status: status},
        success: function () {
            console.log('Запрос изменения статуса на '+ status +' выполнен. ' + id);
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', xhr);
        }
    });
}