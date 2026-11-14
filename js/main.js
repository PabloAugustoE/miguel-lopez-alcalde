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
     4. ANIMACIÓN DE APARICIÓN HACIA ARRIBA (GSAP & SCROLLTRIGGER)
     -------------------------------------------------------------------------- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animación general de aparición hacia arriba para elementos con clase .reveal-up
    gsap.utils.toArray('.reveal-up').forEach((element) => {
      gsap.fromTo(element, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Revelado de palabras en párrafos institucionales
    const paragraphs = document.querySelectorAll("#quien-es .word-reveal-text");
    paragraphs.forEach((p) => {
      const rawWords = p.textContent.trim().split(/\s+/);
      p.innerHTML = rawWords
        .map((word) => `<span class="word-mask"><span class="word-inner">${word}</span></span>`)
        .join("");
    });
  }


  /* --------------------------------------------------------------------------
     5. SIMULADOR DE PAPELETA ELECTORAL (VOTO POR MIGUEL LÓPEZ)
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
        casillaVoto.classList.remove('border-dashed', 'border-slate-400');
        casillaVoto.classList.add('border-solid', 'border-blue-600', 'bg-blue-50/40');
        
        if (mensajeVotoConfirmado) {
          mensajeVotoConfirmado.classList.remove('hidden');
        }
      } else {
        svgTrazo.classList.add('hidden');
        textoRayar.classList.remove('hidden');
        casillaVoto.classList.add('border-dashed', 'border-slate-400');
        casillaVoto.classList.remove('border-solid', 'border-blue-600', 'bg-blue-50/40');
        
        if (mensajeVotoConfirmado) {
          mensajeVotoConfirmado.classList.add('hidden');
        }
      }
    });
  }


  /* --------------------------------------------------------------------------
     6. CARRUSEL DE NOVEDADES & ACTUALIZACIONES
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
    const intervalTime = 3000;

    if (totalIndexSpan) totalIndexSpan.textContent = totalSlides;

    function updateCarousel() {
      const isDesktop = window.innerWidth >= 768;
      const visibleCount = isDesktop ? 2 : 1;
      
      if (currentIndex >= totalSlides) {
        currentIndex = 0;
      } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
      }

      const slideWidthPercent = 100 / visibleCount;
      trackNoticias.style.transform = `translateX(-${currentIndex * slideWidthPercent}%)`;

      if (currentIndexSpan) {
        if (isDesktop) {
          const nextIdx = (currentIndex + 1) % totalSlides;
          currentIndexSpan.textContent = `${currentIndex + 1} & ${nextIdx + 1}`;
        } else {
          currentIndexSpan.textContent = `${currentIndex + 1}`;
        }
      }

      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.remove('bg-slate-300', 'w-2');
          dot.classList.add('bg-tambo-red', 'w-6');
        } else {
          dot.classList.remove('bg-tambo-red', 'w-6');
          dot.classList.add('bg-slate-300', 'w-2');
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

    function resetTimer() {
      startTimer();
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

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        nextSlide();
        resetTimer();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        prevSlide();
        resetTimer();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        currentIndex = parseInt(e.target.getAttribute('data-index')) || 0;
        updateCarousel();
        resetTimer();
      });
    });

    window.addEventListener('resize', () => updateCarousel());
    updateCarousel();
    startTimer();
  }


  /* --------------------------------------------------------------------------
     7. PILARES DE TRANSFORMACIÓN (HÍBRIDO: GRID PC / CARRUSEL MÓVIL)
     -------------------------------------------------------------------------- */
  const proposalCards = document.querySelectorAll('.proposal-card');
  proposalCards.forEach((card) => {
    const hoverImg = card.getAttribute('data-hover-img');
    const defaultImg = card.getAttribute('data-default-img');

    card.addEventListener('mouseenter', () => {
      if (hoverImg) card.style.backgroundImage = `url('${hoverImg}')`;
    });

    card.addEventListener('mouseleave', () => {
      if (defaultImg) card.style.backgroundImage = `url('${defaultImg}')`;
    });
  });

  const proposalTrack = document.getElementById('proposalTrack');
  const btnPrevProposal = document.getElementById('prevProposal');
  const btnNextProposal = document.getElementById('nextProposal');
  const currentProposalIdxSpan = document.getElementById('currentProposalIdx');

  if (proposalTrack && btnPrevProposal && btnNextProposal) {
    let activeProposalIndex = 0;
    const totalProposals = proposalCards.length;

    function updateProposalMobileSlider() {
      if (window.innerWidth < 768) {
        proposalTrack.style.display = 'flex';
        proposalTrack.style.overflowX = 'hidden';
        proposalCards.forEach((card, idx) => {
          card.style.minWidth = '100%';
          card.style.display = idx === activeProposalIndex ? 'flex' : 'none';
        });
        if (currentProposalIdxSpan) {
          currentProposalIdxSpan.textContent = activeProposalIndex + 1;
        }
      } else {
        proposalTrack.style.display = '';
        proposalTrack.style.overflowX = '';
        proposalCards.forEach((card) => {
          card.style.minWidth = '';
          card.style.display = '';
        });
      }
    }

    btnNextProposal.addEventListener('click', () => {
      activeProposalIndex = (activeProposalIndex + 1) % totalProposals;
      updateProposalMobileSlider();
    });

    btnPrevProposal.addEventListener('click', () => {
      activeProposalIndex = (activeProposalIndex - 1 + totalProposals) % totalProposals;
      updateProposalMobileSlider();
    });

    window.addEventListener('resize', updateProposalMobileSlider);
    updateProposalMobileSlider();
  }


  /* --------------------------------------------------------------------------
     8. CONTROL DE RECURSOS Y MAQUINARIA (SLIDER INTERACTIVO)
     -------------------------------------------------------------------------- */
  const resourceSlides = document.querySelectorAll('.resource-slide');
  const resourceDots = document.querySelectorAll('.res-dot');
  const btnPrevResource = document.getElementById('prevResource');
  const btnNextResource = document.getElementById('nextResource');

  if (resourceSlides.length > 0) {
    let currentResIndex = 0;

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
          dot.classList.remove('bg-slate-300', 'w-2');
          dot.classList.add('bg-tambo-red', 'w-6');
        } else {
          dot.classList.remove('bg-tambo-red', 'w-6');
          dot.classList.add('bg-slate-300', 'w-2');
        }
      });
    }

    if (btnNextResource) {
      btnNextResource.addEventListener('click', () => {
        showResourceSlide(currentResIndex + 1);
      });
    }

    if (btnPrevResource) {
      btnPrevResource.addEventListener('click', () => {
        showResourceSlide(currentResIndex - 1);
      });
    }

    resourceDots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-res-idx')) || 0;
        showResourceSlide(idx);
      });
    });

    showResourceSlide(0);
  }


  /* --------------------------------------------------------------------------
     9. ROADMAP TÁCTIL (OPTIMIZADO PARA MOUSE, TÁCTIL Y STYLUS)
     -------------------------------------------------------------------------- */
  const roadmapNodes = document.querySelectorAll('.roadmap-node');
  roadmapNodes.forEach(node => {
    node.addEventListener('pointerdown', () => {
      const details = node.querySelector('.phase-details');
      const indicator = node.querySelector('.stylus-indicator');
      
      const isActive = node.classList.toggle('active-stylus');
      
      if (details && indicator) {
        if (isActive) {
          details.classList.remove('hidden');
          indicator.innerHTML = '<i class="fa-solid fa-check text-green-600 mr-1"></i> Seleccionado';
          indicator.classList.add('bg-green-100', 'text-green-700', 'border-green-300');
        } else {
          details.classList.add('hidden');
          indicator.innerHTML = '<i class="fa-solid fa-pen-pointer mr-1"></i> Toca / Usa Stylus';
          indicator.classList.remove('bg-green-100', 'text-green-700', 'border-green-300');
        }
      }
    });
  });

  const btnsHito = document.querySelectorAll('.btn-hito');
  const infosDesplegables = document.querySelectorAll('.info-desplegable');

  btnsHito.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        if (!targetElement.classList.contains('hidden')) {
          targetElement.classList.add('hidden');
          return;
        }

        infosDesplegables.forEach(info => info.classList.add('hidden'));
        targetElement.classList.remove('hidden');
      }
    });
  });

  console.log("Script principal optimizado inicializado correctamente.");
});
