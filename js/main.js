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
        if (currentTimeDisplay) {
          currentTimeDisplay.textContent = formatTime(videoQuienSoy.currentTime);
        }
      }
    });
    if (videoSeekBar) {
      videoSeekBar.addEventListener('input', () => {
        if (videoQuienSoy.duration) {
          const seekTime = (videoSeekBar.value / 100) * videoQuienSoy.duration;
          videoQuienSoy.currentTime = seekTime;
        }
      });
    }
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
  // 4. ANIMACIÓN SECUENCIAL CONTINUA (¿Quién es Miguel López?)
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
        playTypingSequence(p1, () => {
          playTypingSequence(p2);
        });
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
    let lineaFijaNegra = document.createElement('div');
    lineaFijaNegra.className = 'absolute inset-x-2 top-1/2 h-[3px] bg-black pointer-events-none hidden';
    lineaFijaNegra.id = 'lineaFijaNegra';
    casillaVoto.appendChild(lineaFijaNegra);
    casillaVoto.addEventListener('click', () => {
      const isHidden = svgTrazo.classList.contains('hidden');
      if (isHidden) {
        casillaVoto.classList.remove('bg-white', 'hover:bg-red-100');
        casillaVoto.classList.add('bg-black');
        lineaFijaNegra.classList.remove('hidden');
        svgTrazo.classList.remove('hidden');
        if (textoRayar) textoRayar.style.opacity = '0';
        if (mensajeVotoConfirmado) mensajeVotoConfirmado.classList.remove('hidden');
      } else {
        casillaVoto.classList.remove('bg-black');
        casillaVoto.classList.add('bg-white', 'hover:bg-red-100');
        lineaFijaNegra.classList.add('hidden');
        svgTrazo.classList.add('hidden');
        if (textoRayar) textoRayar.style.opacity = '1';
        if (mensajeVotoConfirmado) mensajeVotoConfirmado.classList.add('hidden');
      }
    });
  }

  // ==========================================
  // 6. CARRUSEL DE NOVEDADES
  // ==========================================
  const carruselTrackNovedades = document.getElementById('carruselTrackNovedades');
  const btnPrevNovedades = document.getElementById('btnPrevNovedades');
  const btnNextNovedades = document.getElementById('btnNextNovedades');
  const currentIndexNovedades = document.getElementById('currentIndexNovedades');
  const totalIndexNovedades = document.getElementById('totalIndexNovedades');
  const noticias = document.querySelectorAll('.noticia-card');
  if (carruselTrackNovedades && noticias.length > 0) {
    let currentNovIdx = 0;
    const totalNov = noticias.length;
    if (totalIndexNovedades) totalIndexNovedades.textContent = totalNov;
    
    function updateNovedadesCarrusel() {
      const cardWidth = noticias[0].offsetWidth + 16;
      carruselTrackNovedades.style.transform = `translateX(-${currentNovIdx * cardWidth}px)`;
      if (currentIndexNovedades) currentIndexNovedades.textContent = currentNovIdx + 1;
    }
    if (btnNextNovedades) {
      btnNextNovedades.addEventListener('click', () => {
        currentNovIdx = (currentNovIdx + 1) % totalNov;
        updateNovedadesCarrusel();
      });
    }
    if (btnPrevNovedades) {
      btnPrevNovedades.addEventListener('click', () => {
        currentNovIdx = (currentNovIdx - 1 + totalNov) % totalNov;
        updateNovedadesCarrusel();
      });
    }
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
  // 7. RECURSOS Y MAQUINARIA SLIDER
  // ==========================================
  const resourceSlides = document.querySelectorAll('.resource-slide');
  const resDots = document.querySelectorAll('.res-dot');
  const prevResource = document.getElementById('prevResource');
  const nextResource = document.getElementById('nextResource');
  if (resourceSlides.length > 0) {
    let currentResIdx = 0;
    const totalRes = resourceSlides.length;
    function showResource(idx) {
      resourceSlides.forEach((slide, i) => {
        if (i === idx) {
          slide.classList.remove('hidden');
        } else {
          slide.classList.add('hidden');
        }
      });
      resDots.forEach((dot, i) => {
        if (i === idx) {
          dot.classList.remove('w-1.5', 'bg-slate-300');
          dot.classList.add('w-5', 'bg-tambo-red');
        } else {
          dot.classList.remove('w-5', 'bg-tambo-red');
          dot.classList.add('w-1.5', 'bg-slate-300');
        }
      });
    }
    if (nextResource) {
      nextResource.addEventListener('click', () => {
        currentResIdx = (currentResIdx + 1) % totalRes;
        showResource(currentResIdx);
      });
    }
    if (prevResource) {
      prevResource.addEventListener('click', () => {
        currentResIdx = (currentResIdx - 1 + totalRes) % totalRes;
        showResource(currentResIdx);
      });
    }
    resDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentResIdx = i;
        showResource(currentResIdx);
      });
    });
  }

  // ==========================================
  // 8. ROADMAP INTERACTIVO
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
