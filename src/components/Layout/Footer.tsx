import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Studio Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-light tracking-wider text-cream-400">NMAEI</h3>
            <p className="text-gray-300 leading-relaxed">
              סטודיו לאדריכלות ועיצוב פנים<br />
              תכנון חכם, עיצוב מינימליסטי וחם
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="https://instagram.com/nmaei_studio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cream-400 transition-colors duration-300" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com/nmaei.studio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cream-400 transition-colors duration-300" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="mailto:info@nmaei.com" className="text-gray-400 hover:text-cream-400 transition-colors duration-300" aria-label="Email">
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-cream-400">קישורים מהירים</h3>
            <nav className="space-y-2">
              <Link to="/projects" className="block text-gray-300 hover:text-cream-400 transition-colors duration-300">
                פרויקטים
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-cream-400 transition-colors duration-300">
                אודות
              </Link>
              <Link to="/services" className="block text-gray-300 hover:text-cream-400 transition-colors duration-300">
                שירותים
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-cream-400 transition-colors duration-300">
                צור קשר
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-cream-400">צור קשר</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone size={18} className="text-cream-400" />
                <span className="text-gray-300">053-273-1575</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail size={18} className="text-cream-400" />
                <span className="text-gray-300">Nofarmizr3008@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <MapPin size={18} className="text-cream-400 mt-1" />
                <span className="text-gray-300">
                  אזור המרכז<br />
                  ישראל
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 NMAEI Studio. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;