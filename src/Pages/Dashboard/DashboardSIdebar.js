import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdProductionQuantityLimits } from "react-icons/md";
import { UniversalContext } from '../../ContexSupplier/ContexSupplier';
import useAdmin from '../../Custom Hook/useAdmin';
import useSeller from '../../Custom Hook/useSeller';
import useBuyer from '../../Custom Hook/useBuyer';

const DashboardSIdebar = () => {
    const { user } = useContext(UniversalContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);

    const [isOpen, setIsOpen] = useState(false)

    const sideBarItem =
        <React.Fragment>

            {/* for admin  */}
            {
                isAdmin &&
                <>
                    <li className="flex w-full justify-between  cursor-pointer items-center mb-6">
                        <Link to='/dashboard/allsellers' className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                            <MdProductionQuantityLimits></MdProductionQuantityLimits>
                            <span className="text-sm ml-2">All Sellers</span>
                        </Link>
                    </li>
                    <li className="flex w-full justify-between  cursor-pointer items-center mb-6">
                        <Link to='/dashboard/allbuyers' className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                            <MdProductionQuantityLimits></MdProductionQuantityLimits>
                            <span className="text-sm ml-2">All Buyers</span>
                        </Link>
                    </li>
                    <li className="flex w-full justify-between  cursor-pointer items-center mb-6">
                        <Link to='/dashboard/reporteditems' className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                            <MdProductionQuantityLimits></MdProductionQuantityLimits>
                            <span className="text-sm ml-2">Reported Items</span>
                        </Link>
                    </li>
                </>
            }


            {/* for Buyers */}
            {
                isBuyer &&
                <li className="flex w-full justify-between  cursor-pointer items-center mb-6">
                    <Link to='/dashboard/myorders' className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                        <MdProductionQuantityLimits></MdProductionQuantityLimits>
                        <span className="text-sm ml-2">My Orders</span>
                    </Link>
                </li>
            }


            {/* for Seller */}
            {
                isSeller &&
                <>
                    <li className="flex w-full justify-between  cursor-pointer items-center mb-6">
                        <Link to='/dashboard/addproduct' className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                            <MdProductionQuantityLimits></MdProductionQuantityLimits>
                            <span className="text-sm ml-2">Add A Product</span>
                        </Link>
                    </li>
                    <li className="flex w-full justify-between  cursor-pointer items-center mb-6">
                        <Link to='/dashboard/myproducts' className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                            <MdProductionQuantityLimits></MdProductionQuantityLimits>
                            <span className="text-sm ml-2">My Products</span>
                        </Link>
                    </li>
                </>
            }


        </React.Fragment>


    return (
        <div className=' bg-slate-200'>
            <div className="w-64 absolute sm:relative shadow md:h-screen flex-col justify-between hidden sm:flex">
                <div className="px-8">
                    
                    <ul className="mt-12">
                        {sideBarItem}
                    </ul>
                </div>
            </div>

            <div style={isOpen ? { transform: "translateX(0px)" } : { transform: "translateX(-260px)" }}
                className="w-64 z-40 absolute bg-gray-800 text-white shadow h-screen flex-col justify-between md:hidden transition duration-150 ease-in-out">
                <button aria-label="toggle sidebar"
                    className={isOpen ? "hidden" : "h-10 w-10 bg-gray-800 text-white absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800"} onClick={() => setIsOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-adjustments" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx="6" cy="10" r="2" />
                        <line x1="6" y1="4" x2="6" y2="8" />
                        <line x1="6" y1="12" x2="6" y2="20" />
                        <circle cx="12" cy="16" r="2" />
                        <line x1="12" y1="4" x2="12" y2="14" />
                        <line x1="12" y1="18" x2="12" y2="20" />
                        <circle cx="18" cy="7" r="2" />
                        <line x1="18" y1="4" x2="18" y2="5" />
                        <line x1="18" y1="9" x2="18" y2="20" />
                    </svg>
                </button>
                <button aria-label="Close sidebar" id="closeSideBar"
                    className={isOpen ? "h-10 w-10 bg-gray-800 text-white absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer " : "hidden"} onClick={() => setIsOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <div className="px-8">
                    
                    <ul className="mt-12">
                        {sideBarItem}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardSIdebar;