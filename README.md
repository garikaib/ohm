# Ohm Core Engineering - WordPress Workspace

This is a modern WordPress child theme and plugin development environment using DDEV, React 19, Vite 8, and Tailwind CSS v4.

## Tech Stack & Architecture

- **Local Development Environment**: [DDEV](https://ddev.readthedocs.io/)
- **Parent Theme**: `twentytwentyfive` (latest default FSE block theme)
- **Child Theme**: `ohm` (React & Tailwind CSS v4 driven)
- **Utilities Plugin**: `ohm-tools` (Custom dashboard and helpers)
- **Front-end Compilation**: Vite 8 with Hot Module Replacement (HMR)

---

## Getting Started

### 1. Requirements

Ensure you have the following installed on your host:
- [DDEV](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/)
- Node.js (v18+) and npm

### 2. Initialization

If you're starting fresh, run:
```bash
# Start DDEV containers
ddev start

# Install local Node dependencies
npm install
```

---

## Development Commands

Run these on your host machine:

### Theme Development
Start the Vite dev server on port `5173` to compile theme assets with HMR:
```bash
npm run dev
```

### Plugin Development
Start the Vite dev server on port `5174` to compile the admin tools assets with HMR:
```bash
npm run dev:tools
```

### Production Build
Build both assets for production distribution:
```bash
# Build child theme
npm run build

# Build plugin admin tools
npm run build:tools
```

---

## Folder Structure

- `wp-content/themes/ohm/` - Child theme directory
  - `src/` - React components, pages, styles
  - `templates/` - FSE block theme HTML templates
  - `parts/` - Header and footer template parts
- `wp-content/plugins/ohm-tools/` - Custom utility plugin
  - `src/admin/` - Admin panel React app code
  - `includes/` - PHP loader and backend classes
