import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import { Space_Grotesk, Inter } from 'next/font/google';
import '../globals.css';
import { BottomNav } from '@/components/BottomNav';
import { DesktopNav } from '@/components/DesktopNav';
import type { Metadata } from 'next';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BelajarFinance - Financial Literacy for Malaysian Young Adults',
  description: 'Master your money, shape your future. Learn essential financial skills tailored for Malaysian young adults.',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-screen pb-16 md:pb-0">
        <NextIntlClientProvider messages={messages}>
          <DesktopNav />
          <div className="min-h-screen md:pt-20">
            {children}
          </div>
          <BottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
