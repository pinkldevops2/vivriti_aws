// src/components/DrivingImpactSwiper.jsx
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function TechSwiper({ slides }) {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  // 🔑 Rebind navigation after mount (IMPORTANT)
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.prevEl =
        ".swiper-button-prev-custom";
      swiperRef.current.params.navigation.nextEl =
        ".swiper-button-next-custom";

      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className="mx-auto relative w-full py-0">
      <style>{`
        .text-description {
          min-height: 50px;
        }
      `}</style>

      {/* Navigation (Mobile) */}
      <div className="flex justify-end flex-col md:flex-row absolute bottom-[-70px] md:bottom-[-45px] left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0 md:bottom-auto">
        <div className="flex justify-end mb-5 items-center gap-5 md:hidden">
          <button
            className="swiper-button-prev-custom"
            aria-label="Previous Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="15" viewBox="0 0 45 15" fill="none">
              <path
                d="M0.29 7.99c-.39-.4-.39-1.03 0-1.42L6.66.28a1 1 0 0 1 1.41.02 1 1 0 0 1 0 1.41L2.41 7.31l5.66 5.72a1 1 0 1 1-1.41 1.41L.29 7.99ZM44.07 7.79v1L1 8.29v-2l43.07.5Z"
                fill="#555555"
              />
            </svg>
          </button>

          <button
            className="swiper-button-next-custom"
            aria-label="Next Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="15" viewBox="0 0 45 15" fill="none">
              <path
                d="M43.78 6.74c.39.4.39 1.03 0 1.41l-6.36 6.29a1 1 0 1 1-1.41-1.41l5.66-5.59-5.66-5.72a1 1 0 1 1 1.41-1.41l6.36 6.43ZM0 6.94v-1l43.07.5v2l-43.07-.5Z"
                fill="#555555"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Autoplay]}
        loop
        spaceBetween={0}
        slidesPerView={2}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full">
              <div className="w-full beyond_cap image-flash-container relative aspect-97/120 overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover object-top bg-[#F0F0F0]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#00000075] to-transparent"></div>

                <div className="relative py-5 px-6 md:px-8 text-white flex flex-col justify-end items-start h-full md:p-10">
                  <p className="text-base font-semibold uppercase">
                    {slide.title}
                  </p>
                  <span className="text-base font-light mt-1 text-description">
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