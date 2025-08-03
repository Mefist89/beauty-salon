const slides = document.querySelectorAll('.promo-slide');
const leftArrow = document.querySelector('.slider-arrow.left');
const rightArrow = document.querySelector('.slider-arrow.right');
let currentSlide = 0;
let slideInterval;

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

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// Event Listeners
leftArrow.addEventListener('click', () => {
    prevSlide();
    stopSlideShow(); // Optional: stop auto-play on manual navigation
});

rightArrow.addEventListener('click', () => {
    nextSlide();
    stopSlideShow(); // Optional: stop auto-play on manual navigation
});

// Initial setup
showSlide(currentSlide);
startSlideShow();

// WhatsApp function
function sendWhatsApp(promoText) {
    const phone = "+79143814224"; 
    const message = `${promoText}: Хочу узнать подробное описание о вашем услуге`; 
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
