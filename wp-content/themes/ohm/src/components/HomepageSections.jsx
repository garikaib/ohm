import React from 'react';
import { ArrowRight, Building2, ClipboardCheck, Cpu, Droplets, HardHat, Lightbulb, Settings2, ShieldCheck, Target, Award, CheckCircle2 } from 'lucide-react';

const services = [
  { slug: 'mechanical-engineering', icon: Settings2, title: 'Mechanical Engineering', text: 'HVAC&R, smart ventilation, plumbing, and fire safety systems engineered for high-comfort, low-energy buildings.' },
  { slug: 'electrical-engineering', icon: Lightbulb, title: 'Electrical Engineering', text: 'Resilient power grids, backup energy, LED lighting, and security infrastructure designed for continuous uptime.' },
  { slug: 'civil-engineering', icon: Droplets, title: 'Civil Engineering', text: 'Water reticulation, bulk infrastructure, urban drainage, and road networks built for lasting community impact.' },
  { slug: 'structural-engineering', icon: Building2, title: 'Structural Engineering', text: 'High-strength steel, liquid-retaining tanks, bridges, and building frames engineered for maximum longevity.' },
  { slug: 'project-management', icon: ClipboardCheck, title: 'Project Management', text: 'End-to-end scope, budget, contract administration (FIDIC/JBCC), and site supervision that keep projects moving smoothly.' },
  { slug: 'bim-technology', icon: Cpu, title: 'BIM & Digital Twins', text: 'LOD 600 digital models that catch spatial clashes before construction begins, saving time and eliminating surprises.' },
];

const sectors = [
  { title: 'Commercial Real Estate', text: 'Coordinated building services, power grids, and structural designs for workplaces, retail spaces, and corporate hubs.' },
  { title: 'Industrial & Energy', text: 'Heavy-duty process support, standby power systems, bulk civil infrastructure, and specialized storage structures.' },
  { title: 'Healthcare Facilities', text: 'Critical life-safety systems, sterile environmental controls, and backup power grids designed for zero downtime.' },
  { title: 'Residential Developments', text: 'Practical, energy-efficient mechanical, electrical, civil, and structural designs for modern living.' },
];

const pillars = [
  { icon: ShieldCheck, title: 'Safety & Code Integrity', text: 'Every detail rigorously complies with Zimbabwean statutory codes, statutory safety protocols, and international standards.' },
  { icon: Target, title: 'Low-Carbon & Energy Efficient', text: 'Smart engineering solutions designed to cut long-term utility expenses, reduce carbon footprints, and empower communities.' },
  { icon: Award, title: 'On Time & Within Budget', text: 'Transparent project management controls that guarantee scope, procurement, and site execution stay strictly on track.' }
];

export default function HomepageSections() {
  return (
    <main className="ohm-content">
      {/* Intro Section */}
      <section className="ohm-intro ohm-section">
        <div className="ohm-container ohm-intro-grid">
          <div>
            <p className="ohm-kicker">ENGINEERING EXCELLENCE IN ZIMBABWE & BEYOND</p>
            <h2>Precision engineering.<br /><span>Brought to life with care.</span></h2>
          </div>
          <div className="ohm-intro-copy">
            <p>OHM Core Engineering is a multidisciplinary consulting firm. We unite mechanical, electrical, civil, structural, BIM, and project management expertise under one roof.</p>
            <p>Whether guiding early feasibility or supervising final site handover, we bring practical engineering judgment and digital precision together—giving you total clarity and confidence at every step.</p>
            <a className="ohm-text-link" href="/about">Meet our engineering team <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="ohm-services ohm-section">
        <div className="ohm-container">
          <div className="ohm-section-heading">
            <div>
              <p className="ohm-kicker">OUR DISCIPLINES</p>
              <h2><a href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>What we build together</a></h2>
            </div>
            <p>Six specialized engineering capabilities, seamlessly coordinated under one dedicated consulting team.</p>
          </div>
          <div className="ohm-service-grid">
            {services.map(({ slug, icon: Icon, title, text }) => (
              <article className="ohm-service-card" key={title}>
                <div className="ohm-service-icon"><Icon size={31} strokeWidth={1.35} /></div>
                <p className="ohm-card-kicker">CORE CAPABILITY</p>
                <h3><a href={`/${slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}>{title}</a></h3>
                <p>{text}</p>
                <a href={`/${slug}/`} aria-label={`Explore ${title} capability`} className="ohm-card-arrow"><ArrowRight size={18} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Panel */}
      <section id="about" className="ohm-feature ohm-section">
        <div className="ohm-feature-panel">
          <div className="ohm-feature-mark"><HardHat size={48} strokeWidth={1.1} /></div>
          <p className="ohm-kicker">SMART PROJECT COORDINATION</p>
          <h2>Clarity and confidence from concept to handover.</h2>
          <p>We combine hands-on field experience with advanced LOD 600 BIM modeling to catch design clashes on screen—not on site. The result is safer, energy-efficient infrastructure delivered strictly on time and within budget.</p>
          <a className="ohm-button ohm-button-orange" href="/contact">Let's discuss your project <ArrowRight size={17} /></a>
        </div>
        <div className="ohm-feature-side">
          <div className="ohm-feature-stat">
            <strong>MEP + CIVIL</strong>
            <span>Integrated building systems, water networks, and site infrastructure</span>
          </div>
          <div className="ohm-feature-stat">
            <strong>STRUCTURES</strong>
            <span>Resilient frameworks for commercial hubs, industrial plants, and bridges</span>
          </div>
          <div className="ohm-feature-stat">
            <strong>LOD 600 BIM</strong>
            <span>Clash-free 3D digital models & asset-ready digital twins</span>
          </div>
          <div className="ohm-feature-stat">
            <strong>PROJECT CONTROLS</strong>
            <span>Feasibility, procurement, contractor management, and site supervision</span>
          </div>
        </div>
      </section>

      {/* Engineering Pillars Section */}
      <section className="ohm-pillars-section ohm-section">
        <div className="ohm-container">
          <div className="ohm-section-heading">
            <div>
              <p className="ohm-kicker">OUR STANDARDS</p>
              <h2>Engineering built on trust & rigor.</h2>
            </div>
            <p>Every decision we make is guided by technical integrity, environmental responsibility, and genuine client accountability.</p>
          </div>
          <div className="ohm-pillars-grid">
            {pillars.map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <div className="ohm-pillar-card" key={pillar.title}>
                  <div className="ohm-pillar-icon"><PillarIcon size={32} strokeWidth={1.25} /></div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                  <span className="ohm-pillar-check"><CheckCircle2 size={16} /> Guaranteed performance</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="ohm-sectors ohm-section">
        <div className="ohm-container">
          <div className="ohm-section-heading">
            <div>
              <p className="ohm-kicker">SECTOR EXPERTISE</p>
              <h2>Tailored solutions for your industry.</h2>
            </div>
            <p>We adapt our multidisciplinary engineering framework to meet the specific operational, compliance, and budget demands of your sector.</p>
          </div>
          <div className="ohm-sector-list">
            {sectors.map((sector, index) => (
              <div className="ohm-sector-item" key={sector.title}>
                <span>0{index + 1}</span>
                <strong>{sector.title}</strong>
                <p>{sector.text}</p>
                <a href="/contact" aria-label={`Contact us regarding ${sector.title} sector`}><ArrowRight size={20} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Promise Banner */}
      <section className="ohm-promise">
        <div className="ohm-container ohm-promise-inner">
          <div>
            <p className="ohm-kicker">OUR PROMISE TO YOU</p>
            <h2>Designing dreams,<br />building realities.</h2>
          </div>
          <div>
            <p>We bring your vision to life through rigorous engineering, smart energy choices, and disciplined project management—delivering reliable results on schedule and within budget.</p>
            <div className="ohm-promise-actions">
              <a className="ohm-button ohm-button-navy" href="/contact">Talk to an Engineer <ArrowRight size={17} /></a>
              <a className="ohm-button ohm-button-orange" href="/services">Explore All Services</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
