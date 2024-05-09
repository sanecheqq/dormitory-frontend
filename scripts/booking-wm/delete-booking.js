$(document).ready(function() {
    const bookingBody = $('#my-bookings-wrapper');

    bookingBody.on('click', '.delete-my-booking-button', function () {
        console.log("delete click");
        let button = $(this);
        if (!button || !button.length) {
            console.error('Invalid button element:', button);
            return;
        }

        deleteBooking(button.closest('.my-booking-item').attr('id'));
    });
});


function deleteBooking(id) {
    $.ajax({
        url: 'http://127.0.0.1:8086/booking/' + id,
        type: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        success: function (jsonData) {
            console.log('Получен ответ:', jsonData);
            window.location.reload();
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', error);
        }
    });
}