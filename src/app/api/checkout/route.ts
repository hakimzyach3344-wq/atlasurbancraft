import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2026-02-25.clover' as any, // Reverting to user's specific version
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const origin = req.headers.get('origin') || 'https://www.atlasurbancraft.com';
        console.log('Checkout Payload:', JSON.stringify(body, null, 2));
        const { items, customer } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            console.error('Checkout error: Cart is empty or invalid items');
            return NextResponse.json({ error: 'Cart is empty or invalid' }, { status: 400 });
        }

        const lineItems = items.map((item: any) => {
            const amount = Math.round((item.price || 0) * 100);

            // Ensure images are absolute URLs
            const imageUrls = [];
            if (item.image) {
                const imgPath = item.image.startsWith('http') ? item.image : `${origin}${item.image.startsWith('/') ? '' : '/'}${item.image}`;
                imageUrls.push(imgPath);
            }

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name || 'Unknown Product',
                        images: imageUrls,
                    },
                    unit_amount: amount,
                },
                quantity: item.quantity || 1,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: customer?.email,
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/?success=true`,
            cancel_url: `${req.headers.get('origin')}/?canceled=true`,
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB', 'FR', 'DE', 'IT', 'ES', 'AU', 'MA'],
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('--- STRIPE CHECKOUT ERROR ---');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);
        console.error('Error Stack:', err.stack);
        if (err.raw) {
            console.error('Raw Error:', JSON.stringify(err.raw, null, 2));
        }
        return NextResponse.json({
            error: err.message,
            details: err.raw?.message || 'Check server logs for details'
        }, { status: 500 });
    }
}
