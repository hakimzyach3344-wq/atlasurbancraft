import React from 'react';
import Link from 'next/link';
import styles from '../info.module.css';

export const metadata = {
    title: 'Customer Reviews | AtlasUrbanCraft',
    description: 'Read what our customers say about their AtlasUrbanCraft experience.',
};

export default function ReviewsPage() {
    const reviews = [
        { stars: '★★★★★', text: 'Truly amazing hardware. Incredibly high quality, with a particular attention to detail. We are so happy with this purchase.', author: 'Todd', date: 'Aug 2025' },
        { stars: '★★★★★', text: 'Beautiful craftsmanship and design. This is for an outdoor shower that can be seen from the pool. Very nice, very attractive.', author: 'Ann Favre-Watkins', date: 'Jul 2025' },
        { stars: '★★★★★', text: '5 out of 5 for everything. We wanted a customised head shower size as well and for a small fee it was no problem at all. I really recommend this shop!', author: 'David Hazelaar', date: 'Jul 2025' },
        { stars: '★★★★★', text: 'Incredible customer service and the shower system was exactly as described. Highly recommended for any luxury renovation.', author: 'Rachel Christine', date: 'Aug 2025' },
        { stars: '★★★★★', text: 'First class service and product. The goods were delivered faster than internally within Australia. Great quality and exceptional value for money.', author: 'Judy Davie', date: 'Dec 2025' },
        { stars: '★★★★★', text: 'Great item! Very well packed and the delivery was really fast. So pleased with it.', author: 'Imogen', date: 'May 2025' },
        { stars: '★★★★★', text: 'This product is beautiful and the seller is very communicative and friendly. I\'m very happy with my new shower head.', author: 'Kate McGloughlin', date: 'Sep 2024' },
        { stars: '★★★★★', text: 'We love this for our outdoor shower. Big delicious water drops!', author: 'Melissa Douaire', date: 'Aug 2024' },
        { stars: '★★★★★', text: 'Stunning products — we have purchased many things from these guys and highly recommend.', author: 'Poppy Garbin', date: 'Jul 2024' },
        { stars: '★★★★★', text: 'The shower head is great quality and looks awesome! The customer service is the best and highly recommend this seller.', author: 'Timothy Hoffman', date: 'Jul 2024' },
        { stars: '★★★★★', text: 'BEAUTIFUL AND WELL-MADE. THANK YOU.', author: 'Sabina', date: 'Aug 2025' },
        { stars: '★★★★★', text: 'Repurchasing in the future for other projects — thank you!', author: 'Waibel and Groves', date: 'Aug 2025' },
    ];

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.hero}>
                <span className={styles.badge}>Testimonials</span>
                <h1 className={styles.pageTitle}>What Our Customers Say</h1>
                <p className={styles.subtitle}>
                    Real stories from real customers who have transformed their spaces with AtlasUrbanCraft artisan pieces.
                </p>
            </div>

            <div className={styles.content}>
                {reviews.map((review, idx) => (
                    <div key={idx} className={styles.reviewCard}>
                        <div className={styles.reviewStars}>{review.stars}</div>
                        <p className={styles.reviewText}>"{review.text}"</p>
                        <span className={styles.reviewAuthor}>— {review.author} · {review.date}</span>
                    </div>
                ))}

                <div className={styles.cta}>
                    <h2 className={styles.ctaTitle}>Join Our Happy Customers</h2>
                    <p className={styles.ctaText}>Discover the craftsmanship that earns 5-star reviews.</p>
                    <Link href="/catalog" className={styles.ctaBtn}>Browse Products</Link>
                </div>
            </div>
        </div>
    );
}
