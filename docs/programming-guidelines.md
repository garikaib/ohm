# Ohm Core Engineering - Programming Guidelines

Welcome to the Ohm Core Engineering development guidelines. This repository houses a modern WordPress child theme and utility plugin built with React 19, Vite 8, and Tailwind CSS v4. 

This document outlines the architecture, coding standards, performance rules, and Git workflows that must be adhered to by all developers and AI agents working on this project.

---

## 🏗️ 1. System Architecture

The project consists of three main elements:
1. **DDEV environment**: Local containerized development running PHP 8.4 and MariaDB 10.11.
2. **Child Theme (`ohm`)**: Extends the default Full Site Editing (FSE) block theme **Twenty Twenty-Five**. Focuses on front-facing user experience powered by React.
3. **Custom Plugin (`ohm-tools`)**: Provides a backend control panel (`Ohm Tools` in the WP Admin Sidebar) and manages custom settings/SMTP routing.

---

## 🎨 2. Frontend Development Standards (React & CSS)

### Component Organization
- Component logic and layout must be kept modular. Do not bloat `main.jsx`.
- Place components under `src/components/` (e.g., `HeroSlider.jsx`).
- Pages or major layouts belong in `src/pages/`.

### CSS & Tailwind CSS v4
- Keep style rules organized in [index.css](file:///home/garikaib/Documents/sites/ohm/wp-content/themes/ohm/src/index.css).
- Tailwind v4 styles are imported via `@import "tailwindcss";`.
- Declare custom variables and themes inside the CSS `@theme` directive, utilizing semantic naming (e.g., `--color-accent`, `--color-bg-primary`).
- CSS rules must be cleanly formatted and structured with clear grouping. Avoid minified blocks in source files.

### Accessibility (a11y)
- Dynamic interactive elements (like carousels, sliders, or modals) must support keyboard navigation (e.g., handling arrow key triggers via `onKeyDown`).
- Set appropriate WAI-ARIA roles (`role="tablist"`, `aria-roledescription="carousel"`, `aria-selected`).
- Interactive buttons must have explicit `aria-label` tags if their contents are solely icons.

---

## ⚡ 3. Performance & Core Web Vitals (CWV)

To keep the site fast and responsive, follow these rules:

### Largest Contentful Paint (LCP)
- **Do not use CSS background-image for LCP elements**. Images set in CSS are invisible to the browser's preload scanner, causing significant loading delays.
- Use native HTML `<img>` tags positioned absolutely (`position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;`).
- Add `fetchpriority="high"` and `loading="eager"` to the critical above-the-fold image (e.g., the first slide in a slider).
- Add `fetchpriority="low"` and `loading="lazy"` to secondary/initially hidden images (e.g., subsequent slides or mega-menus).

### Cumulative Layout Shift (CLS)
- Static images (such as header logos) must have explicit `width` and `height` attributes on the `<img>` tag to allow the browser layout engine to reserve space prior to rendering.

---

## 🔌 4. WordPress & PHP Development Standards

### Security
- **Strictly prevent direct execution**: Every PHP file must begin with a check to prevent direct script execution:
  ```php
  if ( ! defined( 'ABSPATH' ) ) {
      exit; // Exit if accessed directly.
  }
  ```

### WordPress-React Data Separation
- **No hardcoded asset URLs in React**: Do not store local uploads directory links or menu items directly in JS code.
- Localize asset arrays, logo URLs, and navigation nodes from PHP using `wp_localize_script()` in `functions.php`:
  ```php
  wp_localize_script( 'ohm-theme', 'ohmThemeData', array(
      'logoUrl' => ohm_get_attachment_url_by_slug( 'logo' ),
      'slides'  => $slides_data,
  ));
  ```

### Performance & Database Caching
- Lookups for media attachments (e.g., fetching URLs by slug) must utilize WordPress transients to cache the query results:
  ```php
  $cached_url = get_transient( 'ohm_attachment_url_' . $slug );
  ```
- Always register action hooks (`save_post_attachment`, `delete_post`) to clear transients upon updates, ensuring the cache stays consistent.
- Utilize dynamic directory functions (e.g., `wp_upload_dir()['url']`) instead of hardcoding target dates/subdirectories.

---

## ⚡ 5. Build & Development Workflow

### NPM Scripts
Run these commands from the root directory on the host:
- `npm run dev`: Start the theme Vite compilation server on port `5173`.
- `npm run dev:tools`: Start the plugin admin tools Vite server on port `5174`.
- `npm run build`: Build theme production bundle into `wp-content/themes/ohm/dist/`.
- `npm run build:tools`: Build plugin production bundle into `wp-content/plugins/ohm-tools/dist/`.

### Git Standards
- Compiled production directories (`dist/`) and local node modules (`node_modules/`) are ignored in Git.
- Always verify that the project compiles cleanly using `npm run build` and `npm run build:tools` before creating commits.
