// Archivo: hero.js
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.carousel-image');
    const dots = document.querySelectorAll('.dot');
    const heroSection = document.querySelector('.hero-carousel');
    const textBlock = document.querySelector('.hero-text');

    let index = 0;
    let interval;
    let isInView = true;
    let userInteracted = false;
    let extraDelayActive = false;

    /** Verificar si el hero está completamente arriba (scroll en el tope) */
    function isHeroAtTop() {
        return window.scrollY <= 5; // scroll casi en el tope
    }

    /** Cambiar a una diapositiva específica */
    function changeSlide(newIndex) {
        images[index].classList.remove('active');
        dots[index].classList.remove('active');
        index = (newIndex + images.length) % images.length;
        images[index].classList.add('active');
        dots[index].classList.add('active');
    }

    /** Iniciar autoplay */
    function startAutoplay() {
        stopAutoplay();
        interval = setInterval(() => {
            if (isInView && !userInteracted && isHeroAtTop()) {
                if (!extraDelayActive) {
                    extraDelayActive = true;
                    setTimeout(() => {
                        changeSlide(index + 1);
                        extraDelayActive = false;
                    }, 1500);
                } else {
                    changeSlide(index + 1);
                }
            }
        }, 2500);
    }

    /** Detener autoplay */
    function stopAutoplay() {
        if (interval) clearInterval(interval);
    }

    /** Reiniciar autoplay tras interacción */
    function resetAutoplay() {
        userInteracted = true;
        stopAutoplay();
        setTimeout(() => {
            userInteracted = false;
            startAutoplay();
        }, 7000);
    }

    /** Dots manuales */
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            changeSlide(i);
            resetAutoplay();
        });
    });

    /** Swipe móvil */
    let startX = 0;
    heroSection.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    heroSection.addEventListener('touchend', e => {
        let diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? changeSlide(index - 1) : changeSlide(index + 1);
            resetAutoplay();
        }
    });

    /** Observer para detectar visibilidad del hero */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isInView = entry.isIntersecting;
        });
    }, { threshold: 0.3 });
    observer.observe(heroSection);

    /** Animación inicial del hero */
    window.addEventListener('load', () => {
        setTimeout(() => {
            heroSection.classList.add('loaded');
            textBlock.classList.add('loaded');
        }, 1);
    });

    /** Iniciar */
    changeSlide(0);
    startAutoplay();
});

document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll('.carousel-image:not(.active)');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Reemplaza el placeholder por la real
                img.removeAttribute('data-src');
                obs.unobserve(img);
            }
        });
    }, { rootMargin: "200px" }); // carga antes de que aparezca

    lazyImages.forEach(img => observer.observe(img));
});
