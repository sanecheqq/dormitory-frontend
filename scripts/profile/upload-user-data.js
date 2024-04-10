uploadUserData();

function uploadUserData() {
    $.ajax({
        url: 'http://127.0.0.1:8085/user',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        dataType: 'json',
        success: function (jsonData) {
            console.log('Получены данные:', jsonData);
            let userRole = decodeJWT(localStorage.getItem('jwt')).userRole;
            if (userRole === 'ADMIN') {
                console.log("Hello, ADMIN!");
                $('.admin-button-wrapper').css("visibility", "visible");
                $('.admin-manage-users-button').removeAttr('disabled');
            } else  {
                console.log("Hello, USER!");
            }
            let warningMessage = $('#warning_message');
            const userDto = jsonData.userDTO;
            if (!userDto.tgUsername || userDto.tgUsername.length === 0 || !userDto.email || userDto.email.length === 0 || !userDto.phoneNumber || userDto.phoneNumber.length === 0) {
                warningMessage.text("Заполните пустые поля!");
                $('.header-nav-button').prop('disabled', true);
                $('.header-nav-button').css('background-color', );
            } else {
                $('.header-nav-button').prop('disabled', false);
            }


            $('.user-address-text').text(userDto.address);
            $('.username-text').text("@" + userDto.username);
            $('#user-surname-input').val(userDto.surname);
            $('#user-name-input').val(userDto.name);
            $('#user-patronymic-input').val(userDto.patronymic);
            $('#user-phone-number-input').val(userDto.phoneNumber);
            $('#user-email-input').val(userDto.email);
            $('#user-telegram-id-input').val(userDto.tgUsername);

            let fluoroDaysLeft = calcDaysDiff($('#user-fluoro-end').text());
            let text = $('#days-left-fluoro').text();
            $('#days-left-fluoro').text(text + fluoroDaysLeft);

            let zppDaysLeft = calcDaysDiff($('#user-zpp-end').text());
            let zppText = $('#days-left-zpp').text();
            $('#days-left-zpp').text(zppText + zppDaysLeft);

        },
        error: function (xhr, status, error) {
            console.error('Ошибка при запросе:', error);
            // window.location.href = '/auth-page.html';
        }
    });
}

function calcDaysDiff(strDate) {
    let now = new Date();
    let mdy = strDate.split("-");
    let endDate = new Date(mdy[2], mdy[1] - 1, mdy[0]);
    return Math.max(Math.round((endDate.getTime() - now.getTime()) / (1000 * 3600 * 24)), 0);
}

