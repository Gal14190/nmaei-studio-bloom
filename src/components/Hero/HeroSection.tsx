
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/0a45c4d2-657f-4646-99b2-d0f432254035.png')`
        }}
      >
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-up">
          {/* Logo/Brand */}
          <div className="mb-8">
            <img 
              alt="NMAEI Logo" 
              className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 animate-scale-in object-cover" 
              src="/lovable-uploads/f911b76f-cd03-4ecc-ace0-40a934fa63db.png" 
            />
            <h1 className="hero-text text-white text-shadow-lg mb-2 text-7xl">N M A E I</h1>
            <p className="text-lg md:text-xl tracking-wide text-warm-50">Architecture | Interior Design</p>
          </div>

          {/* Tagline */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-white font-light leading-relaxed text-shadow mb-6">
              לראות | להבין | להרגיש
            </h2>
            <p className="body-large text-white/90 max-w-2xl mx-auto text-shadow">
              תכנון שמתרגם חלומות ומדבר עם השטח
            </p>
          </div>

          {/* Call to Action - Fixed button visibility */}
          <div 
            style={{ animationDelay: '0.6s' }} 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-cream-500 hover:bg-cream-600 text-gray-900 font-medium border-2 border-cream-500 hover:border-cream-600 transition-all duration-300"
            >
              <Link to="/projects" className="flex items-center gap-2">
                צפה בפרויקטים
                <ArrowLeft size={18} className="rotate-180" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium transition-all duration-300 bg-white/10 backdrop-blur-sm"
            >
              <Link to="/contact">
                צור קשר
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
