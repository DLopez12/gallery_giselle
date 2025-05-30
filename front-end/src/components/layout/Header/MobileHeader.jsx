import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const MobileHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const activeStyle = "text-brand=primary font-semibold";
    const baseStyle = "text-lg font-medium text-gray-800 hover:text-brand-primary transition-colors duration-200";

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
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
                    className="p-2 focus:outline-none"
                    aria-label="Menu"
                >
                    {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                </button>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-white mt-16 z-40 p-6">
                        <nav className="flex flex-col space-y-4">
                            <NavLink 
                                to="/Portfolio"
                                className={({ isActive }) => 
                                `${baseStyle} ${isActive ? activeStyle : ''}`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Portfolio
                            </NavLink>
                            <NavLink 
                                to="/home"
                                className={({ isActive }) => 
                                `${baseStyle} ${isActive ? activeStyle : ''}`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                to="/about"
                                className={({ isActive }) => 
                                `${baseStyle} ${isActive ? activeStyle : ''}`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </NavLink>
                            <NavLink 
                                to="/contact"
                                className={({ isActive }) => 
                                `${baseStyle} ${isActive ? activeStyle : ''}`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </NavLink>
                            <NavLink 
                                to="/bookings"
                                className={({ isActive }) => 
                                `${baseStyle} ${isActive ? activeStyle : ''}`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Bookings
                            </NavLink>
                            <NavLink 
                                to="/services"
                                className={({ isActive }) => 
                                `${baseStyle} ${isActive ? activeStyle : ''}`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Services
                            </NavLink>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default MobileHeader;