import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { GoVerified } from "react-icons/go";
import { UniversalContext } from '../ContexSupplier/ContexSupplier';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


const Category = () => {
    const { register, handleSubmit } = useForm();
    const { user } = useContext(UniversalContext);
    const category = useLoaderData();
    const { _id, categoryName, products } = category;
    const [modalInfo, setModalInfo] = useState(null);
    // const { name, reesalePrice } = modalInfo;
    const date = format(new Date(), 'PPPP');


    const onSubmit = (data, e) => {
        data.bookingCatagory = categoryName;
        data.bookingCategoryID = _id;
        fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(() => {
                setModalInfo(null);
                toast.success('Booking OCnfirmed');
            })
            .catch(err => console.error(err)); 
    };




    return (

        <div className='mx-7'>
            <h2> {categoryName} </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {products?.map(product => {
                    const { OriginalPrice, isVerified, location, name, picture, postingTime, reesalePrice, sellerName, yearsOfUse } = product;
                    return (<div className="card card-compact  shadow-xl">
                        <figure><img src={picture} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{name}</h2>
                            <p>OriginalPrice: {OriginalPrice}</p>
                            <p>location: {location} </p>
                            <p>postingTime: {postingTime} </p>
                            <p>reesalePrice: {reesalePrice} </p>
                            <p>yearsOfUse: {yearsOfUse} </p>
                            {isVerified ?
                                <p>sellerName:{sellerName}<GoVerified className='text-blue-600 inline-flex ml-1' /> </p>
                                :
                                <p>sellerName: {sellerName} </p>}
                            {isVerified &&
                                <div className="card-actions justify-center">
                                    <label onClick={() => setModalInfo(product)} htmlFor="booking-modal" className="btn btn-primary">Book Now</label>
                                </div>}
                        </div>
                    </div>)
                }
                )}
            </div>

            {modalInfo &&
                <div>
                    <input type="checkbox" id="booking-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 className="text-lg font-bold"> {modalInfo.name} </h3>
                            <form onSubmit={handleSubmit(onSubmit)} className='mx-auto my-10'>
                                <input {...register('buyerEmail')} type="email" readOnly defaultValue={user?.email} className="input w-full input-bordered my-2" />
                                <input {...register('bookingDate')} type="text" readOnly defaultValue={date} className="input w-full input-bordered  my-2" />
                                <input {...register('buyerName')} type="text" readOnly defaultValue={user?.displayName} className="input w-full input-bordered my-2" />
                                <input {...register('resalePrice')} type="text" readOnly defaultValue={modalInfo.reesalePrice} className="input w-full input-bordered my-2" />
                                <input {...register('phoneNumber')} type="text" placeholder="Phone Number" className="input w-full input-bordered my-2" />
                                <input {...register('location')} type="text" placeholder="Location" className="input w-full input-bordered my-2" />
                                <button className='w-full btn btn-accent text-white' type="submit"> Submit </button>
                            </form>
                        </div>
                    </div>
                </div>}

        </div>
    );
};

export default Category;