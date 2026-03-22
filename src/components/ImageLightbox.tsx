"use client";

import React, { useState, useEffect, useRef } from 'react';

interface ImageLightboxProps {
    images: string[];
    initialIndex: number;
    onClose: () => void;
}

export default function ImageLightbox({ images, initialIndex, onClose }: ImageLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isZoomed, setIsZoomed] = useState(false);
    const [lastTap, setLastTap] = useState(0);

    // Touch swipe handling
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Handle ESC key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    const nextImage = () => {
        setIsZoomed(false);
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setIsZoomed(false);
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.changedTouches[0].screenX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = () => {
        if (isZoomed) return; // Don't swipe while zoomed in
        const swipeDistance = touchStartX.current - touchEndX.current;
        if (swipeDistance > 50) {
            nextImage(); // Swiped left
        } else if (swipeDistance < -50) {
            prevImage(); // Swiped right
        }
    };

    // Double tap handler for mobile
    const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
        // Prevent closing or swiping on double tap
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        if (tapLength < 300 && tapLength > 0) {
            setIsZoomed(!isZoomed);
            e.preventDefault();
        }
        setLastTap(currentTime);
    };

    return (
        <div style={overlayStyle}>
            <button style={closeBtnStyle} onClick={onClose} aria-label="Close Lightbox">
                ×
            </button>
            <div
                style={imageContainerStyle}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={handleTap}
            >
                <img
                    src={images[currentIndex]}
                    alt={`Product image ${currentIndex + 1}`}
                    style={{
                        ...imageStyle,
                        transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                        cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                        touchAction: isZoomed ? 'pan-x pan-y' : 'none', // Allow panning when zoomed
                    }}
                    draggable="false"
                />
            </div>

            {/* Navigation Dots for Mobile Context */}
            {images.length > 1 && (
                <div style={dotsContainerStyle}>
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            style={{
                                ...dotStyle,
                                backgroundColor: idx === currentIndex ? '#fff' : 'rgba(255,255,255,0.4)'
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// Inline styles for fast portable component
const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
};

const closeBtnStyle: React.CSSProperties = {
    position: 'absolute',
    top: '20px',
    right: '25px',
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: 'white',
    fontSize: '36px',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1',
};

const imageContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto', // For panning when zoomed
};

const imageStyle: React.CSSProperties = {
    maxWidth: '100vw',
    maxHeight: '100vh',
    objectFit: 'contain',
    transition: 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)',
};

const dotsContainerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '30px',
    display: 'flex',
    gap: '8px',
    zIndex: 10000,
};

const dotStyle: React.CSSProperties = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'background-color 0.2s',
};
