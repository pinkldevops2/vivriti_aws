// src/components/AdvisorySwiper.jsx
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import PropTypes from "prop-types";

/**
 * AdvisorySwiper component
 * @param {{ slides: Array }} props
 */
export default function AdvisorySwiper({ slides = [] }) {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!slides || slides.length === 0) {
    return null;
  }

  const totalSlides = slides.length;
  const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
  const nextIndex = (currentSlide + 1) % totalSlides;

  const prevTitle = slides[prevIndex]?.subtitle || "";
  const nextTitle = slides[nextIndex]?.subtitle || "";

  useEffect(() => {
    const handleGoToSlide = (e) => {
      if (swiperRef.current) {
        swiperRef.current.slideToLoop(e.detail);
      }
    };
    window.addEventListener("go-to-slide", handleGoToSlide);
    return () => window.removeEventListener("go-to-slide", handleGoToSlide);
  }, []);

  return (
    <div className="container mx-auto relative w-full">
      {/* Navigation + Titles */}
      <div className="slider-button flex justify-end flex-col md:flex-row absolute bottom-[-100px] md:bottom-[-85px] left-1/2 -translate-x-1/2 transform">
        <div className="flex justify-end mb-5 md:items-center items-end gap-4 md:gap-20">
          {/* Previous */}
          <div>
            <div className="flex gap-0 gap-y-[10px] md:gap-[45px] flex-col-reverse md:flex-row items-left">
              <div className="relative">
                <p className="uppercase md:mt-0 text-[14px] md:text-[18px] ">Previous</p>
                <h5 className="uppercase text-[14px] absolute left-[-90px] text-[#F58220] naviTitle md:w-[180px] text-right right-0">
                  {prevTitle}
                </h5>
              </div>

              <button
                className="swiper-button-prev-custom ml-auto md:margin-initial"
                aria-label="Previous Slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <rect width="30" height="30" transform="translate(30 0) rotate(90)" fill="#D9D9D9" />
                  <rect width="30" height="30" transform="translate(30 0) rotate(90)" fill="url(#paint0_linear_prev)" />
                  <path d="M19 8.75L11 15.25L19 21.25" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear_prev" x1="2.09514" y1="10.9509" x2="30.3383" y2="11.8298" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00018A"/>
                      <stop offset="1" stopColor="#3BBAE2"/>
                    </linearGradient>
                  </defs>
                </svg>
              </button>
            </div>
          </div>

          {/* Next */}
          <div>
            <div className="gap-0 gap-y-[10px] md:gap-[45px] min-w-[90px] flex flex-col md:flex-row items-start">
              <button className="swiper-button-next-custom" aria-label="Next Slide">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <rect width="30" height="30" transform="translate(0 30) rotate(-90)" fill="#D9D9D9"/>
                  <rect width="30" height="30" transform="translate(0 30) rotate(-90)" fill="url(#paint0_linear_next)"/>
                  <path d="M11 21.25L19 14.75L11 8.75" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear_next" x1="2.09514" y1="10.9509" x2="30.3383" y2="11.8298" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00018A"/>
                      <stop offset="1" stopColor="#3BBAE2"/>
                    </linearGradient>
                  </defs>
                </svg>
              </button>

              <div className="relative">
                <p className="uppercase text-[14px] md:text-[18px]">Next</p>
                <h5 className="uppercase text-[14px] absolute text-[#F58220] naviTitle w-[180px] text-left">
                  {nextTitle}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = ".swiper-button-prev-custom";
          swiper.params.navigation.nextEl = ".swiper-button-next-custom";
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id || slide.title}>
            <div className="pt-7 flex flex-col h-full">
              <div className="px-7 flex-1">
                <h4 className="uppercase text-[14px] text-[#F58220] mb-2">{slide.subtitle}</h4>
                <h2 className="text-[28px] md:text-[35px] font-heading leading-[120%] mb-8 gradient-text">{slide.title}</h2>
                <div className="flex flex-col md:flex-row justify-between md:gap-8 mb-4 md:mb-10">
                  {slide.paragraphs?.map((para) => (
                    <div key={`${slide.id}-${para}`} className="font-normal text-[17px] w-full md:w-6/12 text-[#1B1B1B]" dangerouslySetInnerHTML={{ __html: para }} />
                  ))}
                </div>
              </div>
              <img src={slide.img} alt={slide.title} className="w-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

AdvisorySwiper.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      img: PropTypes.string,
      paragraphs: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
