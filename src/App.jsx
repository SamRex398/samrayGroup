import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clapperboard,
  Factory,
  Globe2,
  Handshake,
  Layers3,
  MapPin,
  Menu,
  ShieldCheck,
  Sun,
  Trophy,
  Wheat,
  X,
} from "lucide-react";
import { IMG, LOGO } from "./lib/images";

const SECTORS = [
  {
    name: "Energy",
    label: "Our core business",
    href: "/businesses/energy",
    icon: Sun,
    image: IMG.solar,
    copy: "Developing solar and hybrid power infrastructure for industry and communities across Africa.",
    number: "01",
  },
  {
    name: "Agriculture",
    label: "Other interests",
    href: "/businesses/agriculture",
    icon: Wheat,
    image: IMG.farm,
    copy: "Cultivating and processing crops across western Nigeria, with a focus on dependable supply.",
    number: "02",
  },
  {
    name: "Sports",
    label: "Other interests",
    href: "/businesses/sports",
    icon: Trophy,
    image: IMG.sports,
    copy: "Creating opportunities for athletes through specialist facilities and development pathways.",
    number: "03",
  },
  {
    name: "Technology & Media",
    label: "Group interests",
    href: "/businesses/technology-media",
    icon: Clapperboard,
    image: IMG.technologyMedia,
    copy: "Exploring production, visual communications and digital platform capabilities.",
    number: "04",
  },
];

const PROJECTS = [
  {
    name: "Solar PV Project",
    sector: "Energy",
    place: "Lubumbashi, Democratic Republic of Congo",
    shortPlace: "Democratic Republic of Congo",
    capacity: "100 MWac",
    technology: "Solar photovoltaic",
    customers: "Mining and industrial users",
    commercial: "Long-term power purchase agreements",
    developers: "Joint venture",
    status: "In development",
    href: "/projects/drc",
    image: IMG.solar,
    eyebrow: "Utility-scale solar",
    summary:
      "A proposed solar platform designed to serve Copperbelt mining and industrial customers.",
  },
  {
    name: "Central African Republic Solar Program",
    sector: "Energy",
    place: "Central African Republic",
    shortPlace: "Central African Republic",
    capacity: "Up to 200 MWc",
    technology: "Solar PV hybridized with existing generation",
    customers: "Towns and communities",
    commercial: "Phased program",
    developers: "Developed with the Government under an MoU",
    status: "In development",
    href: "/projects/car",
    image: IMG.heroRig,
    eyebrow: "Solar hybridization",
    summary:
      "A framework for adding solar generation to existing electricity systems across 16 towns.",
  },
];

const EXPERIENCE_REFERENCES = [
  {
    title: "Engineering, studies & consultancy",
    entries: [
      ["Xodus Group", "FHN", "Ogini Project: process simulation, capacity check, process sizing, heat and material balance, and flow assurance", "FPSO, offshore, Nigeria"],
      ["Folawiyo Aje Services Ltd", "Yinka Folawiyo Petroleum", "Aje FPSO: study of a treatment program for well fluid", "FPSO, offshore, Nigeria"],
      ["Fjords Processing Ltd", "SNEPCo", "Bonga FPSO: study for the revamp of the crude processing system", "FPSO, offshore, Nigeria"],
      ["Fjords Processing Ltd", "Total", "Amenam Kpono: consultancy on oil-water treatment and supply of a degassing drum", "Platform, offshore, Nigeria"],
    ],
  },
  {
    title: "Site, lifecycle & asset integrity services",
    entries: [
      ["Xodus Group", "Newcross E&P Company Ltd", "Awoba Project: asset integrity services", "Onshore, Nigeria"],
      ["Xodus Group", "Topic SA", "Helm Project: asset verification services (Capex and Opex) and drilling services", "Onshore, Tunisia"],
      ["PJ Valves", "ENI", "Zohr Project: commissioning and start-up, valve maintenance and repair", "Onshore, Egypt"],
      ["Folawiyo Aje Services Ltd", "Yinka Folawiyo Petroleum", "Aje FPSO: in-situ well-fluid inspections and testing", "FPSO, offshore, Nigeria"],
      ["Folawiyo Aje Services Ltd", "Yinka Folawiyo Petroleum", "Aje FPSO: debottlenecking of HP separator, produced-water treatment vessel and slop tank", "FPSO, offshore, Nigeria"],
      ["Fjords Processing Ltd", "ExxonMobil", "Erha FPSO: debottlenecking of emulsion heater treater", "FPSO, offshore, Nigeria"],
      ["Aker Solutions Nigeria Ltd", "Shell Petroleum Development Company", "Bonny Terminal: debottlenecking and supply of spare parts for indirect fired heaters A, B and C", "Onshore, Nigeria"],
      ["Aker Solutions Nigeria Ltd", "Shell Petroleum Development Company", "Sea Eagle FPSO: revamping of electrostatic coalescer and supply of spares", "Offshore shallow waters, Nigeria"],
    ],
  },
  {
    title: "Procurement & supply",
    entries: [
      ["Folawiyo Aje Services Ltd", "Yinka Folawiyo Petroleum", "Aje FPSO: supply of solenoid valves", "FPSO, offshore, Nigeria"],
      ["Folawiyo Aje Services Ltd", "Yinka Folawiyo Petroleum", "Aje FPSO: supply of pipeline accessories", "Onshore, Nigeria"],
      ["Folawiyo Aje Services Ltd", "Yinka Folawiyo Petroleum", "Aje FPSO: supply of chemicals", "FPSO, offshore, Nigeria"],
      ["Folawiyo Aje Services Ltd", "Yinka Folawiyo Petroleum", "Aje FPSO: supply of spare parts (multiple orders)", "FPSO, offshore, Nigeria"],
      ["Levene Energy Development Company", "IDSL", "OML 22 and Benue Trough: ongoing consultancy and supply of 2D seismic equipment and spares", "Onshore, Nigeria"],
    ],
  },
];

const ROUTES = {
  "/": "home",
  "/about": "about",
  "/whatwedo": "whatwedo",
  "/projects": "projects",
  "/projects/drc": "drc",
  "/projects/car": "car",
  "/experience": "experience",
  "/otherinterests": "otherinterests",
  "/partner": "partner",
  "/contact": "contact",
  "/legal": "legal",
  "/privacy": "privacy",
  "/businesses/energy": "energy",
  "/businesses/agriculture": "agriculture",
  "/businesses/sports": "sports",
  "/businesses/technology-media": "technology-media",
};

const NAV_LINKS = [
  ["About", "/about"],
  ["What we do", "/whatwedo"],
  ["Projects", "/projects"],
  ["Experience", "/experience"],
  ["Partner with us", "/partner"],
];

const PAGE_META = {
  home: [
    "Samray Group | Building Africa's future",
    "Samray Group brings together energy infrastructure, agriculture, sports, and technology and media interests.",
  ],
  about: [
    "About Samray Group",
    "Learn about Samray Group, our operating roots in Nigeria, and our interests across Africa.",
  ],
  whatwedo: [
    "What We Do | Samray Energy Solutions",
    "Solar and hybrid power development, plus technical energy services including engineering and equipment supply.",
  ],
  projects: [
    "Projects | Samray Energy Solutions",
    "Samray is developing a 100 MW solar project in the DRC and a program of up to 200 MW of solar hybridization in the Central African Republic.",
  ],
  drc: [
    "Solar PV Project, DRC | 100 MW Solar | Samray",
    "A proposed 100 MW solar PV project near Lubumbashi, serving Copperbelt mining and industrial customers.",
  ],
  car: [
    "CAR Solar Program | 200 MW Solar Hybridization | Samray",
    "A program of up to 200 MW of solar hybridization in the Central African Republic, developed with the Government under an MoU.",
  ],
  experience: [
    "Oil and Gas Experience | Samray Energy Solutions Ltd",
    "Selected references for engineering services, equipment supply and commissioning in Nigeria, Tunisia and Egypt.",
  ],
  otherinterests: [
    "Other Interests | Samray Group",
    "Samray maintains selected interests in agriculture and sports alongside its energy infrastructure business.",
  ],
  partner: [
    "Partner With Us | Samray Energy Solutions",
    "Samray works with financiers, technical partners and offtakers to bring African solar and hybrid power projects to delivery.",
  ],
  contact: [
    "Contact | Samray Group",
    "Contact Samray about partnerships, project information or technical services.",
  ],
  legal: ["Legal Notice | Samray Group", "Important information about Samray's website and project summaries."],
  privacy: ["Privacy | Samray Group", "How Samray handles information submitted through its website."],
  energy: [
    "Samray Energy Solutions | African Energy Infrastructure Developer",
    "Samray Energy Solutions develops solar and hybrid power infrastructure across Africa.",
  ],
  agriculture: [
    "Agriculture | Samray Group",
    "Samray Foods cultivates and processes crops across western Nigeria.",
  ],
  sports: [
    "Sports | Samray Group",
    "Samray Sports Academy supports fencing through specialist facilities and athlete pathways.",
  ],
  "technology-media": [
    "Technology & Media | Samray Group",
    "Samray Group's interests in content production, visual communications and digital platforms.",
  ],
};

function getPath() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function PageMeta({ page }) {
  useEffect(() => {
    const [title, description] = PAGE_META[page] || PAGE_META.home;
    const canonical = `https://www.samraygroup.com${getPath()}`;
    document.title = title;

    const updateMeta = (selector, attribute, value) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, value);
    };

    updateMeta('meta[name="description"]', "content", description);
    updateMeta('meta[property="og:title"]', "content", title);
    updateMeta('meta[property="og:description"]', "content", description);
    updateMeta('meta[property="og:url"]', "content", canonical);
    updateMeta('meta[name="twitter:title"]', "content", title);
    updateMeta('meta[name="twitter:description"]', "content", description);
    updateMeta('meta[name="twitter:url"]', "content", canonical);
    updateMeta('link[rel="canonical"]', "href", canonical);
  }, [page]);

  return null;
}

function Reveal({ children, className = "", delay = 0, direction = "up", threshold = 0.12 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (
      !node ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-from-${direction} ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function RevealText({ text, as: Element = "span", className = "", lineBreakAfter = [], accentFromWord = -1 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const words = text.trim().split(/\s+/);

  useEffect(() => {
    const node = ref.current;
    if (
      !node ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Element
      ref={ref}
      className={`reveal-text ${visible ? "is-visible" : ""} ${className}`}
      aria-label={text}
    >
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className="reveal-text-mask">
              <span className={`reveal-text-word ${index >= accentFromWord ? "reveal-text-accent" : ""}`} style={{ "--word-delay": `${index * 55}ms` }}>{word}</span>
            </span>
            {index < words.length - 1 && " "}
            {lineBreakAfter.includes(index + 1) && <br />}
          </span>
        ))}
      </span>
    </Element>
  );
}

function RadialRayBackground() {
  return (
    <div className="cta-rays" aria-hidden="true">
      <svg className="cta-rays-svg" viewBox="0 0 600 600" focusable="false">
        {Array.from({ length: 36 }, (_, index) => (
          <line
            key={index}
            x1="300"
            y1="300"
            x2="300"
            y2="0"
            transform={`rotate(${index * 10} 300 300)`}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
        <circle cx="300" cy="300" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}

function Brand({ inverse = false, energy = false }) {
  return (
    <a
      className={`brand ${inverse ? "brand-inverse" : ""}`}
      href={energy ? "/businesses/energy" : "/"}
      aria-label={energy ? "Samray Energy Solutions" : "Samray Group home"}
    >
      <img src={inverse ? LOGO.dark : LOGO.light} alt="Samray" />
      <span className="brand-suffix">{energy ? "ENERGY" : "GROUP"}</span>
    </a>
  );
}

function Header({ darkHero = false, energy = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const headerClass = [
    "site-header",
    darkHero && !scrolled ? "header-transparent" : "",
    scrolled ? "header-scrolled" : "",
    open ? "header-menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <div className="header-inner">
        <Brand energy={energy} />
        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_LINKS.map(([label, href]) => (
            <a href={href} key={label}>{label}</a>
          ))}
        </nav>
        <a className="button button-small header-cta" href="/contact">
          Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? "mobile-nav-open" : ""}`}
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {NAV_LINKS.map(([label, href]) => (
          <a href={href} key={label} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a href="/contact" onClick={() => setOpen(false)}>Contact Samray <ArrowUpRight size={15} /></a>
      </nav>
    </header>
  );
}

function Eyebrow({ children, light = false, icon: Icon }) {
  return (
    <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      {Icon && <Icon size={14} aria-hidden="true" />}
      <span>{children}</span>
    </div>
  );
}

function ArrowLink({ href, children, light = false }) {
  return (
    <a className={`text-link ${light ? "text-link-light" : ""}`} href={href}>
      {children}<ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}

function ButtonLink({ href, children, variant = "gold" }) {
  return (
    <a className={`button button-${variant}`} href={href}>
      {children}<ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}

function PageHero({ eyebrow, title, copy, image, actions, compact = false, children }) {
  return (
    <section
      className={`page-hero ${compact ? "page-hero-compact" : ""}`}
      style={image ? { backgroundImage: `linear-gradient(135deg, rgba(26,35,126,.94) 0%, rgba(42,43,168,.78) 58%, rgba(42,43,168,.4) 100%), url("${image}")` } : undefined}
    >
      <div className="page-hero-grid" aria-hidden="true" />
      <div className="container page-hero-content">
        <Reveal>
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          {copy && <p className="hero-copy">{copy}</p>}
          {actions && <div className="hero-actions">{actions}</div>}
          {children}
        </Reveal>
      </div>
      <span className="hero-index" aria-hidden="true">SAMRAY / AFRICA</span>
    </section>
  );
}

function SectionTitle({ eyebrow, title, copy, dark = false }) {
  return (
    <div className={`section-title ${dark ? "section-title-dark" : ""}`}>
      <Eyebrow light={dark}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function StatStrip({ dark = false, items }) {
  return (
    <div className={`stat-strip ${dark ? "stat-strip-dark" : ""}`}>
      {items.map(([value, label]) => (
        <div className={`stat-item ${String(value).length > 10 ? "stat-item-long" : ""}`} key={label}>
          <strong>{value}</strong><span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function SectorCard({ sector, compact = false }) {
  const Icon = sector.icon;
  return (
    <a className={`sector-card ${compact ? "sector-card-compact" : ""}`} href={sector.href}>
      <div
        className={`sector-card-media ${sector.visual ? `sector-card-visual-${sector.visual}` : ""}`}
        style={sector.image ? { backgroundImage: `url("${sector.image}")` } : undefined}
      >
        <span className="sector-number">{sector.number}</span>
        <span className="sector-icon"><Icon size={20} aria-hidden="true" /></span>
      </div>
      <div className="sector-card-body">
        <span className="card-label">{sector.label}</span>
        <h3>{sector.name}</h3>
        <p>{sector.copy}</p>
        <span className="card-arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
      </div>
    </a>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <a className="project-image" href={project.href} style={{ backgroundImage: `url("${project.image}")` }} aria-label={`View ${project.name}`}>
        <span className="project-status"><span />{project.status}</span>
        <span className="project-image-arrow" aria-hidden="true"><ArrowUpRight size={21} /></span>
      </a>
      <div className="project-card-content">
        <Eyebrow>{project.sector} / {project.eyebrow}</Eyebrow>
        <h3><a href={project.href}>{project.name}</a></h3>
        <p>{project.summary}</p>
        <div className="project-location"><MapPin size={14} aria-hidden="true" />{project.place}</div>
        <ArrowLink href={project.href}>Explore project</ArrowLink>
      </div>
    </article>
  );
}

function ClosingCta({ title = "Let's build what comes next.", copy = "Talk to us about a project, a partnership or where your capabilities meet our ambitions.", button = "Start a conversation" }) {
  return (
    <section className="closing-cta">
      <RadialRayBackground />
      <div className="container closing-cta-inner">
        <div>
          <Eyebrow light>Work with Samray</Eyebrow>
          <RevealText as="h2" text={title} />
          <p>{copy}</p>
        </div>
        <ButtonLink href="/contact">{button}</ButtonLink>
      </div>
    </section>
  );
}

function Footer({ energy = false }) {
  const legalName = energy ? "Samray Energy Solutions Ltd" : "Samray Group";
  const footerSectors = energy ? SECTORS.filter((sector) => sector.name !== "Technology & Media") : SECTORS;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand inverse energy={energy} />
            <p>{energy ? "African energy infrastructure developer." : "Building enduring businesses and infrastructure across Africa."}</p>
            <span className="footer-tagline">{energy ? "Innovating energy project delivery across Africa." : "Rooted in Nigeria. Connected across Africa."}</span>
          </div>
          <div className="footer-column">
            <span className="footer-heading">Explore</span>
            <a href="/about">About Samray</a>
            <a href="/whatwedo">What we do</a>
            <a href="/projects">Projects</a>
            <a href="/experience">Our experience</a>
          </div>
          <div className="footer-column">
            <span className="footer-heading">Our businesses</span>
            {footerSectors.map((sector) => <a href={sector.href} key={sector.name}>{sector.name}</a>)}
            <a href="/otherinterests">Other interests</a>
          </div>
          <div className="footer-contact">
            <span className="footer-heading">Start a conversation</span>
            <p>For project, partnership and general enquiries, contact our team.</p>
            <ArrowLink href="/contact" light>Contact Samray</ArrowLink>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {legalName} · All rights reserved.</span>
          <div><a href="/privacy">Privacy</a><a href="/legal">Legal notice</a></div>
          <a href="#top" className="back-to-top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <PageMeta page="home" />
      <Header darkHero />
      <main id="top">
        <section className="home-hero">
          <div className="home-hero-photo" style={{ backgroundImage: `url("${IMG.heroRig}")` }} aria-hidden="true" />
          <div className="home-hero-shade" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="home-hero-ambience" aria-hidden="true" />
          <div className="container home-hero-content">
            <Reveal>
              <Eyebrow light><span className="status-dot" />A Nigerian-rooted group</Eyebrow>
              <RevealText as="h1" className="home-hero-title" text="Building what moves us forward." lineBreakAfter={[2]} accentFromWord={3} />
              <p className="hero-copy">Samray brings together energy infrastructure, agriculture, sports and technology &amp; media to create lasting opportunity across Africa.</p>
              <div className="hero-actions">
                <ButtonLink href="/projects">Explore our projects</ButtonLink>
                <a className="button button-outline" href="/about">Discover Samray <ArrowUpRight size={16} /></a>
              </div>
            </Reveal>
            <div className="hero-footnote"><span>Nigeria</span><span>Rooted here. Working across Africa.</span></div>
          </div>
          <div className="home-hero-caption"><span>SAMRAY GROUP</span><span>AFRICA</span></div>
        </section>

        <section className="intro-section section-pad">
          <div className="container intro-grid">
            <Reveal><Eyebrow>Who we are</Eyebrow></Reveal>
            <Reveal className="intro-copy">
              <h2>Ambition with the<br /><span>discipline to deliver.</span></h2>
              <p>Samray Group builds and backs businesses with the potential to make a meaningful difference. Our roots are in specialist energy engineering; our outlook reaches across the industries shaping Africa&apos;s future.</p>
              <ArrowLink href="/about">Meet Samray Group</ArrowLink>
            </Reveal>
          </div>
          <div className="container"><StatStrip dark items={[["03", "countries of technical project experience"], ["02", "solar programs in development"], ["04", "connected group interests"], ["Offshore + onshore", "technical services experience"]]} /></div>
        </section>

        <section className="sectors-section section-pad">
          <div className="container">
            <Reveal><SectionTitle eyebrow="The Samray portfolio" title="Different strengths. Shared ambition." copy="A portfolio of businesses with the focus to build lasting value and the perspective to see the bigger picture." /></Reveal>
            <div className="sector-grid">
              {SECTORS.map((sector, index) => <Reveal delay={index * 90} key={sector.name}><SectorCard sector={sector} /></Reveal>)}
            </div>
            <div className="portfolio-note"><span>01—04</span><p>Energy is our core business. Agriculture, sports and technology &amp; media are distinct interests within the wider group.</p></div>
          </div>
        </section>

        <section className="featured-projects section-pad">
          <div className="container">
            <div className="section-heading-row">
              <Reveal><SectionTitle eyebrow="Energy / selected projects" title="Powering possibility." copy="Solar and hybrid power infrastructure in two of Central Africa's most underserved markets." /></Reveal>
              <Reveal><ArrowLink href="/projects">View all projects</ArrowLink></Reveal>
            </div>
            <div className="project-grid">{PROJECTS.map((project) => <Reveal key={project.href}><ProjectCard project={project} /></Reveal>)}</div>
            <p className="project-disclaimer">Project information is indicative and subject to technical, legal, commercial and regulatory approvals.</p>
          </div>
        </section>

        <section className="group-story">
          <div className="story-image" style={{ backgroundImage: `url("${IMG.rig}")` }} role="img" aria-label="Energy infrastructure, part of Samray's technical project experience" />
          <div className="story-copy">
            <Reveal>
              <Eyebrow light>From experience to opportunity</Eyebrow>
              <h2>Engineering roots.<br /><em>A wider horizon.</em></h2>
              <p>Our history in technical energy services gave us a close-up view of what it takes to make critical infrastructure work. We bring that practical mindset to the projects and businesses we build today.</p>
              <ArrowLink href="/experience" light>Explore our experience</ArrowLink>
            </Reveal>
          </div>
        </section>

        <section className="impact-section section-pad">
          <div className="container">
            <Reveal>
              <SectionTitle
                eyebrow="Opportunity & impact"
                title="Build capability. Create lasting value."
                copy="Across different sectors, Samray's focus is on practical opportunities with the potential to contribute over the long term."
              />
            </Reveal>
            <div className="impact-grid">
              {[
                ["Energy", "Reliable power", "Developing solar and hybrid infrastructure for mining, industrial and community customers."],
                ["Agriculture", "A stronger value chain", "Connecting cultivation and processing with dependable supply for buyers."],
                ["Sports", "Pathways to participate", "Supporting fencing facilities, competition and development pathways for athletes."],
                ["Technology & Media", "Ideas and connection", "Exploring production, visual communications and digital platforms at Group level."],
              ].map(([sector, title, copy]) => (
                <article className="impact-card" key={sector}>
                  <span>{sector}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="principles-section section-pad">
          <div className="container principles-grid">
            <Reveal><SectionTitle eyebrow="How we work" title="Grounded in the real world." copy="We put technical understanding, responsible development and trusted relationships at the heart of our work." /></Reveal>
            <div className="principle-list">
              {[
                [ShieldCheck, "Technical rigor", "We shape work around how assets perform in demanding conditions."],
                [Handshake, "Strong partnerships", "We work alongside local developers, governments, investors and technical partners."],
                [Layers3, "Long-term thinking", "We focus on building capability and infrastructure with lasting value."],
              ].map(([Icon, title, copy], index) => <Reveal delay={index * 80} key={title}><div className="principle-item"><span><Icon size={19} /></span><div><h3>{title}</h3><p>{copy}</p></div><Check size={17} className="principle-check" aria-hidden="true" /></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="other-interests-strip">
          <div className="container other-strip-inner">
            <div><span className="other-strip-index">BEYOND ENERGY</span><h2>More ways to move forward.</h2></div>
            <p>Alongside our core energy business, Samray maintains selected interests in Agriculture, Sports and Technology &amp; Media.</p>
            <ArrowLink href="/otherinterests">Explore our interests</ArrowLink>
          </div>
        </section>
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageMeta page="about" /><Header darkHero />
      <main id="top">
        <PageHero eyebrow="About the group" title={<>A practical outlook.<br /><em>A long view.</em></>} copy="Samray Group is a Nigerian-rooted group building opportunity across energy and selected complementary sectors." image={IMG.rig} actions={<ButtonLink href="/businesses/energy">Explore our businesses</ButtonLink>} />
        <section className="ecosystem-section section-pad">
          <div className="container text-split">
            <Reveal><SectionTitle eyebrow="Who we are" title="Built on experience. Focused on what comes next." /></Reveal>
            <Reveal className="text-prose"><p>Samray Energy Solutions Ltd is an African energy infrastructure developer. We have a strong operational presence in Nigeria and strategic partnerships across Africa, the UK and Europe, which position us to work with both international investors and local players.</p><p>Our roots are in specialist energy engineering and services. Over the years we have supported operators and contractors across the full lifecycle of energy assets, from process equipment design through commissioning to inspection. Today, we apply that engineering discipline to developing solar and hybrid power infrastructure, where reliable and affordable electricity is a priority for African industry and communities.</p></Reveal>
          </div>
        </section>
        <section className="ecosystem-map-section section-pad" aria-label="Samray Group ecosystem">
          <div className="container">
            <Reveal>
              <SectionTitle
                eyebrow="Our ecosystem"
                title="Four areas. One group."
                copy="Explore the businesses and interests that make up Samray Group."
              />
            </Reveal>
            <div className="ecosystem-map" aria-label="Samray Group portfolio map">
              <div className="ecosystem-root">
                <span>Group</span>
                <strong>Samray Group</strong>
              </div>
              <span className="ecosystem-stem" aria-hidden="true" />
              <div className="ecosystem-branches">
                {SECTORS.map((sector) => (
                  <a className="ecosystem-node" href={sector.href} key={sector.name}>
                    <span>{sector.label}</span>
                    <strong>{sector.name}</strong>
                    <span className="ecosystem-node-link">Explore <ArrowUpRight size={14} aria-hidden="true" /></span>
                  </a>
                ))}
              </div>
            </div>
            <p className="ecosystem-note">This portfolio map describes areas of focus; it does not represent legal ownership or corporate reporting lines.</p>
          </div>
        </section>
        <section className="values-section section-pad">
          <div className="container"><SectionTitle eyebrow="Our approach" title="The principles behind the work." /><div className="value-grid">{[
            ["01", "Technical rigor", "Projects are shaped by engineers who understand how energy assets perform in demanding conditions."],
            ["02", "Bankable development", "We prepare projects to the standards expected by development finance institutions and institutional investors."],
            ["03", "Strong partnerships", "We build alongside local developers, governments, technology providers and financiers."],
          ].map(([n, title, copy]) => <article className="value-card" key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
        </section>
        <section className="location-band"><div className="container location-content"><Globe2 size={28} /><div><Eyebrow light>Where we work</Eyebrow><h2>Rooted in Nigeria.<br />Connected across Africa.</h2></div><p>Our project experience spans Nigeria, Tunisia and Egypt. Our solar development programs are located in the Democratic Republic of Congo and the Central African Republic.</p></div></section>
        <ClosingCta title="Get to know the Samray portfolio." copy="Explore our energy projects and the other interests that make up Samray Group." button="Explore the portfolio" />
      </main><Footer />
    </>
  );
}

function WhatWeDoPage() {
  return (
    <>
      <PageMeta page="whatwedo" /><Header darkHero energy />
      <main id="top">
        <PageHero eyebrow="Energy / what we do" title={<>Energy infrastructure,<br /><em>engineered to deliver.</em></>} copy="Solar and hybrid power development, supported by hands-on technical capability and trusted partnerships." image={IMG.solar} actions={<ButtonLink href="/projects">Explore our projects</ButtonLink>} />
        <section className="section-pad"><div className="container"><SectionTitle eyebrow="Our capabilities" title="Turning potential into projects." copy="We focus on energy infrastructure development and the technical services that help assets perform." /><div className="capability-grid">
          <article className="capability-card capability-card-large"><span className="capability-icon"><Sun /></span><Eyebrow>01 / Development</Eyebrow><h3>Solar &amp; hybrid power</h3><p>We identify, develop and structure solar and hybrid power projects across Africa. Our focus is on projects where dependable power is scarce and demand is strong.</p><ul><li>Utility-scale solar for mining and industrial customers under long-term power purchase agreements</li><li>Solar hybridization to lower fuel use, reduce cost and improve reliability</li><li>Site assessment, technical studies, permitting and commercial structuring with specialist partners</li><li>Financing partnerships that bring financiers, technical partners and offtakers together</li></ul></article>
          <article className="capability-card capability-card-large"><span className="capability-icon"><Factory /></span><Eyebrow>02 / Technical services</Eyebrow><h3>Practical energy expertise</h3><p>Turnkey technical solutions for energy operators and their contractors, drawing on experience across offshore and onshore assets.</p><ul><li>Process equipment design and engineering, including simulation, sizing and flow assurance</li><li>Commissioning and start-up support for new and upgraded facilities</li><li>Asset integrity, inspection and verification</li><li>Supply of equipment, spares and chemicals</li></ul><ArrowLink href="/experience">See oil and gas experience</ArrowLink></article>
        </div></div></section>
        <ClosingCta title="Have a project in mind?" copy="Tell us what you are working on and where Samray could add value." />
      </main><Footer energy />
    </>
  );
}

function EnergyPage() {
  return (
    <>
      <PageMeta page="energy" /><Header darkHero energy />
      <main id="top">
        <PageHero eyebrow="Samray Energy Solutions" title={<>Developing the energy<br /><em>infrastructure Africa needs.</em></>} copy="Samray Energy Solutions is an African energy infrastructure developer, bringing solar and hybrid power projects to market with a strong foundation in technical energy services." image={IMG.solar} actions={<><ButtonLink href="/projects">View our projects</ButtonLink><a className="button button-outline" href="/partner">Partner with us <ArrowUpRight size={16} /></a></>} />
        <section className="section-pad"><div className="container energy-intro"><div><Eyebrow>Energy / our focus</Eyebrow><h2>Reliable power for industry and communities.</h2></div><div className="text-prose"><p>Samray Energy Solutions Ltd develops solar and hybrid power infrastructure for mining, industrial and community customers across Africa. Our team combines project development capability with hands-on engineering experience supporting international operators and local players across the full lifecycle of energy assets.</p><p>We work with financiers, technical partners, local developers and prospective power customers to move projects from concept toward delivery.</p></div></div></section>
        <section className="energy-services section-pad"><div className="container"><SectionTitle eyebrow="How we contribute" title="From development to delivery." /><div className="service-grid">{[
          ["01", "Solar & hybrid power development", "Utility-scale solar and hybridization projects for mining, industrial and public-sector customers."],
          ["02", "Technical energy services", "Engineering, equipment supply, commissioning and asset support for energy operators."],
          ["03", "Project partnerships", "Bringing together financiers, technology providers and local partners to move projects forward."],
        ].map(([num, name, copy]) => <article className="service-item" key={num}><span>{num}</span><h3>{name}</h3><p>{copy}</p><ArrowLink href={num === "01" ? "/projects" : "/whatwedo"}>Learn more</ArrowLink></article>)}</div></div></section>
        <section className="section-pad"><div className="container"><div className="section-heading-row"><SectionTitle eyebrow="In development" title="Projects shaped for local needs." copy="Two solar programs. Distinct markets. A shared focus on reliable power." /><ArrowLink href="/projects">All projects</ArrowLink></div><div className="project-grid">{PROJECTS.map((project) => <ProjectCard project={project} key={project.href} />)}</div><p className="project-disclaimer">Project information is indicative and subject to technical, legal, commercial and regulatory approvals.</p></div></section>
        <ClosingCta title="Explore a partnership with Samray Energy." copy="We welcome discussions with project financiers, technical partners and prospective power customers." button="Talk to our team" />
      </main><Footer energy />
    </>
  );
}

function ProjectsPage() {
  return (
    <>
      <PageMeta page="projects" /><Header darkHero energy />
      <main id="top">
        <PageHero eyebrow="Samray Energy / portfolio" title={<>Our solar development<br /><em>portfolio.</em></>} copy="Samray is developing solar infrastructure in two of Central Africa's most underserved power markets. Both programs are in active development and open to partnership discussions." image={IMG.heroRig} />
        <section className="section-pad"><div className="container"><div className="project-grid">{PROJECTS.map((project) => <ProjectCard project={project} key={project.href} />)}</div><p className="legal-note">Project information is indicative and subject to technical, legal, commercial and regulatory approvals. It does not constitute an offer of securities.</p></div></section>
        <ClosingCta title="Explore a project partnership." copy="Qualified parties can request further project information through our team." />
      </main><Footer energy />
    </>
  );
}

function ProjectDetailPage({ project, isCar }) {
  const page = isCar ? "car" : "drc";
  const eyebrow = isCar ? "Solar hybridization / Central African Republic" : "Solar PV / Democratic Republic of Congo";
  const title = isCar ? <>Central African Republic<br /><em>Solar Program.</em></> : <>Solar PV Project.<br /><em>A platform for the Copperbelt.</em></>;
  const copy = isCar
    ? "Bringing reliable solar power to towns and communities."
    : "A proposed solar platform designed to serve mining and industrial customers.";
  return (
    <>
      <PageMeta page={page} /><Header darkHero energy />
      <main id="top">
        <PageHero eyebrow={eyebrow} title={title} copy={copy} image={project.image} actions={<ButtonLink href="/contact?interest=Project%20information">Request project information</ButtonLink>} />
        <section className="section-pad"><div className="container project-detail-grid">
          <div className="detail-prose"><Eyebrow>Project overview</Eyebrow><h2>{isCar ? "A phased solar hybridization framework." : "A proposed 100 MWac solar PV project."}</h2>
            {isCar ? <><p>Samray has signed a memorandum of understanding with the Government of the Central African Republic for a solar hybridization framework of up to 200 MWc. The program aims to add solar generation to existing electricity systems, reducing dependence on fuel-based generation and improving the reliability of supply.</p><p>Access to dependable electricity remains limited across much of the country, and many towns rely on costly fuel-based generation. Solar hybridization can lower the cost of power, cut fuel logistics and support local economic activity.</p></> : <><p>A proposed 100 MWac solar PV project near Lubumbashi in the south of the Democratic Republic of Congo. The project is being jointly developed.</p><p>The province hosts some of the highest concentrations of mining and industrial electricity demand in Africa. Grid constraints and ageing generation limit dependable new supply. This project is designed to add clean, contracted power to the market and help industrial customers secure more reliable electricity.</p><p>Early development work, including site reconnaissance and a preliminary solar assessment, has been completed. Technical, regulatory and commercial workstreams are continuing.</p></>}
          </div>
          <aside className="project-snapshot"><Eyebrow>Project snapshot</Eyebrow><dl>
            {[["Location", project.shortPlace], [isCar ? "Program size" : "Capacity", project.capacity], ["Technology", project.technology], [isCar ? "Government counterpart" : "Target customers", isCar ? "Government of the Central African Republic, under an MoU" : project.customers], [isCar ? "Delivery" : "Commercial approach", isCar ? "Phased, beginning with an initial cluster of towns" : project.commercial], ...(!isCar ? [["Developers", "Joint venture"]] : []), ["Status", project.status]].map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}
          </dl><p className="snapshot-disclaimer">This summary is indicative, does not constitute an offer of securities, and is subject to due diligence, financing and relevant approvals.</p></aside>
        </div></section>
        <section className="partner-band"><div className="container partner-band-inner"><div><Eyebrow light>Partner with us</Eyebrow><h2>Help move this project forward.</h2><p>We welcome discussions with financiers, technology providers, EPC partners and prospective power customers. Detailed information is available to qualified parties under a non-disclosure agreement.</p></div><ButtonLink href="/contact?interest=Project%20information">Request information</ButtonLink></div></section>
      </main><Footer energy />
    </>
  );
}

function ExperiencePage() {
  return (
    <>
      <PageMeta page="experience" /><Header darkHero energy />
      <main id="top">
        <PageHero eyebrow="Oil and gas experience" title={<>A record of<br /><em>technical delivery.</em></>} copy="Engineering services, equipment and technical support to upstream oil and gas projects for international operators and their contractors. This past experience underpins the engineering discipline we bring to energy infrastructure development." image={IMG.rig} />
        <section className="section-pad"><div className="container"><div className="text-split"><SectionTitle eyebrow="Capabilities demonstrated" title="A practical foundation for what we do next." /><div className="text-prose"><p>Samray has delivered engineering services, processing equipment and technical support to upstream oil and gas projects for international operators and their contractors. Our selected project references span Nigeria, Tunisia and Egypt, across offshore and onshore assets.</p><div className="capability-chips"><span>Process simulation, sizing, heat and material balance, flow assurance</span><span>Debottlenecking, revamp studies and site services</span><span>Commissioning, start-up, valve maintenance and repair</span><span>Asset integrity, asset verification and drilling services</span><span>Equipment, spares, pipeline accessories and chemicals</span></div></div></div>
          <div className="experience-reference-groups">
            {EXPERIENCE_REFERENCES.map((group) => (
              <section className="experience-reference-group" key={group.title}>
                <h2>{group.title}</h2>
                <div className="reference-table-wrap" role="region" aria-label={`${group.title} references`} tabIndex="0">
                  <table className="reference-table">
                    <thead><tr><th scope="col">Client</th><th scope="col">End user</th><th scope="col">Project and scope</th><th scope="col">Location</th></tr></thead>
                    <tbody>{group.entries.map(([client, endUser, scope, location]) => (
                      <tr key={`${client}-${endUser}-${scope}`}><td>{client}</td><td>{endUser}</td><td>{scope}</td><td>{location}</td></tr>
                    ))}</tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>
          <p className="reference-disclaimer">Client and end-user names are shown for reference. Projects were delivered as a service and equipment provider.</p>
        </div></section>
        <section className="location-band"><div className="container location-content"><MapPin size={27} /><div><Eyebrow light>Project experience</Eyebrow><h2>Nigeria. Tunisia. Egypt.</h2></div><p>Technical services and equipment supplied on projects, working with leading engineering contractors and international operators.</p></div></section>
        <ClosingCta title="Put our experience to work." copy="Contact us to discuss technical energy services or a new infrastructure project." />
      </main><Footer energy />
    </>
  );
}

function OtherInterestsPage() {
  const otherSectors = [
    {
      name: "Agriculture",
      href: "/businesses/agriculture",
      copy: "Samray Foods cultivates and processes crops across more than 1,100 hectares in western Nigeria, supplying major food companies. Managing production from field to processing helps provide buyers with a dependable, consistent supply of quality produce while supporting local farming communities and regional food security.",
    },
    {
      name: "Sports",
      href: "/businesses/sports",
      copy: "Samray Sports Academy established Lagos Fencing Club, the first purpose-built fencing facility in West Africa, designed to international FIE standards. Backed by $150,000 in private investment, it offers professional pistes, digital scoring, development pathways for elite and recreational fencers, and hosts regional competitions and talent programs.",
    },
  ];
  return (
    <>
      <PageMeta page="otherinterests" /><Header darkHero />
      <main id="top">
        <PageHero eyebrow="Samray Group / beyond energy" title={<>Other interests.<br /><em>Shared purpose.</em></>} copy="Alongside our core energy infrastructure business, Samray maintains selected interests that reflect our commitment to African development." compact />
        <section className="section-pad"><div className="container other-interest-grid">{otherSectors.map((sector) => <article className="other-interest-card" key={sector.name}><Eyebrow>{sector.name}</Eyebrow><h2>{sector.name}</h2><p>{sector.copy}</p><ArrowLink href={sector.href}>Explore {sector.name.toLowerCase()}</ArrowLink></article>)}</div></section>
        <section className="interest-context section-pad"><div className="container"><Eyebrow>Across the portfolio</Eyebrow><h2>Different sectors.<br /><span>One forward view.</span></h2><p>Our businesses and interests are distinct, each with its own focus. They share a long-term commitment to building capability and opportunity.</p><ArrowLink href="/">Discover Samray Group</ArrowLink></div></section>
      </main><Footer />
    </>
  );
}

function BusinessPage({ sector }) {
  const content = {
    energy: {
      page: "energy", headline: <>Developing the energy<br /><em>infrastructure Africa needs.</em></>, copy: PAGE_META.energy[1], image: IMG.solar,
      eyebrow: "Samray Energy Solutions / core business", body: "We develop solar and hybrid power infrastructure that delivers reliable, cost-competitive electricity to mining, industrial and community customers across Africa.", points: ["Utility-scale solar development", "Solar hybridization", "Technical energy services", "Project partnerships"], link: "/projects", linkText: "Explore energy projects",
    },
    agriculture: {
      page: "agriculture", headline: <>Growing a more<br /><em>resilient food system.</em></>, copy: PAGE_META.agriculture[1], image: IMG.farm,
      eyebrow: "Samray Foods / agriculture", body: "Samray Foods cultivates and processes crops across more than 1,100 hectares in western Nigeria, supplying major food companies. By managing production from the field through to processing, it aims to give buyers dependable, consistent supply of quality produce, while supporting local farming communities and regional food security.", points: ["Cultivation", "Crop processing", "Dependable supply", "Local farming communities"], link: "/otherinterests", linkText: "View other interests",
    },
    sports: {
      page: "sports", headline: <>Make room for<br /><em>the next generation.</em></>, copy: PAGE_META.sports[1],
      eyebrow: "Samray Sports Academy / sports", body: "Samray Sports Academy established Lagos Fencing Club, the first purpose-built fencing facility in West Africa, designed to international FIE standards. Backed by $150,000 in private investment, it offers professional pistes, digital scoring and a development pathway for elite and recreational fencers, and hosts regional competitions and talent programs.", points: ["Purpose-built fencing facility", "International FIE standards", "Athlete development pathways", "Regional competitions and talent programs"], link: "/otherinterests", linkText: "View other interests", image: IMG.sports, imageAlt: "Football on a grass field at sunset; illustrative sports imagery, not Samray's fencing facility.",
    },
    "technology-media": {
      page: "technology-media", headline: <>Ideas made visible.<br /><em>Platforms made useful.</em></>, copy: PAGE_META["technology-media"][1],
      eyebrow: "Samray Group / technology & media", body: "Samray Group's Technology & Media interests explore production, visual communications and digital platform capabilities. This work sits within the wider group and is distinct from Samray Energy Solutions' public energy business.", points: ["Content production", "Visual communications", "Digital platform capabilities", "Group-level interests"], link: "/", linkText: "Explore Samray Group", image: IMG.technologyMedia, imageAlt: "Laptop and creative equipment in a media workspace; illustrative image, not a confirmed Samray project.",
    },
  }[sector];
  if (!content) return <NotFoundPage />;
  const sectorTitle = sector === "technology-media" ? "Technology & Media" : sector[0].toUpperCase() + sector.slice(1);
  return (
    <>
      <PageMeta page={content.page} /><Header darkHero energy={sector === "energy"} />
      <main id="top">
        <PageHero eyebrow={content.eyebrow} title={content.headline} copy={content.copy} image={content.image} actions={<ButtonLink href={sector === "energy" ? "/projects" : "/contact"}>{sector === "energy" ? "View our projects" : "Contact Samray"}</ButtonLink>} />
        <section className="section-pad"><div className="container business-content"><div><Eyebrow>{sectorTitle} / overview</Eyebrow><h2>{sector === "energy" ? "Dependable power, developed with purpose." : sectorTitle}</h2></div><div className="text-prose"><p>{content.body}</p><ul className="check-list">{content.points.map((point) => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}</ul><ArrowLink href={content.link}>{content.linkText}</ArrowLink></div>{content.image && <figure className="business-sector-figure"><img src={content.image} alt={content.imageAlt} loading="lazy" /><figcaption>Illustrative image; not a depiction of a confirmed Samray site or project.</figcaption></figure>}</div></section>
        {sector === "energy" && <section className="featured-projects section-pad"><div className="container"><SectionTitle eyebrow="Energy / selected projects" title="Projects in development." /><div className="project-grid">{PROJECTS.map((project) => <ProjectCard project={project} key={project.href} />)}</div></div></section>}
        {sector !== "energy" && <section className="interest-context section-pad"><div className="container"><Eyebrow>Part of Samray Group</Eyebrow><h2>Independent focus.<br /><span>Connected ambition.</span></h2><p>Explore the wider portfolio and the sectors where Samray is building long-term opportunity.</p><ArrowLink href="/">Discover the group</ArrowLink></div></section>}
        <ClosingCta title={sector === "energy" ? "Let's talk about energy." : `Learn more about ${sectorTitle}.`} copy="Get in touch with Samray to start a conversation." />
      </main><Footer energy={sector === "energy"} />
    </>
  );
}

function PartnerPage() {
  return (
    <>
      <PageMeta page="partner" /><Header darkHero energy />
      <main id="top">
        <PageHero eyebrow="Samray Energy / partnerships" title={<>Build African energy<br /><em>infrastructure with us.</em></>} copy="Our solar programs are open to partnership. We work with organizations that share our commitment to bankable, responsibly developed energy infrastructure." image={IMG.solar} actions={<ButtonLink href="/contact?interest=Partnership">Start a conversation</ButtonLink>} />
        <section className="section-pad"><div className="container"><SectionTitle eyebrow="Who we work with" title="Strong projects take strong partners." /><div className="partner-types">{[
          ["01", "Development finance institutions & impact investors", "Interested in energy access and industrial power in Africa."],
          ["02", "Equity & debt providers", "Seeking exposure to contracted solar infrastructure."],
          ["03", "Technology, EPC & operations partners", "With experience delivering solar and hybrid power plants."],
          ["04", "Prospective power customers", "In mining, industry and the public sector."],
        ].map(([number, name, copy]) => <article className="partner-type" key={number}><span>{number}</span><div><h3>{name}</h3><p>{copy}</p></div><ChevronRight size={19} /></article>)}</div></div></section>
        <section className="location-band"><div className="container location-content"><Handshake size={28} /><div><Eyebrow light>How to engage</Eyebrow><h2>Start with a conversation.</h2></div><p>Send us a short enquiry describing your organization and areas of interest. Qualified parties can receive detailed project information under a non-disclosure agreement.</p></div></section>
        <ClosingCta title="Tell us what you bring to the table." copy="We welcome enquiries from aligned project and technical partners." button="Contact our team" />
      </main><Footer energy />
    </>
  );
}

function ContactPage() {
  const initialInterest = new URLSearchParams(window.location.search).get("interest") || "";
  const [status, setStatus] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [sending, setSending] = useState(false);

  function handleChange(event) {
    const field = event.target.name;
    if (fieldErrors[field]) {
      setFieldErrors((current) => ({ ...current, [field]: "" }));
    }
    if (status) setStatus(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const errors = {};
    if (!String(data.get("name") || "").trim()) errors.name = "Enter your name.";
    if (!String(data.get("organization") || "").trim()) errors.organization = "Enter your organization.";
    if (!String(data.get("email") || "").trim()) {
      errors.email = "Enter your email address.";
    } else if (!form.elements.email.validity.valid) {
      errors.email = "Enter a valid email address.";
    }
    if (!String(data.get("interest") || "").trim()) errors.interest = "Choose an area of interest.";
    if (!String(data.get("message") || "").trim()) errors.message = "Enter a message.";
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      form.elements[Object.keys(errors)[0]].focus();
      return;
    }
    if (data.get("website")) {
      setStatus({ type: "error", message: "We could not send this enquiry. Please try again." });
      return;
    }

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || (import.meta.env.DEV ? "/api/contact" : "");
    if (!endpoint) {
      setStatus({ type: "error", message: "Online enquiry delivery is not connected yet. Your details have not been sent." });
      return;
    }

    setSending(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          organization: data.get("organization"),
          email: data.get("email"),
          interest: data.get("interest"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      if (!response.ok) throw new Error(`Contact service returned ${response.status}`);
      form.reset();
      setStatus({ type: "success", message: "Thank you. Your enquiry has been sent to Samray." });
    } catch (error) {
      console.error("Unable to submit Samray contact enquiry:", error);
      setStatus({ type: "error", message: "We could not send your enquiry right now. Please try again later." });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageMeta page="contact" /><Header darkHero />
      <main id="top">
        <PageHero eyebrow="Contact Samray" title={<>Good things start<br /><em>with a conversation.</em></>} copy="Tell us about your organization and how we can work together." image={IMG.rig} compact />
        <section className="section-pad contact-section">
          <div className="container contact-layout">
            <div className="contact-intro">
              <Eyebrow>Get in touch</Eyebrow>
              <h2>What can we build together?</h2>
              <p>Use the form to enquire about projects, partnerships or technical services. Please do not include confidential or commercially sensitive information.</p>
              <div className="contact-note"><ShieldCheck size={20} /><p>Project information is shared with qualified parties under appropriate confidentiality terms.</p></div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} onChange={handleChange} noValidate>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" name="name" autoComplete="name" aria-required="true" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "name-error" : undefined} maxLength={120} />
                  {fieldErrors.name && <span className="field-error" id="name-error" role="alert">{fieldErrors.name}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="contact-organization">Organization</label>
                  <input id="contact-organization" name="organization" autoComplete="organization" aria-required="true" aria-invalid={Boolean(fieldErrors.organization)} aria-describedby={fieldErrors.organization ? "organization-error" : undefined} maxLength={160} />
                  {fieldErrors.organization && <span className="field-error" id="organization-error" role="alert">{fieldErrors.organization}</span>}
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">Email address</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" aria-required="true" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "email-error" : undefined} maxLength={254} />
                {fieldErrors.email && <span className="field-error" id="email-error" role="alert">{fieldErrors.email}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="contact-interest">Area of interest</label>
                <select id="contact-interest" name="interest" defaultValue={initialInterest} aria-required="true" aria-invalid={Boolean(fieldErrors.interest)} aria-describedby={fieldErrors.interest ? "interest-error" : undefined}>
                  <option value="" disabled>Select an area</option>
                  {["General enquiry", "Energy", "Project information", "Project finance", "Technical partnership", "Partnership", "Power purchase", "Technical services", "Agriculture", "Sports", "Technology & Media", "Careers", "Other"].map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                {fieldErrors.interest && <span className="field-error" id="interest-error" role="alert">{fieldErrors.interest}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" rows="5" aria-required="true" aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? "message-error" : undefined} maxLength={5000} placeholder="Tell us a little about your enquiry" />
                {fieldErrors.message && <span className="field-error" id="message-error" role="alert">{fieldErrors.message}</span>}
              </div>
          <label className="honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex="-1" autoComplete="off" /></label>
          <button className="button button-gold form-submit" type="submit" disabled={sending}>{sending ? "Sending…" : "Send enquiry"}<ArrowRight size={16} /></button>
          <p className="form-privacy">By sending this form, you agree that Samray may use your details to respond to your enquiry. See our <a href="/privacy">Privacy notice</a>.</p>
          <div className={`form-status ${status ? `form-status-${status.type}` : ""}`} role="status" aria-live="polite">{status?.message || ""}</div>
            </form>
          </div>
        </section>
      </main><Footer />
    </>
  );
}

function LegalPage({ privacy = false }) {
  return (
    <>
      <PageMeta page={privacy ? "privacy" : "legal"} /><Header />
      <main id="top" className="legal-page"><div className="container legal-content"><Eyebrow>{privacy ? "Your information" : "Important information"}</Eyebrow><h1>{privacy ? "Privacy notice" : "Legal notice"}</h1>
        {privacy ? <><p>This website is provided by Samray Group. If you contact us using the enquiry form, the information you submit is used to review and respond to your enquiry. When online delivery is enabled, your enquiry is transmitted to Samray through its configured email delivery provider, Resend.</p><p>Do not send confidential or commercially sensitive information through this website. Enquiry details should be retained only as needed to respond and meet applicable legal obligations.</p><p>The online enquiry form will not transmit information unless the delivery service has been configured. Please contact Samray for further information about privacy practices before submitting personal information.</p></> : <><p>The information on this website is provided for general information only. It does not constitute an offer to sell or a solicitation of an offer to buy any security or financial instrument, and should not be relied on as the basis for any investment decision.</p><p>Statements about projects under development, including capacity, location, technology and timing, are indicative and forward-looking. They are subject to technical, legal, commercial, financing and regulatory approvals and may change.</p><p>Project references to past work are provided with the permission of, or by reference to, the named parties. Detailed project information is made available only to qualified parties on request and under appropriate confidentiality terms.</p></>}
      </div></main><Footer />
    </>
  );
}

function NotFoundPage() {
  return <><Header /><main id="top" className="not-found"><div className="container"><Eyebrow>404 / Page not found</Eyebrow><h1>That page isn&apos;t here.</h1><p>The link may have changed, or the page may have moved.</p><ButtonLink href="/">Return to Samray Group</ButtonLink></div></main><Footer /></>;
}

export default function App() {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const onHistoryChange = () => setPath(getPath());
    window.addEventListener("popstate", onHistoryChange);
    return () => window.removeEventListener("popstate", onHistoryChange);
  }, []);

  const page = ROUTES[path];
  if (page === "home") return <HomePage />;
  if (page === "about") return <AboutPage />;
  if (page === "whatwedo") return <WhatWeDoPage />;
  if (page === "projects") return <ProjectsPage />;
  if (page === "drc" || page === "car") return <ProjectDetailPage project={PROJECTS[page === "car" ? 1 : 0]} isCar={page === "car"} />;
  if (page === "experience") return <ExperiencePage />;
  if (page === "otherinterests") return <OtherInterestsPage />;
  if (page === "partner") return <PartnerPage />;
  if (page === "contact") return <ContactPage />;
  if (page === "legal") return <LegalPage />;
  if (page === "privacy") return <LegalPage privacy />;
  if (page === "energy" || page === "agriculture" || page === "sports" || page === "technology-media") return <BusinessPage sector={page} />;
  return <NotFoundPage />;
}
