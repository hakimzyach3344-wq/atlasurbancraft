"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import productsData from '../data/products.json';
import styles from './SalesNotification.module.css';

const LOCATIONS = [
    "New York, NY", "London, UK", "Paris, France", "Tokyo, Japan",
    "Dubai, UAE", "Casablanca, Morocco", "Marrakesh, Morocco",
    "Los Angeles, CA", "Sydney, Australia", "Berlin, Germany",
    "Toronto, Canada", "Madrid, Spain", "Rome, Italy", "Amsterdam, Netherlands"
];

const NAMES = [
    "Sarah", "John", "Fatima", "Omar", "Emma",
    "Lucas", "Chloe", "Ahmed", "Maria", "David",
    "Sophie", "Youssef", "Isabella", "Liam"
];

export default function SalesNotification() {
    const [currentSale, setCurrentSale] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimum swipe distance in pixels
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isSwipe = Math.abs(distance) > minSwipeDistance;
        if (isSwipe) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        // Initial delay before first notification
        const initialDelay = setTimeout(() => {
            showRandomSale();
        }, 10000);

        const interval = setInterval(() => {
            showRandomSale();
        }, 60000); // Show every 1 minute

        return () => {
            clearTimeout(initialDelay);
            clearInterval(interval);
        };
    }, []);

    const showRandomSale = () => {
        const randomProduct = productsData[Math.floor(Math.random() * productsData.length)];
        const randomLocation = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
        const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];

        setCurrentSale({
            product: randomProduct,
            location: randomLocation,
            name: randomName,
            time: "just now"
        });

        setIsVisible(true);

        // Hide after 6 seconds
        setTimeout(() => {
            setIsVisible(false);
        }, 60000); // User wants images and products aleatoire, but didn't specify duration. 6s is standard.
        // Wait, I should make it feel like it's happening.
    };

    // Correcting the above: setTimeout should be smaller than interval
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => setIsVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!currentSale) return null;

    return (
        <div
            className={`${styles.notification} ${isVisible ? styles.visible : ''}`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <Link href={`/product/${currentSale.product.id}`} className={styles.linkWrapper}>
                <div className={styles.content}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={currentSale.product.image}
                            alt={currentSale.product.name}
                            width={60}
                            height={60}
                            className={styles.productImage}
                        />
                    </div>
                    <div className={styles.text}>
                        <p className={styles.title}>
                            <span className={styles.name}>{currentSale.name}</span> in <span className={styles.location}>{currentSale.location}</span>
                        </p>
                        <p className={styles.description}>
                            Purchased <strong>{currentSale.product.name.substring(0, 40)}{currentSale.product.name.length > 40 ? '...' : ''}</strong>
                        </p>
                        <p className={styles.timestamp}>{currentSale.time}</p>
                    </div>
                </div>
            </Link>
            <button className={styles.closeBtn} onClick={() => setIsVisible(false)}>×</button>
            <div className={styles.progressBar}></div>
        </div>
    );
}
