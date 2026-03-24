"use client";

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <Link href="/">
                            <img src="/logo.jpeg" alt="Atlas Urban Craft" className={styles.footerLogo} />
                        </Link>
                        <p className={styles.description} style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                            Meticulously handcrafted home decor and hardware from the heart of the Atlas Mountains, bringing artisanal heritage to modern living spaces.
                        </p>
                    </div>

                    <div className={styles.linksColumn}>
                        <h3 className={styles.title}>Quick Links</h3>
                        <ul className={styles.list}>
                            <li><Link href="/catalog" className={styles.link}>Catalog</Link></li>
                            <li><Link href="/our-story" className={styles.link}>Our Story</Link></li>
                            <li><Link href="/reviews" className={styles.link}>Reviews</Link></li>
                            <li><Link href="/blog" className={styles.link}>Blog</Link></li>
                            <li><Link href="/customization" className={styles.link}>Customization</Link></li>
                            <li><Link href="/wholesale" className={styles.link}>Wholesale Program</Link></li>
                        </ul>
                    </div>

                    <div className={styles.linksColumn}>
                        <h3 className={styles.title}>Policy Links</h3>
                        <ul className={styles.list}>
                            <li><Link href="/shipping" className={styles.link}>Shipping Terms</Link></li>
                            <li><Link href="/warranty" className={styles.link}>Warranty</Link></li>
                            <li><Link href="/refund" className={styles.link}>Refund Policy</Link></li>
                            <li><Link href="/terms" className={styles.link}>Terms of Service</Link></li>
                            <li><Link href="/privacy" className={styles.link}>Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className={styles.newsletter}>
                        <h3 className={styles.title}>Join Our Newsletter</h3>
                        <p className={styles.description} style={{ fontSize: '0.85rem' }}>
                            Subscribe to receive updates on new collections and exclusive artisan stories.
                        </p>
                        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); }}>
                            <input type="email" placeholder="Email Address" className={styles.input} required />
                            <button type="submit" className={styles.button}>Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} ATLAS URBAN CRAFT. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
