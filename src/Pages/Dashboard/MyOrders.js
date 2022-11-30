import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { UniversalContext } from '../../ContexSupplier/ContexSupplier';

const MyOrders = () => {
    const { user } = useContext(UniversalContext);
    const myOrdersUrl = `https://lantabur-tv-buy-sell-portal-server.vercel.app/bookings?email=${user.email}`;
    const { data: myOrders, isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const response = await fetch(myOrdersUrl);
            const data = await response.json();
            return data;
        }
    })

    if (isLoading) {
        return <InfinitySpin
            width='200'
            color="#4fa94d"
        />
    }


    return (
        <div>
            <h2>THis is my orders</h2>

            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                Image
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Title
                            </th>

                            <th scope="col" class="py-3 px-6">
                                Price
                            </th>
                            <th scope="col" class="py-3 px-6">
                                payment
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders.map(myOrder =>
                                <tr key={myOrder._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td class="p-4 w-32">
                                        <img src={myOrder.bookingPicture} alt="" />
                                    </td>
                                    <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                        {myOrder.itemName}
                                    </td>

                                    <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                        {myOrder.resalePrice}
                                    </td>
                                    <td class="py-4 px-6">
                                        <Link class="font-medium text-red-600 dark:text-red-500 hover:underline">Pay </Link>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyOrders;