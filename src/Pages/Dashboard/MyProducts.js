import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Circles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { UniversalContext } from '../../ContexSupplier/ContexSupplier';

const MyProducts = () => {
    const { user } = useContext(UniversalContext);

    const sellerProducts = [];

    // const myProductsUrl = `http://localhost:5000/products/${user?.email}`;
    const myProductsUrl = `https://lantabur-tv-buy-sell-portal-server-asadaman42.vercel.app/products/${user?.email}`;
    const { data: myproducts, isLoading, refetch } = useQuery({
        queryKey: ['Buyer'],
        queryFn: async () => {
            const response = await fetch(myProductsUrl);
            const data = await response.json();
            return data;
        }
    });

    myproducts?.forEach(product => (product.products).map(singleProduct => sellerProducts.push(singleProduct)));

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

    const advertise = (advertisementData) => {
        const id = advertisementData._id;
        delete advertisementData._id;
        advertisementData.oldID = id;

        const advertisementURL = 'https://lantabur-tv-buy-sell-portal-server-asadaman42.vercel.app/advertise';
        axios.post(advertisementURL, advertisementData)
            .then(res => {
                if (res.data.upsertedId) {
                    toast.success('Product Advertised')
                }
                else {
                    toast.error('Product already advertised');
                }
            });

    };


    const deleteProduct = (id, company) => {
        const deleteURL = `https://lantabur-tv-buy-sell-portal-server-asadaman42.vercel.app/myproducts/delete/${id}`;
        axios.post(deleteURL, { company })
            .then(res => {
                if (res.data.matchedCount) {
                    toast.success('product deleted');
                    refetch();
                }

            })
            .catch(err => console.error(err));

    };



    return (
        <div className='w-max'>
            <h2 className="2xl text-center"> Products posted by <span className='font-bold'> Mr. {user?.displayName}</span> </h2>

            <Link to='/dashboard/addproduct' > <button className='btn btn-accent flex mx-auto my-5'> Add Product </button> </Link>

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Product
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Sales Status
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Price
                            </th>
                            <th scope="col" className="py-3 px-6">
                                delete
                            </th>
                            <th scope="col" className="py-3 px-6">
                                advertisement
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            sellerProducts.map(sellerProduct =>
                                <tr key={sellerProduct._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4 w-32">
                                        <img src={sellerProduct.picture} alt="Apple Watch" />
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                        {sellerProduct.productName}
                                    </td>
                                    <td className="py-4 px-6">
                                        Available
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                        {sellerProduct.resalePrice}
                                    </td>
                                    <td className="py-4 px-6">
                                        <button onClick={() => deleteProduct(sellerProduct._id, sellerProduct.company)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button onClick={() => advertise(sellerProduct)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Advertise</button>
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

export default MyProducts;