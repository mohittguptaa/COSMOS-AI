import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SearchCard from "../components/SearchCard";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {

    useEffect(() => {
        // Enhanced animation for sections
        gsap.utils.toArray(".animated-section").forEach((section) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        end: "bottom 15%",
                        scrub: 1,
                        toggleActions: "play none none reverse",
                    },
                    ease: "power3.out",
                }
            );
        });

    }, []);

    // Handle image scaling on hover with enhanced ease
    const handleMouseEnter = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    return (
        <div className="flex flex-col items-center px-6 my-10 space-y-20 lg:px-24">
            {/* Carousel Section */}
            <div className="animated-section">
                <Carousel />
            </div>

            {/* Our Mission Section */}
            <div className="w-full p-6 my-12 shadow-xl backdrop-blur-lg rounded-2xl lg:p-10 animated-section">
                <h2 className="mb-6 text-3xl font-light text-center lg:text-5xl">Our Mission</h2>
                <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
                    <div className="w-full lg:w-1/2" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <img
                            src="/cmfimg.webp"
                            alt="Our Technology"
                            className="rounded-xl shadow-md object-cover h-[500px]"
                        />
                    </div>
                    <div className="flex flex-col w-full space-y-4 lg:w-1/2">
                        <p className="text-sm leading-relaxed lg:text-base">
                            Our mission is to develop and promote the cutting-edge technology of magnetic fusion energy as a sustainable, clean, transformative energy solution.
                        </p>
                        <p className="text-sm leading-relaxed lg:text-base">
                            We envision a world powered by magnetic fusion energy, freeing us from fossil fuel dependence and promoting environmental and human well-being.
                        </p>
                    </div>
                </div>
            </div>
            {/* Explore Our Product Section */}
            <div className="flex flex-col items-center w-full p-6 my-12 space-y-8 shadow-xl backdrop-blur-xl rounded-2xl lg:p-10 animated-section">
                <h2 className="text-3xl font-light text-center lg:text-5xl">Explore Our Products</h2>
                <p className="text-sm leading-relaxed text-center lg:text-base">
                    Dive into space exploration with tools for satellite tracking and solar IMF prediction using AI technology.
                </p>
                <div className="w-full">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                img: "/satellite.webp",
                                title: "Possibility of Satellite Imaging at Particular Location",
                                description: "Track global satellite movements in real-time.",
                                link: "/SatelliteImaging",
                            },  
                            {
                                img: "https://upload.wikimedia.org/wikipedia/commons/2/27/Coronal_mass_ejection_on_28_October_2021_ESA25032924.gif",
                                title: "Prediction and Modeling of Magnetic Reconnection and Predict DST",
                                description: "Use AI to predict Interplanetary Magnetic Fields.",
                                link: "/magenaticreconnection",
                            },
                            {
                                img: "https://cdn.mos.cms.futurecdn.net/gNTeHjvJcWiEn9qvPBQXyB.gif",
                                title: "Prediction of Space Weather Parameter and Indexs",
                                description: "Explore space data with interactive visuals.",
                                link: "/SpacePrediction",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="w-full transition-transform transform shadow-lg card backdrop-blur-lg rounded-2xl hover:-translate-y-1"
                                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                            >
                                <figure className="px-10 pt-10">
                                    <img src={item.img} alt={item.title} className="object-cover w-full rounded-xl h-60" />
                                </figure>
                                <div className="items-center text-center card-body">
                                    <h2 className="card-title">{item.title}</h2>
                                    <p className="text-gray-400">{item.description}</p>
                                    <div className="card-actions">
                                        <Link to={item.link} className="btn btn-primary">Explore More</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Centered Row with 2 Cards */}
                    <div className="flex flex-wrap justify-center gap-8 mt-8">
                        {[
                            {
                                img: "https://akm-img-a-in.tosshub.com/indiatoday/2024-01/Sun%20explosion.gif?VersionId=M7tRyeMI_kIv5d2wZhyxWvS137fpktdf",
                                title: "Prediction of CME and Geomagnetic Storms",
                                description: "Explore space data with interactive visuals.",
                                link: "/CmePrediction",
                            },
                            {
                                img: "https://www.researchgate.net/publication/354492490/figure/fig1/AS:11431281172912159@1688689149214/The-total-electron-content-TEC-map-at-a-geomagnetic-quiet-time-from-Jet-Propulsion.png",
                                title: "Prediction of Change In Total Electron Count due to Space Weather Parameter",
                                description: "Explore space data with interactive visuals.",
                                link: "/ChangePredction",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="w-full transition-transform transform shadow-lg card md:w-96 backdrop-blur-lg rounded-2xl hover:-translate-y-1"
                                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                            >
                                <figure className="px-10 pt-10">
                                    <img src={item.img} alt={item.title} className="object-cover w-full rounded-xl h-60" />
                                </figure>
                                <div className="items-center text-center card-body">
                                    <h2 className="card-title">{item.title}</h2>
                                    <p className="text-gray-400">{item.description}</p>
                                    <div className="card-actions">
                                        <Link to={item.link} className="btn btn-primary">Explore More</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <SearchCard />

    {/* Our Technology Section */}
<div className="w-full p-6 my-12 shadow-lg backdrop-blur-3xl rounded-2xl lg:p-10 animated-section ">
    <h2 className="mb-6 text-3xl font-light text-center lg:text-5xl">Our Technology</h2>
    <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
        <div className="w-full lg:w-1/2" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img
                src="/technology.jpg"
                alt="Our Technology"
                className="object-cover w-full h-full shadow-md rounded-xl"
            />
        </div>
        <div className="flex flex-col justify-start w-full space-y-4 lg:w-1/2">
            <p className="text-sm leading-relaxed lg:text-base">
                We use LSTM models for accurate time-series predictions in astronomy.
            </p>
            <p className="text-sm leading-relaxed lg:text-base">
                CesiumJS helps us create 3D simulations of satellites for better visualization.
            </p>
            <p className="text-sm leading-relaxed lg:text-base">
                Our platform provides live monitoring and real-time alerts for quick decisions.
            </p>
            <p className="text-sm leading-relaxed lg:text-base">
                We combine machine learning and data science to solve complex space problems.
            </p>
        </div>
    </div>
</div>



            {/* Explore Space Weather Section */}
            <div className="flex flex-col items-center w-full p-6 my-12 space-y-8 shadow-xl backdrop-blur-xl rounded-2xl lg:p-10 animated-section">
                <h2 className="text-3xl font-light text-center lg:text-5xl">Explore Space Weather</h2>
                <p className="text-sm leading-relaxed text-center lg:text-base">
                    Analyze the impact of solar storms and cosmic rays on Earth systems with our intuitive tools.
                </p>
                <div className="flex flex-wrap justify-center gap-8">
                    {[
                        {
                            icon: "🌞",
                            title: "Solar Flares",
                            description: "Monitor solar flares and their impact on technology.",
                        },
                        {
                            icon: "🌌",
                            title: "Cosmic Rays",
                            description: "Track cosmic ray activity affecting Earth's atmosphere.",
                        },
                        {
                            icon: "🌍",
                            title: "Geomagnetic Fields",
                            description: "Examine Earth's geomagnetic field variations.",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 transition-transform transform shadow-lg card w-72 backdrop-blur-md rounded-2xl hover:-translate-y-1"
                            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                        >
                            <div className="mb-4 text-6xl">{item.icon}</div>
                            <h2 className="text-xl card-title">{item.title}</h2>
                            <p className="text-center text-gray-500">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works Section */}
            <div className="w-full p-6 my-12 shadow-xl backdrop-blur-xl rounded-2xl lg:p-10 animated-section">
                <h2 className="mb-6 text-3xl font-light text-center lg:text-5xl">How It Works</h2>
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8">
                    {[
                        {
                            step: "1️⃣",
                            title: "Satellite Data",
                            description: "Access real-time data through our system.",
                        },
                        {
                            step: "2️⃣",
                            title: "AI Analysis",
                            description: "AI processes data to predict phenomena.",
                        },
                        {
                            step: "3️⃣",
                            title: "Interactive Visualization",
                            description: "View results through dynamic tools.",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center w-full p-6 text-center transition-transform transform shadow-md rounded-xl hover:-translate-y-1"
                        >
                            <div className="mb-2 text-4xl">{item.step}</div>
                            <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-500 lg:text-base">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;