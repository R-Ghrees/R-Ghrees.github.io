(() => {
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");
  menuBtn?.addEventListener("click", () => nav?.classList.toggle("open"));

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const file = (location.pathname.split("/").pop() || "index.html").split("?")[0];
  document.querySelectorAll(".nav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").split("#")[0];
    a.classList.toggle("active", href === file);
  });

  window.fakeSend = function fakeSend(e) {
    e.preventDefault();
    const toast = document.getElementById("toast");
    if (toast) {
      toast.style.display = "block";
      setTimeout(() => {
        toast.style.display = "none";
      }, 2800);
    }
    e.target.reset();
    return false;
  };

  const pills = Array.from(document.querySelectorAll(".pill[data-filter]"));
  const cards = Array.from(document.querySelectorAll("[data-cat]"));
  const coffeeClock = document.getElementById("coffeeClock");
  const coffeeClockMessage = document.getElementById("coffeeClockMessage");

  if (pills.length && cards.length) {
    const params = new URLSearchParams(location.search);
    const initial = params.get("cat") || "all";

    const setFilter = (filter) => {
      pills.forEach((p) => p.classList.toggle("active", p.dataset.filter === filter));
      cards.forEach((c) => {
        const cat = c.getAttribute("data-cat");
        c.style.display = filter === "all" || cat === filter ? "" : "none";
      });
    };

    pills.forEach((p) => p.addEventListener("click", () => setFilter(p.dataset.filter)));
    setFilter(["all", "film", "food", "game", "tech"].includes(initial) ? initial : "all");
  }

  if (coffeeClock) {
    const getClockMessage = (hour) => {
      if (hour >= 5 && hour < 10) return "Na igen, ezt kávé nélkül nem kéne elkezdeni.";
      if (hour >= 10 && hour < 13) return "Úgy nézem, kávé idő van.";
      if (hour >= 13 && hour < 18) return "Még egy kávé, és visszatér a lelked a testedbe.";
      if (hour >= 18 && hour < 23) return "Ez már nem kávé, ez karakterfejlődés.";
      return "Ez itt már nem rutin, hanem túlélési stratégia.";
    };

    const updateCoffeeClock = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("hu-HU", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });

      coffeeClock.textContent = time;
      if (coffeeClockMessage) coffeeClockMessage.textContent = getClockMessage(now.getHours());
    };

    updateCoffeeClock();
    setInterval(updateCoffeeClock, 1000);
  }

  const coffeeOut = document.getElementById("coffeeRecOut");

  if (coffeeOut) {
    const coffeeName = document.getElementById("coffeeName");
    const coffeeDesc = document.getElementById("coffeeDesc");
    const coffeeTracks = document.getElementById("coffeeTracks");
    const coffeeDayLabel = document.getElementById("coffeeDayLabel");
    const coffeeClosing = document.getElementById("coffeeClosing");
    const coffeeFactText = document.getElementById("coffeeFactText");
    const coffeeFactDayLabel = document.getElementById("coffeeFactDayLabel");

    const closingText = "Mert nem minden kávé ugyanaz, és nem minden hangulat kér ugyanazt a zenét. Van, amikor egy latte mellé elég egy puhább dallam, és van, amikor egy tripla espresso csak akkor üt igazán, ha Rammstein vagy Metallica szól mellé.";

    const coffeeLibrary = [
      {
        name: "Latte",
        reason: "A latte könnyedebb és krémesebb kávé, ezért jól áll neki egy lazább, poposabb kezdés, de a végén már ott van mellette az a mélyebb, érzelmesebb vonal is.",
        tracks: [
          { artist: "The Weeknd", song: "Blinding Lights" },
          { artist: "Machine Gun Kelly, YUNGBLUD, Travis Barker", song: "I Think I'm OKAY" },
          { artist: "Bring Me The Horizon", song: "Drown" },
          { artist: "Metallica", song: "Nothing Else Matters" }
        ]
      },
      {
        name: "Cappuccino",
        reason: "A cappuccino még puhább belépő a kávék világába, de van benne karakter, ezért kapott finom popot és sötétebb, szívbe mászó rockos-metálos dalokat is.",
        tracks: [
          { artist: "Harry Styles", song: "As It Was" },
          { artist: "Bad Omens", song: "Just Pretend" },
          { artist: "Motionless In White", song: "Another Life" },
          { artist: "Metallica", song: "The Unforgiven" }
        ]
      },
      {
        name: "Flat White",
        reason: "A flat white lágy textúrájú, de határozottabb kávé, így tökéletes mellé a melankolikus, hidegebb hangulatú pop és a súlyosabb, érzelmes rock-metál keverék.",
        tracks: [
          { artist: "Billie Eilish", song: "everything i wanted" },
          { artist: "Bring Me The Horizon", song: "Can You Feel My Heart" },
          { artist: "Three Days Grace", song: "I Hate Everything About You" },
          { artist: "Metallica", song: "Fade to Black" }
        ]
      },
      {
        name: "Mocha",
        reason: "A mocha egyszerre édes és sötét, szóval pont passzol hozzá ez a kombó is: egy kis csillogóbb pop, mellette pedig komorabb, erősebb, mégis hangulatos dalok.",
        tracks: [
          { artist: "Lady Gaga", song: "Bloody Mary" },
          { artist: "Falling In Reverse", song: "Popular Monster" },
          { artist: "Bad Omens", song: "The Death of Peace of Mind" },
          { artist: "Rammstein", song: "Ohne Dich" }
        ]
      },
      {
        name: "Americano",
        reason: "Az americano már nem finomkodik, tisztább és komolyabb karakterű kávé, ezért mehet mellé három erőteljesebb szám és egy megtört, lágyabb kivétel.",
        tracks: [
          { artist: "Imagine Dragons", song: "Bones" },
          { artist: "Rammstein", song: "Deutschland" },
          { artist: "Metallica", song: "For Whom the Bell Tolls" },
          { artist: "Slipknot", song: "Snuff" }
        ]
      },
      {
        name: "Hosszú kávé",
        reason: "Ez a tipikus túlélő kávé, amit meló előtt vagy után is el tudsz képzelni, ezért húzós, menetelős számokat kapott, de kellett mellé egy lazább, lebegősebb dal is.",
        tracks: [
          { artist: "Post Malone", song: "Circles" },
          { artist: "Sabaton", song: "The Unkillable Soldier" },
          { artist: "Metallica", song: "Harvester of Sorrow" },
          { artist: "Rammstein", song: "Sonne" }
        ]
      },
      {
        name: "Dupla espresso",
        reason: "A dupla espresso már erőből dolgozik, szóval itt a zene is keményebb, feszesebb és agresszívebb, miközben az egy lágyabb dal hagy egy kis levegőt a végére.",
        tracks: [
          { artist: "Depeche Mode", song: "Enjoy the Silence" },
          { artist: "Metallica", song: "Master of Puppets" },
          { artist: "Rammstein", song: "Ich Will" },
          { artist: "Slipknot", song: "Psychosocial" }
        ]
      },
      {
        name: "Espresso Macchiato",
        reason: "Ez a kávé kicsi, de erős, pont mint ez a válogatás: markáns, karakteres, de közben az érzelmesebb oldal is ott marad benne.",
        tracks: [
          { artist: "Miley Cyrus", song: "Wrecking Ball" },
          { artist: "Motionless In White", song: "Voices" },
          { artist: "Avenged Sevenfold", song: "Hail to the King" },
          { artist: "Rammstein", song: "Links 2 3 4" }
        ]
      },
      {
        name: "Cortado",
        reason: "A cortado rövid, tiszta és erős, ezért kapott egy sötét, feszes, hangulatos playlistet, ami egyszerre nyers és stílusos.",
        tracks: [
          { artist: "Lana Del Rey", song: "Dark Paradise" },
          { artist: "Metallica", song: "Sad But True" },
          { artist: "Slipknot", song: "Duality" },
          { artist: "Bring Me The Horizon", song: "Throne" }
        ]
      },
      {
        name: "Ristretto",
        reason: "A ristretto kis méretben ad nagy ütést, ezért ehhez már a durvább, gyorsabb, adrenalinosabb zenék működnek igazán jól.",
        tracks: [
          { artist: "Billie Eilish", song: "bury a friend" },
          { artist: "Rammstein", song: "Feuer frei!" },
          { artist: "Metallica", song: "Battery" },
          { artist: "Slipknot", song: "Before I Forget" }
        ]
      },
      {
        name: "Fekete kávé",
        reason: "A fekete kávé nyers és őszinte, nem akar többnek látszani, mint ami - pont ezért illenek hozzá ezek a kemény, sötét, gerinces számok.",
        tracks: [
          { artist: "Depeche Mode", song: "Wrong" },
          { artist: "Rammstein", song: "Sonne" },
          { artist: "Metallica", song: "For Whom the Bell Tolls" },
          { artist: "Pantera", song: "Walk" }
        ]
      },
      {
        name: "Tripla espresso",
        reason: "A tripla espresso már a végső fokozat, szóval ide a legdurvább csomag jár: sötét, brutális, feszült, és még a lágyabb dal is inkább megtört, mint nyugodt.",
        tracks: [
          { artist: "Metallica", song: "To Live Is To Die" },
          { artist: "Slipknot", song: "People = Shit" },
          { artist: "Rammstein", song: "Du Hast" },
          { artist: "Avenged Sevenfold", song: "Nightmare" }
        ]
      }
    ];

    const coffeeFacts = [
      "Van, akinek a latte nem csak ital, hanem egy nyugodtabb indulás ígérete. Krémesebb, lágyabb, és valahogy kevésbé érződik benne kapkodósnak a reggel.",
      "A hosszú kávé sokaknál nem az élvezetről szól először, hanem a túlélésről. Aztán pár korty után mégis kialakul belőle egy kis saját rituálé.",
      "Egy sötétebb pörkölésű kávé mellé valahogy mindig jobban esik egy komorabb lejátszási lista is. Mintha a hangulat és az íz együtt húzná lejjebb a fényeket.",
      "Nem ugyanazért issza mindenki a kávét: van, aki az ízéért, más a rutinért, megint más csak azért, hogy kicsit jobban egyben maradjon. Pont ettől személyes ennyire.",
      "A cappuccino sok embernél azért marad kedvenc, mert egyszerre puha és karakteres. Nem akar túl erős lenni, de azért nem is tűnik el csendben.",
      "Esős időben a kávé nem mindig koffein kérdése. Néha inkább csak kell valami meleg, ami összerendezi a napot.",
      "Aki ristretto-t kér, az általában nem köröz sokat a döntés körül. Rövid, sűrű, erős, és pontosan tudja, mit akar.",
      "A reggeli első kávé sokszor többet jelent egy italnál. Inkább egy jelzés az agynak, hogy most már tényleg elindul a nap.",
      "Van az a késő délutáni kávé, ami már nem teljesen indokolt, mégis jól esik. Főleg akkor, ha közben valami lassabb zene szól a háttérben.",
      "A flat white-et sokan azért szeretik, mert nincsen benne felesleges körítés. Simább, tisztább, és pont attól tűnik komolyabbnak.",
      "A fekete kávé nem mindig keménységből választott ital. Néha csak az a jó benne, hogy nincs mit magyarázni rajta.",
      "Egy cozy kávés pillanat nem feltétlenül látványos. Elég hozzá egy sötétebb szoba, egy csendesebb playlist, és pár nyugodt perc.",
      "A mocha külön világa pont attól érdekes, hogy egyszerre dessert és kávé. Kicsit lágyítja a napot, de közben még mindig ott van benne az a sötétebb alap.",
      "Sokan nem a legerősebb kávét keresik, hanem azt, ami a saját tempójukhoz passzol. Van nap, amikor ez egy latte, és van, amikor valami jóval komolyabb.",
      "A kávé és a zene meglepően hasonlóan működik. Mindkettő tud háttér maradni, de ha eltalálja a hangulatot, az egész nap keretet kap tőle.",
      "A cortado olyan, mint egy rövid, jól megírt jelenet. Nem hosszú, nem túlbeszélt, mégis marad utána valami a levegőben.",
      "Hideg, szürke napokon valahogy még jobban kijön, mennyire fontos a kávé illata. Néha előbb megérkezik a hangulat, mint maga az első korty.",
      "Az esti kávéhangulat teljesen más műfaj, mint a reggeli. Kevésbé a tempóról szól, inkább arról, hogy még maradj kicsit ebben a pillanatban.",
      "A dupla espresso már ritkán semleges döntés. Általában akkor kerül elő, amikor a nap nem kérdez, csak tol tovább.",
      "Van, aki minden nap ugyanazt a kávét issza, mert abban talál biztos pontot. És van, aki pont azért váltogat, mert a hangulata sem mindig ugyanaz.",
      "Egy jó kávézási rutin sokszor nem látványos, mégis megtartó. Ugyanaz a csésze, ugyanaz a mozdulat, ugyanaz a pár perc csend.",
      "A hosszabb, tejesebb kávék sok embernél nem véletlenül népszerűek. Kicsit kevésbé érződnek harcnak, és jobban hagynak időt megérkezni a napba.",
      "A tripla espresso már inkább egy állapot, mint egy ital. Nem finomkodik, csak átlöki a napot a következő szakaszba.",
      "Van, amikor a kávé nem feldob, csak helyretesz. És őszintén, néha pont erre van inkább szükség.",
      "Az americano tisztább karaktere sokaknál azért működik, mert nem vonja el a figyelmet. Nincs körítés, csak a kávé maga és amit hozzáteszel hangulatban.",
      "Egy sötétebb, modern kávés hangulatban valahogy minden lassabbnak és filmesebbnek tűnik. A fények, a zene, az egész rutin kap egy kis jelenet-jelleget.",
      "A reggeli kávé első kortya néha jobb, mint maga a teljes ital. Abban az egy pillanatban sűrűsödik össze az egész ébredés reménye.",
      "A cappuccino és a latte közti választás néha nem ízlés, hanem hangulat dönti el. Az egyik puhább ölelés, a másik egy kicsit tisztább indulás.",
      "A kávévilág egyik legjobb része, hogy nincsen egyetlen jó válasz. Ugyanaz az ember sem ugyanazt kívánja hétfő reggel, mint péntek este.",
      "Vannak napok, amikor a kávé mellé nem motiváció kell, hanem atmoszféra. Egy kicsit sötétebb vibe, egy lassabb dal, és máris jobban a helyére kerül minden."
    ];

    const getCoffeeIndexForDate = (date) => {
      const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
      return Math.floor(utcDate / 86400000) % coffeeLibrary.length;
    };

    const getFactIndexForDate = (date) => {
      const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
      return (Math.floor(utcDate / 86400000) * 7 + 3) % coffeeFacts.length;
    };

    const formatDayLabel = (date) => {
      const formatter = new Intl.DateTimeFormat("hu-HU", {
        month: "long",
        day: "numeric",
        weekday: "long"
      });

      return `Mai ajánlat\n${formatter.format(date)}`;
    };

    const today = new Date();
    const todaysCoffee = coffeeLibrary[getCoffeeIndexForDate(today)];
    const todaysFact = coffeeFacts[getFactIndexForDate(today)];

    if (coffeeName) coffeeName.textContent = todaysCoffee.name;
    if (coffeeDesc) coffeeDesc.textContent = todaysCoffee.reason;
    if (coffeeDayLabel) coffeeDayLabel.textContent = formatDayLabel(today);
    if (coffeeClosing) coffeeClosing.textContent = closingText;
    if (coffeeFactText) coffeeFactText.textContent = todaysFact;
    if (coffeeFactDayLabel) coffeeFactDayLabel.textContent = formatDayLabel(today);

    if (coffeeTracks) {
      coffeeTracks.innerHTML = todaysCoffee.tracks.map((track) => `
        <li>
          <div>
            <span class="coffeeTrack__artist">${track.artist}</span>
            <span class="coffeeTrack__song">${track.song}</span>
          </div>
        </li>
      `).join("");
    }
  }
})();

const weekListEl = document.getElementById("weekList");
const weekTitleEl = document.getElementById("weekTitle");
const weekSubEl = document.getElementById("weekSub");
const weekChipEl = document.getElementById("weekChip");

const newsSlideEl = document.getElementById("newsSlide");
const newsPrev = document.getElementById("newsPrev");
const newsNext = document.getElementById("newsNext");
const newsDots = document.getElementById("newsDots");
const newsCount = document.getElementById("newsCount");

function getISOWeek(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

if (weekListEl && newsSlideEl && newsPrev && newsNext && newsDots) {
  const weekly = {
    title: "Heti menetrend",
    subtitle: "Mi jön mostanában az oldalon?",
    items: [
      "Új játék- vagy tech kritika előkészítés alatt.",
      "Friss ételes bejegyzés rövid verdicttel és pontszámmal.",
      "Kávé sarok bővítés új ajánlókkal és zenékkel."
    ]
  };

  const news = [
    { title: "Új kajás kritika készül", text: "A következő bejegyzésnél megint külön pontot kap a hangulat és az ár-érték is.", tag: "étel" },
    { title: "Tech teszt a listán", text: "Rövid távú használat után is átnézzük, mennyire élhető egy új kütyü a mindennapokban.", tag: "tech" },
    { title: "Játékfronton érkezik a következő verdict", text: "Sztori, gameplay és újraindítós faktor alapján kap majd pontszámot.", tag: "játék" }
  ];

  const week = getISOWeek(new Date());
  if (weekChipEl) weekChipEl.textContent = `W${String(week).padStart(2, "0")}`;
  if (weekTitleEl) weekTitleEl.textContent = weekly.title;
  if (weekSubEl) weekSubEl.textContent = weekly.subtitle;

  weekListEl.innerHTML = weekly.items.map((item) => `<li>${item}</li>`).join("");

  let i = 0;

  function renderDots() {
    newsDots.innerHTML = news.map((_, idx) => (
      `<span class="newsDot ${idx === i ? "active" : ""}" data-i="${idx}" role="button" aria-label="Hír ${idx + 1}"></span>`
    )).join("");

    newsDots.querySelectorAll(".newsDot").forEach((dot) => {
      dot.addEventListener("click", () => {
        i = Number(dot.getAttribute("data-i"));
        renderNews(true);
      });
    });
  }

  function renderNews(animate = false) {
    const item = news[i];
    if (!item) return;

    if (newsCount) newsCount.textContent = `${i + 1}/${news.length}`;

    const markup = `
      <div class="newsTitle">${item.title}</div>
      <div class="newsMeta">${item.tag ? `#${item.tag}` : ""}</div>
      <div class="muted">${item.text}</div>
    `;

    if (animate) {
      newsSlideEl.style.opacity = "0";
      newsSlideEl.style.transform = "translateY(4px)";
      setTimeout(() => {
        newsSlideEl.innerHTML = markup;
        newsSlideEl.style.opacity = "1";
        newsSlideEl.style.transform = "translateY(0)";
        renderDots();
      }, 140);
      return;
    }

    newsSlideEl.innerHTML = markup;
    renderDots();
  }

  function prev() {
    i = (i - 1 + news.length) % news.length;
    renderNews(true);
  }

  function next() {
    i = (i + 1) % news.length;
    renderNews(true);
  }

  newsPrev.addEventListener("click", prev);
  newsNext.addEventListener("click", next);

  let timer = setInterval(next, 8000);

  newsSlideEl.addEventListener("mouseenter", () => clearInterval(timer));
  newsSlideEl.addEventListener("mouseleave", () => {
    timer = setInterval(next, 8000);
  });

  renderNews(false);
}

(() => {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbClose = document.getElementById("lightboxClose");
  const links = document.querySelectorAll("a[data-lightbox]");

  if (!lb || !lbImg || !lbClose || !links.length) return;

  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      lbImg.src = a.getAttribute("href");
      lb.classList.add("show");
      lb.setAttribute("aria-hidden", "false");
    });
  });

  const close = () => {
    lb.classList.remove("show");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
  };

  lbClose.addEventListener("click", close);
  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();

(() => {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("imgModalImg");
  const closeBtn = document.getElementById("imgModalClose");

  if (!modal || !modalImg || !closeBtn) return;

  const open = (src, alt = "") => {
    modalImg.src = src;
    modalImg.alt = alt;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modalOpen");
  };

  const close = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    document.body.classList.remove("modalOpen");
  };

  document.querySelectorAll("a[data-lightbox]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const img = a.querySelector("img");
      open(a.getAttribute("href"), img?.alt || "");
    });
  });

  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();
