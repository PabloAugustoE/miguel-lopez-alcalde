document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MENÚ DESPLEGABLE "SÚMATE"
  // ==========================================
  const btnSumate = document.getElementById('btnSumate');
  const menuSumate = document.getElementById('menuSumate');
  const iconSumateArrow = document.getElementById('iconSumateArrow');

  if (btnSumate && menuSumate) {
    btnSumate.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = menuSumate.classList.toggle('hidden');
      btnSumate.setAttribute('aria-expanded', !isHidden);
      if (iconSumateArrow) {
        iconSumateArrow.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!btnSumate.contains(e.target) && !menuSumate.contains(e.target)) {
        menuSumate.classList.add('hidden');
        btnSumate.setAttribute('aria-expanded', 'false');
        if (iconSumateArrow) iconSumateArrow.style.transform = 'rotate(0deg)';
      }
    });
  }


  // ==========================================
  // 2. EFECTO TYPEWRITER (HERO)
  // ==========================================
  const words = ['Justo', 'Innovador', 'Seguro', 'Transparente', 'Unido', 'Próspero'];
  const targetElement = document.getElementById('typewriter-word');

  if (targetElement) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 100;
    const deleteSpeed = 60;
    const holdTime = 3000;

    function typewriterLoop() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        charIndex--;
        targetElement.textContent = currentWord.substring(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(typewriterLoop, 400);
        } else {
          setTimeout(typewriterLoop, deleteSpeed);
        }
      } else {
        charIndex++;
        targetElement.textContent = currentWord.substring(0, charIndex);

        if (charIndex === currentWord.length) {
          isDeleting = true;
          setTimeout(typewriterLoop, holdTime);
        } else {
          setTimeout(typewriterLoop, typeSpeed);
        }
      }
    }
    typewriterLoop();
  }


  // ==========================================
  // 3. ANIMACIÓN SECUENCIAL LETRA POR LETRA (¿Quién es Miguel López?)
  // ==========================================
  const p1 = document.getElementById('parrafo1');
  const p2 = document.getElementById('parrafo2');

  function prepareText(element) {
    if (!element) return;
    const text = element.getAttribute('data-text');
    if (!text) return;
    element.innerHTML = '';
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.className = 'typing-letter';
      span.textContent = char === ' ' ? '\u00A0' : char;
      element.appendChild(span);
    });
  }

  prepareText(p1);
  prepareText(p2);

  function playTypingSequence(element, onComplete) {
    if (!element) return;
    const letters = element.querySelectorAll('.typing-letter');
    let index = 0;
    
    function typeNext() {
      if (index < letters.length) {
        letters[index].classList.add('visible');
        index++;
        setTimeout(typeNext, 18); // Velocidad rápida y fluida
      } else if (onComplete) {
        onComplete();
      }
    }
    typeNext();
  }

  const observerQuienEs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        playTypingSequence(p1, () => {
          playTypingSequence(p2);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const sectionQuienEs = document.getElementById('quien-es');
  if (sectionQuienEs) {
    observerQuienEs.observe(sectionQuienEs);
  }


  // ==========================================
  // 4. SIMULACIÓN DE VOTO EN PAPELETA
  // ==========================================
  const casillaVoto = document.getElementById('casillaVoto');
  const textoRayar = document.getElementById('textoRayar');
  const svgTrazo = document.getElementById('svgTrazo');
  const mensajeVotoConfirmado = document.getElementById('mensajeVotoConfirmado');

  if (casillaVoto) {
    casillaVoto.addEventListener('click', () => {
      const isHidden = svgTrazo.classList.contains('hidden');
      if (isHidden) {
        svgTrazo.classList.remove('hidden');
        if (textoRayar) textoRayar.style.opacity = '0';
        if (mensajeVotoConfirmado) mensajeVotoConfirmado.classList.remove('hidden');
      } else {
        svgTrazo.classList.add('hidden');
        if (textoRayar) textoRayar.style.opacity = '1';
        if (mensajeVotoConfirmado) mensajeVotoConfirmado.classList.add('hidden');
      }
    });
  }


  // ==========================================
  // 5. CARRUSEL DE NOVEDADES
  // ==========================================
  const carruselTrack = document.getElementById('carruselTrack');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const currentIndexEl = document.getElementById('currentIndex');
  const dots = document.querySelectorAll('.dot-btn');
  const noticias = document.querySelectorAll('.noticia-card');

  if (carruselTrack && noticias.length > 0) {
    let currentIdx = 0;
    const totalNoticias = noticias.length;

    function updateCarrusel() {
      const cardWidth = noticias[0].offsetWidth + 16; // ancho + gap (16px)
      carruselTrack.style.transform = `translateX(-${currentIdx * cardWidth}px)`;
      if (currentIndexEl) currentIndexEl.textContent = currentIdx + 1;

      dots.forEach((dot, idx) => {
        if (idx === currentIdx) {
          dot.classList.remove('w-1.5', 'bg-slate-300');
          dot.classList.add('w-5', 'bg-tambo-red');
        } else {
          dot.classList.remove('w-5', 'bg-tambo-red');
          dot.classList.add('w-1.5', 'bg-slate-300');
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        currentIdx = (currentIdx + 1) % totalNoticias;
        updateCarrusel();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        currentIdx = (currentIdx - 1 + totalNoticias) % totalNoticias;
        updateCarrusel();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        currentIdx = idx;
        updateCarrusel();
      });
    });

    // Efecto hover para alternar imagen de fondo en tarjetas de noticias
    noticias.forEach(card => {
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
  }


  // ==========================================
  // 6. ROADMAP INTERACTIVO
  // ==========================================
  const btnHitos = document.querySelectorAll('.btn-hito');
  const btnToggleAllRoadmap = document.getElementById('btnToggleAllRoadmap');

  btnHitos.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const infoBox = document.getElementById(targetId);
      if (infoBox) {
        infoBox.classList.toggle('hidden');
      }
    });
  });

  if (btnToggleAllRoadmap) {
    let allOpen = false;
    btnToggleAllRoadmap.addEventListener('click', () => {
      allOpen = !allOpen;
      document.querySelectorAll('.info-desplegable').forEach(box => {
        if (allOpen) {
          box.classList.remove('hidden');
        } else {
          box.classList.add('hidden');
        }
      });
    });
  }

});
