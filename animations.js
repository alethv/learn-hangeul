function animateContainers() {
  const containers = document.querySelectorAll('.anim-container');

  containers.forEach((container, index) => {
    container.style.opacity = 0;
    container.style.transform = 'translateY(30px)';

    anime({
      targets: container,
      opacity: [0, 1],
      translateY: [30, 0],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: 300 + index * 200
    });

    // Añadir eventos solo una vez (evita duplicación si pageshow ocurre)
    if (!container.dataset.listenersAttached) {
      container.addEventListener('mouseenter', () => {
        anime({
          targets: container,
          scale: 1.03,
          boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
          easing: 'easeOutExpo',
          duration: 400
        });
      });

      container.addEventListener('mouseleave', () => {
        anime({
          targets: container,
          scale: 1,
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          easing: 'easeOutExpo',
          duration: 400
        });
      });

      container.dataset.listenersAttached = "true";
    }
  });
}

document.querySelectorAll('.anim-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.getAttribute('href');
    anime({
      targets: 'body',
      opacity: [1, 0],
      duration: 600,
      easing: 'easeInOutQuad',
      complete: () => {
        window.location.href = href;
      }
    });
  });
});

// Animación inicial del body
anime({
  targets: 'body',
  opacity: [0, 1],
  duration: 600,
  easing: 'easeInOutQuad'
});

// Ejecutar animaciones de los containers al cargar
animateContainers();

// Ejecutar de nuevo si se vuelve desde caché (botón "atrás")
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.body.style.opacity = 0;

    anime({
      targets: 'body',
      opacity: [0, 1],
      duration: 600,
      easing: 'easeInOutQuad'
    });

    animateContainers();
  }
});