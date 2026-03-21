import productsData from '@/data/products.json';

export interface Category {
    name: string;
    slug: string;
    image: string;
    matches: string[];
}

export const CATEGORIES: Category[] = [
    { name: 'Lighting', slug: 'lighting', matches: ['Lighting'] },
    { name: 'Sinks', slug: 'sinks', matches: ['Sink'] },
    { name: 'Showers', slug: 'showers', matches: ['Shower Set', 'Showerhead'] },
    { name: 'Tub Fillers', slug: 'tub-fillers', matches: ['tub filler'] },
    { name: 'Bathtubs', slug: 'bathtubs', matches: ['Bathtub'] },
    { name: 'Faucets', slug: 'faucets', matches: ['Faucet'] },
    { name: 'Holders & Caddies', slug: 'holders-caddies', matches: ['towel holders', 'Tissue Holders', 'Toilet Paper Holders', 'Toothbrush Holder'] },
    { name: 'Drains & Hardware', slug: 'hardware', matches: ['Hardwar'] },
    { name: 'Hooks & Knobs', slug: 'hooks-knobs', matches: ['Knobs'] },
    { name: 'Fireplace Tools', slug: 'fireplace-tools', matches: ['Fireplace Tool'] }
].map(cat => ({
    ...cat,
    image: productsData.find(p => cat.matches.some(m => p.category.toLowerCase().includes(m.toLowerCase())))?.image || ''
}));

export function getCategoryBySlug(slug: string): Category | undefined {
    return CATEGORIES.find(c => c.slug === slug);
}

export function getProductsByCategory(slug: string) {
    const category = getCategoryBySlug(slug);
    if (!category) return [];
    return productsData.filter(p => category.matches.some(m => p.category.toLowerCase().includes(m.toLowerCase())));
}
