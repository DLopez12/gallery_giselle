import React, { useState, useRef, useEffect, useCallback } from 'react'; // Import useCallback
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    const navItems = [
        { path: "/", name: "Home", aria: "Go to homepage" },
        { path: "/about", name: "About", aria: "Learn about us" },
        {
            name: "Portfolio",
            isDropdown: true,
            aria: "View our portfolio options",
            subItems: [
                { path: "/portfolio/couples", name: "Couples", aria: "View couples portfolio" },
                { path: "/portfolio/graduates", name: "Graduates", aria: "View graduates portfolio" },
                { path: "/portfolio/weddings-elopements", name: "Weddings & Elopements", aria: "View wedding and elopement portfolio" }
            ]
        },
        { path: "/services", name: "Services", aria: "See our services" },
        { path: "/bookings", name: "Bookings", aria: "Book a session" },
        { path: "/contact", name: "Contact", aria: "Contact us" }
    ];

    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef([]);
    const timeoutRef = useRef(null);
    const subItemRefs = useRef({}); // Ref to hold references to sub-menu NavLinks
    const triggerRefs = useRef({}); // Ref to hold references to dropdown trigger buttons

    // Focus management for dropdown items
    const [focusedItemIndex, setFocusedItemIndex] = useState(-1);

    // Effect to handle clicks outside the dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropdown !== null && !dropdownRefs.current.some(ref => ref && ref.contains(event.target))) {
                setOpenDropdown(null);
                setFocusedItemIndex(-1); // Reset focus index
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openDropdown]);

    const handleMouseEnter = (itemName) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setOpenDropdown(itemName);
        setFocusedItemIndex(-1); // Reset focus when opening via mouse
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
            setFocusedItemIndex(-1); // Reset focus when closing via mouse
        }, 150);
    };

    const handleClick = (itemName) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        const isOpen = openDropdown === itemName;
        setOpenDropdown(isOpen ? null : itemName);
        setFocusedItemIndex(isOpen ? -1 : 0); // Focus first item if opening, reset if closing
    };

    // Keyboard navigation for dropdown
    const handleKeyDown = useCallback((event, item, index) => {
        if (!item.isDropdown) return; // Only apply to dropdown triggers

        const subItems = item.subItems;
        if (!subItems || subItems.length === 0) return;

        if (event.key === 'ArrowDown') {
            event.preventDefault(); // Prevent page scroll
            if (openDropdown !== item.name) {
                // If dropdown is closed, open it and focus the first item
                setOpenDropdown(item.name);
                setFocusedItemIndex(0);
            } else {
                // Move focus to next item
                const nextIndex = (focusedItemIndex + 1) % subItems.length;
                setFocusedItemIndex(nextIndex);
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault(); // Prevent page scroll
            if (openDropdown === item.name) {
                // Move focus to previous item
                const prevIndex = (focusedItemIndex - 1 + subItems.length) % subItems.length;
                setFocusedItemIndex(prevIndex);
            }
        } else if (event.key === 'Escape') {
            event.preventDefault();
            setOpenDropdown(null);
            setFocusedItemIndex(-1);
            // Return focus to the trigger button
            if (triggerRefs.current[item.name]) {
                triggerRefs.current[item.name].focus();
            }
        } else if (event.key === 'Enter' || event.key === ' ') {
            // For buttons, Enter/Space triggers the click, which handles open/close
            // For menu items, this would navigate. NavLink handles Enter.
            // No explicit action needed here unless you want to prevent default for spaces on menu items.
        }
    }, [openDropdown, focusedItemIndex]);

    // Effect to manage programmatic focus for dropdown sub-items
    useEffect(() => {
        if (openDropdown !== null && focusedItemIndex !== -1) {
            const focusedElement = subItemRefs.current[`${openDropdown}-${focusedItemIndex}`];
            if (focusedElement) {
                focusedElement.focus();
            }
        }
    }, [openDropdown, focusedItemIndex]);


    return (
        <nav
            className="fixed bg-[#f0e6d2] top-0 w-full z-50 p-4"
            aria-label="Main navigation"
        >
            <div className="container mx-auto px-4 py-2 flex items-center">

                {/* Site title/logo */}
                <NavLink to="/" aria-label="Go to homepage" className="mr-auto">
                    <img
                        src="/images/nav_title.png"
                        alt="Site logo"
                        className="h-12 w-auto"
                    />
                </NavLink>
                
                {/* Navigation links list */}
                <div
                    className="flex space-x-1 items-center"
                    role="navigation"
                    aria-label="Primary menu"
                >
                    {/* Use <ul> for the main navigation list */}
                    <ul className="flex space-x-1 items-center list-none p-0 m-0">
                        {navItems.map((item, index) => (
                            // Each nav item is an <li>
                            <li
                                key={item.name}
                                ref={el => dropdownRefs.current[index] = el}
                                className="relative"
                                onMouseEnter={item.isDropdown ? () => handleMouseEnter(item.name) : undefined}
                                onMouseLeave={item.isDropdown ? handleMouseLeave : undefined}
                            >
                                {item.isDropdown ? (
                                    // Dropdown Trigger (Button)
                                    <button
                                        ref={el => triggerRefs.current[item.name] = el} // Store ref for focus management
                                        onClick={() => handleClick(item.name)}
                                        onKeyDown={(e) => handleKeyDown(e, item, index)} // Add keyboard handler
                                        className={`relative py-2 px-3 transition-all duration-300 flex items-center gap-1
                                            ${openDropdown === item.name
                                                ? 'text-black font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-black after:transition-all after:duration-300'
                                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gray-300 hover:after:w-full after:transition-all after:duration-300'
                                            }
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md
                                        `}
                                        aria-haspopup="true"
                                        aria-expanded={openDropdown === item.name}
                                        aria-label={item.aria}
                                        tabIndex="0"
                                        role="button"
                                    >
                                        {item.name}
                                        {/* Dropdown arrow icon (ChevronDown) */}
                                        <svg
                                            className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                ) : (
                                    // Regular NavLink
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `relative py-2 px-3 transition-all duration-300 ${
                                                isActive
                                                    ? 'text-black font-medium after:absolute after:bottom-0 after:left-0 ' +
                                                      'after:h-0.5 after:w-full after:bg-black after:transition-all after:duration-300 ' +
                                                      'aria-current="page"'
                                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 ' +
                                                      'after:absolute after:bottom-0 after:left-0 ' +
                                                      'after:h-0.5 after:w-0 after:bg-gray-300 hover:after:w-full ' +
                                                      'after:transition-all after:duration-300'
                                                }`
                                        }
                                        aria-label={item.aria}
                                        tabIndex="0"
                                        role="link"
                                    >
                                        {item.name}
                                    </NavLink>
                                )}

                                {/* Dropdown Content */}
                                {item.isDropdown && openDropdown === item.name && (
                                    // Use <ul> for the dropdown menu
                                    <ul
                                        className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10
                                                   origin-top-left animate-fade-in-scale list-none p-0 m-0"
                                        role="menu"
                                        aria-orientation="vertical"
                                        // Add keydown handler to the menu itself for arrow navigation within
                                        onKeyDown={(e) => handleKeyDown(e, item, index)}
                                        tabIndex="-1" // Make menu focusable programmatically if needed (though focus shifts to items)
                                    >
                                        {item.subItems.map((subItem, subIndex) => (
                                            // Each sub-item is an <li> with a NavLink
                                            <li key={subItem.path}>
                                                <NavLink
                                                    ref={el => subItemRefs.current[`${item.name}-${subIndex}`] = el} // Store ref for programmatic focus
                                                    to={subItem.path}
                                                    className={({ isActive }) =>
                                                        `block py-2 px-4 text-sm transition-all duration-200 ${
                                                            isActive
                                                                ? 'text-black font-medium bg-gray-100'
                                                                : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                                                        } rounded-md mx-1 my-0.5`
                                                    }
                                                    role="menuitem"
                                                    aria-label={subItem.aria}
                                                    onClick={() => setOpenDropdown(null)} // Close dropdown on click of a sub-item
                                                    tabIndex={focusedItemIndex === subIndex ? "0" : "-1"} // Make currently focused item focusable
                                                >
                                                    {subItem.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
