
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UniversalContext } from '../../ContexSupplier/ContexSupplier';

const AddProduct = () => {
    const { user } = useContext(UniversalContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const date = format(new Date(), 'PPPP');
    const imgbbKey = process.env.REACT_APP_imgbb;
    const navigate = useNavigate();


    const userUrl = `https://lantabur-tv-buy-sell-portal-server-asadaman42.vercel.app/users/${user.email}`
    const { data: userFromDB, isLoading } = useQuery({
        queryKey: ['email'],
        queryFn: async () => {
            const response = await fetch(userUrl);
            const data = await response.json();
            return data;
        }
    });

    const addProduct = (data, e) => {
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
        axios.post(url, formData)
            .then(imgData => {
                if (imgData.data.success) {
                    data.picture = imgData.data.data.display_url;
                    data.postingTime = date;
                    data.sellerName = user?.displayName;
                    data.isVerified = userFromDB?.isVerified;
                    data.sellerEmail = user?.email; 
                    fetch(`https://lantabur-tv-buy-sell-portal-server-asadaman42.vercel.app/category/${data.company}`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then(() => {
                            e.target.reset();
                            toast.success('Product Added');
                            navigate('/dashboard/myproducts');

                            // to do: want to add more product? proceed or navigate to homepage. 
                        })
                        .catch(err => console.error(err));
                }
            });
    }



    return (
        <div className='flex justify-center items-center'>
            <form onSubmit={handleSubmit(addProduct)} className="flex flex-col md:w-96 justify-center items-center">
                <input type="text" placeholder='Product Name' className='input input-bordered w-full my-1' {...register("productName", { required: "Please Provide Product Name" })} />
                {errors.productName && <p className=' text-red-600'>{errors.productName.message}</p>}

                <input type="text" placeholder='What is the Original Price' className='input input-bordered w-full my-1' {...register("originalPrice", { required: "Please Provide Original Price" })} />
                {errors.originalPrice && <p className=' text-red-600'>{errors.originalPrice.message}</p>}

                <input type="text" placeholder='Your Price' className='input input-bordered w-full my-1' {...register("resalePrice", { required: "Please Provide Your Price" })} />
                {errors.resalePrice && <p className=' text-red-600'>{errors.resalePrice.message}</p>}

                <input type="text" placeholder='Usage Year(s)' className='input input-bordered w-full my-1' {...register("yearsOfUse", { required: "Please Provide how many year(s) the product has been used." })} />
                {errors.yearsOfUse && <p className=' text-red-600'>{errors.yearsOfUse.message}</p>}

                <input type="text" placeholder='Your Phone Number' className='input input-bordered w-full my-1' {...register("phoneNumber", { required: "Please Provide Your Contact Number" })} />
                {errors.phoneNumber && <p className=' text-red-600'>{errors.phoneNumber.message}</p>}

                <textarea className="textarea textarea-bordered w-full my-1" placeholder='Describe About the product' {...register("description", { required: "Please Provide Product Description" })}></textarea>
                {errors.description && <p className=' text-red-600'>{errors.description.message}</p>}

                <input type="text" placeholder='Purchase Year' className='input input-bordered w-full my-1' {...register("yearOfPurchase", { required: "Please Provide the year of purchase" })} />
                {errors.yearOfPurchase && <p className=' text-red-600'>{errors.yearOfPurchase.message}</p>}

                <select className="select select-bordered w-full my-1" {...register("productCondition", { required: "Must have to describe product condition" })} >
                    <option value='' className='hidden'>Product Condition</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                </select>
                {errors.productCondition && <p className=' text-red-600'>{errors.productCondition.message}</p>}

                <select className="select select-bordered w-full my-1" {...register("location", { required: "Please select your division" })} >
                    <option value="" className='hidden'>Select Your Division</option>
                    <option>Barishal</option>
                    <option>Chattogram</option>
                    <option>Dhaka</option>
                    <option>Khulna</option>
                    <option>Mymensingh</option>
                    <option>Rajshahi</option>
                    <option>Rangpur</option>
                    <option>Sylhet</option>
                </select>
                {errors.location && <p className=' text-red-600'>{errors.location.message}</p>}

                <select className="select select-bordered w-full my-1" {...register("company", { required: "Please select TV Company" })} >
                    <option value="" className='hidden'>Select TV Company</option>
                    <option>Vision</option>
                    <option>Walton</option>
                    <option>Toshiba</option>
                </select>
                {errors.location && <p className=' text-red-600'>{errors.location.message}</p>}

                <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" {...register("img", { required: "Please upload product photo" })} />
                {errors.img && <p className=' text-red-600'>{errors.img.message}</p>}

                <button type="submit" className='btn btn-primary w-full my-7' >Add the Product</button>



            </form>
        </div>
    );
};

export default AddProduct;