import React from 'react';
import styles from '../info.module.css';

export const metadata = {
    title: 'Refund Policy | AtlasUrbanCraft',
    description: 'Our fair and transparent refund and return policy.',
};

export default function RefundPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.hero}>
                <span className={styles.badge}>Returns</span>
                <h1 className={styles.pageTitle}>Refund Policy</h1>
                <p className={styles.subtitle}>
                    Your satisfaction is our priority. We offer a generous return window and hassle-free refund process.
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>60-Day Return Policy</h2>
                    <p className={styles.sectionText}>
                        We offer a <strong>60-day return policy</strong> on most items. If you're not completely satisfied with your purchase, you may return it within 60 days of delivery for a full refund of the product price.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Return Conditions</h2>
                    <p className={styles.sectionText}>
                        To be eligible for a return, the item must be:
                    </p>
                    <p className={styles.sectionText}>
                        • In its original, unused condition
                        <br />• In the original packaging with all accessories included
                        <br />• Free from signs of installation, water exposure, or use
                        <br />• Accompanied by proof of purchase (order confirmation email)
                    </p>
                </div>

                <div className={styles.highlightBox}>
                    <p>
                        <strong>🔄 No-Risk Promise</strong>
                        <br /><br />
                        Not in love with your purchase? Return it for a full refund — no questions asked. We're so confident you'll cherish your piece that the risk is entirely on us.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>How to Initiate a Return</h2>
                    <div className={styles.orderedSection}>
                        <ol>
                            <li><strong>Contact Us</strong> — Email <strong>contact@atlasurbancraft.com</strong> with your order number and reason for return.</li>
                            <li><strong>Receive Instructions</strong> — We'll provide you with a return shipping address and any applicable labels.</li>
                            <li><strong>Ship the Item</strong> — Securely package the item and ship it back. Return shipping costs are the buyer's responsibility unless the item is defective.</li>
                            <li><strong>Receive Your Refund</strong> — Once we receive and inspect the returned item, your refund will be processed within 5–7 business days to your original payment method.</li>
                        </ol>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Exceptions</h2>
                    <p className={styles.sectionText}>
                        • <strong>Custom orders</strong> are made specifically to your specifications and are non-refundable unless defective.
                        <br />• Items that have been installed, used, or show signs of water exposure cannot be returned.
                        <br />• Sale items or items marked as "Final Sale" are not eligible for refunds.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Damaged or Defective Items</h2>
                    <p className={styles.sectionText}>
                        If your item arrives damaged or defective, please contact us within <strong>15 days of delivery</strong> with photos of the damage and your order number. We will arrange a replacement or full refund at no cost to you, including return shipping.
                    </p>
                </div>

                <p className={styles.lastUpdated}>Last updated: March 2026</p>
            </div>
        </div>
    );
}
