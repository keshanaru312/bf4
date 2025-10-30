import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export const dynamic = 'force-static';

const topicContent = {
  budgeting: {
    sections: [
      { 
        title: 'What is Budgeting?',
        content: 'Budgeting is the process of creating a plan to spend your money. This spending plan allows you to determine in advance whether you will have enough money to do the things you need to do or would like to do.'
      },
      {
        title: 'The 50/30/20 Rule',
        content: '50% for needs (housing, food, utilities), 30% for wants (entertainment, dining out), and 20% for savings and debt repayment. This simple framework helps you allocate your income effectively.'
      },
      {
        title: 'Track Your Expenses',
        content: 'Start by tracking every ringgit you spend for a month. Use apps, spreadsheets, or a simple notebook. Understanding where your money goes is the first step to controlling it.'
      },
      {
        title: 'Build an Emergency Fund',
        content: 'Aim to save 3-6 months of expenses. Start small with RM1,000, then gradually increase. This fund protects you from unexpected expenses and financial stress.'
      }
    ]
  },
  saving: {
    sections: [
      { 
        title: 'Why Save?',
        content: 'Saving gives you financial security and freedom. It helps you handle emergencies, achieve goals, and build wealth over time.'
      },
      {
        title: 'Pay Yourself First',
        content: 'Automatically transfer a portion of your income to savings as soon as you get paid. Treat savings as a non-negotiable expense.'
      },
      {
        title: 'High-Interest Savings Accounts',
        content: 'Look for savings accounts with competitive interest rates. In Malaysia, compare fixed deposits, ASB, and other options to maximize returns.'
      },
      {
        title: 'Setting Savings Goals',
        content: 'Define clear goals: emergency fund, house down payment, vacation, or retirement. Having specific targets makes saving more meaningful and achievable.'
      }
    ]
  },
  investing: {
    sections: [
      { 
        title: 'Investing vs Saving',
        content: 'Saving is for short-term goals and emergencies. Investing is for long-term wealth building through stocks, bonds, property, and other assets that can grow over time.'
      },
      {
        title: 'Risk and Return',
        content: 'Higher potential returns come with higher risk. Understand your risk tolerance before investing. Diversification helps manage risk.'
      },
      {
        title: 'Getting Started in Malaysia',
        content: 'Open a CDS account, choose a broker, start with unit trusts or ETFs. Consider Amanah Saham, EPF, and other Malaysian investment vehicles.'
      },
      {
        title: 'Long-Term Thinking',
        content: 'Time in the market beats timing the market. Start early, invest regularly, and stay patient. Compound interest works magic over decades.'
      }
    ]
  },
  debt: {
    sections: [
      { 
        title: 'Good Debt vs Bad Debt',
        content: 'Good debt (education, housing) can build wealth. Bad debt (credit cards, consumer loans) drains resources. Know the difference and avoid high-interest debt.'
      },
      {
        title: 'Credit Card Management',
        content: 'Pay in full each month to avoid interest. Use cards for convenience and rewards, not to spend beyond your means. Understand your credit limit and APR.'
      },
      {
        title: 'Debt Repayment Strategies',
        content: 'Avalanche method: pay highest interest first. Snowball method: pay smallest balance first. Choose what motivates you and stick with it.'
      },
      {
        title: 'Avoiding Debt Traps',
        content: 'Be wary of easy credit, buy-now-pay-later schemes, and personal loans with high interest. Live within your means and budget carefully.'
      }
    ]
  },
  insurance: {
    sections: [
      { 
        title: 'Why Insurance Matters',
        content: 'Insurance protects you from financial ruin due to unexpected events. It\'s a safety net for you and your family.'
      },
      {
        title: 'Types of Insurance',
        content: 'Life, medical, critical illness, disability, and property insurance. Each serves a different purpose. Assess your needs based on your life stage.'
      },
      {
        title: 'How Much Coverage?',
        content: 'Life insurance: 10x annual income. Medical: comprehensive coverage for major illnesses. Balance adequate protection with affordability.'
      },
      {
        title: 'Choosing Insurance in Malaysia',
        content: 'Compare policies, understand exclusions, check claim settlement ratios. Consider takaful as an alternative. Don\'t over-insure or under-insure.'
      }
    ]
  },
  retirement: {
    sections: [
      { 
        title: 'Planning for Retirement',
        content: 'The earlier you start, the better. Compound interest and time are your greatest allies. Define your retirement lifestyle and estimate costs.'
      },
      {
        title: 'EPF and How It Works',
        content: 'Employees Provident Fund is Malaysia\'s mandatory retirement scheme. Contribute more if possible through voluntary contributions. Track your balance regularly.'
      },
      {
        title: 'Beyond EPF',
        content: 'Consider Private Retirement Schemes (PRS), unit trusts, property, and other investments. Diversify your retirement portfolio for better security.'
      },
      {
        title: 'Retirement Needs Calculator',
        content: 'Estimate how much you need: monthly expenses × 12 × years in retirement. Factor in inflation and healthcare costs. Aim high to be safe.'
      }
    ]
  },
  tax: {
    sections: [
      { 
        title: 'Understanding Malaysian Tax',
        content: 'Income tax is progressive: higher income means higher rate. Learn about tax brackets, deductions, and reliefs available to you.'
      },
      {
        title: 'Tax Reliefs and Rebates',
        content: 'Claim for EPF, insurance, education, medical, lifestyle purchases, and more. Keep receipts and documents. These can save you thousands.'
      },
      {
        title: 'Filing Your Tax Return',
        content: 'Use e-Filing for convenience. Deadline is April 30 for manual, May 15 for e-Filing. File even if you don\'t owe tax to avoid penalties.'
      },
      {
        title: 'Tax Planning',
        content: 'Maximize deductions through legal means. Time your income and expenses strategically. Consider consulting a tax professional for complex situations.'
      }
    ]
  },
  property: {
    sections: [
      { 
        title: 'Buying Your First Property',
        content: 'Property is a major investment. Consider location, future value, affordability, and your long-term plans before buying.'
      },
      {
        title: 'Mortgage Basics',
        content: 'Understand loan-to-value ratio, interest rates (fixed vs variable), lock-in period, and repayment terms. Shop around for the best rates.'
      },
      {
        title: 'Property Investment',
        content: 'Rental yield, capital appreciation, and holding costs. Real estate can build wealth but requires capital and management. Do your research.'
      },
      {
        title: 'Costs Beyond Purchase Price',
        content: 'Stamp duty, legal fees, valuation fees, maintenance, quit rent, and assessment. Budget for these additional costs to avoid surprises.'
      }
    ]
  }
};

type TopicId = keyof typeof topicContent;

export async function generateStaticParams() {
  const locales = ['en', 'ms', 'zh'];
  const topics = Object.keys(topicContent);
  
  return locales.flatMap((locale) =>
    topics.map((topic) => ({
      locale,
      topic,
    }))
  );
}

export default async function TopicPage({ 
  params 
}: { 
  params: Promise<{ locale: string; topic: string }> 
}) {
  const { locale, topic } = await params;
  const t = await getTranslations({ locale, namespace: 'learn' });
  const tCommon = await getTranslations('common');

  const topicData = topicContent[topic as TopicId];

  if (!topicData) {
    return <div>Topic not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-dark pb-20">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 sticky top-0 bg-gradient-dark z-10 border-b border-[var(--border)]">
        <div className="max-w-md mx-auto">
          <Link 
            href="/learn"
            className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent)] mb-4 font-body"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            {tCommon('back')}
          </Link>
          <h1 className="font-heading text-3xl font-bold text-[var(--text-primary)]">
            {t(`topics.${topic}.title`)}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-6">
          {topicData.sections.map((section, index) => (
            <div 
              key={index}
              className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-black font-heading font-semibold text-sm">
                  {index + 1}
                </div>
                <h2 className="font-heading text-xl font-semibold text-[var(--text-primary)]">
                  {section.title}
                </h2>
              </div>
              <p className="text-[var(--text-secondary)] font-body leading-relaxed pl-9">
                {section.content}
              </p>
            </div>
          ))}

          {/* Completion Button */}
          <div className="pt-4">
            <button className="w-full bg-[var(--accent)] text-black font-heading font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
              <CheckCircleIcon className="w-6 h-6" />
              <span>{tCommon('complete')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
