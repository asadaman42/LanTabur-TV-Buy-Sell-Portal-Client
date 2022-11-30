// import { useQuery } from '@tanstack/react-query';
import React from 'react';
import HomePageCategory from './HomePageCategory';

const Homepage = () => {
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