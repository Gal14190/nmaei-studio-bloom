import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const menuItems = [{
    href: '/',
    label: 'בית'
  }, {
    href: '/projects',
    label: 'פרויקטים'
  }, {
    href: '/about',
    label: 'אודות'
  }, {
    href: '/services',
    label: 'שירותים'
  }, {
    href: '/contact',
    label: 'צור קשר'
  }];
  const isActiveLink = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-light tracking-wider text-gray-900 hover:text-cream-600 transition-colors duration-300">M I N É A</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {menuItems.map(item => <Link key={item.href} to={item.href} className={`relative text-sm font-medium transition-colors duration-300 hover:text-cream-600 ${isActiveLink(item.href) ? 'text-cream-600' : 'text-gray-700'}`}>
                {item.label}
                {isActiveLink(item.href) && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cream-600 rounded-full"></span>}
              </Link>)}
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t animate-fade-in">
            <nav className="py-4">
              {menuItems.map(item => <Link key={item.href} to={item.href} className={`block px-4 py-3 text-lg font-medium transition-colors duration-300 hover:bg-beige-50 hover:text-cream-600 ${isActiveLink(item.href) ? 'text-cream-600 bg-beige-50' : 'text-gray-700'}`} onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>)}
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;