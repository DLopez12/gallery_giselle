// src/components/layout/Header/MobileHeader.jsx
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const MobileHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // This component explicitly renders only if isMobile is true

    const activeStyle = "text-brand-primary font-semibold";
    const baseStyle = "text-lg font-medium text-gray-800 hover:text-brand-primary transition-colors duration-200";

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3
            }
        })
    };

    // Effect: Check and track viewport size to determine if this component should render
    useEffect(() => {
        const checkScreenSize = () => {
            // IMPORTANT: These breakpoints MUST match the logic in HeaderWrapper.jsx
            // and Layout.jsx. This component renders only when width is between 344px-882px.
            setIsMobile(window.innerWidth >= 344 && window.innerWidth <= 882);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Effect: Close menu when clicking outside (standard pattern for off-canvas menus)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isMenuOpen && !e.target.closest('.mobile-menu-container')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    // Conditional rendering: If not in the mobile range, this component returns null,
    // allowing NavBar to be rendered by HeaderWrapper.
    if (!isMobile) return null;

    return (
        // Fixed header container for mobile.
        // fixed top-0 left-0 right-0 z-50: Positions it to the top of the viewport.
        // bg-[#f0e6d2]: Sets the background color.
        // shadow-sm: Adds a subtle shadow.
        // mobile-menu-container: Class for click-outside detection.
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#f0e6d2] shadow-sm mobile-menu-container">
            {/* Navigation bar with logo and menu button.
                h-16: Sets a fixed height of 64px for the mobile header. */}
            <nav className="h-16 flex items-center justify-between px-4">
                {/* Logo link */}
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `h-10 w-32 rounded flex items-center justify-center ${
                        isActive ? 'border-b-2 border-brand-primary' : ''
                        }`
                    }
                >
                    GALLERY GISELLE
                </NavLink>

                {/* Hamburger menu button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(prev => !prev);
                    }}
                    className="bg-black p-2 focus:outline-none"
                    aria-label="Menu"
                >
                    {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                </button>

                {/* Mobile menu (off-canvas) animation wrapper */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            key="mobile-menu"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            // fixed inset-0: Covers the whole screen.
                            // bg-white: Background for the menu.
                            // mt-16: Pushes the menu content down, below the fixed header (h-16 = 64px).
                            // z-40: Stacks below the header but above other page content.
                            className="fixed inset-0 bg-white mt-16 z-40 p-6"
                        >
                            <nav className="max-w-175 flex flex-col space-y-6">
                                {[
                                    { path: "/", name: "Home" },
                                    { path: "/about", name: "About" },
                                    { path: "/portfolio", name: "Portfolio" },
                                    { path: "/services", name: "Services" },
                                    { path: "/bookings", name: "Bookings" },
                                    { path: "/contact", name: "Contact" }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.path}
                                        custom={index}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `${baseStyle} ${isActive ? activeStyle : ''}`
                                            }
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsMenuOpen(false);
                                            }}
                                        >
                                            {item.name}
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default MobileHeader;