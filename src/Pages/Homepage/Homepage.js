// import { useQuery } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { RevolvingDot } from 'react-loader-spinner';
import AdvertisedItems from './AdvertisedItems';
import HomePageBanner from './HomePageBanner';
import HomePageCategory from './HomePageCategory';
import HomePageExtraSection from './HomePageExtraSection';

const Homepage = () => {



    return (
        <main className='mx-7'>
            <section className='my-10 shadow-2xl'>
                <HomePageBanner></HomePageBanner>
            </section>

            <section className='my-10 shadow-2xl'>
                <AdvertisedItems/>
            </section>

            <section className='my-10 shadow-2xl'>
                <HomePageCategory></HomePageCategory>
            </section>

            <section className='my-10 shadow-2xl'>
                <HomePageExtraSection></HomePageExtraSection>
            </section>
        </main>
    );
};

export default Homepage;