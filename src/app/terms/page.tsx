import React from 'react';
import styles from '../info.module.css';

export const metadata = {
    title: 'Terms of Service | AtlasUrbanCraft',
    description: 'Read the terms and conditions governing your use of AtlasUrbanCraft.',
};

export default function TermsPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.hero}>
                <span className={styles.badge}>Legal</span>
                <h1 className={styles.pageTitle}>Terms of Service</h1>
                <p className={styles.subtitle}>
                    Please read these terms carefully before using our website or placing an order.
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
                    <p className={styles.sectionText}>
                        By accessing or using the AtlasUrbanCraft website (atlasurbancraft.com), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the website or make purchases.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Products & Pricing</h2>
                    <p className={styles.sectionText}>
                        All products are handcrafted to order. Prices are listed in USD and are subject to change without prior notice. We reserve the right to modify or discontinue any product at any time. Colors and finishes may vary slightly from images due to the handcrafted nature of our products and monitor settings.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Orders & Payment</h2>
                    <p className={styles.sectionText}>
                        By placing an order, you represent that the information you provide is accurate and complete. We accept major credit cards, PayPal, and other payment methods displayed at checkout. All payments are processed securely through encrypted payment gateways.
                    </p>
                    <p className={styles.sectionText}>
                        We reserve the right to refuse or cancel any order at our discretion, including orders that appear to be fraudulent or placed in error. If your order is cancelled, you will receive a full refund.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Shipping & Delivery</h2>
                    <p className={styles.sectionText}>
                        Delivery times are estimates and may vary based on your location and product availability. AtlasUrbanCraft is not responsible for delays caused by customs processing, weather events, or carrier issues. Risk of loss transfers to you upon delivery to the carrier.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Returns & Refunds</h2>
                    <p className={styles.sectionText}>
                        Returns and refunds are subject to our Refund Policy. Custom-made items are non-refundable unless defective. Please review our Refund Policy page for complete details.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. Intellectual Property</h2>
                    <p className={styles.sectionText}>
                        All content on this website — including text, images, product designs, logos, and graphics — is the property of AtlasUrbanCraft and is protected by intellectual property laws. You may not reproduce, distribute, or use any content without our prior written consent.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. Limitation of Liability</h2>
                    <p className={styles.sectionText}>
                        AtlasUrbanCraft shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount you paid for the specific product giving rise to the claim.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>8. Changes to Terms</h2>
                    <p className={styles.sectionText}>
                        We reserve the right to update these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Your continued use of the website constitutes acceptance of the revised terms.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>9. Contact</h2>
                    <p className={styles.sectionText}>
                        If you have any questions about these Terms of Service, please contact us at <strong>contact@atlasurbancraft.com</strong>.
                    </p>
                </div>

                <p className={styles.lastUpdated}>Last updated: March 2026</p>
            </div>
        </div>
    );
}
