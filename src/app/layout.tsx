import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProviders';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursors';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Portfolio | Fullstack Developer',
  description: 'Portfolio profesional sebagai Fullstack Developer, Frontend dan Backend Developer',
  keywords: 'fullstack, developer, web development, portfolio, react, nextjs, frontend, backend',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-light dark:bg-dark transition-colors duration-500">
        <ThemeProvider>
          <LoadingScreen />
          <CustomCursor />
          <ScrollProgress />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}