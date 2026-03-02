(() => {
  // Mobile menu
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  menuBtn?.addEventListener('click', () => nav.classList.toggle('open'));

  // Year
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Active nav based on filename
  const file = (location.pathname.split('/').pop() || 'index.html').split('?')[0];
  document.querySelectorAll('.nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0];
    a.classList.toggle('active', href === file);
  });

  // Fake form send (contact page)
  window.fakeSend = function(e){
    e.preventDefault();
    const toast = document.getElementById('toast');
    if (toast) {
      toast.style.display = 'block';
      setTimeout(() => toast.style.display = 'none', 2800);
    }
    e.target.reset();
    return false;
  };

  // Review filtering (kritikak.html)
  const pills = Array.from(document.querySelectorAll('.pill'));
  const cards = Array.from(document.querySelectorAll('[data-cat]'));

  if (pills.length && cards.length) {
    const params = new URLSearchParams(location.search);
    const initial = params.get('cat') || 'all';

    const setFilter = (filter) => {
      pills.forEach(p => p.classList.toggle('active', p.dataset.filter === filter));
      cards.forEach(c => {
        const cat = c.getAttribute('data-cat');
        c.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
      });
    };

    pills.forEach(p => p.addEventListener('click', () => setFilter(p.dataset.filter)));
    setFilter(['all','film','food','game','tech'].includes(initial) ? initial : 'all');
  }



  // Random coffee + song (Kávé Sarok) 
const coffeeBtn = document.getElementById('coffeeRecBtn');
const out = document.getElementById('coffeeRecOut');

if (coffeeBtn && out) {
  const coffeeName = document.getElementById('coffeeName');
  const coffeeVibe = document.getElementById('coffeeVibe');
  const coffeeDesc = document.getElementById('coffeeDesc');
  const songLink = document.getElementById('songLink');

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const coffees = [
    { name: "Espresso tonic", vibe: ["fresh","bright"], desc: "Jeges, friss, citrusos vibe. Ha kell egy pofon, de nem energiaitalból." },
    { name: "Jegeskávé (iced latte)", vibe: ["cozy","smooth"], desc: "Chilles, krémes, dumálós estére való." },
    { name: "Flat white", vibe: ["focus","smooth"], desc: "Kulturált erő. Nem csicsa, csak működik." },
    { name: "Cappuccino", vibe: ["cozy","classic"], desc: "Klasszik comfort. Ha csak nyugiban túlélni akarod a napot." },
    { name: "Cold brew", vibe: ["night","focus"], desc: "Lassú, mély, sötétebb vibe. Éjszakás üzemmód." },
    { name: "Mocha", vibe: ["sweet","cozy"], desc: "Csoki + kávé. Bűnösen jó, vállaljuk." },
    { name: "Affogato", vibe: ["sweet","dramatic"], desc: "Fagyi + espresso. Rövid, de emlékezetes, mint egy plot twist." },
    { name: "Dupla espresso", vibe: ["hard","focus"], desc: "Semmi beszéd. Motorindítás." }
  ];

  const songs = [
    { title:"Midnight City", artist:"M83", vibe:["fresh","bright"], url:"https://open.spotify.com/search/M83%20Midnight%20City" },
    { title:"Sun Models", artist:"ODESZA", vibe:["fresh","bright"], url:"https://open.spotify.com/search/ODESZA%20Sun%20Models" },

    { title:"Pink + White", artist:"Frank Ocean", vibe:["cozy","smooth"], url:"https://open.spotify.com/search/Frank%20Ocean%20Pink%20%2B%20White" },
    { title:"Holocene", artist:"Bon Iver", vibe:["cozy","classic"], url:"https://open.spotify.com/search/Bon%20Iver%20Holocene" },

    { title:"Nightcall", artist:"Kavinsky", vibe:["night","focus"], url:"https://open.spotify.com/search/Kavinsky%20Nightcall" },
    { title:"Intro", artist:"The xx", vibe:["night","focus"], url:"https://open.spotify.com/search/The%20xx%20Intro" },

    { title:"The Death of Peace of Mind", artist:"Bad Omens", vibe:["hard","night"], url:"https://open.spotify.com/search/Bad%20Omens%20The%20Death%20of%20Peace%20of%20Mind" },
    { title:"BLOODMONEY", artist:"Poppy", vibe:["hard"], url:"https://open.spotify.com/search/Poppy%20BLOODMONEY" },

    { title:"Sweater Weather", artist:"The Neighbourhood", vibe:["sweet","dramatic"], url:"https://open.spotify.com/search/The%20Neighbourhood%20Sweater%20Weather" },
    { title:"Take Me To Church", artist:"Hozier", vibe:["dramatic"], url:"https://open.spotify.com/search/Hozier%20Take%20Me%20To%20Church" }
  ];

  const vibeLabel = (v) => `Vibe: ${v.join(" • ")}`;

  function pickSongFor(coffee) {
    const candidates = songs.filter(s => s.vibe.some(v => coffee.vibe.includes(v)));
    return candidates.length ? pick(candidates) : pick(songs);
  }

  coffeeBtn.addEventListener('click', (e) => {
    e.preventDefault(); // ne menjen el linkre

    const c = pick(coffees);
    const s = pickSongFor(c);

    coffeeName.textContent = c.name;
    coffeeVibe.textContent = vibeLabel(c.vibe);
    coffeeDesc.textContent = c.desc;

    songLink.textContent = `🎧 ${s.artist} — ${s.title}`;
    songLink.href = s.url;

    out.style.display = 'block';
  });
}

})();

// ====== Kezdőlap: Heti menetrend + lapozható hírek ======
const weekListEl = document.getElementById('weekList');
const weekTitleEl = document.getElementById('weekTitle');
const weekSubEl = document.getElementById('weekSub');
const weekChipEl = document.getElementById('weekChip');

const newsSlideEl = document.getElementById('newsSlide');
const newsPrev = document.getElementById('newsPrev');
const newsNext = document.getElementById('newsNext');
const newsDots = document.getElementById('newsDots');
const newsCount = document.getElementById('newsCount');

function getISOWeek(date = new Date()){
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

if (weekListEl && newsSlideEl && newsPrev && newsNext && newsDots) {
  // 👉 MENETREND (1 perc frissítés)
  const weekly = {
    title: "Menetrend",
    subtitle: "Mi várható?",
    items: [
      "VampYr kritika",
      "ASUS ROG Swift OLED PG32UCDP teszt",
      "Kávé Sarok: új random kombók + playlist bővítés."
    ]
  };

  const news = [
    { title: "Új kaja kritika készült", text: "A Szombathelyi Guri új néven fut és mi leteszteltük.", tag: "étel" },
    { title: "AirPdods Pro 3", text: "1 hét után vajon milyen élményei vannak Ádámnak? Megérte?", tag: "tech" },
    { title: "VampYr", text: "Ghris új célpontja vajon kimaxolja vagy félbe hagyja?", tag: "játék" }
  ];

  // Week chip
  const w = getISOWeek(new Date());
  if (weekChipEl) weekChipEl.textContent = `W${String(w).padStart(2, '0')}`;
  if (weekTitleEl) weekTitleEl.textContent = weekly.title;
  if (weekSubEl) weekSubEl.textContent = weekly.subtitle;

  // Render weekly list
  weekListEl.innerHTML = weekly.items.map(x => `<li>${x}</li>`).join("");

  // News carousel
  let i = 0;

  function renderDots(){
    newsDots.innerHTML = news.map((_, idx) =>
      `<span class="newsDot ${idx===i ? 'active' : ''}" data-i="${idx}" role="button" aria-label="Hír ${idx+1}"></span>`
    ).join("");

    newsDots.querySelectorAll('.newsDot').forEach(dot => {
      dot.addEventListener('click', () => {
        i = Number(dot.getAttribute('data-i'));
        renderNews(true);
      });
    });
  }

  function renderNews(animate=false){
    const item = news[i];
    if (!item) return;

    if (newsCount) newsCount.textContent = `${i+1}/${news.length}`;

    if (animate){
      newsSlideEl.style.opacity = '0';
      newsSlideEl.style.transform = 'translateY(4px)';
      setTimeout(() => {
        newsSlideEl.innerHTML = `
          <div class="newsTitle">${item.title}</div>
          <div class="newsMeta">${item.tag ? `#${item.tag}` : ''}</div>
          <div class="muted">${item.text}</div>
        `;
        newsSlideEl.style.opacity = '1';
        newsSlideEl.style.transform = 'translateY(0px)';
        renderDots();
      }, 140);
    } else {
      newsSlideEl.innerHTML = `
        <div class="newsTitle">${item.title}</div>
        <div class="newsMeta">${item.tag ? `#${item.tag}` : ''}</div>
        <div class="muted">${item.text}</div>
      `;
      renderDots();
    }
  }

  function prev(){
    i = (i - 1 + news.length) % news.length;
    renderNews(true);
  }
  function next(){
    i = (i + 1) % news.length;
    renderNews(true);
  }

  newsPrev.addEventListener('click', prev);
  newsNext.addEventListener('click', next);

  // Auto lapozás (opcionális): 8 mp
  let timer = setInterval(next, 8000);

  // Ha ráviszed az egeret, álljon meg
  newsSlideEl.addEventListener('mouseenter', () => clearInterval(timer));
  newsSlideEl.addEventListener('mouseleave', () => timer = setInterval(next, 8000));

  renderNews(false);
}

(() => {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbClose = document.getElementById('lightboxClose');
  const links = document.querySelectorAll('a[data-lightbox]');

  if(!lb || !lbImg || !lbClose || !links.length) return;

  links.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      lbImg.src = a.getAttribute('href');
      lb.classList.add('show');
      lb.setAttribute('aria-hidden','false');
    });
  });

  const close = () => {
    lb.classList.remove('show');
    lb.setAttribute('aria-hidden','true');
    lbImg.src = '';
  };

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if(e.target === lb) close(); });
  window.addEventListener('keydown', (e) => { if(e.key === 'Escape') close(); });
})();
(() => {
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('imgModalImg');
  const closeBtn = document.getElementById('imgModalClose');

  if(!modal || !modalImg || !closeBtn) return;

  const open = (src, alt='') => {
    modalImg.src = src;
    modalImg.alt = alt;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modalOpen');
  };

  const close = () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    modalImg.src = '';
    document.body.classList.remove('modalOpen');
  };

  document.querySelectorAll('a[data-lightbox]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const img = a.querySelector('img');
      open(a.getAttribute('href'), img?.alt || '');
    });
  });

  closeBtn.addEventListener('click', close);

  // katt a háttérre -> zár
  modal.addEventListener('click', (e) => {
    if(e.target === modal) close();
  });

  // ESC -> zár
  window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') close();
  });
})();