const fs = require('fs');
const path = require('path');
const https = require('https');

function cleanDescription(html) {
    if (!html) return '';
    let text = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

    // Replace structural tags with newlines
    text = text.replace(/<\/?(?:p|div|li|br|h[1-6]|ul)[^>]*>/gi, '\n');

    // Specifically push "→" to a new line if it's glued
    text = text.replace(/([^\n])(\s*→)/g, '$1\n$2');

    // Strip remaining HTML tags
    text = text.replace(/<[^>]+>/g, ' ');

    // Collapse horizontal whitespace (spaces/tabs), but keep newlines distinct
    text = text.replace(/[ \t]+/g, ' ');

    // Consolidate multiple dense newlines into a max of double spacing
    text = text.replace(/\n\s*\n/g, '\n\n');

    return text.trim();
}

function fetchPage(page) {
    const url = `https://www.insideast.com/products.json?limit=250&page=${page}`;
    return fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept": "application/json"
        }
    })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(json => json.products || []);
}

async function scrapeAll() {
    let allProducts = [];
    let page = 1;
    let hasMore = true;

    console.log('Starting extraction from insideast.com...');

    while (hasMore) {
        console.log(`Fetching page ${page}...`);
        try {
            const products = await fetchPage(page);
            if (products.length === 0) {
                hasMore = false;
            } else {

                const formatted = products.map(p => {
                    const priceStr = p.variants && p.variants[0] ? p.variants[0].price : '0';
                    const price = parseFloat(priceStr) || 0;
                    const image = p.images && p.images[0] ? p.images[0].src : 'https://placehold.co/600x600/e2e8f0/1e293b?text=No+Image';
                    const images = p.images ? p.images.map(img => img.src) : [image];

                    return {
                        id: p.id.toString(),
                        name: p.title,
                        price: price,
                        description: cleanDescription(p.body_html),
                        image: image,
                        images: images,
                        category: p.product_type || 'Uncategorized',
                        slug: p.handle
                    };
                });

                allProducts = allProducts.concat(formatted);
                page++;

                // Be gentle
                await new Promise(r => setTimeout(r, 1000));
            }
        } catch (error) {
            console.error(`Error on page ${page}:`, error.message);
            hasMore = false;
        }
    }

    console.log(`Extracted ${allProducts.length} products total.`);

    // Filter out products with 0 price if they are placeholder/invalid
    const validProducts = allProducts.filter(p => p.price > 0);
    console.log(`Filtered down to ${validProducts.length} valid products with price.`);

    const outputPath = path.join(__dirname, 'src', 'data', 'products.json');
    fs.writeFileSync(outputPath, JSON.stringify(validProducts, null, 2));
    console.log(`Successfully saved to ${outputPath}`);
}

scrapeAll();
