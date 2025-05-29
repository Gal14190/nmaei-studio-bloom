
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Award, Users, Clock, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Award className="w-8 h-8" />, number: '50+', label: 'פרויקטים הושלמו' },
    { icon: <Users className="w-8 h-8" />, number: '40+', label: 'לקוחות מרוצים' },
    { icon: <Clock className="w-8 h-8" />, number: '3', label: 'שנות ניסיון' },
    { icon: <Heart className="w-8 h-8" />, number: '100%', label: 'מחויבות לאיכות' }
  ];

  const timeline = [
    {
      year: '2021',
      title: 'ההתחלה',
      description: 'סיום לימודי הנדסאית אדריכלות וכניסה לתחום המקצועי'
    },
    {
      year: '2022',
      title: 'השכלה נוספת',
      description: 'השלמת תואר B.Design בעיצוב פנים והתמחות בעיצוב מינימליסטי'
    },
    {
      year: '2023',
      title: 'ייסוד הסטודיו',
      description: 'הקמת סטודיו NMAEI ותחילת עבודה עצמאית עם לקוחות פרטיים'
    },
    {
      year: '2024',
      title: 'צמיחה והתפתחות',
      description: 'הרחבת הפעילות לפרויקטים מסחריים וצוות מקצועי מורחב'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-beige-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h1 className="section-title text-gray-900 mb-6">אודות נופר</h1>
            <p className="body-large text-gray-600 leading-relaxed">
              אדריכלית ומעצבת פנים עם תשוקה ליצירת מרחבים חמים, פונקציונליים ומעוצבים בקו מינימליסטי נקי
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="animate-fade-in">
              <div className="relative">
                <img
                  src="/lovable-uploads/abb71ea3-eb84-4ef8-bc2a-169b6f172cd7.png"
                  alt="נופר - אדריכלית ומעצבת פנים"
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold-100 rounded-lg -z-10"></div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 animate-fade-up">
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-4">הסיפור שלי</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    שלום, אני נופר, אדריכלית ומעצבת פנים עם תשוקה עמוקה ליצירת מרחבים שמחברים בין פונקציונליות לאסתטיקה. 
                    הדרך שלי החלה עם לימודי הנדסאית אדריכלות, והמשיכה עם תואר B.Design בעיצוב פנים.
                  </p>
                  <p>
                    במהלך שלוש שנות הניסיון שלי, פיתחתי גישה ייחודית המשלבת עיצוב מינימליסטי עם חמימות ונוחות. 
                    אני מאמינה שכל מרחב צריך לספר סיפור ולהעביר רגש, תוך מתן מענה מושלם לצרכים הפרקטיים של המשתמשים.
                  </p>
                  <p>
                    הפילוסופיה המקצועית שלי מבוססת על הבנה עמוקה של הלקוח, תשומת לב לפרטים הקטנים, 
                    ושימוש בחומרים איכותיים שיעמדו במבחן הזמן.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-medium text-gray-900 mb-3">השכלה מקצועית</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• הנדסאית אדריכלות - מכללה טכנולוגית</li>
                  <li>• תואר B.Design בעיצוב פנים</li>
                  <li>• התמחות בעיצוב מינימליסטי ובר-קיימא</li>
                  <li>• 3 שנות ניסיון מקצועי</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-600 rounded-full mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-light text-gold-400 mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-beige-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-up">
              <h2 className="section-title text-gray-900 mb-6">המסע המקצועי</h2>
              <p className="body-large text-gray-600">
                הדרך שהובילה להקמת סטודיו NMAEI
              </p>
            </div>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col md:flex-row gap-6 animate-fade-up"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="md:w-24 flex-shrink-0">
                    <div className="inline-block bg-gold-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {item.year}
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
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-gray-900 mb-8">
              "אני מנסה להשתמש בעיצוב מינימליסטי כדי ליצור חיבור רגשי חזק בין אנשים למרחב"
            </blockquote>
            <cite className="text-gold-600 font-medium text-lg">— טדאו אנדו</cite>
            <p className="text-gray-600 mt-4">
              ציטוט זה מנחה אותי בכל פרויקט - ליצור מרחבים שלא רק יפים, אלא גם מעוררי רגש ומעצימי חוויה.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
