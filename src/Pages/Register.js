import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import { UniversalContext } from '../ContexSupplier/ContexSupplier';

const Register = () => {
    // Import Context
    const { createUserByEmailAndPassword, updatePhotoAndName } = useContext(UniversalContext);

    // state for accepting privacy policy
    const [checked, setChecked] = useState(false);

    // for Error Handling
    const [error, setError] = useState('')

    // React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm();

    // react hook form operation and sign up through Email
    const onSubmit = (data, e) => {
        const { name, email, PhotoURL, password } = data;
        createUserByEmailAndPassword(email, password)
            .then(result => {
                const user = result.user;
                e.target.reset();
                setError('');
                handleUpdatePhotoAndName(name, PhotoURL);
                toast.success('Successfully Registered');
                <Navigate to='/login'></Navigate>
            })
            .catch(error => {
                console.error(error)
                setError(error.message);
            })
    };

    // for updating photo and name to firebase
    const handleUpdatePhotoAndName = (name, PhotoURL) => {
        updatePhotoAndName({ displayName: name, PhotoURL: PhotoURL });
    };

    // for accepting privacy policy
    const checkedIt = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="min-h-screen bg-[url('https://i.ibb.co/tCCx6Wp/Login-Cover-2.jpg')] bg-cover flex justify-center items-center">
            <div className='md:w-96 my-4 text-white'>
                <h2 className='text-center text-3xl'> Create your account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="my-4 px-1" >
                    <div className="form-control ">
                        <label className='label'>Your Name</label>
                        <input type="text" className="input input-bordered" {...register("name", { required: "You must have a name, don't you?" })} />
                        {errors.name && <p className=' text-lime-400 font-bold'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className='label'>Your Email</label>
                        <input type="email" className="input input-bordered" {...register("email", { required: "Who doesn't have email nowadays? Provide your Email" })} />
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
                                        pattern: [
                                            { value: /(?=.*[A-Z])/, message: "Password must contain one uppercase" },
                                            { value: /(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*+-_/<>?;':",.])/, message: "Password must contain one lowercase, one number & one special charecter" }
                                        ],
                                    }
                                )
                            } />
                        <p>Use minimum one uppercase, one lowercase, one number & one special charecter.</p>
                        {errors.password && <p className=' text-lime-400 font-bold'>{errors.password.message}</p>}
                    </div>
                    <button type="submit" className='btn btn-primary w-full my-7' value="Sign up">Sign up</button>
                    <p>Already have an account? Please <Link to='/login' className='underline text-blue-300 hover:text-xl hover:font-bold '>Log In</Link></p>
                </form>

            </div>
        </div>
    );
};

export default Register;