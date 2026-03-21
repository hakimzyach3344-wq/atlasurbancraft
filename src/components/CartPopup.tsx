"use client";

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './CartPopup.module.css';

export default function CartPopup() {
    const { items, isCartPopupOpen, closeCartPopup, removeItem, updateQuantity, cartTotal, openCheckoutDrawer } = useCart();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Also close cart when clicking Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeCartPopup();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [closeCartPopup]);

    if (!isCartPopupOpen || !isMounted) return null;

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const freeShippingThreshold = 500;
    const progress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
    const achievedFreeShipping = cartTotal >= freeShippingThreshold;

    return (
        <>
            <div className={styles.overlay} onClick={closeCartPopup} />

            <div className={`${styles.drawer} ${isCartPopupOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h3 className={styles.headerTitle}>Your cart ({totalQuantity})</h3>
                    <button className={styles.closeBtn} onClick={closeCartPopup} aria-label="Close cart">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className={styles.body}>
                    {items.length === 0 ? (
                        <div className={styles.emptyCart}>
                            <p>Your cart is empty.</p>
                            <button className={styles.btnContinueEmpty} onClick={closeCartPopup}>
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className={styles.itemsList}>
                                {items.map((item) => (
                                    <div key={item.id} className={styles.cartItem}>
                                        <div className={styles.itemImageWrapper}>
                                            <img src={item.image} alt={item.name} className={styles.itemImage} />
                                        </div>
                                        <div className={styles.itemDetails}>
                                            <div className={styles.itemHeader}>
                                                <h4 className={styles.itemName}>{item.name}</h4>
                                                <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className={styles.itemFooter}>
                                                <div className={styles.qtyControl}>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                </div>
                                                <div className={styles.itemPrice}>
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.shippingModule}>
                                <p className={styles.shippingText}>
                                    {achievedFreeShipping
                                        ? "Congrats! You have achieved Free Shipping"
                                        : `Spend $${(freeShippingThreshold - cartTotal).toFixed(2)} more to reach Free Shipping!`}
                                </p>
                                <div className={styles.progressBarWrapper}>
                                    <div className={styles.progressBar}>
                                        <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <div className={styles.truckIcon} style={{ left: `max(0%, calc(${progress}% - 12px))` }}>
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {items.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.discountModule}>
                            <input type="text" placeholder="Discount code" className={styles.discountInput} />
                            <button className={styles.applyBtn}>Apply</button>
                        </div>

                        <button className={styles.checkoutBtn} onClick={() => { closeCartPopup(); openCheckoutDrawer(); }}>
                            Buy it Now • ${cartTotal.toFixed(2)}
                        </button>

                        <div className={styles.payments}>
                            <div className={styles.paymentIcons}>
                                {/* Using simple styled divs to mimic payment icons for layout */}
                                <span className={styles.payIcon} style={{ color: '#ff5f00' }}>MC</span>
                                <span className={styles.payIcon} style={{ color: '#1a1f71' }}>VISA</span>
                                <span className={styles.payIcon} style={{ color: '#0079C1' }}>PayPal</span>
                                <span className={styles.payIcon} style={{ color: '#000000' }}>Apple Pay</span>
                            </div>
                        </div>

                        <button className={styles.continueLink} onClick={closeCartPopup}>
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
