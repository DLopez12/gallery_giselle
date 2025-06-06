// src/components/layout/Header/NavBar.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

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
        {
            name: "Services", // Now a dropdown trigger
            isDropdown: true,
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

    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef([]);
    const timeoutRef = useRef(null);
    const subItemRefs = useRef({});
    const triggerRefs = useRef({});

    const [focusedItemIndex, setFocusedItemIndex] = useState(-1);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropdown !== null && !dropdownRefs.current.some(ref => ref && ref.contains(event.target))) {
                setOpenDropdown(null);
                setFocusedItemIndex(-1);
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
        setFocusedItemIndex(-1);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
            setFocusedItemIndex(-1);
        }, 150);
    };

    const handleClick = (itemName) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        const isOpen = openDropdown === itemName;
        setOpenDropdown(isOpen ? null : itemName);
        setFocusedItemIndex(isOpen ? -1 : 0);
    };

    const handleKeyDown = useCallback((event, item, index) => {
        if (!item.isDropdown) return;

        const subItems = item.subItems;
        if (!subItems || subItems.length === 0) return;

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (openDropdown !== item.name) {
                setOpenDropdown(item.name);
                setFocusedItemIndex(0);
            } else {
                const nextIndex = (focusedItemIndex + 1) % subItems.length;
                setFocusedItemIndex(nextIndex);
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (openDropdown === item.name) {
                const prevIndex = (focusedItemIndex - 1 + subItems.length) % subItems.length;
                setFocusedItemIndex(prevIndex);
            }
        } else if (event.key === 'Escape') {
            event.preventDefault();
            setOpenDropdown(null);
            setFocusedItemIndex(-1);
            if (triggerRefs.current[item.name]) {
                triggerRefs.current[item.name].focus();
            }
        } else if (event.key === 'Enter' || event.key === ' ') {
            if (!openDropdown || focusedItemIndex === -1) {
                event.preventDefault();
                handleClick(item.name);
            }
        }
    }, [openDropdown, focusedItemIndex]);

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
                <NavLink to="/" aria-label="Go to homepage" className="mr-auto">
                    <img
                        src="/images/nav_title.png"
                        alt="Site logo"
                        className="h-12 w-auto"
                    />
                </NavLink>

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
                                className="relative"
                                onMouseEnter={item.isDropdown ? () => handleMouseEnter(item.name) : undefined}
                                onMouseLeave={item.isDropdown ? handleMouseLeave : undefined}
                            >
                                {item.isDropdown ? (
                                    <button
                                        ref={el => triggerRefs.current[item.name] = el}
                                        onClick={() => handleClick(item.name)}
                                        onKeyDown={(e) => handleKeyDown(e, item, index)}
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

                                {item.isDropdown && openDropdown === item.name && (
                                    <ul
                                        className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10
                                                   origin-top-left animate-fade-in-scale list-none p-0 m-0"
                                        role="menu"
                                        aria-orientation="vertical"
                                        onKeyDown={(e) => handleKeyDown(e, item, index)}
                                        tabIndex="-1"
                                    >
                                        {item.subItems.map((subItem, subIndex) => (
                                            <li key={subItem.path}>
                                                <NavLink
                                                    ref={el => subItemRefs.current[`${item.name}-${subIndex}`] = el}
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
                                                    onClick={() => setOpenDropdown(null)}
                                                    tabIndex={focusedItemIndex === subIndex ? "0" : "-1"}
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
