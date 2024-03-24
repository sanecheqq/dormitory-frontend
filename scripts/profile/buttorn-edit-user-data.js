const button = $('.button-edit')
const email_input = $("#user-email-input");
const phone_input = $("#user-phone-number-input");
const tg_input = $("#user-telegram-id-input");
let warning_input = $('#warning_message');

$(document).ready(function(){
    button.click(function(){
        if (button.hasClass('edit-active')) {
            user_data = {
                email: email_input.val(),
                phoneNumber: phone_input.val(),
                tgUsername: tg_input.val()
            };
            console.log(user_data);
            if (email_input.val().length < 4 || phone_input.val().length < 9 || tg_input.val().length < 3) {
                warning_input.text('Введенные данные некорректны либо поля пусты.');
                return;
            }
            let promise = patchUser(user_data);
            promise.then(() => {
                button.text('Сохранить');
                window.location.reload();
            }).catch((error_message) => {
                warning_input.text("");
                try {
                    var errorJson = JSON.parse(error_message);
                    if (errorJson.phoneNumber.length > 0) {
                        warning_input.text(errorJson.phoneNumber);
                    }
                    if (errorJson.email.length > 0) {
                        let prevTex = warning_input.text() + "; ";
                        warning_input.text(prevTex + errorJson.email);
                    }
                    if (errorJson.tgUsername.length > 0) {
                        let prevTex = warning_input.text() + "; ";
                        warning_input.text(prevTex + errorJson.tgUsername);
                    }
                } catch (e) {
                    console.error('Ошибка при разборе JSON:', e);
                    warning_input.text(error_message);
                }
            });
        } else {
            button.addClass('edit-active');
            button.text('Сохранить')
            warning_input.text('Вы можете изменить поля "Телефон", "Почта" и "Телеграм".');

            email_input.removeAttr("readonly");
            email_input.addClass('edit-input-active');

            phone_input.removeAttr("readonly");
            phone_input.addClass('edit-input-active');

            tg_input.removeAttr("readonly");
            tg_input.addClass('edit-input-active');

        }

    });
});

function patchUser(user_data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://127.0.0.1:8085/user',
            type: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            contentType: 'application/json',
            data: JSON.stringify(user_data),
            success: function (jsonData) {
                button.removeAttr('edit-active');
                button.text('Редактировать');
                console.log('Получены данные:', jsonData);
                resolve("no-error");
            },
            error: function (xhr, status, error) {
                console.error('Ошибка при запросе:', error);
                console.error('Response:', xhr.responseText);
                reject(xhr.responseText);
            }
        });
    });
}