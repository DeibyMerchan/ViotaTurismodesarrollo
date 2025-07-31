// Archivo: header.js
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('.main-header');

    /** === 1. Animación inicial: mostrar el header === */
    window.addEventListener('load', () => {
        setTimeout(() => {
            header.classList.add('loaded'); // Activa la animación de entrada (slideDown)
        }, 1000); // Pequeño retraso para que aparezca sincronizado con el hero
    });

    /** === 2. Efecto glow dinámico en el menú === */
    document.querySelectorAll('.main-header__menu li a').forEach(link => {
        link.addEventListener('mouseenter', e => {
            const rect = e.target.getBoundingClientRect();
            const headerRect = header.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2 - headerRect.left;
            header.style.setProperty('--glow-x', centerX + 'px');
            header.classList.add('show-glow');
        });

        link.addEventListener('mouseleave', () => {
            header.classList.remove('show-glow');
        });
    });

    /** === 3. Cambiar estilo al hacer scroll === */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /** === 4. Ocultar header al hacer scroll hacia abajo y mostrar al subir === */
    let lastScroll = window.scrollY;
    let isHidden = false;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolleando hacia abajo
            if (!isHidden) {
                header.classList.add('hide');
                isHidden = true;
            }
        } else if (currentScroll < lastScroll) {
            // Scrolleando hacia arriba
            if (isHidden) {
                header.classList.remove('hide');
                isHidden = false;
            }
        }

        lastScroll = currentScroll;
    });
});
