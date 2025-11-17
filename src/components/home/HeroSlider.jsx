import React, { useEffect, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { heroSlides } from '../../data/banners';

const SLIDE_INTERVAL = 6500;

const HeroSlider = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActiveSlide((prev) => (prev + 1) % heroSlides.length),
      SLIDE_INTERVAL,
    );
    return () => clearInterval(timer);
  }, []);

  // Determine text direction: even indices from left, odd from right
  const textDirection = activeSlide % 2 === 0 ? 'left' : 'right';
  const textInitialX = textDirection === 'left' ? -100 : 100;

  return (
    <div className="relative h-[600px] sm:h-[650px] md:h-[700px] lg:h-[800px] w-full overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <Motion.div
          key={heroSlides[activeSlide].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Full-screen background image */}
          <div className="absolute inset-0">
            <img
              src={heroSlides[activeSlide].image}
              alt={heroSlides[activeSlide].title}
              className="h-full w-full object-cover"
              loading={activeSlide === 0 ? 'eager' : 'lazy'}
              onError={(e) => {
                console.error('Hero image failed to load:', heroSlides[activeSlide].image);
                e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop';
              }}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </div>

          {/* Text content with alternating animations */}
          <div className="relative z-10 flex h-full items-center px-4 sm:px-6 md:px-8 lg:px-16">
            <Motion.div
              key={`text-${activeSlide}`}
              initial={{ opacity: 0, x: textInitialX }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className={`w-full max-w-2xl space-y-3 sm:space-y-4 md:space-y-6 text-white ${
                textDirection === 'left' ? 'text-left' : 'ml-auto text-right'
              }`}
            >
              <Motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xs sm:text-sm uppercase tracking-[0.15rem] sm:tracking-[0.2rem] text-white/90"
              >
                {heroSlides[activeSlide].subtitle}
              </Motion.p>
              
              <Motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-black leading-tight"
              >
                {heroSlides[activeSlide].title}
              </Motion.h1>
              
              <Motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 hidden sm:block"
              >
                {heroSlides[activeSlide].description}
              </Motion.p>
              
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className={textDirection === 'left' ? '' : 'flex justify-end'}
              >
                <button
                  onClick={() => navigate(heroSlides[activeSlide].cta.href)}
                  className="rounded-full bg-red-600 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs sm:text-sm md:text-base font-bold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl"
                >
                  {heroSlides[activeSlide].cta.label}
                </button>
              </Motion.div>
            </Motion.div>
          </div>
        </Motion.div>
      </AnimatePresence>

      {/* Slider indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActiveSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === activeSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
