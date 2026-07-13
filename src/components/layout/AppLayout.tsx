import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'sonner';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { ChatBot } from '../chatbot/ChatBot';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
export function AppLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    if (!currentUser) {
      router.replace('/login');
    }
  }, [currentUser, router]);
  if (!currentUser) return null;
  return (
    <div className="flex h-screen w-full bg-bg overflow-hidden">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenu={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <ChatBot />
      <Toaster
        position="top-right"
        theme={theme}
        toastOptions={{
          style: {
            background: 'var(--tl-card)',
            color: 'var(--tl-text)',
            border: '1px solid var(--tl-border)',
            borderRadius: '1rem'
          }
        }} />
      
    </div>);

}