"use client";

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function CheckoutPage() {
    const { items, cartTotal } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    if (items.length === 0 && !isProcessing) {
        // If cart is empty, redirect to cart page
        if (typeof window !== 'undefined') {
            router.push('/cart');
        }
        return null;
    }

    const handleStripePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items }),
            });
            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Checkout configuration error.");
                setIsProcessing(false);
            }
        } catch (err) {
            console.error(err);
            alert("Payment initiation failed.");
            setIsProcessing(false);
        }
    };

    return (
        <div className={`${styles.container} fade-in`}>
            <h1 className={styles.title}>Complete Your Order</h1>

            <div className={styles.checkoutLayout}>
                <form onSubmit={handleStripePayment}>
                    <section className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Contact Information</h2>
                        <div className={styles.formGrid}>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Email Address *</label>
                                <input type="email" required className={styles.input} placeholder="john@example.com" />
                            </div>
                        </div>
                    </section>

                    <section className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Shipping Address</h2>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>First Name *</label>
                                <input type="text" required className={styles.input} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Last Name *</label>
                                <input type="text" required className={styles.input} />
                            </div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Address *</label>
                                <input type="text" required className={styles.input} placeholder="Street Address or P.O. Box" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>City *</label>
                                <input type="text" required className={styles.input} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Postal Code *</label>
                                <input type="text" required className={styles.input} />
                            </div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Country *</label>
                                <input type="text" required className={styles.input} defaultValue="United States" />
                            </div>
                        </div>
                    </section>

                    <button type="submit" disabled={isProcessing} className={styles.payBtn}>
                        {isProcessing ? 'Redirecting to Secure Payment...' : 'Continue to Payment'}
                    </button>

                    <div className={styles.securityNote}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span>Payments are securely processed by Stripe.</span>
                    </div>
                </form>

                <div className={styles.summary}>
                    <h2 className={styles.summaryTitle}>Your Order</h2>

                    <div className={styles.itemsList}>
                        {items.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemImageWrapper}>
                                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                                </div>
                                <div className={styles.itemDetails}>
                                    <span className={styles.itemName}>{item.name}</span>
                                    <span className={styles.itemQty}>Qty: {item.quantity}</span>
                                </div>
                                <span className={styles.itemPriceLine}>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.totals}>
                        <div className={styles.totalsRow}>
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className={styles.totalsRow}>
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className={styles.totalsStrong}>
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
