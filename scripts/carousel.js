(function() {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  const dotsWrap = document.querySelector('.carousel-dots');
  if (!track) return;

  const imagePaths = [
    'imag/制作社交媒体封面.png',
    'imag/制作社交媒体封面 (1).png',
    'imag/制作社交媒体封面 (2).png',
    'imag/制作社交媒体封面 (3).png',
  ];

  const slides = [];
  imagePaths.forEach((src, idx) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.setAttribute('role', 'listitem');
    slide.setAttribute('aria-roledescription', '幻灯片');
    slide.setAttribute('aria-label', `第 ${idx + 1} 张，共 ${imagePaths.length} 张`);

    const img = document.createElement('img');
    img.src = src;
    img.alt = `轮播图片 ${idx + 1}`;
    if (idx > 0) img.loading = 'lazy';
    slide.appendChild(img);
    track.appendChild(slide);
    slides.push(slide);

    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-controls', `slide-${idx}`);
    dot.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goTo(idx, true));
    dotsWrap.appendChild(dot);
  });

  let current = 0;
  let autoplayTimer = null;
  let userPausedUntil = 0;

  function update() {
    track.style.transform = `translateX(-${current * 100}%)`;
    const dots = dotsWrap.querySelectorAll('.carousel-dot');
    dots.forEach((d, i) => d.setAttribute('aria-selected', i === current ? 'true' : 'false'));
  }

  function goTo(index, user = false) {
    const total = slides.length;
    current = (index + total) % total;
    update();
    if (user) userPausedUntil = Date.now() + 10000; // pause 10s on user interaction
  }

  function next() { goTo(current + 1, true); }
  function prev() { goTo(current - 1, true); }

  nextBtn && nextBtn.addEventListener('click', next);
  prevBtn && prevBtn.addEventListener('click', prev);

  // Keyboard navigation
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
  track.tabIndex = 0;

  // Touch support (basic)
  let startX = 0; let dx = 0; let dragging = false;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; dragging = true; dx = 0;
  }, { passive: true });
  track.addEventListener('touchmove', (e) => {
    if (!dragging) return; dx = e.touches[0].clientX - startX;
  }, { passive: true });
  track.addEventListener('touchend', () => {
    dragging = false;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
  });

  // Autoplay
  function tick() {
    const now = Date.now();
    if (now >= userPausedUntil) { goTo(current + 1, false); }
    autoplayTimer = setTimeout(tick, 4500);
  }
  autoplayTimer = setTimeout(tick, 4500);

  update();
})();


