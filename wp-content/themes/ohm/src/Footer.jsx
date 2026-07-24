import React from 'react';
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from 'lucide-react';

const fallbackItems = [
  { id: 1, title: 'Home', url: '/' },
  { id: 2, title: 'About', url: '/about' },
  { id: 3, title: 'Services', url: '/services' },
  { id: 4, title: 'Contact', url: '/contact' }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const menuItems = window.ohmThemeData?.menuItems?.length ? window.ohmThemeData.menuItems : fallbackItems;
  return <footer id="contact" className="ohm-footer">
    <div className="ohm-footer-promo"><div className="ohm-container ohm-footer-promo-inner"><div><p className="ohm-kicker">OHM CORE ENGINEERING</p><h2>Let&apos;s build what matters.</h2></div><a className="ohm-button ohm-button-orange" href="/contact">Contact us <ArrowUpRight size={17} /></a></div></div>
    <div className="ohm-container ohm-footer-grid">
      <div className="ohm-footer-brand"><h3>OHM CORE ENGINEERING</h3><p>Integrated mechanical, electrical, civil, structural, BIM, and project-management solutions from inception through handover.</p></div>
      <div><h4>Explore</h4><nav className="ohm-footer-links">{menuItems.map((item) => <a key={item.id} href={item.url || '#'}>{item.title}<ArrowUpRight size={13} /></a>)}</nav></div>
      <div><h4>Contact</h4><ul className="ohm-contact-list"><li><Phone size={16} /><a href="tel:+263783017009" style={{ color: 'inherit', textDecoration: 'none' }}>+263 78 301 7009</a></li><li><Phone size={16} /><a href="tel:+263715696201" style={{ color: 'inherit', textDecoration: 'none' }}>+263 71 569 6201</a></li><li><Mail size={16} /><a href="mailto:sales@ohmcore.co.zw" style={{ color: 'inherit', textDecoration: 'none' }}>sales@ohmcore.co.zw</a></li><li><Mail size={16} /><a href="mailto:engineering@ohmcore.co.zw" style={{ color: 'inherit', textDecoration: 'none' }}>engineering@ohmcore.co.zw</a></li><li><MapPin size={16} />8 Favershame Road, Malbereign, Harare, Zimbabwe</li><li><Clock3 size={16} />Mon - Fri 8:00 - 17:00</li></ul></div>
    </div>
    <div className="ohm-container ohm-footer-bottom"><span>© {currentYear} OHM Core Engineering. All rights reserved.</span><span>Designing dreams, building realities.</span></div>
  </footer>;
}
