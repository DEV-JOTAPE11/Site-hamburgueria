document.addEventListener('DOMContentLoaded', () => {

    // Header que muda com o scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Carrossel de Depoimentos
    const testimonialInner = document.querySelector('.testimonial-inner');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;

    // Criar os "dots"
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        testimonialInner.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Carrossel infinito automático
    setInterval(() => {
        let nextIndex = (currentIndex + 1) % testimonials.length;
        goToSlide(nextIndex);
    }, 5000); // Muda a cada 5 segundos

});

document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO DA ANIMAÇÃO DOS NÚMEROS ---

    const counters = document.querySelectorAll('.hero-stats h3');
    const statsSection = document.querySelector('.hero-stats');

    // Função que anima os números
    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            // Verifica se a seção está visível
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target'); // O '+' converte a string para número
                    const duration = 2000; // Duração da animação em milissegundos (2s)
                    const stepTime = 20; // Intervalo de atualização (mais baixo = mais suave)
                    let current = 0;
                    
                    // Calcula quanto incrementar a cada passo
                    const increment = (target / duration) * stepTime;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        
                        if (current >= target) {
                            clearInterval(timer);
                            // Garante que o número final seja exato
                            if (target % 1 !== 0) { // Se for um número decimal
                                counter.innerHTML = `${target.toFixed(1)}<i class="fas fa-star"></i>`;
                            } else {
                                counter.innerText = `${Math.floor(target)}+`;
                            }
                        } else {
                           // Atualiza o texto durante a animação
                           if (target % 1 !== 0) {
                                counter.innerHTML = `${current.toFixed(1)}<i class="fas fa-star"></i>`;
                           } else {
                                counter.innerText = `${Math.ceil(current)}+`;
                           }
                        }
                    }, stepTime);
                });

                // Para a observação após a animação começar para não repetir
                observer.unobserve(statsSection);
            }
        });
    };

    // Cria o observador que vai "vigiar" a seção
    const observer = new IntersectionObserver(animateCounters, {
        threshold: 0.5 // A animação começa quando 50% da seção estiver visível
    });

    // Inicia a observação
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // --- FIM DO CÓDIGO DA ANIMAÇÃO ---
});



