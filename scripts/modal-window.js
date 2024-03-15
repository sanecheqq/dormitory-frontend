window.addEventListener('load', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');

    carouselItems.forEach(item => {
        const image = item.querySelector('img');

        image.addEventListener('click', function(event) {
            if (item.classList.contains('active')) {
                const clickedImage = event.target;
                const modalImage = document.getElementById('modal-image');
                const modalContainer = document.getElementById('modal-container-id');
                const modalOverlay = document.getElementById('modal-overlay'); // Получаем элемент затемнения

                modalImage.src = clickedImage.src;
                modalContainer.style.display = 'flex';
                modalOverlay.style.display = 'block'; // Отображаем затемнение
            }
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


