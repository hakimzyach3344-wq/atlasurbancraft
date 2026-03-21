import { getCategoryBySlug, getProductsByCategory } from '@/lib/categories';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';
import styles from '@/app/page.module.css';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    // Note: in Next.js 15, route params must be awaited
    const { slug } = await params;
    const category = getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const products = getProductsByCategory(slug);

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '6rem', minHeight: '80vh' }}>
            <div className="container fade-in">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                        {category.name}
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Explore our handcrafted collection of {products.length} {category.name.toLowerCase()}.
                    </p>
                </div>

                {products.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        No products available in this category yet.
                    </div>
                ) : (
                    <div className={styles.productGrid}>
                        {products.map((product: any, index: number) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
