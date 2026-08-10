/**
 * Bilingual copy for the three landing concepts.
 *
 * Kept out of `messages/*.json` on purpose: these are competing design
 * directions, not shipped site chrome. When one wins, its block gets promoted
 * into the message catalogue and the rest are deleted with the routes.
 *
 * Clock times in the Ledger chronology and the delivery-zone list are
 * provisional and need the farm team's confirmation before anything is indexed.
 */

export type Locale = "en" | "es";

export const conceptIndex = [
  { slug: "market", letter: "A", image: "/images/gen-harvest-crate.png", dark: false },
  { slug: "ledger", letter: "B", image: "/images/gen-farm-rows.png", dark: false },
  { slug: "terrace", letter: "C", image: "/images/Hibiscus-07.jpg", dark: false },
] as const;

export type ConceptSlug = (typeof conceptIndex)[number]["slug"];

/* ------------------------------------------------------------------ hub ---- */

export const hubCopy = {
  en: {
    eyebrow: "Design directions",
    title: "Three ways to sell the same harvest",
    lede: "Same farm, same catalogue, same Tuesday-and-Friday routes. Each direction commits to a different design principle and therefore to a different buyer: the household that wants to order now, the chef who wants to audit you, and the reader who wants to be seduced.",
    how: "Open each one and scroll the whole page. The floating switcher moves between them without losing your place.",
    live: "Back to the current site",
    open: "Open direction",
    cards: {
      market: {
        tag: "Commerce-first",
        title: "Market",
        body: "The shop is the hero. A live countdown to the next order cutoff, filter chips across the real catalogue, prices on every card. Built to convert a first-time household order.",
        principle: "Conversion over atmosphere",
      },
      ledger: {
        tag: "Transparency dossier",
        title: "Ledger",
        body: "The logistics are the brand, so the page is built like a technical document: an hour-by-hour harvest chronology on a scroll rail, the harvest schedule as a table, every category with counts. Built for chefs and buyers.",
        principle: "Proof over persuasion",
      },
      terrace: {
        tag: "Warm editorial",
        title: "Terrace",
        body: "Sunlit appetite. Big warm photography, serif headlines, the box treated as a beautiful object, and a real seasonal recipe carrying its own structured data. Built for discovery and search.",
        principle: "Appetite over information",
      },
    },
  },
  es: {
    eyebrow: "Direcciones de diseño",
    title: "Tres formas de vender la misma cosecha",
    lede: "La misma finca, el mismo catálogo, las mismas rutas de martes y viernes. Cada dirección se compromete con un principio de diseño distinto y por lo tanto con un comprador distinto: la casa que quiere pedir ya, el chef que quiere auditarlo y el lector que quiere dejarse seducir.",
    how: "Abra cada una y recorra la página completa. El selector flotante permite cambiar entre ellas sin perder el lugar.",
    live: "Volver al sitio actual",
    open: "Abrir dirección",
    cards: {
      market: {
        tag: "Comercio primero",
        title: "Market",
        body: "La tienda es la protagonista. Cuenta regresiva en vivo hasta el próximo cierre de pedidos, filtros sobre el catálogo real y precio en cada tarjeta. Hecha para convertir el primer pedido de una casa.",
        principle: "Conversión antes que atmósfera",
      },
      ledger: {
        tag: "Expediente de trazabilidad",
        title: "Ledger",
        body: "La logística es la marca, así que la página está construida como un documento técnico: una cronología hora por hora sobre un riel de scroll, el calendario de cosecha en tabla y cada categoría con su conteo. Hecha para chefs y compradores.",
        principle: "Prueba antes que persuasión",
      },
      terrace: {
        tag: "Editorial cálida",
        title: "Terrace",
        body: "Apetito con luz de sol. Fotografía cálida y grande, titulares en serif, la caja tratada como objeto y una receta de temporada real con sus propios datos estructurados. Hecha para descubrimiento y buscadores.",
        principle: "Apetito antes que información",
      },
    },
  },
} as const;

export const switcherCopy = {
  en: { label: "Direction", hub: "All three", a: "A · Market", b: "B · Ledger", c: "C · Terrace" },
  es: { label: "Dirección", hub: "Las tres", a: "A · Market", b: "B · Ledger", c: "C · Terrace" },
} as const;

/* ------------------------------------------------------ A · Market --------- */

export const marketCopy = {
  en: {
    meta: {
      title: "Organic Produce Delivery in Guanacaste — Sámara, Nosara & Nicoya",
      description:
        "Order certified organic produce, eggs, dairy, bread and coffee from Blue Mountain Farms. Harvested Monday and Thursday at dawn, delivered refrigerated Tuesday and Friday across Guanacaste.",
      keywords: [
        "organic produce delivery Guanacaste",
        "organic vegetables Sámara Costa Rica",
        "Nosara organic delivery",
        "Nicoya organic farm box",
        "Costa Rica organic coffee delivery",
        "farm box Guanacaste",
      ],
    },
    nav: { shop: "What's ready", how: "How it works", box: "Weekly box", wholesale: "Restaurants", order: "Order now" },
    hero: {
      eyebrow: "Certified Blue Zone organics",
      title: "Harvested at dawn. At your door in eighteen hours.",
      body: "Order from this week's real harvest — greens, fruit, roots, eggs, dairy, bread and coffee, grown in the Blue Mountains of Guanacaste.",
      primary: "Start a weekly box",
      secondary: "Browse what's ready",
      countdownLabel: "Order by",
      deliveryLabel: "Arrives",
      harvestLabel: "Next harvest",
    },
    trust: [
      { value: "18 hrs", label: "Field to kitchen" },
      { value: "2×", label: "Deliveries each week" },
      { value: "100%", label: "Certified organic" },
      { value: "6", label: "Delivery zones" },
    ],
    catalog: {
      eyebrow: "This week's peak",
      title: "What's ready right now",
      note: "Live from the farm catalogue.",
      all: "Everything",
      order: "Order",
      view: "View",
      outOfSeason: "Back in",
      empty: "Nothing in this category this week — try another.",
      viewShop: "Browse the full shop",
      countLabel: "items",
    },
    box: {
      eyebrow: "The weekly box",
      title: "Let us choose, or choose yourself",
      body: "A standing box follows the harvest, so it changes with what the hillside is actually producing. Prefer to pick? Order à la carte from the full catalogue instead.",
      bullets: [
        "Adjust, pause or skip any week",
        "Swaps for anything you don't eat",
        "Add coffee, eggs, bread and dairy",
        "Refrigerated delivery to your door",
      ],
      primary: "Start your box",
      secondary: "Order à la carte",
    },
    how: {
      eyebrow: "How it works",
      title: "Three steps, twice a week",
    },
    wholesale: {
      eyebrow: "For restaurants & hotels",
      title: "Standing orders for kitchens",
      body: "Weekly availability lists, refrigerated delivery and consistent provenance for kitchens that get asked where the food came from.",
      whatsapp: "Order on WhatsApp",
    },
    zones: {
      eyebrow: "Delivery",
      title: "Where we deliver",
      body: "Refrigerated routes run Tuesday and Friday across the Nicoya peninsula. If you are just outside a zone, ask — we can often make it work.",
    },
    faq: {
      eyebrow: "Questions",
      title: "Ordering and delivery",
      items: [
        {
          q: "Do you deliver to Sámara, Nosara and Nicoya?",
          a: "Yes. Refrigerated routes run Tuesday and Friday across Sámara, Nosara, Nicoya, Playa Carrillo, Garza and the surrounding area. If you are just outside those zones, message us — we can often add a stop.",
        },
        {
          q: "When do I need to place my order?",
          a: "Orders placed Wednesday 6pm to Sunday 6pm are delivered Tuesday. Orders placed Sunday 6pm to Wednesday 6pm are delivered Friday. The countdown at the top of this page always shows the next cutoff.",
        },
        {
          q: "How fresh is the produce really?",
          a: "We harvest Monday and Thursday at dawn, cool and pack the same morning, and deliver the next day. For most items that is about eighteen hours from being cut to reaching your kitchen.",
        },
        {
          q: "Is everything certified organic?",
          a: "The produce, coffee and fruit are grown to certified organic standards on our own land in the Blue Mountains, with a small group of certified neighbour growers filling in seasonal specialties.",
        },
        {
          q: "What if something I ordered isn't ready that week?",
          a: "Real farms run out. If an item did not make the harvest we substitute something comparable or credit it — your choice, told to you before delivery, not after.",
        },
        {
          q: "Can I order as a restaurant or hotel?",
          a: "Yes. Wholesale runs on standing orders with a weekly availability list and the same refrigerated routes. Apply through the restaurants section or message us on WhatsApp.",
        },
      ],
    },
    footer: { tagline: "Certified Blue Zone organics from Chinampas, Guanacaste", concept: "Design direction A · Market" },
  },
  es: {
    meta: {
      title: "Entrega de orgánicos en Guanacaste — Sámara, Nosara y Nicoya",
      description:
        "Pida verduras, huevos, lácteos, pan y café orgánicos certificados de Blue Mountain Farms. Cosechados lunes y jueves al amanecer, entregados refrigerados martes y viernes en Guanacaste.",
      keywords: [
        "entrega de orgánicos Guanacaste",
        "verduras orgánicas Sámara Costa Rica",
        "entrega orgánica Nosara",
        "caja orgánica Nicoya",
        "café orgánico Costa Rica a domicilio",
        "caja de finca Guanacaste",
      ],
    },
    nav: { shop: "Qué hay listo", how: "Cómo funciona", box: "Caja semanal", wholesale: "Restaurantes", order: "Pedir ahora" },
    hero: {
      eyebrow: "Orgánicos certificados de Zona Azul",
      title: "Cosechado al amanecer. En su puerta en dieciocho horas.",
      body: "Pida de la cosecha real de esta semana — hojas verdes, fruta, raíces, huevos, lácteos, pan y café, cultivados en las Montañas Azules de Guanacaste.",
      primary: "Empezar caja semanal",
      secondary: "Ver qué hay listo",
      countdownLabel: "Pedir antes de",
      deliveryLabel: "Llega",
      harvestLabel: "Próxima cosecha",
    },
    trust: [
      { value: "18 h", label: "Del campo a la cocina" },
      { value: "2×", label: "Entregas por semana" },
      { value: "100%", label: "Orgánico certificado" },
      { value: "6", label: "Zonas de entrega" },
    ],
    catalog: {
      eyebrow: "El punto de esta semana",
      title: "Qué hay listo ahora",
      note: "En vivo desde el catálogo de la finca.",
      all: "Todo",
      order: "Pedir",
      view: "Ver",
      outOfSeason: "Vuelve en",
      empty: "Nada en esta categoría esta semana — pruebe otra.",
      viewShop: "Ver la tienda completa",
      countLabel: "productos",
    },
    box: {
      eyebrow: "La caja semanal",
      title: "Elegimos nosotros, o elige usted",
      body: "La caja fija sigue la cosecha, así que cambia con lo que de verdad está produciendo la ladera. ¿Prefiere escoger? Pida a la carta del catálogo completo.",
      bullets: [
        "Ajuste, pause o salte cualquier semana",
        "Cambios por lo que no consume",
        "Agregue café, huevos, pan y lácteos",
        "Entrega refrigerada a su puerta",
      ],
      primary: "Empezar su caja",
      secondary: "Pedir a la carta",
    },
    how: {
      eyebrow: "Cómo funciona",
      title: "Tres pasos, dos veces por semana",
    },
    wholesale: {
      eyebrow: "Para restaurantes y hoteles",
      title: "Pedidos fijos para cocinas",
      body: "Listas de disponibilidad semanal, entrega refrigerada y procedencia consistente para cocinas a las que les preguntan de dónde viene la comida.",
      whatsapp: "Pedir por WhatsApp",
    },
    zones: {
      eyebrow: "Entregas",
      title: "Dónde entregamos",
      body: "Las rutas refrigeradas salen martes y viernes por la península de Nicoya. Si queda justo afuera de una zona, pregunte — muchas veces se puede resolver.",
    },
    faq: {
      eyebrow: "Preguntas",
      title: "Pedidos y entregas",
      items: [
        {
          q: "¿Entregan en Sámara, Nosara y Nicoya?",
          a: "Sí. Las rutas refrigeradas salen martes y viernes por Sámara, Nosara, Nicoya, Playa Carrillo, Garza y alrededores. Si queda justo afuera de esas zonas, escríbanos — muchas veces podemos agregar una parada.",
        },
        {
          q: "¿Cuándo tengo que hacer el pedido?",
          a: "Los pedidos de miércoles 6pm a domingo 6pm se entregan el martes. Los de domingo 6pm a miércoles 6pm se entregan el viernes. La cuenta regresiva de arriba siempre muestra el próximo cierre.",
        },
        {
          q: "¿Qué tan fresco es de verdad?",
          a: "Cosechamos lunes y jueves al amanecer, enfriamos y empacamos esa misma mañana y entregamos al día siguiente. Para la mayoría de productos son unas dieciocho horas entre el corte y su cocina.",
        },
        {
          q: "¿Todo es orgánico certificado?",
          a: "Las verduras, el café y la fruta se cultivan bajo estándares orgánicos certificados en nuestra propia tierra en las Montañas Azules, con un grupo pequeño de vecinos certificados que aportan especialidades de temporada.",
        },
        {
          q: "¿Y si algo que pedí no está listo esa semana?",
          a: "Las fincas de verdad se quedan sin producto. Si algo no salió en la cosecha, sustituimos por algo comparable o lo acreditamos — usted decide, y se le dice antes de la entrega, no después.",
        },
        {
          q: "¿Puedo pedir como restaurante u hotel?",
          a: "Sí. El mayoreo funciona con pedidos fijos, lista de disponibilidad semanal y las mismas rutas refrigeradas. Aplique en la sección de restaurantes o escríbanos por WhatsApp.",
        },
      ],
    },
    footer: { tagline: "Orgánicos certificados de Zona Azul desde Chinampas, Guanacaste", concept: "Dirección de diseño A · Market" },
  },
} as const;

/* ------------------------------------------------------ B · Ledger --------- */

export const ledgerCopy = {
  en: {
    meta: {
      title: "Organic Sourcing Dossier — Harvest to Kitchen | Blue Mountain Farms",
      description:
        "The full sourcing record for Blue Mountain Farms: the hour-by-hour harvest chronology, the Monday/Thursday harvest and Tuesday/Friday delivery schedule, growing standards, grower profiles, and every category we carry with counts.",
      keywords: [
        "organic produce supplier Guanacaste",
        "restaurant produce delivery Costa Rica",
        "wholesale organic vegetables Nicoya",
        "farm traceability Costa Rica",
        "hotel produce supplier Sámara",
        "certified organic grower Guanacaste",
      ],
    },
    nav: { chronology: "Chronology", schedule: "Schedule", standard: "Standard", growers: "Growers", availability: "Availability", wholesale: "Wholesale" },
    masthead: {
      docLabel: "Sourcing dossier",
      docRef: "BMF / GUA / 01",
      title: "Every hour from cut to kitchen, documented",
      standfirst:
        "Most suppliers ask you to take freshness on faith. This is the record instead: when we cut, when we cool, when we load, when we arrive, who grew it, and exactly what we carry.",
      fields: [
        { label: "Origin", value: "Chinampas, Guanacaste, CR" },
        { label: "Harvest", value: "Monday & Thursday, dawn" },
        { label: "Delivery", value: "Tuesday & Friday, refrigerated" },
        { label: "Standard", value: "Certified organic" },
      ],
      cta: "Request the availability list",
      ctaAlt: "Message the farm",
    },
    chronology: {
      eyebrow: "Section 01",
      title: "One harvest cycle, hour by hour",
      note: "One cycle, from the row to the kitchen. Times are typical for a Monday harvest; the Thursday cycle mirrors it.",
      steps: [
        { time: "05:30", elapsed: "0 h", title: "Harvest begins", body: "Cutting starts at first light, while the field is still cool and the leaf has not lost water to the sun." },
        { time: "08:00", elapsed: "+2.5 h", title: "Washed and sorted in shade", body: "Everything is washed, graded and sorted under cover. Anything that will not travel well is pulled here, not at your door." },
        { time: "10:30", elapsed: "+5 h", title: "Cooled and crated", body: "Field heat is pulled out before packing. This single step is the difference between four days of shelf life and one." },
        { time: "15:00", elapsed: "+9.5 h", title: "Orders assembled by route", body: "Crates are built per customer and per route, so nothing is repacked in a van at the roadside." },
        { time: "06:00", elapsed: "+24.5 h", title: "Refrigerated routes leave", body: "Vehicles load cold and leave early the next morning, ahead of the day's heat and the day's traffic." },
        { time: "11:00", elapsed: "+29.5 h", title: "In your kitchen", body: "Produce arrives the morning after it was cut, still cold, having spent the night in refrigeration rather than on a shelf." },
      ],
    },
    schedule: {
      eyebrow: "Section 02",
      title: "The standing schedule",
      note: "Fixed, not best-effort. The cutoff is what makes the freshness possible.",
      columns: { order: "Order window", harvest: "Harvest", delivery: "Delivery" },
      rows: [
        { order: "Wednesday 6:00 pm — Sunday 6:00 pm", harvest: "Monday, dawn", delivery: "Tuesday" },
        { order: "Sunday 6:00 pm — Wednesday 6:00 pm", harvest: "Thursday, dawn", delivery: "Friday" },
      ],
    },
    standard: {
      eyebrow: "Section 03",
      title: "The growing standard",
      rows: [
        { label: "Certification", value: "Certified organic", detail: "Applies to our own land and to the neighbour growers we buy from." },
        { label: "Soil", value: "Volcanic, Blue Mountains", detail: "Mountain ground above Chinampas, farmed with methods handed down locally." },
        { label: "Inputs", value: "No synthetic pesticides", detail: "Eco-friendly cultivation across produce, fruit and coffee." },
        { label: "Cold chain", value: "Cooled pre-pack, refrigerated transit", detail: "Field heat removed the same morning, then held cold to the door." },
        { label: "Traceability", value: "Named land, named growers", detail: "Every line traces to our farm or to a named certified partner." },
        { label: "Region", value: "Nicoya Blue Zone", detail: "One of a handful of regions worldwide identified for unusual longevity." },
      ],
    },
    growers: {
      eyebrow: "Section 04",
      title: "Who grows it",
    },
    availability: {
      eyebrow: "Section 05",
      title: "What we carry",
      note: "Every category in the catalogue, with the number of lines currently listed. Availability moves with the season.",
      columns: { category: "Category", lines: "Lines", status: "Status" },
      inStock: "Listed",
      seasonal: "Seasonal",
      total: "Total lines",
    },
    wholesale: {
      eyebrow: "Section 06",
      title: "Wholesale terms",
      body: "Standing orders, a weekly availability list, and the same refrigerated routes that serve households. Built for kitchens that get asked where the food came from.",
      terms: [
        "Weekly availability list sent ahead of each cutoff",
        "Standing orders adjustable per week",
        "Refrigerated delivery Tuesday and Friday",
        "Zones: Sámara, Nosara, Nicoya, Carrillo and surrounds",
        "Substitutions agreed before delivery, never after",
        "WhatsApp for same-week changes",
      ],
      whatsapp: "Message the farm",
    },
    faq: {
      eyebrow: "Section 07",
      title: "Buyer questions",
      items: [
        {
          q: "Can you supply a restaurant consistently, or only when the harvest allows?",
          a: "Standing orders are built against a weekly availability list that goes out before each cutoff, so you commit to what actually exists rather than to a menu we hope to fill. Where a line falls short we agree the substitution before delivery.",
        },
        {
          q: "How long is it really between cutting and delivery?",
          a: "One night. Harvest is at dawn Monday and Thursday, cooling and packing happen the same morning, and refrigerated routes deliver the following day — so produce reaches your kitchen the morning after it was cut, never off a shelf.",
        },
        {
          q: "Which zones do the refrigerated routes reach?",
          a: "Sámara, Nosara, Nicoya, Playa Carrillo, Garza and the surrounding area, Tuesday and Friday. Kitchens just outside those zones should ask — a stop can often be added.",
        },
        {
          q: "Is the certification yours, or your suppliers'?",
          a: "Both. Our own land in the Blue Mountains is farmed to certified organic standards, and the small group of neighbour growers who supply seasonal specialties are certified as well.",
        },
        {
          q: "How many lines do you actually carry?",
          a: "The catalogue currently lists produce across greens, fruits, roots and bulbs, mushrooms, squash, eggs, dairy, bread, flour, grains, beans, rice, coffee, jams, spices, nuts and seeds. The availability table on this page shows the count in each.",
        },
        {
          q: "Can we visit the farm?",
          a: "Yes. The same land hosts our sister property, The Retreat at Blue Mountain Farms, so a farm visit can be arranged alongside a stay or as a straightforward buyer visit.",
        },
      ],
    },
    colophon: {
      concept: "Design direction B · Ledger",
      tagline: "Certified Blue Zone organics from Chinampas, Guanacaste",
      note: "Times and zones provisional pending farm confirmation.",
    },
  },
  es: {
    meta: {
      title: "Expediente de abastecimiento orgánico — De la cosecha a la cocina | Blue Mountain Farms",
      description:
        "El registro completo de abastecimiento de Blue Mountain Farms: la cronología hora por hora, el calendario de cosecha lunes/jueves y entrega martes/viernes, los estándares de cultivo, los productores y todas las categorías con su conteo.",
      keywords: [
        "proveedor de orgánicos Guanacaste",
        "entrega de producto para restaurantes Costa Rica",
        "verduras orgánicas al mayoreo Nicoya",
        "trazabilidad de finca Costa Rica",
        "proveedor para hoteles Sámara",
        "productor orgánico certificado Guanacaste",
      ],
    },
    nav: { chronology: "Cronología", schedule: "Calendario", standard: "Estándar", growers: "Productores", availability: "Disponibilidad", wholesale: "Mayoreo" },
    masthead: {
      docLabel: "Expediente de abastecimiento",
      docRef: "BMF / GUA / 01",
      title: "Cada hora del corte a la cocina, documentada",
      standfirst:
        "Casi todos los proveedores le piden creer en la frescura. Esto es el registro: cuándo cortamos, cuándo enfriamos, cuándo cargamos, cuándo llegamos, quién lo cultivó y exactamente qué manejamos.",
      fields: [
        { label: "Origen", value: "Chinampas, Guanacaste, CR" },
        { label: "Cosecha", value: "Lunes y jueves, al amanecer" },
        { label: "Entrega", value: "Martes y viernes, refrigerada" },
        { label: "Estándar", value: "Orgánico certificado" },
      ],
      cta: "Solicitar la lista de disponibilidad",
      ctaAlt: "Escribir a la finca",
    },
    chronology: {
      eyebrow: "Sección 01",
      title: "Un ciclo de cosecha, hora por hora",
      note: "Un ciclo, del surco a la cocina. Los horarios son típicos de una cosecha de lunes; el ciclo del jueves es igual.",
      steps: [
        { time: "05:30", elapsed: "0 h", title: "Empieza la cosecha", body: "El corte arranca con la primera luz, mientras el campo está fresco y la hoja no ha perdido agua al sol." },
        { time: "08:00", elapsed: "+2.5 h", title: "Lavado y selección bajo sombra", body: "Todo se lava, clasifica y selecciona bajo techo. Lo que no va a viajar bien se saca aquí, no en su puerta." },
        { time: "10:30", elapsed: "+5 h", title: "Enfriado y encajado", body: "Se retira el calor de campo antes de empacar. Ese solo paso es la diferencia entre cuatro días de vida útil y uno." },
        { time: "15:00", elapsed: "+9.5 h", title: "Pedidos armados por ruta", body: "Las cajas se arman por cliente y por ruta, así nada se reempaca en una van a la orilla del camino." },
        { time: "06:00", elapsed: "+24.5 h", title: "Salen las rutas refrigeradas", body: "Los vehículos cargan en frío y salen temprano al día siguiente, antes del calor y del tráfico." },
        { time: "11:00", elapsed: "+29.5 h", title: "En su cocina", body: "El producto llega la mañana siguiente al corte, todavía frío, después de pasar la noche en refrigeración y no en una estantería." },
      ],
    },
    schedule: {
      eyebrow: "Sección 02",
      title: "El calendario fijo",
      note: "Fijo, no según se pueda. El cierre de pedidos es lo que hace posible la frescura.",
      columns: { order: "Ventana de pedido", harvest: "Cosecha", delivery: "Entrega" },
      rows: [
        { order: "Miércoles 6:00 pm — Domingo 6:00 pm", harvest: "Lunes, al amanecer", delivery: "Martes" },
        { order: "Domingo 6:00 pm — Miércoles 6:00 pm", harvest: "Jueves, al amanecer", delivery: "Viernes" },
      ],
    },
    standard: {
      eyebrow: "Sección 03",
      title: "El estándar de cultivo",
      rows: [
        { label: "Certificación", value: "Orgánico certificado", detail: "Aplica a nuestra tierra y a los productores vecinos a quienes compramos." },
        { label: "Suelo", value: "Volcánico, Montañas Azules", detail: "Tierra de montaña sobre Chinampas, trabajada con métodos heredados localmente." },
        { label: "Insumos", value: "Sin pesticidas sintéticos", detail: "Cultivo ecológico en verduras, fruta y café." },
        { label: "Cadena de frío", value: "Enfriado antes de empacar, tránsito refrigerado", detail: "El calor de campo se retira esa misma mañana y se mantiene frío hasta la puerta." },
        { label: "Trazabilidad", value: "Tierra con nombre, productores con nombre", detail: "Cada línea se rastrea a nuestra finca o a un socio certificado identificado." },
        { label: "Región", value: "Zona Azul de Nicoya", detail: "Una de las pocas regiones del mundo identificadas por su longevidad excepcional." },
      ],
    },
    growers: {
      eyebrow: "Sección 04",
      title: "Quién lo cultiva",
    },
    availability: {
      eyebrow: "Sección 05",
      title: "Qué manejamos",
      note: "Todas las categorías del catálogo con la cantidad de líneas listadas hoy. La disponibilidad se mueve con la temporada.",
      columns: { category: "Categoría", lines: "Líneas", status: "Estado" },
      inStock: "Listado",
      seasonal: "De temporada",
      total: "Líneas totales",
    },
    wholesale: {
      eyebrow: "Sección 06",
      title: "Condiciones de mayoreo",
      body: "Pedidos fijos, lista de disponibilidad semanal y las mismas rutas refrigeradas que sirven a las casas. Hecho para cocinas a las que les preguntan de dónde viene la comida.",
      terms: [
        "Lista de disponibilidad enviada antes de cada cierre",
        "Pedidos fijos ajustables cada semana",
        "Entrega refrigerada martes y viernes",
        "Zonas: Sámara, Nosara, Nicoya, Carrillo y alrededores",
        "Sustituciones acordadas antes de entregar, nunca después",
        "WhatsApp para cambios de la misma semana",
      ],
      whatsapp: "Escribir a la finca",
    },
    faq: {
      eyebrow: "Sección 07",
      title: "Preguntas de compradores",
      items: [
        {
          q: "¿Pueden abastecer un restaurante de forma consistente o solo cuando da la cosecha?",
          a: "Los pedidos fijos se arman contra una lista de disponibilidad semanal que sale antes de cada cierre, así que usted se compromete con lo que existe y no con un menú que esperamos llenar. Cuando una línea no alcanza, la sustitución se acuerda antes de entregar.",
        },
        {
          q: "¿Cuánto tiempo pasa realmente entre el corte y la entrega?",
          a: "Una noche. La cosecha es al amanecer lunes y jueves, el enfriado y empaque ocurren esa misma mañana y las rutas refrigeradas entregan al día siguiente, así que el producto llega a su cocina la mañana siguiente al corte, nunca de una estantería.",
        },
        {
          q: "¿A qué zonas llegan las rutas refrigeradas?",
          a: "Sámara, Nosara, Nicoya, Playa Carrillo, Garza y alrededores, martes y viernes. Las cocinas justo afuera de esas zonas deberían preguntar — muchas veces se puede agregar una parada.",
        },
        {
          q: "¿La certificación es suya o de sus proveedores?",
          a: "Ambas. Nuestra tierra en las Montañas Azules se trabaja bajo estándares orgánicos certificados, y el grupo pequeño de productores vecinos que aporta especialidades de temporada también está certificado.",
        },
        {
          q: "¿Cuántas líneas manejan realmente?",
          a: "El catálogo lista producto en hojas verdes, frutas, raíces y bulbos, hongos, calabazas, huevos, lácteos, pan, harinas, granos, frijoles, arroz, café, mermeladas, especias, nueces y semillas. La tabla de disponibilidad de esta página muestra el conteo de cada una.",
        },
        {
          q: "¿Se puede visitar la finca?",
          a: "Sí. La misma tierra alberga nuestra propiedad hermana, The Retreat at Blue Mountain Farms, así que la visita se puede coordinar junto con una estadía o como visita de comprador.",
        },
      ],
    },
    colophon: {
      concept: "Dirección de diseño B · Ledger",
      tagline: "Orgánicos certificados de Zona Azul desde Chinampas, Guanacaste",
      note: "Horarios y zonas provisionales, a confirmar con la finca.",
    },
  },
} as const;

/* ----------------------------------------------------- C · Terrace --------- */

export const terraceCopy = {
  en: {
    meta: {
      title: "The Blue Zone Table — Organic Produce from Guanacaste, Costa Rica",
      description:
        "Organic greens, fruit, coffee and bread grown in the Blue Mountains of Guanacaste and delivered twice a week. What is in season now, what goes in the weekly box, and how to cook it.",
      keywords: [
        "Blue Zone food Costa Rica",
        "seasonal organic produce Guanacaste",
        "Costa Rica organic recipes",
        "farm to table Nicoya",
        "organic coffee Guanacaste",
        "weekly organic box Costa Rica",
      ],
    },
    nav: { table: "This week", box: "The box", growers: "Growers", recipe: "Recipe", order: "Order" },
    hero: {
      eyebrow: "Chinampas · Guanacaste",
      title: "Everything on this table grew about eighteen hours ago",
      body: "Certified organic greens, fruit, roots, eggs, bread and coffee from the Blue Mountains — picked at dawn Monday and Thursday, at your door Tuesday and Friday.",
      primary: "Start a weekly box",
      secondary: "See what's ready",
    },
    table: {
      eyebrow: "This week",
      title: "What the hillside is giving",
      body: "The list moves every week, because a real farm does. Here is what is at its peak right now.",
      cta: "Browse everything",
    },
    box: {
      eyebrow: "The weekly box",
      title: "A box that follows the harvest, not a catalogue",
      body: "We pack what is genuinely at its best that morning, cool it before it travels, and bring it to your door the next day. Swap anything you don't eat, pause any week you're away.",
      contents: "Typically inside",
      items: [
        "A base of leafy greens and herbs cut that morning",
        "Seasonal fruit — mango, citrus, star fruit, whatever has turned",
        "Roots and bulbs for the week's cooking",
        "Eggs, and dairy if you want it",
        "Bread from the bakery shelf",
        "Coffee grown on the same mountain",
      ],
      primary: "Start your box",
      secondary: "Order à la carte",
    },
    growers: {
      eyebrow: "The growers",
      title: "Named land, named people",
      body: "The home farm sits in the Blue Mountains above Chinampas — the same land that hosts our sister property, The Retreat. A small group of certified neighbours fills in the seasonal specialties.",
    },
    recipe: {
      eyebrow: "From the farm kitchen",
      title: "Roasted purple sweet potato with lime, chilli and farm greens",
      description:
        "The simplest way to eat two of the things this farm grows best. Sweet, hot, sharp and green, on one plate, in about forty minutes.",
      yield: "Serves 4",
      time: "40 minutes",
      timeLabel: "Total time",
      yieldLabel: "Yield",
      ingredientsLabel: "From the box",
      stepsLabel: "Method",
      ingredients: [
        "700 g organic purple sweet potato, scrubbed and cut into wedges",
        "3 tbsp cooking oil",
        "1 farm chilli, finely chopped, or to taste",
        "2 limes",
        "2 large handfuls of farm greens",
        "Sea salt and black pepper",
        "60 g fresh cheese, optional",
      ],
      steps: [
        { name: "Heat the oven", text: "Heat the oven to 220°C. Line a large tray." },
        { name: "Roast the wedges", text: "Toss the wedges with the oil, a good pinch of salt and half the chilli. Spread them out and roast 25 to 30 minutes, turning once, until the edges caramelise." },
        { name: "Make the dressing", text: "Squeeze the limes and whisk the juice with the remaining chilli and a pinch of salt." },
        { name: "Build the plate", text: "Toss the greens in most of the dressing, pile the hot wedges on top, spoon over the rest, and crumble the cheese across if you're using it." },
      ],
    },
    rhythm: {
      eyebrow: "The rhythm",
      title: "Twice a week, on purpose",
    },
    chefs: {
      eyebrow: "For chefs",
      title: "If you cook for a living",
      body: "Standing orders, a weekly availability list, and refrigerated delivery on the same Tuesday and Friday routes. Provenance you can say out loud to a table.",
      cta: "Apply for wholesale",
      whatsapp: "Message the farm",
    },
    faq: {
      eyebrow: "Good to know",
      title: "Before your first box",
      items: [
        {
          q: "What actually comes in a weekly box?",
          a: "A base of leafy greens and herbs cut that morning, seasonal fruit, roots and bulbs for cooking, and eggs if you want them. Bread, dairy and coffee can be added. The exact list changes weekly with the harvest.",
        },
        {
          q: "Can I swap things I don't eat?",
          a: "Yes. Tell us once and we will keep it out of every box. You can also pause or skip any week you are away.",
        },
        {
          q: "When does it arrive?",
          a: "Tuesday or Friday, depending on when you order. Orders in by Sunday 6pm come Tuesday; orders in by Wednesday 6pm come Friday.",
        },
        {
          q: "Where does the coffee come from?",
          a: "The same mountain. It is grown, picked and roasted on the farm in the Blue Mountains above Chinampas, and it is the same coffee guests drink at The Retreat.",
        },
        {
          q: "Is the fruit really seasonal?",
          a: "Yes, which means mango in the spring and citrus around the coffee harvest, rather than everything all year. It is the honest trade-off for produce that is a day old rather than a fortnight.",
        },
      ],
    },
    close: {
      title: "Start with one box",
      body: "One delivery is usually enough to tell the difference. If it isn't, tell us and we'll fix it.",
      primary: "Start your box",
      secondary: "Browse the shop",
    },
    footer: { tagline: "Certified Blue Zone organics from Chinampas, Guanacaste", concept: "Design direction C · Terrace" },
  },
  es: {
    meta: {
      title: "La mesa de la Zona Azul — Orgánicos de Guanacaste, Costa Rica",
      description:
        "Hojas verdes, fruta, café y pan orgánicos cultivados en las Montañas Azules de Guanacaste y entregados dos veces por semana. Qué está en temporada, qué trae la caja semanal y cómo cocinarlo.",
      keywords: [
        "comida Zona Azul Costa Rica",
        "productos orgánicos de temporada Guanacaste",
        "recetas orgánicas Costa Rica",
        "de la finca a la mesa Nicoya",
        "café orgánico Guanacaste",
        "caja orgánica semanal Costa Rica",
      ],
    },
    nav: { table: "Esta semana", box: "La caja", growers: "Productores", recipe: "Receta", order: "Pedir" },
    hero: {
      eyebrow: "Chinampas · Guanacaste",
      title: "Todo lo que está en esta mesa creció hace unas dieciocho horas",
      body: "Hojas verdes, fruta, raíces, huevos, pan y café orgánicos certificados de las Montañas Azules — recogidos al amanecer lunes y jueves, en su puerta martes y viernes.",
      primary: "Empezar caja semanal",
      secondary: "Ver qué hay listo",
    },
    table: {
      eyebrow: "Esta semana",
      title: "Lo que está dando la ladera",
      body: "La lista cambia cada semana, porque una finca de verdad cambia. Esto es lo que está en su punto ahora.",
      cta: "Ver todo",
    },
    box: {
      eyebrow: "La caja semanal",
      title: "Una caja que sigue la cosecha, no un catálogo",
      body: "Empacamos lo que de verdad está en su mejor momento esa mañana, lo enfriamos antes de que viaje y lo llevamos a su puerta al día siguiente. Cambie lo que no consume, pause cualquier semana que no esté.",
      contents: "Normalmente trae",
      items: [
        "Una base de hojas verdes y hierbas cortadas esa mañana",
        "Fruta de temporada — mango, cítricos, carambola, lo que haya cuajado",
        "Raíces y bulbos para la cocina de la semana",
        "Huevos, y lácteos si los quiere",
        "Pan de la panadería",
        "Café cultivado en la misma montaña",
      ],
      primary: "Empezar su caja",
      secondary: "Pedir a la carta",
    },
    growers: {
      eyebrow: "Los productores",
      title: "Tierra con nombre, gente con nombre",
      body: "La finca madre está en las Montañas Azules sobre Chinampas — la misma tierra que alberga nuestra propiedad hermana, The Retreat. Un grupo pequeño de vecinos certificados aporta las especialidades de temporada.",
    },
    recipe: {
      eyebrow: "De la cocina de la finca",
      title: "Camote morado al horno con limón, chile y hojas verdes",
      description:
        "La forma más simple de comer dos de las cosas que esta finca hace mejor. Dulce, picante, ácido y verde, en un plato, en unos cuarenta minutos.",
      yield: "Para 4",
      time: "40 minutos",
      timeLabel: "Tiempo total",
      yieldLabel: "Rinde",
      ingredientsLabel: "De la caja",
      stepsLabel: "Preparación",
      ingredients: [
        "700 g de camote morado orgánico, lavado y cortado en gajos",
        "3 cdas de aceite",
        "1 chile de la finca, picado fino, o al gusto",
        "2 limones",
        "2 puñados grandes de hojas verdes de la finca",
        "Sal marina y pimienta negra",
        "60 g de queso fresco, opcional",
      ],
      steps: [
        { name: "Calentar el horno", text: "Caliente el horno a 220°C. Forre una bandeja grande." },
        { name: "Hornear los gajos", text: "Mezcle los gajos con el aceite, una buena pizca de sal y la mitad del chile. Extiéndalos y hornee de 25 a 30 minutos, volteando una vez, hasta que los bordes caramelicen." },
        { name: "Hacer el aderezo", text: "Exprima los limones y bata el jugo con el resto del chile y una pizca de sal." },
        { name: "Armar el plato", text: "Mezcle las hojas con casi todo el aderezo, monte encima los gajos calientes, agregue el resto del aderezo y desmenuce el queso por encima si lo usa." },
      ],
    },
    rhythm: {
      eyebrow: "El ritmo",
      title: "Dos veces por semana, a propósito",
    },
    chefs: {
      eyebrow: "Para chefs",
      title: "Si cocina para vivir",
      body: "Pedidos fijos, lista de disponibilidad semanal y entrega refrigerada en las mismas rutas de martes y viernes. Procedencia que puede decir en voz alta en una mesa.",
      cta: "Aplicar a mayoreo",
      whatsapp: "Escribir a la finca",
    },
    faq: {
      eyebrow: "Bueno saber",
      title: "Antes de su primera caja",
      items: [
        {
          q: "¿Qué trae realmente la caja semanal?",
          a: "Una base de hojas verdes y hierbas cortadas esa mañana, fruta de temporada, raíces y bulbos para cocinar, y huevos si los quiere. Se pueden agregar pan, lácteos y café. La lista exacta cambia cada semana con la cosecha.",
        },
        {
          q: "¿Puedo cambiar cosas que no consumo?",
          a: "Sí. Dígalo una vez y lo dejamos fuera de todas las cajas. También puede pausar o saltar cualquier semana que no esté.",
        },
        {
          q: "¿Cuándo llega?",
          a: "Martes o viernes, según cuándo pida. Pedidos hasta domingo 6pm llegan el martes; pedidos hasta miércoles 6pm llegan el viernes.",
        },
        {
          q: "¿De dónde viene el café?",
          a: "De la misma montaña. Se cultiva, recoge y tuesta en la finca en las Montañas Azules sobre Chinampas, y es el mismo café que toman los huéspedes en The Retreat.",
        },
        {
          q: "¿La fruta es realmente de temporada?",
          a: "Sí, lo que significa mango en la primavera y cítricos alrededor de la cosecha de café, en vez de todo todo el año. Es el intercambio honesto por producto de un día y no de quince.",
        },
      ],
    },
    close: {
      title: "Empiece con una caja",
      body: "Con una entrega normalmente se nota la diferencia. Si no se nota, dígalo y lo resolvemos.",
      primary: "Empezar su caja",
      secondary: "Ver la tienda",
    },
    footer: { tagline: "Orgánicos certificados de Zona Azul desde Chinampas, Guanacaste", concept: "Dirección de diseño C · Terrace" },
  },
} as const;
