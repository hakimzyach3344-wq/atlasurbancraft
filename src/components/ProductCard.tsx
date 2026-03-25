"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    images?: string[];
    category: string;
    slug: string;
}

export default function ProductCard({ product, index }: { product: Product; index: number }) {
    const { addItem } = useCart();
    const router = useRouter();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        // Visual feedback could be added here (e.g. a toast)
    };

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        router.push('/checkout');
    };

    return (
        <div className={`${styles.productCard} fade-in`} style={{ animationDelay: `${(index % 20) * 0.05}s` }}>
            <div className={styles.imageWrapper}>
                <Link href={`/product/${product.id}`} className={styles.imageLink} style={{ position: 'relative', display: 'block', width: '100%', height: '100%' }}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        className={`${styles.primaryImage} ${product.images && product.images.length > 1 ? styles.hasSecondary : ''}`}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                    {product.images && product.images.length > 1 && (
                        <Image
                            src={product.images[1]}
                            alt={product.name}
                            className={styles.secondaryImage}
                            fill
                            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                        />
                    )}
                </Link>

                <div className={styles.floatingAction}>
                    <button className={styles.quickAddBtn} onClick={handleAddToCart}>
                        <span className={styles.quickAddIcon}>
                            <svg viewBox="0 0 20 20" fill="none" className="icon icon-shopping-bag" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.3804 16.25H3.61947C3.46585 16.25 3.31752 16.1939 3.20241 16.0922C3.0873 15.9904 3.01334 15.8501 2.99447 15.6977L1.88119 6.32267C1.87089 6.2347 1.87941 6.14556 1.90617 6.06113C1.93294 5.9767 1.97734 5.89893 2.03644 5.83296C2.09553 5.767 2.16797 5.71434 2.24896 5.67849C2.32995 5.64264 2.41763 5.62441 2.50619 5.62501H17.4937C17.5823 5.62441 17.6699 5.64264 17.7509 5.67849C17.8319 5.71434 17.9044 5.767 17.9634 5.83296C18.0225 5.89893 18.0669 5.9767 18.0937 6.06113C18.1205 6.14556 18.129 6.2347 18.1187 6.32267L17.0054 15.6977C16.9865 15.8501 16.9126 15.9904 16.7975 16.0922C16.6824 16.1939 16.534 16.25 16.3804 16.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M6.875 5.625V5C6.875 4.1712 7.20424 3.37634 7.79029 2.79029C8.37634 2.20424 9.1712 1.875 10 1.875C10.8288 1.875 11.6237 2.20424 12.2097 2.79029C12.7958 3.37634 13.125 4.1712 13.125 5V5.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </span>
                        <span className={styles.quickAddText}>Add to Cart</span>
                    </button>
                </div>
            </div>

            <div className={styles.productInfo}>
                <p className={styles.productType}>
                    <Link href={`/category/${product.slug}`} className={styles.typeLink}>
                        {product.category || 'Product'}
                    </Link>
                </p>
                <h3 className={styles.productTitle}>
                    <Link href={`/product/${product.id}`} className={styles.titleLink}>
                        {product.name}
                    </Link>
                </h3>
                <div className={styles.productReviews}>
                    <span className={styles.stars}>★★★★★</span>
                    <span className={styles.reviewText}>5.0 / 5</span>
                </div>
                <div className={styles.productPriceWrapper}>
                    <span className={styles.priceFrom}>From</span>
                    <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
