import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const MobileHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    const activeStyle = "text-brand-primary font-semibold";
    const baseStyle = "text-lg font-medium text-gray-800 hover:text-brand-primary transition-colors duration-200";

    // Check screen size and handle resize
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth >= 344 && window.innerWidth <= 882);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Close menu when clicking outside (optional)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isMenuOpen && !e.target.closest('.mobile-menu-container')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    if (!isMobile) return null; // Don't render if not in mobile range

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm mobile-menu-container">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `h-10 w-32 rounded flex items-center justify-center ${
                        isActive ? 'border-b-2 border-brand-primary' : ''
                        }`
                    }
                >
                    <img src="/logo-mobile.svg" alt="Photographer Logo" className="h-8" />
                </NavLink>

                {/* Hamburger Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="bg-black p-2 focus:outline-none"
                    aria-label="Menu"
                >
                    {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                </button>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-white mt-16 z-40 p-6 animate-mobile-fade-in
                        will-change-[opacity, transform]">
                        <nav className="flex flex-col space-y-6">
                            {[
                                { path: "/Portfolio", name: "Portfolio" },
                                { path: "/home", name: "Home" },
                                { path: "/about", name: "About" },
                                { path: "/contact", name: "Contact" },
                                { path: "/bookings", name: "Bookings" },
                                { path: "/services", name: "Services" }
                            ].map((item) => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => 
                                        `${baseStyle} ${isActive ? activeStyle : ''}`
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default MobileHeader;