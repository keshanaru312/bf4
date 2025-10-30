import { Link } from '@/i18n/routing';
import { ArrowLeftIcon, ClockIcon, ShareIcon } from '@heroicons/react/24/outline';
import { getTranslations } from 'next-intl/server';

const articleData: { [key: string]: any } = {
  '1': {
    category: 'investing',
    title: 'Getting Started with Unit Trusts in Malaysia',
    readTime: 5,
    image: '📊',
    content: `
      <h2>What Are Unit Trusts?</h2>
      <p>Unit trusts are collective investment schemes that pool money from multiple investors to invest in a diversified portfolio of securities. In Malaysia, they're one of the most accessible investment vehicles for beginners.</p>
      
      <h2>Why Choose Unit Trusts?</h2>
      <p>Professional management, diversification, affordability (start from as low as RM100), liquidity, and regulatory oversight by the Securities Commission make unit trusts an excellent starting point for new investors.</p>
      
      <h2>Types of Unit Trust Funds</h2>
      <p><strong>Equity Funds:</strong> Invest primarily in stocks for higher growth potential but with higher risk.</p>
      <p><strong>Bond Funds:</strong> Focus on fixed-income securities for stable returns with lower risk.</p>
      <p><strong>Balanced Funds:</strong> Mix of equities and bonds for moderate risk and returns.</p>
      <p><strong>Money Market Funds:</strong> Low-risk investments in short-term instruments.</p>
      
      <h2>How to Get Started</h2>
      <p>1. Determine your investment goals and risk tolerance</p>
      <p>2. Research and compare funds using online platforms</p>
      <p>3. Open an account with a unit trust agent or platform</p>
      <p>4. Start with regular monthly investments (dollar-cost averaging)</p>
      <p>5. Review your portfolio quarterly and rebalance annually</p>
      
      <h2>Key Considerations</h2>
      <p>Look at past performance (but remember it doesn't guarantee future results), expense ratios, fund manager track record, and fund size. Always read the prospectus before investing.</p>
    `
  },
  '2': {
    category: 'saving',
    title: 'Building Your Emergency Fund: A Step-by-Step Guide',
    readTime: 7,
    image: '💰',
    content: `
      <h2>Why You Need an Emergency Fund</h2>
      <p>An emergency fund is your financial safety net. It protects you from debt when unexpected expenses arise—medical bills, car repairs, job loss, or urgent home repairs.</p>
      
      <h2>How Much Should You Save?</h2>
      <p>The general rule is 3-6 months of essential expenses. Calculate your monthly rent, utilities, food, transportation, and insurance. Multiply by 3 (minimum) or 6 (ideal) to get your target.</p>
      
      <h2>Step-by-Step Plan</h2>
      <p><strong>Step 1:</strong> Start with RM1,000 as your initial milestone. This covers most minor emergencies.</p>
      <p><strong>Step 2:</strong> Build to one month of expenses. Track your spending to know this amount.</p>
      <p><strong>Step 3:</strong> Gradually increase to 3 months, then aim for 6 months.</p>
      
      <h2>Where to Keep Your Emergency Fund</h2>
      <p>Keep it in a high-interest savings account or money market fund—accessible but not too accessible. Avoid fixed deposits that lock your money. Consider accounts that offer instant withdrawal.</p>
      
      <h2>Building Strategies</h2>
      <p>Automate transfers on payday, save windfalls and bonuses, reduce one expense category, use the 52-week savings challenge, or round up purchases and save the difference.</p>
      
      <h2>When to Use It</h2>
      <p>Only use for true emergencies: job loss, medical emergencies, urgent repairs, or unexpected travel for family emergencies. NOT for sales, vacations, or planned purchases.</p>
    `
  },
};

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ locale: string; id: string }> 
}) {
  const { locale, id } = await params;
  const t = await getTranslations('articles');
  const tCommon = await getTranslations('common');

  const article = articleData[id] || articleData['1'];

  return (
    <div className="min-h-screen bg-gradient-dark pb-20">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 sticky top-0 bg-gradient-dark z-10 border-b border-[var(--border)]">
        <div className="max-w-2xl mx-auto">
          <Link 
            href="/articles"
            className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent)] mb-4 font-body"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            {tCommon('back')}
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <div className="px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Article Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-5xl">{article.image}</span>
              <div>
                <span className="px-3 py-1 bg-[var(--surface-secondary)] text-[var(--accent)] text-sm font-body font-medium rounded-full">
                  {t(`categories.${article.category}`)}
                </span>
              </div>
            </div>
            
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between text-[var(--text-secondary)] text-sm font-body">
              <div className="flex items-center">
                <ClockIcon className="w-5 h-5 mr-2" />
                {article.readTime} {t('minRead')}
              </div>
              <button className="flex items-center hover:text-[var(--accent)] transition-colors">
                <ShareIcon className="w-5 h-5 mr-1" />
                Share
              </button>
            </div>
          </div>

          {/* Article Body */}
          <div 
            className="prose prose-invert max-w-none"
            style={{
              color: 'var(--text-primary)',
            }}
          >
            <style jsx>{`
              .prose :global(h2) {
                font-family: 'Space Grotesk', sans-serif;
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-top: 2rem;
                margin-bottom: 1rem;
              }
              .prose :global(p) {
                font-family: 'Inter', sans-serif;
                color: var(--text-secondary);
                line-height: 1.8;
                margin-bottom: 1.25rem;
              }
              .prose :global(strong) {
                color: var(--text-primary);
                font-weight: 600;
              }
            `}</style>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-6">
              Related Articles
            </h3>
            <div className="grid gap-4">
              <Link
                href="/articles/2"
                className="block bg-[var(--surface)] rounded-xl p-4 border border-[var(--border)] hover:border-[var(--accent)] transition-all"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">💰</span>
                  <div>
                    <h4 className="font-heading font-semibold text-[var(--text-primary)]">
                      Building Your Emergency Fund
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] font-body">7 min read</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
