import React from 'react';
import { ArrowLeft, ArrowRight, Check, ClipboardCheck, Cpu, Droplets, Lightbulb, Settings2, Building2, ShieldCheck, Compass, Layers, FileCheck2, Phone, Mail } from 'lucide-react';

const services = [
  { 
    slug: 'mechanical-engineering', 
    title: 'Mechanical Engineering', 
    short: 'Smart, energy-efficient building systems engineered for occupant comfort, climate resilience, and safety.', 
    intro: 'We design high-performance mechanical systems for commercial buildings, healthcare facilities, and industrial plants across Zimbabwe and the region.', 
    icon: Settings2, 
    points: [
      'HVAC&R design focused on indoor air quality, thermal comfort, and energy savings',
      'Plumbing, sanitary drainage, water treatment, and greywater recycling',
      'Fire protection, automatic sprinklers, standpipes, and gas suppression systems',
      'Industrial steam, reverse osmosis, LP gas, and boiler plant design',
      'Fuel service station infrastructure and LP gas systems',
      'Vertical transportation: elevators, goods lifts, and escalators'
    ] 
  },
  { 
    slug: 'electrical-engineering', 
    title: 'Electrical Engineering', 
    short: 'Safe, resilient electrical grids and backup power systems designed for continuous operation.', 
    intro: 'Our electrical team plans robust power distribution, standby energy generation, lighting, and security systems with total reliability at the core.', 
    icon: Lightbulb, 
    points: [
      'Low-voltage (LV) power distribution, switchgear design, and power factor correction',
      'Standby diesel generators, ATS panel controls, and solar hybrid backup systems',
      'Architectural interior, exterior, LED street, and emergency egress lighting',
      'Earthing, bonding, surge protection, and lightning protection grids',
      'Addressable fire alarms, smoke detection, and voice evacuation systems',
      'Structured IP cabling, CCTV surveillance, biometric access control, and ELV security'
    ] 
  },
  { 
    slug: 'civil-engineering', 
    title: 'Civil Engineering', 
    short: 'Sustainable water networks, bulk infrastructure, roads, and drainage built for lasting impact.', 
    intro: 'We plan and engineer civil infrastructure that makes urban, rural, and industrial developments resilient, connected, and environmentally sound.', 
    icon: Droplets, 
    points: [
      'Water reticulation networks, dams, reservoirs, and agricultural irrigation design',
      'Bulk municipal and rural water & sewer infrastructure',
      'Water purification and sewage treatment plant design',
      'High-capacity pump stations, rising mains, and hydraulic modeling',
      'Geotechnical surveys, site drainage, and groundwater management',
      'Road design, pavement design, access corridors, and transport networks'
    ] 
  },
  { 
    slug: 'structural-engineering', 
    title: 'Structural Engineering', 
    short: 'High-strength frameworks for commercial towers, industrial silos, storage tanks, and bridges.', 
    intro: 'We engineer durable structural systems with strict focus on load capacity, structural integrity, longevity, and Zimbabwean code compliance.', 
    icon: Building2, 
    points: [
      'Structural steel design, transmission grids, cellular towers, and mast structures',
      'Bulk storage structures including industrial silos and agricultural storage tanks',
      'Liquid-retaining reinforced concrete reservoirs and settling basins',
      'Highway and railway bridge structural design',
      'Structural integrity audits, load testing, condition surveys, and retrofits',
      'Multi-storey commercial, industrial, and residential building frameworks'
    ] 
  },
  { 
    slug: 'project-management', 
    title: 'Project Management', 
    short: 'Disciplined control over scope, budget, contracts (FIDIC/JBCC), and site supervision.', 
    intro: 'We guide your project from early feasibility through procurement, contractor management, and site supervision—keeping timelines clear and budgets protected.', 
    icon: ClipboardCheck, 
    points: [
      'Project initiation, risk appraisal, and technical feasibility studies',
      'Scope, schedule, cost, quality, and environmental risk controls',
      'Procurement strategy, bill of quantities (BOQ), and tender documentation',
      'Contractor adjudication and contract administration (FIDIC / JBCC / NEC)',
      'On-site quality supervision, progress tracking, and clerk of works',
      'Commissioning, snag resolution, and final asset handover'
    ] 
  },
  { 
    slug: 'bim-technology', 
    title: 'BIM & Digital Twins', 
    short: 'LOD 600 spatial coordination and 3D digital twin models that eliminate site clashes.', 
    intro: 'We deploy advanced Building Information Modeling (BIM) to coordinate all engineering disciplines in 3D—eliminating site rework before fabrication starts.', 
    icon: Cpu, 
    points: [
      '3D multidisciplinary spatial clash detection and resolution',
      'LOD 100 through LOD 600 digital model development',
      '4D construction scheduling and 5D cost integration',
      'BIM Execution Plans (BEP) and information management standards',
      'As-built digital twin modeling for facility management',
      'Code compliance verification and thermal/energy simulation'
    ] 
  },
];

const serviceProfiles = {
  'mechanical-engineering': { focus: 'Occupant comfort, indoor air quality, and low operating costs.', positioning: 'Mechanical systems designed to run quietly, efficiently, and reliably.', body: 'From HVAC climate controls and clean water systems to fire suppression, boiler plants, and elevators, we coordinate the mechanical backbone that makes your building safe and comfortable.', outcomes: ['Healthy internal air quality and climate control', 'Significantly lower energy and water bills', 'Fully compliant life-safety and fire protection systems'], stages: ['Feasibility & heat load analysis', 'Detailed MEP system design', 'Tender & construction management'] },
  'electrical-engineering': { focus: 'Power continuity, energy efficiency, and intelligent security.', positioning: 'Electrical networks engineered for complete confidence under demand.', body: 'We plan main power distribution, backup generators, solar integration, lighting, and security as one seamless network—keeping your operations running without interruption.', outcomes: ['Uninterrupted backup power & generator strategies', 'Energy-efficient LED lighting & emergency systems', 'Connected CCTV, access control, and fire alarms'], stages: ['Power demand & load assessment', 'Distribution & switchgear design', 'Supervision, testing & commissioning'] },
  'civil-engineering': { focus: 'Infrastructure that connects communities and protects water resources.', positioning: 'Water, drainage, and transport engineered for long-term endurance.', body: 'Our civil engineering team combines environmental data, site conditions, water resources, and transport requirements into practical infrastructure that is cost-effective to construct and reliable to operate.', outcomes: ['Dependable bulk water reticulation & sewer networks', 'Resilient storm drainage and road access corridors', 'Environmentally sound water treatment facilities'], stages: ['Site surveys & geotechnical testing', 'Infrastructure design & modeling', 'Construction oversight & handover'] },
  'structural-engineering': { focus: 'Structural strength, material efficiency, and lasting integrity.', positioning: 'Frameworks resolved around safety, load demands, and constructability.', body: 'We design structural systems for commercial towers, industrial facilities, storage tanks, and transport infrastructure—balancing safety, structural efficiency, and long-term durability.', outcomes: ['Clear load paths and robust structural integrity', 'Optimized steel and reinforced concrete designs', 'Independent structural audits and retrofit solutions'], stages: ['Structural appraisal & load analysis', 'Detailed structural calculations & CAD/BIM', 'Site inspections & structural certification'] },
  'project-management': { focus: 'Clear decisions, budget protection, and smooth delivery.', positioning: 'A direct, transparent path from project brief to built reality.', body: 'We bring scope, timelines, procurement, contracts (FIDIC/JBCC), and site supervision into one transparent framework so you can make informed decisions with total confidence.', outcomes: ['Transparent risk management & cost controls', 'Fair contractor adjudication & contract management', 'Orderly commissioning, snagging, and final handover'], stages: ['Initiation & feasibility appraisal', 'Procurement & contract administration', 'On-site supervision & final close-out'] },
  'bim-technology': { focus: 'Catching clashes on screen—not on the construction site.', positioning: 'BIM modeling that transforms design coordination into site confidence.', body: 'We build coordinated 3D digital models across all disciplines to eliminate spatial clashes, streamline construction schedules, and produce asset-ready digital twins for facility managers.', outcomes: ['Zero multidisciplinary clashes on site', 'Structured LOD 100–600 model deliverables', 'Asset-ready digital twins for facility management'], stages: ['BIM Execution Plan (BEP) setup', '3D Model clash detection & reviews', 'As-built digital twin handover'] }
};

const deliverySteps = [
  { step: '01', title: 'Feasibility & Briefing', desc: 'Detailed site appraisal, regulatory code review, risk evaluation, and conceptual engineering strategy.', icon: Compass },
  { step: '02', title: 'Multidisciplinary Design & BIM', desc: 'Integrated MEP, civil, and structural design coordinated in 3D using LOD 600 clash detection.', icon: Layers },
  { step: '03', title: 'Procurement & Contracts', desc: 'Comprehensive tender documentation, bill of quantities (BOQ), contractor adjudication, and FIDIC/JBCC contract administration.', icon: FileCheck2 },
  { step: '04', title: 'Supervision & Handover', desc: 'On-site quality monitoring, testing, commissioning, snag resolution, and final asset handover.', icon: ShieldCheck }
];

function ServiceCard({ service, image, index }) {
  const Icon = service.icon;
  return (
    <article className="ohm-service-page-card" style={{ animationDelay: `${(index || 0) * 0.12}s` }}>
      <div className="ohm-service-card-header">
        <div className="ohm-service-page-icon">
          {image ? <img src={image} alt={service.title} width="72" height="64" /> : <Icon size={38} strokeWidth={1.2} />}
        </div>
        <div className="ohm-service-card-meta">
          <span className="ohm-service-index-badge">0{index + 1}</span>
          <span className="ohm-capability-tag">CORE DISCIPLINE</span>
        </div>
      </div>
      <p className="ohm-kicker">EXPLORE THE CAPABILITY</p>
      <h2><a href={`/${service.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}>{service.title}</a></h2>
      <p className="ohm-service-summary">{service.short}</p>
      <ul className="ohm-service-highlights">
        {service.points.slice(0, 4).map((pt) => (
          <li key={pt}><Check size={16} /><span>{pt}</span></li>
        ))}
      </ul>
      <div className="ohm-service-card-footer">
        <a className="ohm-text-link" href={`/${service.slug}/`}>
          <span>View full capability details</span>
          <ArrowRight size={17} />
        </a>
      </div>
    </article>
  );
}

export default function ServicesPage({ slug = 'services' }) {
  const pageHeaders = window.ohmThemeData?.pageHeaderImages || {};
  const images = window.ohmThemeData?.serviceImages || {};
  const detailImages = window.ohmThemeData?.detailImages || {};
  const selected = services.find((service) => service.slug === slug);

  if (selected) {
    const Icon = selected.icon;
    const profile = serviceProfiles[selected.slug];
    const detailImage = pageHeaders[selected.slug] || window.ohmThemeData?.currentHeaderImage || detailImages[selected.slug];
    return (
      <main className="ohm-services-page ohm-service-detail">
        <section className="ohm-service-detail-hero" style={{ backgroundImage: detailImage ? `url(${detailImage})` : undefined }}>
          <div className="ohm-container">
            <a className="ohm-back-link" href="/services/"><ArrowLeft size={17} /> All engineering services</a>
            <p className="ohm-kicker">OHM CORE ENGINEERING / DISCIPLINE</p>
            <h1>{selected.title}</h1>
            <p className="ohm-service-detail-lede">{selected.intro}</p>
          </div>
        </section>

        <section className="ohm-service-detail-overview">
          <div className="ohm-container ohm-detail-overview-grid">
            <div className="ohm-detail-overview-mark"><Icon size={58} strokeWidth={1.1} /><span>{profile.focus}</span></div>
            <div><p className="ohm-kicker">THE OHM APPROACH</p><h2>{profile.positioning}</h2><p className="ohm-detail-copy">{profile.body}</p></div>
          </div>
        </section>

        <section className="ohm-service-detail-body ohm-container">
          <div className="ohm-detail-sidebar">
            <div className="ohm-detail-badge"><strong>Integrated delivery</strong><span>Coordinated with OHM’s wider engineering, BIM, and project-management capability.</span></div>
            <div className="ohm-detail-stage-list"><p className="ohm-kicker">PROJECT JOURNEY</p>{profile.stages.map((stage, index) => <div key={stage}><span>0{index + 1}</span>{stage}</div>)}</div>
          </div>
          <div>
            <p className="ohm-kicker">CAPABILITY SCOPE</p>
            <h2>What this discipline brings to the project.</h2>
            <div className="ohm-detail-outcomes">{profile.outcomes.map((outcome) => <div key={outcome}><Check size={18} /><span>{outcome}</span></div>)}</div>
            <h3 className="ohm-detail-subhead">Technical deliverables</h3>
            <ul className="ohm-service-points">{selected.points.map((point) => <li key={point}><Check size={18} /><span>{point}</span></li>)}</ul>
            <div className="ohm-detail-consult-box"><h3>Need technical consultation for {selected.title}?</h3><p>Share your brief, feasibility requirements, or design information and we will help define the right next step.</p><a className="ohm-button ohm-button-orange" href="/contact">Request technical proposal <ArrowRight size={17} /></a></div>
          </div>
        </section>

        <section className="ohm-service-next">
          <div className="ohm-container">
            <p className="ohm-kicker">CONTINUE EXPLORING OTHER DISCIPLINES</p>
            <div className="ohm-service-next-grid">
              {services.filter((s) => s.slug !== selected.slug).slice(0, 2).map((s) => (
                <a key={s.slug} href={`/${s.slug}/`}>
                  <div>
                    <span className="ohm-next-kicker">ENGINEERING CAPABILITY</span>
                    <strong>{s.title}</strong>
                  </div>
                  <ArrowRight size={22} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  const coverImage = pageHeaders['services'] || window.ohmThemeData?.currentHeaderImage || images.cover;

  return (
    <main className="ohm-services-page">
      {/* Hero Section */}
      <section className="ohm-services-hero" style={{ backgroundImage: coverImage ? `url(${coverImage})` : undefined }}>
        <div className="ohm-services-hero-overlay" />
        <div className="ohm-container">
          <div className="ohm-services-hero-content-wrap">
            <div>
              <p className="ohm-kicker">INTEGRATED ENGINEERING SERVICES GROUP</p>
              <h1>Engineering that<br /><span>makes projects work.</span></h1>
              <p className="ohm-services-hero-desc">From building systems and site civil works to heavy structures, BIM modeling, and project management controls, OHM delivers multidisciplinary precision from inception to final handover.</p>
            </div>

            {/* Premium Floating Contact Badge */}
            {Array.isArray(window.ohmThemeData?.contacts?.phones) && window.ohmThemeData.contacts.phones.length > 0 && (
              <div className="ohm-hero-contact-badge">
                <div className="ohm-hero-contact-badge-header">
                  <span className="ohm-hero-badge-pulse" />
                  <span className="ohm-hero-badge-title">Get in touch with us</span>
                </div>
                <div className="ohm-hero-contact-badge-list">
                  {window.ohmThemeData.contacts.phones.map((phone, idx) => (
                    <a key={`hero-phone-${idx}`} href={`tel:${(phone || '').replace(/\s+/g, '')}`} className="ohm-hero-phone-chip">
                      <span className="ohm-phone-icon-box"><Phone size={13} /></span>
                      <span className="ohm-phone-number-text">{phone}</span>
                    </a>
                  ))}
                  {Array.isArray(window.ohmThemeData?.contacts?.emails) && window.ohmThemeData.contacts.emails[0] && (
                    <a href={`mailto:${window.ohmThemeData.contacts.emails[0]}`} className="ohm-hero-email-chip">
                      <Mail size={13} />
                      <span>{window.ohmThemeData.contacts.emails[0]}</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ohm-services-stats-bar">
          <div className="ohm-container ohm-services-stats-grid">
            <div className="ohm-services-stat-item"><strong>6</strong><span>Core Engineering Disciplines</span></div>
            <div className="ohm-services-stat-item"><strong>LOD 600</strong><span>Advanced BIM Modeling Standard</span></div>
            <div className="ohm-services-stat-item"><strong>Full Cycle</strong><span>Inception through Final Handover</span></div>
            <div className="ohm-services-stat-item"><strong>CODE</strong><span>Compliance-led design and delivery</span></div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="ohm-services-intro ohm-container">
        <div>
          <p className="ohm-kicker">OUR CAPABILITIES</p>
          <h2>One connected engineering partner.</h2>
        </div>
        <div>
          <p>OHM Core Engineering is a dynamic multidisciplinary consulting firm delivering Mechanical, Electrical, Civil, and Structural Engineering, integrated with expert Project Management and advanced BIM coordination.</p>
          <p className="ohm-intro-subtext">By coordinating all disciplines under one group, we eliminate design gaps, resolve structural and MEP clashes early, and keep projects strictly on schedule and within budget.</p>
        </div>
      </section>

      {/* Capability Grid */}
      <section className="ohm-services-page-grid ohm-container">
        {services.map((service, index) => (
          <ServiceCard key={service.slug} service={service} image={images[service.slug]} index={index} />
        ))}
      </section>

      {/* Engineering Delivery Process Section */}
      <section className="ohm-services-process">
        <div className="ohm-container">
          <div className="ohm-section-heading">
            <div>
              <p className="ohm-kicker">HOW WE DELIVER</p>
              <h2>The OHM Engineering Framework.</h2>
            </div>
            <p>A systematic, transparent approach that connects feasibility, multidisciplinary design, procurement, and site execution.</p>
          </div>
          <div className="ohm-process-grid">
            {deliverySteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <article key={step.step} className="ohm-process-card">
                  <div className="ohm-process-step-header">
                    <span className="ohm-process-number">{step.step}</span>
                    <StepIcon size={28} strokeWidth={1.25} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Commitment Section */}
      <section className="ohm-services-quality">
        <div className="ohm-container ohm-quality-grid">
          <div>
            <p className="ohm-kicker">QUALITY & RESPONSIBILITY</p>
            <h2>Built around performance, safety, and sustainability.</h2>
          </div>
          <div className="ohm-quality-list">
            <div className="ohm-quality-item">
              <ShieldCheck size={26} />
              <div>
                <h4>Strict Code Compliance</h4>
                <p>All designs strictly comply with international building codes, national regulations, and local Zimbabwean statutory requirements.</p>
              </div>
            </div>
            <div className="ohm-quality-item">
              <Compass size={26} />
              <div>
                <h4>Energy Efficiency & Sustainability</h4>
                <p>We design low-carbon, energy-efficient infrastructure and HVAC systems that reduce long-term operational footprint.</p>
              </div>
            </div>
            <div className="ohm-quality-item">
              <Layers size={26} />
              <div>
                <h4>LOD 600 BIM Coordination</h4>
                <p>Digital twin models detect spatial clashes prior to fabrication, saving costs and preventing site delays.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ohm-services-cta">
        <div className="ohm-container">
          <p className="ohm-kicker">FROM CONCEPT TO HANDOVER</p>
          <h2>Let&apos;s coordinate the next stage of your project.</h2>
          <p className="ohm-cta-desc">Whether you are at feasibility, detailed design, procurement, or site construction, our senior engineers are ready to assist.</p>
          <div className="ohm-cta-actions">
            <a className="ohm-button ohm-button-orange" href="/contact">Talk to OHM <ArrowRight size={17} /></a>
            <a className="ohm-button ohm-button-navy" href="mailto:engineering@ohmcore.co.zw">Email Engineering Team</a>
          </div>
        </div>
      </section>
    </main>
  );
}
