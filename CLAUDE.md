# CLAUDE.md — Проект treiner-web

## Описание проекта

Премиальный одностраничный сайт персонального фитнес-тренера с воронкой продаж. Тёмная тема (чёрный + золотой) с автоматическим переключением на светлую тему через `prefers-color-scheme`. Уровень визуала — Awwwards-quality с GSAP-анимациями.

**Направления тренера:**
- Тайский бокс для девушек (группа до 6 человек) — 2 200 ₽/час
- Персональные тренировки (один на один) — 3 500 ₽/час
- Функциональный тренинг (группа до 8 человек) — 1 600 ₽/час

**Онлайн-программы** (Telegram-канал):
- СТАРТ — 2 000 ₽/мес
- ПРОГРЕСС (хит) — 3 500 ₽/мес
- РЕЗУЛЬТАТ — 6 000 ₽/мес

## Технологический стек

| Технология | Назначение | Подключение |
|---|---|---|
| HTML5 + CSS3 + Vanilla JS | Основа | — |
| GSAP + ScrollTrigger | Анимации при скролле, timeline, параллакс | CDN (jsDelivr) |
| Lenis | Smooth scroll ("масляный" скролл) | CDN |
| Swiper | 3D-карусель отзывов, touch-свайпы | CDN |
| SplitType | Разбивка текста на буквы/слова для анимаций | CDN |
| Google Fonts | Bebas Neue, Playfair Display, Montserrat | CDN |

Все библиотеки через CDN. Итого ~80KB gzipped.

## Структура файлов

```
treiner-web/
├── CLAUDE.md               # Этот файл
├── index.html              # Главная страница (12 секций)
├── styles/
│   └── main.css            # Единый CSS (~2500 строк)
├── scripts/
│   └── main.js             # Единый JS (~970 строк)
├── assets/
│   └── favicon.svg         # SVG-фавикон
├── pages/
│   ├── offer.html          # Договор-оферта
│   └── privacy.html        # Политика конфиденциальности (152-ФЗ)
├── robots.txt              # Индексация
├── site.webmanifest        # PWA-манифест
└── .claude/
    ├── launch.json         # Dev-сервер (python3 -m http.server 8080)
    └── settings.local.json # Локальные настройки
```

## Секции сайта (порядок воронки)

1. **Nav** — glassmorphism навигация, скрытие при скролле вниз (порог 15px), показ при скролле вверх, бургер-меню на мобайле
2. **Hero** — "ТВОЁ ТЕЛО — ТВОЯ СИЛА", анимированный градиент, статистика (13+ лет, 200+ клиентов, 3 направления), две CTA-кнопки
3. **Pain** — 6 карточек "болей" клиентов с номерами и hover-эффектами
4. **About** — 2 колонки, жёлтый блок "13" лет опыта, 5 регалий тренера
5. **Services** — 3 карточки услуг, featured-карточка (персональные) с золотым фоном
6. **Online** — 3 тарифа онлайн-программ с переключателем "Дома/В зале"
7. **Process** — 4 шага (консультация → программа → тренировки → результат)
8. **Lead** — форма захвата "Запишись на разбор ситуации" + 4 преимущества
9. **Results** — Swiper-карусель отзывов + полоса статистики (200+, 8кг, 92%, 13 лет)
10. **FAQ** — 6 вопросов, аккордеон с GSAP-анимацией
11. **Consultation** — финальная форма (имя, телефон, направление, цель)
12. **Footer** — контакты, соцсети, юридические ссылки

## Дизайн-система

### Цвета (CSS-переменные)

```css
--black: #0a0a0a;        /* Основной фон */
--dark: #111111;          /* Вторичный фон */
--surface: #1a1a1a;       /* Поверхности */
--card: #161616;          /* Карточки */
--border: #222222;        /* Границы */
--accent: #C8A96E;        /* Золотой акцент */
--accent-light: #e8c98e;  /* Светлый золотой */
--accent-dark: #A8894E;   /* Тёмный золотой */
--white: #f5f0eb;         /* Тёплый белый */
--muted: #888888;         /* Приглушённый текст */
```

### Шрифты

- **Bebas Neue** (`--font-heading`) — заголовки секций, цены
- **Playfair Display** (`--font-accent`) — акцентные слова (курсив)
- **Montserrat** (`--font-body`) — основной текст, кнопки, навигация

### Типографика

- Body: 15px / 1.6
- H1 (Hero): clamp(3rem, 8vw, 6rem) Bebas Neue
- H2 (секции): clamp(2rem, 5vw, 3.5rem) Bebas Neue
- Цены: clamp(2.5rem, 5vw, 4rem) Bebas Neue

## CSS-архитектура (порядок в main.css)

1. **Reset / Normalize** (строки 1-9)
2. **Custom Properties** `:root` (строки 12-35)
3. **Base & Typography** — body, headings (строки 37+)
4. **Utilities** — `.container`, `.btn--primary`, `.btn--ghost`, `.btn--magnetic`, `.sr-only`
5. **Components** — `.card`, `.badge`, `.form-group`, `.accordion`, `.swiper` overrides
6. **Секции** — Nav → Hero → Pain → About → Services → Online → Process → Lead → Results → FAQ → Consultation → Footer
7. **Overlay элементы** — Floating CTA, Preloader, Cookie Banner, Exit Popup, Custom Cursor
8. **@keyframes** — pulse, gradient-shift, spin
9. **Media queries**:
   - `max-width: 1024px` — бургер-меню, 2 колонки
   - `max-width: 768px` — 1 колонка, уменьшение типографики
   - `max-width: 480px` — компрессия отступов, full-width кнопки
   - `prefers-reduced-motion: reduce` — отключение анимаций
   - `prefers-color-scheme: light` — светлая тема (~180 строк overrides)

## JavaScript-архитектура (main.js)

Единый IIFE с модулями:

- **CONFIG** — константы (navHeight, revealThreshold, counterDuration и т.д.)
- **Lenis** — smooth scroll, интеграция с GSAP ScrollTrigger
- **GSAP ScrollTrigger** — reveal-анимации всех секций, stagger-карточки, параллакс
- **SplitType** — побуквенные анимации заголовков
- **Nav** — скрытие/показ при скролле (порог: вниз >5px, вверх >15px)
- **Бургер-меню** — GSAP timeline, stagger fade-in пунктов
- **FAQ аккордеон** — GSAP анимация height + rotate иконки
- **Swiper** — карусель отзывов (autoHeight: false, equal heights)
- **Формы** — валидация + success-сообщение
- **Counter animation** — count-up для статистики
- **Scroll progress bar** — золотая полоска сверху
- **Прелоадер** — GSAP timeline
- **Floating CTA** — скрытие когда hero/финальная форма видны
- **Магнитные кнопки** — GSAP quickTo (сила 0.15 для hero, 0.3 для остальных)
- **Кастомный курсор** — GSAP lerp (отключён на тач-устройствах)
- **Exit-intent popup** — 1 раз за сессию
- **Cookie consent** — GSAP slide up
- **Online toggle** — переключатель "Дома/В зале" для тарифов

## Светлая тема (prefers-color-scheme: light)

Автоматическое переключение на основе системных настроек ОС. Overrides в `@media (prefers-color-scheme: light)` блоке main.css (~строка 2220+):

- Фон: `#f5f0eb` (тёплый бежевый) вместо `#0a0a0a`
- Текст: `#1a1a1a` вместо `#f5f0eb`
- Карточки: `#fff` с `box-shadow` вместо `#161616`
- Featured-карточки (золотой фон): белый текст для контраста
- Nav: светлый градиент `rgba(245, 240, 235, 0.9)`
- Кастомный курсор скрыт в светлой теме

## SEO

- `<title>` с ключевыми словами
- `<meta name="description">` — уникальное описание
- `<meta name="keywords">` — ключевые слова
- `<link rel="canonical">` — канонический URL (плейсхолдер `example.com`)
- **Open Graph**: title, description, image, type, url, locale, site_name
- **Twitter Card**: summary_large_image
- **JSON-LD**: LocalBusiness schema с 3 услугами, ценами, адресом, часами работы
- `robots.txt` — разрешение индексации
- Семантический HTML5: `<nav>`, `<section>`, `<header>`, `<footer>`, `<form>`

## История изменений и исправленных багов

### Исправления UI/UX

- **Кнопки Hero перекрывались**: `isolation: isolate` + z-index, уменьшение магнитного эффекта (0.3 → 0.15)
- **Онлайн-карточки невидимы**: CSS `transition: opacity` конфликтовал с GSAP `from({opacity: 0})`. Убран opacity из CSS transition, переход на `gsap.fromTo()`
- **Неравная высота отзывов**: Swiper — добавлен `.swiper-wrapper { align-items: stretch }` + `.swiper-slide { height: auto }`
- **Статистика Hero съезжала**: Плюсики на отдельной строке из-за `flex-direction: column`. Исправлено на `flex-wrap: wrap; align-items: baseline`
- **Статистика Results strip**: Аналогичная проблема, аналогичный фикс
- **ПРОГРЕСС текст невидим (light)**: Featured card `background: var(--accent)` совпадал с цветом текста. Добавлены white overrides
- **Текст услуг невидим (light)**: Hardcoded `rgba(245, 240, 235, 0.7)` — добавлен override `rgba(26, 26, 26, 0.7)`
- **Текст регалий невидим (light)**: Аналогично — добавлен override
- **Nav тёмный градиент (light)**: Заменён на `rgba(245, 240, 235, 0.9)`
- **Тег `<p>` невидим (light)**: Добавлен глобальный override цвета
- **Цена персональных**: Исправлена с 3000₽ на 3500₽
- **Service-link hover прыжок**: `letter-spacing: 2px` при hover оборачивал текст. Заменён на плавный `padding-left: 6px`
- **"Без инвентаря"**: Заменено на "С минимальным инвентарём" во всех тарифах
- **Курсор исчезал на кнопках**: `cursor: none` (для кастомного курсора) мешал. Заменён на `cursor: auto` для body, `cursor: pointer` для интерактивных элементов
- **Хедер скачет**: Добавлен порог скролла — скрытие при >5px вниз, показ при >15px вверх
- **Nav ссылки без hover**: Добавлен ::after подчёркивание золотой линией с анимацией

## Плейсхолдеры для замены

| Плейсхолдер | Где | Что заменить |
|---|---|---|
| `https://example.com/` | `index.html` (canonical, og:url), `robots.txt` | Реальный домен |
| `+7-XXX-XXX-XX-XX` | `index.html` (JSON-LD) | Реальный телефон |
| `https://t.me/` | `index.html` (ссылки, JSON-LD) | Реальный Telegram |
| `assets/img/og.jpg` | `index.html` (OG, Twitter, JSON-LD) | Реальное OG-изображение (1200x630) |
| Фото тренера | `index.html` (hero, about) | Реальные фотографии |
| Координаты | `index.html` (JSON-LD geo) | Реальные координаты зала |

## Dev-сервер

```bash
python3 -m http.server 8080
```

Конфигурация в `.claude/launch.json` (имя: `dev`).

## Команды

```bash
# Запуск dev-сервера
python3 -m http.server 8080

# Проверка в браузере
open http://localhost:8080
```

## Что можно добавить в будущем

- Реальные фотографии тренера и тренировок
- Интеграция формы с backend (Telegram Bot API / webhook)
- Яндекс.Метрика / Google Analytics
- Sitemap.xml
- Страница 404
- Анимация появления при первом визите (intro animation)
- Видео-фон в Hero секции
- Реальные отзывы с фотографиями клиентов
- A/B тестирование CTA-кнопок
- Интеграция онлайн-оплаты для тарифов
