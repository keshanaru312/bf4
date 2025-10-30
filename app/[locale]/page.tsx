import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BookOpenIcon, NewspaperIcon, CalculatorIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  const features = [
    {
      icon: BookOpenIcon,
      title: t('features.learn.title'),
      description: t('features.learn.description'),
      href: '/learn',
      color: 'from-lime-400 to-green-500'
    },
    {
      icon: NewspaperIcon,
      title: t('features.articles.title'),
      description: t('features.articles.description'),
      href: '/articles',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: CalculatorIcon,
      title: t('features.calculators.title'),
      description: t('features.calculators.description'),
      href: '/calculators',
      color: 'from-purple-400 to-pink-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <div className="pt-12 md:pt-20 pb-8 md:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 text-gradient">
            {t('title')}
          </h1>
          <p className="text-lg md:text-2xl text-[var(--text-secondary)] mb-2 md:mb-3 font-body max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <p className="text-2xl md:text-4xl lg:text-5xl font-heading font-semibold text-[var(--text-primary)] mb-8 md:mb-12">
            {t('tagline')}
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group block bg-[var(--surface)] rounded-2xl md:rounded-3xl p-6 md:p-8 border border-[var(--border)] hover:border-[var(--accent)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 md:p-5 rounded-2xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] font-body text-sm md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
