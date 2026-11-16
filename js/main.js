document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     1. MENÚ DESPLEGABLE "SÚMATE" (Ocultamiento automático al hacer scroll)
     ========================================== */
  const btnSumate = document.getElementById("btnSumate");
  const menuSumate = document.getElementById("menuSumate");
  const iconSumateArrow = document.getElementById("iconSumateArrow");

  if (btnSumate && menuSumate) {
    btnSumate.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = menuSumate.classList.contains("hidden");
      if (isHidden) {
        menuSumate.classList.remove("hidden");
        btnSumate.setAttribute("aria-expanded", "true");
        if (iconSumateArrow) iconSumateArrow.style.transform = "rotate(180deg)";
      } else {
        menuSumate.classList.add("hidden");
        btnSumate.setAttribute("aria-expanded", "false");
        if (iconSumateArrow) iconSumateArrow.style.transform = "rotate(0deg)";
      }
    });

    document.addEventListener("click", (e) => {
      if (!btnSumate.contains(e.target) && !menuSumate.contains(e.target)) {
        menuSumate.classList.add("hidden");
        btnSumate.setAttribute("aria-expanded", "false");
        if (iconSumateArrow) iconSumateArrow.style.transform = "rotate(0deg)";
      }
    });

    window.addEventListener("scroll", () => {
      if (!menuSumate.classList.contains("hidden")) {
        menuSumate.classList.add("hidden");
        btnSumate.setAttribute("aria-expanded", "false");
        if (iconSumateArrow) iconSumateArrow.style.transform = "rotate(0deg)";
      }
    });
  }


  /* ==========================================
     2. EFECTO MÁQUINA DE ESCRIBIR (HERO)
     ========================================== */
  const words = ["Próspero", "Solidario", "Seguro", "Productivo", "Transformado"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterSpan = document.getElementById("typewriter-word");

  function typeEffect() {
    if (!typewriterSpan) return;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typewriterSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 75 : 120;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();


  /* ==========================================
     3. EFECTO LETRA A LETRA (LIDERAZGO / BIOGRAFÍA)
     ========================================== */
  const typingParagraphs = document.querySelectorAll(".typing-paragraph");
  typingParagraphs.forEach(p => {
    const text = p.getAttribute("data-text");
    if (!text) return;
    p.innerHTML = "";
    text.split("").forEach(char => {
      const span = document.createElement("span");
      span.className = "typing-letter";
      span.textContent = char === " " ? "\u00A0" : char;
      p.appendChild(span);
    });
  });

  const observerOptions = { threshold: 0.2 };
  const paragraphObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const letters = entry.target.querySelectorAll(".typing-letter");
        letters.forEach((letter, idx) => {
          setTimeout(() => {
            letter.classList.add("visible");
          }, idx * 12);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  typingParagraphs.forEach(p => paragraphObserver.observe(p));


  /* ==========================================
     4. REPRODUCTOR DE VIDEO INTERACTIVO (Biografía)
     ========================================== */
  const video = document.getElementById("videoQuienSoy");
  const posterOverlay = document.getElementById("videoPosterOverlay");
  const containerPlayBtn = document.getElementById("containerPlayBtn");
  const btnPlayQuienSoy = document.getElementById("btnPlayQuienSoy");
  const videoControlsBar = document.getElementById("videoControlsBar");
  const btnTogglePlay = document.getElementById("btnTogglePlay");
  const videoSeekBar = document.getElementById("videoSeekBar");
  const currentTimeDisplay = document.getElementById("currentTimeDisplay");
  const durationDisplay = document.getElementById("durationDisplay");
  const btnFullscreen = document.getElementById("btnFullscreen");

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  if (video) {
    const startPlaying = () => {
      if (posterOverlay) posterOverlay.style.opacity = '0';
      if (containerPlayBtn) containerPlayBtn.style.display = 'none';
      if (videoControlsBar) {
        videoControlsBar.style.opacity = '1';
        videoControlsBar.style.pointerEvents = 'auto';
      }
      video.play().catch(err => console.log("Play error:", err));
      if (btnTogglePlay) btnTogglePlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
    };

    if (btnPlayQuienSoy) btnPlayQuienSoy.addEventListener("click", startPlaying);
    if (containerPlayBtn) containerPlayBtn.addEventListener("click", startPlaying);
    video.addEventListener("click", () => {
      if (video.paused) startPlaying();
      else {
        video.pause();
        if (btnTogglePlay) btnTogglePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
    });

    if (btnTogglePlay) {
      btnTogglePlay.addEventListener("click", () => {
        if (video.paused) {
          video.play();
          btnTogglePlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
          video.pause();
          btnTogglePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
      });
    }

    video.addEventListener("loadedmetadata", () => {
      if (durationDisplay) durationDisplay.textContent = formatTime(video.duration);
    });

    video.addEventListener("timeupdate", () => {
      if (video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        if (videoSeekBar) videoSeekBar.value = percent;
        if (currentTimeDisplay) currentTimeDisplay.textContent = formatTime(video.currentTime);
      }
    });

    if (videoSeekBar) {
      videoSeekBar.addEventListener("input", () => {
        const time = (videoSeekBar.value / 100) * video.duration;
        video.currentTime = time;
      });
    }

    if (btnFullscreen) {
      btnFullscreen.addEventListener("click", () => {
        if (video.requestFullscreen) video.requestFullscreen();
        else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
      });
    }
  }


  /* ==========================================
     5. SIMULADOR DE PAPELETA OFICIAL (Línea Diagonal Roja Animada)
     ========================================== */
  const casillaVoto = document.getElementById("casillaVoto");
  const svgTrazo = document.getElementById("svgTrazo");
  const textoRayar = document.getElementById("textoRayar");
  const mensajeVotoConfirmado = document.getElementById("mensajeVotoConfirmado");

  let votoRealizado = false;

  if (casillaVoto) {
    casillaVoto.addEventListener("click", () => {
      votoRealizado = !votoRealizado;
      if (votoRealizado) {
        if (textoRayar) textoRayar.style.display = "none";
        if (svgTrazo) svgTrazo.classList.remove("hidden");
        if (mensajeVotoConfirmado) {
          mensajeVotoConfirmado.classList.remove("hidden");
          mensajeVotoConfirmado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        if (textoRayar) textoRayar.style.display = "block";
        if (svgTrazo) svgTrazo.classList.add("hidden");
        if (mensajeVotoConfirmado) mensajeVotoConfirmado.classList.add("hidden");
      }
    });
  }

  /* ==========================================
     6. CARRUSEL DE NOVEDADES (Con Auto-desplazamiento e Interactividad Fluida)
     ========================================== */
  const carruselWrapper = document.getElementById("carruselNovedadesWrapper");
  const btnPrevNovedades = document.getElementById("btnPrevNovedades");
  const btnNextNovedades = document.getElementById("btnNextNovedades");
  const currentIndexNovedades = document.getElementById("currentIndexNovedades");
  const totalIndexNovedades = document.getElementById("totalIndexNovedades");
  const tarjetasNoticia = document.querySelectorAll(".noticia-card");

  if (totalIndexNovedades) totalIndexNovedades.textContent = tarjetasNoticia.length;

  if (carruselWrapper && btnPrevNovedades && btnNextNovedades) {
    const scrollAmount = 374; // Ancho de tarjeta + espacio exacto

    btnNextNovedades.addEventListener("click", () => {
      carruselWrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
      resetAutoScrollNovedades();
    });

    btnPrevNovedades.addEventListener("click", () => {
      carruselWrapper.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      resetAutoScrollNovedades();
    });

    carruselWrapper.addEventListener("scroll", () => {
      const cardWidth = 350 + 24;
      const index = Math.round(carruselWrapper.scrollLeft / cardWidth) + 1;
      const clampedIndex = Math.max(1, Math.min(index, tarjetasNoticia.length));
      if (currentIndexNovedades) currentIndexNovedades.textContent = clampedIndex;
    });

    tarjetasNoticia.forEach(card => {
      const hoverImg = card.getAttribute("data-hover-img");
      const defaultImg = card.getAttribute("data-default-img");
      if (hoverImg && defaultImg) {
        card.addEventListener("mouseenter", () => {
          card.style.backgroundImage = `url('${hoverImg}')`;
        });
        card.addEventListener("mouseleave", () => {
          card.style.backgroundImage = `url('${defaultImg}')`;
        });
      }
    });

    // Auto-desplazamiento suave para Novedades
    let autoScrollIntervalNovedades = setInterval(() => {
      if (!carruselWrapper) return;
      const maxScrollLeft = carruselWrapper.scrollWidth - carruselWrapper.clientWidth;
      if (carruselWrapper.scrollLeft >= maxScrollLeft - 10) {
        carruselWrapper.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carruselWrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 4500);

    function resetAutoScrollNovedades() {
      clearInterval(autoScrollIntervalNovedades);
      autoScrollIntervalNovedades = setInterval(() => {
        if (!carruselWrapper) return;
        const maxScrollLeft = carruselWrapper.scrollWidth - carruselWrapper.clientWidth;
        if (carruselWrapper.scrollLeft >= maxScrollLeft - 10) {
          carruselWrapper.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carruselWrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }, 4500);
    }

    carruselWrapper.addEventListener("mouseenter", () => clearInterval(autoScrollIntervalNovedades));
    carruselWrapper.addEventListener("mouseleave", resetAutoScrollNovedades);
  }


  /* ==========================================
     7. CARRUSEL 3D EN ABANICO / COVERFLOW (Propuestas con Auto-rotación y Controles Robustos)
     ========================================== */
  const cards = document.querySelectorAll(".coverflow-card");
  const prevCoverflow = document.getElementById("prevCoverflow");
  const nextCoverflow = document.getElementById("nextCoverflow");
  const coverflowDots = document.getElementById("coverflowDots");

  let activeIndex = 0;
  const totalCards = cards.length;
  let coverflowInterval;

  if (coverflowDots && totalCards > 0) {
    for (let i = 0; i < totalCards; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === 0 ? 'bg-red-600 w-6' : 'bg-slate-300'}`;
      dot.setAttribute("aria-label", `Ir a propuesta ${i + 1}`);
      dot.addEventListener("click", () => {
        activeIndex = i;
        updateCoverflow();
        resetCoverflowTimer();
      });
      coverflowDots.appendChild(dot);
    }
  }

  function updateCoverflow() {
    if (cards.length === 0) return;

    cards.forEach((card, index) => {
      card.className = "coverflow-card group";

      let offset = index - activeIndex;

      if (offset > Math.floor(totalCards / 2)) offset -= totalCards;
      if (offset < -Math.floor(totalCards / 2)) offset += totalCards;

      if (offset === 0) {
        card.classList.add("cf-center");
      } else if (offset === -1) {
        card.classList.add("cf-left-1");
      } else if (offset === 1) {
        card.classList.add("cf-right-1");
      } else if (offset <= -2) {
        card.classList.add("cf-left-2");
      } else if (offset >= 2) {
        card.classList.add("cf-right-2");
      } else {
        card.classList.add("cf-hidden");
      }
    });

    if (coverflowDots) {
      const dots = coverflowDots.querySelectorAll("button");
      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.className = "w-6 h-2.5 rounded-full bg-red-600 transition-all cursor-pointer";
        } else {
          dot.className = "w-2.5 h-2.5 rounded-full bg-slate-300 transition-all cursor-pointer";
        }
      });
    }
  }

  if (nextCoverflow) {
    nextCoverflow.addEventListener("click", () => {
      activeIndex = (activeIndex + 1) % totalCards;
      updateCoverflow();
      resetCoverflowTimer();
    });
  }

  if (prevCoverflow) {
    prevCoverflow.addEventListener("click", () => {
      activeIndex = (activeIndex - 1 + totalCards) % totalCards;
      updateCoverflow();
      resetCoverflowTimer();
    });
  }

  // Permitir clic en las tarjetas laterales del Coverflow para traerlas al frente
  cards.forEach((card, idx) => {
    card.addEventListener("click", (e) => {
      if (idx !== activeIndex) {
        e.preventDefault();
        activeIndex = idx;
        updateCoverflow();
        resetCoverflowTimer();
      }
    });
  });

  // Auto-rotación para el Plan de Gobierno
  function startCoverflowTimer() {
    coverflowInterval = setInterval(() => {
      activeIndex = (activeIndex + 1) % totalCards;
      updateCoverflow();
    }, 5000);
  }

  function resetCoverflowTimer() {
    clearInterval(coverflowInterval);
    startCoverflowTimer();
  }

  const coverflowStage = document.getElementById("coverflowStage");
  if (coverflowStage) {
    coverflowStage.addEventListener("mouseenter", () => clearInterval(coverflowInterval));
    coverflowStage.addEventListener("mouseleave", startCoverflowTimer);
  }

  updateCoverflow();
  startCoverflowTimer();


  /* ==========================================
     8. ROADMAP ACORDEÓN EXCLUSIVO
     ========================================== */
  const roadmapTriggers = document.querySelectorAll(".roadmap-trigger");

  roadmapTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const targetId = trigger.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);
      const targetArrow = trigger.querySelector(".roadmap-arrow");

      const isCurrentlyOpen = !targetContent.classList.contains("hidden");

      document.querySelectorAll(".roadmap-content").forEach(content => {
        content.classList.add("hidden");
      });
      document.querySelectorAll(".roadmap-arrow").forEach(arrow => {
        arrow.style.transform = "rotate(0deg)";
      });

      if (!isCurrentlyOpen) {
        targetContent.classList.remove("hidden");
        if (targetArrow) targetArrow.style.transform = "rotate(180deg)";
      }
    });
  });

});
