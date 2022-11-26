import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UniversalContext } from '../ContexSupplier/ContexSupplier';
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
    // React Hook Form
    const { register, handleSubmit, formState: {errors} } = useForm();

    // Import Context
    const { emailLoginProvider, googleLogInProvider, setLoading } = useContext(UniversalContext);

    // for Error Handling
    const [error, setError] = useState('')

    // navigate user from where he came
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();

    // for google sign in firbase auth
    const googleProvider = new GoogleAuthProvider();

    // send back the auth to context
    const googleLogIn = () => {
        googleLogInProvider(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true })
            })
            .catch(error => console.error(error));
    };

    // react hook form operation and sign in via Email
    const onSubmit = (data, e) => {

        const { email, password } = data;

        emailLoginProvider(email, password)
            .then(result => {
                const user = result.user;
                e.target.reset();
                setError('');
                navigate(from, { replace: true });
                toast.success('Login Successful');
            })
            .catch(error => {
                console.error(error)
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);

            })
    }

    return (
        <div className="h-screen bg-[url('https://i.ibb.co/tCCx6Wp/Login-Cover-2.jpg')] bg-cover flex justify-center items-center">
            <div className='md:w-96 my-4 text-white'>
                <h2 className='text-center text-3xl'> Please Log In </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="px-1 my-4" >
                    <div className="form-control">
                        <label className='label'>Your Email</label>
                        <input type="email" className="input input-bordered" {...register("email", { required: "Email address is Compulsory", })} />
                        {errors.email && <p className=' text-lime-400 font-bold'> {errors.email.message} </p> }
                    </div>
                    <div className="form-control">
                        <label className='label'> Your Password </label>
                        <input type="password" className="input input-bordered text-black" {...register("password", { required: "Password is Compulsory", minLength: {value:8, message: "Password must be 8 charecters or longer"} })} />
                        {errors.password && <p className=' text-lime-400 font-bold'> {errors.password.message} </p> }
                    </div>
                    <button type="submit" className='btn btn-primary w-full my-7'>Log In</button>
                </form>
                <div className='px-1'>
                    <p>Don't have an account? <Link to='/register' className='underline text-blue-300 hover:text-xl hover:font-bold '>Sign Up</Link> now</p>
                    <div className="divider before:bg-white after:bg-white"> or </div>
                    <button onClick={googleLogIn} className='btn btn-primary w-full my-4'><FaGoogle className='mx-2' />Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;