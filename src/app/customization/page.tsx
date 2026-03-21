import React from 'react';
import Link from 'next/link';
import styles from '../info.module.css';

export const metadata = {
    title: 'Customization | AtlasUrbanCraft',
    description: 'Create bespoke brass and copper pieces tailored to your exact specifications.',
};

export default function CustomizationPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.hero}>
                <span className={styles.badge}>Bespoke Craft</span>
                <h1 className={styles.pageTitle}>Custom Made, Just for You</h1>
                <p className={styles.subtitle}>
                    Every space is unique. That's why we offer full customization on nearly every piece in our collection — from dimensions to finishes, handles to drain configurations.
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>What Can Be Customized?</h2>
                    <div className={styles.featureGrid}>
                        <div className={styles.featureCard}>
                            <span className={styles.featureIcon}>📐</span>
                            <h3 className={styles.featureTitle}>Dimensions</h3>
                            <p className={styles.featureDesc}>Custom lengths, widths, and depths for sinks, shower arms, and fixtures.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <span className={styles.featureIcon}>🎨</span>
                            <h3 className={styles.featureTitle}>Finishes</h3>
                            <p className={styles.featureDesc}>Unlacquered brass, oil-rubbed bronze, antique patina, polished nickel, and more.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <span className={styles.featureIcon}>🔧</span>
                            <h3 className={styles.featureTitle}>Handle Styles</h3>
                            <p className={styles.featureDesc}>Simple Cross, Flat Cross, Lever — or discuss a custom design with our team.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <span className={styles.featureIcon}>🚿</span>
                            <h3 className={styles.featureTitle}>Showerheads</h3>
                            <p className={styles.featureDesc}>Rose, Square, or Round — available in custom diameters from 6" to 14".</p>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>How It Works</h2>
                    <div className={styles.orderedSection}>
                        <ol>
                            <li><strong>Share Your Vision</strong> — Contact us with your project details, dimensions, and design preferences.</li>
                            <li><strong>Design Consultation</strong> — Our team will work with you to finalize specifications and provide a detailed quote.</li>
                            <li><strong>Artisan Crafting</strong> — Your piece is handcrafted to your exact specifications in our Moroccan workshop.</li>
                            <li><strong>Quality Assurance</strong> — Every custom piece undergoes rigorous pressure testing and finish inspection.</li>
                            <li><strong>Worldwide Delivery</strong> — Securely packed and shipped directly to your door with full tracking.</li>
                        </ol>
                    </div>
                </div>

                <div className={styles.highlightBox}>
                    <p>
                        <strong>💡 Custom orders typically ship within 3–5 weeks.</strong>
                        <br /><br />
                        Due to the handcrafted nature of our products, each custom piece is made to order. We'll provide you with a timeline and progress updates throughout the process.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Popular Custom Requests</h2>
                    <p className={styles.sectionText}>
                        • Extended shower arm lengths for high ceilings or rain-style installations
                    </p>
                    <p className={styles.sectionText}>
                        • Oversized showerheads (10"–14" diameter) for luxury spa bathrooms
                    </p>
                    <p className={styles.sectionText}>
                        • Custom sink dimensions to fit exact countertop cutouts
                    </p>
                    <p className={styles.sectionText}>
                        • Matching hardware sets (towel bars, hooks, TP holders) in a single finish
                    </p>
                    <p className={styles.sectionText}>
                        • Non-standard valve configurations for specific plumbing setups
                    </p>
                </div>

                <div className={styles.cta}>
                    <h2 className={styles.ctaTitle}>Ready to Create Something Unique?</h2>
                    <p className={styles.ctaText}>Reach out to our team and let's bring your vision to life.</p>
                    <Link href="/contact" className={styles.ctaBtn}>Start Your Custom Order</Link>
                </div>
            </div>
        </div>
    );
}
