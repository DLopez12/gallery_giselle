import {NavLink, Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo - use Link */}
            </div>
            <div className="hidden md:flex space-x-0">
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
            </div>
        </nav>
    )
}

export default NavBar;