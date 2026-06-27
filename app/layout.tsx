import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { ToastProvider } from '@/components/ui/Toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'GraphOne — The Global Intelligence Layer for AI',
  description: 'Track the world\'s most innovative AI companies, discover active investors, monitor product upvotes, and visualize capital movements in the AI economy.',
  keywords: 'artificial intelligence, startups, venture capital, funding database, tech products, openai, sequoia capital',
  authors: [{ name: 'GraphOne Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <ToastProvider>
            <div className="flex-1 min-h-screen bg-white dark:bg-[#030303] text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors duration-300">
              <Navbar />
              <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
