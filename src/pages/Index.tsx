import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import HeroSection from '@/components/Hero/HeroSection';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, Heart, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

import Design from '../components/design';
import loading_icon from '../loading.gif'

const Index = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

    const [design, setDesign] = useState({
      darkColor: { backgroundColor: '#111827' },
      lightColor: { backgroundColor: '#faf9f7' },
    });

  // const featuredProjects = [
  //   {
  //     id: 1,
  //     title: 'דירה מינימליסטית בתל אביב',
  //     category: 'דירות',
  //     image: '/lovable-uploads/26882b0c-ca51-42ec-9c11-bf089d9cfc7b.png',
  //     description: 'עיצוב נקי ומודרני עם נגיעות חמות'
  //   }, 
  //   {
  //     id: 2,
  //     title: 'בית פרטי בהרצליה',
  //     category: 'בתים',
  //     image: '/lovable-uploads/7b2d2c09-e0eb-4d31-928f-8332dda0acdc.png',
  //     description: 'אדריכלות עכשווית עם חיבור לטבע'
  //   }, 
  //   {
  //     id: 3,
  //     title: 'חדר אמבטיה יוקרתי',
  //     category: 'פרויקטים מיוחדים',
  //     image: '/lovable-uploads/e0c6aeb2-cfc6-4c92-b675-e0c005c3e481.png',
  //     description: 'שילוב אבן טבעית ועיצוב מינימליסטי'
  //   }
  // ];

  // const values = [
  //   {
  //     icon: <Eye className="w-8 h-8" />,
  //     title: 'ראייה ייחודית',
  //     description: 'כל פרויקט מקבל גישה אישית ויחודה המותאמת לצרכי הלקוח'
  //   }, 
  //   {
  //     icon: <Heart className="w-8 h-8" />,
  //     title: 'תשוקה לפרטים',
  //     description: 'תשומת לב מיוחדת לכל פרט, מהקונספט ועד לביצוע הסופי'
  //   }, 
  //   {
  //     icon: <Lightbulb className="w-8 h-8" />,
  //     title: 'חדשנות ויצירתיות',
  //     description: 'פתרונות מתקדמים המשלבים פונקציונליות ואסתטיקה'
  //   }
  // ];


  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const docRef = doc(db, 'pages', 'home');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const contentBlocks = data.contentBlocks || [];

          const getBlock = (id: string) => contentBlocks.find((b: any) => b.id === id)?.content;

          setContent({
            values: getBlock('values-section')?.values || [],
            quote: getBlock('quote-tadao') || null,
            cta: getBlock('cta-ready-to-start') || null,
            featuredProjects: getBlock('featured-projects') || [],
          });
        }

        const result = await Design(); // כאן מחכים לתשובה
        setDesign(result); // שמים את התוצאה ב־state
      } catch (err) {
        console.error('Error fetching page content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, []);

  if (loading) {
    return <div className="text-center p-10">
      {/* <img src={loading_icon} style={{margin: "auto"}} /> */}
    </div>;
  }

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="section-title text-gray-900 mb-6">{content?.featuredProjects.title}</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
            {content?.featuredProjects.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content?.featuredProjects.projects.map((project, index) => (
              <div key={project.id} className="group cursor-pointer animate-fade-in" style={{
                animationDelay: `${index * 0.2}s`
              }}>
                <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/5] mb-4">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-gold-600 font-medium">{project.category}</span>
                  <h3 className="text-xl font-medium text-gray-900 group-hover:text-gold-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-gold-600 text-gold-600 hover:bg-gold-600 hover:text-black">
              <Link to="/projects" className="flex items-center gap-2">
                כל הפרויקטים
                <ArrowLeft size={18} className="rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Values Section - from Firestore */}
      <section className="py-20 bg-beige-50" style={design.lightColor}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="section-title text-gray-900 mb-6">הערכים שלנו</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              העקרונות המנחים אותנו בכל פרויקט ופרויקט
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content?.values.map((value: any, index: number) => {
              return (
                <div key={index} className="text-center group animate-fade-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 text-gold-600 rounded-full mb-6 group-hover:bg-gold-600 transition-colors duration-300">
                    {value.icon == "Eye"? <Eye />: value.icon == "Heart"? <Heart />: <Lightbulb />}
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      {content?.quote && (
        <section className="py-20 bg-gray-900 text-white" style={design.darkColor}>
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto animate-fade-up">
              <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8 text-gold-200 px-[25px]">
                "{content.quote.text}"
              </blockquote>
              <cite className="text-gold-400 font-medium">- {content.quote.author}</cite>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {content?.cta && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto animate-fade-up">
              <h2 className="section-title text-gray-900 mb-6">{content.cta.title}</h2>
              <p className="body-large text-gray-600 mb-8">
                {content.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" style={design.darkColor}>
                  <Link to={content.cta.primaryButton.link} className="flex items-center gap-2">
                    {content.cta.primaryButton.text}
                    <ArrowLeft size={18} className="rotate-180" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to={content.cta.secondaryButton.link}>
                    {content.cta.secondaryButton.text}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;
