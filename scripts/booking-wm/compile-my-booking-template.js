function compileWMMy() {
    var decodedJWT = decodeJWT(localStorage.getItem('jwt'));
    console.log(decodedJWT);
    $('#admin-address-value').text(decodedJWT.userAddress);
    $.ajax({
        url: 'http://localhost:8070/booking/my',
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
            var today = false, tomorrow = false;
            if (jsonData.todayBookings && jsonData.todayBookings.length > 0) {
                today = true;
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
                $.get('/booking-wm-pages/templates/my-booking-template.html', function(wmTemplate) {
                    let templateHtml = $(wmTemplate).filter('#my-booking-template').html();
                    let template = Handlebars.compile(templateHtml);
                    let compiledHtml = template(data);
                    $('#my-bookings-today').append(compiledHtml)
                        .find('.my-booking-item').each(function (index, element) {
                            console.log('aaa');
                            let startTime = $(element).find('.my-booking-time-span').text().split(" - ")[0];
                            let startHour = startTime.split(":")[0];
                            let startMin = startTime.split(":")[1];
                            let currentDate = new Date();
                            let curHour = currentDate.getHours();
                            let curMinute = currentDate.getMinutes();
                            if (startHour < curHour || (startHour === curHour && startMin < curMinute)) {
                                $(element).find('.delete-my-booking-button')
                                    .hide()
                                    .prop('disabled', 'true');
                            }
                        });
                }).fail(function(xhr, status, error) {
                    console.error('Ошибка при загрузке шаблона:', error);
                });
            }

            if (jsonData.tomorrowBookings && jsonData.tomorrowBookings.length > 0) {
                tomorrow = true;
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
            if (!today && !tomorrow) {
                $('#my-warning-message').show()
                    .text('На ближайшее время у вас нет бронирований');
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

compileWMMy();

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