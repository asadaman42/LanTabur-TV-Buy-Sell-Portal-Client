import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Category = () => {
    const category = useLoaderData();
    const { categoryName, products } = category;
    


    return (

        <div className='mx-7'>
            <h2> {categoryName} </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {
                    products.map(product => {
                        
                        const { OriginalPrice, isVerified, location, name, picture, postingTime, reesalePrice, sellerName, yearsOfUse } = product;
                        console.log(name);

                        return(
                            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                            <figure><img src={picture} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{name}</h2>
                                <p>OriginalPrice: {OriginalPrice}</p>
                                <p>location: {location} </p>
                                <p>postingTime: {postingTime} </p>
                                <p>reesalePrice: {reesalePrice} </p>
                                <p>sellerName: {sellerName} </p>
                                <p>yearsOfUse: {yearsOfUse} </p>
                                <div className="card-actions justify-center">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                        )
                    }
                    )
                }
            </div>

        </div>
    );
};

export default Category;