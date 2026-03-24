"use client";

import React, { useState } from 'react';
import styles from './Contact.module.css';

export default function ContactPage() {
    const [status, setStatus] = useState<null | 'sending' | 'success' | 'error'>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <main className={styles.contactWrapper}>
            <section className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.title}>Contact Us</h1>
                    <p className={styles.subtitle}>Our artisans and support team are here to help you.</p>
                </div>
            </section>

            <section className={styles.formSection}>
                <div className="container">
                    <div className={styles.layout}>
                        <div className={styles.infoBox}>
                            <h2 className={styles.infoTitle}>Connect With Us</h2>
                            <p className={styles.infoDesc}>
                                Whether you have a question about our collections, need help with a custom order,
                                or want to learn more about our traditional techniques — we'd love to hear from you.
                            </p>

                            <div className={styles.details}>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailIcon}>✉️</span>
                                    <div>
                                        <p className={styles.detailLabel}>Email</p>
                                        <p className={styles.detailValue}>support@atlasurbancraft.com</p>
                                    </div>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailIcon}>🌍</span>
                                    <div>
                                        <p className={styles.detailLabel}>Global Shipping</p>
                                        <p className={styles.detailValue}>Available Worldwide</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formBox}>
                            {status === 'success' ? (
                                <div className={styles.successMessage}>
                                    <div className={styles.successIcon}>✅</div>
                                    <h3>Message Received</h3>
                                    <p>Thank you for reaching out. Our team will get back to you shortly via email.</p>
                                    <button onClick={() => setStatus(null)} className={styles.resetBtn}>Send another message</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="name">FullName</label>
                                        <input type="text" id="name" name="name" required placeholder="Your Name" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="email">Email Address</label>
                                        <input type="email" id="email" name="email" required placeholder="Email@example.com" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="message">Message</label>
                                        <textarea id="message" name="message" required rows={5} placeholder="How can we help you?"></textarea>
                                    </div>
                                    <button type="submit" disabled={status === 'sending'} className={styles.submitBtn}>
                                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                                    </button>
                                    {status === 'error' && <p className={styles.errorMessage}>Failed to send. Please try again later.</p>}
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
