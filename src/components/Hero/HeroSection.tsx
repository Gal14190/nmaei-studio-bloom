import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const HeroSection = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const docRef = doc(db, 'pages', 'home');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const contentBlocks = data.contentBlocks || [];

          const getBlock = (id: string) => contentBlocks.find((b: any) => b.id === id)?.content;

          setHeroData({
            image: getBlock('hero-image')?.url,
            title: getBlock('hero-title')?.text,
            subtitle: getBlock('hero-subtitle')?.text,
            tagline: getBlock('hero-tagline')?.text,
            description: getBlock('hero-description')?.text,
          });
        }
      } catch (err) {
        console.error('Error fetching hero data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroContent();
  }, []);

  if (loading) {
    return <div className="text-center p-6 text-white"></div>;
  }

  heroData.image = "/lovable-uploads/fallback-video.mp4"
  const isVideo = heroData?.image?.endsWith('.mp4');
  const fallbackImage = '/lovable-uploads/0a45c4d2-657f-4646-99b2-d0f432254035.png';
  const fallbackVideo = '/lovable-uploads/fallback-video.mp4';

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background media */}
      {isVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={fallbackVideo} type="video/mp4" />
          הדפדפן שלך לא תומך בתגית וידאו.
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-up">
          {/* Logo/Brand */}
          <div className="mb-8">
            <img
              alt="NMAEI Logo"
              className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 animate-scale-in"
              src="/lovable-uploads/f911b76f-cd03-4ecc-ace0-40a934fa63db.png"
            />
            <h1 className="hero-text text-white text-shadow-lg mb-2 text-7xl py-[23px]">
              {heroData?.title || 'M I N É A'}
            </h1>
            <p className="text-lg md:text-xl tracking-wide text-warm-50">
              {heroData?.subtitle || 'Architecture | Interior Design'}
            </p>
          </div>

          {/* Tagline */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-white font-light leading-relaxed text-shadow mb-6">
              {heroData?.tagline || 'לראות | להבין | להרגיש'}
            </h2>
            <p className="body-large text-white/90 max-w-2xl mx-auto text-shadow">
              {heroData?.description || 'תכנון שמתרגם חלומות ומדבר עם השטח'}
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            style={{ animationDelay: '0.6s', display: 'block' }}
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          >
            <Button
              asChild
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium transition-all duration-300 bg-white/10 backdrop-blur-sm"
              style={{ width: '15vh', margin: 'auto 1vw' }}
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
              style={{ width: '15vh' }}
            >
              <Link to="/contact" className="text-white hover:text-gray-900 flex items-center justify-center">
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
