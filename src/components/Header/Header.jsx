import { Link, useLocation } from 'react-router';
import { Search, ShoppingBag, TextAlignJustify, UserRound, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SearchBox from './SearchBox';
import { useCart } from '../../context/CartContext';

// Navigation links list
const list = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Products", link: "/products" },
    { name: "Contact Us", link: "/contact" },
];

function Header() {
    const menuRef = useRef();
    const headerRef = useRef();
    const location = useLocation();
    const [listOpen, setListOpen] = useState(false);
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    const { cartItems } = useCart();

    const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Closing mobile menu on clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setListOpen(false);
            }
        }
        if (listOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [listOpen]);

    return (
        <>
            <header ref={headerRef} className="relative w-full bg-slate-50 text-maincolor border-b-[3px] border-gray-100 shadow-md py-3 z-20">
                <div className="container">
                    <div className='grid grid-cols-3 lg:grid-cols-[1fr_auto_1fr] items-center w-full'>
                        {/* 1. Left Column: Hamburger (Mobile) / Logo (Desktop) */}
                        <div className='flex items-center justify-start'>
                            {/* Mobile Menu Button */}
                            <button className='block lg:hidden text-maincolor hover:text-primarycolor cursor-pointer hover:scale-110 transition-all duration-300' onClick={() => setListOpen(!listOpen)}>
                                <TextAlignJustify className="w-7 h-7" />
                            </button>
                            {/* Desktop Logo */}
                            <div className='hidden lg:block'>
                                <Link to={"/"} className='w-24 h-24 max-w-full block hover:scale-105 transition-transform duration-300'>
                                    <img src="/logo.png" alt="logo" className='w-full h-full object-contain' />
                                </Link>
                            </div>
                        </div>
                        {/* Logo (Mobile) / Links (Desktop) */}
                        <div className='flex justify-center items-center'>
                            {/* Mobile Logo */}
                            <div className='block lg:hidden'>
                                <Link to={"/"} className='w-16 h-16 block hover:scale-105 transition-transform duration-300'>
                                    <img src="/logo.png" alt="logo" className='w-full h-full object-contain' />
                                </Link>
                            </div>
                            {/* Desktop Navigation Links */}
                            <nav className='hidden lg:block'>
                                <ul className='flex gap-8 justify-center items-center'>
                                    {list.map((item) => {
                                        const isActive = location.pathname === item.link;
                                        return (
                                            <li key={item.name} className='relative group'>
                                                <Link to={item.link} className={`font-bold transition-colors duration-300 relative py-2 ${isActive ? 'text-primarycolor' : 'text-maincolor hover:text-primarycolor'}`}>
                                                    {item.name}
                                                    {/* Underline */}
                                                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-primarycolor transform transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </nav>
                        </div>
                        {/* Icons */}
                        <div className='flex gap-4 lg:gap-6 justify-end items-center'>
                            {/* Search */}
                            <button className='text-maincolor hover:text-primarycolor transition-all duration-300 hover:scale-110 cursor-pointer' onClick={() => setSearchBarOpen(!searchBarOpen)}>
                                <Search className="w-6 h-6" />
                            </button>
                            
                            {/* Profile / Admin Portal */}
                            <Link to={"/admin"} className='hidden lg:block text-maincolor hover:text-primarycolor transition-all duration-300 hover:scale-110' title="Admin Portal">
                                <UserRound className="w-6 h-6" />
                            </Link>
                            
                            {/* Cart with Dynamic Item Count Badge */}
                            <Link to={"/cart"} className='relative text-maincolor hover:text-primarycolor transition-all duration-300 hover:scale-110 cursor-pointer p-0.5' title="Shopping Cart">
                                <ShoppingBag className="w-6 h-6" />
                                {totalCartCount > 0 && (
                                    <span className="absolute -top-2 -right-2.5 bg-primarycolor text-slate-950 font-black text-[10px] min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center border-2 border-white shadow-md transition-transform duration-300 animate-pulse">
                                        {totalCartCount > 99 ? '99+' : totalCartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Dark Blur Overlay (z-40) - Sitting BEHIND the side drawer */}
            {listOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300" 
                    onClick={() => setListOpen(false)}
                />
            )}

            {/* Mobile Menu Side Drawer (z-50) - Crisp White, Above the Blur Overlay */}
            <div 
                ref={menuRef} 
                className={`fixed top-0 left-0 w-[80%] max-w-[350px] h-screen bg-white transition-transform duration-300 pt-[40px] px-6 z-50 lg:hidden shadow-2xl ${
                    listOpen ? "translate-x-0" : "-translate-x-full"
                }`} 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Inside Mobile Drawer */}
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                    <Link to={"/"} onClick={() => setListOpen(false)} className='w-16 h-16 block'>
                        <img src="/logo.png" alt="logo" className='w-full h-full object-contain' />
                    </Link>
                    <X className='cursor-pointer text-black hover:text-primarycolor transition-colors duration-300 w-6 h-6' onClick={() => setListOpen(false)} />
                </div>
                {/* Mobile Navigation Links */}
                <ul className='flex gap-5 flex-col text-maincolor'>
                    {list.map((item) => {
                        const isActive = location.pathname === item.link;
                        return (
                            <li key={item.name} className="transition-all duration-300 hover:translate-x-2">
                                <Link to={item.link} onClick={() => setListOpen(false)} className={`font-bold block py-2.5 border-b border-gray-100 transition-colors duration-300 ${isActive ? 'text-primarycolor border-primarycolor' : 'text-maincolor hover:text-primarycolor'}`}>{item.name}</Link>
                            </li>
                        )
                    })}
                    {/* Profile Link in Mobile Menu (Admin) */}
                    <li className="transition-all duration-300 hover:translate-x-2">
                        <Link to="/admin" onClick={() => setListOpen(false)} className={`font-bold block py-2.5 border-b border-gray-100 transition-colors duration-300 ${location.pathname === '/admin' ? 'text-primarycolor border-primarycolor' : 'text-maincolor hover:text-primarycolor'}`}>Admin Portal</Link>
                    </li>
                </ul>
            </div>

            {/* Search Box overlay */}
            <SearchBox searchBarOpen={searchBarOpen} setSearchBarOpen={setSearchBarOpen}/>
        </>
    );
}

export default Header;