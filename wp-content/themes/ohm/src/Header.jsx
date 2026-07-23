import React, { useState } from 'react';
import { Clock3, Mail, Menu, Phone, X } from 'lucide-react';

const fallbackItems = ['Home', 'About', 'Blog', 'Services', 'Team', 'Contact'].map((title, id) => ({ id, title, url: '#' }));
const socials = [
  { label: 'Facebook', mark: 'f' },
  { label: 'TikTok', mark: '♪' },
  { label: 'WhatsApp', mark: '◔' },
  { label: 'X', mark: '𝕏' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const items = window.ohmThemeData?.menuItems?.length ? window.ohmThemeData.menuItems : fallbackItems;
  const logoUrl = window.ohmThemeData?.logoUrl || '/wp-content/uploads/2026/07/ohm-core-engineering.webp';

  return (
    <header className="ohm-site-header">
      <div className="ohm-utility-bar">
        <div className="ohm-utility-contact">
          <a href="#" aria-label="Phone"><Phone size={17} strokeWidth={1.7} /><span>+263 (0) 000 000 000</span></a>
          <a href="#" aria-label="Email"><Mail size={17} strokeWidth={1.7} /><span>info@ohmcore.co.zw</span></a>
          <span><Clock3 size={17} strokeWidth={1.7} /><span>Mon - Fri 8:00 - 17:00</span></span>
        </div>
        <div className="ohm-utility-socials" aria-label="Social media">
          {socials.map((social) => <a key={social.label} href="#" aria-label={social.label}>{social.mark}</a>)}
        </div>
      </div>

      <div className="ohm-header-row">
        <a className="ohm-brand-panel" href="#" aria-label="OHM Core Engineering home">
          <img src={logoUrl} alt="OHM Core Engineering" width="172" height="49" />
        </a>
        <div className="ohm-header-main">
          <nav className={`ohm-desktop-nav ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
            {items.map((item) => <a key={item.id} href={item.url || '#'} onClick={() => setOpen(false)}>{item.title}</a>)}
          </nav>
        </div>
        <button className="ohm-menu-toggle" type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
    </header>
  );
}
