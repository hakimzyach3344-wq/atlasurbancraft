import React from 'react';

export const metadata = {
    title: 'Contact Us | Atlas Urban Craft',
    description: 'Get in touch with the team at Atlas Urban Craft.',
};

export default function ContactPage() {
    return (
        <div className="container py-16" style={{ minHeight: '60vh' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Contact Us</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                Have a question or need support? We are here to help. Reach out to us at support@atlasurbancraft.com.
            </p>
        </div>
    );
}
