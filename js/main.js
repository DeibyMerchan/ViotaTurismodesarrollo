// Ajustar altura dinámica del header
window.addEventListener('load', () => {
    const header = document.querySelector('.main-header');
    const heroText = document.querySelector('.hero-text');
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    heroText.classList.add('loaded');
});
window.addEventListener('resize', () => {
    const header = document.querySelector('.main-header');
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
});