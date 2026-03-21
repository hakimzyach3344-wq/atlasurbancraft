import React from 'react';
import Link from 'next/link';
import styles from '../info.module.css';

export const metadata = {
    title: 'Our Story | AtlasUrbanCraft',
    description: 'Discover the heritage, craftsmanship, and passion behind AtlasUrbanCraft.',
};

export default function OurStoryPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.hero}>
                <span className={styles.badge}>Our Heritage</span>
                <h1 className={styles.pageTitle}>Where Tradition Meets Modern Living</h1>
                <p className={styles.subtitle}>
                    Born from the ancient artisan workshops of Morocco, AtlasUrbanCraft bridges centuries of metalworking mastery with contemporary design sensibility.
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Our Beginning</h2>
                    <p className={styles.sectionText}>
                        AtlasUrbanCraft was founded with a singular vision: to bring the extraordinary craftsmanship of Moroccan artisans to homes around the world. Nestled in the foothills of the Atlas Mountains, our workshops have been the birthplace of exquisite brass and copper creations for generations.
                    </p>
                    <p className={styles.sectionText}>
                        Every piece that leaves our workshop carries the fingerprints of its maker — the rhythmic hammer strikes that shape each curve, the patient hands that polish every surface, and the generations of knowledge that guide every joint and seam.
                    </p>
                </div>

                <div className={styles.highlightBox}>
                    <p>
                        <strong>"We don't just make products — we preserve a living tradition."</strong>
                        <br /><br />
                        Each artisan in our workshop has trained for years under master craftsmen, learning techniques passed down through family lines for centuries. This isn't mass production; it's a labor of love, patience, and extraordinary skill.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>The Artisan Process</h2>
                    <p className={styles.sectionText}>
                        From raw brass ingots to the gleaming finished product you hold, each piece undergoes a meticulous journey. Our artisans hand-select premium solid brass, forge it using traditional methods, and finish it with techniques that have been refined over centuries.
                    </p>
                    <p className={styles.sectionText}>
                        The unlacquered brass we use is intentionally left raw — no synthetic coatings, no shortcuts. This allows each piece to develop its own unique patina over time, telling the story of its home and the hands that care for it.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Our Values</h2>
                    <div className={styles.featureGrid}>
                        <div className={styles.featureCard}>
                            <span className={styles.featureIcon}>🔨</span>
                            <h3 className={styles.featureTitle}>Handcrafted Excellence</h3>
                            <p className={styles.featureDesc}>Every piece is made by hand, one at a time, ensuring unmatched quality and character.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <span className={styles.featureIcon}>🌍</span>
                            <h3 className={styles.featureTitle}>Sustainable Craft</h3>
                            <p className={styles.featureDesc}>We use responsibly sourced materials and support the livelihoods of local artisan families.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <span className={styles.featureIcon}>♻️</span>
                            <h3 className={styles.featureTitle}>Heirloom Quality</h3>
                            <p className={styles.featureDesc}>Built to last generations, not seasons. Our products are designed to outlast trends.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <span className={styles.featureIcon}>✨</span>
                            <h3 className={styles.featureTitle}>Living Finishes</h3>
                            <p className={styles.featureDesc}>Our unlacquered brass develops a rich patina unique to your space and lifestyle.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.cta}>
                    <h2 className={styles.ctaTitle}>Experience the Craft</h2>
                    <p className={styles.ctaText}>Explore our collection of handcrafted brass and copper pieces.</p>
                    <Link href="/catalog" className={styles.ctaBtn}>Shop the Collection</Link>
                </div>
            </div>
        </div>
    );
}
