import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = () => {
    return (
        <nav className="bg-[#36311F] p-2">
            <div className="mx-auto flex items-center justify-between">
                <div>
                    <Link to="/" className="ml-6 text-white text-lg font-bold">Home</Link>
                </div>
                <SearchBar />
                <div className="flex space-x-7">
                    <Link to="/stores" className="mr-3 text-white hover:underline">Stores</Link>
                    <Link to="/user/login" className="mr-3 text-white hover:underline">User Login</Link>
                    <Link to="/login" className="mr-3 text-white hover:underline">Store Login</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;