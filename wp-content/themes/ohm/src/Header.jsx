import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Clock3, Mail, MapPin, Menu, Phone, X } from 'lucide-react';

const fallbackItems = [
  { id: 1, title: 'Home', url: '/' },
  { id: 2, title: 'About', url: '/about' },
  { id: 3, title: 'Blog', url: '/blog' },
  { id: 4, title: 'Services', url: '/services' },
  { id: 5, title: 'Team', url: '/team' },
  { id: 6, title: 'Contact', url: '/contact' }
];
const socials = [
  { label: 'Facebook', mark: 'f' },
  { label: 'TikTok', mark: '♪' },
  { label: 'WhatsApp', mark: '◔' },
  { label: 'X', mark: '𝕏' },
];

const getPathname = (url) => {
  if (!url) return '';
  try {
    const path = new URL(url, window.location.origin).pathname;
    return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  } catch (e) {
    return url;
  }
};

const isItemActive = (itemUrl) => {
  const currentPath = getPathname(window.location.href);
  const itemPath = getPathname(itemUrl);
  if (!itemPath) return false;
  if (itemPath === '/') {
    return currentPath === '/' || currentPath === '';
  }
  return currentPath === itemPath || currentPath.startsWith(itemPath + '/');
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const items = (window.ohmThemeData?.menuItems?.length ? window.ohmThemeData.menuItems : fallbackItems).map(item => {
    if ((item.url === '#' || item.url === '') && item.title?.toLowerCase() === 'home') {
      return { ...item, url: '/' };
    }
    return item;
  });
  const logoUrl = window.ohmThemeData?.logoUrl || '/wp-content/uploads/2026/07/ohm-core-engineering.webp';
  const closeMenu = () => setOpen(false);


  useEffect(() => {
    const updateStickyState = () => setIsStuck(window.scrollY > 45);
    updateStickyState();
    window.addEventListener('scroll', updateStickyState, { passive: true });
    return () => window.removeEventListener('scroll', updateStickyState);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', closeOnEscape);
    document.body.classList.toggle('ohm-menu-open', open);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.classList.remove('ohm-menu-open');
    };
  }, [open]);

  return (
    <header className={`ohm-site-header ${isStuck ? 'has-stuck-nav' : ''} ${open ? 'is-menu-open' : ''}`}>
      <div className="ohm-utility-bar">
        <div className="ohm-utility-contact">
          <a href="tel:+263000000000" aria-label="Phone"><Phone size={17} strokeWidth={1.7} /><span>+263 (0) 000 000 000</span></a>
          <a href="mailto:info@ohmcore.co.zw" aria-label="Email"><Mail size={17} strokeWidth={1.7} /><span>info@ohmcore.co.zw</span></a>
          <span><Clock3 size={17} strokeWidth={1.7} /><span>Mon - Fri 8:00 - 17:00</span></span>
        </div>
        <div className="ohm-utility-socials" aria-label="Social media">
          {socials.map((social) => <a key={social.label} href="#" aria-label={social.label}>{social.mark}</a>)}
        </div>
      </div>

      <div className={`ohm-header-row ${isStuck ? 'is-stuck' : ''}`}>
        <a className="ohm-brand-panel" href="/" aria-label="OHM Core Engineering home">
          <img src={logoUrl} alt="OHM Core Engineering" width="172" height="49" />
        </a>
        <div className="ohm-header-main">
          <nav className={`ohm-desktop-nav ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
            {items.map((item) => (
              <a 
                key={item.id} 
                href={item.url || '#'} 
                onClick={() => setOpen(false)}
                className={isItemActive(item.url) ? 'is-active' : ''}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
        <button className="ohm-menu-toggle" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
          <Menu size={25} />
        </button>
      </div>
      <button className={`ohm-mobile-backdrop ${open ? 'is-open' : ''}`} type="button" aria-label="Close menu" onClick={closeMenu} />
      <aside className={`ohm-mobile-drawer ${open ? 'is-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!open}>
        <button className="ohm-drawer-close" type="button" aria-label="Close menu" onClick={(e) => { e.stopPropagation(); closeMenu(); }}><X size={25} /></button>
        <div className="ohm-drawer-content">
          <p className="ohm-drawer-kicker">OHM CORE ENGINEERING</p>

          <div className="ohm-drawer-explore">
            <p className="ohm-drawer-kicker">EXPLORE</p>
            <nav aria-label="Mobile primary navigation">
              {items.map((item) => (
                <a 
                  key={item.id} 
                  href={item.url || '#'} 
                  onClick={closeMenu}
                  className={isItemActive(item.url) ? 'is-active' : ''}
                >
                  <span>{item.title}</span>
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </nav>
          </div>

          <h2>Quick contact info</h2>
          <p className="ohm-drawer-intro">Integrated engineering solutions designed for performance, safety, sustainability, and dependable delivery.</p>
          <div className="ohm-drawer-contact">
            <span><Clock3 size={18} /><span>Mon - Fri 8:00 - 17:00</span></span>
            <span><MapPin size={18} /><span>Harare, Zimbabwe</span></span>
            <a href="tel:+263000000000"><Phone size={18} /><span>+263 (0) 000 000 000</span></a>
            <a href="mailto:info@ohmcore.co.zw"><Mail size={18} /><span>info@ohmcore.co.zw</span></a>
          </div>
          <div className="ohm-drawer-socials" aria-label="Social media">
            {socials.map((social) => <a key={social.label} href="#" aria-label={social.label}>{social.mark}</a>)}
          </div>
          <p className="ohm-drawer-hint">Tap outside or press Esc to close</p>
        </div>
      </aside>
    </header>
  );
}
