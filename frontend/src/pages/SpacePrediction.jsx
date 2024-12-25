import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import DATA from '../Constant';

const SpacePrediction = () => {
    const [url, setUrl] = useState('');
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const currentPage = pathParts[pathParts.length - 1];

    // Refs for GSAP to manipulate
    const containerRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        setUrl(currentPage);
    }, [currentPage]);

    useEffect(() => {
        // Clear refs on url change
        itemsRef.current = [];
        // GSAP animation setup
        gsap.from(itemsRef.current, {
            duration: 1.5,
            y: 50,
            opacity: 0,
            stagger: 0.3,
            ease: 'power3.out',
            delay: 0.5,
        });
    }, [url]);

    const data = DATA[url];

    return (
        <div className="py-10 mx-6 my-10 space-y-10 rounded-lg shadow-md backdrop-blur-lg lg:mx-24">
            <div ref={containerRef} className="container px-6 mx-auto my-10 space-y-12 lg:px-24">
                {data?.map((item, index) => (
                    <div
                        key={index}
                        className="mb-12"
                        ref={el => itemsRef.current[index] = el} // Assign each item to refs
                    >
                        {item.type !== 'conclusion' && (
                            <h2 className="mb-4 text-2xl font-semibold text-secondary">{item.title}</h2>
                        )}
                        {item.type === 'video' && (
                            <>
                                <h1 className="mb-6 text-4xl font-bold text-primary">{item.title}</h1>
                                <video
                                    className="w-full h-[500px] object-cover rounded-lg mb-4"
                                    autoPlay
                                    loop
                                    muted
                                    poster={item.poster}
                                >
                                    <source src={item.videoPath} type="video/mp4" />
                                    {item.videoDescription}
                                </video>
                            </>
                        )}
                        {item.type === 'section' && (
                            <div className={`flex flex-col lg:flex-row items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                                <img src={item.imagePath} alt={item.title} className="w-full h-auto mb-4 rounded-lg lg:w-2/5 lg:mb-0 lg:mr-6" />
                                <p className="text-lg leading-relaxed text-start lg:w-3/5 lg:pr-6">
                                    {item.text}
                                </p>
                            </div>
                        )}
                        {item.type === 'conclusion' && (
                            <p className="text-lg leading-relaxed">
                                <b>{item.title}:</b> {item.text}
                            </p>
                        )}
                    </div>
                ))}
            </div>
            <a href='https://special-robot-57g65vjqgj6f77gq-8501.app.github.dev/'>
                <button className="btn btn-wide">Explore Now</button>
            </a>
            {/* <a href='http://cosmos-st.streamlit.app'>
                <button className="btn btn-wide">Explore Now</button>
            </a> */}
        </div>
    );
};

export default SpacePrediction;