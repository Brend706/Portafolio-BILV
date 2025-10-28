let totalSlides;
let currentSlide = 0;

/**
 * Inicializa el carrusel: cuenta los slides y establece los manejadores de eventos.
 */
function initCarousel() {
    // Se buscan todos los elementos cuyo ID empieza con 'carousel-slide-'
    const slides = document.querySelectorAll('[id^="carousel-slide-"]');
    
    // Si no encuentra slides, detiene la inicialización para evitar errores.
    if (slides.length === 0) {
        console.error("No se encontraron slides. Asegúrate de que los IDs comiencen con 'carousel-slide-'.");
        return; 
    }
    
    //guarda el número total de slides
    totalSlides = slides.length; 
    
    // Botón de siguiente
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        });
    }

    // Botón anterior
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        });
    }

    // Click en indicadores
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index < totalSlides) { // Previene error si hay más puntos que slides
                showSlide(index);
            }
        });
    });

    // Mostrar la primera slide al iniciar
    showSlide(currentSlide); 
}

function showSlide(index) {
    const slides = document.querySelectorAll('[id^="carousel-slide-"]');
    slides.forEach(slide => {
        slide.classList.remove('opacity-100');
        slide.classList.add('opacity-0');
    });

    const activeSlide = document.getElementById(`carousel-slide-${index}`);
    if (activeSlide) {
        activeSlide.classList.remove('opacity-0');
        activeSlide.classList.add('opacity-100');
    }

    // Actualizar indicadores
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
            dot.classList.remove('opacity-50');
        } else {
            dot.classList.remove('active');
            dot.classList.add('opacity-50');
        }
    });

    currentSlide = index;
}

// **Ejecutar la función**
document.addEventListener('DOMContentLoaded', initCarousel);