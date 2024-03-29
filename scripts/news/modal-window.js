window.addEventListener('load', function() {

    $('.all-news-container').on('click', '.img-fluid', function () {
        const clickedImage = $(this).attr('src');
        const modalImage = $('#modal-image');
        const modalContainer = $('#modal-container-id');
        const modalOverlay = $('#modal-overlay');


        modalImage.attr('src', clickedImage);
        modalContainer.css('display', 'flex');
        modalOverlay.css('display', 'block');
    });

    const closeButton = $('.close');
    const modalContainer = $('#modal-container-id');
    const modalContent = $('#modal-content-id');


    closeButton.on('click', closeModal);
    modalContent.on('click', closeModalOnClickOutside);
    $(document).on('keydown', closeModalOnEsc);

    function closeModal() {
        modalContainer.css('display', 'none');
    }

    function closeModalOnClickOutside(event) {
        if ($(event.target).is(modalContent)) {
            closeModal();
        }
    }

    function closeModalOnEsc(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }
});


