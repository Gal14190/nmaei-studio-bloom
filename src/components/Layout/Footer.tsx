import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import Design from '../design';

const Footer = () => {
  const [design, setDesign] = useState({
    darkColor: { backgroundColor: '#111827' },
    lightColor: { backgroundColor: '#faf9f7' },
  });

  const [siteData, setSiteData] = useState<any>(null);

  useEffect(() => {
    const fetchDesign = async () => {
      const result = await Design();
      setDesign(result);
    };

    const fetchSiteSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'config');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setSiteData(snap.data());
        } else {
          console.warn('config settings not found.');
        }
      } catch (error) {
        console.error('Error loading site settings:', error);
      }
    };

    fetchDesign();
    fetchSiteSettings();
  }, []);

  if (!siteData) return null;

  const { company, contact, social } = siteData;

  return (
    <footer className="bg-gray-900 text-white" style={design.darkColor}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Studio Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-light tracking-wider text-cream-400">
              {company?.name || 'Studio'}
            </h3>
            <div className="text-gray-300 leading-relaxed">
              {(company?.footerTagline || '').split('\n').map((line: string, i: number) => (
                <p key={i}>{line.trim()}</p>
              ))}
            </div>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {social?.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cream-400 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              )}
              {social?.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cream-400 transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
              )}
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="text-gray-400 hover:text-cream-400 transition-colors duration-300"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-cream-400">קישורים מהירים</h3>
            <nav className="space-y-2">
              {[
                { label: 'פרויקטים', path: '/projects' },
                { label: 'אודות', path: '/about' },
                { label: 'שירותים', path: '/services' },
                { label: 'צור קשר', path: '/contact' },
              ].map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  className="block text-gray-300 hover:text-cream-400 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-cream-400">צור קשר</h3>
            <div className="space-y-3">
              {contact?.phone && (
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Phone size={18} className="text-cream-400" />
                  <span className="text-gray-300">{contact.phone}</span>
                </div>
              )}
              {contact?.email && (
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Mail size={18} className="text-cream-400" />
                  <span className="text-gray-300">{contact.email}</span>
                </div>
              )}
              {contact?.address && (
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <MapPin size={18} className="text-cream-400 mt-1" />
                  <span
                    className="text-gray-300"
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {contact.address}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 {company?.name || 'Studio'}. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
