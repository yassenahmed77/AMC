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

    const addToCart = (product, qty = 1, showToast = true) => {
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

        if (showToast) {
            toast((t) => (
                <div className="flex items-center justify-between gap-3 w-full">
                    <span className="text-xs font-bold text-slate-800">
                        تمت إضافة <strong>{product.name}</strong> للسلة بنجاح!
                    </span>
                    <Link 
                        to="/cart" 
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-maincolor text-white px-3 py-1.5 rounded-lg text-xs font-black shrink-0 hover:bg-maincolor/90 transition-colors shadow-sm"
                    >
                        الذهاب للسلة 🛒
                    </Link>
                </div>
            ), { id: `add-to-cart-${product.id}`, duration: 4000, position: 'bottom-right' });
        }
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
