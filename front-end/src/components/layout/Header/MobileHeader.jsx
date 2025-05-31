// React core imports
import { useState, useEffect } from 'react'; // State and lifecycle management
import { NavLink } from 'react-router-dom'; // Navigation with active state tracking

// Component libraries
import { FiMenu, FiX } from 'react-icons/fi'; // Menu icons from Feather Icons
import { motion, AnimatePresence } from 'framer-motion'; // Animation library

const MobileHeader = () => {
    // State management for menu toggle and responsive detection
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Controls mobile menu visibility
    const [isMobile, setIsMobile] = useState(false); // Tracks if in mobile viewport range

    // CSS classes for navigation links
    const activeStyle = "text-brand-primary font-semibold"; // Active link styling
    const baseStyle = "text-lg font-medium text-gray-800 hover:text-brand-primary transition-colors duration-200"; // Base link styling

    // Animation variants for menu items (stagger effect)
    const itemVariants = {
        hidden: { opacity: 0, y: -10 }, // Initial hidden state
        visible: (i) => ({ // Animated visible state with delay based on index
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05, // Stagger delay (5% per item)
                duration: 0.3 // Animation duration
            }
        })
    };

    // Effect: Check and track viewport size
    useEffect(() => {
        const checkScreenSize = () => {
            // Set isMobile state if width is between 344px-882px
            setIsMobile(window.innerWidth >= 344 && window.innerWidth <= 882);
        };
        
        // Initial check on mount
        checkScreenSize();
        // Add resize listener for dynamic changes
        window.addEventListener('resize', checkScreenSize);
        
        // Cleanup: Remove listener on unmount
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []); // Empty dependency array = runs once on mount

    // Effect: Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            // Close menu if click is outside mobile-menu-container
            if (isMenuOpen && !e.target.closest('.mobile-menu-container')) {
                setIsMenuOpen(false);
            }
        };

        // Add click listener when menu is open
        document.addEventListener('mousedown', handleClickOutside);
        
        // Cleanup: Remove listener when menu closes or component unmounts
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]); // Re-run when isMenuOpen changes

    // Don't render if not in mobile range
    if (!isMobile) return null;

    return (
        // Fixed header container
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm mobile-menu-container">
            {/* Navigation bar with logo and menu button */}
            <nav className="h-16 flex items-center justify-between px-4">
                {/* Logo link to homepage */}
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
                        e.stopPropagation(); // Prevent event bubbling
                        setIsMenuOpen(prev => !prev); // Toggle menu state
                    }}
                    className="bg-black p-2 focus:outline-none" // Styling
                    aria-label="Menu" // Accessibility
                >
                    {/* Toggle between menu and close icon */}
                    {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                </button>

                {/* Animation wrapper for mobile menu */}
                <AnimatePresence>
                    {/* Only render when menu is open */}
                    {isMenuOpen && (
                        <motion.div
                            key="mobile-menu" // Unique key for animation
                            initial={{ opacity: 0, y: -10 }} // Start state
                            animate={{ opacity: 1, y: 0 }} // Animate in
                            exit={{ opacity: 0, y: -10 }} // Animate out
                            transition={{ duration: 0.3, ease: 'easeOut' }} // Animation config
                            className="fixed inset-0 bg-white mt-16 z-40 p-6" // Styling
                        >
                            {/* Menu items container */}
                            <nav className="max-w-175 flex flex-col space-y-6">
                                {[
                                    { path: "/", name: "Home" },
                                    { path: "/about", name: "About" },
                                    { path: "/portfolio", name: "Portfolio" },
                                    { path: "/services", name: "Services" },
                                    { path: "/bookings", name: "Bookings" },
                                    { path: "/contact", name: "Contact" }
                                ].map((item, index) => (
                                    // Animated menu item wrapper
                                    <motion.div
                                        key={item.path} // Unique key
                                        custom={index} // Pass index for stagger
                                        variants={itemVariants} // Animation variants
                                        initial="hidden" // Initial state
                                        animate="visible" // Animated state
                                    >
                                        {/* Actual navigation link */}
                                        <NavLink 
                                            to={item.path}
                                            className={({ isActive }) => 
                                                `${baseStyle} ${isActive ? activeStyle : ''}`
                                            }
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent event bubbling
                                                setIsMenuOpen(false); // Close menu on click
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