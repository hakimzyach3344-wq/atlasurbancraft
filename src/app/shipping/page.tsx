import React from 'react';
import Link from 'next/link';
import styles from '../info.module.css';

export const metadata = {
    title: 'Shipping Terms | AtlasUrbanCraft',
    description: 'Learn about our worldwide shipping policies, delivery times, and tracking.',
};

export default function ShippingPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.hero}>
                <span className={styles.badge}>Shipping</span>
                <h1 className={styles.pageTitle}>Shipping Terms</h1>
                <p className={styles.subtitle}>
                    We deliver handcrafted brass and copper pieces worldwide with secure packaging and full tracking.
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Free Worldwide Shipping</h2>
                    <p className={styles.sectionText}>
                        AtlasUrbanCraft offers <strong>free shipping</strong> on all orders, worldwide. There are no hidden fees or minimum order requirements. Every piece is carefully packaged and shipped directly from our workshop.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Delivery Times</h2>
                    <div className={styles.featureGrid}>
                        <div className={styles.featureCard}>
                            <span className={styles.featureIcon}>🇺🇸</span>
                            <h3 className={styles.featureTitle}>United States</h3>
                            <p className={styles.featureDesc}>7–14 business days via express courier with tracking.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <span className={styles.featureIcon}>🇪🇺</span>
                            <h3 className={styles.featureTitle}>Europe</h3>
                            <p className={styles.featureDesc}>7–12 business days via express courier with tracking.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <span className={styles.featureIcon}>🇬🇧</span>
                            <h3 className={styles.featureTitle}>United Kingdom</h3>
                            <p className={styles.featureDesc}>7–12 business days via express courier with tracking.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <span className={styles.featureIcon}>🌍</span>
                            <h3 className={styles.featureTitle}>Rest of World</h3>
                            <p className={styles.featureDesc}>10–18 business days depending on destination.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.highlightBox}>
                    <p>
                        <strong>📦 Handcrafted to Order</strong>
                        <br /><br />
                        Since each piece is handcrafted after your order is placed, please allow 3–7 additional business days for production before shipping. Custom orders may take 3–5 weeks. You'll receive a tracking number once your order ships.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Packaging & Protection</h2>
                    <p className={styles.sectionText}>
                        Every item is wrapped in protective foam, secured with custom inserts, and boxed in reinforced shipping cartons. Our packaging is designed to withstand international transit and ensure your piece arrives in perfect condition.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Customs & Duties</h2>
                    <p className={styles.sectionText}>
                        International orders may be subject to customs duties or import taxes levied by your country's customs authority. These charges are the responsibility of the buyer and vary by region. We recommend checking with your local customs office for details.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Order Tracking</h2>
                    <p className={styles.sectionText}>
                        Once your order ships, you will receive an email with a tracking number and a link to track your shipment in real time. If you have any questions about your delivery, please contact us at <strong>contact@atlasurbancraft.com</strong>.
                    </p>
                </div>

                <p className={styles.lastUpdated}>Last updated: March 2026</p>
            </div>
        </div>
    );
}
