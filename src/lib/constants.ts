export interface RawCategory {
    name: string;
    slug: string;
    matches: string[];
}

export const RAW_CATEGORIES: RawCategory[] = [
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
];
