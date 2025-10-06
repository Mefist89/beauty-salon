const slides = document.querySelectorAll('.promo-slide');
const leftArrow = document.querySelector('.slider-arrow.left');
const rightArrow = document.querySelector('.slider-arrow.right');
let currentSlide = 0;
let slideInterval;
let isPaused = false;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Оптимизированная функция автослайд-шоу с возможностью остановки при взаимодействии пользователя
function startSlideShow() {
    // Очищаем предыдущий интервал, если он был
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    
    slideInterval = setInterval(() => {
        if (!isPaused) {
            nextSlide();
        }
    }, 5000); // Change slide every 5 seconds
}

function stopSlideShow() {
    clearInterval(slideInterval);
    isPaused = true;
}

// Возобновляем слайд-шоу через 3 секунды после взаимодействия пользователя
function restartSlideShow() {
    isPaused = false;
    startSlideShow();
}

// Event Listeners
leftArrow.addEventListener('click', () => {
    prevSlide();
    stopSlideShow(); // stop auto-play on manual navigation
    
    // Возобновляем слайд-шоу через 3 секунды после взаимодействия пользователя
    setTimeout(restartSlideShow, 3000);
});

rightArrow.addEventListener('click', () => {
    nextSlide();
    stopSlideShow(); // stop auto-play on manual navigation
    
    // Возобновляем слайд-шоу через 3 секунды после взаимодействия пользователя
    setTimeout(restartSlideShow, 3000);
});

// Initial setup
showSlide(currentSlide);
startSlideShow();

// WhatsApp function
function sendWhatsApp(promoText) {
    const phone = "+79143814224";
    // Экранируем пользовательский ввод для безопасности
    const sanitizedPromoText = promoText.replace(/[^\w\sа-яёА-ЯЁ.,!?-]/g, '');
    const message = `${sanitizedPromoText}: Хочу узнать подробное описание о вашем услуге`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    // Проверяем, что URL начинается с безопасного протокола
    if (whatsappUrl.startsWith('https://wa.me/')) {
        window.open(whatsappUrl, '_blank');
    } else {
        console.error('Небезопасный URL для WhatsApp');
    }
}
