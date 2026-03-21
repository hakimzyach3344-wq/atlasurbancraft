import React from 'react';

export const metadata = {
    title: 'Trade Program | Atlas Urban Craft',
    description: 'Join our Trade Program for interior designers and contractors.',
};

export default function TradeProgramPage() {
    return (
        <div className="container py-16" style={{ minHeight: '60vh' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Trade Program</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                We offer exclusive discounts and dedicated support for interior designers, architects, and contractors.
            </p>
            <button className="btn-primary" style={{ marginTop: '2rem' }}>Apply Now</button>
        </div>
    );
}
