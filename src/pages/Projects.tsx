
import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      description: 'עיצוב נקי ומודרני המשלב פונקציונליות עם אסתטיקה מינימליסטית. הפרויקט כולל עיצוב מחדש מלא של דירת 4 חדרים במרכז תל אביב.',
      materials: 'עץ אלון, שיש לבן, זכוכית',
      year: '2024'
    },
    {
      id: 2,
      title: 'בית פרטי בהרצליה',
      category: 'houses',
      location: 'הרצליה',
      image: '/lovable-uploads/7b2d2c09-e0eb-4d31-928f-8332dda0acdc.png',
      description: 'אדריכלות עכשווית עם חיבור חזק לטבע ולנוף. תכנון בית פרטי יוקרתי הכולל גינה פרטית ובריכת שחייה.',
      materials: 'בטון חשוף, עץ טיק, אבן טבעית',
      year: '2024'
    },
    {
      id: 3,
      title: 'חדר אמבטיה יוקרתי',
      category: 'apartments',
      location: 'רמת גן',
      image: '/lovable-uploads/e0c6aeb2-cfc6-4c92-b675-e0c005c3e481.png',
      description: 'עיצוב ספא ביתי עם שילוב אבן טבעית ואלמנטים מינימליסטיים. חדר אמבטיה ראשי הכולל אמבטיה עומדת ומקלחת זכוכית.',
      materials: 'אבן טבעית, עץ במבוק, ברונזה',
      year: '2023'
    },
    {
      id: 4,
      title: 'חדר אמבטיה מודרני',
      category: 'houses',
      location: 'כפר סבא',
      image: '/lovable-uploads/3a5c7c4f-9b3c-4616-a008-11145645b34d.png',
      description: 'חדר אמבטיה יוקרתי עם אמבט אבן וטקסטורות טבעיות. שילוב חכם של תאורה טבעית ומלאכותית.',
      materials: 'שיש, עץ אגוז, פליז',
      year: '2023'
    },
    {
      id: 5,
      title: 'סלון יוקרתי',
      category: 'apartments',
      location: 'תל אביב',
      image: '/lovable-uploads/0a85161f-705c-4a04-ad1a-921ed6a25804.png',
      description: 'סלון מודרני עם פריטי עיצוב ייחודיים ותאורה מותאמת. מרחב פתוח המקשר בין המטבח לסלון.',
      materials: 'עור איטלקי, עץ אלון, מתכת',
      year: '2023'
    },
    {
      id: 6,
      title: 'חדר שינה מעוצב',
      category: 'houses',
      location: 'רעננה',
      image: '/lovable-uploads/27c74a05-6338-4ae2-b8ca-2231ff6e02d2.png',
      description: 'חדר שינה יוקרתי עם חלונות גדולים ועיצוב אלגנטי. שילוב של חומרים טבעיים עם טכנולוגיה מתקדמת.',
      materials: 'עץ ונגה, בדים טבעיים, זכוכית',
      year: '2023'
    },
    {
      id: 7,
      title: 'חדר שינה מינימליסטי',
      category: 'apartments',
      location: 'תל אביב',
      image: '/lovable-uploads/b703db5d-567a-40e3-ae88-77bfba99416b.png',
      description: 'עיצוב חדר שינה מינימליסטי עם מיטה פלטפורמה, תאורה מוסתרת ופלטת צבעים חמה ורגועה. שילוב של עץ טבעי ואבן עם אלמנטים מודרניים.',
      materials: 'עץ אלון, אבן טבעית, בד כותנה',
      year: '2024'
    },
    {
      id: 8,
      title: 'סלון פתוח עם נוף עירוני',
      category: 'apartments',
      location: 'רמת גן',
      image: '/lovable-uploads/1c80ddce-0dd5-4ec4-a21d-f0d701c3f30d.png',
      description: 'מרחב מגורים פתוח עם נוף עירוני מרהיב. עיצוב מודרני המדגיש את הקשר עם הסביבה החיצונה דרך חלונות גדולים ומרפסת פתוחה.',
      materials: 'בטון, עץ טיק, עור איטלקי',
      year: '2024'
    },
    {
      id: 9,
      title: 'מטבח מודרני ופונקציונלי',
      category: 'apartments',
      location: 'תל אביב',
      image: '/lovable-uploads/017bebea-5894-4666-84bb-de24193a2eee.png',
      description: 'מטבח מודרני עם אי מרכזי, ארונות ללא ידיות ותאורה מתקדמת. עיצוב נקי המשלב פונקציונליות מקסימלית עם אסתטיקה מינימליסטית.',
      materials: 'קוריאן, אלומיניום, זכוכית',
      year: '2024'
    },
    {
      id: 10,
      title: 'סלון עם קיר אבן טבעית',
      category: 'houses',
      location: 'הרצליה',
      image: '/lovable-uploads/f9a7ebd1-5328-4900-b095-ec4787056fac.png',
      description: 'סלון יוקרתי עם קיר אבן טבעית מרהיב ותאורה דרמטית. שילוב של טקסטורות טבעיות עם ריהוט מודרני ונקי.',
      materials: 'אבן טבעית, עץ אגוז, פליז',
      year: '2024'
    },
    {
      id: 11,
      title: 'סלון עם קמין וקיר עץ',
      category: 'houses',
      location: 'כפר סבא',
      image: '/lovable-uploads/24f8fb4c-2fdf-4441-bf72-e5521b295cb9.png',
      description: 'מרחב מגורים אלגנטי עם קמין מודרני וקיר עץ מעוצב. עיצוב שמדגיש חום ונוחות תוך שמירה על קווים נקיים ומודרניים.',
      materials: 'עץ אלון, שיש קררה, מתכת',
      year: '2024'
    },
    {
      id: 12,
      title: 'חדר אמבטיה עם אמבט אבן',
      category: 'houses',
      location: 'רעננה',
      image: '/lovable-uploads/d9024623-b85c-40e5-a5c0-6e264f6c1cab.png',
      description: 'חדר אמבטיה יוקרתי עם אמבט אבן מרהיב ותאורה מתחתית. שילוב של חומרים טבעיים עם טכנולוגיה מתקדמת ליצירת חוויית ספא ביתית.',
      materials: 'אבן בזלת, עץ טיק, ברונזה',
      year: '2024'
    },
    {
      id: 13,
      title: 'חדר ילדים יצירתי',
      category: 'apartments',
      location: 'גבעתיים',
      image: '/lovable-uploads/cc992aff-ed25-47d5-bc5e-abd17b330501.png',
      description: 'חדר ילדים מעוצב עם מתקני משחק מובנים, מיטת קומתיים ופינת קריאה נעימה. עיצוב שמעודד יצירתיות ומשחק תוך שמירה על ארגון ופונקציונליות.',
      materials: 'עץ ליבנה, בד כותנה, פלסטיק בטוח',
      year: '2024'
    },
    {
      id: 14,
      title: 'שירותי אורחים מעוצבים',
      category: 'apartments',
      location: 'תל אביב',
      image: '/lovable-uploads/c50f5f48-62fa-401f-9cbb-268ca89b0107.png',
      description: 'שירותי אורחים קומפקטיים ומעוצבים עם כיור מיוחד ותאורה דרמטית. עיצוב המדגיש איכות ופרטים מושקעים במרחב קטן.',
      materials: 'שיש קלקטה, ברונזה מוברש, עץ אגוז',
      year: '2024'
    },
    {
      id: 15,
      title: 'פינת איפור מעוצבת',
      category: 'houses',
      location: 'הרצליה',
      image: '/lovable-uploads/ea51160a-a9c7-4546-8755-89f9778d453c.png',
      description: 'פינת איפור אלגנטית עם תאורה מקצועית ומראה מעוצבת. שילוב של חומרים איכותיים ועיצוב פונקציונלי ליצירת מרחב אישי ייחודי.',
      materials: 'עץ אגוז, שיש לבן, ברונזה',
      year: '2024'
    },
    {
      id: 16,
      title: 'כניסה עם מדרגות מעוצבות',
      category: 'houses',
      location: 'רעננה',
      image: '/lovable-uploads/30d42e65-b4ea-42f9-bcd3-b58b949692c8.png',
      description: 'כניסה מרשימה עם מדרגות תלויות ופתרונות אחסון מובנים. עיצוב שמנצל כל סנטימטר תוך יצירת מרחב מסדר ואלגנטי.',
      materials: 'עץ אלון, מתכת שחורה, אבן טבעית',
      year: '2024'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-16 pb-8 bg-beige-50">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-up">
            <h1 className="section-title text-gray-900 mb-4">הפרויקטים שלנו</h1>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              מבחר מעבודותינו המדגימות את הגישה המקצועית, הייחודית והיצירתית שלנו
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 bg-white border-b border-gray-200">
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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div 
                    className="relative overflow-hidden cursor-pointer"
                    onClick={() => openImageModal(project.image)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
                        לחץ להגדלה
                      </span>
                    </div>
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
                    
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
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

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-cream-300 transition-colors"
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage}
              alt="תמונה מוגדלת"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Projects;
