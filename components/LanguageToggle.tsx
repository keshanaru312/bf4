'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { LanguageIcon, CheckIcon } from '@heroicons/react/24/outline';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ms', name: 'Bahasa', flag: '🇲🇾' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === locale);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-200"
        aria-label="Change language"
      >
        <LanguageIcon className="w-5 h-5 text-[var(--text-primary)]" />
        <span className="text-sm font-medium hidden sm:inline">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium text-[var(--text-primary)] hidden md:inline">{currentLanguage?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#1a1d26] border border-white/20 shadow-xl overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                locale === lang.code
                  ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                  : 'hover:bg-white/10 text-[var(--text-primary)]'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="flex-1 font-medium">{lang.name}</span>
              {locale === lang.code && (
                <CheckIcon className="w-5 h-5 text-[var(--accent)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
