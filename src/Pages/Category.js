import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { GoVerified } from "react-icons/go";
import { UniversalContext } from '../ContexSupplier/ContexSupplier';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';


const Category = () => {
    const { register, handleSubmit } = useForm
    const { user } = useContext(UniversalContext);
    const category = useLoaderData();
    const { categoryName, products } = category;
    const [modalInfo, setModalInfo] = useState({});
    console.log(modalInfo);
    const { name, reesalePrice } = modalInfo;
    const date = new Date();
    console.log(date);



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
                                        <p>sellerName:{sellerName}<GoVerified className='text-blue-600 inline-flex ml-1' /> </p>
                                        :
                                        <p>sellerName: {sellerName} </p>
                                }
                                {
                                    isVerified &&
                                    <div className="card-actions justify-center">
                                        <label onClick={() => setModalInfo(product)} htmlFor="booking-modal" className="btn btn-primary">Book Now</label>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                }
                )}
            </div>

            {modalInfo &&
                <div>
                    <input type="checkbox" id="booking-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 className="text-lg font-bold"> {name} </h3>
                            <form className='mx-auto my-10'>
                                <input type="email" disabled value={user?.email} className="input w-full input-bordered my-2" />
                                <input type="text" disabled value={format(date, 'PPPP')} className="input w-full input-bordered  my-2" />
                                <input type="text" disabled value={user?.displayName} className="input w-full input-bordered my-2" />
                                <input type="text" disabled value={reesalePrice} className="input w-full input-bordered my-2" />
                                <input type="text" placeholder="Phone Number" className="input w-full input-bordered my-2" />
                                <input type="text" placeholder="Location" className="input w-full input-bordered my-2" />
                                <button className='w-full btn btn-accent text-white' type="submit"> Submit </button>
                            </form>
                        </div>
                    </div>
                </div>}

        </div>
    );
};

export default Category;