import React from 'react';

const HomePageBanner = () => {
    return (
        <div>
            <div id="carouselExampleCaptions" className="carousel slide relative" data-bs-ride="carousel">
                <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>
                <div className="carousel-inner relative w-full overflow-hidden">
                    <div className="carousel-item active relative float-left w-full max-h-[80vh]">
                        <img
                            src="https://lgads.tv/wp-content/uploads/2021/02/lg-ads-default.jpg"
                            className="block w-full"
                            alt="..."
                        />
                        <div className="carousel-caption hidden md:block absolute text-center">
                            <h5 className="text-xl">BIG SCREEN MOMENTS</h5>
                            <p>Enjoy all your favourite content with our stunning
                                4K resolution and epic TRU picture engine.</p>
                        </div>
                    </div>
                    <div className="carousel-item relative float-left w-full max-h-[80vh]">
                        <img
                            src="https://i.ibb.co/kgfRG5N/led-1.jpg"
                            className="block w-full"
                            alt="..."
                        />
                        <div className="carousel-caption hidden md:block absolute text-center">
                            <h5 className="text-xl text-black">Experience the power of OLED TVs</h5>
                            <p className='text-black'>Shop the latest and greatest OLED generation with better contrast, color display and gaming compatibility than ever before. </p>
                        </div>
                    </div>
                    <div className="carousel-item relative float-left w-full max-h-[80vh]">
                        <img
                            src="https://i.ibb.co/tCCx6Wp/Login-Cover-2.jpg"
                            className="block w-full"
                            alt="..."
                        />
                        <div className="carousel-caption hidden md:block absolute text-center">
                            <h5 className="text-xl">Eye Comfort, Better longevity</h5>
                            <p>Need to change the TV? Post it here. </p>
                        </div>
                    </div>
                </div>
                <button
                    className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default HomePageBanner;