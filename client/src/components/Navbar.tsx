// import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';
import LookoverthereLogo1 from '../assets/LookoverthereLogo1.jpg'; // Import the logo

const Navbar = () => {
    const currentPage = useLocation().pathname;
    const handleLogout = () => {
        Auth.logout();
    };

    if (currentPage === '/login' || currentPage === '/signup') {
        return null;
    }

    return (
        <>
            <nav className="nav">
                <Link to="/">
                    <img src={LookoverthereLogo1} alt="LookHere!!!" className="nav-logo" />
                </Link>
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link
                            to="/"
                            className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/AboutUs"
                            className={currentPage === '/AboutUs' ? 'nav-link active' : 'nav-link'}
                        >
                            About Us
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
                                    to="/logout"
                                    onClick={handleLogout}
                                    className={currentPage === '/logout' ? 'nav-link active' : 'nav-link'}
                                >
                                    Logout
                                </Link>
                            </li>
                        </>
                    ) : (
                        <div className='nav'>
                            <li className="nav-item">
                                <Link
                                    to="/login"
                                    className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}
                                >
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/signup"
                                    className={currentPage === '/signup' ? 'nav-link active' : 'nav-link'}
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
