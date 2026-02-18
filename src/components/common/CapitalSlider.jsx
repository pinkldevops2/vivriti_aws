// src/components/DrivingImpactSwiper.jsx
import { useRef } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import arrow_left_mob from '../../../public/arrow_left_mob.svg';

export default function CapitalSwiper({ slides }) {
  const swiperRef = useRef(null);

  return (
    <div className="driving-impact-slider relative w-full bg-[#e8ebf7] py-4">
      {/* Navigation */}
      <style>
        {`
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 50;
        }

        .swiper-button-prev-custom::after,
        .swiper-button-next-custom::after {
          font-size: 18px;
          color: #000;
        }
        `}
      </style>

      <Swiper
        modules={[Navigation, Autoplay]}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id} // ✅ Use unique id as key
            style={{ width: "90%" }}
          >
            <div className="relative h-full flex flex-col justify-between">
              <div className="number_fill text-sm gradient-text font-heading text-[40px] font-medium">
                {slide.id}
              </div>

              <div className="content_fill">
                <h3 className="text-lg gradient-text text-[18px] font-medium">{slide.title}</h3>
                <p className="mt-2 desc md:text-lg">{slide.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev / Next Buttons */}
      <div className="container mx-auto flex justify-center items-center mb-4 gap-4 pt-4">
        <button className="swiper-button-prev-custom" aria-label="Previous Slide">
          <img src={arrow_left_mob.src} alt="Previous" className="rotate-180" />
        </button>
        <button className="swiper-button-next-custom" aria-label="Next Slide">
          <img src={arrow_left_mob.src} alt="Next" className="" />
        </button>
      </div>
    </div>
  );
}

// ✅ PropTypes validation
CapitalSwiper.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    })
  ).isRequired,
};
