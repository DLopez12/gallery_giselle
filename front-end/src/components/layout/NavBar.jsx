import {NavLink, Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="fixed top-0 w-full bg-white shadow-md z-50 p-4">
            <div className="container mx-auto px-4 py-2 flex items-center">
                {/* Logo - use Link */}
                <h1 className="text-xl font-display mr-auto">GALLERY GISELLE</h1>
                <div className="flex space-x-4">
                    <NavLink
                        to="/homepage"
                        className={({ isActive }) =>
                            `py-2 border-b-2 transition-colors ${
                                isActive
                                    ? 'border-black text-black font-semibold'
                                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800'
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `py-2 border-b-2 transition-colors ${
                                isActive
                                    ? 'border-black text-black font-semibold'
                                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800'
                            }`
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/portfolio"
                        className={({ isActive }) =>
                            `py-2 border-b-2 transition-colors ${
                                isActive
                                    ? 'border-black text-black font-semibold'
                                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800'
                            }`
                        }
                    >
                        Portfolio
                    </NavLink>
                    <NavLink
                        to="/services"
                        className={({ isActive }) =>
                            `py-2 border-b-2 transition-colors ${
                                isActive
                                    ? 'border-black text-black font-semibold'
                                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800'
                            }`
                        }
                    >
                        Services
                    </NavLink>
                    
                    <NavLink
                        to="/bookings"
                        className={({ isActive }) =>
                            `py-2 border-b-2 transition-colors ${
                                isActive
                                    ? 'border-black text-black font-semibold'
                                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800'
                            }`
                        }
                    >
                        Bookings
                    </NavLink>
                    
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `py-2 border-b-2 transition-colors ${
                                isActive
                                    ? 'border-black text-black font-semibold'
                                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800'
                            }`
                        }
                    >
                        Contact
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;