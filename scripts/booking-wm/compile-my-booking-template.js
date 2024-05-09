function compileWMAdmin() {
    var decodedJWT = decodeJWT(localStorage.getItem('jwt'));
    console.log(decodedJWT);
    $('#admin-address-value').text(decodedJWT.userAddress);
    $.ajax({
        url: 'http://127.0.0.1:8086/booking/my',
        type: 'GET',
        headers: {
            // 'Access-Control-Allow-Origin': 'http://localhost:63343',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        dataType: 'json',
        success: function (jsonData) {

            console.log('Получены данные:', jsonData);
            if (!jsonData || jsonData.length === 0) {
                $('#admin-warning-message').text("Стиральных машин не добавлено");
                console.log("СТИРАЛОК НЕТ");
                return;
            }
            if (jsonData.todayBookings && jsonData.todayBookings.length > 0) {
                $('#my-bookings-today').show();
                let data = { bookings : [] }
                jsonData.todayBookings.forEach(function (booking) {
                    booking.startTime = booking.startTime.substring(11);
                    booking.endTime = booking.endTime.substring(11);
                    data.bookings.push(booking);
                });
                data.bookings.sort(function(a, b) {
                    return a.wmNumber - b.wmNumber;
                });
                compileBookingsForDay(data, '#my-bookings-today');
            }

            if (jsonData.tomorrowBookings && jsonData.tomorrowBookings.length > 0) {
                $('#my-bookings-tomorrow').show();
                let data = { bookings : [] }
                jsonData.tomorrowBookings.forEach(function (booking) {
                    booking.startTime = booking.startTime.substring(11);
                    booking.endTime = booking.endTime.substring(11);
                    data.bookings.push(booking);
                });
                data.bookings.sort(function(a, b) {
                    return a.wmNumber - b.wmNumber;
                });
                compileBookingsForDay(data, '#my-bookings-tomorrow');
            }
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', xhr);
            if (xhr.status === 404) {
                $('#empty-result-warning-text').text("Вы не опубликовывали товаров");
            } else {
                $('#empty-result-warning-text').text("Непредвиденная ошибка на сервере");
            }
            // window.location.href = '/dormitory-frontend/auth-page.html';
        }
    });
}

compileWMAdmin();

function compileBookingsForDay(day, divName) {
    $.get('/booking-wm-pages/templates/my-booking-template.html', function(wmTemplate) {
        let templateHtml = $(wmTemplate).filter('#my-booking-template').html();
        let template = Handlebars.compile(templateHtml);
        let compiledHtml = template(day);
        $(divName).append(compiledHtml);
    }).fail(function(xhr, status, error) {
        console.error('Ошибка при загрузке шаблона:', error);
    });
}