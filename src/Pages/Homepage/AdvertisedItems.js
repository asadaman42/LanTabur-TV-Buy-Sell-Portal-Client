import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { GoVerified } from 'react-icons/go';
import { RevolvingDot } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { UniversalContext } from '../../ContexSupplier/ContexSupplier';

const AdvertisedItems = () => {

    const { user } = useContext(UniversalContext);
    const [modalInfo, setModalInfo] = useState(null);
    const date = format(new Date(), 'PPPP');
    const { register, handleSubmit } = useForm();


    const advertisementURL = 'https://lantabur-tv-buy-sell-portal-server-asadaman42.vercel.app/advertise';
    const { data: advertisedItems, isLoading } = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            const response = await fetch(advertisementURL);
            const data = await response.json();
            return data;
        }
    })
    if (isLoading) {
        return (
            <div className='flex justify-center items-center'>
                <div>
                    <RevolvingDot
                        height="500"
                        width="500"
                        radius="40"
                        color="#4fa94d"
                        secondaryColor=''
                        ariaLabel="revolving-dot-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            </div>
        )
    }


    const onSubmit = (data, e) => {

        fetch("https://lantabur-tv-buy-sell-portal-server-asadaman42.vercel.app/bookings", {
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

        <div>
            {
                advertisedItems.length>0 &&
                <div>
                    <h2 className='text-center text-4xl'>Advertised Items</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                        {advertisedItems?.map(product => {
                            const { productName, isVerified, picture, originalPrice, resalePrice, yearsOfUse, location, postingTime, sellerName, } = product;
                            // const {phoneNumber, description, yearOfPurchase, productCondition, company, _id} = product;
                            return (<div className="card card-compact  shadow-xl">
                                <figure><img src={picture} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{productName}</h2>
                                    <p>Original Price: {originalPrice}</p>
                                    <p>Location: {location} </p>
                                    <p>Posting Time: {postingTime} </p>
                                    <p>Resale Price: {resalePrice} </p>
                                    <p>Years of Use: {yearsOfUse} </p>
                                    {isVerified ?
                                        <p>sellerName: {sellerName}<GoVerified className='text-blue-600 inline-flex ml-1' /> </p>
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
                    {
                        user?.uid && modalInfo ?
                            <div>
                                <input type="checkbox" id="booking-modal" className="modal-toggle" />
                                <div className="modal">
                                    <div className="modal-box relative">
                                        <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                        <h3 className="text-lg font-bold"> {modalInfo.productName} </h3>
                                        <form onSubmit={handleSubmit(onSubmit)} className='mx-auto my-10'>
                                            <input {...register('buyerName')} type="text" readOnly defaultValue={user?.displayName} className="input w-full input-bordered my-2" />
                                            <input {...register('buyerEmail')} type="email" readOnly defaultValue={user?.email} className="input w-full input-bordered my-2" />
                                            <input {...register('itemName')} type="text" readOnly defaultValue={modalInfo.productName} className="input w-full input-bordered  my-2" />
                                            <input {...register('bookingDate')} type="text" readOnly defaultValue={date} className="input w-full input-bordered  my-2" />
                                            <input {...register('resalePrice')} type="text" readOnly defaultValue={modalInfo.resalePrice} className="input w-full input-bordered my-2" />
                                            <input {...register('categoryName')} type="text" readOnly defaultValue={modalInfo.company} className="hidden input w-full input-bordered my-2" />
                                            <input {...register('phoneNumber')} type="text" placeholder="Buyer's Phone Number" className="input w-full input-bordered my-2" />
                                            <input {...register('location')} type="text" placeholder="Buyer's Location" className="input w-full input-bordered my-2" />
                                            <img className='hidden' src={modalInfo.picture} alt="" {...register('bookingPicture')} />
                                            <button className='w-full btn btn-accent text-white' type="submit"> Submit </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <input type="checkbox" id="booking-modal" className="modal-toggle" />
                                <div className="modal">
                                    <div className="modal-box relative">
                                        <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                        <h3 className="text-lg font-bold my-6"> You are not logged in. You have to log in for booking a product.  </h3>
                                        <Link to='/login'> Log in </Link>
                                    </div>
                                </div>
                            </div>

                    }
                </div>
            }
        </div>
    );
};

export default AdvertisedItems;