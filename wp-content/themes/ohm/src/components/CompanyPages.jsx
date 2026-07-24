import React from 'react';
import { ArrowRight, Check, Clock3, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

const content = {
  about: {
    eyebrow: 'WHO WE ARE',
    title: <>Built to solve<br /><span>complex challenges.</span></>,
    intro: 'We are a multidisciplinary consulting team that turns ambitious architectural and infrastructure briefs into safe, efficient, and long-lasting reality.',
    imageKey: 'about',
  },
  team: {
    eyebrow: 'OUR PEOPLE & CULTURE',
    title: <>Great engineering is<br /><span>a team effort.</span></>,
    intro: 'Behind every successful project is a team of engineers, project managers, and BIM specialists who collaborate closely with you from day one.',
    imageKey: 'team',
  },
};

function CompanyHero({ page, image }) {
  return (
    <section className="ohm-company-hero" style={{ backgroundImage: image ? `url(${image})` : undefined }}>
      <div className="ohm-company-hero-overlay" />
      <div className="ohm-container ohm-company-hero-content">
        <p className="ohm-kicker">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </div>
    </section>
  );
}

function AboutPage({ images }) {
  const page = content.about;
  return (
    <main className="ohm-company-page">
      <CompanyHero page={page} image={images.about} />
      <section className="ohm-company-intro ohm-container">
        <div>
          <p className="ohm-kicker">OUR STORY & CAPABILITY</p>
          <h2>A single, unified team<br />for all disciplines.</h2>
        </div>
        <div>
          <p>OHM Core Engineering brings Mechanical, Electrical, Civil, and Structural Engineering under one roof, backed by senior Project Management and advanced LOD 600 BIM capabilities.</p>
          <p>We work across commercial hubs, industrial plants, healthcare facilities, and residential developments—ensuring every solution is safe, code-compliant, energy-efficient, and delivered strictly on schedule.</p>
        </div>
      </section>
      <section className="ohm-values">
        <div className="ohm-container ohm-values-grid">
          <article>
            <span>01</span>
            <h3>Our Vision</h3>
            <p>To lead multidisciplinary engineering in Zimbabwe and the region by earning client trust through hands-on quality and dependable execution.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Our Mission</h3>
            <p>To design resilient systems and structures that elevate project value, protect budgets, and make a lasting positive impact on communities.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Our Commitment</h3>
            <p>Zero compromises on safety or statutory compliance, with transparent communication from initial feasibility to site handover.</p>
          </article>
        </div>
      </section>
      <section className="ohm-approach ohm-container">
        <div>
          <p className="ohm-kicker">HOW WE OPERATE</p>
          <h2>Precision. Collaboration. Accountability.</h2>
        </div>
        <div className="ohm-approach-list">
          {[
            'Deeply understand your project brief, constraints, and timeline goals',
            'Coordinate all engineering disciplines early through LOD 600 digital models',
            'Active risk management, procurement control, and budget alignment',
            'Dedicated on-site supervision, testing, commissioning, and smooth handover'
          ].map((item) => (
            <div key={item}><Check size={18} />{item}</div>
          ))}
        </div>
      </section>
    </main>
  );
}

function TeamPage({ images }) {
  const page = content.team;
  return (
    <main className="ohm-company-page">
      <CompanyHero page={page} image={images.team} />
      <section className="ohm-company-intro ohm-container">
        <div>
          <p className="ohm-kicker">THE OHM COLLABORATION MODEL</p>
          <h2>Engineering is stronger when experts work together.</h2>
        </div>
        <div>
          <p>We foster a culture built on practical engineering judgment, proactive problem solving, and genuine client partnership from concept through delivery.</p>
          <p>Instead of working in isolated silos, our mechanical, electrical, civil, and structural engineers collaborate side-by-side with our BIM team and project managers—eliminating design gaps before they reach the site.</p>
        </div>
      </section>
      <section className="ohm-team-principles">
        <div className="ohm-container">
          <p className="ohm-kicker">WHY CLIENTS CHOOSE US</p>
          <div className="ohm-team-principle-grid">
            <article>
              <ShieldCheck size={34} />
              <h3>Multidisciplinary Depth</h3>
              <p>Senior technical leadership across MEP building services, civil infrastructure, structural frameworks, and project controls.</p>
            </article>
            <article>
              <ArrowRight size={34} />
              <h3>Seamless Coordination</h3>
              <p>Integrated workflows that bridge design intent, procurement strategy, FIDIC/JBCC contract administration, and site execution.</p>
            </article>
            <article>
              <Check size={34} />
              <h3>Responsible Delivery</h3>
              <p>Code-compliant, energy-efficient solutions focused on performance, long-term durability, and client peace of mind.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactPage({ images }) {
  const contacts = window.ohmThemeData?.contacts || {
    office_address: '8 Favershame Road, Malbereign, Harare, Zimbabwe',
    operating_hours: 'Mon - Fri, 8:00 - 17:00',
  };
  const cleanPhone = (phone) => (phone || '').replace(/\s+/g, '');

  return (
    <main className="ohm-contact-page">
      <section className="ohm-contact-hero" style={{ backgroundImage: images.contact ? `url(${images.contact})` : undefined }}>
        <div className="ohm-company-hero-overlay" />
        <div className="ohm-container">
          <p className="ohm-kicker">GET IN TOUCH WITH OHM CORE</p>
          <h1>Let&apos;s build<br /><span>something remarkable.</span></h1>
          <p>Whether you need a preliminary feasibility study, MEP design review, structural assessment, or full project management, our engineering team in Harare is ready to help.</p>
        </div>
      </section>
      <section className="ohm-contact-body ohm-container">
        <div>
          <p className="ohm-kicker">DIRECT TECHNICAL CONSULTATION</p>
          <h2>Bring us your brief.</h2>
          <p>We work closely with property developers, architects, contractors, and project managers across Zimbabwe. Reach out to discuss your upcoming project or request a technical proposal.</p>
          <div className="ohm-contact-details">
            <div>
              <Phone size={21} />
              <span>
                {Array.isArray(contacts.phones) && contacts.phones.map((p, idx) => {
                  const val = typeof p === 'object' ? p.value : p;
                  return (
                    <React.Fragment key={`phone-${idx}`}>
                      <a href={`tel:${cleanPhone(val)}`} style={{ color: 'inherit', textDecoration: 'none' }}>{val}</a>
                      {idx < contacts.phones.length - 1 && <br />}
                    </React.Fragment>
                  );
                })}
              </span>
            </div>
            <div>
              <Mail size={21} />
              <span>
                {Array.isArray(contacts.emails) && contacts.emails.map((e, idx) => {
                  const val = typeof e === 'object' ? e.value : e;
                  return (
                    <React.Fragment key={`email-${idx}`}>
                      <a href={`mailto:${val}`} style={{ color: 'inherit', textDecoration: 'none' }}>{val}</a>
                      {idx < contacts.emails.length - 1 && <br />}
                    </React.Fragment>
                  );
                })}
              </span>
            </div>
            <div>
              <MapPin size={21} />
              <span>{contacts.office_address}</span>
            </div>
            <div>
              <Clock3 size={21} />
              <span>{contacts.operating_hours}</span>
            </div>
          </div>
        </div>
        <form className="ohm-contact-form" method="post">
          <label>Full Name<input type="text" name="name" placeholder="e.g. Tendai Moyo" required /></label>
          <label>Email Address<input type="email" name="email" placeholder="name@company.co.zw" required /></label>
          <label>Tell us about your project brief<textarea name="message" rows="5" placeholder="Share your location, project stage (feasibility, design, construction), and key engineering requirements..." required /></label>
          <button className="ohm-button ohm-button-orange" type="submit">Send Enquiry <ArrowRight size={17} /></button>
        </form>
      </section>
    </main>
  );
}

export default function CompanyPages({ slug }) {
  const pageHeaders = window.ohmThemeData?.pageHeaderImages || {};
  const fallbackImages = window.ohmThemeData?.companyImages || {};
  const currentOverride = window.ohmThemeData?.currentHeaderImage;

  // Per-page editor metabox override comes first if present, followed by pageHeaders slug setting, then fallback
  const getHeaderImg = (pageSlug) => currentOverride || pageHeaders[pageSlug] || fallbackImages[pageSlug];

  if (slug === 'about') return <AboutPage images={{ about: getHeaderImg('about') }} />;
  if (slug === 'team') return <TeamPage images={{ team: getHeaderImg('team') }} />;
  return <ContactPage images={{ contact: getHeaderImg('contact') }} />;
}
