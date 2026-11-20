import { routeHref } from '../../config/paths.js';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderPublicFooter } from '../public-info/public-footer.js';
import { renderIcon } from '../../design-system/icons.js';
import './accommodation-home-page.css';

const photo = (id, width = 760) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + width + '&q=76';
const icon = name => renderIcon(name);
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const money = value => new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', maximumFractionDigits:0 }).format(value);

// Frontend-only preview fixtures. These are not provider records or live inventory.
export const ACCOMMODATION_PREVIEW_PROPERTIES = [
  { id:'kedaton-city-stay', name:'Kedaton City Stay', type:'Hotel', area:'Denpasar', price:520000, guests:3, image:'photo-1566073771259-6a8506099945', description:'Penginapan kota untuk perjalanan singkat, urusan pekerjaan, dan menjelajahi pusat Bali.', highlights:['Akses area kota','Kamar ber-AC','Pilihan sarapan'] },
  { id:'sanur-garden-homestay', name:'Sanur Garden Homestay', type:'Homestay', area:'Sanur', price:450000, guests:4, image:'photo-1564013799919-ab600027ffc6', description:'Suasana tinggal yang lebih tenang dengan nuansa rumah dan akses ke kawasan Sanur.', highlights:['Suasana taman','Area duduk bersama','Dekat kawasan pantai'] },
  { id:'ubud-hills-guesthouse', name:'Ubud Hills Guesthouse', type:'Guesthouse', area:'Ubud', price:780000, guests:3, image:'photo-1551882547-ff40c63fe5fa', description:'Guesthouse dengan suasana hangat untuk menjelajahi kawasan Ubud.', highlights:['Area santai','Kamar nyaman','Akses kawasan Ubud'] },
  { id:'canggu-coastal-inn', name:'Canggu Coastal Inn', type:'Inn', area:'Canggu', price:650000, guests:2, image:'photo-1542314831-068cd1dbfeeb', description:'Penginapan ringkas untuk menikmati kawasan Canggu.', highlights:['Area bersama','Pilihan sarapan','Dekat kawasan Canggu'] },
  { id:'kuta-coast-hotel', name:'Kuta Coast Hotel', type:'Hotel', area:'Kuta', price:690000, guests:3, image:'photo-1564501049412-61c2a3083791', description:'Pilihan menginap untuk menikmati kawasan Kuta dan akses ke berbagai kebutuhan perjalanan.', highlights:['Kolam renang','Restoran','Akses kawasan Kuta'] },
  { id:'ubud-river-retreat', name:'Ubud River Retreat', type:'Resort', area:'Ubud', price:1450000, guests:4, image:'photo-1571896349842-33c89424de2d', description:'Retreat bernuansa alam untuk menikmati suasana Ubud dan waktu istirahat yang lebih santai.', highlights:['Pemandangan alam','Kolam renang','Area relaksasi'] },
  { id:'seminyak-private-villa', name:'Seminyak Private Villa', type:'Villa', area:'Seminyak', price:1850000, guests:6, image:'photo-1613490493576-7fde63acd811', description:'Villa privat dengan ruang yang lebih leluasa untuk keluarga atau perjalanan bersama teman.', highlights:['Kolam privat','Ruang keluarga','Dapur'] },
  { id:'nusa-dua-suite', name:'Nusa Dua Residence', type:'Serviced Apartment', area:'Nusa Dua', price:1200000, guests:4, image:'photo-1590490360182-c33d57733427', description:'Akomodasi bergaya residence dengan fasilitas yang mendukung masa tinggal lebih panjang.', highlights:['Area memasak','Ruang keluarga','Fasilitas residence'] }
];

const ACCOMMODATION_TYPES = [
  { label:'Semua', value:'all', image:'photo-1566073771259-6a8506099945' },
  { label:'Hotel', value:'Hotel', image:'photo-1564501049412-61c2a3083791' },
  { label:'Resort', value:'Resort', image:'photo-1571896349842-33c89424de2d' },
  { label:'Villa', value:'Villa', image:'photo-1613490493576-7fde63acd811' },
  { label:'Homestay', value:'Homestay', image:'photo-1564013799919-ab600027ffc6' },
  { label:'Guesthouse', value:'Guesthouse', image:'photo-1551882547-ff40c63fe5fa' },
  { label:'Inn', value:'Inn', image:'photo-1542314831-068cd1dbfeeb' },
  { label:'Serviced Apartment', value:'Serviced Apartment', image:'photo-1590490360182-c33d57733427' }
];

const propertyCard = property => `
  <article class="ac-property-card" data-property-card="${escapeHtml(property.id)}">
    <div class="ac-property-media">
      <button class="ac-property-open" type="button" data-open-property="${escapeHtml(property.id)}" aria-label="Lihat preview ${escapeHtml(property.name)}">
        <img src="${photo(property.image, 760)}" alt="${escapeHtml(property.name)}" loading="lazy" decoding="async">
        <span class="ac-property-type">${escapeHtml(property.type)}</span>
      </button>
      <button class="ac-save-button" type="button" data-save-property="${escapeHtml(property.id)}" aria-label="Simpan ${escapeHtml(property.name)}" aria-pressed="false">${icon('heart')}</button>
    </div>
    <div class="ac-property-info">
      <div class="ac-property-meta"><span>${escapeHtml(property.area)}, Bali</span><span>Preview</span></div>
      <h3><button type="button" data-open-property="${escapeHtml(property.id)}">${escapeHtml(property.name)}</button></h3>
      <div class="ac-property-highlights">${property.highlights.slice(0,2).map(item => '<span>'+escapeHtml(item)+'</span>').join('')}</div>
      <div class="ac-property-price"><span>Contoh harga mulai</span><strong>${money(property.price)} <small>/ malam</small></strong></div>
    </div>
  </article>`;

const typeMarkup = () => ACCOMMODATION_TYPES.filter(type => type.value !== 'all').map(type => `
  <button class="ac-type-card" type="button" data-type-choice="${escapeHtml(type.value)}">
    <span class="ac-type-image"><img src="${photo(type.image, 520)}" alt="" loading="lazy"><span>${escapeHtml(type.label)}</span></span>
  </button>`).join('');

export function mountAccommodationHomePage({ root, user = null } = {}) {
  const header = renderPageHeader({
    brandHref: routeHref('home'),
    label: 'PLUITS',
    className: 'global-header ac-header',
    rightContent: '<div class="global-header-tools ac-header-tools"><span class="ac-header-context">ACCOMMODATION</span><div class="global-header-actions ac-header-actions"><button type="button" class="global-icon-button" id="ac-saved" aria-label="Akomodasi tersimpan">'+icon('heart')+'</button><a class="global-icon-button" href="'+routeHref(user ? 'dashboard' : 'login')+'" aria-label="Akun">'+icon('user')+'</a></div></div>',
    dataGlobalHeader: true
  });

  root.innerHTML = '<div class="pl-page-shell ac-page">'+header+
    '<nav class="ac-nav" aria-label="Navigasi Accommodation"><a href="#ac-search">Cari penginapan</a><a href="#ac-nearby">Di sekitar area</a><a href="#ac-types">Jenis akomodasi</a><a href="#ac-explore">Jelajahi Bali</a><span>'+icon('mapPin')+' LOKASI DEMO: DENPASAR</span></nav>'+
    '<main class="pl-page-main ac-main">'+
      '<section class="ac-intro" id="ac-search"><div class="ac-intro-copy"><span class="ac-eyebrow">PLUITS · ACCOMMODATION</span><h1>Temukan tempat<br><em>untuk beristirahat.</em></h1><p>Jelajahi hotel, resort, villa, homestay, dan berbagai pilihan menginap dalam satu pengalaman.</p></div><div class="ac-intro-note"><span>ONE PLACE TO EXPLORE</span><p>Mulai dari penginapan sederhana hingga resort dengan layanan lengkap. Temukan pilihan yang sesuai dengan perjalananmu.</p></div></section>'+
      '<form class="ac-search-panel" id="ac-search-form">'+
        '<label class="ac-search-field ac-destination-field"><span>Tujuan atau kawasan</span><span class="ac-input-wrap">'+icon('mapPin')+'<input id="ac-destination" name="destination" type="search" placeholder="Kota, kawasan, atau nama properti" autocomplete="off"></span></label>'+
        '<label class="ac-search-field"><span>Check-in</span><input id="ac-checkin" name="checkin" type="date"></label>'+
        '<label class="ac-search-field"><span>Check-out</span><input id="ac-checkout" name="checkout" type="date"></label>'+
        '<label class="ac-search-field"><span>Tamu</span><select id="ac-guests" name="guests"><option value="1">1 tamu</option><option value="2" selected>2 tamu</option><option value="3">3 tamu</option><option value="4">4 tamu</option><option value="5">5 tamu</option><option value="6">6+ tamu</option></select></label>'+
        '<label class="ac-search-field"><span>Jenis akomodasi</span><select id="ac-type" name="type"><option value="all">Semua jenis</option><option>Hotel</option><option>Resort</option><option>Villa</option><option>Homestay</option><option>Guesthouse</option><option>Inn</option><option>Serviced Apartment</option></select></label>'+
        '<label class="ac-search-field"><span>Anggaran per malam</span><select id="ac-budget" name="budget"><option value="0">Semua anggaran</option><option value="600000">Hingga Rp600 ribu</option><option value="1000000">Hingga Rp1 juta</option><option value="1500000">Hingga Rp1,5 juta</option><option value="2000000">Hingga Rp2 juta</option></select></label>'+
        '<div class="ac-search-actions"><button class="ac-search-submit" type="submit">'+icon('search')+' Cari akomodasi</button><button class="ac-search-reset" type="reset">Atur ulang</button></div>'+
        '<p class="ac-search-disclaimer">Preview eksplorasi menggunakan data contoh. Harga dan ketersediaan belum terhubung ke inventori langsung.</p>'+
      '</form>'+
      '<section class="ac-discovery-section" id="ac-nearby"><div class="ac-section-heading"><div><span class="ac-eyebrow">LOCAL DISCOVERY</span><h2 id="ac-nearby-title">Pilihan di sekitar Denpasar</h2><p id="ac-nearby-copy">Contoh eksplorasi area lokal. Ubah tujuan untuk melihat kawasan lain.</p></div><span class="ac-section-count" id="ac-nearby-count">3 pilihan</span></div><div class="ac-property-grid" id="ac-nearby-grid"></div></section>'+
      '<section class="ac-types-section" id="ac-types"><div class="ac-section-heading"><div><span class="ac-eyebrow">FIND YOUR STAY</span><h2>Jelajahi berdasarkan jenis</h2><p>Satu sistem untuk berbagai karakter dan kebutuhan menginap.</p></div></div><div class="ac-type-grid">'+typeMarkup()+'</div></section>'+
      '<section class="ac-discovery-section ac-explore-section" id="ac-explore"><div class="ac-section-heading"><div><span class="ac-eyebrow">EXPLORE MORE</span><h2 id="ac-explore-title">Jelajahi pilihan lainnya</h2><p id="ac-results-summary">Temukan pilihan dari berbagai kawasan di Bali.</p></div><span class="ac-section-count" id="ac-explore-count">3 pilihan</span></div><div class="ac-property-grid" id="ac-explore-grid"></div><div class="ac-empty-state" id="ac-empty-state" hidden><strong>Belum ada pilihan yang cocok.</strong><p>Coba ubah tujuan atau filter pencarianmu.</p><button type="button" id="ac-empty-reset">Hapus filter</button></div></section>'+
      '<section class="ac-closing-note"><span class="ac-eyebrow">A BETTER WAY TO FIND YOUR STAY</span><h2>Setiap perjalanan punya<br><em>tempat yang tepat.</em></h2><p>Kenali kawasan, bandingkan pilihan, dan temukan akomodasi yang sesuai dengan caramu bepergian.</p></section>'+
    '</main>'+renderPublicFooter()+
    '<div class="ac-modal-backdrop" id="ac-property-modal" hidden><section class="ac-property-modal" role="dialog" aria-modal="true" aria-labelledby="ac-modal-title"><button class="ac-modal-close" type="button" id="ac-modal-close" aria-label="Tutup preview">×</button><div id="ac-modal-content"></div></section></div></div>';

  const form = root.querySelector('#ac-search-form');
  const destinationInput = root.querySelector('#ac-destination');
  const typeInput = root.querySelector('#ac-type');
  const budgetInput = root.querySelector('#ac-budget');
  const guestsInput = root.querySelector('#ac-guests');
  const nearbyGrid = root.querySelector('#ac-nearby-grid');
  const exploreGrid = root.querySelector('#ac-explore-grid');
  const saved = new Set();
  let showSavedOnly = false;
  let lastFocused = null;

  const normalized = value => String(value || '').trim().toLocaleLowerCase('id-ID');
  const matchesDestination = (property, query) => !query || localAreaMatches(property, query) || [property.name, property.type].some(value => normalized(value).includes(query));
  const localAreaMatches = (property, query) => {
    if (!query) return ['denpasar','sanur','kuta'].includes(normalized(property.area));
    if (['denpasar','denpasar, bali'].includes(query)) return ['denpasar','sanur','kuta'].includes(normalized(property.area));
    if (query.includes('ubud')) return ['ubud'].includes(normalized(property.area));
    if (query.includes('seminyak')) return ['seminyak'].includes(normalized(property.area));
    if (query.includes('nusa dua')) return ['nusa dua'].includes(normalized(property.area));
    return normalized(property.area) === query || normalized(property.name).includes(query);
  };

  function renderResults() {
    const query = normalized(destinationInput.value).replace(/,?\s*bali$/, '').trim();
    const type = typeInput.value;
    const budget = Number(budgetInput.value);
    const guests = Number(guestsInput.value);
    const checkin = root.querySelector('#ac-checkin').value;
    const checkout = root.querySelector('#ac-checkout').value;
    const filtered = ACCOMMODATION_PREVIEW_PROPERTIES.filter(property =>
      matchesDestination(property, query) && (!showSavedOnly || saved.has(property.id)) &&
      (type === 'all' || property.type === type) &&
      (!budget || property.price <= budget) &&
      property.guests >= guests
    );
    const local = filtered.filter(property => localAreaMatches(property, query));
    const localIds = new Set(local.map(property => property.id));
    const other = filtered.filter(property => !localIds.has(property.id));
    nearbyGrid.innerHTML = local.map(propertyCard).join('');
    exploreGrid.innerHTML = other.map(propertyCard).join('');
    const locationLabel = destinationInput.value.trim() || 'Denpasar';
    root.querySelector('#ac-nav-location').lastChild.textContent = query ? ' ' + locationLabel.toLocaleUpperCase('id-ID') : ' LOKASI DEMO: DENPASAR';
    root.querySelector('#ac-nearby-title').textContent = query ? 'Di sekitar ' + locationLabel : 'Pilihan di sekitar Denpasar';
    root.querySelector('#ac-nearby-copy').textContent = query ? 'Pilihan area terdekat dalam data preview untuk tujuan yang kamu masukkan.' : 'Contoh eksplorasi lokal. Ini bukan hasil geolokasi perangkat.';
    root.querySelector('#ac-nearby-count').textContent = local.length + ' pilihan';
    root.querySelector('#ac-explore-title').textContent = query ? 'Hasil lain untuk ' + locationLabel : 'Jelajahi pilihan lainnya';
    root.querySelector('#ac-explore-count').textContent = other.length + ' pilihan';
    const dateText = checkin && checkout ? ' · ' + checkin + ' sampai ' + checkout : '';
    root.querySelector('#ac-results-summary').textContent = filtered.length + ' pilihan contoh' + dateText + ' · ' + guests + ' tamu. Tanggal belum memeriksa ketersediaan.';
    root.querySelector('#ac-nearby').hidden = local.length === 0;
    root.querySelector('#ac-empty-state').hidden = filtered.length !== 0;
    root.querySelector('#ac-empty-state strong').textContent = showSavedOnly ? 'Belum ada akomodasi tersimpan.' : 'Belum ada pilihan yang cocok.';
    root.querySelector('#ac-explore').hidden = filtered.length > 0 && other.length === 0;
    root.querySelectorAll('[data-save-property]').forEach(button => {
      const active = saved.has(button.dataset.saveProperty);
      button.classList.toggle('is-saved', active);
      button.setAttribute('aria-pressed', String(active));
    });
    root.querySelectorAll('[data-type-choice]').forEach(button => button.classList.toggle('is-active', button.dataset.typeChoice === type));
  }

  form.addEventListener('submit', event => { event.preventDefault(); renderResults(); });
  form.addEventListener('reset', () => window.setTimeout(() => { renderResults(); }, 0));
  root.querySelectorAll('[data-type-choice]').forEach(button => button.addEventListener('click', () => {
    typeInput.value = button.dataset.typeChoice;
    renderResults();
    root.querySelector('#ac-nearby').scrollIntoView({ behavior:'smooth', block:'start' });
  }));
  root.addEventListener('click', event => {
    const saveButton = event.target.closest('[data-save-property]');
    if (saveButton) {
      const id = saveButton.dataset.saveProperty;
      saved.has(id) ? saved.delete(id) : saved.add(id);
      renderResults();
      return;
    }
    const openButton = event.target.closest('[data-open-property]');
    if (openButton) {
      const property = ACCOMMODATION_PREVIEW_PROPERTIES.find(item => item.id === openButton.dataset.openProperty);
      if (!property) return;
      lastFocused = openButton;
      root.querySelector('#ac-modal-content').innerHTML = '<img class="ac-modal-image" src="'+photo(property.image,1000)+'" alt="'+escapeHtml(property.name)+'"><div class="ac-modal-body"><span class="ac-eyebrow">'+escapeHtml(property.type)+' · '+escapeHtml(property.area)+', BALI</span><h2 id="ac-modal-title">'+escapeHtml(property.name)+'</h2><p>'+escapeHtml(property.description)+'</p><ul>'+property.highlights.map(item=>'<li>'+escapeHtml(item)+'</li>').join('')+'</ul><div class="ac-modal-price"><span>Contoh harga per malam</span><strong>'+money(property.price)+'</strong></div><p class="ac-modal-note">Ini adalah preview data contoh. Profil lengkap, inventori kamar, ketersediaan, dan reservasi belum diaktifkan.</p></div>';
      root.querySelector('#ac-property-modal').hidden = false;
      root.querySelector('#ac-modal-close').focus();
      return;
    }
    if (event.target.id === 'ac-property-modal' || event.target.closest('#ac-modal-close')) closeModal();
  });
  function closeModal() {
    root.querySelector('#ac-property-modal').hidden = true;
    lastFocused?.focus();
  }
  root.querySelector('#ac-modal-close').addEventListener('click', closeModal);
  root.querySelector('#ac-saved').addEventListener('click', () => {
    showSavedOnly = !showSavedOnly;
    const button = root.querySelector('#ac-saved');
    button.setAttribute('aria-pressed', String(showSavedOnly));
    button.setAttribute('aria-label', showSavedOnly ? 'Tampilkan semua akomodasi' : 'Tampilkan akomodasi tersimpan');
    renderResults();
    root.querySelector('#ac-nearby').scrollIntoView({ behavior:'smooth', block:'start' });
  });
  root.querySelector('#ac-checkin').addEventListener('change', () => {
    const checkin = root.querySelector('#ac-checkin');
    const checkout = root.querySelector('#ac-checkout');
    checkout.min = checkin.value || '';
    if (checkout.value && checkin.value && checkout.value <= checkin.value) checkout.value = '';
  });
  root.querySelector('#ac-empty-reset').addEventListener('click', () => { form.reset(); destinationInput.value = ''; typeInput.value = 'all'; budgetInput.value = '0'; renderResults(); });
  document.addEventListener('keydown', onKeyDown);
  function onKeyDown(event) { if (event.key === 'Escape' && !root.querySelector('#ac-property-modal').hidden) closeModal(); }
  renderResults();

  return () => {
    document.removeEventListener('keydown', onKeyDown);
    root.innerHTML = '';
  };
}
