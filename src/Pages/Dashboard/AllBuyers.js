import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { Circles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const AllBuyers = () => {
    const allBuyersUrl = 'https://lantabur-tv-buy-sell-portal-server-asadaman42.vercel.app/users?userType=Buyer'
    const { data: allBuyers, isLoading, refetch } = useQuery({
        queryKey: ['Buyer'],
        queryFn: async () => {
            const response = await fetch(allBuyersUrl);
            const data = await response.json();
            return data;
        }
    });



    if (isLoading) {
        return (
            <div className=' min-h-screen flex justify-center items-center'>
                <div>
                    <Circles
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            </div>
        )
    }

    const deleteUser = (userID) => {
        const response = window.confirm("Sure???");
        if (response) {
            fetch(`https://lantabur-tv-buy-sell-portal-server-asadaman42.vercel.app/user/delete/${userID}`, {
                method: "delete"
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.deletedCount) {
                        refetch();
                        toast.success('User Deleted');
                    }


                })
                .catch(err => console.error(err));
        }
        else {
            toast.error("user not deleted")
        }
    };


    return (
        <div>
            <h2>This is All Buyers</h2>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Position
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Status
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allBuyers.map(
                                buyer =>
                                    <tr key={buyer._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="p-4 w-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                                            <img className="w-10 h-10 rounded-full" src={buyer.userImg} alt="Jese" />
                                            <div className="pl-3">
                                                <div className="text-base font-semibold">{buyer.name}</div>
                                                <div className="font-normal text-gray-500"> {buyer.email} </div>
                                            </div>
                                        </th>
                                        <td className="py-4 px-6">
                                            {buyer.buyerOrSeller}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Online
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <button onClick={() => deleteUser(buyer._id)} className="btn btn-secondary btn-xs font-extrabold" > Delete </button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllBuyers;