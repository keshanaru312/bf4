'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { BookOpenIcon, NewspaperIcon, CalculatorIcon, HomeIcon } from '@heroicons/react/24/outline';
import { LanguageToggle } from './LanguageToggle';

export function DesktopNav() {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: t('home'), icon: HomeIcon },
    { href: '/learn', label: t('learn'), icon: BookOpenIcon },
    { href: '/articles', label: t('articles'), icon: NewspaperIcon },
    { href: '/calculators', label: t('calculators'), icon: CalculatorIcon },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/en' || pathname === '/ms' || pathname === '/zh';
    }
    return pathname.includes(href);
  };

  return (
    <header className="hidden md:block fixed top-0 left-0 right-0 z-40 bg-[#05060a]/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center font-heading font-bold text-black text-xl">
              B
            </div>
            <span className="font-heading text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              BelajarFinance
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    active
                      ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                      : 'text-[var(--text-secondary)] hover:bg-white/10 hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Language Toggle */}
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
