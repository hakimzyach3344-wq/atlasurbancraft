const fs = require('fs');
const path = require('path');
const https = require('https');

const PRODUCTS_JSON = path.join(__dirname, 'src/data/products.json');
const HERO_TSX = path.join(__dirname, 'src/components/HeroSlideshow.tsx');
const PAGE_TSX = path.join(__dirname, 'src/app/page.tsx');

const PRODUCTS_DIR = path.join(__dirname, 'public/images/products');
const HERO_DIR = path.join(__dirname, 'public/images/hero');

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

function sanitizeFilename(url) {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = path.basename(pathname);
    return filename.split('?')[0];
}

async function localizeProducts() {
    console.log('Localizing products...');
    const data = JSON.parse(fs.readFileSync(PRODUCTS_JSON, 'utf8'));
    let downloadCount = 0;

    for (const product of data) {
        if (product.image && (product.image.includes('shopify.com') || product.image.includes('insideast.com'))) {
            const filename = sanitizeFilename(product.image);
            const dest = path.join(PRODUCTS_DIR, filename);
            if (!fs.existsSync(dest)) {
                try {
                    await downloadImage(product.image, dest);
                    downloadCount++;
                } catch (e) {
                    console.error(`Error downloading ${product.image}: ${e.message}`);
                }
            }
            product.image = `/images/products/${filename}`;
        }

        if (product.images && Array.isArray(product.images)) {
            for (let i = 0; i < product.images.length; i++) {
                const img = product.images[i];
                if (img.includes('shopify.com') || img.includes('insideast.com')) {
                    const filename = sanitizeFilename(img);
                    const dest = path.join(PRODUCTS_DIR, filename);
                    if (!fs.existsSync(dest)) {
                        try {
                            await downloadImage(img, dest);
                            downloadCount++;
                        } catch (e) {
                            console.error(`Error downloading ${img}: ${e.message}`);
                        }
                    }
                    product.images[i] = `/images/products/${filename}`;
                }
            }
        }
    }

    fs.writeFileSync(PRODUCTS_JSON, JSON.stringify(data, null, 2));
    console.log(`Done localizing products. Downloaded ${downloadCount} images.`);
}

async function localizeHero() {
    console.log('Localizing hero slideshow...');
    let content = fs.readFileSync(HERO_TSX, 'utf8');
    const urlRegex = /https:\/\/(www\.)?(shopify\.com|insideast\.com)[^"']+/g;
    const matches = content.match(urlRegex);

    if (matches) {
        for (const url of matches) {
            const filename = sanitizeFilename(url);
            const dest = path.join(HERO_DIR, filename);
            if (!fs.existsSync(dest)) {
                try {
                    await downloadImage(url, dest);
                } catch (e) {
                    console.error(`Error downloading ${url}: ${e.message}`);
                }
            }
            content = content.replace(url, `/images/hero/${filename}`);
        }
        fs.writeFileSync(HERO_TSX, content);
    }
    console.log('Done localizing hero slideshow.');
}

async function localizePage() {
    console.log('Localizing main page...');
    let content = fs.readFileSync(PAGE_TSX, 'utf8');
    const urlRegex = /https:\/\/(www\.)?(shopify\.com|insideast\.com)[^"']+/g;
    const matches = content.match(urlRegex);

    if (matches) {
        for (const url of matches) {
            const filename = sanitizeFilename(url);
            const dest = path.join(HERO_DIR, filename); // Hero dir for page images too
            if (!fs.existsSync(dest)) {
                try {
                    await downloadImage(url, dest);
                } catch (e) {
                    console.error(`Error downloading ${url}: ${e.message}`);
                }
            }
            content = content.replace(url, `/images/hero/${filename}`);
        }
        fs.writeFileSync(PAGE_TSX, content);
    }
    console.log('Done localizing main page.');
}

async function main() {
    try {
        await localizeProducts();
        await localizeHero();
        await localizePage();
    } catch (e) {
        console.error(`Main error: ${e.message}`);
    }
}

main();
