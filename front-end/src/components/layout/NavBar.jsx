import React, { useState } from 'react';
import logo from "../images/tgc_logo.png";
import { Link } from 'react-router-dom';
import '../styles/components/navigation.css';
import '../styles/global.css';

const Navbar = () => {
    const [query, setQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', query);
        // ADD LOGIC FOR HANDLING SEARCH RESULTS
    };

    return (
        <header className="nav-header">
            <div className="nav-container">
                <div className="logo">
                    <Link to='/Home'>
                        <img src={logo} alt="Tomcat Gin Club logo"  />
                    </Link>
                </div>
        <nav className="nav-menu">
            <div className="dropdown">
                <Link to='/Cocktails' className="dropbtn">Cocktails</Link>
                <div className="dropdown-content">
                    <a href="#">Classic Cocktails</a>
                    <a href="#">Modern Classics</a>
                    <a href="#">Bartender Specials</a>
                </div>
            </div>
            <div className="dropdown">
            <Link to='/Spirits' className="dropbtn">Spirits</Link>
                <div className="dropdown-content">
                    <a href="#">Whiskey</a>
                    <a href="#">Tequila</a>
                    <a href="#">Mezcal</a>
                    <a href="#">Rum</a>
                    <a href="#">Gin</a>
                    <a href="#">Vodka</a>
                    <Link to='/Liqueurs'>Liqueurs & More</Link> 
                </div>
            </div>
            {/* <div className="dropdown">
            <Link to='/Community' className="dropbtn">Community</Link>                
                <div className="dropdown-content">
                    <a href="#">Learning</a>
                    <a href="#">Bartender Friends</a>
                    <a href="#">Forums</a>
                </div>
            </div> */}
            {/* <div className="dropdown">
            <Link to='/Resources' className="dropbtn">Resources</Link>                
            <div className="dropdown-content">
                    <a href="#">Mental Health Resources</a>
                    <a href="#">Substance Abuse Support</a>
                    <a href="#">Industy Financial Assitance</a>
                </div>
            </div> */}
            <Link to='/About' className="dropbtn">About</Link>
            {/* <Link to='/Contact'>Contact</Link> */}

            <button className='search_icon' onClick={() => setShowSearch(!showSearch)}>
                <i className="fas fa-search"></i>
            </button>
        </nav>
    </div>
    {showSearch && (
        <div className='search_modal'>
            <input type='text' className='search_input' placeholder='Search the site...' />
            <button className='close_search' onClick={() => setShowSearch(false)}>X</button>
        </div>
    )}
        </header>
    );
}

export default Navbar;