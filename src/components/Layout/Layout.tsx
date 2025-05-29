import React from 'react';
import Header from './Header';
import Footer from './Footer';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({
  children
}: LayoutProps) => {
  return <div className="min-h-screen flex flex-col px-0 py-[240px]">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>;
};
export default Layout;