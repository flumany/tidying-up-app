
import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideBottomNav = location.pathname === '/onboarding';

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <main className="flex-1 pb-20">
        {children}
      </main>
      {!hideBottomNav && <BottomNavigation />}
    </div>
  );
};

export default Layout;
