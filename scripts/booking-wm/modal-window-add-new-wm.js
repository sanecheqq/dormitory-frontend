$('.main-body-wrapper')
    .on('click', '.add-new-wm-button', function () {
        const modalContainer = $('#modal-container-id');
        const modalOverlay = $('#modal-overlay');

        modalContainer.css('display', 'block');
        modalOverlay.css('display', 'block');
    });

window.addEventListener('load', function() {

    const closeButton = $('.close');
    const modalContainer = $('#modal-container-id');
    const modalContent = $('#modal-content-id');


    closeButton.on('click', closeModal);
    $('.cancel-button').on('click', closeModal);
    $(document).on('keydown', closeModalOnEsc);

    function closeModal() {
        $('#new-wm-number').val('');
        modalContainer.css('display', 'none');
    }


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



