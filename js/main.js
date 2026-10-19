/* ==========================================================================
   INTERACTIVIDAD PARA ROADMAP Y LÁPIZ ÓPTICO / STYLUS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const roadmapNodes = document.querySelectorAll('.roadmap-node');

  roadmapNodes.forEach(node => {
    // Escucha eventos de clic, toque móvil o interacción con lápiz óptico (pointerdown)
    node.addEventListener('pointerdown', (e) => {
      // Alternar estado activo en la tarjeta tocada
      const details = node.querySelector('.phase-details');
      const indicator = node.querySelector('.stylus-indicator');
      
      const isActive = node.classList.toggle('active-stylus');
      
      if (isActive) {
        details.classList.remove('hidden');
        indicator.innerHTML = '<i class="fa-solid fa-check text-green-600 mr-1"></i> Seleccionado';
        indicator.classList.add('bg-green-100', 'text-green-700', 'border-green-300');
      } else {
        details.classList.add('hidden');
        indicator.innerHTML = '<i class="fa-solid fa-pen-pointer mr-1"></i> Toca / Usa Stylus';
        indicator.classList.remove('bg-green-100', 'text-green-700', 'border-green-300');
      }
    });
  });

  console.log("Roadmap interactivo optimizado para stylus iniciado correctamente.");
});
