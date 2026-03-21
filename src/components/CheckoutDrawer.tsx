"use client";

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import styles from './CheckoutDrawer.module.css';

export default function CheckoutDrawer() {
    const { items, isCheckoutDrawerOpen, closeCheckoutDrawer, cartTotal } = useCart();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Also close drawer when clicking Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeCheckoutDrawer();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [closeCheckoutDrawer]);

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

                    <form className={styles.checkoutForm} onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.formSection}>
                            <h4 className={styles.sectionTitle}>Contact</h4>
                            <input type="email" placeholder="Email or mobile phone number" className={styles.inputField} />
                        </div>

                        <div className={styles.formSection}>
                            <h4 className={styles.sectionTitle}>Shipping address</h4>
                            <div className={styles.inputGroup}>
                                <input type="text" placeholder="First name" className={styles.inputField} />
                                <input type="text" placeholder="Last name" className={styles.inputField} />
                            </div>
                            <input type="text" placeholder="Address" className={styles.inputField} style={{ marginTop: '0.75rem' }} />
                            <input type="text" placeholder="Apartment, suite, etc. (optional)" className={styles.inputField} style={{ marginTop: '0.75rem' }} />
                            <div className={styles.inputGroup} style={{ marginTop: '0.75rem' }}>
                                <input type="text" placeholder="City" className={styles.inputField} />
                                <input type="text" placeholder="State" className={styles.inputField} />
                                <input type="text" placeholder="ZIP code" className={styles.inputField} />
                            </div>
                        </div>

                        <div className={styles.formSection}>
                            <h4 className={styles.sectionTitle}>Payment</h4>
                            <p className={styles.subtitle}>All transactions are secure and encrypted.</p>

                            <div className={styles.stripeBox}>
                                <div className={styles.stripeHeader}>
                                    <span className={styles.stripeTitle}>Credit card</span>
                                    <div className={styles.cardIcons}>
                                        <span className={styles.cardIcon}>VISA</span>
                                        <span className={styles.cardIcon}>MC</span>
                                        <span className={styles.cardIcon}>AMEX</span>
                                    </div>
                                </div>
                                <div className={styles.stripeBody}>
                                    <div className={styles.stripeInputWrapper}>
                                        <input type="text" placeholder="Card number" className={styles.stripeInput} />
                                        <svg className={styles.lockIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0110 0v4" />
                                        </svg>
                                    </div>
                                    <div className={styles.stripeInputGroup}>
                                        <input type="text" placeholder="Expiration date (MM / YY)" className={styles.stripeInput} />
                                        <input type="text" placeholder="Security code" className={styles.stripeInput} />
                                    </div>
                                    <input type="text" placeholder="Name on card" className={styles.stripeInput} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className={styles.footer}>
                    <button className={styles.payBtn} onClick={closeCheckoutDrawer}>
                        Pay ${cartTotal.toFixed(2)}
                    </button>
                    <div className={styles.secureBadge}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                        Secured by Stripe
                    </div>
                </div>
            </div>
        </>
    );
}
