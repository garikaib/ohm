import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const fallbackSlides = [
  {
    image: '/wp-content/uploads/2026/07/hero-build.jpg',
    eyebrow: 'DOLOR AMET SOCINIUS',
    title: 'BUILD A BETTER TOMORROW',
  },
  {
    image: '/wp-content/uploads/2026/07/hero-schedule.jpg',
    eyebrow: 'DOLOR AMET SOCINIUS',
    title: 'STAYING AHEAD OF SCHEDULE',
  },
  {
    image: '/wp-content/uploads/2026/07/hero-foundations.jpg',
    eyebrow: 'DOLOR AMET SOCINIUS',
    title: 'ALWAYS STRONG FOUNDATIONS',
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimer = useRef(null);

  const slides = window.ohmThemeData?.slides?.length
    ? window.ohmThemeData.slides
    : fallbackSlides;

  // Move slide index
  const move = useCallback((amount) => {
    setActive((current) => (current + amount + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay functionality
  useEffect(() => {
    if (isHovered) {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
      return;
    }

    autoPlayTimer.current = setInterval(() => {
      move(1);
    }, 6500);

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isHovered, move]);

  // Keyboard navigation when focused
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      move(-1);
    } else if (e.key === 'ArrowRight') {
      move(1);
    }
  };

  // Helper to format the title with line breaks dynamically
  const formatTitle = (title) => {
    if (typeof title !== 'string') return title;
    const words = title.split(' ');
    if (words.length > 2) {
      const middleIndex = Math.ceil(words.length / 2);
      const line1 = words.slice(0, middleIndex).join(' ');
      const line2 = words.slice(middleIndex).join(' ');
      return (
        <>
          {line1}
          <br />
          {line2}
        </>
      );
    }
    return title;
  };

  return (
    <section 
      className="ohm-hero"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Hero Showcase"
    >
      {slides.map((slide, index) => {
        const isActive = active === index;
        return (
          <div 
            key={slide.image} 
            className={`ohm-hero-slide ${isActive ? 'is-active' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            aria-hidden={!isActive}
          >
            {/* LCP optimization using native img tags with fetchpriority */}
            <img
              src={slide.image}
              alt=""
              className="ohm-hero-image"
              fetchpriority={index === 0 ? 'high' : 'low'}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="ohm-hero-overlay" />
            <div className="ohm-hero-copy">
              <div className="ohm-hero-eyebrow">{slide.eyebrow}</div>
              <h1>{formatTitle(slide.title)}</h1>
              <p>
                Lorem ipsum dolor sit amet messa. Consectetuer adipiscing elit. 
                Aenean commodo ligula eget dolor.
              </p>
              <div className="ohm-hero-actions">
                <a className="ohm-button ohm-button-orange" href="#read-more">Read More</a>
                <a className="ohm-button ohm-button-navy" href="#contact-us">Contact Us</a>
              </div>
            </div>
          </div>
        );
      })}

      <div className="ohm-hero-controls">
        <button 
          className="ohm-arrow ohm-arrow-light" 
          onClick={() => move(-1)} 
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </button>
        <button 
          className="ohm-arrow ohm-arrow-orange" 
          onClick={() => move(1)} 
          aria-label="Next slide"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="ohm-hero-dots" role="tablist" aria-label="Slides select">
        {slides.map((slide, index) => (
          <button 
            key={slide.image} 
            role="tab"
            aria-selected={active === index}
            aria-label={`Go to slide ${index + 1}`}
            className={active === index ? 'is-active' : ''} 
            onClick={() => setActive(index)} 
          />
        ))}
      </div>
    </section>
  );
}
