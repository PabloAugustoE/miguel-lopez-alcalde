document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
     1. MENÚ DESPLEGABLE "SÚMATE"
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
  }

  /* ==========================================
     2. EFECTO TYPEWRITER EN HERO
     ========================================== */
  const words = ["Próspero", "Seguro", "Productivo", "Solidario", "Moderno"];
  let i = 0;
  let timer;
  const typewriterSpan = document.getElementById("typewriter-word");

  function typingEffect() {
    if (!typewriterSpan) return;
    let word = words[i].split("");
    let loopTyping = function () {
      if (word.length > 0) {
        typewriterSpan.innerHTML += word.shift();
      } else {
        setTimeout(deletingEffect, 2000);
        return;
      }
      timer = setTimeout(loopTyping, 120);
    };
    loopTyping();
  }

  function deletingEffect() {
    if (!typewriterSpan) return;
    let word = words[i].split("");
    let loopDeleting = function () {
      if (word.length > 0) {
        word.pop();
        typewriterSpan.innerHTML = word.join("");
      } else {
        i = (i + 1) % words.length;
        setTimeout(typingEffect, 500);
        return;
      }
      timer = setTimeout(loopDeleting, 60);
    };
    loopDeleting();
  }
  typingEffect();

  /* ==========================================
     3. VIDEO INTERACTIVO "¿QUIÉN ES?"
     ========================================== */
  const videoQuienSoy = document.getElementById("videoQuienSoy");
  const btnPlayQuienSoy = document.getElementById("btnPlayQuienSoy");
  const containerPlayBtn = document.getElementById("containerPlayBtn");
  const videoPosterOverlay = document.getElementById("videoPosterOverlay");
  const btnTogglePlay = document.getElementById("btnTogglePlay");
  const videoSeekBar = document.getElementById("videoSeekBar");
  const currentTimeDisplay = document.getElementById("currentTimeDisplay");
  const durationDisplay = document.getElementById("durationDisplay");
  const btnFullscreen = document.getElementById("btnFullscreen");

  function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  if (videoQuienSoy) {
    const startPlayingVideo = () => {
      if (videoPosterOverlay) videoPosterOverlay.style.opacity = "0";
      if (containerPlayBtn) containerPlayBtn.style.display = "none";
      setTimeout(() => {
        if (videoPosterOverlay) videoPosterOverlay.style.display = "none";
      }, 500);
      videoQuienSoy.play();
      if (btnTogglePlay) btnTogglePlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
    };

    if (btnPlayQuienSoy) btnPlayQuienSoy.addEventListener("click", startPlayingVideo);
    if (containerPlayBtn) containerPlayBtn.addEventListener("click", startPlayingVideo);
    videoQuienSoy.addEventListener("click", () => {
      if (videoQuienSoy.paused) {
        startPlayingVideo();
      } else {
        videoQuienSoy.pause();
        if (btnTogglePlay) btnTogglePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
        if (containerPlayBtn) containerPlayBtn.style.display = "flex";
      }
    });

    if (btnTogglePlay) {
      btnTogglePlay.addEventListener("click", () => {
        if (videoQuienSoy.paused) {
          videoQuienSoy.play();
          btnTogglePlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
          if (containerPlayBtn) containerPlayBtn.style.display = "none";
          if (videoPosterOverlay) {
            videoPosterOverlay.style.opacity = "0";
            setTimeout(() => (videoPosterOverlay.style.display = "none"), 500);
          }
        } else {
          videoQuienSoy.pause();
          btnTogglePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
      });
    }

    videoQuienSoy.addEventListener("loadedmetadata", () => {
      if (durationDisplay) durationDisplay.textContent = formatTime(videoQuienSoy.duration);
    });

    videoQuienSoy.addEventListener("timeupdate", () => {
      if (currentTimeDisplay) currentTimeDisplay.textContent = formatTime(videoQuienSoy.currentTime);
      if (videoSeekBar && videoQuienSoy.duration) {
        let percent = (videoQuienSoy.currentTime / videoQuienSoy.duration) * 100;
        videoSeekBar.value = percent;
      }
    });

    if (videoSeekBar) {
      videoSeekBar.addEventListener("input", () => {
        if (videoQuienSoy.duration) {
          let time = (videoSeekBar.value / 100) * videoQuienSoy.duration;
          videoQuienSoy.currentTime = time;
        }
      });
    }

    if (btnFullscreen) {
      btnFullscreen.addEventListener("click", () => {
        if (videoQuienSoy.requestFullscreen) {
          videoQuienSoy.requestFullscreen();
        } else if (videoQuienSoy.webkitRequestFullscreen) {
          videoQuienSoy.webkitRequestFullscreen();
        } else if (videoQuienSoy.msRequestFullscreen) {
          videoQuienSoy.msRequestFullscreen();
        }
      });
    }
  }

  /* ==========================================
     4. TIPEO INDEPENDIENTE DE PÁRRAFOS
     ========================================== */
  const typingParagraphs = document.querySelectorAll(".typing-paragraph");
  let animatedParagraphs = new Set();

  function typeParagraph(element) {
    if (!element || animatedParagraphs.has(element)) return;
    animatedParagraphs.add(element);

    let text = element.getAttribute("data-text");
    if (!text) return;
    element.textContent = "";
    let idx = 0;

    function addChar() {
      if (idx < text.length) {
        element.textContent += text.charAt(idx);
        idx++;
        setTimeout(addChar, 18);
      }
    }
    addChar();
  }

  const observerParagraphs = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        typeParagraph(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  typingParagraphs.forEach((p) => observerParagraphs.observe(p));

  /* ==========================================
     5. SIMULADOR DE PAPELETA OFICIAL
     ========================================== */
  const casillaVoto = document.getElementById("casillaVoto");
  const svgTrazo = document.getElementById("svgTrazo");
  const textoRayar = document.getElementById("textoRayar");
  const mensajeVotoConfirmado = document.getElementById("mensajeVotoConfirmado");
  let votoRegistrado = false;

  if (casillaVoto) {
    casillaVoto.addEventListener("click", () => {
      votoRegistrado = !votoRegistrado;
      if (votoRegistrado) {
        if (svgTrazo) svgTrazo.classList.remove("hidden");
        if (textoRayar) textoRayar.style.opacity = "0.2";
        casillaVoto.classList.add("ring-4", "ring-red-500", "bg-red-50");
        if (mensajeVotoConfirmado) {
          mensajeVotoConfirmado.classList.remove("hidden");
          mensajeVotoConfirmado.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      } else {
        if (svgTrazo) svgTrazo.classList.add("hidden");
        if (textoRayar) textoRayar.style.opacity = "1";
        casillaVoto.classList.remove("ring-4", "ring-red-500", "bg-red-50");
        if (mensajeVotoConfirmado) mensajeVotoConfirmado.classList.add("hidden");
      }
    });
  }

  /* ==========================================
     6. CARRUSEL DE NOVEDADES Y CAMBIO DE FONDO
     ========================================== */
  const carruselTrackNovedades = document.getElementById("carruselTrackNovedades");
  const btnPrevNovedades = document.getElementById("btnPrevNovedades");
  const btnNextNovedades = document.getElementById("btnNextNovedades");
  const currentIndexNovedades = document.getElementById("currentIndexNovedades");
  const totalIndexNovedades = document.getElementById("totalIndexNovedades");
  const noticiaCards = document.querySelectorAll(".noticia-card");

  if (carruselTrackNovedades && noticiaCards.length > 0) {
    if (totalIndexNovedades) totalIndexNovedades.textContent = noticiaCards.length;
    let cardWidth = noticiaCards[0].offsetWidth + 16; // ancho + gap

    if (btnNextNovedades) {
      btnNextNovedades.addEventListener("click", () => {
        carruselTrackNovedades.scrollBy({ left: cardWidth, behavior: "smooth" });
      });
    }

    if (btnPrevNovedades) {
      btnPrevNovedades.addEventListener("click", () => {
        carruselTrackNovedades.scrollBy({ left: -cardWidth, behavior: "smooth" });
      });
    }

    carruselTrackNovedades.addEventListener("scroll", () => {
      let scrollLeft = carruselTrackNovedades.scrollLeft;
      let index = Math.round(scrollLeft / cardWidth) + 1;
      if (index < 1) index = 1;
      if (index > noticiaCards.length) index = noticiaCards.length;
      if (currentIndexNovedades) currentIndexNovedades.textContent = index;
    });

    // Cambio dinámico de fondo de tarjeta al hacer hover
    noticiaCards.forEach((card) => {
      let hoverImg = card.getAttribute("data-hover-img");
      let defaultImg = card.getAttribute("data-default-img");

      card.addEventListener("mouseenter", () => {
        if (hoverImg) card.style.backgroundImage = `url('${hoverImg}')`;
      });
      card.addEventListener("mouseleave", () => {
        if (defaultImg) card.style.backgroundImage = `url('${defaultImg}')`;
      });
    });
  }

  /* ==========================================
     7. COVERFLOW 3D DE PROPUESTAS
     ========================================== */
  const coverflowCards = document.querySelectorAll(".coverflow-card");
  const prevCoverflow = document.getElementById("prevCoverflow");
  const nextCoverflow = document.getElementById("nextCoverflow");
  let activeCoverflowIndex = 0;

  function updateCoverflow() {
    if (coverflowCards.length === 0) return;
    coverflowCards.forEach((card, index) => {
      let offset = index - activeCoverflowIndex;
      // Ajuste circular si se desea
      if (offset < -2) offset += coverflowCards.length;
      if (offset > 2) offset -= coverflowCards.length;

      card.classList.remove("active", "prev", "next", "hidden-card");

      if (offset === 0) {
        card.classList.add("active");
        card.style.transform = "translateX(0px) translateZ(0px) rotateY(0deg) scale(1)";
        card.style.zIndex = "30";
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
      } else if (offset === -1 || (activeCoverflowIndex === 0 && index === coverflowCards.length - 1)) {
        card.classList.add("prev");
        card.style.transform = "translateX(-180px) translateZ(-150px) rotateY(25deg) scale(0.85)";
        card.style.zIndex = "20";
        card.style.opacity = "0.7";
        card.style.pointerEvents = "auto";
      } else if (offset === 1 || (activeCoverflowIndex === coverflowCards.length - 1 && index === 0)) {
        card.classList.add("next");
        card.style.transform = "translateX(180px) translateZ(-150px) rotateY(-25deg) scale(0.85)";
        card.style.zIndex = "20";
        card.style.opacity = "0.7";
        card.style.pointerEvents = "auto";
      } else {
        card.classList.add("hidden-card");
        card.style.transform = "translateX(0px) translateZ(-300px) scale(0.6)";
        card.style.zIndex = "10";
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
      }
    });
  }

  if (coverflowCards.length > 0) {
    updateCoverflow();

    if (nextCoverflow) {
      nextCoverflow.addEventListener("click", () => {
        activeCoverflowIndex = (activeCoverflowIndex + 1) % coverflowCards.length;
        updateCoverflow();
      });
    }

    if (prevCoverflow) {
      prevCoverflow.addEventListener("click", () => {
        activeCoverflowIndex = (activeCoverflowIndex - 1 + coverflowCards.length) % coverflowCards.length;
        updateCoverflow();
      });
    }

    coverflowCards.forEach((card, idx) => {
      card.addEventListener("click", (e) => {
        if (activeCoverflowIndex !== idx) {
          e.preventDefault();
          activeCoverflowIndex = idx;
          updateCoverflow();
        }
      });
    });
  }

  /* ==========================================
     8. SLIDER DE RECURSOS Y MAQUINARIA
     ========================================== */
  const resourceSlides = document.querySelectorAll(".resource-slide");
  const prevResource = document.getElementById("prevResource");
  const nextResource = document.getElementById("nextResource");
  const resDots = document.querySelectorAll(".res-dot");
  let currentResIndex = 0;

  function showResourceSlide(index) {
    if (resourceSlides.length === 0) return;
    resourceSlides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.remove("hidden");
      } else {
        slide.classList.add("hidden");
      }
    });

    resDots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.remove("bg-slate-300", "w-1.5");
        dot.classList.add("bg-tambo-red", "w-5");
      } else {
        dot.classList.remove("bg-tambo-red", "w-5");
        dot.classList.add("bg-slate-300", "w-1.5");
      }
    });
    currentResIndex = index;
  }

  if (resourceSlides.length > 0) {
    if (nextResource) {
      nextResource.addEventListener("click", () => {
        let nextIdx = (currentResIndex + 1) % resourceSlides.length;
        showResourceSlide(nextIdx);
      });
    }

    if (prevResource) {
      prevResource.addEventListener("click", () => {
        let prevIdx = (currentResIndex - 1 + resourceSlides.length) % resourceSlides.length;
        showResourceSlide(prevIdx);
      });
    }

    resDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        let idx = parseInt(dot.getAttribute("data-res-idx"));
        showResourceSlide(idx);
      });
    });
  }

  /* ==========================================
     9. ROADMAP TÁCTIL INTERACTIVO
     ========================================== */
  const hitoButtons = document.querySelectorAll(".btn-hito");
  const btnToggleAllRoadmap = document.getElementById("btnToggleAllRoadmap");
  let allRoadmapOpen = false;

  hitoButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      let targetId = btn.getAttribute("data-target");
      let detailsDiv = document.getElementById(targetId);
      if (detailsDiv) {
        detailsDiv.classList.toggle("hidden");
      }
    });
  });

  if (btnToggleAllRoadmap) {
    btnToggleAllRoadmap.addEventListener("click", () => {
      allRoadmapOpen = !allRoadmapOpen;
      const allDetails = document.querySelectorAll(".info-desplegable");
      allDetails.forEach((div) => {
        if (allRoadmapOpen) {
          div.classList.remove("hidden");
        } else {
          div.classList.add("hidden");
        }
      });
    });
  }
});
