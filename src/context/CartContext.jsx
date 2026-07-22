import { createContext, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('amc_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            toast.error('Failed to load shopping cart.');
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('amc_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, qty = 1) => {
        const available = typeof product.quantity === 'number' ? product.quantity : 0;
        
        if (available <= 0) {
            toast.error(`Sorry, ${product.name} is currently sold out.`);
            return;
        }

        const existingItem = cartItems.find((item) => item.id === product.id);
        const currentCartQty = existingItem ? existingItem.quantity : 0;
        const newQty = currentCartQty + qty;

        if (newQty > available) {
            toast.error(`Only ${available} units are available in stock.`);
            return;
        }

        setCartItems((prevItems) => {
            const hasItem = prevItems.some((item) => item.id === product.id);
            if (hasItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: newQty }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: qty }];
        });

        toast.success(
            <div className="flex flex-col text-left gap-1">
                <span className="font-semibold text-slate-800 text-sm">{product.name} added to cart!</span>
                <Link to="/cart" className="text-xs font-bold text-maincolor hover:text-primarycolor transition-colors w-fit">
                    View Cart →
                </Link>
            </div>
        );
    };

    const decreaseQuantity = (productId) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === productId);
            if (!existingItem) return prevItems;

            if (existingItem.quantity <= 1) {
                return prevItems.filter((item) => item.id !== productId);
            }

            return prevItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        });
    };

    const getItemQuantityInCart = (productId) => {
        const item = cartItems.find((item) => item.id === productId);
        return item ? item.quantity : 0;
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
        toast.success('Item removed from cart.');
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, getItemQuantityInCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
