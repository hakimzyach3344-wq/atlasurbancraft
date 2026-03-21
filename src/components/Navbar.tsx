"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { CATEGORIES } from '@/lib/categories';
import productsData from '@/data/products.json';
import styles from './Navbar.module.css';

const ChevronDownIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const SearchIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
);

const UserIcon = ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
);

const ShoppingBagIcon = ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

export default function Navbar() {
    const router = useRouter();
    const { items } = useCart();
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [activeMegaMenuCategory, setActiveMegaMenuCategory] = useState(CATEGORIES[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const megaMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsCategoryOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className={styles.headerWrapper}>
            <div className={styles.announcementBar}>
                FREE SHIPPING WORLDWIDE ON ALL ORDERS
            </div>

            <div className={styles.stickyBox}>
                <div className={styles.logoSection}>
                    <Link href="/" className={styles.logo}>
                        ATLAS URBAN CRAFT
                    </Link>
                </div>

                <div className={styles.topSection}>
                    <div className={`container ${styles.topContainer}`}>

                        <div className={styles.categoryDropdownWrapper} ref={dropdownRef}>
                            <button
                                className={styles.categorySelectBtn}
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                aria-expanded={isCategoryOpen}
                            >
                                All Categories
                                <ChevronDownIcon size={16} className={`${styles.categoryChevron} ${isCategoryOpen ? styles.rotate : ''}`} />
                            </button>

                            {isCategoryOpen && (
                                <div className={styles.customDropdownMenu}>
                                    <div className={styles.dropdownHeader}>
                                        <span className={styles.dropdownTitle}>Collections</span>
                                    </div>
                                    <ul className={styles.dropdownList}>
                                        {CATEGORIES.map(cat => (
                                            <li key={cat.slug}>
                                                <button
                                                    className={styles.dropdownItem}
                                                    onClick={() => {
                                                        setIsCategoryOpen(false);
                                                        router.push(`/category/${cat.slug}`);
                                                    }}
                                                >
                                                    {cat.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <form className={styles.searchContainer} onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className={styles.searchBtn} aria-label="Search">
                                <SearchIcon size={20} />
                            </button>
                        </form>

                        <div className={styles.actionsBox}>
                            <button className={styles.iconBtn} aria-label="User Account">
                                <UserIcon />
                            </button>
                            <Link href="/cart" className={styles.cartBtn} aria-label="Shopping Cart">
                                <div className={styles.cartIconWrapper}>
                                    <ShoppingBagIcon />
                                    {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
                                </div>
                            </Link>
                            <div className={styles.currencySelector}>
                                <span className={styles.currencyText}>USD ($)</span>
                                <span className={styles.separator}>|</span>
                                <span className={styles.flag}>🇺🇸</span>
                                <span className={styles.langText}>EN</span>
                                <ChevronDownIcon size={14} className={styles.langChevron} />
                            </div>
                        </div>

                    </div>
                </div>

            </div> {/* End of stickyBox */}

            <nav className={styles.bottomSection}>
                <div className={`container ${styles.navLinks}`}>
                    <div
                        className={styles.megaMenuContainer}
                        onMouseEnter={() => setIsMegaMenuOpen(true)}
                        onMouseLeave={() => setIsMegaMenuOpen(false)}
                        ref={megaMenuRef}
                    >
                        <Link href="/catalog" className={`${styles.navLink} ${styles.catalogLink}`}>
                            Catalog <ChevronDownIcon size={14} className={`${styles.navChevron} ${isMegaMenuOpen ? styles.rotate : ''}`} />
                        </Link>

                        {isMegaMenuOpen && (
                            <div className={styles.megaMenuDropdown}>
                                <div className={styles.megaMenuLayout}>

                                    {/* Left: Category List */}
                                    <div className={styles.megaMenuLeft}>
                                        <ul className={styles.megaMenuCategoryList}>
                                            {CATEGORIES.map(cat => (
                                                <li key={cat.name}>
                                                    <Link
                                                        href={`/category/${cat.slug}`}
                                                        className={`${styles.megaMenuCategoryBtn} ${activeMegaMenuCategory.name === cat.name ? styles.activeMegaMenuCat : ''}`}
                                                        onMouseEnter={() => setActiveMegaMenuCategory(cat)}
                                                        onClick={() => setIsMegaMenuOpen(false)}
                                                    >
                                                        {cat.name}
                                                        <ChevronDownIcon size={12} className={styles.categoryArrowRight} />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Right: Products Grid */}
                                    <div className={styles.megaMenuRight}>
                                        <div className={styles.megaMenuHeader}>
                                            <h4>{activeMegaMenuCategory.name} Collection</h4>
                                            <Link href={`/category/${activeMegaMenuCategory.slug}`} className={styles.viewAllLink} onClick={() => setIsMegaMenuOpen(false)}>
                                                View All
                                            </Link>
                                        </div>
                                        <div className={styles.megaMenuProductsGrid}>
                                            {productsData
                                                .filter(p => activeMegaMenuCategory.matches.some(match => p.category.toLowerCase().includes(match.toLowerCase())))
                                                .slice(0, 4)
                                                .map(product => (
                                                    <Link
                                                        href={`/product/${product.id}`}
                                                        key={product.id}
                                                        className={styles.megaMenuProductCard}
                                                        onClick={() => setIsMegaMenuOpen(false)}
                                                    >
                                                        <div className={styles.megaMenuProductImage}>
                                                            <img src={product.image} alt={product.name} />
                                                        </div>
                                                        <p className={styles.megaMenuProductName}>{product.name}</p>
                                                        <p className={styles.megaMenuProductPrice}>${product.price.toFixed(2)}</p>
                                                    </Link>
                                                ))
                                            }
                                            {productsData.filter(p => activeMegaMenuCategory.matches.some(match => p.category.toLowerCase().includes(match.toLowerCase()))).length === 0 && (
                                                <p className={styles.noProductsText}>View collection for details.</p>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/our-story" className={styles.navLink}>Our Story</Link>
                    <Link href="/reviews" className={styles.navLink}>Reviews</Link>
                    <Link href="/blog" className={styles.navLink}>Blog</Link>
                    <Link href="/customization" className={styles.navLink}>Customization</Link>
                    <Link href="/trade-program" className={styles.navLink}>Trade Program</Link>
                    <Link href="/contact" className={styles.navLink}>Contact</Link>
                </div>
            </nav>
        </header>
    );
}
