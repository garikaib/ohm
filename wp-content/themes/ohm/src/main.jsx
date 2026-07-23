import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import HeroSlider from './components/HeroSlider.jsx';
import './index.css';

function Home() {
  return (
    <div className="ohm-home">
      <HeroSlider />
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
