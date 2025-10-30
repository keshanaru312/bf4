'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ClockIcon } from '@heroicons/react/24/outline';

const articles = [
  {
    id: 1,
    category: 'investing',
    title: 'Getting Started with Unit Trusts in Malaysia',
    excerpt: 'Learn how to begin your investment journey with unit trusts and what to look for when choosing funds.',
    readTime: 5,
    image: '📊'
  },
  {
    id: 2,
    category: 'saving',
    title: 'Building Your Emergency Fund: A Step-by-Step Guide',
    excerpt: 'Discover practical strategies to build a solid emergency fund that can cover 3-6 months of expenses.',
    readTime: 7,
    image: '💰'
  },
  {
    id: 3,
    category: 'budgeting',
    title: 'The 50/30/20 Rule: Simplified Budgeting for Malaysians',
    excerpt: 'Master the art of budgeting with this simple yet effective framework for managing your money.',
    readTime: 6,
    image: '📝'
  },
  {
    id: 4,
    category: 'career',
    title: 'Negotiating Your Salary: Tips for Malaysian Workers',
    excerpt: 'Learn effective strategies to negotiate better compensation and benefits in the Malaysian job market.',
    readTime: 8,
    image: '💼'
  },
  {
    id: 5,
    category: 'investing',
    title: 'EPF vs PRS: Which Retirement Plan is Right for You?',
    excerpt: 'Compare EPF and Private Retirement Schemes to make informed decisions about your retirement savings.',
    readTime: 10,
    image: '🏦'
  },
  {
    id: 6,
    category: 'tax',
    title: 'Maximizing Your Tax Relief in Malaysia 2025',
    excerpt: 'Comprehensive guide to claiming all available tax reliefs and reducing your tax burden legally.',
    readTime: 12,
    image: '🧾'
  },
  {
    id: 7,
    category: 'saving',
    title: 'High-Yield Savings Accounts in Malaysia Compared',
    excerpt: 'Find the best savings accounts and fixed deposits offering competitive interest rates in 2025.',
    readTime: 6,
    image: '🏧'
  },
  {
    id: 8,
    category: 'budgeting',
    title: 'Cutting Monthly Expenses: 20 Practical Ways',
    excerpt: 'Simple strategies to reduce your monthly spending without sacrificing quality of life.',
    readTime: 9,
    image: '✂️'
  },
];

export default function ArticlesPage() {
  const t = useTranslations('articles');
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'investing', 'saving', 'budgeting', 'career', 'tax'];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-dark pb-20">
      {/* Header */}
      <div className="px-4 pt-8 pb-4 sticky top-0 bg-gradient-dark z-10 border-b border-[var(--border)]">
        <div className="max-w-md mx-auto">
          <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)] mb-2">
            {t('title')}
          </h1>
          <p className="text-[var(--text-secondary)] font-body">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-4 sticky top-[120px] bg-gradient-dark z-10">
        <div className="max-w-md mx-auto">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-body text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-[var(--accent)] text-black'
                    : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent)]'
                }`}
              >
                {t(`categories.${category}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="px-4 py-4">
        <div className="max-w-md mx-auto space-y-4">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="block bg-[var(--surface)] rounded-xl overflow-hidden border border-[var(--border)] hover:border-[var(--accent)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="p-5">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{article.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-[var(--surface-secondary)] text-[var(--accent)] text-xs font-body font-medium rounded">
                        {t(`categories.${article.category}`)}
                      </span>
                      <div className="flex items-center text-[var(--text-secondary)] text-xs font-body">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {article.readTime} {t('minRead')}
                      </div>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] font-body line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
