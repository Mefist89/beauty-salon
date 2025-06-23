const slides = document.querySelectorAll('.promo-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    document.querySelector('.slider-arrow.left').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    document.querySelector('.slider-arrow.right').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    // Показать первый слайд при загрузке страницы
    showSlide(currentSlide);