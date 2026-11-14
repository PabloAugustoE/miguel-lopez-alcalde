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
  // 3. VIDEO INTERACTIVO PRINCIPAL (quien-soy.mp4) CON CONTROLES COMPLETOS
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
    
    // Función auxiliar para formatear segundos a MM:SS
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Actualizar duración total cuando carguen los metadatos del video
    videoQuienSoy.addEventListener('loadedmetadata', () => {
      if (durationDisplay) {
        durationDisplay.textContent = formatTime(videoQuienSoy.duration);
      }
    });

    // Iniciar reproducción desde el botón central o clic en el póster
    const startVideoPlayback = () => {
      videoPosterOverlay.style.opacity = '0';
      setTimeout(() => {
        videoPosterOverlay.classList.add('hidden');
      }, 500);
      containerPlayBtn.classList.add('hidden');
      videoQuienSoy.play();
      if (btnTogglePlay) {
        btnTogglePlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
      }
    };

    btnPlayQuienSoy.addEventListener('click', (e) => {
      e.stopPropagation();
      startVideoPlayback();
    });

    containerPlayBtn.addEventListener('click', () => {
      startVideoPlayback();
    });

    videoQuienSoy.addEventListener('click', () => {
      if (videoQuienSoy.paused) {
        startVideoPlayback();
      } else {
        videoQuienSoy.pause();
        if (btnTogglePlay) {
          btnTogglePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
        containerPlayBtn.classList.remove('hidden');
      }
    });

    // Botón de Pausa / Reproducir en la barra inferior
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

    // Actualizar barra de progreso (SeekBar) y tiempo actual mientras se reproduce
    videoQuienSoy.addEventListener('timeupdate', () => {
      if (videoQuienSoy.duration) {
        const percent = (videoQuienSoy.currentTime / videoQuienSoy.duration) * 100;
        if (videoSeekBar) videoSeekBar.value = percent;
        if (currentTimeDisplay) {
          currentTimeDisplay.textContent = formatTime(videoQuienSoy.currentTime);
        }
      }
    });

    // Adelantar / Retrasar al arrastrar o hacer clic en la barra de progreso
    if (videoSeekBar) {
      videoSeekBar.addEventListener('input', () => {
        if (videoQuienSoy.duration) {
          const seekTime = (videoSeekBar.value / 100) * videoQuienSoy.duration;
          videoQuienSoy.currentTime = seekTime;
        }
      });
    }

    // Pantalla completa
    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', () => {
        if (videoQuienSoy.requestFullscreen) {
          videoQuienSoy.requestFullscreen();
        } else if (videoQuienSoy.webkitRequestFullscreen) {
          videoQuienSoy.webkitRequestFullscreen();
        } else if (videoQuienSoy.msRequestFullscreen) {
          videoQuienSoy.msRequestFullscreen();
        }
      });
    }

    // Al finalizar el video, restaurar la imagen de portada y el botón de play
    videoQuienSoy.addEventListener('ended', () => {
      videoPosterOverlay.classList.remove('hidden');
      setTimeout(() => {
        videoPosterOverlay.style.opacity = '1';
      }, 50);
      containerPlayBtn.classList.remove('hidden');
      if (btnTogglePlay) {
        btnTogglePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
      videoQuienSoy.currentTime = 0;
    });
  }


  // ==========================================
  // 4. ANIMACIÓN SECUENCIAL LETRA POR LETRA (¿Quién es Miguel López?)
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
  // 6. CARRUSEL DE NOVEDADES
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
      const cardWidth = noticias[0].offsetWidth + 16;
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
  // 7. ROADMAP INTERACTIVO
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
