import Link from 'next/link';
import Image from 'next/image';
import productsData from '@/data/products.json';
import ProductCard from '@/components/ProductCard';
import HeroSlideshow from '@/components/HeroSlideshow';
import TrustedPartners from '@/components/TrustedPartners';
import styles from './page.module.css';

const SHOP_COLLECTIONS = [
  {
    name: "Lighting",
    href: "/category/lighting",
    image: "/images/hero/hammered-bronze-finish-bowl-plate-pendant-light-solid-brass-ceiling-light-3143320.webp"
  },
  {
    name: "Hooks",
    href: "/category/hardware",
    image: "/images/hero/single-hook-solid-unlacquered-brass-handmade-brass-hook-coat-hook-wall-hook-2330421.png"
  },
  {
    name: "Holders",
    href: "/category/hardware",
    image: "/images/hero/unlacquered-brass-wall-mount-toothbrush-holder-bathroom-9955571.jpg"
  },
  {
    name: "Sinks",
    href: "/category/sinks",
    image: "/images/hero/il_1588xN.6134663069_c72e.avif"
  }
];

export default function Home() {
  return (
    <div className={styles.main}>
      <HeroSlideshow />

      {/* Ticker Section */}
      <section id="ia-logo-ticker-v2" className={styles.tickerSection}>
        <div className={styles.tickerTrack}>
          <div className={styles.tickerContent}>
            {[
              { name: 'FEDEX', domain: 'fedex.com' },
              { name: 'DHL EXPRESS', domain: 'dhl.com' },
              { name: 'UPS', domain: 'ups.com' },
              { name: 'ARAMEX', domain: 'aramex.com' },
              { name: 'FAIRE', domain: 'faire.com' },
              { name: 'ANKORSTORE', domain: 'ankorstore.com' },
              { name: 'CREOATE', domain: 'creoate.com' },
              { name: 'BULLETIN', domain: 'bulletin.co' },
              { name: 'FEDEX', domain: 'fedex.com' },
              { name: 'DHL EXPRESS', domain: 'dhl.com' },
              { name: 'UPS', domain: 'ups.com' },
              { name: 'ARAMEX', domain: 'aramex.com' },
              { name: 'FAIRE', domain: 'faire.com' },
              { name: 'ANKORSTORE', domain: 'ankorstore.com' },
              { name: 'CREOATE', domain: 'creoate.com' },
              { name: 'BULLETIN', domain: 'bulletin.co' }
            ].map((brand, i) => (
              <span key={`a-${i}`} className={styles.tickerText}>
                <img
                  src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=64`}
                  alt={`${brand.name} logo`}
                  width="22"
                  height="22"
                  style={{ borderRadius: '4px', objectFit: 'contain', marginRight: '0.75rem', backgroundColor: 'transparent' }}
                />
                {brand.name} <span className={styles.tickerDot}>•</span>
              </span>
            ))}
          </div>
          <div className={styles.tickerContent} aria-hidden="true">
            {[
              { name: 'FEDEX', domain: 'fedex.com' },
              { name: 'DHL EXPRESS', domain: 'dhl.com' },
              { name: 'UPS', domain: 'ups.com' },
              { name: 'ARAMEX', domain: 'aramex.com' },
              { name: 'FAIRE', domain: 'faire.com' },
              { name: 'ANKORSTORE', domain: 'ankorstore.com' },
              { name: 'CREOATE', domain: 'creoate.com' },
              { name: 'BULLETIN', domain: 'bulletin.co' },
              { name: 'FEDEX', domain: 'fedex.com' },
              { name: 'DHL EXPRESS', domain: 'dhl.com' },
              { name: 'UPS', domain: 'ups.com' },
              { name: 'ARAMEX', domain: 'aramex.com' },
              { name: 'FAIRE', domain: 'faire.com' },
              { name: 'ANKORSTORE', domain: 'ankorstore.com' },
              { name: 'CREOATE', domain: 'creoate.com' },
              { name: 'BULLETIN', domain: 'bulletin.co' }
            ].map((brand, i) => (
              <span key={`b-${i}`} className={styles.tickerText}>
                <img
                  src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=64`}
                  alt={`${brand.name} logo`}
                  width="22"
                  height="22"
                  style={{ borderRadius: '4px', objectFit: 'contain', marginRight: '0.75rem', backgroundColor: 'transparent' }}
                />
                {brand.name} <span className={styles.tickerDot}>•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Pillars exactly like insideast */}
      <section className={`container ${styles.pillarsSection}`}>
        <div className={`${styles.pillar} fade-in delay-1`}>
          <h2 className={styles.pillarTitle}>Luxury You Feel Every Day</h2>
          <Link href="/category/sinks" className={styles.pillarLink}>Sinks Collection</Link>
        </div>
        <div className={`${styles.pillar} fade-in delay-2`}>
          <h2 className={styles.pillarTitle}>Made to Outlast Trends</h2>
          <Link href="/customization" className={styles.pillarLink}>Customize Your Fixture</Link>
        </div>
        <div className={`${styles.pillar} fade-in delay-3`}>
          <h2 className={styles.pillarTitle}>Crafted in small batches</h2>
          <Link href="/#collection" className={styles.pillarLink}>Explore Collections</Link>
        </div>
      </section>

      {/* Featured Collection Multicolumn */}
      <section className={`${styles.collectionSection} container slide-up`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Collection</h2>
        </div>
        <div className={styles.collectionGrid}>
          {SHOP_COLLECTIONS.map((col, index) => (
            <div key={col.name} className={`${styles.collectionCard} fade-in`} style={{ animationDelay: `${index * 0.15}s` }}>
              <div className={styles.collectionImageWrapper}>
                <Image
                  src={col.image}
                  alt={col.name}
                  className={styles.collectionImage}
                  fill
                  sizes="(max-width: 600px) 100vw, 25vw"
                />
              </div>
              <div className={styles.collectionInfo}>
                <Link href={col.href} className={styles.collectionBtn}>
                  <span className={styles.btnText}>{col.name}</span>
                  <span className={styles.btnIcon}>
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 3.75L13.75 10L7.5 16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="collection" className={`${styles.featuredSection} container slide-up`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
        </div>

        <div className={styles.productGrid}>
          {productsData.slice(0, 8).map((product, index) => (
            <ProductCard key={product.id} product={product as any} index={index} />
          ))}
        </div>
      </section>

      {/* Trusted By Partners & Media exactly from insideast */}
      <TrustedPartners />

      {/* Features Band exactly from insideast footer area */}
      <section className={styles.featuresBand}>
        <div className={`container ${styles.featuresGrid}`}>
          <div className={styles.featureItem}>
            <h3>Warranty & Quality Assurance</h3>
            <p>Every piece is crafted using premium materials and inspected for quality. All products include a manufacturer-backed warranty covering workmanship and material integrity.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Dedicated Customer Support</h3>
            <p>Our support team is here before and after your purchase. Need sizing help, customization advice, or installation guidance? We're always happy to assist.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Worldwide Shipping</h3>
            <p>We ship worldwide using reliable carriers. Each order is carefully packed and dispatched with tracking to ensure safe and timely delivery to your door.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Custom & Trade Orders</h3>
            <p>Looking for custom sizes, finishes, or bulk orders? Our artisans specialize in bespoke designs for homes, designers, and trade professionals.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
