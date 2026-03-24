import React from 'react';
import styles from './Wholesale.module.css';
import Link from 'next/link';

export default function WholesalePage() {
    return (
        <main className={styles.wholesaleWrapper}>
            <section className={styles.heroSection}>
                <div className={styles.heroImageWrapper}>
                    <img
                        src="/wholesale_hero.png"
                        alt="Wholesale Moroccan artisanal decor"
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay}>
                        <div className={styles.contentBox}>
                            <h1 className={styles.title}>Wholesale Program</h1>
                            <p className={styles.subtitle}>Bringing authentic Atlas Mountain craftsmanship to your business.</p>
                            <div className={styles.comingSoonBadge}>COMING SOON</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.faireSection}>
                <div className="container">
                    <div className={styles.faireLayout}>
                        <div className={styles.faireContent}>
                            <h2 className={styles.faireTitle}>Exclusive Collaboration with Faire</h2>
                            <p className={styles.faireDescription}>
                                We are excited to announce our upcoming wholesale portal in collaboration with <strong>Faire</strong>.
                                We are currently preparing our inventory to offer you the best of Moroccan artisanal heritage with
                                the seamless ordering experience you love.
                            </p>
                            <div className={styles.perks}>
                                <div className={styles.perk}>
                                    <span className={styles.perkIcon}>✨</span>
                                    <span>Net 60 Terms for eligible retailers</span>
                                </div>
                                <div className={styles.perk}>
                                    <span className={styles.perkIcon}>📦</span>
                                    <span>Low minimum orders</span>
                                </div>
                                <div className={styles.perk}>
                                    <span className={styles.perkIcon}>🌎</span>
                                    <span>Global shipping from our workshop</span>
                                </div>
                            </div>
                            <div className={styles.ctaWrapper}>
                                <p className={styles.waitingText}>Want to be notified when we launch?</p>
                                <Link href="/contact" className={styles.notifyBtn}>Contact Us</Link>
                            </div>
                        </div>
                        <div className={styles.faireLogoBox}>
                            <img src="https://layoffstracker.com/wp-content/uploads/2023/11/Faire_layoffs.jpg" alt="Faire Logo" className={styles.faireLogo} />
                            <p className={styles.faireTagline}>Our Official Wholesale Partner</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
