import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4; // Total number of slides

  const slideTexts = [
    "Possibility of Satellite Imaging at Particular Location",
    "Prediction and Modeling of Magnetic Reconnection and Predict DST",
    "Prediction of Space Weather Parameter and Indexs",
    "Prediction of CME and Geomagnetic Storms",
  ];

  const slideTitle = [
    "Explore the cosmos with precision.",
    "Track satellites in real-time",
    "Harness the power of AI",
    "Your gateway to the Space",
  ];

  const imageUrls = [
    "https://static.wixstatic.com/media/11062b_8f5bd2606d804635891c69668f29e855~mv2_d_6000_4000_s_4_2.jpg/v1/fill/w_1378,h_745,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_8f5bd2606d804635891c69668f29e855~mv2_d_6000_4000_s_4_2.jpg",
    "hero2.png",
    "hero3.jpg",
    "hero4.avif",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="carousel w-full overflow-hidden relative shadow-lg rounded-2xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {imageUrls.map((url, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img
              src={url}
              className="w-full object-cover h-[500px]" // Increase the height here
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-end justify-start bg-black bg-opacity-30">
              <div className="pb-16 pl-16 text-start w-1/2">
                <h1 className="text-white font-medium text-3xl lg:text-7xl ">{slideTitle[index]}</h1>
                <h2 className="text-white font-medium text-2xl">{slideTexts[index]}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 flex justify-between">
        <button
          className="btn btn-circle"
          onClick={() =>
            setCurrentSlide((prevSlide) =>
              prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
            )
          }
        >
          ❮
        </button>
        <button
          className="btn btn-circle"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides)
          }
        >
          ❯
        </button>
      </div> */}
    </div>
  );
};

export default Carousel;