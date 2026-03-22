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

import { RAW_CATEGORIES } from '@/lib/constants';
import productsData from '@/data/products.json';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Precompute only the needed 4 products per category for the Mega Menu
  // By doing this on the server, we completely prevent the 1.17MB products.json
  // from being bundled into the client-side JavaScript.
  const megaMenuProducts: Record<string, any[]> = {};

  RAW_CATEGORIES.forEach(cat => {
    megaMenuProducts[cat.slug] = productsData
      .filter(p => cat.matches.some(m => p.category.toLowerCase().includes(m.toLowerCase())))
      .slice(0, 4)
      .map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image
      }));
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <Navbar megaMenuProducts={megaMenuProducts} />
          <CartPopup />
          <CheckoutDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
