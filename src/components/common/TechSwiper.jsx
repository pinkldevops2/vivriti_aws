import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function TechSwiper({ slides }) {
  const swiperRef = useRef(null);

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
            {/* SVG here */}
          </button>

          <button
            className="swiper-button-next-custom"
            aria-label="Next Slide"
          >
            {/* SVG here */}
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
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id || slide.title}>
            <div className="w-full">
              <div className="w-full beyond_cap image-flash-container relative aspect-97/120 overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover object-top bg-[#F0F0F0]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00000075] to-transparent"></div>
                <div className="relative py-5 px-6 md:px-8 text-white flex flex-col justify-end items-start h-full md:p-10">
                  <p className="text-base font-semibold uppercase">{slide.title}</p>
                  <span className="text-base font-light mt-1 text-description">{slide.desc}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// ✅ PropTypes validation
TechSwiper.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      img: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      desc: PropTypes.string,
    })
  ).isRequired,
};
