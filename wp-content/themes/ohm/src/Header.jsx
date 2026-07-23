import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const fallbackItems = [
  { id: 1, title: 'Home', url: '/' },
  { id: 2, title: 'About', url: '/about' },
  { id: 3, title: 'Services', url: '/services' },
  { id: 4, title: 'Contact', url: '/contact' }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const items = window.ohmThemeData?.menuItems?.length 
    ? window.ohmThemeData.menuItems 
    : fallbackItems;
  const logoUrl = window.ohmThemeData?.logoUrl || '/wp-content/uploads/2026/07/ohm-core-engineering.webp';

  return (
    <header className="ohm-site-header">
      <a className="ohm-brand-panel" href="/">
        <img src={logoUrl} alt="OHM Core Engineering" />
      </a>
      <div className="ohm-header-main">
        <nav className={`ohm-desktop-nav ${open ? 'is-open' : ''}`}>
          {items.map((item) => (
            <a 
              key={item.id} 
              href={item.url || '#'} 
              onClick={() => setOpen(false)}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
      <button 
        className="ohm-menu-toggle" 
        type="button" 
        aria-label="Toggle menu" 
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={25} /> : <Menu size={25} />}
      </button>
    </header>
  );
}
