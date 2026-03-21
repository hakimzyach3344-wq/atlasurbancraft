"use client";

import { useEffect } from 'react';
import './TrustedPartners.css';

export default function TrustedPartners() {
    useEffect(() => {
        const track = document.getElementById('ia-track');
        if (!track) return;

        const intervalSpeed = 4500;
        let autoScroll: NodeJS.Timeout;

        function moveNext() {
            if (!track) return;
            const firstCard = track.firstElementChild as HTMLElement;
            if (!firstCard) return;

            const cardWidth = firstCard.getBoundingClientRect().width;
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.columnGap) || 20;
            const moveAmount = cardWidth + gap;

            track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            track.style.transform = `translateX(-${moveAmount}px)`;

            const handleTransitionEnd = function () {
                track.style.transition = 'none';
                track.style.transform = 'translateX(0)';
                track.appendChild(firstCard);
                track.removeEventListener('transitionend', handleTransitionEnd);
            };

            track.addEventListener('transitionend', handleTransitionEnd);
        }

        autoScroll = setInterval(moveNext, intervalSpeed);

        const handleMouseEnter = () => clearInterval(autoScroll);
        const handleMouseLeave = () => {
            clearInterval(autoScroll);
            autoScroll = setInterval(moveNext, intervalSpeed);
        };

        track.addEventListener('mouseenter', handleMouseEnter);
        track.addEventListener('mouseleave', handleMouseLeave);

        let touchStartX = 0;
        let touchEndX = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoScroll);
        };

        const handleTouchEnd = (e: TouchEvent) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) moveNext();
            clearInterval(autoScroll);
            autoScroll = setInterval(moveNext, intervalSpeed);
        };

        track.addEventListener('touchstart', handleTouchStart, { passive: true });
        track.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            clearInterval(autoScroll);
            if (track) {
                track.removeEventListener('mouseenter', handleMouseEnter);
                track.removeEventListener('mouseleave', handleMouseLeave);
                track.removeEventListener('touchstart', handleTouchStart);
                track.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, []);

    return (
        <section className="section section--padding color-scheme-1" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <div id="ia-reviews-editorial">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', letterSpacing: '0.05em' }}>Trusted by Partners & Media</h2>
                </div>

                <div className="ia-editorial-viewport">
                    <div className="ia-editorial-track" id="ia-track" style={{ transition: 'none', transform: 'translateX(0px)' }}>

                        <div className="ia-editorial-card" style={{ backgroundImage: "url('https://cdn.shopify.com/s/files/1/0639/7329/4189/files/5_f4874f60-e6b6-41a5-9ba1-59db56a3ca37.webp?v=1770469699')" }}>
                            <div className="ia-editorial-content">
                                <div className="ia-editorial-header">
                                    <div className="ia-stars">★★★★★</div>
                                    <div className="ia-quote-icon">❝</div>
                                </div>
                                <p className="ia-review-text">"The craftsmanship is incredible. These brass fixtures have become the focal point of our design projects."</p>
                                <div className="ia-author">
                                    <div className="ia-avatar">PD</div>
                                    <div className="ia-meta">
                                        <h4>Popham Design</h4>
                                        <span>Design Studio</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ia-editorial-card" style={{ backgroundImage: "url('https://cdn.shopify.com/s/files/1/0639/7329/4189/files/2_366417a8-3174-490d-8910-b2e86a179287.webp?v=1770469699')" }}>
                            <div className="ia-editorial-content">
                                <div className="ia-editorial-header">
                                    <div className="ia-stars">★★★★★</div>
                                    <div className="ia-quote-icon">❝</div>
                                </div>
                                <p className="ia-review-text">"Insideast unlacquered brass fixtures are the perfect touch of timeless elegance. They demand authenticity."</p>
                                <div className="ia-author">
                                    <div className="ia-avatar">HM</div>
                                    <div className="ia-meta">
                                        <h4>Hausmatter</h4>
                                        <span>Home Renovation</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ia-editorial-card" style={{ backgroundImage: "url('https://cdn.shopify.com/s/files/1/0639/7329/4189/files/7.webp?v=1770469912')" }}>
                            <div className="ia-editorial-content">
                                <div className="ia-editorial-header">
                                    <div className="ia-stars">★★★★★</div>
                                    <div className="ia-quote-icon">❝</div>
                                </div>
                                <p className="ia-review-text">"We designed every suite to be an oasis of calm. The handcrafted details create a grounded atmosphere."</p>
                                <div className="ia-author">
                                    <div className="ia-avatar">JH</div>
                                    <div className="ia-meta">
                                        <h4>Jacumba Hotel</h4>
                                        <span>Boutique Hotel</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ia-editorial-card" style={{ backgroundImage: "url('https://cdn.shopify.com/s/files/1/0639/7329/4189/files/6_10e0f589-8193-4668-b118-84077b771b7e.webp?v=1770469699')" }}>
                            <div className="ia-editorial-content">
                                <div className="ia-editorial-header">
                                    <div className="ia-stars">★★★★★</div>
                                    <div className="ia-quote-icon">❝</div>
                                </div>
                                <p className="ia-review-text">"A definitive source for high-quality Moroccan craftsmanship that bridges artisan tradition and modern design."</p>
                                <div className="ia-author">
                                    <div className="ia-avatar">RM</div>
                                    <div className="ia-meta">
                                        <h4>Remodelista</h4>
                                        <span>Design Publication</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ia-editorial-card" style={{ backgroundImage: "url('https://cdn.shopify.com/s/files/1/0639/7329/4189/files/13.webp?v=1770470075')" }}>
                            <div className="ia-editorial-content">
                                <div className="ia-editorial-header">
                                    <div className="ia-stars">★★★★★</div>
                                    <div className="ia-quote-icon">❝</div>
                                </div>
                                <p className="ia-review-text">"As an Airbnb Plus host, every detail counts. Guests constantly ask about our beautiful bathroom hardware."</p>
                                <div className="ia-author">
                                    <div className="ia-avatar">AB</div>
                                    <div className="ia-meta">
                                        <h4>Airbnb Plus</h4>
                                        <span>Superhost</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
