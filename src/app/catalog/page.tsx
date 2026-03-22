import React from 'react';
import productsData from '@/data/products.json';
import ProductCard from '@/components/ProductCard';
import styles from '../info.module.css';

export default function CatalogPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.hero}>
                <span className={styles.badge}>Full Collection</span>
                <h1 className={styles.pageTitle}>Our Catalog</h1>
                <p className={styles.subtitle}>
                    Explore our complete collection of handcrafted brass and copper fixtures, lighting, sinks, and accessories.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {productsData.map((product, index) => (
                    <ProductCard key={product.id} product={product as any} index={index} />
                ))}
            </div>
        </div>
    );
}
