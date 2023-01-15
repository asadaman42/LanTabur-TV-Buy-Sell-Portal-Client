import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { UniversalContext } from '../ContexSupplier/ContexSupplier';

const Navbar = () => {
    const { user, logOut } = useContext(UniversalContext);
        const navigate = useNavigate();
    const userUrl = `https://lantabur-tv-buy-sell-portal-server-asadaman42.vercel.app/users/${user?.email}`
    const { data: userFromDB = {} } = useQuery({
        queryKey: ['email'],
        queryFn: async () => {
            const response = await fetch(userUrl);
            const data = await response.json();
            return data;
        }
    });

    const signOut = () => {
        // <Navigate to='/dashboard'></Navigate>
        navigate("/");
        logOut().then(() => { }).catch(error => console.error(error));
    }

    const menuItems = <React.Fragment>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/blog'>Blog</Link></li>
        {
            user?.uid ?
                <>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <h2 className='inline-flex items-center' > Mr. {userFromDB?.name} </h2>
                    <img className="mask mask-circle rounded w-12" src={userFromDB?.userImg} alt='' />
                    <button onClick={signOut} className='btn btn-primary m-1'>Log Out</button>

                </>
                :
                <li className='btn btn-primary m-1 rounded-2xl'> <Link to='/login'>Log In</Link> </li>
        }
    </React.Fragment>
    return (
        <nav className="navbar flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <img className=' w-10' src="https://i.ibb.co/HC6BHTd/People-watching-the-news-bro.png" alt="" />
                <Link to='/' className="btn btn-ghost normal-case text-xl">LanTabur TV Buy Sell Portal</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;