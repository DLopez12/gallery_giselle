// src/components/layout/Header/NavBar.jsx
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        // Navigation landmark for accessibility.
        // fixed: Positions the navbar relative to the viewport, keeping it visible on scroll.
        // top-0 w-full: Anchors it to the top and spans full width.
        // bg-[#f0e6d2]: Sets the background color.
        // z-50: Ensures it stacks above most other content.
        // p-4: Adds padding around the navbar content (16px top, right, bottom, left).
        <nav
            className="fixed bg-[#f0e6d2] top-0 w-full z-50 p-4"
            aria-label="Main navigation"
        >
            <div className="container mx-auto px-4 py-2 flex items-center">

                {/* Site title/logo */}
                <h1
                    className="text-xl font-display mr-auto"
                    aria-hidden="true" // Decorative text, not essential for screen readers
                >
                    GALLERY GISELLE
                </h1>

                {/* Navigation links list */}
                <div
                    className="flex space-x-1"
                    role="navigation" // Explicit role for accessibility
                    aria-label="Primary menu"
                >
                    {[
                        { path: "/", name: "Home", aria: "Go to homepage" },
                        { path: "/about", name: "About", aria: "Learn about us" },
                        { path: "/portfolio", name: "Portfolio", aria: "View our portfolio" },
                        { path: "/services", name: "Services", aria: "See our services" },
                        { path: "/bookings", name: "Bookings", aria: "Book a session" },
                        { path: "/contact", name: "Contact", aria: "Contact us" }
                    ].map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `relative py-2 px-3 transition-all duration-300 ${
                                    isActive
                                        ? // Active state styles: black text, full underline
                                          'text-black font-medium after:absolute after:bottom-0 after:left-0 ' +
                                          'after:h-0.5 after:w-full after:bg-black after:transition-all after:duration-300 ' +
                                          'aria-current="page"' // Accessibility indicator for active link
                                        : // Inactive state styles: gray text, hover background, hover underline
                                          'text-gray-600 hover:text-gray-800 hover:bg-gray-100 ' +
                                          'after:absolute after:bottom-0 after:left-0 ' +
                                          'after:h-0.5 after:w-0 after:bg-gray-300 hover:after:w-full ' +
                                          'after:transition-all after:duration-300'
                                }`
                            }
                            aria-label={item.aria} // Detailed action description for screen readers
                            tabIndex="0" // Ensures keyboard focusability
                            role="link" // Explicit role declaration
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;