import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="p-10 bg-[url('https://i.postimg.cc/3R8tZCYn/footer.png')] bg-center">
            <div className='footer'>
                <div>
                    <span className="footer-title">Information</span>
                    <Link to='/aboutus' className="link link-hover">About us</Link>
                    <Link to='/blog' className="link link-hover">Blog</Link>
                    <Link to='/' className="link link-hover">Check Out</Link>
                    <Link to='/' className="link link-hover">Contact</Link>
                </div>
                <div>
                    <span className="footer-title">My Account</span>
                    <Link to='/' className="link link-hover">My Account</Link>
                    <Link to='/' className="link link-hover">Contact</Link>
                    <Link to='/' className="link link-hover">Shopping Cart</Link>
                    <Link to='/' className="link link-hover">Shop</Link>
                </div>
                <div>
                    <span className="footer-title">Categories</span>
                    <Link to='/' className="link link-hover">New York - 101010 Hudson</Link>
                </div>
            </div>

            <div className='text-center mt-10'>
                <p>Copyright 2022 All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;