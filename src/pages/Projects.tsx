import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Design from '../components/design';

/* ---------- Interfaces ---------- */
interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  coverImage: string;
  description: string;
  materials: string;
  client?: string;
  designConcept?: string;
  tags: string[];
  gallery: string[];
  published: boolean;
  slug: string;
}

interface Category {
  id: string;
  label: string;
}

interface ImageCache {
  [id: string]: string;
}

/* ---------- Component ---------- */
const Projects = () => {
  /* ---------- State ---------- */
  const [design, setDesign] = useState({
    darkColor: { backgroundColor: '#111827' },
    lightColor: { backgroundColor: '#faf9f7' },
  });
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageMap, setImageMap] = useState<ImageCache>({});

  const [pageContent, setPageContent] = useState({
    title: { text: '' },
    subtitle: { text: '' },
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  /* ---------- Fetch Data ---------- */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        // עיצוב
        const designRes = await Design();
        setDesign(designRes);

        // קטגוריות
        const catSnap = await getDocs(collection(db, 'categories'));
        const catData: Category[] = catSnap.docs.map((d) => ({
          id: d.id,
          label: (d.data().name as string) || 'ללא שם',
        }));
        setCategories([{ id: 'all', label: 'הכל' }, ...catData]);

        // פרויקטים
        const projSnap = await getDocs(query(collection(db, 'projects')));
        const projData = projSnap.docs.map(
          (d) => ({ id: d.id, ...(d.data() as Project) }) as Project
        );
        setProjects(projData);

        // תמונות
        const imageIds = new Set<string>();
        projData.forEach((proj) => {
          if (proj.coverImage) imageIds.add(proj.coverImage);
          proj.gallery?.forEach((id) => imageIds.add(id));
        });

        const imageEntries = await Promise.all(
          Array.from(imageIds).map(async (id) => {
            try {
              const snap = await getDoc(doc(db, 'gallery', id));
              if (snap.exists()) return [id, snap.data().url];
              return null;
            } catch (err) {
              console.error(`שגיאה בטעינת תמונה ${id}`, err);
              return null;
            }
          })
        );

        const validImages: ImageCache = {};
        imageEntries.forEach((entry) => {
          if (entry) validImages[entry[0]] = entry[1];
        });
        setImageMap(validImages);

        // תוכן דף
        const pageSnap = await getDoc(doc(db, 'pages', 'projects'));
        if (pageSnap.exists()) {
          const blocks = pageSnap.data().contentBlocks || [];
          const getBlock = (id: string) =>
            blocks.find((b: any) => b.id === id)?.content;

          setPageContent({
            title: getBlock('hero-title') || { text: '' },
            subtitle: getBlock('hero-subtitle') || { text: '' },
          });
        }
      } catch (err) {
        console.error('Data load error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  /* ---------- Derived Data ---------- */
  const filteredProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter, projects]
  );

  const getCategoryLabel = (id: string) =>
    categories.find((c) => c.id === id)?.label || id;

  /* ---------- Image Modal ---------- */
  const openImageModal = (coverImageId: string, galleryIds: string[]) => {
    const urls: string[] = [];

    if (imageMap[coverImageId]) urls.push(imageMap[coverImageId]);

    galleryIds.forEach((id) => {
      const url = imageMap[id];
      if (url && !urls.includes(url)) urls.push(url);
    });

    if (urls.length === 0) return;

    setGalleryImages(urls);
    setSelectedImage(urls[0]);
    setSelectedImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setGalleryImages([]);
    setSelectedImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  /* ---------- Render ---------- */
  if (loading) return <div className="text-center p-10">טוען...</div>;

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-16 pb-8 bg-beige-50" style={design.lightColor}>
        <div className="container mx-auto px-4 text-center animate-fade-up">
          <h1 className="section-title text-gray-900 mb-4">
            {pageContent.title.text}
          </h1>
          <p className="body-large text-gray-600 max-w-2xl mx-auto">
            {pageContent.subtitle.text}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeFilter === cat.id ? 'default' : 'outline'}
              onClick={() => setActiveFilter(cat.id)}
              style={activeFilter === cat.id ? design.lightColor : {}}
              className="border-gray-300 text-gray-700 hover:bg-cream-50"
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj, idx) => (
              <div
                key={proj.id}
                className="group animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div
                    className="relative cursor-pointer overflow-hidden"
                    onClick={() => openImageModal(proj.coverImage, proj.gallery)}
                  >
                    <img
                      src={imageMap[proj.coverImage] || ''}
                      alt={proj.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm">
                        לחץ להגדלה
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 text-sm font-medium text-warm-800">
                      {getCategoryLabel(proj.category)} • {proj.location}
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-cream-600">
                      {proj.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {proj.description}
                    </p>
                    <div className="border-t border-gray-200 pt-4 text-sm text-gray-500">
                      <span className="font-medium">חומרים:</span> {proj.materials}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 text-gray-500 text-lg">
              לא נמצאו פרויקטים בקטגוריה זו
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div
            className="relative max-w-4xl w-full max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-cream-300"
            >
              <X size={32} />
            </button>

            <div className="relative w-full flex items-center justify-center">
              {/* Right */}
              <button
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev === 0 ? galleryImages.length - 1 : prev - 1
                  )
                }
                className="absolute right-0 text-white text-3xl px-4"
                style={{
                  height: '100%',
                  backgroundColor: '#0002',
                  fontWeight: 'bold',
                }}
              >
                ‹
              </button>

              {/* Image */}
              <img
                src={galleryImages[selectedImageIndex]}
                alt="תמונה מוגדלת"
                className="max-h-[80vh] object-contain rounded-lg mx-auto"
              />

              {/* Left */}
              <button
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev === galleryImages.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute left-0 text-white text-3xl px-4"
                style={{
                  height: '100%',
                  backgroundColor: '#0002',
                  fontWeight: 'bold',
                }}
              >
                ›
              </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {galleryImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`h-16 cursor-pointer rounded border ${
                    selectedImageIndex === idx
                      ? 'border-white'
                      : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Projects;
