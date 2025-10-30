'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { LanguageToggle } from './LanguageToggle';

export function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const params = useParams();
  const currentLocale = (params.locale as string) || 'en';

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down (after scrolling past 10px)
      else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false);
        setIsMenuOpen(false); // Close menu when hiding header
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header 
      className={`md:hidden fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        theme === 'dark' 
          ? 'bg-[#05060a]/95 border-white/10' 
          : 'bg-white/95 border-gray-200'
      }`}
    >
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" locale={currentLocale} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center font-heading font-bold text-black text-lg">
              B
            </div>
            <span className="font-heading text-lg font-bold text-gradient">
              BelajarFinance
            </span>
          </Link>

          {/* Burger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-[var(--text-primary)]" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-[var(--text-primary)]" />
            )}
          </button>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className={`absolute top-full left-0 right-0 backdrop-blur-xl border-b p-4 space-y-4 ${
            theme === 'dark'
              ? 'bg-[#05060a]/98 border-white/10'
              : 'bg-white/98 border-gray-200'
          }`}>
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--text-secondary)]">Theme</span>
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-white/10 hover:bg-white/15 border-white/20'
                    : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <>
                    <MoonIcon className="w-5 h-5 text-[var(--accent)]" />
                    <span className="text-sm font-medium text-[var(--text-primary)]">Dark</span>
                  </>
                ) : (
                  <>
                    <SunIcon className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium text-[var(--text-primary)]">Light</span>
                  </>
                )}
              </button>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--text-secondary)]">Language</span>
              <LanguageToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
