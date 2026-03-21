import type { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartPopup from '@/components/CartPopup';
import CheckoutDrawer from '@/components/CheckoutDrawer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Atlas Urban Craft | Sophisticated Artisanal Decor',
  description: 'Handcrafted luxury derived from cultural heritage. Brass sinks, copper lighting, curated collections.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          <CartPopup />
          <CheckoutDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
