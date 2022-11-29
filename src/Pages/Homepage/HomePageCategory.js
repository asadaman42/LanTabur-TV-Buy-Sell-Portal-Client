import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const HomePageCategory = () => { 

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = res.json();
            return data;
        }
    });

    if (isLoading) {
        return (
            <div>
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        )
    }

    return (
        <div>
            <h4>Second Hand TV  Categoires</h4>


            <ul className='ml-5'>
                {categories &&
                    categories.map(
                        category =>
                            <li key={category._id}>
                                <Link to={`/category/${category._id}`}> {category.categoryName} </Link>
                            </li>)
                }

            </ul>

        </div>
    );
};

export default HomePageCategory;