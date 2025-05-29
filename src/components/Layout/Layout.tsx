
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SocialFloat from '../SocialFloat/SocialFloat';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-14 md:pt-16">
        {children}
      </main>
      <Footer />
      <SocialFloat />
    </div>
  );
};

export default Layout;
