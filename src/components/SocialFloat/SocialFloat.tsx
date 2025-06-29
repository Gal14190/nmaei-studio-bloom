/* components/SocialFloat.tsx */
import React, { useEffect, useState } from 'react';
import { MessageCircle, Instagram } from 'lucide-react';

import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; // ← ודא שזה הנתיב הנכון אצלך

/* ---------- טיפוסים פנימיים ---------- */
interface SiteSocial {
  contact: {
    whatsapp: {
      number: string;
      message: string;
    };
  };
  social: {
    instagram?: string;
  };
}

/* ---------- קומפוננטת הכפתורים הצפים ---------- */
const SocialFloat = () => {
  const [data, setData] = useState<SiteSocial | null>(null);

  /* שליפה מ-Firestore  */
  useEffect(() => {
    const fetchSocialSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'config')); // ‼️ מסמך site-wide שלך
        if (snap.exists()) setData(snap.data() as SiteSocial);
      } catch (err) {
        console.error('Error loading social settings:', err);
      }
    };
    fetchSocialSettings();
  }, []);

  /* ערכי ברירת-מחדל אם אין במסד */
  const whatsappNumber =
    data?.contact?.whatsapp?.number || '972532731575';
  const whatsappMessage =
    data?.contact?.whatsapp?.message || 'שלום, אני מעוניין בייעוץ עיצוב';
  const instagramUrl =
    data?.social?.instagram || 'https://instagram.com/nmaei_studio';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          whatsappMessage,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      {/* Instagram */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Instagram"
      >
        <Instagram size={24} />
      </a>
    </div>
  );
};

export default SocialFloat;
