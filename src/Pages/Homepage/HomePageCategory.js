import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Puff, RotatingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const HomePageCategory = () => {

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://lantabur-tv-buy-sell-portal-server-asadaman42.vercel.app/categories');
            const data = res.json();
            return data;
        }
    });

    if (isLoading) {
        return (
            <div className='flex justify-center items-center'> 
                <Puff
                    height="150"
                    width="150"
                    radius={1}
                    color="#4fa94d"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        )
    }

    return (
        <div className='py-7'>
            <h4 className=' text-center text-4xl font-bold'>Second Hand TV  Categoires</h4>


            <div className='mx-5 grid grid-cols-1 md:grid-cols-3 gap-5 my-7'>
                {categories &&
                    categories.map(
                        category =>
                            <div key={category._id} className="card shadow-xl image-full">
                                <figure><img src={category.categoryImg} alt="" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title"> {category.categoryName} TV </h2>
                                    <p> All the <span className='font-bold text-white text-2xl'>{category.categoryName}</span> branded TVs are here. </p>
                                    <div className="card-actions justify-center">
                                        <Link to={`/category/${category._id}`}><button className="btn btn-primary">Explore {category.categoryName} </button></Link>
                                    </div>
                                </div>
                            </div>

                    )}

            </div>

        </div>
    );
};

export default HomePageCategory;