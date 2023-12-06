// Layout.tsx

import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer.tsx'; // 导入导航栏组件

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
