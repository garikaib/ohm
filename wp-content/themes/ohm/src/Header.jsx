import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Clock3, Mail, MapPin, Menu, Phone, X, Share2 } from 'lucide-react';

const fallbackItems = [
  { id: 1, title: 'Home', url: '/' },
  { id: 2, title: 'About', url: '/about' },
  { id: 3, title: 'Blog', url: '/blog' },
  { id: 4, title: 'Services', url: '/services' },
  { id: 5, title: 'Team', url: '/team' },
  { id: 6, title: 'Contact', url: '/contact' }
];

const renderSocialIcon = (platform, size = 16) => {
  const p = (platform || '').toLowerCase();
  if (p.includes('facebook')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (p.includes('linkedin')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
      </svg>
    );
  }
  if (p.includes('whatsapp')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.332 5.002L2 22l5.129-1.341a9.96 9.96 0 0 0 4.881 1.28h.004c5.507 0 9.99-4.478 9.99-9.984 0-2.668-1.039-5.176-2.928-7.063C17.189 3.004 14.68 2 12.012 2zm5.836 14.283c-.247.697-1.444 1.334-1.996 1.397-.506.058-1.164.086-3.766-.991-3.327-1.378-5.46-4.757-5.626-4.978-.165-.221-1.353-1.802-1.353-3.437 0-1.635.856-2.439 1.159-2.767.303-.328.662-.41.883-.41.22 0 .441.002.634.011.205.009.48-.077.75.57.276.662.937 2.294 1.02 2.46.083.165.138.358.028.578-.11.221-.165.358-.33.551-.165.193-.347.432-.496.58-.165.165-.337.345-.145.675.193.33 0 .855 1.83 2.614 1.261 1.22 2.324 1.602 2.655 1.767.33.165.523.138.716-.083.193-.221.826-.964 1.047-1.295.22-.33.441-.276.744-.165.303.11 1.93.91 2.26 1.075.33.165.551.247.634.386.083.138.083.801-.164 1.498z" />
      </svg>
    );
  }
  if (p.includes('x') || p.includes('twitter')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  return <Share2 size={size} strokeWidth={1.8} />;
};

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
  const contacts = window.ohmThemeData?.contacts || {
    primary_phone: '+263 78 301 7009',
    secondary_phone: '+263 71 569 6201',
    sales_email: 'sales@ohmcore.co.zw',
    engineering_email: 'engineering@ohmcore.co.zw',
    office_address: '8 Favershame Road, Malbereign, Harare, Zimbabwe',
    operating_hours: 'Mon - Fri 8:00 - 17:00',
  };

  const cleanPhone = (phone) => (phone || '').replace(/\s+/g, '');
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

  const dynamicSocials = Array.isArray(window.ohmThemeData?.socials) && window.ohmThemeData.socials.length > 0 
    ? window.ohmThemeData.socials 
    : [
        { platform: 'Facebook', url: '#' },
        { platform: 'LinkedIn', url: '#' },
        { platform: 'WhatsApp', url: '#' },
        { platform: 'X', url: '#' }
      ];

  const primaryPhone = Array.isArray(contacts.phones) && contacts.phones[0] ? (typeof contacts.phones[0] === 'object' ? contacts.phones[0].value : contacts.phones[0]) : '+263 78 301 7009';
  const primaryEmail = Array.isArray(contacts.emails) && contacts.emails[0] ? (typeof contacts.emails[0] === 'object' ? contacts.emails[0].value : contacts.emails[0]) : 'sales@ohmcore.co.zw';

  return (
    <header className={`ohm-site-header ${isStuck ? 'has-stuck-nav' : ''} ${open ? 'is-menu-open' : ''}`}>
      <div className="ohm-utility-bar">
        <div className="ohm-utility-contact">
          <a href={`tel:${cleanPhone(primaryPhone)}`} aria-label="Phone"><Phone size={17} strokeWidth={1.7} /><span>{primaryPhone}</span></a>
          <a href={`mailto:${primaryEmail}`} aria-label="Email"><Mail size={17} strokeWidth={1.7} /><span>{primaryEmail}</span></a>
          <span><Clock3 size={17} strokeWidth={1.7} /><span>{contacts.operating_hours}</span></span>
        </div>
        <div className="ohm-utility-socials" aria-label="Social media">
          {dynamicSocials.map((social, idx) => (
            <a key={`hdr-soc-${idx}`} href={social.url || '#'} aria-label={social.platform || 'Social'}>
              {renderSocialIcon(social.platform, 15)}
            </a>
          ))}
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
                onClick={closeMenu}
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
            <span><Clock3 size={18} /><span>{contacts.operating_hours}</span></span>
            <span><MapPin size={18} /><span>{contacts.office_address}</span></span>
            {Array.isArray(contacts.phones) && contacts.phones.map((p, idx) => {
              const val = typeof p === 'object' ? p.value : p;
              return <a key={`m-phone-${idx}`} href={`tel:${cleanPhone(val)}`}><Phone size={18} /><span>{val}</span></a>;
            })}
            {Array.isArray(contacts.emails) && contacts.emails.map((e, idx) => {
              const val = typeof e === 'object' ? e.value : e;
              return <a key={`m-email-${idx}`} href={`mailto:${val}`}><Mail size={18} /><span>{val}</span></a>;
            })}
          </div>
          <div className="ohm-drawer-socials" aria-label="Social media">
            {dynamicSocials.map((social, idx) => (
              <a key={`drw-soc-${idx}`} href={social.url || '#'} aria-label={social.platform || 'Social'}>
                {renderSocialIcon(social.platform, 18)}
              </a>
            ))}
          </div>
          <p className="ohm-drawer-hint">Tap outside or press Esc to close</p>
        </div>
      </aside>
    </header>
  );
}
