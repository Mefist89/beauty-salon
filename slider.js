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


showSlide(currentSlide);

function sendWhatsApp(promoText) {
    const phone = "+79143814224"; 
    const message = `${promoText}: Хочу узнать подробное описание о вашем услуге`; 
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}