import React from 'react';
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from 'lucide-react';

const fallbackItems = [
  { id: 1, title: 'Home', url: '/' },
  { id: 2, title: 'About', url: '/about' },
  { id: 3, title: 'Blog', url: '/blog' },
  { id: 4, title: 'Services', url: '/services' },
  { id: 5, title: 'Team', url: '/team' },
  { id: 6, title: 'Contact', url: '/contact' }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const menuItems = window.ohmThemeData?.menuItems?.length ? window.ohmThemeData.menuItems : fallbackItems;
  const contacts = window.ohmThemeData?.contacts || {
    primary_phone: '+263 78 301 7009',
    secondary_phone: '+263 71 569 6201',
    sales_email: 'sales@ohmcore.co.zw',
    engineering_email: 'engineering@ohmcore.co.zw',
    short_address: '8 Favershame Rd, Malbereign, Harare',
    operating_hours: 'Mon - Fri: 8:00 - 17:00',
  };

  const cleanPhone = (phone) => (phone || '').replace(/\s+/g, '');

  return (
    <footer id="contact" className="ohm-footer">
      {/* Banner / CTA line */}
      <div className="ohm-footer-banner">
        <div className="ohm-container ohm-footer-banner-inner">
          <div className="ohm-footer-banner-title">
            <span className="ohm-kicker-dot"></span>
            <span className="ohm-kicker-text">OHM CORE ENGINEERING</span>
            <h2>Let&apos;s build what matters.</h2>
          </div>
          <a className="ohm-button ohm-button-orange ohm-footer-cta-btn" href="/contact">
            <span>Contact us</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* Main Compact Content Row */}
      <div className="ohm-footer-main">
        <div className="ohm-container ohm-footer-main-grid">
          
          {/* Brand block */}
          <div className="ohm-footer-brand">
            <div className="ohm-footer-logo-title">
              <h3>OHM CORE ENGINEERING</h3>
              <span className="ohm-badge-pill">FULL LIFECYCLE</span>
            </div>
            <p>
              Integrated mechanical, electrical, civil, structural, BIM, and project-management solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="ohm-footer-nav-col">
            <h4 className="ohm-footer-heading">Explore</h4>
            <nav className="ohm-footer-nav-links">
              {menuItems.map((item) => (
                <a key={item.id} href={item.url || '#'} className="ohm-footer-nav-item">
                  <span>{item.title}</span>
                  <ArrowUpRight size={12} className="ohm-nav-arrow" />
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Details Grid */}
          <div className="ohm-footer-contact-col">
            <h4 className="ohm-footer-heading">Direct Contact</h4>
            <div className="ohm-footer-contact-grid">
              {Array.isArray(contacts.phones) && contacts.phones.map((phoneNum, idx) => (
                <a key={`phone-${idx}`} href={`tel:${cleanPhone(phoneNum)}`} className="ohm-contact-card">
                  <Phone size={14} />
                  <div>
                    <small>{idx === 0 ? 'PRIMARY PHONE' : `PHONE #${idx + 1}`}</small>
                    <span>{phoneNum}</span>
                  </div>
                </a>
              ))}
              {Array.isArray(contacts.emails) && contacts.emails.map((emailAddr, idx) => (
                <a key={`email-${idx}`} href={`mailto:${emailAddr}`} className="ohm-contact-card">
                  <Mail size={14} />
                  <div>
                    <small>{idx === 0 ? 'SALES ENQUIRIES' : `EMAIL #${idx + 1}`}</small>
                    <span>{emailAddr}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Location & Hours */}
          <div className="ohm-footer-office-col">
            <h4 className="ohm-footer-heading">Office & Hours</h4>
            <div className="ohm-footer-info-group">
              <div className="ohm-info-card">
                <MapPin size={14} />
                <div>
                  <small>HEAD OFFICE</small>
                  <span>{contacts.short_address}</span>
                </div>
              </div>
              <div className="ohm-info-card">
                <Clock3 size={14} />
                <div>
                  <small>OPERATING HOURS</small>
                  <span>{contacts.operating_hours}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="ohm-footer-bottom">
        <div className="ohm-container ohm-footer-bottom-inner">
          <span>© {currentYear} OHM Core Engineering. All rights reserved.</span>
          <span className="ohm-footer-tagline">Designing dreams, building realities.</span>
        </div>
      </div>
    </footer>
  );
}

