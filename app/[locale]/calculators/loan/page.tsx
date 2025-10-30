'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

export default function LoanCalculatorPage() {
  const t = useTranslations('calculators');
  const tCommon = useTranslations('common');
  
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');

  const principal = parseFloat(loanAmount) || 0;
  const rate = parseFloat(interestRate) || 0;
  const months = parseFloat(loanTerm) || 0;
  
  const monthlyRate = rate / 100 / 12;
  const monthlyPayment = months > 0 && rate > 0
    ? principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    : months > 0 ? principal / months : 0;
  
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;

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
            {t('tools.loan.title')}
          </h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)] space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Loan Amount (RM)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="300000"
                className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-heading text-xl focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Interest Rate (% p.a.)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="4.5"
                step="0.1"
                className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-body focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-[var(--text-secondary)] mb-2">
                Loan Term (months)
              </label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="360"
                className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-body focus:outline-none focus:border-[var(--accent)]"
              />
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                {months > 0 ? `${(months / 12).toFixed(1)} years` : ''}
              </p>
            </div>
          </div>

          <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
            <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-4">
              Monthly Payment
            </h3>
            
            <div className="text-center p-6 bg-[var(--surface-secondary)] rounded-lg mb-4">
              <p className="text-5xl font-heading font-bold text-[var(--accent)] mb-2">
                RM {monthlyPayment.toFixed(2)}
              </p>
              <p className="text-sm text-[var(--text-secondary)] font-body">per month</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-[var(--text-secondary)] font-body">Total Payment</span>
                <span className="font-heading font-semibold text-[var(--text-primary)]">
                  RM {totalPayment.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-[var(--text-secondary)] font-body">Total Interest</span>
                <span className="font-heading font-semibold text-red-400">
                  RM {totalInterest.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-[var(--text-secondary)] font-body">Principal</span>
                <span className="font-heading font-semibold text-[var(--text-primary)]">
                  RM {principal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
