/* ==========================================================================
   INKINDO YOGYAKARTA - PORTAL RESMI INTERACTIVE JAVASCRIPT
   Handles: Nav Scrollspy, Mobile Menu, Gallery Filter, Live Search & Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Standarkan and render single global shared footer
  renderSharedFooter();

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Setup Scrollspy & Sticky Header Effects
  setupScrollspy();

  // Initialize Desktop Dropdown Hover Grace
  setupDropdownHoverGrace();

  // Initialize Hero Carousel Slider
  initHeroSlider();

  // Initialize Partners Multi-Row Slider
  initPartnersSlider();
});

/* --------------------------------------------------------------------------
   0. SINGLE GLOBAL SHARED FOOTER COMPONENT
   Guarantees 100% uniformity, compact styling, and identical layout
   -------------------------------------------------------------------------- */
function renderSharedFooter() {
  const footerMarkup = `
    <div class="container">
      <div class="footer-grid">
        
        <!-- Kolom 1 (Kiri): Logo INKINDO Yogyakarta & Deskripsi Singkat Organisasi -->
        <div class="footer-col-left">
          <div class="footer-brand">
            <div class="footer-logo-emblem">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <div>
              <span class="footer-brand-title">INKINDO YOGYAKARTA</span>
              <span class="footer-brand-sub">IKATAN NASIONAL KONSULTAN INDONESIA</span>
            </div>
          </div>

          <p class="footer-desc">
            Ikatan Nasional Konsultan Indonesia (INKINDO) D.I. Yogyakarta adalah asosiasi perusahaan jasa konsultansi independen yang berdiri sejak 20 Juni 1979. Wadah perjuangan dan pemberdayaan 214 perusahaan konsultan anggota di Daerah Istimewa Yogyakarta.
          </p>
        </div>

        <!-- Kolom 2 (Tengah): KONTAK -->
        <div class="footer-col-center">
          <h4 class="footer-heading">KONTAK</h4>
          <ul class="footer-contact-list">
            <li>
              <i data-lucide="mail" class="contact-ic"></i>
              <div>
                <strong>Email:</strong>
                <p>inkindo@inkindo.org</p>
              </div>
            </li>
            <li>
              <i data-lucide="phone" class="contact-ic"></i>
              <div>
                <strong>Telepon:</strong>
                <p>081315289207</p>
              </div>
            </li>
            <li>
              <i data-lucide="map-pin" class="contact-ic"></i>
              <div>
                <strong>Alamat:</strong>
                <p>Jl. Godean KM. 5 Nogosaren Baru No. 32, Banyuraden, Gamping, Sleman, Yogyakarta 55293</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Kolom 3 (Kanan): SOSIAL MEDIA (COMPACT STYLING) -->
        <div class="footer-col-right">
          <h4 class="footer-heading">SOSIAL MEDIA</h4>
          <p class="footer-social-intro">Ikuti dan terhubung dengan Sekretariat INKINDO D.I. Yogyakarta di saluran resmi media sosial:</p>
          <div class="footer-social-buttons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-icon-badge fb-social" aria-label="Facebook">
              <i class="fa-brands fa-facebook-f social-brand-icon"></i>
              <span>Facebook</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon-badge ig-social" aria-label="Instagram">
              <i class="fa-brands fa-instagram social-brand-icon"></i>
              <span>Instagram</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="social-icon-badge tw-social" aria-label="Twitter">
              <span class="social-brand-icon">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </span>
              <span>Twitter</span>
            </a>
            <a href="https://wa.me/6281315289207" target="_blank" rel="noopener noreferrer" class="social-icon-badge wa-social" aria-label="WhatsApp">
              <i class="fa-brands fa-whatsapp social-brand-icon"></i>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

      <!-- Bottom Bar: Copyright Bar -->
      <div class="footer-bottom-bar">
        <p>&copy; 2026 INKINDO YOGYAKARTA – All Right Reserved</p>
      </div>
    </div>
  `;

  // Update seluruh footer yang ada di halaman
  const existingFooters = document.querySelectorAll('footer, .main-footer, .deep-blue-footer');
  if (existingFooters.length > 0) {
    existingFooters.forEach(f => {
      f.className = 'deep-blue-footer';
      f.innerHTML = footerMarkup;
    });
  }

  // Bersihkan floating button atau elemen nyasar di atas/bawah footer
  const strayElements = document.querySelectorAll('.floating-whatsapp-wrap, .btn-floating-wa, .whatsapp-floating, .floating-wa, a.wa');
  strayElements.forEach(el => el.remove());
}

/* --------------------------------------------------------------------------
   0. DESKTOP DROPDOWN HOVER GRACE (Anti-Flicker & Smooth Transition)
   -------------------------------------------------------------------------- */
function setupDropdownHoverGrace() {
  const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
  
  dropdownItems.forEach(item => {
    let leaveTimer = null;
    
    // Saat kursor masuk ke tombol atau menu dropdown
    const handleEnter = () => {
      if (leaveTimer) {
        clearTimeout(leaveTimer);
        leaveTimer = null;
      }
      item.classList.add('is-open');
    };
    
    // Saat kursor keluar, berikan jeda grace period 180ms sebelum menutup
    const handleLeave = () => {
      leaveTimer = setTimeout(() => {
        item.classList.remove('is-open');
      }, 180);
    };

    item.addEventListener('mouseenter', handleEnter);
    item.addEventListener('mouseleave', handleLeave);
  });
}


/* --------------------------------------------------------------------------
   0. HERO BACKGROUND CAROUSEL SLIDER
   -------------------------------------------------------------------------- */
let currentHeroSlide = 0;
let heroSlideTimer = null;
const heroSlideInterval = 5000; // 5 seconds per slide

function initHeroSlider() {
  const track = document.getElementById('heroCarouselTrack');
  const card = document.getElementById('heroCarouselCard');
  if (!track || !card) return;

  const slides = track.querySelectorAll('.hero-carousel-slide');
  if (!slides || slides.length === 0) return;

  // Initialize UI for slide 0
  updateHeroSlideUI(0);

  // Start auto-play
  startHeroSlideTimer();

  // Pause on hover over card
  card.addEventListener('mouseenter', () => stopHeroSlideTimer());
  card.addEventListener('mouseleave', () => startHeroSlideTimer());
}

function updateHeroSlideUI(index) {
  const track = document.getElementById('heroCarouselTrack');
  const dots = document.querySelectorAll('.hero-indicator-dot');
  if (!track) return;

  const slides = track.querySelectorAll('.hero-carousel-slide');
  if (!slides || slides.length === 0) return;

  if (index >= slides.length) {
    currentHeroSlide = 0;
  } else if (index < 0) {
    currentHeroSlide = slides.length - 1;
  } else {
    currentHeroSlide = index;
  }

  // Slide track horizontally via CSS transform
  track.style.transform = `translateX(-${currentHeroSlide * 100}%)`;

  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentHeroSlide);
  });

  // Update active slide class
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentHeroSlide);
  });

  // Dynamic caption update
  const activeSlide = slides[currentHeroSlide];
  const title = activeSlide.getAttribute('data-title') || 'Dewan Pengurus DPP INKINDO D.I. Yogyakarta';
  const sub = activeSlide.getAttribute('data-sub') || 'Masa Bakti 2022–2026';
  const icon = activeSlide.getAttribute('data-icon') || 'award';

  const captionEl = document.getElementById('heroDynamicCaption');
  const titleEl = document.getElementById('heroCaptionTitle');
  const subEl = document.getElementById('heroCaptionSub');
  const iconEl = document.getElementById('heroCaptionIcon');

  if (captionEl && titleEl && subEl) {
    captionEl.classList.add('fade-out');
    setTimeout(() => {
      titleEl.textContent = title;
      subEl.textContent = sub;
      if (iconEl) {
        iconEl.innerHTML = `<i data-lucide="${icon}" size="18"></i>`;
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }
      captionEl.classList.remove('fade-out');
    }, 150);
  }
}

function nextHeroSlide() {
  updateHeroSlideUI(currentHeroSlide + 1);
  restartHeroSlideTimer();
}

function prevHeroSlide() {
  updateHeroSlideUI(currentHeroSlide - 1);
  restartHeroSlideTimer();
}

function goToHeroSlide(index) {
  updateHeroSlideUI(index);
  restartHeroSlideTimer();
}

function startHeroSlideTimer() {
  stopHeroSlideTimer();
  heroSlideTimer = setInterval(() => {
    updateHeroSlideUI(currentHeroSlide + 1);
  }, heroSlideInterval);
}

function stopHeroSlideTimer() {
  if (heroSlideTimer) {
    clearInterval(heroSlideTimer);
    heroSlideTimer = null;
  }
}

function restartHeroSlideTimer() {
  stopHeroSlideTimer();
  startHeroSlideTimer();
}


/* --------------------------------------------------------------------------
   1. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function toggleMobileMenu() {
  const dropdown = document.getElementById('mobileNavDropdown');
  const icon = document.getElementById('menuIcon');
  if (!dropdown) return;
  
  dropdown.classList.toggle('active');
  const isOpen = dropdown.classList.contains('active');

  if (icon) {
    icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

function closeMobileMenu() {
  const dropdown = document.getElementById('mobileNavDropdown');
  const icon = document.getElementById('menuIcon');
  if (dropdown) {
    dropdown.classList.remove('active');
  }
  if (icon) {
    icon.setAttribute('data-lucide', 'menu');
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}


/* --------------------------------------------------------------------------
   2. GALLERY FILTER TABS & CAROUSEL SLIDER
   -------------------------------------------------------------------------- */
function filterGallery(category, event) {
  // Update active state pada tombol filter
  const tabs = document.querySelectorAll('.gallery-filter-tabs .filter-tab');
  tabs.forEach(tab => tab.classList.remove('active'));

  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  // Normalisasi kategori target
  const targetCategory = category.toLowerCase().trim();

  // Ambil semua kartu galeri
  const cards = document.querySelectorAll('.gallery-card');
  let visibleCount = 0;

  cards.forEach(card => {
    // Ambil array kategori dari data-categories atau parse fallback dari data-category
    let categories = [];
    const rawCategoriesJson = card.getAttribute('data-categories');
    if (rawCategoriesJson) {
      try {
        categories = JSON.parse(rawCategoriesJson).map(c => c.toLowerCase().trim());
      } catch (e) {
        categories = [];
      }
    }

    if (categories.length === 0) {
      // Fallback pemisah jika data-categories belum ada
      const rawCat = (card.getAttribute('data-category') || '').toLowerCase();
      categories = rawCat.split(/\s+/).filter(Boolean);
    }

    // Evaluasi kecocokan kategori
    let isMatch = false;
    if (targetCategory === 'all' || targetCategory === 'semua') {
      isMatch = true;
    } else if (targetCategory === 'non-konstruksi' || targetCategory === 'non-kontruksi') {
      isMatch = categories.some(c => c === 'non-kontruksi' || c === 'non-konstruksi');
    } else if (targetCategory === 'konstruksi' || targetCategory === 'kontruksi') {
      // Hanya match jika memiliki tag Kontruksi/Konstruksi, dan TIDAK berstatus Non-Kontruksi
      const hasNon = categories.some(c => c === 'non-kontruksi' || c === 'non-konstruksi');
      const hasKonstruksi = categories.some(c => c === 'kontruksi' || c === 'konstruksi');
      isMatch = hasKonstruksi && !hasNon;
    } else if (targetCategory === 'forum') {
      isMatch = categories.some(c => c === 'forum');
    }

    if (isMatch) {
      card.classList.remove('hidden');
      card.style.setProperty('display', 'flex', 'important');
      visibleCount++;
    } else {
      card.classList.add('hidden');
      card.style.setProperty('display', 'none', 'important');
    }
  });

  // Atur ulang posisi carousel ke slide awal (index 0 / scrollLeft 0)
  const viewport = document.getElementById('galleryViewport');
  if (viewport) {
    viewport.scrollTo({ left: 0, behavior: 'smooth' });
  }

  // Perbarui status tombol navigasi panah
  setTimeout(updateGalleryNavButtons, 200);
}

function slideGallery(direction) {
  const viewport = document.getElementById('galleryViewport');
  if (!viewport) return;

  // Ukuran scroll per klik: lebar 1 kartu + gap (~384px)
  const scrollAmount = 384 * direction;
  viewport.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  setTimeout(updateGalleryNavButtons, 350);
}

function updateGalleryNavButtons() {
  const viewport = document.getElementById('galleryViewport');
  const prevBtn = document.getElementById('galleryPrevBtn');
  const nextBtn = document.getElementById('galleryNextBtn');
  if (!viewport || !prevBtn || !nextBtn) return;

  const maxScroll = viewport.scrollWidth - viewport.clientWidth;
  const isAtStart = viewport.scrollLeft <= 5;
  const isAtEnd = viewport.scrollLeft >= maxScroll - 5;

  prevBtn.disabled = isAtStart;
  nextBtn.disabled = isAtEnd;

  if (isAtStart) {
    prevBtn.classList.add('nav-disabled');
  } else {
    prevBtn.classList.remove('nav-disabled');
  }

  if (isAtEnd) {
    nextBtn.classList.add('nav-disabled');
  } else {
    nextBtn.classList.remove('nav-disabled');
  }
}

// Inisialisasi drag-to-scroll & listener viewport
document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.getElementById('galleryViewport');
  if (!viewport) return;

  viewport.addEventListener('scroll', updateGalleryNavButtons);

  // Mouse Drag to Scroll
  let isDown = false;
  let startX, scrollLeft;

  viewport.addEventListener('mousedown', (e) => {
    isDown = true;
    viewport.style.cursor = 'grabbing';
    startX = e.pageX - viewport.offsetLeft;
    scrollLeft = viewport.scrollLeft;
  });

  viewport.addEventListener('mouseleave', () => {
    isDown = false;
    viewport.style.cursor = 'grab';
  });

  viewport.addEventListener('mouseup', () => {
    isDown = false;
    viewport.style.cursor = 'grab';
  });

  viewport.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    const walk = (x - startX) * 1.5;
    viewport.scrollLeft = scrollLeft - walk;
  });

  updateGalleryNavButtons();
});

/* --------------------------------------------------------------------------
   2.1 PARTNERS MULTI-ROW SLIDER (2-ROW HORIZONTAL CAROUSEL)
   -------------------------------------------------------------------------- */
function slidePartners(direction) {
  const viewport = document.getElementById('partnersViewport');
  if (!viewport) return;

  // Calculate smooth scroll amount: ~2 card columns
  const card = viewport.querySelector('.partner-item-card');
  const cardWidth = card ? card.offsetWidth + 16 : 231;
  const scrollAmount = cardWidth * 2 * direction;

  viewport.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  setTimeout(updatePartnersNavButtons, 350);
}

function updatePartnersNavButtons() {
  const viewport = document.getElementById('partnersViewport');
  const prevBtn = document.getElementById('partnersPrevBtn');
  const nextBtn = document.getElementById('partnersNextBtn');
  if (!viewport || !prevBtn || !nextBtn) return;

  const maxScroll = viewport.scrollWidth - viewport.clientWidth;
  const isAtStart = viewport.scrollLeft <= 5;
  const isAtEnd = viewport.scrollLeft >= maxScroll - 5;

  prevBtn.disabled = isAtStart;
  nextBtn.disabled = isAtEnd;

  if (isAtStart) {
    prevBtn.classList.add('nav-disabled');
  } else {
    prevBtn.classList.remove('nav-disabled');
  }

  if (isAtEnd) {
    nextBtn.classList.add('nav-disabled');
  } else {
    nextBtn.classList.remove('nav-disabled');
  }
}

function initPartnersSlider() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  const viewport = document.getElementById('partnersViewport');
  if (!viewport) return;

  viewport.addEventListener('scroll', updatePartnersNavButtons, { passive: true });

  // Mouse Drag to Scroll
  let isDown = false;
  let startX, scrollLeft;

  viewport.addEventListener('mousedown', (e) => {
    isDown = true;
    viewport.style.cursor = 'grabbing';
    startX = e.pageX - viewport.offsetLeft;
    scrollLeft = viewport.scrollLeft;
  });

  viewport.addEventListener('mouseleave', () => {
    isDown = false;
    viewport.style.cursor = 'grab';
  });

  viewport.addEventListener('mouseup', () => {
    isDown = false;
    viewport.style.cursor = 'grab';
  });

  viewport.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    const walk = (x - startX) * 1.5;
    viewport.scrollLeft = scrollLeft - walk;
  });

  updatePartnersNavButtons();
  window.addEventListener('resize', updatePartnersNavButtons);
}

/* --------------------------------------------------------------------------
   3. MEMBER DIRECTORY LIVE SEARCH
   -------------------------------------------------------------------------- */
function filterMemberDirectory() {
  const input = document.getElementById('memberSearchInput');
  if (!input) return;
  const query = input.value.toLowerCase().trim();

  const cards = document.querySelectorAll('.member-card');
  cards.forEach(card => {
    const name = card.querySelector('.member-name')?.textContent.toLowerCase() || '';
    const kta = card.querySelector('.member-kta')?.textContent.toLowerCase() || '';
    const details = card.querySelector('.member-details')?.textContent.toLowerCase() || '';

    if (name.includes(query) || kta.includes(query) || details.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}


/* --------------------------------------------------------------------------
   4. REGULATION SEARCH, CATEGORY FILTERING & PAGINATION (MAX 5 PER PAGE)
   -------------------------------------------------------------------------- */
let activeRegCategory = 'all';
let currentRegPage = 1;
const regItemsPerPage = 5;

function filterRegCategory(catKey, event) {
  activeRegCategory = catKey;
  currentRegPage = 1; // Reset to first page on category change

  const tabs = document.querySelectorAll('#regCategoryTabs .reg-tab');
  tabs.forEach(t => t.classList.remove('active'));

  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  applyRegulationFilters();
}

function filterRegulations() {
  currentRegPage = 1; // Reset to first page on search input
  applyRegulationFilters();
}

function applyRegulationFilters() {
  const input = document.getElementById('regSearchInput');
  const query = input ? input.value.toLowerCase().trim() : '';

  const cards = Array.from(document.querySelectorAll('.reg-doc-card'));
  const matchedCards = [];

  // 1. Filter cards by Category & Search query
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-cat') || '';
    const keywords = card.getAttribute('data-keywords') || '';
    const title = card.querySelector('.reg-doc-title')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('.reg-doc-desc')?.textContent.toLowerCase() || '';

    const matchesCategory = (activeRegCategory === 'all' || cardCat === activeRegCategory);
    const matchesSearch = (!query || title.includes(query) || desc.includes(query) || keywords.includes(query));

    if (matchesCategory && matchesSearch) {
      matchedCards.push(card);
    } else {
      card.style.display = 'none';
    }
  });

  // 2. Empty state handling
  const emptyState = document.getElementById('regEmptyState');
  if (emptyState) {
    emptyState.style.display = (matchedCards.length === 0) ? 'flex' : 'none';
  }

  // 3. Paginate matched cards (Max 5 per page)
  const totalPages = Math.ceil(matchedCards.length / regItemsPerPage) || 1;
  if (currentRegPage > totalPages) currentRegPage = totalPages;

  const startIndex = (currentRegPage - 1) * regItemsPerPage;
  const endIndex = startIndex + regItemsPerPage;

  matchedCards.forEach((card, index) => {
    if (index >= startIndex && index < endIndex) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  // 4. Render Pagination Controls
  renderRegulationPagination(totalPages);
}

function renderRegulationPagination(totalPages) {
  const container = document.getElementById('regPagination');
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = `
      <button class="reg-page-btn active" disabled>1</button>
    `;
    return;
  }

  let html = '';

  // Prev Button
  html += `
    <button class="reg-page-btn" onclick="goToRegPage(${currentRegPage - 1})" ${currentRegPage === 1 ? 'disabled' : ''} aria-label="Halaman Sebelumnya">
      &lt;
    </button>
  `;

  // Page Numbers
  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button class="reg-page-btn ${i === currentRegPage ? 'active' : ''}" onclick="goToRegPage(${i})">
        ${i}
      </button>
    `;
  }

  // Next Button
  html += `
    <button class="reg-page-btn" onclick="goToRegPage(${currentRegPage + 1})" ${currentRegPage === totalPages ? 'disabled' : ''} aria-label="Halaman Berikutnya">
      &gt;
    </button>
  `;

  container.innerHTML = html;
}

function goToRegPage(pageNum) {
  currentRegPage = pageNum;
  applyRegulationFilters();

  // Scroll smoothly to top of regulation list if user scrolled down
  const listContainer = document.getElementById('regulationList');
  if (listContainer) {
    listContainer.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// VIEW ALL REGULATIONS ARCHIVE MODAL
function viewAllRegulationsModal() {
  const html = `
    <div>
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
        <span style="color:#0056B8; font-size:0.78rem; font-weight:800; letter-spacing:1px;">ARSIP RESMI DOKUMEN HUKUM</span>
      </div>
      <h3 class="modal-header-title" style="margin-bottom:8px;">Pusat Arsip Regulasi Jasa Konstruksi</h3>
      <p style="color:#64748B; font-size:0.88rem; line-height:1.5; margin-bottom:20px;">
        Seluruh peraturan perundang-undangan, petunjuk teknis LPJK, Surat Keputusan DPN INKINDO, dan regulasi PUPR dapat diakses secara transparan oleh seluruh anggota dan masyarakat jasa konstruksi.
      </p>

      <div style="max-height:360px; overflow-y:auto; display:flex; flex-direction:column; gap:10px; padding-right:4px;">
        <div style="padding:12px 14px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:0.88rem; color:#1E293B; display:block;">UU No. 2 Tahun 2017 tentang Jasa Konstruksi</strong>
            <span style="font-size:0.75rem; color:#64748B;">Official PUPR &bull; Tahun 2017</span>
          </div>
          <button class="btn btn-primary-blue" onclick="openDownloadModal('UU No. 2 Tahun 2017 tentang Jasa Konstruksi')" style="padding:6px 12px; font-size:0.78rem;">Unduh</button>
        </div>

        <div style="padding:12px 14px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:0.88rem; color:#1E293B; display:block;">Permen PUPR No. 8 Tahun 2023 (Billing Rate Remunerasi)</strong>
            <span style="font-size:0.75rem; color:#64748B;">KemenPUPR & DPN INKINDO &bull; Tahun 2023</span>
          </div>
          <button class="btn btn-primary-blue" onclick="openDownloadModal('Permen PUPR No. 8 Tahun 2023')" style="padding:6px 12px; font-size:0.78rem;">Unduh</button>
        </div>

        <div style="padding:12px 14px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:0.88rem; color:#1E293B; display:block;">Permen PUPR No. 6 Tahun 2021 (Standar Sertifikasi SBU)</strong>
            <span style="font-size:0.75rem; color:#64748B;">Standar SBU Jasa Konstruksi &bull; Tahun 2021</span>
          </div>
          <button class="btn btn-primary-blue" onclick="openDownloadModal('Permen PUPR No. 6 Tahun 2021')" style="padding:6px 12px; font-size:0.78rem;">Unduh</button>
        </div>

        <div style="padding:12px 14px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:0.88rem; color:#1E293B; display:block;">SK DPN INKINDO No. 12/SK/DPN/2024 (Kode Etik)</strong>
            <span style="font-size:0.75rem; color:#64748B;">Pedoman Etik Konsultan &bull; Tahun 2024</span>
          </div>
          <button class="btn btn-primary-blue" onclick="openDownloadModal('SK DPN INKINDO No. 12/SK/DPN/2024')" style="padding:6px 12px; font-size:0.78rem;">Unduh</button>
        </div>

        <div style="padding:12px 14px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:0.88rem; color:#1E293B; display:block;">Surat Edaran DPP INKINDO DIY (KTA Digital 2026)</strong>
            <span style="font-size:0.75rem; color:#64748B;">DPP INKINDO DIY &bull; Tahun 2026</span>
          </div>
          <button class="btn btn-primary-blue" onclick="openDownloadModal('SE DPP INKINDO DIY KTA Digital 2026')" style="padding:6px 12px; font-size:0.78rem;">Unduh</button>
        </div>

        <div style="padding:12px 14px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:0.88rem; color:#1E293B; display:block;">UU No. 11 Tahun 2020 tentang Cipta Kerja</strong>
            <span style="font-size:0.75rem; color:#64748B;">Klaster Jasa Konstruksi &bull; Tahun 2020</span>
          </div>
          <button class="btn btn-primary-blue" onclick="openDownloadModal('UU No. 11 Tahun 2020 Cipta Kerja')" style="padding:6px 12px; font-size:0.78rem;">Unduh</button>
        </div>
      </div>

      <div style="margin-top:20px; display:flex; gap:12px;">
        <button class="btn btn-primary-blue" onclick="closeGlobalModal()" style="flex:1;">Tutup Arsip</button>
      </div>
    </div>
  `;
  openGlobalModal(html);
}

// Inisialisasi awal pagination saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  applyRegulationFilters();
});



/* --------------------------------------------------------------------------
   5. SCROLLSPY & STICKY HEADER
   -------------------------------------------------------------------------- */
function setupScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}


/* --------------------------------------------------------------------------
   6. GLOBAL MODAL CONTROLLER
   -------------------------------------------------------------------------- */
function openGlobalModal(htmlContent) {
  const backdrop = document.getElementById('modalBackdrop');
  const body = document.getElementById('modalContentBody');
  if (!backdrop || !body) return;

  body.innerHTML = htmlContent;
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function closeGlobalModal(event) {
  if (event && event.stopPropagation) event.stopPropagation();
  const backdrop = document.getElementById('modalBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  const modalWin = document.querySelector('.modal-window');
  if (modalWin) {
    modalWin.style.maxWidth = '';
  }
}


/* --------------------------------------------------------------------------
   7. SPECIFIC MODAL TRIGGER FUNCTIONS
   -------------------------------------------------------------------------- */

// LOGIN MODAL (CTA)
function openLoginModal(e) {
  if (e) e.preventDefault();
  const html = `
    <div class="text-center" style="margin-bottom: 20px;">
      <div style="width:56px; height:56px; background:#EBF3FA; color:#0E5AA7; border-radius:14px; display:inline-flex; align-items:center; justify-content:center; margin-bottom:12px;">
        <i data-lucide="lock" size="28"></i>
      </div>
      <h3 class="modal-header-title">Portal KTA & Anggota INKINDO DIY</h3>
      <p style="color:#64748B; font-size:0.88rem;">Masuk dengan Nomor Kartu Tanda Anggota (KTA) & Sandi Badan Usaha</p>
    </div>

    <form onsubmit="handleLoginSubmit(event)" style="display:flex; flex-direction:column; gap:16px;">
      <div>
        <label style="display:block; font-size:0.84rem; font-weight:700; color:#0F172A; margin-bottom:6px;">Nomor Registrasi KTA INKINDO</label>
        <input type="text" placeholder="Contoh: 12044/P/0088.DIY" required style="width:100%; padding:10px 14px; border:1px solid #CBD5E1; border-radius:8px; font-size:0.9rem; outline:none; box-sizing:border-box;">
      </div>
      <div>
        <label style="display:block; font-size:0.84rem; font-weight:700; color:#0F172A; margin-bottom:6px;">Kata Sandi (Password)</label>
        <input type="password" placeholder="••••••••" required style="width:100%; padding:10px 14px; border:1px solid #CBD5E1; border-radius:8px; font-size:0.9rem; outline:none; box-sizing:border-box;">
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; color:#64748B; flex-wrap:wrap; gap:8px;">
        <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox"> Ingat saya</label>
        <a href="#" style="color:#0E5AA7; font-weight:700;" onclick="alert('Silakan hubungi Sekretariat DPP INKINDO DIY via WhatsApp (081315289207) untuk riset kata sandi.')">Lupa Password?</a>
      </div>
      <button type="submit" class="btn btn-primary-blue" style="width:100%; padding:12px; margin-top:8px;">
        <i data-lucide="log-in" size="18"></i> Masuk Ke Portal Anggota
      </button>
    </form>

    <div style="margin-top:20px; text-align:center; border-top:1px solid #E2E8F0; padding-top:16px; font-size:0.82rem; color:#64748B;">
      Belum terdaftar sebagai anggota? <a href="https://wa.me/6281315289207?text=Halo%20Sekretariat,%20saya%20ingin%20mendaftar%20KTA%20INKINDO%20DIY" target="_blank" style="color:#0E5AA7; font-weight:800;">Daftar Badan Usaha Baru</a>
    </div>
  `;
  openGlobalModal(html);
}

function handleLoginSubmit(e) {
  e.preventDefault();
  alert('🔑 [LOGIN SIMULASI SUCCESS]\n\nSelamat datang di Portal Anggota INKINDO DIY. Anda dapat mengunduh Rekomendasi SBU, melihat Billing Rate Tenaga Ahli, dan memperbarui profil perusahaan.');
  closeGlobalModal();
}


// PROFILE MODAL (ORGANISASI)
function openProfileModal(e) {
  if (e) e.preventDefault();
  const html = `
    <div>
      <span style="color:#00A651; font-size:0.78rem; font-weight:800; letter-spacing:1px;">PROFIL LENGKAP ASOSIASI</span>
      <h3 class="modal-header-title" style="margin-top:4px;">DPP INKINDO D.I. Yogyakarta</h3>
      
      <div style="line-height:1.65; color:#475569; font-size:0.92rem; display:flex; flex-direction:column; gap:12px; margin-bottom:20px;">
        <p><strong>Ikatan Nasional Konsultan Indonesia (INKINDO)</strong> didirikan pada 20 Juni 1979 sebagai penggabungan dari IKINDO (1970) dan PKI (1977). Berperan aktif mewadahi lebih dari 6.252 perusahaan konsultan nasional di 34 provinsi.</p>

        <p>Di wilayah DIY, <strong>DPP INKINDO D.I. Yogyakarta</strong> secara legal menaungi <strong>214 perusahaan konsultan anggota resmi</strong> yang terverifikasi memenuhi syarat legalitas Sertifikat Badan Usaha (SBU).</p>

        <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:16px; border-radius:12px;">
          <h4 style="color:#093E75; font-size:0.95rem; margin-bottom:8px;">Visi & Misi INKINDO DIY:</h4>
          <ul style="padding-left:20px; font-size:0.86rem; color:#334155; display:flex; flex-direction:column; gap:6px;">
            <li>Mewujudkan perusahaan jasa konsultansi Indonesia yang tangguh, profesional, dan berdaya saing global.</li>
            <li>Mengembangkan standar etika dan mutu keahlian profesi konsultan teknik, arsitektur, dan manajemen.</li>
            <li>Mendorong iklim usaha jasa konstruksi yang sehat dan memperjuangkan hak remunerasi minimal tenaga ahli.</li>
          </ul>
        </div>

        <div style="background:#EBF3FA; color:#0E5AA7; padding:12px 16px; border-radius:10px; font-size:0.85rem; font-weight:700;">
          <i data-lucide="map-pin" size="14"></i> Sekretariat: Jl. Godean KM 5, Sleman, Yogyakarta | Telepon: 081315289207
        </div>
      </div>

      <button class="btn btn-primary-blue" onclick="closeGlobalModal()" style="width:100%;">Tutup Informasi Profil</button>
    </div>
  `;
  openGlobalModal(html);
}


// GALLERY LIGHTBOX MODAL WITH LARGE PHOTO PREVIEW
function openGalleryModal(param1, param2, param3, param4) {
  let imgSrc = '';
  let title = '';
  let date = '';
  let desc = '';

  // Detect argument signatures:
  // Signature A: openGalleryModal(imgSrc, title, desc) (from galeri.html)
  // Signature B: openGalleryModal(title, date, desc, imgSrc) (from index.html)
  if (typeof param1 === 'string' && (param1.includes('/') || param1.includes('.png') || param1.includes('.jpg') || param1.includes('.webp'))) {
    imgSrc = param1;
    title = param2 || '';
    if (param4) {
      date = param3 || '';
      desc = param4 || '';
    } else {
      desc = param3 || '';
    }
  } else {
    title = param1 || '';
    date = param2 || '';
    desc = param3 || '';
    imgSrc = param4 || '';
  }

  // Fallback image mapping if imgSrc wasn't passed directly
  if (!imgSrc) {
    const t = (title || '').toLowerCase();
    if (t.includes('syawalan') || t.includes('billing rate')) {
      imgSrc = 'assets/images/hero_fora_inkindo_1789326178298.png';
    } else if (t.includes('musyawarah') || t.includes('bim') || t.includes('musprov')) {
      imgSrc = 'assets/images/hero_musprov_inkindo_1789326191573.png';
    } else if (t.includes('buka puasa') || t.includes('rapat')) {
      imgSrc = 'assets/images/inkindo_board_photo_1789326204881.png';
    } else if (t.includes('audiensi') || t.includes('kunjungan')) {
      imgSrc = 'assets/images/media__1789325946088.png';
    } else {
      imgSrc = 'assets/images/hero_fora_inkindo_1789326178298.png';
    }
  }

  const dateHtml = date ? `
    <div style="display:inline-flex; align-items:center; gap:6px; color:#64748B; font-size:0.82rem; font-weight:500; margin-bottom:14px;">
      <i data-lucide="calendar" size="14"></i> <span>Tanggal Acara: ${date}</span>
    </div>
  ` : '';

  const html = `
    <div class="gallery-modal-detail" style="text-align: left;">
      <div style="margin-bottom: 10px;">
        <span style="color:#0056B8; font-size:0.75rem; font-weight:800; letter-spacing:1px; text-transform:uppercase;">DOKUMENTASI KEGIATAN INKINDO DIY</span>
        <h3 class="modal-header-title" style="margin: 4px 0 6px 0; font-size: 1.25rem; font-weight: 700; color: #08162e; font-family: 'Poppins', sans-serif; line-height: 1.35;">${title}</h3>
        ${dateHtml}
      </div>

      <!-- Area Gambar Preview Utama Berukuran Besar (100% lebar, 280px-340px, object-fit: cover, border-radius: 8px) -->
      <div style="width: 100%; height: 320px; border-radius: 8px; overflow: hidden; margin-bottom: 16px; background: #F1F5F9; border: 1px solid #DCE7F2; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
        <img src="${imgSrc}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.src='assets/images/hero_fora_inkindo_1789326178298.png'">
      </div>

      <p style="color:#475569; font-size:0.88rem; line-height:1.6; margin-bottom:20px;">
        ${desc} Dokumentasi ini diterbitkan oleh Sekretariat DPP INKINDO D.I. Yogyakarta sebagai bagian dari transparansi dan arsip visual kegiatan organisasi.
      </p>

      <!-- Tombol Tutup Tunggal Berlatar Netral / Outline -->
      <div style="display: flex; justify-content: flex-end;">
        <button type="button" class="btn btn-secondary-light" onclick="closeGlobalModal()" style="padding: 9px 24px; font-size: 0.85rem; border-radius: 8px; font-weight: 600; cursor: pointer; border: 1.5px solid #CBD5E1; background: #FFFFFF; color: #334155; transition: all 0.2s ease;">
          Tutup
        </button>
      </div>
    </div>
  `;
  openGlobalModal(html);

  // Widen modal window slightly for a generous photo view
  const modalWin = document.querySelector('.modal-window');
  if (modalWin) {
    modalWin.style.maxWidth = '680px';
  }
}


// NEWS READ MODAL
function openNewsModal(title, e) {
  if (e) e.preventDefault();
  const html = `
    <div>
      <span style="color:#0E5AA7; font-size:0.78rem; font-weight:800; letter-spacing:1px;">BERITA & PENGUMUMAN RESMI</span>
      <h3 class="modal-header-title" style="margin:4px 0 14px 0;">${title}</h3>

      <div style="display:flex; gap:16px; font-size:0.8rem; color:#64748B; margin-bottom:18px; flex-wrap:wrap;">
        <span><i data-lucide="calendar" size="14"></i> Dipublikasikan: 2026</span>
        <span><i data-lucide="user" size="14"></i> Penulis: Humas DPP INKINDO DIY</span>
      </div>

      <p style="color:#334155; font-size:0.95rem; line-height:1.7; margin-bottom:14px;">
        D.I. YOGYAKARTA — Dalam upaya memperkuat peran kelembagaan serta memfasilitasi kebutuhan seluruh anggota konsultan, DPP INKINDO D.I. Yogyakarta mengumumkan langkah strategis perbaikan tata kelola jasa konsultansi.
      </p>

      <p style="color:#334155; font-size:0.95rem; line-height:1.7; margin-bottom:24px;">
        Langkah ini meliputi implementasi Sertifikat Badan Usaha (SBU) berbasis digital, penyelarasan billing rate remunerasi minimal tenaga ahli sesuai Permen PUPR, serta penyediaan advokasi hukum usaha secara menyeluruh.
      </p>

      <button class="btn btn-primary-blue" onclick="closeGlobalModal()" style="width:100%;">Tutup Berita</button>
    </div>
  `;
  openGlobalModal(html);
}


// DOWNLOAD REGULATION MODAL WITH EMBEDDED PDF PREVIEW
function openDownloadModal(docTitle) {
  const html = `
    <div class="regulation-modal-body" style="text-align: left;">
      <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">
        <div style="width: 48px; height: 48px; background: #ECFDF5; color: #047857; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 6px rgba(4, 120, 87, 0.15);">
          <i data-lucide="file-text" size="24"></i>
        </div>
        <div>
          <h3 class="modal-header-title" style="margin: 0; font-size: 1.15rem; color: #08162e; font-weight: 700; font-family: 'Poppins', sans-serif;">Pratinjau & Unduh Dokumen Regulasi</h3>
          <p style="color: #0056B8; font-weight: 700; font-size: 0.92rem; margin: 2px 0 0 0; line-height: 1.3;">"${docTitle}"</p>
        </div>
      </div>
      
      <p style="color: #64748B; font-size: 0.82rem; line-height: 1.45; margin-bottom: 12px;">
        Dokumen resmi bersumber dari Portal Kementerian PUPR & DPN INKINDO. Pratinjau dokumen PDF disematkan di bawah ini:
      </p>

      <!-- PDF Preview Container (380px tinggi, border 1px solid #DCE7F2, border-radius 8px) -->
      <div class="pdf-preview-wrapper" style="height: 380px; width: 100%; border: 1px solid #DCE7F2; border-radius: 8px; overflow: hidden; background: #F8FAFC; margin-bottom: 16px; position: relative; box-shadow: inset 0 1px 3px rgba(0,0,0,0.03);">
        <iframe src="assets/docs/sample-regulasi.pdf" width="100%" height="380px" style="border: none; border-radius: 8px; display: block;" title="Pratinjau Dokumen ${docTitle}"></iframe>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; gap: 10px; justify-content: flex-end; align-items: center; flex-wrap: wrap;">
        <button type="button" class="btn btn-secondary-light" onclick="closeGlobalModal()" style="padding: 9px 18px; font-size: 0.85rem; border-radius: 8px; font-weight: 600; cursor: pointer;">
          Batal / Tutup
        </button>
        <button type="button" class="btn btn-primary-blue" onclick="simulateDownloadFile('${docTitle}')" style="padding: 9px 20px; font-size: 0.85rem; border-radius: 8px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; background: #0056B8; color: #ffffff; box-shadow: 0 4px 12px rgba(0, 86, 184, 0.2);">
          <i data-lucide="download" size="16"></i>
          <span>Unduh Sekarang (PDF)</span>
        </button>
      </div>
    </div>
  `;
  openGlobalModal(html);

  // Widen modal window slightly for comfortable PDF reading
  const modalWin = document.querySelector('.modal-window');
  if (modalWin) {
    modalWin.style.maxWidth = '680px';
  }
}

function simulateDownloadFile(docTitle) {
  const link = document.createElement('a');
  link.href = 'assets/docs/sample-regulasi.pdf';
  link.download = `${docTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  closeGlobalModal();
}


// MEMBER DETAIL KTA MODAL
function openMemberDetailModal(name, kta, qual, bidang) {
  const html = `
    <div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:8px;">
        <span style="background:#DCFCE7; color:#166534; font-size:0.75rem; font-weight:800; padding:4px 12px; border-radius:99px;">Terverifikasi KTA Aktif</span>
        <span style="font-size:0.8rem; color:#64748B; font-weight:700;">Kualifikasi: ${qual}</span>
      </div>

      <h3 class="modal-header-title" style="margin-bottom:6px;">${name}</h3>
      <p style="color:#00A651; font-weight:800; font-size:0.88rem; margin-bottom:20px;">
        <i data-lucide="shield-check" size="16"></i> Nomor KTA: ${kta}
      </p>

      <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:18px; border-radius:12px; display:flex; flex-direction:column; gap:10px; margin-bottom:24px; font-size:0.88rem;">
        <div><strong>Spesialisasi Bidang:</strong> ${bidang}</div>
        <div><strong>Wilayah Domisili:</strong> Daerah Istimewa Yogyakarta</div>
        <div><strong>Status SBU Jasa Konstruksi:</strong> SBU Aktif (Terakreditasi LPJK / KemenPUPR)</div>
        <div><strong>Kontak Sekretariat Asosiasi:</strong> Terhubung dengan Database DPP INKINDO DIY</div>
      </div>

      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="https://wa.me/6281315289207?text=Halo%20Sekretariat%20INKINDO%20DIY,%20saya%20ingin%20menanyakan%20kontak%20perusahaan%20${encodeURIComponent(name)}" target="_blank" class="btn btn-primary-blue" style="flex:1; min-width:160px;">
          <i data-lucide="message-circle" size="18"></i> Hubungi via WhatsApp
        </a>
        <button class="btn btn-secondary-light" onclick="closeGlobalModal()" style="flex:1; min-width:120px;">Tutup</button>
      </div>
    </div>
  `;
  openGlobalModal(html);
}
