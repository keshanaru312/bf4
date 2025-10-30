'use client';

import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  HomeIcon, 
  BookOpenIcon, 
  NewspaperIcon, 
  CalculatorIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  NewspaperIcon as NewspaperIconSolid,
  CalculatorIcon as CalculatorIconSolid
} from '@heroicons/react/24/solid';

export function BottomNav() {
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const params = useParams();
  const currentLocale = (params.locale as string) || 'en';
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  useEffect(() => {
    // Check theme on mount and listen for changes
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light' || currentTheme === 'dark') {
        setTheme(currentTheme);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);
  
  // Debug logging
  console.log('📱 BottomNav - pathname:', pathname, 'currentLocale:', currentLocale);
  
  const navItems = [
    { 
      name: t('home'), 
      href: '/', 
      icon: HomeIcon, 
      iconSolid: HomeIconSolid,
    },
    { 
      name: t('learn'), 
      href: '/learn', 
      icon: BookOpenIcon, 
      iconSolid: BookOpenIconSolid,
    },
    { 
      name: t('articles'), 
      href: '/articles', 
      icon: NewspaperIcon, 
      iconSolid: NewspaperIconSolid,
    },
    { 
      name: t('calculators'), 
      href: '/calculators', 
      icon: CalculatorIcon, 
      iconSolid: CalculatorIconSolid,
    },
  ];

  return (
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t z-50 ${
      theme === 'dark'
        ? 'bg-[#05060a]/98 border-white/15'
        : 'bg-white/98 border-gray-200'
    }`}>
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16 px-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = isActive ? item.iconSolid : item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                locale={currentLocale}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${
                  isActive 
                    ? 'text-[var(--accent)]' 
                    : 'text-[var(--text-secondary)] active:scale-95'
                }`}
              >
                <Icon className="w-6 h-6 mb-0.5" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

