"use client";

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import styles from './CheckoutDrawer.module.css';

const COUNTRIES = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'AU', name: 'Australia' },
    { code: 'MA', name: 'Morocco' },
];

export default function CheckoutDrawer() {
    const { items, isCheckoutDrawerOpen, closeCheckoutDrawer, cartTotal } = useCart();
    const [isMounted, setIsMounted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'US'
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeCheckoutDrawer();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [closeCheckoutDrawer]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleStripePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items, customer: formData }),
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

    if (!isCheckoutDrawerOpen || !isMounted) return null;

    return (
        <>
            <div className={styles.overlay} onClick={closeCheckoutDrawer} />

            <div className={`${styles.drawer} ${isCheckoutDrawerOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h3 className={styles.headerTitle}>Express Checkout</h3>
                    <button className={styles.closeBtn} onClick={closeCheckoutDrawer} aria-label="Close checkout">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className={styles.body}>
                    <div className={styles.orderSummary}>
                        <h4 className={styles.sectionTitle}>Order Summary</h4>
                        <div className={styles.drawerItemsList}>
                            {items.map(item => (
                                <div key={item.id} className={styles.drawerItem}>
                                    <div className={styles.drawerItemImageWrapper}>
                                        <img src={item.image} alt={item.name} className={styles.drawerItemImage} />
                                    </div>
                                    <div className={styles.drawerItemDetails}>
                                        <h5 className={styles.drawerItemName}>{item.name}</h5>
                                        <p className={styles.drawerItemQty}>Qty: {item.quantity}</p>
                                    </div>
                                    <div className={styles.drawerItemPrice}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.orderTotal}>Total <span className={styles.totalAmount}>${cartTotal.toFixed(2)}</span></div>
                    </div>

                    <form className={styles.checkoutForm} onSubmit={handleStripePayment}>
                        <div className={styles.formSection}>
                            <h4 className={styles.sectionTitle}>Contact</h4>
                            <input
                                name="email"
                                type="email"
                                placeholder="Email address"
                                className={styles.inputField}
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                autoComplete="email"
                            />
                        </div>

                        <div className={styles.formSection}>
                            <h4 className={styles.sectionTitle}>Shipping address</h4>

                            <select
                                name="country"
                                className={styles.inputField}
                                style={{ marginBottom: '0.75rem' }}
                                value={formData.country}
                                onChange={handleInputChange}
                                autoComplete="shipping country"
                                required
                            >
                                {COUNTRIES.map(c => (
                                    <option key={c.code} value={c.code}>{c.name}</option>
                                ))}
                            </select>

                            <div className={styles.inputGroup}>
                                <input
                                    name="firstName"
                                    type="text"
                                    placeholder="First name"
                                    className={styles.inputField}
                                    required
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    autoComplete="given-name"
                                />
                                <input
                                    name="lastName"
                                    type="text"
                                    placeholder="Last name"
                                    className={styles.inputField}
                                    required
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    autoComplete="family-name"
                                />
                            </div>
                            <input
                                name="address"
                                type="text"
                                placeholder="Address"
                                className={styles.inputField}
                                style={{ marginTop: '0.75rem' }}
                                required
                                value={formData.address}
                                onChange={handleInputChange}
                                autoComplete="shipping street-address"
                            />
                            <div className={styles.inputGroup} style={{ marginTop: '0.75rem' }}>
                                <input
                                    name="city"
                                    type="text"
                                    placeholder="City"
                                    className={styles.inputField}
                                    required
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    autoComplete="shipping address-level2"
                                />
                                <input
                                    name="postalCode"
                                    type="text"
                                    placeholder="ZIP code"
                                    className={styles.inputField}
                                    required
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    autoComplete="shipping postal-code"
                                />
                            </div>
                        </div>

                        <div className={styles.footer} disable-footer-overlap="true">
                            <button
                                type="submit"
                                className={styles.payBtn}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
                            </button>
                            <div className={styles.secureBadge}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                                Secured by Stripe
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
