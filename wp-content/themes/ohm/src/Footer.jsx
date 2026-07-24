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

  return (
    <footer id="contact" className="ohm-footer">
      <div className="ohm-footer-promo">
        <div className="ohm-container ohm-footer-promo-inner">
          <div>
            <p className="ohm-kicker">OHM CORE ENGINEERING</p>
            <h2>Let&apos;s build what matters.</h2>
          </div>
          <a className="ohm-button ohm-button-orange" href="/contact">
            Contact us <ArrowUpRight size={17} />
          </a>
        </div>
      </div>

      <div className="ohm-container ohm-footer-grid">
        {/* Col 1: Brand & Overview */}
        <div className="ohm-footer-brand">
          <h3>OHM CORE ENGINEERING</h3>
          <p>
            Integrated mechanical, electrical, civil, structural, BIM, and project-management solutions from inception through final handover.
          </p>
          <div className="ohm-footer-brand-badge">
            <span>FULL LIFECYCLE CONSULTING</span>
          </div>
        </div>

        {/* Col 2: Quick Navigation */}
        <div className="ohm-footer-col">
          <h4>Explore</h4>
          <nav className="ohm-footer-links">
            {menuItems.map((item) => (
              <a key={item.id} href={item.url || '#'}>
                <span>{item.title}</span>
                <ArrowUpRight size={13} />
              </a>
            ))}
          </nav>
        </div>

        {/* Col 3: Direct Lines */}
        <div className="ohm-footer-col">
          <h4>Direct Lines</h4>
          <div className="ohm-footer-contact-group">
            <div className="ohm-footer-contact-item">
              <Phone size={15} />
              <div>
                <small>PRIMARY PHONE</small>
                <a href="tel:+263783017009">+263 78 301 7009</a>
              </div>
            </div>
            <div className="ohm-footer-contact-item">
              <Phone size={15} />
              <div>
                <small>SECONDARY PHONE</small>
                <a href="tel:+263715696201">+263 71 569 6201</a>
              </div>
            </div>
            <div className="ohm-footer-contact-item">
              <Mail size={15} />
              <div>
                <small>SALES ENQUIRIES</small>
                <a href="mailto:sales@ohmcore.co.zw">sales@ohmcore.co.zw</a>
              </div>
            </div>
            <div className="ohm-footer-contact-item">
              <Mail size={15} />
              <div>
                <small>ENGINEERING TEAM</small>
                <a href="mailto:engineering@ohmcore.co.zw">engineering@ohmcore.co.zw</a>
              </div>
            </div>
          </div>
        </div>

        {/* Col 4: Location & Hours */}
        <div className="ohm-footer-col">
          <h4>Office & Hours</h4>
          <div className="ohm-footer-contact-group">
            <div className="ohm-footer-contact-item">
              <MapPin size={15} />
              <div>
                <small>HEAD OFFICE</small>
                <span>8 Favershame Road,<br />Malbereign, Harare, Zimbabwe</span>
              </div>
            </div>
            <div className="ohm-footer-contact-item">
              <Clock3 size={15} />
              <div>
                <small>OPERATING HOURS</small>
                <span>Mon - Fri: 8:00 - 17:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ohm-container ohm-footer-bottom">
        <span>© {currentYear} OHM Core Engineering. All rights reserved.</span>
        <span>Designing dreams, building realities.</span>
      </div>
    </footer>
  );
}
