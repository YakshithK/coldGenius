import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ColdGenius - Generate Cold Emails Instantly',
  description: 'Generate personalized cold emails instantly with ColdGenius. No signup, no login, just fast and simple.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
