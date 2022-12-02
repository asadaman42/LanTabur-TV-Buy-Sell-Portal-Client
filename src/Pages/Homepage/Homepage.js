// import { useQuery } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { RevolvingDot } from 'react-loader-spinner';
import AdvertisedItems from './AdvertisedItems';
import HomePageBanner from './HomePageBanner';
import HomePageCategory from './HomePageCategory';
import HomePageExtraSection from './HomePageExtraSection';

const Homepage = () => {

    const advertisementURL = 'https://lantabur-tv-buy-sell-portal-server-asadaman42.vercel.app/advertise';

    const { data: advertisedItems, isLoading } = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            const response = await fetch(advertisementURL);
            const data = await response.json();
            return data;
        }
    })

    

    if (isLoading) {
        return (
            <div className=' min-h-screen flex justify-center items-center'>
                <div>
                    <RevolvingDot
                        height="100"
                        width="100"
                        radius="6"
                        color="#4fa94d"
                        secondaryColor=''
                        ariaLabel="revolving-dot-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className='mx-7'>
            <section className='my-10 shadow-2xl'>
                <HomePageBanner></HomePageBanner>
            </section>

            {
                advertisedItems.length && 
                <section className='my-10 shadow-2xl'>
                    <AdvertisedItems
                        advertisedItems={advertisedItems}
                    ></AdvertisedItems>
                </section>
            }

            <section className='my-10 shadow-2xl'>
                <HomePageCategory></HomePageCategory>
            </section>

            <section className='my-10 shadow-2xl'>
                <HomePageExtraSection></HomePageExtraSection>
            </section>
        </div>
    );
};

export default Homepage;