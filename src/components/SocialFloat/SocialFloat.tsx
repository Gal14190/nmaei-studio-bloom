
import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';

const SocialFloat = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/972501234567?text=שלום, אני מעוניין בייעוץ עיצוב"
        target="_blank"
        rel="noopener noreferrer"
        className="group w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      {/* Instagram Button */}
      <a
        href="https://instagram.com/nmaei_studio"
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
