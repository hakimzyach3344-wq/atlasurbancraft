import React from 'react';
import Link from 'next/link';
import styles from '../info.module.css';

export const metadata = {
    title: 'Blog | AtlasUrbanCraft',
    description: 'Explore articles on brass care, interior design, and artisan stories from AtlasUrbanCraft.',
};

export default function BlogPage() {
    const posts = [
        {
            icon: '🔨',
            date: 'March 2026',
            title: 'The Art of Unlacquered Brass: Why Living Finishes Are Making a Comeback',
            excerpt: 'Discover why architects and designers are choosing raw brass finishes that develop character over time, and how to care for your unlacquered pieces.'
        },
        {
            icon: '🏠',
            date: 'February 2026',
            title: '5 Ways to Incorporate Brass Fixtures Into a Modern Bathroom',
            excerpt: 'From exposed shower systems to hammered sinks, learn how to blend traditional brass craftsmanship with contemporary interior design.'
        },
        {
            icon: '✨',
            date: 'January 2026',
            title: 'Patina Guide: How Your Brass Will Age (And Why That\'s Beautiful)',
            excerpt: 'A visual journey through the stages of brass patina development, with tips on controlling the aging process to match your aesthetic.'
        },
        {
            icon: '🌍',
            date: 'December 2025',
            title: 'Meet the Artisans: A Day in Our Moroccan Workshop',
            excerpt: 'Step inside our Atlas Mountain workshop and meet the craftsmen who turn raw brass into heirloom-quality fixtures using centuries-old techniques.'
        },
        {
            icon: '🛁',
            date: 'November 2025',
            title: 'Exposed vs. Concealed Shower Systems: Which Is Right for You?',
            excerpt: 'A comprehensive comparison of exposed and concealed brass shower systems, including installation requirements, aesthetics, and maintenance.'
        },
        {
            icon: '🪞',
            date: 'October 2025',
            title: 'Brass Care 101: Maintaining Your Handcrafted Fixtures',
            excerpt: 'Essential tips for cleaning, polishing, and maintaining your solid brass fixtures — whether you love the shine or embrace the patina.'
        },
    ];

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.hero}>
                <span className={styles.badge}>Journal</span>
                <h1 className={styles.pageTitle}>The AtlasUrbanCraft Blog</h1>
                <p className={styles.subtitle}>
                    Stories of craftsmanship, design inspiration, and practical guides for living with artisan brass.
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.blogGrid}>
                    {posts.map((post, idx) => (
                        <div key={idx} className={styles.blogCard}>
                            <div className={styles.blogImage}>{post.icon}</div>
                            <div className={styles.blogContent}>
                                <p className={styles.blogDate}>{post.date}</p>
                                <h3 className={styles.blogTitle}>{post.title}</h3>
                                <p className={styles.blogExcerpt}>{post.excerpt}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.cta}>
                    <h2 className={styles.ctaTitle}>Stay Inspired</h2>
                    <p className={styles.ctaText}>Subscribe to our newsletter for the latest articles and design tips.</p>
                    <Link href="/" className={styles.ctaBtn}>Subscribe Now</Link>
                </div>
            </div>
        </div>
    );
}
