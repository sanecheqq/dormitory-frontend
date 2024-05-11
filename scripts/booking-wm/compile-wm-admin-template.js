function compileWMAdmin() {
    var decodedJWT = decodeJWT(localStorage.getItem('jwt'));
    console.log(decodedJWT);
    $('#admin-address-value').text(decodedJWT.userAddress);
    $.ajax({
        url: 'http://localhost:8070/booking/admin',
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
                $('#admin-warning-message').text("Стиральных машин не добавлено");
                console.log("СТИРАЛОК НЕТ");
                return;
            }
            var wmMachines = { machines : [] };
            wmMachinesJsonData.forEach(function (wmMachine) {
                wmMachines.machines.push(wmMachine);
            })
            console.log(wmMachines);

            $.get('/booking-wm-pages/templates/admin-wm-template.html', function(wmTemplate) {
                let templateHtml = $(wmTemplate).filter('#admin-wm-template').html();
                let template = Handlebars.compile(templateHtml);
                let compiledHtml = template(wmMachines);
                $('#wm-panel-wrapper').html(compiledHtml);
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

compileWMAdmin();

