import React from 'react';
import styles from '../info.module.css';

export const metadata = {
    title: 'Privacy Policy | AtlasUrbanCraft',
    description: 'How AtlasUrbanCraft collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.hero}>
                <span className={styles.badge}>Privacy</span>
                <h1 className={styles.pageTitle}>Privacy Policy</h1>
                <p className={styles.subtitle}>
                    Your privacy matters to us. This policy explains how we collect, use, and safeguard your personal information.
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
                    <p className={styles.sectionText}>
                        When you visit our website or make a purchase, we may collect the following information:
                    </p>
                    <p className={styles.sectionText}>
                        • <strong>Personal Information</strong> — Name, email address, shipping address, phone number, and billing information when you place an order.
                        <br />• <strong>Account Information</strong> — Login credentials if you create an account.
                        <br />• <strong>Usage Data</strong> — Browser type, IP address, pages visited, and time spent on our site, collected automatically through cookies and analytics.
                        <br />• <strong>Communication Data</strong> — Any information you provide when contacting our support team.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
                    <p className={styles.sectionText}>
                        We use your information exclusively to:
                    </p>
                    <p className={styles.sectionText}>
                        • Process and fulfill your orders
                        <br />• Send order confirmations, shipping updates, and tracking information
                        <br />• Respond to your inquiries and provide customer support
                        <br />• Improve our website, products, and services
                        <br />• Send marketing emails (only with your consent — you can unsubscribe at any time)
                        <br />• Comply with legal obligations
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Information Sharing</h2>
                    <p className={styles.sectionText}>
                        We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We may share your data only with:
                    </p>
                    <p className={styles.sectionText}>
                        • <strong>Shipping carriers</strong> — To deliver your orders (e.g., DHL, FedEx, UPS).
                        <br />• <strong>Payment processors</strong> — To securely process your transactions (e.g., Stripe, PayPal).
                        <br />• <strong>Analytics providers</strong> — To understand website usage patterns (anonymized data only).
                        <br />• <strong>Legal authorities</strong> — If required by law or to protect our rights.
                    </p>
                </div>

                <div className={styles.highlightBox}>
                    <p>
                        <strong>🔒 Data Security</strong>
                        <br /><br />
                        We implement industry-standard security measures including SSL encryption, secure payment processing, and restricted data access. Your payment information is never stored on our servers — it is handled directly by our PCI-compliant payment processors.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Cookies</h2>
                    <p className={styles.sectionText}>
                        Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can control cookie settings through your browser preferences. Disabling cookies may affect some site functionality.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Your Rights</h2>
                    <p className={styles.sectionText}>
                        You have the right to:
                    </p>
                    <p className={styles.sectionText}>
                        • <strong>Access</strong> the personal data we hold about you
                        <br />• <strong>Correct</strong> any inaccurate or incomplete information
                        <br />• <strong>Delete</strong> your personal data (subject to legal retention requirements)
                        <br />• <strong>Opt out</strong> of marketing communications at any time
                        <br />• <strong>Request portability</strong> of your data in a structured format
                    </p>
                    <p className={styles.sectionText}>
                        To exercise any of these rights, contact us at <strong>contact@atlasurbancraft.com</strong>.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. Data Retention</h2>
                    <p className={styles.sectionText}>
                        We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, including for legal, accounting, or reporting requirements. Order-related data is typically retained for 7 years for tax and accounting purposes.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. Changes to This Policy</h2>
                    <p className={styles.sectionText}>
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>8. Contact Us</h2>
                    <p className={styles.sectionText}>
                        If you have any questions or concerns about this Privacy Policy, please contact us at <strong>contact@atlasurbancraft.com</strong>.
                    </p>
                </div>

                <p className={styles.lastUpdated}>Last updated: March 2026</p>
            </div>
        </div>
    );
}
