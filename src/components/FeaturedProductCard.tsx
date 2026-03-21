"use client";

import Link from 'next/link';
import styles from './FeaturedProductCard.module.css';

interface FeaturedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    slug: string;
}

export default function FeaturedProductCard({ product, index }: { product: FeaturedProduct; index: number }) {
    return (
        <div className={`${styles.card} fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
            <Link href={`/product/${product.id}`} className={styles.imageLink}>
                <img src={product.image} alt={product.name} className={styles.productImage} loading="lazy" />
            </Link>
            <div className={styles.info}>
                <Link href={`/product/${product.id}`}>
                    <h3 className={styles.productTitle}>{product.name}</h3>
                </Link>
                <div className={styles.productPrice}>${product.price.toFixed(2)}</div>
                <div className={styles.actions}>
                    <Link href={`/product/${product.id}`} className={styles.btnChooseOption}>
                        Choose your option
                    </Link>
                </div>
            </div>
        </div>
    );
}
