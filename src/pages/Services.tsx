import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Design from '@/components/design';

const Services = () => {
  const [design, setDesign] = useState({
      darkColor: { backgroundColor: '#111827' },
      lightColor: { backgroundColor: '#faf9f7' },
    });

  const [loading, setLoading] = useState(true);
  const [servicesTitle, setServicesTitle] = useState('');
  const [servicesDescription, setServicesDescription] = useState('');
  const [services, setServices] = useState([]);
  const [processTitle, setProcessTitle] = useState('');
  const [processDescription, setProcessDescription] = useState('');
  const [processSteps, setProcessSteps] = useState([]);
  const [cta, setCta] = useState({ title: '', description: '', primaryButton: {}, secondaryButton: {} });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const designRes = await Design();
        setDesign(designRes);

        const docRef = doc(db, 'pages', 'service');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const blocks = data.contentBlocks || [];

          const servicesBlock = blocks.find((b: any) => b.id === 'myservices');
          const processBlock = blocks.find((b: any) => b.id === 'myworkflow');
          const ctaBlock = blocks.find((b: any) => b.id === 'cta-ready-to-start');

          if (servicesBlock) {
            setServices(servicesBlock.content.values);
            setServicesTitle(servicesBlock.content.title || '');
            setServicesDescription(servicesBlock.content.description || '');
          }

          if (processBlock) {
            setProcessSteps(processBlock.content.values);
            setProcessTitle(processBlock.content.title || '');
            setProcessDescription(processBlock.content.description || '');
          }

          if (ctaBlock) setCta(ctaBlock.content);
        }
      } catch (error) {
        console.error('שגיאה בטעינת התוכן:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div className="text-center p-10"></div>;
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-beige-50" style={design.lightColor}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="section-title text-gray-900 mb-6">{servicesTitle}</h1>
          <p className="body-large text-gray-600 leading-relaxed">{servicesDescription}</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {services.map((service: any, index: number) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="lg:w-1/2">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={service.image || '/placeholder.jpg'}
                    alt={service.title}
                    className="w-full h-64 lg:h-80 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-2xl font-medium text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <ul className="space-y-2">
                  {(service.features || []).map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-gold-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gray-900 text-white" style={design.darkColor}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title text-white mb-6">{processTitle}</h2>
          <p className="body-large text-gray-300 max-w-2xl mx-auto mb-12">{processDescription}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step: any, i: number) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-gold-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:bg-gold-500 transition-colors duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl text-gold-400 mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-beige-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title text-gray-900 mb-6">{cta.title}</h2>
          <p className="body-large text-gray-600 mb-8">{cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold-600 hover:bg-gold-700 text-white" style={design.darkColor}>
                <Link to="/contact" className="flex items-center gap-2">
                  צור קשר
                  <ArrowLeft size={18} className="rotate-180" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/projects">
                  צפה בפרויקטים
                </Link>
              </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
