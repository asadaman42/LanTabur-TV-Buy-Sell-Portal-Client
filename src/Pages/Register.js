import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { UniversalContext } from '../ContexSupplier/ContexSupplier';

const Register = () => {
    const navigate = useNavigate();

    // Import Context
    const { createUserByEmailAndPassword, updatePhotoAndName } = useContext(UniversalContext);

    // state for accepting privacy policy
    const [checked, setChecked] = useState(false);

    // for Error Handling
    const [registrationError, setRegistrationError] = useState('')

    // React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm();

    // imgbb Key
    const imgbbKey = process.env.REACT_APP_imgbb;

    // react hook form operation and sign up through Email
    const onSubmit = (data, e) => {
        const image = data.userImg[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;

        // Getting User Picture link
        axios.post(url, formData)
            .then(imgData => {
                if (imgData.data.success) {
                    data.userImg = imgData.data.data.display_url;
                    const { email, password, name, userImg } = data;

                    // posting Data to DB
                    fetch('http://localhost:5000/users', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then(() => {                            
                            setRegistrationError('');
                            createUserByEmailAndPassword(email, password)
                                .then(result => {
                                    toast.success('Successfully Registered');

                                    // for updating photo and name to firebase
                                    updatePhotoAndName({ displayName: name, PhotoURL: userImg})
                                        .then(() => {
                                            e.target.reset();
                                            navigate("/")
                                        })
                                        .catch(er => console.log(er));

                                    
                                })
                                .catch(error => setRegistrationError(error.message))
                        })
                        .catch(err => console.error(err));

                }
            })



    };




    // for accepting privacy policy
    const checkedIt = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="min-h-screen bg-[url('https://i.ibb.co/tCCx6Wp/Login-Cover-2.jpg')] bg-cover flex justify-center items-center">
            <div className='md:w-96 my-4 text-white'>
                <h2 className='text-center text-3xl'> Create your account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="my-4 px-2" >
                    <div className="form-control ">
                        <label className='label'>Your Name</label>
                        <input type="text" className="input input-bordered text-black" {...register("name", { required: "You must have a name, don't you?" })} />
                        {errors.name && <p className=' text-lime-400 font-bold'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className='label'>Your Email</label>
                        <input type="email" className="input input-bordered text-black" {...register("email", { required: "Who doesn't have email nowadays? Provide your Email" })} />
                        {errors.email && <p className=' text-lime-400 font-bold'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className='label'> Your Password </label>
                        <input type="password" className="input input-bordered text-black"
                            {
                            ...register("password",
                                {
                                    required: "Password is the key. Without key, you can't enter",
                                    minLength: { value: 8, message: "Password must be 8 charecters or longer" },
                                    pattern:
                                    {
                                        value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*+-_/<>?;':",.])/,
                                        message: "Password must contain one uppercase, one lowercase, one number & one special charecter"
                                    }
                                }
                            )
                            } />
                        <p>Use minimum one uppercase, one lowercase, one number & one special charecter.</p>
                        {errors.password && <p className=' text-lime-400 font-bold'>{errors.password.message}</p>}
                    </div>
                    <div className='form-control'>
                        <select className="select select-bordered w-full text-black" defaultValue='User' {...register("buyerOrSeller")} >
                            <option>Buyer</option>
                            <option>Seller</option>
                        </select>
                    </div>
                    {registrationError && <p className=' text-lime-400 font-bold'> {registrationError} </p>}

                    <input type="file" className="text-black file-input file-input-bordered file-input-primary w-full max-w-xs my-4" {...register("userImg", { required: "Please upload Your Picture" })} />
                    {errors.userImg && <p className=' text-lime-400 font-bold'>{errors.userImg.message}</p>}

                    <div className='flex items-center mt-2'>
                        <input onChange={checkedIt} type="checkbox" className="checkbox checkbox-success" />
                        <label className='label'> I accept mentioned <span className='text-blue-400 underline ml-2' > terms and conditions.</span> </label>
                    </div>

                    <button disabled={!checked} type="submit" className='btn btn-primary w-full my-7 disabled:text-white disabled:glass' value="Sign up">Sign up</button>
                    <p>Already have an account? Please <Link to='/login' className='underline text-blue-300 hover:text-xl hover:font-bold '>Log In</Link></p>
                </form>

            </div>
        </div>
    );
};

export default Register;