import type { Metadata } from 'next';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { MediaTypeProvider } from '@/contexts/MediaTypeContext';
import { Toaster } from 'sonner';
import { Lato, Roboto } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

// Шрифт для заголовків — використовується для бренду й тайтлів.
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
});

// Шрифт для основного тексту — добре читається у великих обсягах.
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PixaSearch',
  description:
    'Search engine for free images and videos powered by the Pixabay API.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'PixaSearch',
    description:
      'Search engine for free images and videos powered by the Pixabay API.',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${roboto.variable}`}>
        <TanStackProvider>
          <MediaTypeProvider>
            <Header />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
          </MediaTypeProvider>
          <Toaster richColors position="top-center" />
        </TanStackProvider>
      </body>
    </html>
  );
}
