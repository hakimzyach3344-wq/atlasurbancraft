import React from 'react';
import styles from '../info.module.css';

export const metadata = {
    title: 'Warranty | AtlasUrbanCraft',
    description: 'Comprehensive warranty coverage for all AtlasUrbanCraft products.',
};

export default function WarrantyPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.hero}>
                <span className={styles.badge}>Protection</span>
                <h1 className={styles.pageTitle}>5-Year Heritage Warranty</h1>
                <p className={styles.subtitle}>
                    We stand behind the quality of every piece with industry-leading warranty protection.
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>What's Covered</h2>
                    <p className={styles.sectionText}>
                        Our <strong>5-Year Limited Warranty</strong> covers all brass and copper components against manufacturing defects in materials and workmanship. This includes:
                    </p>
                    <p className={styles.sectionText}>
                        • Structural integrity of all brass and copper components
                        <br />• Finish integrity (excluding normal patina development)
                        <br />• Mechanical function of valves, diverters, and handles
                        <br />• Joint and seam integrity under normal use
                        <br />• Cartridge and internal valve components
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>What's Not Covered</h2>
                    <p className={styles.sectionText}>
                        • <strong>Natural patina development</strong> — Unlacquered brass is designed to age and develop a patina. This is a celebrated feature, not a defect.
                        <br />• Installation labor costs
                        <br />• Damage caused by misuse, abuse, or improper installation
                        <br />• Normal wear and tear from daily use
                        <br />• Damage from harsh chemical cleaners or abrasive materials
                    </p>
                </div>

                <div className={styles.highlightBox}>
                    <p>
                        <strong>🛡️ Our Promise</strong>
                        <br /><br />
                        If any AtlasUrbanCraft product proves defective within the warranty period, we will repair or replace it at our discretion, free of charge. We're so confident in our craftsmanship that the risk is entirely on us.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>How to File a Claim</h2>
                    <div className={styles.orderedSection}>
                        <ol>
                            <li><strong>Document the Issue</strong> — Take clear photos of the defect or damage.</li>
                            <li><strong>Contact Us</strong> — Email <strong>contact@atlasurbancraft.com</strong> with your order number, photos, and a description of the issue.</li>
                            <li><strong>Review</strong> — Our team will review your claim within 2–3 business days.</li>
                            <li><strong>Resolution</strong> — We'll arrange repair, replacement, or refund as appropriate.</li>
                        </ol>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Important Notes</h2>
                    <p className={styles.sectionText}>
                        Visual defects must be reported within <strong>15 days of delivery</strong> with photos and proof of purchase. Warranty claims submitted after the 5-year period will be evaluated on a case-by-case basis.
                    </p>
                    <p className={styles.sectionText}>
                        <em>Note: Unlacquered brass is designed to patinate — this natural aging is not a defect, but a celebrated hallmark of authenticity.</em>
                    </p>
                </div>

                <p className={styles.lastUpdated}>Last updated: March 2026</p>
            </div>
        </div>
    );
}
