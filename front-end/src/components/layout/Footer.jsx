const Footer = () => {
    return (
        <footer className="bg-[#f0e6d2] text-black py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">© {new Date().getFullYear()} GALLERY GISELLE. All rights reserved.</p>
                <p className="text-xs mt-2">Follow us on: 
                    <a href="https://twitter.com" className="text-blue-400 hover:underline ml-1">Twitter</a> | 
                    <a href="https://facebook.com" className="text-blue-400 hover:underline ml-1">Facebook</a> | 
                    <a href="https://instagram.com" className="text-blue-400 hover:underline ml-1">Instagram</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;