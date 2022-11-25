import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { GoVerified } from "react-icons/go";

const Category = () => {
    const category = useLoaderData();
    const { categoryName, products } = category;



    return (

        <div className='mx-7'>
            <h2> {categoryName} </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {products.map(product => {

                    const { OriginalPrice, isVerified, location, name, picture, postingTime, reesalePrice, sellerName, yearsOfUse } = product;

                    return (
                        <div className="card card-compact  shadow-xl">
                            <figure><img src={picture} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{name}</h2>
                                <p>OriginalPrice: {OriginalPrice}</p>
                                <p>location: {location} </p>
                                <p>postingTime: {postingTime} </p>
                                <p>reesalePrice: {reesalePrice} </p>
                                <p>yearsOfUse: {yearsOfUse} </p>
                                {
                                    isVerified ?
                                        <p>sellerName: {sellerName}<GoVerified className='text-blue-600 inline-flex ml-1' /> </p>
                                        :
                                        <p>sellerName: {sellerName} </p>
                                }
                                {
                                    isVerified &&
                                    <div className="card-actions justify-center">
                                        <button className="btn btn-primary">Book Now</button>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                }
                )}
            </div>
            {/* The button to open modal */}
            <label htmlFor="booking-modal" className="btn">open modal</label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                </div>
            </div>

        </div>
    );
};

export default Category;