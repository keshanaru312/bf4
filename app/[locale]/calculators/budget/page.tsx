'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

export default function BudgetCalculatorPage() {
  const t = useTranslations('calculators');
  const tCommon = useTranslations('common');
  
  const [income, setIncome] = useState('');
  const [needs, setNeeds] = useState('');
  const [wants, setWants] = useState('');
  const [savings, setSavings] = useState('');

  const totalIncome = parseFloat(income) || 0;
  const totalNeeds = parseFloat(needs) || 0;
  const totalWants = parseFloat(wants) || 0;
  const totalSavings = parseFloat(savings) || 0;
  
  const totalExpenses = totalNeeds + totalWants + totalSavings;
  const remaining = totalIncome - totalExpenses;
  
  const needsPercentage = totalIncome > 0 ? (totalNeeds / totalIncome) * 100 : 0;
  const wantsPercentage = totalIncome > 0 ? (totalWants / totalIncome) * 100 : 0;
  const savingsPercentage = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-dark pb-20">
      {/* Header */}
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
            {t('tools.budget.title')}
          </h1>
          <p className="text-[var(--text-secondary)] font-body mt-2">
            {t('tools.budget.description')}
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Income Input */}
          <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
            <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
              Monthly Income (RM)
            </label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="0"
              className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-heading text-xl focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          {/* Expenses Inputs */}
          <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)] space-y-4">
            <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-4">
              Monthly Expenses
            </h3>
            
            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Needs (50%) - Housing, Food, Utilities (RM)
              </label>
              <input
                type="number"
                value={needs}
                onChange={(e) => setNeeds(e.target.value)}
                placeholder="0"
                className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-body focus:outline-none focus:border-[var(--accent)]"
              />
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Current: {needsPercentage.toFixed(1)}% | Target: 50%
              </p>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Wants (30%) - Entertainment, Dining Out (RM)
              </label>
              <input
                type="number"
                value={wants}
                onChange={(e) => setWants(e.target.value)}
                placeholder="0"
                className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-body focus:outline-none focus:border-[var(--accent)]"
              />
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Current: {wantsPercentage.toFixed(1)}% | Target: 30%
              </p>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Savings & Debt (20%) (RM)
              </label>
              <input
                type="number"
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
                placeholder="0"
                className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-body focus:outline-none focus:border-[var(--accent)]"
              />
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Current: {savingsPercentage.toFixed(1)}% | Target: 20%
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
            <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-4">
              Summary
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-secondary)] font-body">Total Income</span>
                <span className="font-heading font-semibold text-[var(--text-primary)]">
                  RM {totalIncome.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-secondary)] font-body">Total Expenses</span>
                <span className="font-heading font-semibold text-[var(--text-primary)]">
                  RM {totalExpenses.toFixed(2)}
                </span>
              </div>
              
              <div className="h-px bg-[var(--border)]"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-secondary)] font-body font-medium">Remaining</span>
                <span className={`font-heading font-bold text-xl ${
                  remaining >= 0 ? 'text-[var(--accent)]' : 'text-red-500'
                }`}>
                  RM {remaining.toFixed(2)}
                </span>
              </div>
            </div>

            {remaining < 0 && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400 font-body">
                  ⚠️ Your expenses exceed your income. Consider reducing wants or increasing income.
                </p>
              </div>
            )}

            {remaining > totalIncome * 0.1 && totalIncome > 0 && (
              <div className="mt-4 p-3 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-lg">
                <p className="text-sm text-[var(--accent)] font-body">
                  ✓ Great job! You have surplus to increase savings or invest.
                </p>
              </div>
            )}
          </div>

          {/* Visual Budget Breakdown */}
          {totalIncome > 0 && (
            <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
              <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-4">
                Budget Breakdown
              </h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--text-secondary)] font-body">Needs</span>
                    <span className="text-[var(--text-primary)] font-body">{needsPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-[var(--surface-secondary)] rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all" 
                      style={{ width: `${Math.min(needsPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--text-secondary)] font-body">Wants</span>
                    <span className="text-[var(--text-primary)] font-body">{wantsPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-[var(--surface-secondary)] rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all" 
                      style={{ width: `${Math.min(wantsPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--text-secondary)] font-body">Savings</span>
                    <span className="text-[var(--text-primary)] font-body">{savingsPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-[var(--surface-secondary)] rounded-full h-2">
                    <div 
                      className="bg-[var(--accent)] h-2 rounded-full transition-all" 
                      style={{ width: `${Math.min(savingsPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
