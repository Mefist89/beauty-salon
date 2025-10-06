
// Show NavBar

const nav = document.querySelector('.nav-menu');
const toggle = document.querySelector('.nav-toggle');
toggle.onclick = function(){
    nav.classList.toggle('show-nav')
}

// Remove NavBar

const navLink = document.querySelectorAll('.nav-link')

function linkAction(){
    const navMenu = document.querySelector('.nav-menu')
    navMenu.classList.remove('show-nav')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// Change Active Color

const linkColor = document.querySelectorAll('.nav-link')
function colorLink(){
    if(linkColor){
        linkColor.forEach(L => L.classList.remove('active'))
        this.classList.add('active')
    }
}
linkColor.forEach(L => L.addEventListener('click', colorLink))

// Change Header Background When Scroll Down
let scrollHeaderTimeout;

function scrollHeader(){
    const scrollHeader = document.getElementById('header')
    if(window.scrollY >= 200){
        scrollHeader.classList.add('scroll-header')
    }
    else{
        scrollHeader.classList.remove('scroll-header')
    }
}

// Оптимизируем обработчик прокрутки с использованием debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const optimizedScrollHeader = debounce(scrollHeader, 10); // Ограничиваем вызов функции до 1 раза в 10мс
window.addEventListener('scroll', optimizedScrollHeader);

// Scroll Up
let scrollUpTimeout;

function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(window.scrollY >= 20) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}

const optimizedScrollUp = debounce(scrollUp, 10); // Ограничиваем вызов функции до 1 раза в 10мс
window.addEventListener('scroll', optimizedScrollUp)

