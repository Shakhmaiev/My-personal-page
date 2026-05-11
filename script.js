const slides = Array.from(document.querySelectorAll('.slide'));
const dotsContainer = document.getElementById('sliderDots');
const themeToggle = document.getElementById('themeToggle');

let currentSlide = 0;

/**
 * Застосовує вибрану тему.
 * @param {string} theme
 */
function applyTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');

    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');

        if (themeToggle) {
            themeToggle.title = 'Увімкнути світлу тему';
            themeToggle.setAttribute('aria-label', 'Увімкнути світлу тему');
        }

        return;
    }

    document.body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');

    if (themeToggle) {
        themeToggle.title = 'Увімкнути темну тему';
        themeToggle.setAttribute('aria-label', 'Увімкнути темну тему');
    }
}

/**
 * Перемикає тему однією кнопкою.
 */
function toggleTheme() {
    const isDarkTheme = document.body.classList.contains('dark-theme');

    if (isDarkTheme) {
        applyTheme('light');
    } else {
        applyTheme('dark');
    }
}

/**
 * Переходить до конкретного слайда.
 * @param {number} index
 */
function goToSlide(index) {
    if (!slides.length) {
        return;
    }

    currentSlide = index;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    updateSlides();
}

/**
 * Показує наступний слайд.
 */
function nextSlide() {
    goToSlide(currentSlide + 1);
}

/**
 * Показує попередній слайд.
 */
function prevSlide() {
    goToSlide(currentSlide - 1);
}

/**
 * Оновлює відображення слайдів і крапок.
 */
function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });

    const dots = Array.from(document.querySelectorAll('.slider-dot'));

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

/**
 * Створює крапки навігації для слайд-шоу.
 */
function createDots() {
    if (!dotsContainer || !slides.length) {
        return;
    }

    dotsContainer.innerHTML = '';

    slides.forEach((_, index) => {
        const dot = document.createElement('button');

        dot.type = 'button';
        dot.className = 'slider-dot';
        dot.setAttribute('aria-label', `Перейти до слайда ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));

        dotsContainer.appendChild(dot);
    });
}

/**
 * Ініціалізація теми.
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

/**
 * Ініціалізація слайд-шоу.
 */
function initSlideshow() {
    if (!slides.length) {
        return;
    }

    createDots();
    updateSlides();
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSlideshow();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        nextSlide();
    }

    if (event.key === 'ArrowLeft') {
        prevSlide();
    }
});