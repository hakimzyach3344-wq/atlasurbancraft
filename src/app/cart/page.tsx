"use client";

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import styles from './page.module.css';

export default function CartPage() {
    const { items, removeItem, updateQuantity, cartTotal } = useCart();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Cart</h1>

            {items.length === 0 ? (
                <div className={`${styles.emptyState} fade-in`}>
                    <p style={{ marginBottom: '2rem' }}>Your shopping cart is currently empty.</p>
                    <Link href="/#collection" className="btn-primary">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className={`${styles.cartLayout} slide-up`}>
                    <div className={styles.itemsList}>
                        {items.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemImgWrapper}>
                                    <img src={item.image} alt={item.name} className={styles.itemImg} />
                                </div>
                                <div className={styles.itemDetails}>
                                    <div className={styles.itemHeader}>
                                        <h3 className={styles.itemName}>{item.name}</h3>
                                        <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                                    </div>

                                    <div className={styles.itemControls}>
                                        <div className={styles.qtyControl}>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >−</button>
                                            <span className={styles.qtyNum}>{item.quantity}</span>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >+</button>
                                        </div>
                                        <button
                                            className={styles.removeBtn}
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.summary}>
                        <h2 className={styles.summaryTitle}>Order Summary</h2>
                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className={styles.summaryTotal}>
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <Link href="/checkout" className={styles.checkoutBtn}>
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
