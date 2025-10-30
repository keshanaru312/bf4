import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { 
  BanknotesIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  ShieldExclamationIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const calculatorIcons = {
  budget: BanknotesIcon,
  savings: CurrencyDollarIcon,
  loan: CreditCardIcon,
  epf: BuildingLibraryIcon,
  emergency: ShieldExclamationIcon,
  investment: ChartBarIcon,
};

export default async function CalculatorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('calculators');

  const calculators = [
    { id: 'budget', icon: calculatorIcons.budget, color: 'from-green-400 to-emerald-500' },
    { id: 'savings', icon: calculatorIcons.savings, color: 'from-blue-400 to-cyan-500' },
    { id: 'loan', icon: calculatorIcons.loan, color: 'from-red-400 to-pink-500' },
    { id: 'epf', icon: calculatorIcons.epf, color: 'from-purple-400 to-violet-500' },
    { id: 'emergency', icon: calculatorIcons.emergency, color: 'from-orange-400 to-amber-500' },
    { id: 'investment', icon: calculatorIcons.investment, color: 'from-indigo-400 to-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark pb-20">
      {/* Header */}
      <div className="px-4 pt-8 pb-6">
        <div className="max-w-md mx-auto text-center">
          <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)] mb-2">
            {t('title')}
          </h1>
          <p className="text-[var(--text-secondary)] font-body">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Calculators Grid */}
      <div className="px-4 py-4">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
          {calculators.map((calculator) => {
            const Icon = calculator.icon;
            return (
              <Link
                key={calculator.id}
                href={`/${locale}/calculators/${calculator.id}`}
                className="block bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-all hover:scale-[1.05] active:scale-[0.95]"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${calculator.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {t(`tools.${calculator.id}.title`)}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-body">
                  {t(`tools.${calculator.id}.description`)}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
