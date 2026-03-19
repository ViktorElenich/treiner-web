# TRAINER — Premium Fitness Landing Page

A high-converting, one-page fitness trainer website built with modern web technologies and Awwwards-level animations.

**[Live Demo](https://viktorelenich.github.io/treiner-web/)**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=white)

---

## Features

- **Sales Funnel Architecture** — 12 sections optimized for conversion: Hero > Pain Points > About > Services > Online Programs > Process > Lead Capture > Results > FAQ > Consultation > Footer
- **GSAP + ScrollTrigger** — cinematic scroll-driven animations, staggered reveals, parallax effects, pinned sections
- **Lenis Smooth Scroll** — butter-smooth scrolling experience
- **SplitType** — character-by-character text reveal animations on headings
- **Swiper** — 3D coverflow carousel for testimonials with touch support
- **Dark / Light Theme** — automatic switching via `prefers-color-scheme`, comprehensive CSS overrides
- **Responsive** — 3 breakpoints (1024px, 768px, 480px) with full-screen burger menu on mobile
- **SEO Optimized** — JSON-LD (LocalBusiness), Open Graph, Twitter Cards, semantic HTML5
- **Accessibility** — `prefers-reduced-motion` support, all animations disabled for users who prefer it
- **Performance** — vanilla JS, no frameworks, ~80KB total library overhead (gzipped)

## Tech Stack

| Technology | Purpose | Size |
|---|---|---|
| HTML5 + CSS3 + Vanilla JS | Core | 0KB overhead |
| [GSAP](https://greensock.com/gsap/) + ScrollTrigger | Premium scroll animations | ~30KB gzip |
| [Lenis](https://lenis.darkroom.engineering/) | Smooth scroll | ~5KB |
| [Swiper](https://swiperjs.com/) | Touch carousel | ~40KB |
| [SplitType](https://www.splittype.com/) | Text splitting for animations | ~3KB |
| Google Fonts | Bebas Neue, Playfair Display, Montserrat | CDN |

All libraries loaded via CDN (jsDelivr).

## Design System

| Token | Value | Usage |
|---|---|---|
| `--black` | `#0a0a0a` | Primary background |
| `--accent` | `#C8A96E` | Gold accent color |
| `--white` | `#f5f0eb` | Warm white text |
| `--font-heading` | Bebas Neue | Section headings, prices |
| `--font-accent` | Playfair Display | Italic accent words |
| `--font-body` | Montserrat | Body text, buttons, nav |

## Project Structure

```
treiner-web/
├── index.html              # Main page (12 sections)
├── styles/
│   └── main.css            # Design system + all styles (~2500 lines)
├── scripts/
│   └── main.js             # GSAP/Lenis/Swiper/SplitType (~970 lines)
├── assets/
│   └── favicon.svg         # SVG favicon
├── pages/
│   ├── offer.html          # Terms of service
│   └── privacy.html        # Privacy policy (152-FZ)
├── robots.txt
├── site.webmanifest
└── CLAUDE.md               # Detailed project documentation
```

## Quick Start

```bash
# Clone
git clone https://github.com/ViktorElenich/treiner-web.git
cd treiner-web

# Start dev server
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

## Sections

| # | Section | Purpose |
|---|---|---|
| 1 | **Hero** | Hook + CTA ("Free consultation") |
| 2 | **Pain Points** | 6 client problems — build empathy |
| 3 | **About** | Trainer credentials, 13+ years experience |
| 4 | **Services** | 3 training formats with prices |
| 5 | **Online** | 3 subscription tiers with Home/Gym toggle |
| 6 | **Process** | 4 steps from consultation to result |
| 7 | **Lead Capture** | Mid-page form with benefits |
| 8 | **Results** | Testimonials carousel + stats |
| 9 | **FAQ** | 6 questions, accordion |
| 10 | **Consultation** | Full form (name, phone, goal) |
| 11 | **Footer** | Contacts, social links, legal |

## Key Animations

- **Scroll Reveal** — elements fade/slide in on scroll via GSAP ScrollTrigger
- **Staggered Cards** — pain points, services, process cards appear in sequence
- **Text Reveal** — headings animate character-by-character (SplitType + GSAP)
- **Counter Animation** — statistics count up when scrolled into view
- **Magnetic Buttons** — CTA buttons follow cursor with magnetic pull
- **Nav Hide/Show** — navigation hides on scroll down, reveals on scroll up (with threshold)
- **Parallax** — decorative elements move at different scroll speeds
- **Progress Bar** — gold line at top shows scroll progress

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

## License

MIT

---

Built with vanilla HTML, CSS, JS and premium animation libraries.
