// import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Auth from '../utils/auth';

const Navbar = () => {
    const currentPage = useLocation().pathname;
    //const { user, setUser, isAuthenticated } = useAuth();
    const handleLogout = () => {
        Auth.logout();
    };

    if (currentPage === '/login') {
        return null;
    }

    if (currentPage === '/signup') {
        return null;
    }
    // const handleLogout = () => {
    //   logout();
    //   setUser(null);
    // };
    //const buttonStyles = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";
    //const loginButtonStyles = `${buttonStyles} bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white focus:ring-blue-500`;
    //const logoutButtonStyles = `${buttonStyles} bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white focus:ring-gray-500`;
    // TODO: Add necessary code to display the navigation bar and link between the pages
    // if (currentPage === '/Profile') {
    //   return null;
    // }
    // if (currentPage === '/AboutUs') {
    //   return null;
    // }
    return (
        <>
            <nav className="nav">
                <li className="nav-item">
                    <Link
                        to="/"

                        // This is a conditional (ternary) operator that checks to see if the current page is "Home"
                        // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
                        className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                    >
                        Home
                    </Link>
                </li>
                {Auth.loggedIn() ? (
                    <>
                        <li className="nav-item">
                            <Link

                                to="/Profile"
                                className={currentPage === '/Profile' ? 'nav-link active' : 'nav-link'}
                            >
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/AboutUs"
                                className={currentPage === '/AboutUs' ? 'nav-link active' : 'nav-link'}
                            >
                                AboutUs
                            </Link>
                        </li>
                        <li className="nav-item">
                            <span className="text-sm font-medium text-gray-600">
                            </span>
                            <button
                                onClick={handleLogout}
                                className={"log-in"}
                            >
                                Logout
                            </button>
                        </li>
                    </>) : (
                    <div className='nav'>
                        <li className="nav-item">
                            <Link
                                to="/login"
                                // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                                className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}
                            //className={loginButtonStyles}
                            >
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/signup"
                                // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                                className={currentPage === '/signup' ? 'nav-link active' : 'nav-link'}
                            //className={loginButtonStyles}
                            >
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>
        </>

    )
};

export default Navbar;
