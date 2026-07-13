import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  Moon,
  Sun,
  Menu,
  ChevronDown,
  User as UserIcon,
  LogOut,
  Settings as SettingsIcon } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { GlobalSearch } from './GlobalSearch';
import { NotificationCenter } from './NotificationCenter';
export function Topbar({ onMenu }: {onMenu: () => void;}) {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
      setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return (
    <header className="h-16 shrink-0 bg-card border-b border-line flex items-center gap-3 px-4 sm:px-6">
      <button
        className="lg:hidden text-secondary"
        onClick={onMenu}
        aria-label="Open menu">
        
        <Menu size={22} />
      </button>

      <GlobalSearch />

      <div className="flex items-center gap-2 ml-auto">
        <NotificationCenter />

        <button
          onClick={toggleTheme}
          aria-label={
          theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
          }
          className="h-9 w-9 flex items-center justify-center rounded-xl border border-line text-secondary hover:text-accent hover:border-accent transition-colors">
          
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{
                rotate: -90,
                opacity: 0
              }}
              animate={{
                rotate: 0,
                opacity: 1
              }}
              exit={{
                rotate: 90,
                opacity: 0
              }}
              transition={{
                duration: 0.2
              }}>
              
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-bg transition-colors"
            aria-haspopup="menu"
            aria-expanded={menuOpen}>
            
            <Avatar
              name={currentUser?.name || 'User'}
              color={currentUser?.avatarColor}
              size="sm" />
            
            <span className="hidden sm:block text-sm font-medium text-maintext">
              {currentUser?.name}
            </span>
            <ChevronDown size={16} className="text-secondary" />
          </button>
          <AnimatePresence>
            {menuOpen &&
            <motion.div
              initial={{
                opacity: 0,
                y: -6
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -6
              }}
              transition={{
                duration: 0.15
              }}
              role="menu"
              className="absolute right-0 mt-2 w-52 bg-card border border-line rounded-xl shadow-lg py-1 z-50">
              
                <div className="px-4 py-2.5 border-b border-line">
                  <p className="text-sm font-medium text-maintext truncate">
                    {currentUser?.name}
                  </p>
                  <p className="text-xs text-secondary truncate">
                    {currentUser?.email}
                  </p>
                </div>
                <button
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  router.push('/profile');
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-maintext hover:bg-bg">
                
                  <UserIcon size={16} /> Profile
                </button>
                <button
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  router.push('/settings');
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-maintext hover:bg-bg">
                
                  <SettingsIcon size={16} /> Settings
                </button>
                <button
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                  router.push('/login');
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-bg">
                
                  <LogOut size={16} /> Sign out
                </button>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </header>);

}