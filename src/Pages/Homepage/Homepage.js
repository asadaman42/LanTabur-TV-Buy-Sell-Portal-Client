import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:5000/categories')
        .then(res => res.json())
        .then(data => setCategories(data));
    }, [])


    return (
        <div className='mx-7'>
            <section>
                Banner
            </section>

            <section>
                Advertised Items
            </section>

            <section>
                <h4>Second Hand TV  Categoires</h4>


                <ul className='ml-5'>
                    {
                        categories.map(
                            category =>
                                <li key={category._id}>
                                    <Link to={`/category/${category._id}`}> {category.categoryName} </Link>
                                </li>)
                    }
                    
                </ul>
            </section>

            <section>
                Extra Section
            </section>
        </div>
    );
};

export default Homepage;