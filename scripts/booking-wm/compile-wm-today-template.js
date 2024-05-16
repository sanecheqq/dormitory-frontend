const timeRanges = {
    "08:00": 1,
    "09:45": 2,
    "11:30": 3,
    "13:15": 4,
    "15:00": 5,
    "16:45": 6,
    "18:30": 7,
    "20:15": 8,
    "22:00": 9,
    "23:45": 10
};


function compileWMToday() {
    $.ajax({
        url: 'http://localhost:8070/booking',
        type: 'GET',
        headers: {
            // 'Access-Control-Allow-Origin': 'http://localhost:63343',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        dataType: 'json',
        success: function (wmMachinesJsonData) {
            wmMachinesJsonData.sort(function(a, b) {
                return a.wmNumber - b.wmNumber;
            });
            console.log('Получены данные:', wmMachinesJsonData);
            if (!wmMachinesJsonData || wmMachinesJsonData.length === 0) {
                console.log("СТИРАЛОК НЕТ");
                return;
            }
            var wmMachines = { machines : [] };
            wmMachinesJsonData.forEach(function (wmMachine) {
                wmMachines.machines.push(wmMachine);
            })
            console.log(wmMachines);

            $.get('/booking-wm-pages/templates/wm-template.html', function(wmTemplate) {
                let templateHtml = $(wmTemplate).filter('#wm-template').html();
                let template = Handlebars.compile(templateHtml);
                let compiledHtml = template(wmMachines);
                $('#wm-items-wrapper').html(compiledHtml);

                var i = 0;
                wmMachines.machines.forEach(function (machine) {
                    i++;
                    if (i === wmMachines.machines.length) {
                        $('#wm-'+ machine.wmNumber).css('margin-bottom', '0px');
                    }
                    if (!machine.timeRangesForToday) {
                        return;
                    }
                    machine.timeRangesForToday.forEach(function (timeRange) {
                        let startTimeSubstr = timeRange.startTime.substring(timeRange.startTime.length - 5);
                        let trNumber = timeRanges[startTimeSubstr];
                        $('#wm-'+ machine.wmNumber)
                            .find('.tr' + trNumber)
                            .attr('id', timeRange.id)
                            .attr('username', timeRange.userTg)
                            .attr('user_id', timeRange.userId)
                            .attr('with_drier', timeRange.withDrier)
                            .addClass('booked')
                            .removeClass('active')
                            .find('.status-text').text('Занято');
                    });
                    $('#wm-' + machine.wmNumber).find('.time-range').each(function(index, elem) {
                        if ($(elem).find('.status-text').text() !== 'Свободно')
                            return

                        let startTime = $(elem).find('.time-range-text').text().split(" - ")[0];
                        let startHour = startTime.split(":")[0];
                        let startMin = startTime.split(":")[1];

                        let currentDate = new Date();
                        let curHour = currentDate.getHours();
                        let curMinute = currentDate.getMinutes();
                        if (startHour < curHour || (startHour === curHour && startMin < curMinute)) {
                            $(elem).prop('disabled', 'true')
                                .toggleClass('active')
                                .toggleClass('expired')
                                .find('.status-text').text('Истек');
                        }
                    });


                });
            }).fail(function(xhr, status, error) {
                console.error('Ошибка при загрузке шаблона:', error);
            });

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

compileWMToday();

