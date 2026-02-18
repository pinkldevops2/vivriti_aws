// src/components/DrivingImpactSwiper.jsx
import { useRef } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function TechArtemisSwiper({ slides }) {
  const swiperRef = useRef(null);

  if (!slides || !slides.length) return null;

  return (
    <div className="mx-auto relative w-full py-0">
      <style>{`
        .text-description {
          min-height:50px;
        }
      `}</style>

      {/* Header and Counter / Navigation */}
      <div className="flex justify-end flex-col md:flex-row absolute bottom-[-45px] left-1/2 -translate-x-1/2 transform md:relative md:left-[initial] md:translate-x-[initial] md:bottom-[initial]">
        <div className="flex justify-end mb-5 items-center gap-5">
          <button className="swiper-button-prev" aria-label="Previous Slide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="15"
              viewBox="0 0 45 15"
              fill="none"
            >
              <path
                d="M43.7754 6.73909C44.1659 7.13415 44.1659 7.76731 43.7754 8.1533L37.4119 14.4434C37.0214 14.8294 36.3883 14.822 35.9978 14.427C35.6073 14.0319 35.6073 13.3987 35.9978 13.0128L41.6542 7.42157L35.9978 1.69905C35.6073 1.30399 35.6073 0.670827 35.9978 0.284836C36.3883 -0.101155 37.0214 -0.0938047 37.4119 0.301253L43.7754 6.73909ZM-0.000825914 6.93799L-0.000825871 5.93799L43.0684 6.43799L43.0684 7.43799L43.0684 8.43799L-0.000825958 7.93799L-0.000825914 6.93799Z"
                fill="#555555"
              />
            </svg>
          </button>
          <button className="swiper-button-next" aria-label="Next Slide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="15"
              viewBox="0 0 45 15"
              fill="none"
            >
              <path
                d="M0.292941 7.98894C-0.0975572 7.59388 -0.0975572 6.96071 0.292941 6.57472L6.65647 0.284639C7.04697 -0.101352 7.68009 -0.0940023 8.07059 0.301055C8.46109 0.696113 8.46109 1.32928 8.07059 1.71527L2.41412 7.30646L8.07059 13.029C8.46109 13.424 8.46109 14.0572 8.07059 14.4432C7.68009 14.8292 7.04697 14.8218 6.65647 14.4268L0.292941 7.98894ZM44.0692 7.79004L44.0692 8.79004L1 8.29004L1 7.29004L1 6.29004L44.0692 6.79004L44.0692 7.79004Z"
                fill="#555555"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={2}
        centeredSlides={false}
        loop
        autoplay={{
          delay: 250000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id || slide.img}>
            <div className="w-full">
              <div className="w-full beyond_cap image-flash-container relative aspect-97/120 overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover object-top bg-[#F0F0F0]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#00000075] to-[#6361ff00]" />
                <div className="relative py-5 px-6 md:px-8 text-white flex flex-col justify-end items-start h-full md:p-10">
                  <p className="text-base font-semibold uppercase md:min-h-15">{slide.title}</p>
                  <span className="text-left text-base block mt-[5px] font-light min-h-0 hidden md:min-h-10">
                    {slide.desc}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// PropTypes validation
TechArtemisSwiper.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      desc: PropTypes.string,
    })
  ).isRequired,
};
