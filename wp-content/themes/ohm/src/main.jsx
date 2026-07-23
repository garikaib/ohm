import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import HeroSlider from './components/HeroSlider.jsx';
import HomepageSections from './components/HomepageSections.jsx';
import ServicesPage from './components/ServicesPage.jsx';
import CompanyPages from './components/CompanyPages.jsx';
import BlogPage from './components/BlogPage.jsx';
import SinglePostPage from './components/SinglePostPage.jsx';
import './index.css';

function Home() {
  const slug = window.ohmThemeData?.pageSlug || '';
  const isSinglePost = window.ohmThemeData?.isSinglePost || false;

  if (isSinglePost) return <SinglePostPage slug={slug} />;
  if (slug === 'blog') return <BlogPage />;
  if (slug === 'services' || ['mechanical-engineering','electrical-engineering','civil-engineering','structural-engineering','project-management'].includes(slug)) return <ServicesPage slug={slug} />;
  if (['about','contact','team'].includes(slug)) return <CompanyPages slug={slug} />;
  return (
    <div className="ohm-home">
      <HeroSlider />
      <HomepageSections />
    </div>
  );
}

// Render Header root
const headerElement = document.getElementById('ohm-header-root');
if (headerElement) {
  createRoot(headerElement).render(<Header />);
}

// Render Footer root
const footerElement = document.getElementById('ohm-footer-root');
if (footerElement) {
  createRoot(footerElement).render(<Footer />);
}

// Render Page Content root
const rootElement = document.getElementById('ohm-root');
if (rootElement) {
  createRoot(rootElement).render(<Home />);
}
