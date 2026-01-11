import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProviders";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursors";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Font optimization
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Portfolio | Fullstack Developer",
  description:
    "Portfolio profesional sebagai Fullstack Developer, Frontend dan Backend Developer",
  keywords:
    "fullstack, developer, web development, portfolio, react, nextjs, frontend, backend",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    viewportFit: "cover",
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
      suppressHydrationWarning // Prevent hydration warning from theme
    >
      <body className="bg-light dark:bg-dark transition-colors duration-500 safe-area-inset">
        <ThemeProvider>
          {/* Don't show loading screen in production for better SEO/Web Vitals */}
          {process.env.NODE_ENV === "development" && <LoadingScreen />}

          {/* Only for desktop */}
          <CustomCursor />

          <ScrollProgress />

          {/* Header remains outside main to ensure correct z-indexing */}
          <Header />

          {/* Main content with proper spacing for fixed header */}
          <main className="min-h-screen">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
      <SpeedInsights />
    </html>
  );
}
