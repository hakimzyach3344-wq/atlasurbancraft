"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSlideshow.module.css';

const SLIDES = [
    {
        subtitle: "Experience Authentic Craftsmanship",
        title: "Luxury You Feel Every Day",
        buttonText: "Shop Sinks",
        buttonLink: "/category/sinks",
        image: "https://www.insideast.com/cdn/shop/files/Generated_Image_January_10_2026_-_1_26PM.jpg?v=1771411692&width=3200"
    },
    {
        subtitle: "Customize every detail to fit your space",
        title: "Made to Outlast Trends",
        buttonText: "Customize Your Fixture",
        buttonLink: "/customization",
        image: "https://www.insideast.com/cdn/shop/files/DSC09203.jpg?v=1770656354&width=3200"
    },
    {
        subtitle: "Handcrafted by master artisans",
        title: "Crafted in small batches",
        buttonText: "Explore Collections",
        buttonLink: "/catalog",
        image: "https://www.insideast.com/cdn/shop/files/Generated_Image_January_12_2026_-_8_58PM.jpg?v=1771411793&width=3200"
    }
];

export default function HeroSlideshow() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className={styles.hero}>
            {SLIDES.map((slide, index) => (
                <div
                    key={index}
                    className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                >
                    <div className={styles.heroOverlay}></div>
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        className={styles.heroImage}
                        fill
                        priority={index === 0} // LCP optimization
                        sizes="100vw"
                    />
                    <div className={styles.heroContent}>
                        <p className={`${styles.heroSubtitle} ${index === currentSlide ? 'slide-up' : ''}`}>
                            {slide.subtitle}
                        </p>
                        <h1 className={`${styles.heroTitle} ${index === currentSlide ? 'slide-up delay-1' : ''}`}>
                            {slide.title}
                        </h1>
                        <div className={index === currentSlide ? 'fade-in delay-2' : ''}>
                            <Link href={slide.buttonLink} className={styles.heroBtn}>
                                {slide.buttonText}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <div className={styles.dots}>
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
