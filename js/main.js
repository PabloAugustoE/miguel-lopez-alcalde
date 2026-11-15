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
  // 3. VIDEO INTERACTIVO PRINCIPAL
  // ==========================================
  const videoQuienSoy = document.getElementById('videoQuienSoy');
  const btnPlayQuienSoy = document.getElementById('btnPlayQuienSoy');
  const containerPlayBtn = document.getElementById('containerPlayBtn');
  const videoPosterOverlay = document.getElementById('videoPosterOverlay');
  const btnTogglePlay = document.getElementById('btnTogglePlay');
  const videoSeekBar = document.getElementById('videoSeekBar');
  const currentTimeDisplay = document.getElementById('currentTimeDisplay');
  const durationDisplay = document.getElementById('durationDisplay');
  const btnFullscreen = document.getElementById('btnFullscreen');
  if (videoQuienSoy && btnPlayQuienSoy && containerPlayBtn && videoPosterOverlay) {
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    videoQuienSoy.addEventListener('loadedmetadata', () => {
      if (durationDisplay) {
        durationDisplay.textContent = formatTime(videoQuienSoy.duration);
      }
    });
    const startVideoPlayback = () => {
      videoPosterOverlay.style.opacity = '0';
      setTimeout(() => { videoPosterOverlay.classList.add('hidden'); }, 500);
      containerPlayBtn.classList.add('hidden');
      videoQuienSoy.play();
      if (btnTogglePlay) btnTogglePlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
    };
    btnPlayQuienSoy.addEventListener('click', (e) => { e.stopPropagation(); startVideoPlayback(); });
    containerPlayBtn.addEventListener('click', startVideoPlayback);
    videoQuienSoy.addEventListener('click', () => {
      if (videoQuienSoy.paused) {
        startVideoPlayback();
      } else {
        videoQuienSoy.pause();
        if (btnTogglePlay) btnTogglePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
        containerPlayBtn.classList.remove('hidden');
      }
    });
    if (btnTogglePlay) {
      btnTogglePlay.addEventListener('click', () => {
        if (videoQuienSoy.paused) {
          videoPosterOverlay.style.opacity = '0';
          videoPosterOverlay.classList.add('hidden');
          containerPlayBtn.classList.add('hidden');
          videoQuienSoy.play();
          btnTogglePlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
          videoQuienSoy.pause();
          btnTogglePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
          containerPlayBtn.classList.remove('hidden');
        }
      });
    }
    videoQuienSoy.addEventListener('timeupdate', () => {
      if (videoQuienSoy.duration) {
        const percent = (videoQuienSoy.currentTime / videoQuienSoy.duration) * 100;
        if (videoSeekBar) videoSeekBar.value = percent;
        if (currentTimeDisplay) currentTimeDisplay.textContent = formatTime(videoQuienSoy.currentTime);
      }
    });
    if (videoSeekBar) {
      videoSeekBar.addEventListener('input', () => {
        if (videoQuienSoy.duration) {
          videoQuienSoy.currentTime = (videoSeekBar.value / 100) * videoQuienSoy.duration;
        }
      });
    }
    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', () => {
        if (videoQuienSoy.requestFullscreen) videoQuienSoy.requestFullscreen();
      });
    }
    videoQuienSoy.addEventListener('ended', () => {
      videoPosterOverlay.classList.remove('hidden');
      setTimeout(() => { videoPosterOverlay.style.opacity = '1'; }, 50);
      containerPlayBtn.classList.remove('hidden');
      if (btnTogglePlay) btnTogglePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
      videoQuienSoy.currentTime = 0;
    });
  }

  // ==========================================
  // 4. ANIMACIÓN SECUENCIAL (¿Quién es Miguel López?)
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
        setTimeout(typeNext, 18);
      } else if (onComplete) {
        onComplete();
      }
    }
    typeNext();
  }
  let animationTriggered = false;
  const sectionQuienEs = document.getElementById('quien-es');
  if (sectionQuienEs) {
    const checkScrollForTyping = () => {
      if (animationTriggered) return;
      const rect = sectionQuienEs.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.8) {
        animationTriggered = true;
        playTypingSequence(p1, () => { playTypingSequence(p2); });
        window.removeEventListener('scroll', checkScrollForTyping);
      }
    };
    window.addEventListener('scroll', checkScrollForTyping);
    checkScrollForTyping();
  }

  // ==========================================
  // 5. SIMULACIÓN DE VOTO EN PAPELETA
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
  // 6. CARRUSEL DE NOVEDADES (Ficha por ficha, retención de 3s y bucle infinito)
  // ==========================================
  const wrapper = document.getElementById('carruselNovedadesWrapper');
  const track = document.getElementById('carruselTrackNovedades');
  const btnPrevNovedades = document.getElementById('btnPrevNovedades');
  const btnNextNovedades = document.getElementById('btnNextNovedades');
  const currentIndexNovedades = document.getElementById('currentIndexNovedades');

  if (wrapper && track) {
    const cards = track.querySelectorAll('.noticia-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let autoSlideTimer = null;
    let isInteracting = false;

    function getCardWidth() {
      if (cards.length > 0) {
        const style = window.getComputedStyle(cards[0]);
        const marginRight = parseInt(style.marginRight) || 24; // gap estimado o real
        return cards[0].offsetWidth + marginRight;
      }
      return 350;
    }

    function updateCounter() {
      if (currentIndexNovedades) {
        currentIndexNovedades.textContent = (currentIndex % totalCards) + 1;
      }
    }

    function scrollToCard(index, smooth = true) {
      const cardWidth = getCardWidth();
      wrapper.scrollTo({
        left: index * cardWidth,
        behavior: smooth ? 'smooth' : 'auto'
      });
      currentIndex = index;
      updateCounter();
    }

    function nextCard() {
      if (isInteracting) return;
      currentIndex++;
      // Si llega al final, hace un loop fluido al inicio
      if (currentIndex >= totalCards) {
        currentIndex = 0;
        scrollToCard(currentIndex, false); // Salto instantáneo imperceptible para el bucle
        setTimeout(() => {
          currentIndex = 1;
          scrollToCard(currentIndex, true);
        }, 50);
      } else {
        scrollToCard(currentIndex, true);
      }
    }

    function prevCardFunc() {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = totalCards - 1;
      }
      scrollToCard(currentIndex, true);
    }

    function startAutoSlide() {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(() => {
        if (!isInteracting) {
          nextCard();
        }
      }, 3000); // 3 segundos de retención
    }

    startAutoSlide();

    // Controles manuales
    if (btnNextNovedades) {
      btnNextNovedades.addEventListener('click', () => {
        isInteracting = true;
        nextCard();
        setTimeout(() => { isInteracting = false; }, 2000);
      });
    }
    if (btnPrevNovedades) {
      btnPrevNovedades.addEventListener('click', () => {
        isInteracting = true;
        prevCardFunc();
        setTimeout(() => { isInteracting = false; }, 2000);
      });
    }

    // Pausar automatismo al tocar o arrastrar manualmente
    ['mousedown', 'touchstart', 'wheel'].forEach(evt => {
      wrapper.addEventListener(evt, () => {
        isInteracting = true;
      }, { passive: true });
    });

    ['mouseup', 'mouseleave', 'touchend'].forEach(evt => {
      wrapper.addEventListener(evt, () => {
        setTimeout(() => {
          isInteracting = false;
        }, 2000);
      });
    });

    // Hover de imágenes en las tarjetas
    cards.forEach(card => {
      const hoverImg = card.getAttribute('data-hover-img');
      const defaultImg = card.getAttribute('data-default-img');
      if (hoverImg && defaultImg) {
        card.addEventListener('mouseenter', () => { card.style.backgroundImage = `url('${hoverImg}')`; });
        card.addEventListener('mouseleave', () => { card.style.backgroundImage = `url('${defaultImg}')`; });
      }
    });
  }
});
