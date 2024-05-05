const timeRanges = {
    "08:00": 1,
    "09:45": 2,
    "11:15": 3,
    "13:00": 4,
    "14:45": 5,
    "16:15": 6,
    "18:00": 7,
    "19:45": 8,
    "21:15": 9,
    "23:00": 10
};


function compileProducts() {
    $.ajax({
        url: 'http://127.0.0.1:8086/booking',
        type: 'GET',
        headers: {
            // 'Access-Control-Allow-Origin': 'http://localhost:63343',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        dataType: 'json',
        success: function (wmMachinesJsonData) {
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

compileProducts();
