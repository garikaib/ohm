import React from 'react';
import { ArrowLeft, ArrowRight, Check, ClipboardCheck, Cpu, Droplets, Lightbulb, Settings2, Building2, ShieldCheck, Compass, Layers, FileCheck2 } from 'lucide-react';

const services = [
  { 
    slug: 'mechanical-engineering', 
    title: 'Mechanical Engineering', 
    short: 'Reliable building systems engineered for comfort, safety, and operational efficiency.', 
    intro: 'We design robust mechanical systems for complex modern buildings, industrial plants, and specialised commercial facilities.', 
    icon: Settings2, 
    points: [
      'Heating, ventilation, air conditioning, and refrigeration (HVAC&R)',
      'Hot and cold water plumbing, sanitary drainage, and greywater recycling',
      'Fire protection, suppression, sprinklers, standpipes, and gaseous systems',
      'Reverse osmosis, water treatment, and boiler plants',
      'Fuel service station infrastructure and LP gas systems',
      'Passenger and goods lifts, escalators, and vertical transportation'
    ] 
  },
  { 
    slug: 'electrical-engineering', 
    title: 'Electrical Engineering', 
    short: 'Safe, resilient electrical and ELV systems designed for continuous operation.', 
    intro: 'Our electrical team delivers efficient power, lighting, surge protection, and communications systems with safety and operational continuity at the core.', 
    icon: Lightbulb, 
    points: [
      'Low-voltage (LV) power distribution & switchgear design',
      'Standby generators, automatic transfer switches (ATS), and UPS systems',
      'Interior, exterior, architectural LED, and emergency egress lighting',
      'Earthing, bonding, surge protection, and lightning protection grids',
      'Fire alarm, smoke detection, and voice evacuation systems',
      'Structured cabling, CCTV, biometric access control, and integrated ELV security'
    ] 
  },
  { 
    slug: 'civil-engineering', 
    title: 'Civil Engineering', 
    short: 'Water, transport, drainage, and infrastructure for sustainable developments.', 
    intro: 'We plan and engineer civil systems that make rural, urban, and industrial developments reliable, resilient, and environmentally compliant.', 
    icon: Droplets, 
    points: [
      'Water reticulation networks, dams, reservoirs, and irrigation design',
      'Rural and urban bulk infrastructure development',
      'Water and sewage treatment plants',
      'Pump stations, rising mains, and hydraulic infrastructure',
      'Geotechnical investigations, drainage, and groundwater condition surveys',
      'Road design, access corridors, and transport infrastructure'
    ] 
  },
  { 
    slug: 'structural-engineering', 
    title: 'Structural Engineering', 
    short: 'Resilient frameworks for buildings, storage, utilities, and transport grids.', 
    intro: 'We engineer durable structural frameworks and assessments with strict focus on load capacity, longevity, safety, and code compliance.', 
    icon: Building2, 
    points: [
      'Steel structures, transmission grids, cellular towers, and mast frames',
      'Storage structures including industrial silos and bulk storage tanks',
      'Liquid-retaining structures, concrete reservoirs, and settling basins',
      'Road and railway bridge structures',
      'Site investigations, structural integrity assessments, and retrofits',
      'Single- and multi-storey commercial, industrial, and residential frames'
    ] 
  },
  { 
    slug: 'project-management', 
    title: 'Project Management', 
    short: 'Rigorous control from initiation and feasibility through final handover.', 
    intro: 'We coordinate scope, timelines, procurement, contracts, and site execution so projects move forward with transparency and confidence.', 
    icon: ClipboardCheck, 
    points: [
      'Project initiation, risk appraisal, and feasibility studies',
      'Scope, schedule, cost, quality, and environmental management',
      'Procurement strategy and comprehensive tender documentation',
      'Contractor adjudication and contract administration (FIDIC / JBCC)',
      'On-site supervision, progress monitoring, and quality assurance',
      'Commissioning, snagging management, and final handover coordination'
    ] 
  },
  { 
    slug: 'bim-technology', 
    title: 'BIM Technology', 
    short: 'Coordinated digital models and LOD 600 information for precise delivery.', 
    intro: 'We deploy advanced Building Information Modeling (BIM) to coordinate multidisciplinary designs, eliminate site clashes, and deliver asset-ready data.', 
    icon: Cpu, 
    points: [
      '3D multidisciplinary design coordination and spatial clash detection',
      'LOD 100 through LOD 600 digital model development',
      '4D construction scheduling and 5D cost estimation integration',
      'BIM execution plans (BEP) and information management standards',
      'As-built digital twin modeling for facility operations and asset management',
      'Code compliance verification and thermal/energy simulation support'
    ] 
  },
];

const serviceProfiles = {
  'mechanical-engineering': { focus: 'Comfort, safety, and reliable building performance.', positioning: 'Mechanical systems that work quietly, efficiently, and safely.', body: 'From HVAC&R and water services to fire protection, boiler plants, and vertical transportation, we coordinate the systems that make buildings usable and resilient.', outcomes: ['Comfortable, healthy internal environments', 'Efficient water, energy, and plant operation', 'Coordinated fire and life-safety systems'], stages: ['Concept and load studies', 'Detailed system design', 'Tender and construction support'] },
  'electrical-engineering': { focus: 'Power continuity, safety, and intelligent building services.', positioning: 'Electrical infrastructure designed for confidence under demand.', body: 'We plan power distribution, standby generation, lighting, protection, and ELV systems as one coordinated network—supporting safe operation from first energisation through everyday use.', outcomes: ['Resilient power and backup strategies', 'Clear, efficient lighting and emergency systems', 'Connected security and communications infrastructure'], stages: ['Demand and resilience assessment', 'Distribution and systems design', 'Testing, commissioning, and handover'] },
  'civil-engineering': { focus: 'Infrastructure that connects places and supports communities.', positioning: 'Water, movement, and drainage engineered for the long term.', body: 'Our civil engineering work joins site conditions, water resources, transport, drainage, and environmental requirements into infrastructure that is practical to build and dependable to operate.', outcomes: ['Reliable water and wastewater networks', 'Resilient roads, drainage, and access corridors', 'Infrastructure aligned with site and environmental conditions'], stages: ['Investigations and feasibility', 'Infrastructure planning and design', 'Construction oversight and completion'] },
  'structural-engineering': { focus: 'Strength, durability, and confidence in the built frame.', positioning: 'Structures resolved around load, use, and longevity.', body: 'We design and assess structural systems for buildings, industrial facilities, storage, utilities, and transport infrastructure—balancing safety, material efficiency, constructability, and future performance.', outcomes: ['Clear load paths and robust structural systems', 'Durable steel and concrete solutions', 'Practical assessments, strengthening, and retrofit advice'], stages: ['Site and condition assessment', 'Analysis, design, and documentation', 'Construction review and certification support'] },
  'project-management': { focus: 'Decisions, controls, and delivery from brief to handover.', positioning: 'A clearer route from project intent to built reality.', body: 'We bring scope, programme, cost, procurement, contracts, quality, and site execution into one transparent management framework so the project team can make informed decisions early.', outcomes: ['Visible risks, responsibilities, and decisions', 'Controlled procurement and contract administration', 'Orderly commissioning, snagging, and handover'], stages: ['Initiation and feasibility', 'Procurement and delivery controls', 'Supervision and close-out'] },
  'bim-technology': { focus: 'Better coordination through better information.', positioning: 'BIM that turns design coordination into delivery confidence.', body: 'We use coordinated digital models and information standards to identify clashes early, support programme and cost decisions, and produce asset-ready information for operations after handover.', outcomes: ['Fewer multidisciplinary clashes and site surprises', 'Structured LOD 100–600 information', 'Digital twins that remain useful after completion'], stages: ['Information requirements and BEP', 'Model coordination and design reviews', 'As-built handover and asset information'] }
};

const deliverySteps = [
  { step: '01', title: 'Feasibility & Strategy', desc: 'Initial site appraisal, regulatory code review, risk evaluation, and multidisciplinary conceptual planning.', icon: Compass },
  { step: '02', title: 'Multidisciplinary Design & BIM', desc: 'Integrated MEP, civil, and structural design using LOD 600 spatial clash detection and energy simulation.', icon: Layers },
  { step: '03', title: 'Procurement & Contract Controls', desc: 'Detailed tender documentation, contractor adjudication, and transparent contract administration.', icon: FileCheck2 },
  { step: '04', title: 'Supervision & Handover', desc: 'On-site quality monitoring, commissioning, snag resolution, and final asset-ready handover documentation.', icon: ShieldCheck }
];

function ServiceCard({ service, image }) {
  const Icon = service.icon;
  return (
    <article className="ohm-service-page-card">
      <div className="ohm-service-card-header">
        <div className="ohm-service-page-icon">
          {image ? <img src={image} alt={service.title} width="72" height="64" /> : <Icon size={36} strokeWidth={1.25} />}
        </div>
        <span className="ohm-capability-tag">CORE DISCIPLINE</span>
      </div>
      <p className="ohm-kicker">EXPLORE THE CAPABILITY</p>
      <h2><a href={`/${service.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}>{service.title}</a></h2>
      <p className="ohm-service-summary">{service.short}</p>
      <ul className="ohm-service-highlights">
        {service.points.slice(0, 4).map((pt) => (
          <li key={pt}><Check size={15} /><span>{pt}</span></li>
        ))}
      </ul>
      <a className="ohm-text-link" href={`/${service.slug}/`}>View full capability details <ArrowRight size={17} /></a>
    </article>
  );
}

export default function ServicesPage({ slug = 'services' }) {
  const images = window.ohmThemeData?.serviceImages || {};
  const detailImages = window.ohmThemeData?.detailImages || {};
  const selected = services.find((service) => service.slug === slug);

  if (selected) {
    const Icon = selected.icon;
    const profile = serviceProfiles[selected.slug];
    const detailImage = detailImages[selected.slug];
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

  return (
    <main className="ohm-services-page">
      {/* Hero Section */}
      <section className="ohm-services-hero" style={{ backgroundImage: images.cover ? `url(${images.cover})` : undefined }}>
        <div className="ohm-services-hero-overlay" />
        <div className="ohm-container">
          <p className="ohm-kicker">INTEGRATED ENGINEERING SERVICES GROUP</p>
          <h1>Engineering that<br /><span>makes projects work.</span></h1>
          <p>From building systems and site civil works to heavy structures, BIM modeling, and project management controls, OHM delivers multidisciplinary precision from inception to final handover.</p>
          
          <div className="ohm-services-stats-bar">
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
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} image={images[service.slug]} />
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
