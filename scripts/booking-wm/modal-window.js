$('#wm-items-wrapper')
    .on('click', '.time-range, .add-new-wm-button', function () {
        const modalContainer = $('#modal-container-id');
        const modalOverlay = $('#modal-overlay');
        const modalStatusSpan = $('#modal-status-span');
        const modalContactsSpan = $('#modal-contacts-span');
        const modalDrierCheckbox = $('#with-drier');

        let modalUserP = $('#modal-booked-user-text');
        $('#modal-time-span').text($(this).find('.time-range-text').text());
        $('#modal-date-span').text(getCurrentDate());
        $('#modal-wm-number-span').text($(this).closest('.wm-item').attr('id').substring(3));

        modalStatusSpan.text($(this).find('.status-text').text());

        if (modalStatusSpan.text() === 'Свободно') {
            modalUserP.hide();
            modalDrierCheckbox.prop('disabled', false);
            modalDrierCheckbox.prop('checked', false);
            $('.modal-booking-buttons').show();
            modalStatusSpan.css('color', '#29E718');
        } else {
            $('.modal-booking-buttons').hide();
            modalUserP.show();
            modalDrierCheckbox.prop('disabled', true);
            console.log($(this).attr('with_drier'));
            var isChecked = false;
            if ($(this).attr('with_drier') === 'true') isChecked = true;
            modalDrierCheckbox.prop('checked', isChecked);
            modalStatusSpan.css('color', '#787878');
            modalContactsSpan.text($(this).attr('username'));
        }

        modalContainer.css('display', 'block');
        modalOverlay.css('display', 'block');
    });

window.addEventListener('load', function() {

    const closeButton = $('.close');
    const modalContainer = $('#modal-container-id');
    const modalContent = $('#modal-content-id');


    closeButton.on('click', closeModal);
    $('.cancel-button').on('click', closeModal);
    // modalContent.on('click', closeModalOnClickOutside);
    $(document).on('keydown', closeModalOnEsc);

    function closeModal() {
        modalContainer.css('display', 'none');
    }

    // function closeModalOnClickOutside(event) {
    //     if ($(event.target).is(modalContent)) {
    //         closeModal();
    //     }
    // }

    function closeModalOnEsc(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }
});

function getCurrentDate() {
    var currentDate = new Date();

    if (window.location.pathname.includes("booking-tomorrow.html"))
        currentDate.setDate(currentDate.getDate() + 1);


    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    day = (day < 10 ? '0' : '') + day;
    month = (month < 10 ? '0' : '') + month;
    return day + '-' + month + '-' + year;
}



