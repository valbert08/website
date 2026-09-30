// English / Spanish toggle.
// Elements marked data-i18n="key" get their Spanish HTML from ES below; the English
// is whatever is already in the page. The choice is remembered across pages.
(function () {
  const a = (href, text) => `<a href="${href}" target="_blank">${text}</a>`;
  const UNC = 'https://www.unc.edu';
  const GCA = 'https://globalcitizenshipalliance.org';
  const YONSEI = 'https://www.yonsei.ac.kr';

  const ES = {
    'brand.explore': '¡Explora!',

    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.resume': 'Mi Resumé',
    'nav.content': 'Contenido',

    'tile.linkedin': 'LinkedIn',
    'tile.certificates': 'Certificados',
    'tile.education': 'Educación',
    'tile.gallery': 'Galería',
    'tile.music': 'Música',
    'tile.testimonials': 'Testimonios',

    'title.about': 'Sobre mí',
    'title.certificates': 'Certificados y honores',
    'title.content': 'Creación de contenido',
    'title.education': 'Educación',
    'title.gallery': 'Galería',
    'title.music': 'Música',
    'title.testimonials': 'Testimonios',

    'home.bubble': '¡Hola, soy Alberto! Gracias por pasar.',
    'home.headline': 'Economista, mercadólogo y vocalista',
    'home.intro':
      `Soy estudiante de Economía en ${a(UNC, 'UNC-Chapel Hill')} y aspiro a ser profesional de los negocios. ` +
      `He estudiado teoría macroeconómica y microeconómica en programas de tres países: ${a(GCA, 'GCA')} en Austria, ` +
      `${a(YONSEI, 'Yonsei University')} en Corea y ${a(UNC, 'UNC')} en Estados Unidos. Ahora construyo una carrera ` +
      `en compras públicas, donde pueda seguir contribuyendo al desarrollo público. ¿Quieres conocer la historia completa? ` +
      `Visita <a href="about.html">Sobre mí</a>.`,

    'dict.noun': 'sustantivo',

    'content.subtitle':
      'Editorial sobre la industria de los videojuegos y videos de formato corto, investigados, producidos y publicados de principio a fin.',
    'content.word': 'comunicación',
    'content.pron': 'co·mu·ni·ca·ción | ko-mu-ni-ka-ˈsjon',
    'content.def1':
      'acción o proceso de usar palabras, sonidos, signos o comportamientos para expresar o intercambiar información, ' +
      'o para expresar pensamientos, sentimientos, etc., a otra persona',
    'content.ex1': 'la función de las feromonas en la comunicación de los insectos',
    'content.ex2': 'comunicación no verbal',
    'content.ex3': 'una ruptura en la comunicación entre los miembros del grupo',
    'content.ex4': 'Estamos en comunicación por correo electrónico.',
    'content.filter.all': 'Todo',
    'content.tag.rapid': 'Respuesta rápida',
    'content.tag.analysis': 'Análisis',
    'content.tag.explainers': 'Explicativos',
    'content.video1': 'La contradicción de Epic Games con la IA',
    'content.video2': 'El reajuste corporativo de $250 millones de Microsoft',
    'content.video3': 'La multa a Nintendo por el drift de los Joy-Con',
    'content.video4': 'En qué se equivocan los mercadólogos de videojuegos',
    'content.video5': 'La estrategia de retención de Xbox y Discord',
    'content.video6': 'Realismo vs. jugabilidad en Splinter Cell',

    'music.word': 'pasión',
    'music.pron': 'pa·sión | pa-ˈsjon',
    'music.def1': 'emoción fuerte y casi incontrolable',
    'music.ex1': 'sus pasiones lo dominaban',
    'music.def2': 'entusiasmo o deseo intenso por algo',
    'music.ex2': 'una pasión por la música',

    'about.greeting': '¡Hola! ¡Mucho gusto!',
    'about.intro1':
      `Soy Alberto, estudiante de último año de Economía en ${a(UNC, 'UNC-Chapel Hill')}. Mi formación en economía me ha ` +
      `llevado desde la ${a(GCA, 'Global Citizenship Alliance')} en Austria hasta ${a(YONSEI, 'Yonsei University')} en Corea, ` +
      `donde estudié macroeconomía y gestión estratégica, y de regreso a ${a(UNC, 'UNC')}. Estudiar en tres países me mostró ` +
      `cómo los mercados y las instituciones públicas moldean la vida cotidiana. Mi trabajo en participación cívica convirtió ` +
      `eso en un compromiso con el servicio público.`,
    'about.intro2':
      'Las artes también forman parte de ese compromiso. Cubrir noticias de última hora sobre videojuegos afinó mi voz de ' +
      'marketing y me enseñó a explicar temas complejos con claridad a un público en línea, y a tomar esa responsabilidad en ' +
      'serio. La música también es donde vive mi amor por las artes. Vivir es experimentar el arte, y esa es gran parte de la ' +
      'razón por la que la gente trabaja. Que el arte forme parte de la vida de todos depende de una actividad económica justa ' +
      'y accesible entre empresas, trabajadores y consumidores. Esa convicción es lo que me atrae a las compras públicas: la ' +
      'forma en que los gobiernos adquieren y gastan decide qué servicios y oportunidades llegan al público.',
    'about.journey1':
      `Soy cubanoamericano de primera generación, criado en Miami. Mi camino hacia el liderazgo comenzó con la mentoría en ` +
      `${a('https://www.mdc.edu/honorscollege/', 'el Honors College de Miami Dade College')}, donde el trabajo administrativo ` +
      `en la escuela y el liderazgo dentro de ${a('https://www.fbla.org', 'FBLA')} construyeron mi base.`,
    'about.journey2':
      `Esa base me llevó a Europa por primera vez con la ${a(GCA, 'Global Citizenship Alliance')}, luego a la participación ` +
      `cívica y, de ahí, a ventas en First Wave AI, donde aprendí a vender y a construir relaciones profesionalmente.`,
    'about.journey3':
      `Llevé ese impulso a una transferencia a ${a(UNC, 'UNC-Chapel Hill')}, que elegí sobre otras ofertas de Babson College, ` +
      `la University of Wisconsin, USC, UCF y FSU.`,
    'about.journey4':
      `En ${a(UNC, 'UNC')}, la econometría ha sido mi mayor reto académico hasta ahora. Al mismo tiempo, empecé en ` +
      `Demystified Studios como tester de QA para un programa educativo de emprendimiento empresarial, y luego pasé a una ` +
      `pasantía de marketing.`,
    'about.journey5':
      `Ese puesto me llevó a ${a(YONSEI, 'Yonsei University')} en Corea del Sur, donde estudié macroeconomía y gestión estratégica.`,
    'about.journey6':
      'Hoy aspiro a ser profesional de compras. Procuro trabajar de manera integral, y esa variedad de experiencias, entre ' +
      'culturas, países e industrias, ha afinado las habilidades interpersonales que llevo a cada espacio.',
  };

  const KEY = 'site-lang';
  const root = document.documentElement;

  function apply(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      const es = ES[el.dataset.i18n];
      el.innerHTML = lang === 'es' && es !== undefined ? es : el.dataset.en;
    });
    root.lang = lang;
    // Text length changes can change heights; let fit-scale.js re-measure.
    window.dispatchEvent(new Event('resize'));
  }

  // localStorage remembers the choice on the live site. window.name also carries it to the
  // next page in the same tab, which covers local file:// viewing (Firefox gives each local
  // file its own storage, so localStorage alone doesn't reach other pages there).
  const NAME_RE = /(?:^|;)site-lang=(en|es)/;

  function saved() {
    const fromName = window.name.match(NAME_RE);
    if (fromName) return fromName[1];
    try { return localStorage.getItem(KEY) === 'es' ? 'es' : 'en'; } catch (e) { return 'en'; }
  }

  function save(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    const rest = window.name.replace(NAME_RE, '');
    window.name = (rest ? rest + ';' : '') + 'site-lang=' + lang;
  }

  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = root.lang === 'es' ? 'en' : 'es';
      save(next);
      apply(next);
    });
  });

  apply(saved());
})();
