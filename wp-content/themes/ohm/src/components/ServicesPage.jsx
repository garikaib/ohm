import React from 'react';
import { ArrowLeft, ArrowRight, Check, ClipboardCheck, Droplets, Lightbulb, Settings2, Building2 } from 'lucide-react';

const services = [
  { slug: 'mechanical-engineering', title: 'Mechanical Engineering', short: 'Reliable building systems engineered for comfort, safety, and efficiency.', intro: 'We design robust mechanical systems for complex modern buildings and specialised facilities.', icon: Settings2, points: ['HVAC&R and thermal control systems', 'Hot and cold water plumbing, sanitary drainage, and greywater recycling', 'Fire protection, suppression, sprinklers, standpipes, and fire pumps', 'Reverse osmosis, boiler plants, fuel systems, and LP gas systems', 'Passenger and goods lifts, escalators, and vertical transportation'] },
  { slug: 'electrical-engineering', title: 'Electrical Engineering', short: 'Safe, resilient electrical and ELV systems for modern facilities.', intro: 'Our electrical team delivers efficient power, lighting, protection, and communications systems with safety and continuity at the centre.', icon: Lightbulb, points: ['Low-voltage power distribution', 'Standby generators, ATS, and UPS systems', 'Interior, exterior, LED, and emergency egress lighting', 'Earthing, bonding, surge, and lightning protection', 'Fire alarms, structured cabling, CCTV, access control, and ELV security'] },
  { slug: 'civil-engineering', title: 'Civil Engineering', short: 'Water, transport, drainage, and infrastructure for sustainable communities.', intro: 'We plan and engineer the civil systems that make rural, urban, and industrial developments reliable and resilient.', icon: Droplets, points: ['Water reticulation, dams, and irrigation design', 'Rural and urban infrastructure development', 'Water and sewer treatment plants', 'Pump stations, pumping mains, and hydraulic infrastructure', 'Geotechnical, drainage, environmental, groundwater, and road design'] },
  { slug: 'structural-engineering', title: 'Structural Engineering', short: 'Resilient structures for buildings, storage, utilities, and transport.', intro: 'We engineer durable structural frameworks and assessments with a focus on safety, load capacity, longevity, and code compliance.', icon: Building2, points: ['Steel structures, transmission grids, cellular towers, and mast frames', 'Storage structures including silos and tanks', 'Liquid-retaining structures, reservoirs, and basins', 'Road and rail bridges', 'Site investigations, structural assessments, and building frames'] },
  { slug: 'project-management', title: 'Project Management', short: 'Clear controls from initiation and feasibility through final handover.', intro: 'We coordinate scope, decisions, people, and site activity so projects move forward with confidence.', icon: ClipboardCheck, points: ['Project initiation and feasibility studies', 'Scope, time, cost, quality, and risk management', 'Procurement strategy and tender documentation', 'Contractor adjudication and contract administration', 'Site supervision, progress monitoring, commissioning, snagging, and handover'] },
];

function ServiceCard({ service, image }) {
  const Icon = service.icon;
  return <article className="ohm-service-page-card">
    <div className="ohm-service-page-icon">{image ? <img src={image} alt="" width="72" height="64" /> : <Icon size={34} strokeWidth={1.2} />}</div>
    <p className="ohm-kicker">EXPLORE THE CAPABILITY</p>
    <h2>{service.title}</h2>
    <p>{service.short}</p>
    <a className="ohm-text-link" href={`/${service.slug}/`}>View service <ArrowRight size={17} /></a>
  </article>;
}

export default function ServicesPage({ slug = 'services' }) {
  const images = window.ohmThemeData?.serviceImages || {};
  const selected = services.find((service) => service.slug === slug);
  if (selected) {
    const Icon = selected.icon;
    return <main className="ohm-services-page ohm-service-detail">
      <section className="ohm-service-detail-hero"><div className="ohm-container"><a className="ohm-back-link" href="/services/"><ArrowLeft size={17} /> All services</a><p className="ohm-kicker">OHM CORE ENGINEERING / SERVICE</p><h1>{selected.title}</h1><p className="ohm-service-detail-lede">{selected.intro}</p></div></section>
      <section className="ohm-service-detail-body ohm-container"><div className="ohm-detail-icon"><Icon size={52} strokeWidth={1.1} /></div><div><p className="ohm-kicker">CAPABILITY OVERVIEW</p><h2>Designed for dependable project delivery.</h2><p className="ohm-detail-copy">{selected.short} Our work is coordinated with the wider project team to meet cost, time, quality, safety, and compliance goals.</p><ul className="ohm-service-points">{selected.points.map((point) => <li key={point}><Check size={17} />{point}</li>)}</ul></div></section>
      <section className="ohm-service-next"><div className="ohm-container"><p className="ohm-kicker">CONTINUE EXPLORING</p><div className="ohm-service-next-grid">{services.filter((service) => service.slug !== selected.slug).slice(0, 2).map((service) => <a key={service.slug} href={`/${service.slug}/`}><span>{service.title}</span><ArrowRight size={20} /></a>)}</div></div></section>
    </main>;
  }
  return <main className="ohm-services-page">
    <section className="ohm-services-hero" style={{ backgroundImage: images.cover ? `url(${images.cover})` : undefined }}><div className="ohm-services-hero-overlay" /><div className="ohm-container"><p className="ohm-kicker">INTEGRATED ENGINEERING SERVICES</p><h1>Engineering that<br /><span>makes projects work.</span></h1><p>From building systems and infrastructure to structures, BIM, and project controls, OHM brings the right disciplines together from inception to handover.</p></div></section>
    <section className="ohm-services-intro ohm-container"><div><p className="ohm-kicker">OUR CAPABILITIES</p><h2>One connected view of the project.</h2></div><p>OHM Core Engineering is a multidisciplinary consulting firm focused on Mechanical, Electrical, Civil, and Structural Engineering, supported by expert Project Management and BIM technology.</p></section>
    <section className="ohm-services-page-grid ohm-container">{services.map((service) => <ServiceCard key={service.slug} service={service} image={images[service.slug]} />)}</section>
    <section className="ohm-services-cta"><div className="ohm-container"><p className="ohm-kicker">FROM CONCEPT TO HANDOVER</p><h2>Let&apos;s coordinate the next stage of your project.</h2><a className="ohm-button ohm-button-orange" href="#contact">Talk to OHM <ArrowRight size={17} /></a></div></section>
  </main>;
}
