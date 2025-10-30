'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

export default function EPFCalculatorPage() {
  const t = useTranslations('calculators');
  const tCommon = useTranslations('common');
  
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('60');
  const [currentEPF, setCurrentEPF] = useState('');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [dividendRate, setDividendRate] = useState('5.5');

  const age = parseFloat(currentAge) || 0;
  const retAge = parseFloat(retirementAge) || 60;
  const epf = parseFloat(currentEPF) || 0;
  const salary = parseFloat(monthlySalary) || 0;
  const rate = parseFloat(dividendRate) / 100 || 0;
  
  const yearsToRetirement = retAge - age;
  const monthlyContribution = salary * 0.23; // 11% employee + 12% employer
  const annualContribution = monthlyContribution * 12;
  
  // Future value calculation with compound interest
  let projectedEPF = epf;
  for (let i = 0; i < yearsToRetirement; i++) {
    projectedEPF = (projectedEPF + annualContribution) * (1 + rate);
  }

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
            {t('tools.epf.title')}
          </h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)] space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                  Current Age
                </label>
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                  placeholder="30"
                  className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-body focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                  Retirement Age
                </label>
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
                  placeholder="60"
                  className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-body focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Current EPF Balance (RM)
              </label>
              <input
                type="number"
                value={currentEPF}
                onChange={(e) => setCurrentEPF(e.target.value)}
                placeholder="50000"
                className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-heading text-xl focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Monthly Salary (RM)
              </label>
              <input
                type="number"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                placeholder="4000"
                className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-body focus:outline-none focus:border-[var(--accent)]"
              />
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Monthly contribution: RM {monthlyContribution.toFixed(2)} (23%)
              </p>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Expected Dividend Rate (% p.a.)
              </label>
              <input
                type="number"
                value={dividendRate}
                onChange={(e) => setDividendRate(e.target.value)}
                placeholder="5.5"
                step="0.1"
                className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-body focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>

          <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
            <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-4">
              Projected EPF at Retirement
            </h3>
            
            <div className="text-center p-8 bg-[var(--surface-secondary)] rounded-lg mb-4">
              <p className="text-sm text-[var(--text-secondary)] font-body mb-2">Estimated Balance</p>
              <p className="text-5xl font-heading font-bold text-[var(--accent)] mb-2">
                RM {projectedEPF.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="text-sm text-[var(--text-secondary)] font-body">
                in {yearsToRetirement} years (at age {retAge})
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-[var(--text-secondary)] font-body">Current Balance</span>
                <span className="font-heading font-semibold text-[var(--text-primary)]">
                  RM {epf.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-[var(--text-secondary)] font-body">Total Contributions</span>
                <span className="font-heading font-semibold text-[var(--text-primary)]">
                  RM {(annualContribution * yearsToRetirement).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[var(--text-secondary)] font-body">Dividend Earnings</span>
                <span className="font-heading font-semibold text-[var(--accent)]">
                  RM {(projectedEPF - epf - (annualContribution * yearsToRetirement)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-lg p-4">
            <p className="text-sm text-[var(--text-secondary)] font-body">
              💡 <strong className="text-[var(--text-primary)]">Tip:</strong> Consider making voluntary contributions (Account 3) to maximize your retirement savings and enjoy tax relief benefits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
