import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';

const AllSellers = () => {



    const allSellersUrl = 'http://localhost:5000/users?userType=Seller'
    const { data: allSellers, isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const response = await fetch(allSellersUrl);
            const data = await response.json();
            return data;
        }
    });



    if (isLoading) {
        return (
            <div className=' min-h-screen flex justify-center items-center'>
                <div>
                    <TailSpin
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            </div>
        )
    }


    const makeAdmin = (userID) => {
        fetch(`http://localhost:5000/user/admin/${userID}`, {
            method: "PUT",
        })
            .then(res => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success('Making Admin Successful');
                }
            })
            .catch(err => console.error(err));

    }



    const verify = (userID) => {
        fetch(`http://localhost:5000/user/verification/${userID}`, {
            method: "PUT",
        })
            .then(res => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success('User Verified successfully');
                }
            })
            .catch(err => console.error(err));

    };

    const deleteUser = (userID) => {
        const response = window.confirm("Sure???");
        if (response) {
            fetch(`http://localhost:5000/user/delete/${userID}`, {
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
    }

    return (
        <div>
            <h2>THis is all sellers</h2>


            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">

                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Name
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Status
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Verify
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Admin
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSellers.map(
                                seller =>
                                    <tr key={seller._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="p-4 w-4">
                                            <div class="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <th scope="row" class="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                                            <img class="w-10 h-10 rounded-full" src={seller.userImg} alt="Jese" />
                                            <div class="pl-3">
                                                <div class="text-base font-semibold">{seller.name}</div>
                                                <div class="font-normal text-gray-500"> {seller.email} </div>
                                            </div>
                                        </th>
                                        <td class="py-4 px-6">
                                            {seller.isVerified ?
                                                "Verified" :
                                                "Not Verified"
                                            }
                                        </td>
                                        <td class="py-4 px-6">
                                            <button onClick={() => verify(seller._id)} className={seller.isVerified ? "hidden" : "btn btn-primary btn-xs"}> Verify </button>
                                        </td>
                                        <td class="py-4 px-6">
                                            <button onClick={() => makeAdmin(seller._id)} className={seller.role === 'admin' ? "hidden" : "btn btn-primary btn-xs"}> Make Admin </button>
                                        </td>
                                        <td class="py-4 px-6">
                                            <button onClick={() => deleteUser(seller._id)} className="btn btn-secondary btn-xs font-extrabold" > Delete </button>
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

export default AllSellers;