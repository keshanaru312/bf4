'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

export default function SavingsCalculatorPage() {
  const t = useTranslations('calculators');
  const tCommon = useTranslations('common');
  
  const [targetAmount, setTargetAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlySavings, setMonthlySavings] = useState('');
  const [interestRate, setInterestRate] = useState('3');

  const target = parseFloat(targetAmount) || 0;
  const current = parseFloat(currentSavings) || 0;
  const monthly = parseFloat(monthlySavings) || 0;
  const rate = parseFloat(interestRate) || 0;
  
  const remaining = target - current;
  const monthsNeeded = monthly > 0 ? Math.ceil(remaining / monthly) : 0;
  const yearsNeeded = monthsNeeded / 12;

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
            {t('tools.savings.title')}
          </h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)] space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Savings Goal (RM)
              </label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="10000"
                className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-heading text-xl focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Current Savings (RM)
              </label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                placeholder="0"
                className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-body focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Monthly Savings (RM)
              </label>
              <input
                type="number"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(e.target.value)}
                placeholder="500"
                className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-body focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Expected Interest Rate (% p.a.)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="3"
                step="0.1"
                className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-body focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>

          <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
            <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-4">
              Results
            </h3>
            
            <div className="space-y-4">
              <div className="text-center p-6 bg-[var(--surface-secondary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)] font-body mb-2">Time to Reach Goal</p>
                <p className="text-4xl font-heading font-bold text-[var(--accent)] mb-1">
                  {monthsNeeded}
                </p>
                <p className="text-sm text-[var(--text-secondary)] font-body">
                  months ({yearsNeeded.toFixed(1)} years)
                </p>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[var(--text-secondary)] font-body">Amount Remaining</span>
                <span className="font-heading font-semibold text-[var(--text-primary)]">
                  RM {remaining.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[var(--text-secondary)] font-body">Progress</span>
                <span className="font-heading font-semibold text-[var(--accent)]">
                  {target > 0 ? ((current / target) * 100).toFixed(1) : 0}%
                </span>
              </div>

              <div className="w-full bg-[var(--surface-secondary)] rounded-full h-3">
                <div 
                  className="bg-[var(--accent)] h-3 rounded-full transition-all" 
                  style={{ width: `${Math.min((current / target) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
