import React from 'react';
import { ArrowRight, Check, Clock3, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

const content = {
  about: {
    eyebrow: 'ABOUT OHM CORE ENGINEERING',
    title: <>Engineering with<br /><span>purpose.</span></>,
    intro: 'A dynamic multidisciplinary consulting firm focused on the systems, structures, infrastructure, and project decisions that move communities forward.',
    imageKey: 'about',
  },
  team: {
    eyebrow: 'HOW WE WORK',
    title: <>Experience that<br /><span>works together.</span></>,
    intro: 'OHM brings complementary engineering experience into one coordinated project team - connecting technical disciplines, site realities, and delivery goals.',
    imageKey: 'team',
  },
};

function CompanyHero({ page, image }) {
  return <section className="ohm-company-hero" style={{ backgroundImage: image ? `url(${image})` : undefined }}><div className="ohm-company-hero-overlay" /><div className="ohm-container"><p className="ohm-kicker">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.intro}</p></div></section>;
}

function AboutPage({ images }) {
  const page = content.about;
  return <main className="ohm-company-page"><CompanyHero page={page} image={images.about} />
    <section className="ohm-company-intro ohm-container"><div><p className="ohm-kicker">WHO WE ARE</p><h2>One team.<br />Many disciplines.</h2></div><div><p>OHM Core Engineering delivers Mechanical, Electrical, Civil, and Structural Engineering, supported by expert Project Management and BIM technology.</p><p>Our work spans commercial, industrial, healthcare, and residential sectors, with every solution shaped around safety, efficiency, compliance, and dependable delivery.</p></div></section>
    <section className="ohm-values"><div className="ohm-container ohm-values-grid"><article><span>01</span><h3>Our vision</h3><p>To achieve steady, hands-on growth from project inception to final handover, becoming a trusted engineering leader.</p></article><article><span>02</span><h3>Our mission</h3><p>To deliver high-quality multidisciplinary engineering solutions that meet cost, time, quality, and safety goals.</p></article><article><span>03</span><h3>Our commitment</h3><p>To deliver safe, energy-efficient, code-compliant designs that remain on schedule and within budget.</p></article></div></section>
    <section className="ohm-approach ohm-container"><div><p className="ohm-kicker">OUR APPROACH</p><h2>Precision, coordination, responsibility.</h2></div><div className="ohm-approach-list">{['Understand the brief and project context', 'Coordinate disciplines through practical design and BIM', 'Control scope, time, cost, quality, and risk', 'Support delivery through supervision, commissioning, and handover'].map((item) => <div key={item}><Check size={18} />{item}</div>)}</div></section>
  </main>;
}

function TeamPage({ images }) {
  const page = content.team;
  return <main className="ohm-company-page"><CompanyHero page={page} image={images.team} />
    <section className="ohm-company-intro ohm-container"><div><p className="ohm-kicker">THE OHM MODEL</p><h2>Expertise is stronger when it is connected.</h2></div><div><p>We are building a team culture around practical engineering judgment, clear communication, and accountability from design through delivery.</p><p>Rather than presenting a collection of isolated specialists, OHM works as a coordinated group: disciplines share information early, resolve interfaces deliberately, and stay focused on the client&apos;s real project outcomes.</p></div></section>
    <section className="ohm-team-principles"><div className="ohm-container"><p className="ohm-kicker">EXPERIENCE THAT DELIVERS</p><div className="ohm-team-principle-grid"><article><ShieldCheck size={34} /><h3>Technical depth</h3><p>Experience across building services, utilities, structures, infrastructure, and project controls.</p></article><article><ArrowRight size={34} /><h3>Connected delivery</h3><p>Multidisciplinary coordination that reduces gaps between design intent, procurement, site work, and handover.</p></article><article><Check size={34} /><h3>Responsible outcomes</h3><p>Safe, efficient, code-compliant solutions designed around time, cost, quality, and long-term performance.</p></article></div></div></section>
  </main>;
}

function ContactPage({ images }) {
  return <main className="ohm-contact-page"><section className="ohm-contact-hero" style={{ backgroundImage: images.contact ? `url(${images.contact})` : undefined }}><div className="ohm-company-hero-overlay" /><div className="ohm-container"><p className="ohm-kicker">START A CONVERSATION</p><h1>Let&apos;s make<br /><span>the next move.</span></h1><p>Tell us what you are planning, designing, or delivering. We will help you understand the right engineering path forward.</p></div></section><section className="ohm-contact-body ohm-container"><div><p className="ohm-kicker">CONTACT OHM</p><h2>Bring us the brief.</h2><p>Whether you are at feasibility, design, procurement, construction, or handover, our team can help coordinate the next stage.</p><div className="ohm-contact-details"><div><Phone size={21} /><span><a href="tel:+263783017009" style={{ color: 'inherit', textDecoration: 'none' }}>+263 78 301 7009</a><br /><a href="tel:+263715696201" style={{ color: 'inherit', textDecoration: 'none' }}>+263 71 569 6201</a></span></div><div><Mail size={21} /><span><a href="mailto:sales@ohmcore.co.zw" style={{ color: 'inherit', textDecoration: 'none' }}>sales@ohmcore.co.zw</a><br /><a href="mailto:engineering@ohmcore.co.zw" style={{ color: 'inherit', textDecoration: 'none' }}>engineering@ohmcore.co.zw</a></span></div><div><MapPin size={21} /><span>8 Favershame Road,<br />Malbereign, Harare, Zimbabwe</span></div><div><Clock3 size={21} /><span>Mon - Fri, 8:00 - 17:00</span></div></div></div><form className="ohm-contact-form" method="post"><label>Name<input type="text" name="name" /></label><label>Email<input type="email" name="email" /></label><label>How can we help?<textarea name="message" rows="5" /></label><button className="ohm-button ohm-button-orange" type="submit">Send enquiry <ArrowRight size={17} /></button></form></section></main>;
}

export default function CompanyPages({ slug }) {
  const images = window.ohmThemeData?.companyImages || {};
  if (slug === 'about') return <AboutPage images={images} />;
  if (slug === 'team') return <TeamPage images={images} />;
  return <ContactPage images={images} />;
}
