import productsData from '@/data/products.json';
import { RAW_CATEGORIES, RawCategory } from './constants';

export interface Category extends RawCategory {
    image: string;
}

export const CATEGORIES: Category[] = RAW_CATEGORIES.map(cat => ({
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
