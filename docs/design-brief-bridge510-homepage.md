# Bridge 510 Homepage — Design & Implementation Brief

Status: discovery brief  
Reference: https://bridge510.qodeinteractive.com/  
Captured: 23 July 2026  
Local project: Ohm custom WordPress theme + React/Vite tooling

## 1. Executive summary

The reference is the “Industrial Construction” demo of Qode Interactive’s Bridge WordPress theme. It is a long-form, full-width marketing homepage built from WordPress, the Bridge theme, Elementor, Qi Blocks, and theme-specific CSS/JS. The visual language is industrial and premium: deep navy, vivid orange, white space, large architectural photography, uppercase micro-labels, and a narrow condensed sans-serif voice.

For a pixel-accurate recreation, reproduce the visual system and content hierarchy first, while implementing the page with the project’s existing custom theme and React/Vite tooling. Use one consistent icon strategy rather than importing the full Bridge icon stack. The best default for this project is Lucide for interface icons, with a small number of custom inline SVGs for distinctive service/feature marks. css.gg is not the source used by the reference site and is not a close implementation match.

## 2. How the reference is made

The live page identifies itself as:

- WordPress theme: Bridge, version 7.0 / Bridge Core 3.1.3.
- Page builders/content systems: Elementor 3.19.0, Qi Blocks, and WooCommerce support.
- Page template: full-width WordPress page.
- Layout behavior: one-page scrolling homepage with responsive breakpoints and a desktop grid capped around 1300px.
- Hero behavior: a three-slide image/text slider with overlaid copy and calls to action.
- Styling: a large compiled Bridge stylesheet plus dynamic page CSS and responsive CSS.
- Typography: Google Fonts, primarily Yantramanav and Raleway; Roboto/Roboto Slab are also loaded by the broader stack.

This means the reference is not a css.gg-based site. It is a theme-driven WordPress composition where components, builder markup, theme CSS, icon fonts, and inline SVGs work together.

## 3. Icon-library audit

### What the reference loads

The homepage source loads these Bridge icon stylesheets:

1. Font Awesome 4: `bridge/css/font-awesome/css/font-awesome.min.css`
2. Elegant Icons: `bridge/css/elegant-icons/style.min.css`
3. Linea Icons: `bridge/css/linea-icons/style.css`
4. Dripicons: `bridge/css/dripicons/dripicons.css`
5. Kiko: `bridge/css/kiko/kiko-all.css`
6. Font Awesome 5: `bridge/css/font-awesome-5/css/font-awesome-5.min.css`

The markup confirms usage of classes such as `fa fa-facebook`, `fa fa-angle-right`, `qodef-icon-dripicons`, `social_facebook`, `icon_plus`, and `icon_minus-06`. Qi Blocks/Elementor also emit inline SVG icons, including a simple plus symbol.

### Recommendation for the rebuild

Use `lucide-react` for navigation, menu, chevrons, arrows, phone, email, map pin, and utility actions. It is already installed locally and gives us consistent stroke weight, tree-shaking, React ergonomics, and accessible SVG output.

Use custom inline SVG only when an icon is part of the brand or a service illustration and cannot be represented faithfully by Lucide. Avoid bringing over all six Bridge icon fonts: that would add unnecessary CSS/font payload, reproduce legacy class conventions, and make the new page harder to maintain.

css.gg is a possible lightweight CSS icon set, but it is not the reference source and its geometry is more solid/geometric than the thin mixed icon treatment in the demo. It should only be selected if the team explicitly prefers its CSS-only delivery model.

## 4. Brand and color system

The strongest colors are directly confirmed in the reference CSS and inline styles.

| Token | Value | Use |
|---|---|---|
| Navy / primary | `#001659` | headings, navigation, links, icons, key text |
| Orange / accent | `#FF5E14` | buttons, hover states, active accents, highlights |
| Body text gray | `#565969` | paragraphs, secondary labels, muted UI |
| Deep footer navy | `#0A1229` | footer social tiles and dark utility surfaces |
| Footer border navy | `#1D263F` | borders around dark social tiles |
| White | `#FFFFFF` | page background, reversed text, cards on dark sections |
| Soft gray | `#F2F3F5` | tags, pale utility backgrounds, subtle panels |
| Divider gray | `#E8E8E9` | accordion/divider rules and light borders |
| Transparent/overlay black | `rgba(0,0,0,.35–.55)` | image overlays; tune visually per hero image |

Suggested CSS variables:

```css
:root {
  --color-primary: #001659;
  --color-accent: #ff5e14;
  --color-ink: #565969;
  --color-footer: #0a1229;
  --color-footer-border: #1d263f;
  --color-surface: #ffffff;
  --color-surface-muted: #f2f3f5;
  --color-border: #e8e8e9;
}
```

## 5. Typography

### Primary typeface

Use Yantramanav as the main typeface. It is a tall, condensed, modern sans-serif and is responsible for the reference’s narrow headings, labels, navigation, buttons, and body copy.

### Supporting typeface

Raleway is present in the Bridge stack and may be used for selected display treatments if needed, but the visible homepage is overwhelmingly Yantramanav. Do not introduce a second display font until the first implementation has been compared visually.

### Type behavior

- Navigation and eyebrow labels: uppercase, approximately 12–14px, medium weight, 1.3–1.5px letter spacing.
- Body copy: approximately 16–18px, 26–28px line height, regular weight, muted gray.
- Section titles: navy, uppercase or title case depending on section, generally 32–52px on desktop.
- Hero titles: large uppercase condensed display, approximately 52–78px desktop depending on viewport.
- Buttons: 14–16px, mostly sentence case or uppercase, medium weight, slight tracking.

## 6. Homepage structure and content hierarchy

Implement the page in this order:

1. Utility/header zone
   - Small contact-information strip with working hours, address, phone, and email.
   - Main navigation with logo at left and Home, About, Blog, Services, Team, Contact links.
   - Desktop header is clean and spacious; mobile collapses to a menu control.

2. Hero slider
   - Three full-width slides with construction/architecture photography.
   - Slide themes: “BUILD A BETTER TOMORROW”, “STAYING AHEAD OF SCHEDULE”, and “ALWAYS STRONG FOUNDATIONS”.
   - Large white uppercase copy over image, short supporting paragraph, “Read more” and “Contact Us” actions.
   - Use a dark image overlay to protect text contrast.

3. Services overview
   - Section heading: “Services”.
   - Four feature tiles: General Contract, Project Planning, Refurbishment, Interior Design.
   - Each tile uses an image/illustration and a small “EXPLORE THE FEATURES” label.

4. Full project management feature
   - Large image-led split section.
   - Short eyebrow, two-line navy heading, paragraph, and “Read more” link.

5. Projects portfolio
   - Section heading: “PROJECTS”.
   - Image grid/cards with titles such as Kitchen and Living, Modern materials, Parametric modeling, Wood in architecture, and Contemporary Villa.
   - Category metadata is small, uppercase/condensed, and muted.

6. Secondary services / capabilities
   - Additional service cards such as Interior Design, Graphic Design, and Product Design in the reference content.
   - Preserve the same image-first card language and orange hover accent.

7. Metrics and testimonials
   - Counter/stat content for completed codes, happy clients, and completed projects.
   - Testimonial cards with portrait, quote, name, and role.

8. Professionals/team
   - Section heading: “PROFESSIONALS”.
   - Four team portraits with name, role, and social icons.

9. Progress/feature band
   - Percentage indicators such as 36%, 75%, and 68% with labels Codes, Clients, Projects.
   - Follow with an image-led service feature list: Project Planning, Refurbishment, General Contracting, Interior design.

10. Latest news
    - Three article cards with image, title, and date.
    - Heading: “LATEST NEWS”.

11. Footer
    - “Build with Bridge” promotional block.
    - Hours, services list, office location, phone, email, locations image/map area.
    - Dark navy footer, orange hover states, and square social tiles.

## 7. Layout, spacing, and component rules

- Use full-bleed image sections with content constrained to a centered max-width of approximately 1300px.
- Use 12-column desktop logic or a CSS grid equivalent; service/project cards should align to a common baseline.
- Favor generous vertical rhythm: roughly 90–150px between major sections on desktop, reducing to 56–88px on mobile.
- Use 1–2px rules sparingly in `#E8E8E9`.
- Buttons are compact rectangles with approximately 2px corner radius; the reference uses generous horizontal padding, often around 38–60px.
- Orange should be reserved for actions and active states, not used as a large background except in intentional accent bands.
- Image cards use `object-fit: cover`; preserve strong architectural crops rather than showing letterboxed images.
- Hover states should transition over roughly 200–400ms: navy/orange color change, slight image scale, or an overlay reveal.

## 8. Responsive behavior

Reference breakpoints are approximately:

- Mobile: up to 767px
- Mobile landscape: up to 880px
- Tablet: up to 1024px
- Laptop: up to 1366px
- Widescreen: 1440px and above

Responsive priorities:

- Hide or compress the utility bar on small screens.
- Replace full navigation with a menu trigger.
- Stack split sections vertically, with the image either first or second based on reading order.
- Convert multi-column projects/services/team grids to 2 columns on tablet and 1 column on mobile.
- Reduce hero heading size and keep the primary CTA visible without requiring excessive scroll.
- Preserve the orange/navy contrast and the condensed typography at every size.

## 9. Image direction

Use editorial construction imagery: cranes, steel, concrete, architecture, interior materials, planning drawings, site teams, and finished modern buildings. Favor high-contrast images with a clear focal area where white text can sit. The reference uses large landscape images and portrait team images; do not substitute generic icon grids for the visual storytelling.

Recommended image treatment:

- Hero: full-bleed, darkened, high-resolution landscape.
- Service cards: tightly cropped architectural/detail photos.
- Project grid: varied but consistent 4:3 or 3:2 crops.
- Team: consistent portrait ratio, neutral or lightly desaturated background.
- Footer/location: wide, low-height image or map treatment.

## 10. Local implementation notes

The local package currently contains:

- Custom WordPress theme: `wp-content/themes/ohm`
- React/Vite tooling for theme/plugin development
- `lucide-react` already installed
- Tailwind/PostCSS/Vite build tooling

Suggested component boundaries:

```text
Homepage
├── UtilityBar
├── SiteHeader
├── HeroSlider
├── ServicesGrid
├── FeatureSplit
├── ProjectsGrid
├── StatsBand
├── Testimonials
├── TeamGrid
├── CapabilityList
├── NewsGrid
└── SiteFooter
```

Keep content data-driven so titles, images, services, team members, and news can later be connected to WordPress fields or REST data without rewriting layout components.

## 11. Definition of “pixel perfect” for the first pass

The first implementation should be judged against the reference at desktop width, tablet width, and mobile width using the same viewport sizes. Match these in order:

1. Section order and vertical rhythm.
2. Hero height, crop, overlay, and text placement.
3. Header geometry and navigation spacing.
4. Primary/navy and orange color values.
5. Yantramanav typography, casing, weights, and tracking.
6. Grid columns, card aspect ratios, and image crops.
7. Button dimensions and hover states.
8. Secondary details such as social icons, dividers, and footer spacing.

## 12. Source notes

Audited source assets and implementation references:

- Live page: https://bridge510.qodeinteractive.com/
- Bridge documentation, basic styling: https://bridge.qodeinteractive.com/documentation/5-fonts-basic-styling/
- Bridge theme listing: https://themeforest.net/item/bridge-creative-multipurpose-wordpress-theme/7315054

The color values, font declarations, icon stylesheet links, WordPress/theme/plugin versions, and component names in this brief were taken from the live page HTML and loaded CSS on 23 July 2026. Exact spacing and image crop measurements should be validated during the visual implementation pass at fixed viewport sizes.
