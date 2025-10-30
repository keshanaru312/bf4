import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BelajarFinance - Financial Literacy for Malaysian Young Adults',
  description: 'Master your money, shape your future. Learn essential financial skills tailored for Malaysian young adults.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
