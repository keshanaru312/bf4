'use client';

import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { 
  HomeIcon, 
  BookOpenIcon, 
  NewspaperIcon, 
  CalculatorIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  NewspaperIcon as NewspaperIconSolid,
  CalculatorIcon as CalculatorIconSolid
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';

export function BottomNav() {
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const locale = useLocale();
  const router = useRouter();
  const [showLangModal, setShowLangModal] = useState(false);
  
  // Extract the current path without locale
  const pathParts = pathname.split('/').filter(Boolean);
  const currentPath = pathParts.length > 1 ? `/${pathParts.slice(1).join('/')}` : '/';
  
  const navItems = [
    { 
      name: t('home'), 
      href: '/', 
      icon: HomeIcon, 
      iconSolid: HomeIconSolid,
      path: '/'
    },
    { 
      name: t('learn'), 
      href: '/learn', 
      icon: BookOpenIcon, 
      iconSolid: BookOpenIconSolid,
      path: '/learn'
    },
    { 
      name: t('articles'), 
      href: '/articles', 
      icon: NewspaperIcon, 
      iconSolid: NewspaperIconSolid,
      path: '/articles'
    },
    { 
      name: t('calculators'), 
      href: '/calculators', 
      icon: CalculatorIcon, 
      iconSolid: CalculatorIconSolid,
      path: '/calculators'
    },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ms', name: 'Bahasa', flag: '🇲🇾' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    const currentPathWithoutLocale = pathname.replace(/^\/(en|ms|zh)/, '') || '/';
    router.replace(currentPathWithoutLocale, { locale: newLocale });
    setShowLangModal(false);
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#05060a]/98 backdrop-blur-xl border-t border-white/15 z-50">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around items-center h-16 px-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');
              const Icon = isActive ? item.iconSolid : item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
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
            
            {/* Language Toggle Button */}
            <button
              onClick={() => setShowLangModal(true)}
              className="flex flex-col items-center justify-center flex-1 h-full text-[var(--text-secondary)] active:scale-95"
            >
              <LanguageIcon className="w-6 h-6 mb-0.5" />
              <span className="text-[10px] font-medium">{languages.find(l => l.code === locale)?.flag}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Language Modal for Mobile */}
      {showLangModal && (
        <div className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-end" onClick={() => setShowLangModal(false)}>
          <div className="w-full bg-[#1a1d26] rounded-t-3xl p-6 pb-8 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-6" />
            <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-4">
              {t('selectLanguage')}
            </h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                    locale === lang.code
                      ? 'bg-[var(--accent)]/20 border-2 border-[var(--accent)]'
                      : 'bg-white/10 border-2 border-white/20 active:scale-95'
                  }`}
                >
                  <span className="text-3xl">{lang.flag}</span>
                  <span className={`flex-1 text-left font-medium ${
                    locale === lang.code ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
                  }`}>
                    {lang.name}
                  </span>
                  {locale === lang.code && (
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

