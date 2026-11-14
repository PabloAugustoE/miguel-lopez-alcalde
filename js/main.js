document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. MENÚ DESPLEGABLE "SÚMATE" (HEADER)
     ========================================================== */
  const btnSumate = document.getElementById('btnSumate');
  const menuSumate = document.getElementById('menuSumate');
  const iconSumateArrow = document.getElementById('iconSumateArrow');

  if (btnSumate && menuSumate) {
    btnSumate.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !menuSumate.classList.contains('hidden');
      
      if (isOpen) {
        menuSumate.classList.add('hidden');
        btnSumate.setAttribute('aria-expanded', 'false');
        if (iconSumateArrow) iconSumateArrow.style.transform = 'rotate(0deg)';
      } else {
        menuSumate.classList.remove('hidden');
        btnSumate.setAttribute('aria-expanded', 'true');
        if (iconSumateArrow) iconSumateArrow.style.transform = 'rotate(180deg)';
      }
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!btnSumate.contains(e.target) && !menuSumate.contains(e.target)) {
        menuSumate.classList.add('hidden');
        btnSumate.setAttribute('aria-expanded', 'false');
        if (iconSumateArrow) iconSumateArrow.style.transform = 'rotate(0deg)';
      }
    });
  }


  /* ==========================================================
     2. REPRODUCTOR DE VIDEO ("¿QUIÉN ES MIGUEL LÓPEZ?")
     ========================================================== */
  const videoMiguel = document.getElementById('videoMiguel');
  const btnPlayInicial = document.getElementById('btnPlayInicial');
  const capaPortada = document.getElementById('capaPortada');
  const pantallaFinal = document.getElementById('pantallaFinal');
  const btnReplay = document.getElementById('btnReplay');

  if (videoMiguel && btnPlayInicial && capaPortada) {
    btnPlayInicial.addEventListener('click', () => {
      capaPortada.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => capaPortada.classList.add('hidden'), 500);
      videoMiguel.play();
    });

    videoMiguel.addEventListener('ended', () => {
      if (pantallaFinal) {
        pantallaFinal.classList.remove('hidden');
        setTimeout(() => pantallaFinal.classList.remove('opacity-0'), 20);
      }
    });

    if (btnReplay && pantallaFinal) {
      btnReplay.addEventListener('click', () => {
        pantallaFinal.classList.add('opacity-0');
        setTimeout(() => {
          pantallaFinal.classList.add('hidden');
          videoMiguel.currentTime = 0;
          videoMiguel.play();
        }, 500);
      });
    }
  }


  /* ==========================================================
     3. SIMULACIÓN DE PAPELETA OFICIAL 2027
     ========================================================== */
  const casillaVoto = document.getElementById('casillaVoto');
  const svgTrazo = document.getElementById('svgTrazo');
  const textoRayar = document.getElementById('textoRayar');
  const mensajeVotoConfirmado = document.getElementById('mensajeVotoConfirmado');

  if (casillaVoto && svgTrazo && textoRayar && mensajeVotoConfirmado) {
    casillaVoto.addEventListener('click', () => {
      const estaRayado = !svgTrazo.classList.contains('hidden');

      if (!estaRayado) {
        // Marcar voto
        svgTrazo.classList.remove('hidden');
        textoRayar.classList.add('hidden');
        casillaVoto.classList.add('bg-red-50');
        mensajeVotoConfirmado.classList.remove('hidden');
        
        // Animación GSAP si está disponible
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(svgTrazo, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
          gsap.fromTo(mensajeVotoConfirmado, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
        }
      } else {
        // Desmarcar voto (toggle)
        svgTrazo.classList.add('hidden');
        textoRayar.classList.remove('hidden');
        casillaVoto.classList.remove('bg-red-50');
        mensajeVotoConfirmado.classList.add('hidden');
      }
    });
  }


  /* ==========================================================
     4. CARRUSEL DE NOVEDADES
     ========================================================== */
  const carruselTrack = document.getElementById('carruselTrack');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const currentIndexEl = document.getElementById('currentIndex');
  const totalIndexEl = document.getElementById('totalIndex');
  const dotBtns = document.querySelectorAll('.dot-btn');

  if (carruselTrack && btnPrev && btnNext) {
    const cards = carruselTrack.querySelectorAll('.noticia-card');
    const totalCards = cards.length;
    if (totalIndexEl) totalIndexEl.textContent = totalCards;

    let currentCardIdx = 0;

    function updateCarrusel(index) {
      if (index < 0) index = totalCards - 1;
      if (index >= totalCards) index = 0;
      currentCardIdx = index;

      const cardWidth = cards[0].offsetWidth + 16; // ancho + gap (gap-4 = 16px)
      carruselTrack.style.transform = `translateX(-${currentCardIdx * cardWidth}px)`;

      if (currentIndexEl) currentIndexEl.textContent = currentCardIdx + 1;

      dotBtns.forEach((dot, idx) => {
        if (idx === currentCardIdx) {
          dot.classList.remove('w-1.5', 'bg-slate-300');
          dot.classList.add('w-5', 'bg-tambo-red');
        } else {
          dot.classList.remove('w-5', 'bg-tambo-red');
          dot.classList.add('w-1.5', 'bg-slate-300');
        }
      });
    }

    btnNext.addEventListener('click', () => updateCarrusel(currentCardIdx + 1));
    btnPrev.addEventListener('click', () => updateCarrusel(currentCardIdx - 1));

    dotBtns.forEach((dot, idx) => {
      dot.addEventListener('click', () => updateCarrusel(idx));
    });

    // Efecto hover dinámico en tarjetas de noticias
    cards.forEach(card => {
      const hoverImg = card.getAttribute('data-hover-img');
      const defaultImg = card.getAttribute('data-default-img');
      if (hoverImg && defaultImg) {
        card.addEventListener('mouseenter', () => {
          card.style.backgroundImage = `url('${hoverImg}')`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.backgroundImage = `url('${defaultImg}')`;
        });
      }
    });

    // Auto-avance cada 6 segundos
    let carruselInterval = setInterval(() => {
      updateCarrusel(currentCardIdx + 1);
    }, 6000);

    carruselTrack.addEventListener('mouseenter', () => clearInterval(carruselInterval));
  }


  /* ==========================================================
     5. SLIDER DE RECURSOS Y MAQUINARIA (MÓVIL)
     ========================================================== */
  const resourceSlides = document.querySelectorAll('.resource-slide');
  const prevResource = document.getElementById('prevResource');
  const nextResource = document.getElementById('nextResource');
  const resDots = document.querySelectorAll('.res-dot');

  if (resourceSlides.length > 0 && prevResource && nextResource) {
    let currentResIdx = 0;
    const totalRes = resourceSlides.length;

    function showResourceSlide(index) {
      if (index < 0) index = totalRes - 1;
      if (index >= totalRes) index = 0;
      currentResIdx = index;

      resourceSlides.forEach((slide, idx) => {
        if (idx === currentResIdx) {
          slide.classList.remove('hidden');
        } else {
          slide.classList.add('hidden');
        }
      });

      resDots.forEach((dot, idx) => {
        if (idx === currentResIdx) {
          dot.classList.remove('w-1.5', 'bg-slate-300');
          dot.classList.add('w-5', 'bg-tambo-red');
        } else {
          dot.classList.remove('w-5', 'bg-tambo-red');
          dot.classList.add('w-1.5', 'bg-slate-300');
        }
      });
    }

    nextResource.addEventListener('click', () => showResourceSlide(currentResIdx + 1));
    prevResource.addEventListener('click', () => showResourceSlide(currentResIdx - 1));

    resDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => showResourceSlide(idx));
    });
  }


  /* ==========================================================
     6. ROADMAP INTERACTIVO (CRONOGRAMA DE MANDATO)
     ========================================================== */
  const btnHitos = document.querySelectorAll('.btn-hito');
  const btnToggleAllRoadmap = document.getElementById('btnToggleAllRoadmap');

  btnHitos.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const infoBox = document.getElementById(targetId);

      if (infoBox) {
        const isHidden = infoBox.classList.contains('hidden');
        if (isHidden) {
          infoBox.classList.remove('hidden');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(infoBox, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
          }
        } else {
          infoBox.classList.add('hidden');
        }
      }
    });
  });

  if (btnToggleAllRoadmap) {
    let allOpen = false;
    btnToggleAllRoadmap.addEventListener('click', () => {
      const allInfoBoxes = document.querySelectorAll('.info-desplegable');
      allOpen = !allOpen;

      allInfoBoxes.forEach(box => {
        if (allOpen) {
          box.classList.remove('hidden');
        } else {
          box.classList.add('hidden');
        }
      });
    });
  }


  /* ==========================================================
     7. ANIMACIONES DE ENTRADA CON GSAP Y SCROLLTRIGGER
     ========================================================== */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach(el => {
      gsap.fromTo(el, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }

});
