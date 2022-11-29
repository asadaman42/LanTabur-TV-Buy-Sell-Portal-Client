// import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import HomePageCategory from './HomePageCategory';

const Homepage = () => {
    const categories = useLoaderData();
    // const {data: categories = []} = useQuery({
    //     queryKey: ['categories'],
    //     queryFn: async() => {
    //         const res = await fetch("http://localhost:5000/categories");
    //         const data = res.json();
    //         return data;
    //     }
    // })

    /* const {data: categories = [] } = useQuery(
        {
            queryKey: ['categories'],
            queryFn: () => fetch('http://localhost:5000/categories').then(res => res.json())
        }
    ) */

    /* const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/categories')
        .then(res => res.json())
        .then(data => setCategories(data));
    }, []) */


    return (
        <div className='mx-7'>
            <section>
                Banner
            </section>

            <section>
                Advertised Items
            </section>

            <section>
                <HomePageCategory></HomePageCategory>               
            </section>

            <section>
                Extra Section
            </section>
        </div>
    );
};

export default Homepage;