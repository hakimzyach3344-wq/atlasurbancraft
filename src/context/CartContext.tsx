"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, newQuantity: number) => void;
    cartTotal: number;
    isCartPopupOpen: boolean;
    lastAddedItem: Product | null;
    closeCartPopup: () => void;
    isCheckoutDrawerOpen: boolean;
    openCheckoutDrawer: () => void;
    closeCheckoutDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
    const [isCheckoutDrawerOpen, setIsCheckoutDrawerOpen] = useState(false);
    const [lastAddedItem, setLastAddedItem] = useState<Product | null>(null);

    useEffect(() => {
        setIsMounted(true);
        const savedCart = localStorage.getItem('atlas_cart');
        if (savedCart) {
            try { setItems(JSON.parse(savedCart)); } catch (e) { }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('atlas_cart', JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addItem = (product: Product) => {
        setItems((current) => {
            const existing = current.find(item => item.id === product.id);
            if (existing) {
                return current.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...current, { ...product, quantity: 1 }];
        });
        setLastAddedItem(product);
        setIsCartPopupOpen(true);
    };

    const closeCartPopup = () => setIsCartPopupOpen(false);
    const openCheckoutDrawer = () => setIsCheckoutDrawerOpen(true);
    const closeCheckoutDrawer = () => setIsCheckoutDrawerOpen(false);

    const removeItem = (id: string) => {
        setItems((current) => current.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setItems((current) =>
            current.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
        );
    };

    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            cartTotal,
            isCartPopupOpen,
            lastAddedItem,
            closeCartPopup,
            isCheckoutDrawerOpen,
            openCheckoutDrawer,
            closeCheckoutDrawer
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) throw new Error('useCart must be used within CartProvider');
    return context;
};
