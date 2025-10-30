import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { 
  BanknotesIcon, 
  BuildingLibraryIcon,
  ChartBarIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  HomeModernIcon,
  ReceiptPercentIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const topicIcons = {
  budgeting: BanknotesIcon,
  saving: BuildingLibraryIcon,
  investing: ChartBarIcon,
  debt: CreditCardIcon,
  insurance: ShieldCheckIcon,
  retirement: ClockIcon,
  tax: ReceiptPercentIcon,
  property: HomeModernIcon,
};

export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('learn');

  const topics = [
    { id: 'budgeting', icon: topicIcons.budgeting, color: 'from-green-400 to-emerald-500' },
    { id: 'saving', icon: topicIcons.saving, color: 'from-blue-400 to-cyan-500' },
    { id: 'investing', icon: topicIcons.investing, color: 'from-purple-400 to-violet-500' },
    { id: 'debt', icon: topicIcons.debt, color: 'from-red-400 to-pink-500' },
    { id: 'insurance', icon: topicIcons.insurance, color: 'from-orange-400 to-amber-500' },
    { id: 'retirement', icon: topicIcons.retirement, color: 'from-indigo-400 to-blue-500' },
    { id: 'tax', icon: topicIcons.tax, color: 'from-yellow-400 to-orange-500' },
    { id: 'property', icon: topicIcons.property, color: 'from-teal-400 to-cyan-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="px-4 pt-8 pb-6 sticky top-0 bg-gradient-dark z-10 border-b border-[var(--border)]">
        <div className="max-w-md mx-auto">
          <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)] mb-2">
            {t('title')}
          </h1>
          <p className="text-[var(--text-secondary)] font-body">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--border)]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-body text-[var(--text-secondary)]">{t('progress')}</span>
              <span className="text-sm font-heading font-semibold text-[var(--accent)]">0/8</span>
            </div>
            <div className="w-full bg-[var(--surface-secondary)] rounded-full h-2">
              <div className="bg-[var(--accent)] h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="px-4 py-4 pb-20">
        <div className="max-w-md mx-auto space-y-3">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <Link
                key={topic.id}
                href={`/${locale}/learn/${topic.id}`}
                className="block bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)] hover:border-[var(--accent)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${topic.color}`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[var(--surface-secondary)] border-2 border-[var(--border)] rounded-full flex items-center justify-center text-xs font-heading font-semibold text-[var(--text-secondary)]">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-1">
                      {t(`topics.${topic.id}.title`)}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] font-body">
                      {t(`topics.${topic.id}.description`)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
