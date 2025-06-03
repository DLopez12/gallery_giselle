// React Router import for accessible navigation components
// NavLink provides built-in aria-current when active
import { NavLink } from 'react-router-dom';

/**
 * Accessible navigation bar component
 * - Implements WAI-ARIA standards for navigation landmarks
 * - Includes proper keyboard navigation support
 * - Provides screen reader announcements
 */
const NavBar = () => {
    return (
        // Navigation landmark with aria-label for screen readers
        // fixed: ensures bar stays visible during scroll
        // top-0 w-full: positions at top of viewport
        // bg-white: high contrast background
        // z-50: ensures proper stacking context
        // p-4: sufficient touch target padding
        <nav 
            className="fixed bg-[#f0e6d2] h-[88px] top-0 w-full z-50 p-4 "
            aria-label="Main navigation"
        > 
            {/*
              * Inner container for responsive layout:
              * container: constrains width on large screens
              * mx-auto: centers the container
              * px-4 py-2: internal padding
              * flex items-center: centers items vertically
              */}
            <div className="container mx-auto px-4 py-2 flex items-center">
                
                {/*
                  * Site title/logo:
                  * text-xl: readable font size
                  * font-display: uses brand typeface
                  * mr-auto: creates space before nav links
                  * aria-hidden: decorative text doesn't need announcement
                  */}
                <h1 
                    className="text-xl font-display mr-auto"
                    aria-hidden="true"
                >
                    GALLERY GISELLE
                </h1>
                
                {/*
                  * Navigation links list (implicit <ul> via div):
                  * flex: creates horizontal layout
                  * space-x-1: maintains consistent spacing
                  * aria-label: describes link group purpose
                  */}
                <div 
                    className="flex space-x-1"
                    role="navigation"
                    aria-label="Primary menu"
                >
                    {/*
                      * Accessible link items (implicit <li> via direct mapping)
                      * Each has clear text label and hover/focus states
                      */}
                    {[
                        { path: "/", name: "Home", aria: "Go to homepage" },
                        { path: "/about", name: "About", aria: "Learn about us" },
                        { path: "/portfolio", name: "Portfolio", aria: "View our portfolio" },
                        { path: "/services", name: "Services", aria: "See our services" },
                        { path: "/bookings", name: "Bookings", aria: "Book a session" },
                        { path: "/contact", name: "Contact", aria: "Contact us" }
                    ].map((item) => (
                        // Accessible navigation link
                        <NavLink
                            key={item.path} // Unique identifier for React
                            to={item.path} // Destination route
                            className={({ isActive }) =>
                                `relative py-2 px-3 transition-all duration-300 ${
                                    isActive
                                        ? // Active state styles
                                          'text-black font-medium ' +
                                          'after:absolute after:bottom-0 after:left-0 ' +
                                          'after:h-0.5 after:w-full after:bg-black ' +
                                          'after:transition-all after:duration-300 ' +
                                          'aria-current="page"' // Accessibility indicator
                                        : // Inactive state styles
                                          'text-gray-600 hover:text-gray-800 hover:bg-gray-100 ' +
                                          'after:absolute after:bottom-0 after:left-0 ' +
                                          'after:h-0.5 after:w-0 after:bg-gray-300 ' +
                                          'hover:after:w-full ' +
                                          'after:transition-all after:duration-300'
                                }`
                            }
                            aria-label={item.aria} // Detailed action description
                            tabIndex="0" // Ensure keyboard focusability
                            role="link" // Explicit role declaration
                        >
                            {item.name} {/* Visible link text */}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default NavBar;