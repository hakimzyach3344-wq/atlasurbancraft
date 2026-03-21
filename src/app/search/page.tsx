import React from 'react';
import productsData from '@/data/products.json';
import { CATEGORIES } from '@/lib/categories';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import styles from '@/app/page.module.css';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const params = await searchParams;
    const query = params.q || '';
    return {
        title: `Search Results for "${query}" | Atlas Urban Craft`,
    };
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const params = await searchParams;
    const query = params.q?.toLowerCase() || '';

    if (!query) {
        return (
            <div className="container" style={{ padding: '6rem 0', minHeight: '60vh', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Search</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Please enter a search term to find products.</p>
            </div>
        );
    }

    // Search logic
    const matchedProducts = productsData.filter(product => {
        return (
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    });

    const matchedCategories = CATEGORIES.filter(cat => {
        return cat.name.toLowerCase().includes(query);
    });

    // Mocking matched blogs for demonstration
    const allBlogs = [
        { title: "The History of Moroccan Copper Sinks", slug: "history-of-moroccan-copper-sinks" },
        { title: "How to Care for Your Unlacquered Brass Faucet", slug: "care-for-unlacquered-brass" },
        { title: "Top 5 Lighting Trends for 2026", slug: "lighting-trends-2026" }
    ];

    const matchedBlogs = allBlogs.filter(blog => blog.title.toLowerCase().includes(query));

    return (
        <div className="container" style={{ padding: '6rem 0', minHeight: '60vh' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Search Results</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
                Showing results for <strong>"{params.q}"</strong>
            </p>

            {/* Categories / Collections Results */}
            {matchedCategories.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', borderBottom: '1px solid var(--accent)', paddingBottom: '0.5rem' }}>Matching Collections</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {matchedCategories.map(cat => (
                            <Link key={cat.slug} href={`/category/${cat.slug}`} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--accent)', borderRadius: '50px', textDecoration: 'none', color: 'var(--foreground)' }}>
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Blogs Results */}
            {matchedBlogs.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', borderBottom: '1px solid var(--accent)', paddingBottom: '0.5rem' }}>Matching Blogs</h2>
                    <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                        {matchedBlogs.map(blog => (
                            <li key={blog.slug} style={{ marginBottom: '0.5rem' }}>
                                <Link href={`/blog/${blog.slug}`} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                                    {blog.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Products Results */}
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--accent)', paddingBottom: '0.5rem' }}>
                    Products ({matchedProducts.length})
                </h2>
                {matchedProducts.length > 0 ? (
                    <div className={styles.productGrid}>
                        {matchedProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No products matched your search.</p>
                )}
            </div>

            {matchedProducts.length === 0 && matchedCategories.length === 0 && matchedBlogs.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--secondary)', borderRadius: '8px' }}>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>We couldn't find anything matching your search.</p>
                    <Link href="/catalog" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>Browse Catalog</Link>
                </div>
            )}
        </div>
    );
}
