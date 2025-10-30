'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

export default function EmergencyFundPage() {
  const t = useTranslations('calculators');
  const tCommon = useTranslations('common');
  
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [months, setMonths] = useState('6');

  const expenses = parseFloat(monthlyExpenses) || 0;
  const monthsTarget = parseFloat(months) || 6;
  
  const targetFund = expenses * monthsTarget;

  return (
    <div className="min-h-screen bg-gradient-dark pb-20">
      <div className="px-4 pt-6 pb-4 sticky top-0 bg-gradient-dark z-10 border-b border-[var(--border)]">
        <div className="max-w-md mx-auto">
          <Link 
            href="/calculators"
            className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent)] mb-4 font-body"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            {tCommon('back')}
          </Link>
          <h1 className="font-heading text-3xl font-bold text-[var(--text-primary)]">
            {t('tools.emergency.title')}
          </h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)] space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Monthly Essential Expenses (RM)
              </label>
              <input
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                placeholder="3000"
                className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-heading text-xl focus:outline-none focus:border-[var(--accent)]"
              />
              <p className="text-xs text-[var(--text-secondary)] mt-2">
                Include: rent, utilities, food, transportation, insurance
              </p>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Months of Coverage
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['3', '6', '12'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    className={`py-3 rounded-lg font-body font-medium transition-all ${
                      months === m
                        ? 'bg-[var(--accent)] text-black'
                        : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border)]'
                    }`}
                  >
                    {m} months
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
            <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-4">
              Your Emergency Fund Target
            </h3>
            
            <div className="text-center p-8 bg-[var(--surface-secondary)] rounded-lg mb-4">
              <p className="text-sm text-[var(--text-secondary)] font-body mb-2">Target Amount</p>
              <p className="text-5xl font-heading font-bold text-[var(--accent)] mb-2">
                RM {targetFund.toLocaleString()}
              </p>
              <p className="text-sm text-[var(--text-secondary)] font-body">
                ({monthsTarget} months coverage)
              </p>
            </div>

            <div className="space-y-3 p-4 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-lg">
              <h4 className="font-heading font-semibold text-[var(--text-primary)] text-sm">
                💡 Tips for Building Your Emergency Fund
              </h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)] font-body">
                <li>• Start with RM1,000 as your first milestone</li>
                <li>• Automate monthly transfers to your savings</li>
                <li>• Keep it in a high-interest savings account</li>
                <li>• Only use for true emergencies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
