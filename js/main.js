/* ==========================================================================
   SCRIPT PRINCIPAL UNIFICADO - MIGUEL LÓPEZ ALCALDE 2027
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. MENÚ DESPLEGABLE "SÚMATE" (HEADER)
     -------------------------------------------------------------------------- */
  const btnSumate = document.getElementById('btnSumate');
  const menuSumate = document.getElementById('menuSumate');
  const iconSumateArrow = document.getElementById('iconSumateArrow');

  if (btnSumate && menuSumate) {
    btnSumate.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !menuSumate.classList.contains('hidden');

      if (isOpen) {
        menuSumate.classList.add('hidden');
        if (iconSumateArrow) iconSumateArrow.classList.remove('rotate-180');
      } else {
        menuSumate.classList.remove('hidden');
        if (iconSumateArrow) iconSumateArrow.classList.add('rotate-180');
      }
    });

    document.addEventListener('click', (e) => {
      if (!menuSumate.contains(e.target) && !btnSumate.contains(e.target)) {
        menuSumate.classList.add('hidden');
        if (iconSumateArrow) iconSumateArrow.classList.remove('rotate-180');
      }
    });
  }


  /* --------------------------------------------------------------------------
     2. EFECTO TYPEWRITER (ESCRITURA DINÁMICA EN EL HERO)
     -------------------------------------------------------------------------- */
  const words = ['Justo', 'Innovador', 'Seguro', 'Transparente', 'Unido', 'Próspero'];
  const targetElement = document.getElementById('typewriter-word');

  if (targetElement) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 100;
    const deleteSpeed = 60;
    const holdTime = 3000;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        targetElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        targetElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        currentSpeed = holdTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        currentSpeed = 300;
      }

      setTimeout(typeEffect, currentSpeed);
    }

    typeEffect();
  }


  /* --------------------------------------------------------------------------
     3. REPRODUCTOR DE VIDEO DE PRESENTACIÓN (¿QUIÉN ES MIGUEL LÓPEZ?)
     -------------------------------------------------------------------------- */
  const video = document.getElementById('videoMiguel');
  const capaPortada = document.getElementById('capaPortada');
  const btnPlayInicial = document.getElementById('btnPlayInicial');
  const pantallaFinal = document.getElementById('pantallaFinal');
  const btnReplay = document.getElementById('btnReplay');

  if (video && capaPortada && btnPlayInicial) {
    btnPlayInicial.addEventListener('click', () => {
      capaPortada.classList.add('opacity-0');
      setTimeout(() => {
        capaPortada.classList.add('hidden');
        video.muted = false;
        video.play();
      }, 300);
    });

    video.addEventListener('ended', () => {
      if (pantallaFinal) {
        pantallaFinal.classList.remove('hidden');
        setTimeout(() => {
          pantallaFinal.classList.add('opacity-100');
        }, 10);
      }
    });

    if (btnReplay && pantallaFinal) {
      btnReplay.addEventListener('click', () => {
        pantallaFinal.classList.remove('opacity-100');
        pantallaFinal.classList.add('opacity-0');
        
        setTimeout(() => {
          pantallaFinal.classList.add('hidden');
          video.currentTime = 0;
          video.muted = false;
          video.play();
        }, 300);
      });
    }
  }


  /* --------------------------------------------------------------------------
     4. ANIMACIÓN DE APARICIÓN HACIA ARRIBA (SOLO LA PRIMERA VEZ QUE SE BAJA)
     -------------------------------------------------------------------------- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal-up').forEach((element) => {
      gsap.fromTo(element, 
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            once: true // Asegura que ocurra una sola vez y no desaparezca al subir
          }
        }
      );
    });

    const paragraphs = document.querySelectorAll("#quien-es .word-reveal-text");
    paragraphs.forEach((p) => {
      const rawWords = p.textContent.trim().split(/\s+/);
      p.innerHTML = rawWords
        .map((word) => `<span class="word-mask"><span class="word-inner">${word}</span></span>`)
        .join("");
    });
  }


  /* --------------------------------------------------------------------------
     5. SIMULADOR DE PAPELETA ELECTORAL (CUADRO NEGRO + LÍNEA NEGRA + TRAZO ROJO)
     -------------------------------------------------------------------------- */
  const casillaVoto = document.getElementById('casillaVoto');
  const svgTrazo = document.getElementById('svgTrazo');
  const textoRayar = document.getElementById('textoRayar');
  const mensajeVotoConfirmado = document.getElementById('mensajeVotoConfirmado');

  let votado = false;
  let audioCtx = null;

  function reproducirSonidoLapizInmediato() {
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
      }

      if (audioCtx) {
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        const duration = 0.22;
        const bufferSize = audioCtx.sampleRate * duration;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1400;
        filter.Q.value = 2.5;

        const gain = audioCtx.createGain();
        const now = audioCtx.currentTime;
        
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        noise.start(now);
      }
    } catch (e) {
      console.log('Audio de trazo no disponible:', e);
    }
  }

  if (casillaVoto && svgTrazo && textoRayar) {
    casillaVoto.addEventListener('click', (e) => {
      e.preventDefault();
      votado = !votado;

      if (votado) {
        reproducirSonidoLapizInmediato();

        textoRayar.classList.add('hidden');
        svgTrazo.classList.remove('hidden');
        casillaVoto.classList.remove('border-dashed', 'border-tambo-red');
        casillaVoto.classList.add('border-solid', 'border-black', 'bg-black/5');
        
        if (mensajeVotoConfirmado) {
          mensajeVotoConfirmado.classList.remove('hidden');
        }
      } else {
        svgTrazo.classList.add('hidden');
        textoRayar.classList.remove('hidden');
        casillaVoto.classList.add('border-dashed', 'border-tambo-red');
        casillaVoto.classList.remove('border-solid', 'border-black', 'bg-black/5');
        
        if (mensajeVotoConfirmado) {
          mensajeVotoConfirmado.classList.add('hidden');
        }
      }
    });
  }


  /* --------------------------------------------------------------------------
     6. CARRUSEL DE NOVEDADES & ACTUALIZACIONES (ROTACIÓN AUTOMÁTICA)
     -------------------------------------------------------------------------- */
  const trackNoticias = document.getElementById('carruselTrack');
  if (trackNoticias) {
    const slides = trackNoticias.querySelectorAll('article.noticia-card');
    const totalSlides = slides.length;
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const currentIndexSpan = document.getElementById('currentIndex');
    const totalIndexSpan = document.getElementById('totalIndex');
    const dots = document.querySelectorAll('.dot-btn');

    let currentIndex = 0;
    let slideInterval;
    const intervalTime = 3500;

    if (totalIndexSpan) totalIndexSpan.textContent = totalSlides;

    function updateCarousel() {
      const isDesktop = window.innerWidth >= 768;
      const visibleCount = isDesktop ? 2 : 1;
      
      if (currentIndex >= totalSlides) currentIndex = 0;
      else if (currentIndex < 0) currentIndex = totalSlides - 1;

      const slideWidthPercent = 100 / visibleCount;
      trackNoticias.style.transform = `translateX(-${currentIndex * slideWidthPercent}%)`;

      if (currentIndexSpan) {
        currentIndexSpan.textContent = `${currentIndex + 1}`;
      }

      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.remove('bg-slate-300', 'w-1.5');
          dot.classList.add('bg-tambo-red', 'w-5');
        } else {
          dot.classList.remove('bg-tambo-red', 'w-5');
          dot.classList.add('bg-slate-300', 'w-1.5');
        }
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }

    function startTimer() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalTime);
    }

    slides.forEach((card) => {
      const hoverImg = card.getAttribute('data-hover-img');
      const defaultImg = card.getAttribute('data-default-img');

      card.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
        if (hoverImg) card.style.backgroundImage = `url('${hoverImg}')`;
      });

      card.addEventListener('mouseleave', () => {
        startTimer();
        if (defaultImg) card.style.backgroundImage = `url('${defaultImg}')`;
      });
    });

    if (btnNext) btnNext.addEventListener('click', () => { nextSlide(); startTimer(); });
    if (btnPrev) btnPrev.addEventListener('click', () => { prevSlide(); startTimer(); });

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        currentIndex = parseInt(e.target.getAttribute('data-index')) || 0;
        updateCarousel();
        startTimer();
      });
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
    startTimer();
  }


  /* --------------------------------------------------------------------------
     7. PILARES DE TRANSFORMACIÓN (ROTACIÓN AUTOMÁTICA EN MÓVIL + GRID EN PC)
     -------------------------------------------------------------------------- */
  const proposalTrack = document.getElementById('proposalTrack');
  const proposalCards = document.querySelectorAll('.proposal-card');
  const btnPrevProposal = document.getElementById('prevProposal');
  const btnNextProposal = document.getElementById('nextProposal');
  const currentProposalIdxSpan = document.getElementById('currentProposalIdx');

  if (proposalTrack && proposalCards.length > 0) {
    let activeProposalIndex = 0;
    const totalProposals = proposalCards.length;
    let proposalTimer;

    function updateProposalSlider() {
      if (window.innerWidth < 768) {
        proposalTrack.style.display = 'flex';
        proposalCards.forEach((card, idx) => {
          card.style.display = idx === activeProposalIndex ? 'flex' : 'none';
        });
        if (currentProposalIdxSpan) {
          currentProposalIdxSpan.textContent = activeProposalIndex + 1;
        }
      } else {
        proposalTrack.style.display = '';
        proposalCards.forEach((card) => {
          card.style.display = '';
        });
      }
    }

    function nextProposal() {
      activeProposalIndex = (activeProposalIndex + 1) % totalProposals;
      updateProposalSlider();
    }

    function prevProposal() {
      activeProposalIndex = (activeProposalIndex - 1 + totalProposals) % totalProposals;
      updateProposalSlider();
    }

    function startProposalTimer() {
      clearInterval(proposalTimer);
      proposalTimer = setInterval(nextProposal, 4000);
    }

    if (btnNextProposal) {
      btnNextProposal.addEventListener('click', () => {
        nextProposal();
        startProposalTimer();
      });
    }

    if (btnPrevProposal) {
      btnPrevProposal.addEventListener('click', () => {
        prevProposal();
        startProposalTimer();
      });
    }

    proposalTrack.addEventListener('mouseenter', () => clearInterval(proposalTimer));
    proposalTrack.addEventListener('mouseleave', startProposalTimer);

    window.addEventListener('resize', updateProposalSlider);
    updateProposalSlider();
    startProposalTimer();
  }


  /* --------------------------------------------------------------------------
     8. RECURSOS Y MAQUINARIA (ROTACIÓN AUTOMÁTICA + CONTROLES)
     -------------------------------------------------------------------------- */
  const resourceSlides = document.querySelectorAll('.resource-slide');
  const resourceDots = document.querySelectorAll('.res-dot');
  const btnPrevResource = document.getElementById('prevResource');
  const btnNextResource = document.getElementById('nextResource');
  const resourcesSliderTrack = document.getElementById('resourcesSliderTrack');

  if (resourceSlides.length > 0) {
    let currentResIndex = 0;
    let resourceTimer;

    function showResourceSlide(index) {
      if (index >= resourceSlides.length) currentResIndex = 0;
      else if (index < 0) currentResIndex = resourceSlides.length - 1;
      else currentResIndex = index;

      resourceSlides.forEach((slide, idx) => {
        if (idx === currentResIndex) {
          slide.classList.remove('hidden');
          slide.classList.add('block');
        } else {
          slide.classList.add('hidden');
          slide.classList.remove('block');
        }
      });

      resourceDots.forEach((dot, idx) => {
        if (idx === currentResIndex) {
          dot.classList.remove('bg-slate-300', 'w-1.5');
          dot.classList.add('bg-tambo-red', 'w-5');
        } else {
          dot.classList.remove('bg-tambo-red', 'w-5');
          dot.classList.add('bg-slate-300', 'w-1.5');
        }
      });
    }

    function nextResource() {
      showResourceSlide(currentResIndex + 1);
    }

    function prevResource() {
      showResourceSlide(currentResIndex - 1);
    }

    function startResourceTimer() {
      clearInterval(resourceTimer);
      resourceTimer = setInterval(nextResource, 4200);
    }

    if (btnNextResource) {
      btnNextResource.addEventListener('click', () => {
        nextResource();
        startResourceTimer();
      });
    }

    if (btnPrevResource) {
      btnPrevResource.addEventListener('click', () => {
        prevResource();
        startResourceTimer();
      });
    }

    resourceDots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-res-idx')) || 0;
        showResourceSlide(idx);
        startResourceTimer();
      });
    });

    if (resourcesSliderTrack) {
      resourcesSliderTrack.addEventListener('mouseenter', () => clearInterval(resourceTimer));
      resourcesSliderTrack.addEventListener('mouseleave', startResourceTimer);
    }

    showResourceSlide(0);
    startResourceTimer();
  }


  /* --------------------------------------------------------------------------
     9. ROADMAP TÁCTIL (APERTURA INDEPENDIENTE MÚLTIPLE Y BOTÓN ABRIR TODAS)
     -------------------------------------------------------------------------- */
  const btnsHito = document.querySelectorAll('.btn-hito');
  const infosDesplegables = document.querySelectorAll('.info-desplegable');
  const btnToggleAllRoadmap = document.getElementById('btnToggleAllRoadmap');

  btnsHito.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      const parentNode = btn.closest('.roadmap-node');

      if (targetElement) {
        const isHidden = targetElement.classList.toggle('hidden');
        if (parentNode) {
          if (!isHidden) {
            parentNode.classList.add('active-stylus');
          } else {
            parentNode.classList.remove('active-stylus');
          }
        }
      }
    });
  });

  if (btnToggleAllRoadmap && infosDesplegables.length > 0) {
    btnToggleAllRoadmap.addEventListener('click', () => {
      const anyHidden = Array.from(infosDesplegables).some(info => info.classList.contains('hidden'));

      infosDesplegables.forEach(info => {
        const parentNode = info.closest('.roadmap-node');
        if (anyHidden) {
          info.classList.remove('hidden');
          if (parentNode) parentNode.classList.add('active-stylus');
        } else {
          info.classList.add('hidden');
          if (parentNode) parentNode.classList.remove('active-stylus');
        }
      });
    });
  }

});
