
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Link } from 'react-router-dom';
import { Home, Palette, Users, Lightbulb, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: 'תכנון אדריכלי מלא',
      description: 'תכנון מפורט החל משלב הרעיון ועד לביצוע, כולל תוכניות עבודה, חזיתות וחתכים',
      features: [
        'תכנון פונקציונלי ואסתטי',
        'תוכניות עבודה מפורטות',
        'ליווי מול הרשויות',
        'פיקוח על הביצוע'
      ],
      image: '/lovable-uploads/30b6683c-eccd-4e1a-9437-2fae96c4540b.png'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'עיצוב פנים כולל ליווי',
      description: 'עיצוב פנים מקצועי המשלב סגנון אישי עם פתרונות פרקטיים לכל חלל בבית',
      features: [
        'קונספט עיצוב ייחודי',
        'בחירת חומרים ורהיטים',
        'תכנון תאורה מתקדם',
        'ליווי עד לסיום הפרויקט'
      ],
      image: '/lovable-uploads/0a85161f-705c-4a04-ad1a-921ed6a25804.png'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'ייעוץ ממוקד',
      description: 'ייעוץ מקצועי לשיפור ואופטימיזציה של מרחבים קיימים או פתרון בעיות ספציפיות',
      features: [
        'ייעוץ תכנוני מקצועי',
        'פתרונות לבעיות מרחב',
        'אופטימיזציה של פריסות',
        'ייעוץ לשיפוצים'
      ],
      image: '/lovable-uploads/27c74a05-6338-4ae2-b8ca-2231ff6e02d2.png'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'הדמיות וסקיצות',
      description: 'יצירת הדמיות תלת-ממדיות וסקיצות המאפשרות חזייה מדויקת של התוצאה הסופית',
      features: [
        'הדמיות תלת-ממד מפורטות',
        'סקיצות רעיוניות',
        'מצגות ייעודיות ללקוח',
        'גרסאות עיצוב חלופיות'
      ],
      image: '/lovable-uploads/abb71ea3-eb84-4ef8-bc2a-169b6f172cd7.png'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'פגישת היכרות',
      description: 'פגישה ראשונית להכרת הצרכים, החלומות והתקציב'
    },
    {
      step: '02',
      title: 'פיתוח קונספט',
      description: 'יצירת רעיון עיצובי ראשוני המבוסס על הדרישות שלכם'
    },
    {
      step: '03',
      title: 'תכנון מפורט',
      description: 'פיתוח התוכניות המפורטות וההדמיות הסופיות'
    },
    {
      step: '04',
      title: 'ביצוע וליווי',
      description: 'ליווי מקצועי לאורך כל שלבי הביצוע עד להשלמה'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-beige-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h1 className="section-title text-gray-900 mb-6">השירותים שלנו</h1>
            <p className="body-large text-gray-600 leading-relaxed">
              מגוון שירותי אדריכלות ועיצוב פנים המותאמים לכל צורך ותקציב
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center animate-fade-up`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                {/* Image */}
                <div className="lg:w-1/2">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-64 lg:h-80 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-medium text-gray-900">{service.title}</h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-gray-600">
                        <CheckCircle className="w-5 h-5 text-gold-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="section-title text-white mb-6">תהליך העבודה</h2>
            <p className="body-large text-gray-300 max-w-2xl mx-auto">
              כך אנחנו עובדים יחד כדי להגשים את החזון שלכם
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div 
                key={index} 
                className="text-center group animate-fade-up"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gold-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:bg-gold-500 transition-colors duration-300">
                    {item.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-700">
                      <div className="w-1/2 h-full bg-gold-600"></div>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-medium text-gold-400 mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-beige-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h2 className="section-title text-gray-900 mb-6">מעוניינים בפנייה אישית?</h2>
            <p className="body-large text-gray-600 mb-8">
              בואו נקבע פגישת ייעוץ ראשונה ונתחיל לתכנן יחד את הפרויקט שלכם
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold-600 hover:bg-gold-700 text-white">
                <Link to="/contact" className="flex items-center gap-2">
                  צור קשר עכשיו
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
        </div>
      </section>
    </Layout>
  );
};

export default Services;
