// components/Navbar.tsx
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-gray-900"
                        >
                            HMS Website
                        </Link>
                    </div>

                    {/* Links */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
                        >
                            Home
                        </Link>
                        <Link
                            href="#about"
                            className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/signin"
                            className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
                        >
                            Sign Up
                        </Link>
                        <Link
                            href="/login"
                            className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Hamburger Menu (Mobile) */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            aria-expanded={isOpen}
                            aria-label="Toggle Navigation Menu"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-purple-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-purple-600"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    className={!isOpen ? 'block' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                                <path
                                    className={isOpen ? 'block' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link
                        href="/"
                        className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
                    >
                        Home
                    </Link>
                    <Link
                        href="#about"
                        className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
                    >
                        About Us
                    </Link>
                    <Link
                        href="/signin"
                        className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
                    >
                        Sign Up
                    </Link>
                    <Link
                        href="/login"
                        className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}
