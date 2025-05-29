
import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'הכל' },
    { id: 'apartments', label: 'דירות' },
    { id: 'houses', label: 'בתים' },
    { id: 'commercial', label: 'מסחרי' },
    { id: 'offices', label: 'משרדים' }
  ];

  const projects = [
    {
      id: 1,
      title: 'דירה מינימליסטית בתל אביב',
      category: 'apartments',
      location: 'תל אביב',
      image: '/lovable-uploads/26882b0c-ca51-42ec-9c11-bf089d9cfc7b.png',
      description: 'עיצוב נקי ומודרני המשלב פונקציונליות עם אסתטיקה מינימליסטית',
      materials: 'עץ אלון, שיש לבן, זכוכית',
      year: '2024'
    },
    {
      id: 2,
      title: 'בית פרטי בהרצליה',
      category: 'houses',
      location: 'הרצליה',
      image: '/lovable-uploads/7b2d2c09-e0eb-4d31-928f-8332dda0acdc.png',
      description: 'אדריכלות עכשווית עם חיבור חזק לטבע ולנוף',
      materials: 'בטון חשוף, עץ טיק, אבן טבעית',
      year: '2024'
    },
    {
      id: 3,
      title: 'חדר אמבטיה יוקרתי',
      category: 'apartments',
      location: 'רמת גן',
      image: '/lovable-uploads/e0c6aeb2-cfc6-4c92-b675-e0c005c3e481.png',
      description: 'עיצוב ספא ביתי עם שילוב אבן טבעית ואלמנטים מינימליסטיים',
      materials: 'אבן טבעית, עץ במבוק, ברונזה',
      year: '2023'
    },
    {
      id: 4,
      title: 'חדר אמבטיה מודרני',
      category: 'houses',
      location: 'כפר סבא',
      image: '/lovable-uploads/3a5c7c4f-9b3c-4616-a008-11145645b34d.png',
      description: 'חדר אמבטיה יוקרתי עם אמבט אבן וטקסטורות טבעיות',
      materials: 'שיש, עץ אגוז, פליז',
      year: '2023'
    },
    {
      id: 5,
      title: 'סלון יוקרתי',
      category: 'apartments',
      location: 'תל אביב',
      image: '/lovable-uploads/0a85161f-705c-4a04-ad1a-921ed6a25804.png',
      description: 'סלון מודרני עם פריטי עיצוב ייחודיים ותאורה מותאמת',
      materials: 'עור איטלקי, עץ אלון, מתכת',
      year: '2023'
    },
    {
      id: 6,
      title: 'חדר שינה מעוצב',
      category: 'houses',
      location: 'רעננה',
      image: '/lovable-uploads/27c74a05-6338-4ae2-b8ca-2231ff6e02d2.png',
      description: 'חדר שינה יוקרתי עם חלונות גדולים ועיצוב אלגנטי',
      materials: 'עץ ונגה, בדים טבעיים, זכוכית',
      year: '2023'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-beige-50">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-up">
            <h1 className="section-title text-gray-900 mb-6">הפרויקטים שלנו</h1>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              מבחר מעבודותינו המדגימות את הגישה המקצועית, הייחודית והיצירתית שלנו
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                onClick={() => setActiveFilter(category.id)}
                className={`${
                  activeFilter === category.id 
                    ? "bg-cream-500 hover:bg-cream-600 text-gray-900" 
                    : "border-gray-300 text-gray-700 hover:bg-cream-50 hover:border-cream-300 hover:text-cream-700"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-cream-500 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-sm font-medium text-warm-800">
                        {categories.find(cat => cat.id === project.category)?.label} • {project.location}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-cream-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">חומרים:</span> {project.materials}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">לא נמצאו פרויקטים בקטגוריה זו</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
