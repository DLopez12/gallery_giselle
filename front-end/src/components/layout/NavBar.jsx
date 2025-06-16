// src/components/layout/Header/NavBar.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    // --- Navigation Items Data Structure ---
    // This array defines all the main navigation items, including those that are dropdowns.
    // Each item has a 'path', 'name', and 'aria' label.
    // Dropdown items also have 'isDropdown: true' and a 'subItems' array.
    const navItems = [
        { path: "/", name: "Home", aria: "Go to homepage" },
        { path: "/about", name: "About", aria: "Learn about us" },
        {
            name: "Portfolio",
            isDropdown: true,
            mainPath: "/portfolio",
            aria: "View our portfolio options",
            subItems: [
                { path: "/portfolio/couples", name: "Couples", aria: "View couples portfolio" },
                { path: "/portfolio/graduates", name: "Graduates", aria: "View graduates portfolio" },
                { path: "/portfolio/weddings-elopements", name: "Weddings & Elopements", aria: "View wedding and elopement portfolio" }
            ]
        },
        {
            name: "Services", // This is a dropdown trigger
            isDropdown: true,
            mainPath: "/services",
            aria: "Explore our photography services",
            subItems: [
                // Link to the main "All Services" page
                { path: "/services", name: "All Services", aria: "View all photography services" },
                // Categorized services, linking to dynamic routes
                { path: "/services/family-portraits", name: "Family Portraits", aria: "Explore family portrait services" },
                { path: "/services/grad-photos", name: "Grad Photos", aria: "Explore graduation photo services" },
                { path: "/services/portraits", name: "Portraits", aria: "Explore individual portrait services" },
                { path: "/services/events-parties", name: "Events & Parties", aria: "Explore event and party photography services" }
            ]
        },
        { path: "/bookings", name: "Bookings", aria: "Book a session" },
        { path: "/contact", name: "Contact", aria: "Contact us" }
    ];

    // --- State Management for Dropdowns and Accessibility ---
    // 'openDropdown' tracks the name of the currently open dropdown ('null' if none are open).
    const [openDropdown, setOpenDropdown] = useState(null);
    // 'dropdownRefs' stores references to the main navigation <li> elements for click-outside detection.
    const dropdownRefs = useRef([]);
    // 'timeoutRef' stores the ID for a setTimeout, used to delay dropdown closing on mouse leave.
    const timeoutRef = useRef(null);
    // 'subItemRefs' stores references to individual dropdown sub-items for keyboard navigation focus.
    const subItemRefs = useRef({});
    // 'triggerRefs' stores references to the main dropdown trigger buttons for returning focus.
    const triggerRefs = useRef({});

    // 'focusedItemIndex' manages the currently focused item for keyboard navigation within an open dropdown.
    const [focusedItemIndex, setFocusedItemIndex] = useState(-1);

    // --- Effect Hook for Closing Dropdowns on Click Outside ---
    // This effect runs whenever 'openDropdown' changes. It adds/removes a mousedown listener
    // to detect clicks outside of any open dropdown, then closes it.
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Checks if a dropdown is open and if the click target is outside any dropdown element.
            if (openDropdown !== null && !dropdownRefs.current.some(ref => ref && ref.contains(event.target))) {
                setOpenDropdown(null);
                setFocusedItemIndex(-1); // Reset focus when dropdown closes
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        // Cleanup function: removes the event listener when the component unmounts or effect re-runs.
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openDropdown]); // Dependency array: re-run effect if 'openDropdown' changes

    // --- Mouse Event Handlers for Dropdown Opening/Closing ---
    // Handles mouse entering a dropdown trigger area. Clears any pending close and opens the dropdown.
    const handleMouseEnter = (itemName) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Clear any pending close timeout
        }
        setOpenDropdown(itemName); // Open the hovered dropdown
        setFocusedItemIndex(-1); // Reset focus when opening via mouse
    };

    // Handles mouse leaving a dropdown trigger area. Sets a timeout to close the dropdown.
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
            setFocusedItemIndex(-1); // Reset focus when dropdown closes
        }, 150); // 150ms delay before closing
    };

    // --- Click Handler for Dropdown Toggling (for keyboard/mobile activation) ---
    const handleClick = (itemName) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Clear any pending close timeout
        }
        const isOpen = openDropdown === itemName;
        setOpenDropdown(isOpen ? null : itemName); // Toggle dropdown open/close state
        setFocusedItemIndex(isOpen ? -1 : 0); // Set focus to first item if opening, else reset
    };

    // --- Keyboard Navigation Handler for Accessibility ---
    // Manages keyboard interactions (ArrowDown, ArrowUp, Escape, Enter, Space) for dropdown navigation.
    const handleKeyDown = useCallback((event, item, index) => {
        if (!item.isDropdown) return; // Only apply to dropdown items

        const subItems = item.subItems;
        if (!subItems || subItems.length === 0) return; // No sub-items to navigate

        if (event.key === 'ArrowDown') {
            event.preventDefault(); // Prevent default browser scroll
            if (openDropdown !== item.name) {
                setOpenDropdown(item.name); // Open dropdown if currently closed
                setFocusedItemIndex(0); // Focus on the first sub-item
            } else {
                const nextIndex = (focusedItemIndex + 1) % subItems.length;
                setFocusedItemIndex(nextIndex); // Move focus to the next sub-item
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault(); // Prevent default browser scroll
            if (openDropdown === item.name) {
                const prevIndex = (focusedItemIndex - 1 + subItems.length) % subItems.length;
                setFocusedItemIndex(prevIndex); // Move focus to the previous sub-item
            }
        } else if (event.key === 'Escape') {
            event.preventDefault(); // Prevent default Escape behavior
            setOpenDropdown(null); // Close the dropdown
            setFocusedItemIndex(-1); // Reset focus index
            if (triggerRefs.current[item.name]) {
                triggerRefs.current[item.name].focus(); // Return focus to the dropdown trigger button
            }
        } else if (event.key === 'Enter' || event.key === ' ') {
            // If dropdown is not open OR no item is focused, toggle the dropdown
            if (!openDropdown || focusedItemIndex === -1) {
                event.preventDefault(); // Prevent default behavior (e.g., submitting a form)
                handleClick(item.name); // Toggle dropdown state
            }
        }
    }, [openDropdown, focusedItemIndex]); // Dependencies for useCallback

    // --- Effect Hook for Managing Focus within Open Dropdown ---
    // Sets focus to the currently focused sub-item when dropdown state or focused index changes.
    useEffect(() => {
        if (openDropdown !== null && focusedItemIndex !== -1) {
            const focusedElement = subItemRefs.current[`${openDropdown}-${focusedItemIndex}`];
            if (focusedElement) {
                focusedElement.focus(); // Apply focus to the DOM element
            }
        }
    }, [openDropdown, focusedItemIndex]); // Dependencies: re-run if dropdown or focused index changes

    // --- Main Navigation Bar Render ---
    return (
        <nav
            className="fixed flex p-8 mx-auto bg-(--gallery-cream) top-0 w-full z-50 "
            aria-label="Main navigation"
        >
            {/* Site Logo/Home Link */}
                <NavLink to="/" aria-label="Go to homepage" className="mr-auto">
                    <img
                        src="/images/nav_title.png"
                        alt="Site logo"
                        className="h-12 w-auto"
                    />
                </NavLink>

                {/* Primary Navigation Menu Container */}
                <div
                    className="flex space-x-1 items-center"
                    role="navigation"
                    aria-label="Primary menu"
                >
                    <ul className="flex space-x-1 items-center list-none p-0 m-0">
                        {navItems.map((item, index) => (
                            <li
                                key={item.name}
                                ref={el => dropdownRefs.current[index] = el}
                                className="text-xl relative" // `relative` is needed for `::after` positioning
                                onMouseEnter={item.isDropdown ? () => handleMouseEnter(item.name) : undefined}
                                onMouseLeave={item.isDropdown ? handleMouseLeave : undefined}
                            >
                                {/* Conditional Rendering: If item is a dropdown, render a button; otherwise, render a NavLink */}
                                {item.isDropdown && item.mainPath ? (
                                    // --- Dropdown Trigger Button (e.g., "Portfolio", "Services") ---
                                    <NavLink
                                        to={item.mainPath}
                                        ref={el => triggerRefs.current[item.name] = el}
                                        onClick={(e) =>{
                                            // handle cases where the NavLink is clicked as a primary button for dropdown toggle
                                            // and also to naviagate directly.
                                            // if the dropdown is open, a click on the main NavLink should close it and navigate 
                                            if (openDropdown === item.name) {
                                                setOpenDropdown(null);
                                                setFocusedItemIndex(-1);
                                            }
                                            // Allow default NavLink behavior (navigation)
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, item, index)}
                                        className={({ isActive }) =>
                                            `relative py-2 px-3 transition-all duration-300 flex items-center gap-1
                                            ${isActive || openDropdown === item.name
                                                ? 'text-black font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-(--gallery-tan) after:transition-all after:duration-300'
                                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-(--gallery-tan) hover:after:w-full after:transition-all after:duration-300'
                                            }`
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={openDropdown === item.name}
                                        aria-label={item.aria}
                                        tabIndex="0"
                                        role="link" // Still acts as a link, but also triggers dropdown
                                    >
                                        {item.name}
                                        <svg
                                            className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="https://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d=" M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </NavLink>
                                ) : item.isDropdown ? (
                                    <button
                                        ref={el => triggerRefs.current[item.name] = el}
                                        onClick={() => handleClick(item.name)}
                                        onKeyDown={(e) => handleKeyDown(e, item, index)}
                                        className={`relative py-2 px-3 transition-all duration-300 flex items-center gap-1
                                            ${openDropdown === item.name
                                                // Classes for when the dropdown is OPEN/ACTIVE:
                                                ? 'text-black font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-(--gallery-tan) after:transition-all after:duration-300'
                                                // Classes for default state AND hover state:
                                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-(--gallery-tan) hover:after:w-full after:transition-all after:duration-300'
                                            }
                                        `}
                                        aria-haspopup="true" // Indicates this is a dropdown trigger
                                        aria-expanded={openDropdown === item.name} // Accessibility: true if dropdown is open
                                        aria-label={item.aria}
                                        tabIndex="0"
                                        role="button"
                                    >
                                        {item.name}
                                        {/* Dropdown Arrow SVG Icon */}
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
                                )   : (
                                    // --- Regular Navigation Link (Non-Dropdown, e.g., "Home", "About", "Contact") ---
                                    // These links navigate directly to a page.
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `relative h-10 px-3 flex items-center transition-all duration-300 ${ // `relative` is here
                                                isActive
                                                    ? 'text-black font-medium after:absolute after:bottom-0 after:left-0 ' +
                                                      'after:h-0.5 after:w-full after:bg-(--gallery-tan) after:transition-all after:duration-300 ' +
                                                      'aria-current="page"' // Accessibility: indicates current page
                                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 ' +
                                                      'after:absolute after:bottom-0 after:left-0 ' +
                                                      'after:h-0.5 after:w-0 after:bg-(--gallery-tan) hover:after:w-full ' +
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

                                {/* --- Dropdown Menu Container (visible only when item.isDropdown is true and dropdown is open) --- */}
                                {item.isDropdown && openDropdown === item.name && (
                                    <ul
                                        className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10
                                                   origin-top-left animate-fade-in-scale list-none p-0 m-0"
                                        role="menu" // Accessibility role for a menu
                                        aria-orientation="vertical" // Accessibility: indicates vertical orientation
                                        onKeyDown={(e) => handleKeyDown(e, item, index)} // Handles keyboard navigation within the dropdown
                                        tabIndex="-1" // Allows the ul itself to be focusable for keyboard navigation
                                    >
                                        {item.subItems.map((subItem, subIndex) => (
                                            <li key={subItem.path}>
                                                {/* --- Dropdown Sub-Item NavLink --- */}
                                                {/* These are the individual links within the dropdown (e.g., "Couples", "Graduates") */}
                                                <NavLink
                                                    ref={el => subItemRefs.current[`${item.name}-${subIndex}`] = el}
                                                    to={subItem.path}
                                                    className={({ isActive }) =>
                                                        `block py-2 px-4 text-sm transition-all duration-200 ${
                                                            isActive
                                                                ? 'text-black font-medium bg-gray-100' // Active state for sub-item (with background highlight)
                                                                : 'text-gray-700 hover:bg-gray-100 hover:text-black' // Default/Hover state
                                                        } rounded-md mx-1 my-0.5`
                                                    }
                                                    role="menuitem" // Accessibility role for a menu item
                                                    aria-label={subItem.aria}
                                                    onClick={() => setOpenDropdown(null)} // Closes dropdown when a sub-item is clicked
                                                    tabIndex={focusedItemIndex === subIndex ? "0" : "-1"} // Manage focus for keyboard navigation
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
        </nav>
    );
};

export default NavBar;