import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Award, Users, Clock, Heart } from 'lucide-react';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Design from '../components/design';

const iconMap: Record<string, JSX.Element> = {
  Award: <Award className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Clock: <Clock className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />
};

const About = () => {
  const [design, setDesign] = useState({
    darkColor: { backgroundColor: '#111827' },
    lightColor: { backgroundColor: '#faf9f7' },
  });

  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'pages', 'about');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const contentBlocks = data.contentBlocks || [];

          const getBlock = (id: string) =>
            contentBlocks.find((b: any) => b.id === id)?.content;

          setContent({
            title: getBlock('hero-title'),
            subtitle: getBlock('hero-subtitle'),
            story: getBlock('counter'),
            quote: getBlock('quote-tadao'),
            timeline: getBlock('mysory'),
          });
        }

        const result = await Design();
        setDesign(result);
      } catch (err) {
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div className="text-center p-10" />;
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-beige-50" style={design.lightColor}>
        <div className="container mx-auto px-4 text-center animate-fade-up">
          <h1 className="section-title text-gray-900 mb-6">{content.title.text}</h1>
          <p className="body-large text-gray-600 leading-relaxed">{content.subtitle.text}</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in relative">
              <img
                src="/lovable-uploads/abb71ea3-eb84-4ef8-bc2a-169b6f172cd7.png"
                alt="נופר - אדריכלית ומעצבת פנים"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold-100 rounded-lg -z-10" />
            </div>

            <div className="space-y-6 animate-fade-up">
              <h2 className="text-3xl font-light text-gray-900 mb-4">{content.story.title}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {content.story.description.split('\n').map((line: string, i: number) => (
                  <p key={i}>{line.trim()}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white" style={design.darkColor}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.story.values.map((stat: any, index: number) => (
              <div
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-600 rounded-full mb-4">
                  {iconMap[stat.icon] || <span className="text-sm">?</span>}
                </div>
                <div className="text-3xl font-light text-gold-400 mb-2">{stat.description}</div>
                <div className="text-gray-300 text-sm">{stat.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-beige-50" style={design.lightColor}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-up">
            <h2 className="section-title text-gray-900 mb-6">{content.timeline.title}</h2>
          </div>
          <div className="space-y-8">
            {content.timeline.values.map((item: any, index: number) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 animate-fade-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="md:w-24 flex-shrink-0">
                  <div className="inline-block bg-gold-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {2021 + index}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-gray-900 mb-8">
              "{content.quote.text}"
            </blockquote>
            <cite className="text-gold-600 font-medium text-lg">— {content.quote.author}</cite>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
