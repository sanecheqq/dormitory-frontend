window.addEventListener('load', function() {
    const imageRows = document.querySelectorAll('.row');

    imageRows.forEach(row => {
        const imageContainers = row.querySelectorAll('.image-container');

        imageContainers.forEach(imageContainer => {
            const image = imageContainer.querySelector('.news-image');

            image.addEventListener('click', function(event) {
                const clickedImage = event.target;
                const modalImage = document.getElementById('modal-image');
                const modalContainer = document.getElementById('modal-container-id');

                modalImage.src = clickedImage.src;
                modalContainer.style.display = 'flex';
            });
        });
    });

    const closeButton = document.querySelector('.close');
    const modalContainer = document.getElementById('modal-container-id');
    const modalContent = document.getElementById('modal-content-id');

    closeButton.addEventListener('click', closeModal);
    modalContent.addEventListener('click', closeModalOnClickOutside);
    window.addEventListener('keydown', closeModalOnEsc);

    function closeModal() {
        modalContainer.style.display = 'none';
    }

    function closeModalOnClickOutside(event) {
        if (event.target === modalContent) {
            closeModal();
        }
    }

    function closeModalOnEsc(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }
});