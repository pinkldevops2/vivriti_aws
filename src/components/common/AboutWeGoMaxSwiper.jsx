// src/components/DrivingImpactSwiper.jsx
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import PropTypes from "prop-types";
import LogoShape from '../../../public/Vivrithi_logo.svg';

export default function DrivingImpactSwiper({ slides }) {
  const swiperRef = useRef(null);

  return (
    <div className="driving-impact-slider relative w-full">
      {/* Navigation */}
      <div className="relative">
        <div className="container mx-auto flex justify-center items-center mb-4 gap-5 absolute bottom-[-45px] left-1/2 -translate-x-1/2 transform">
          <button className="swiper-button-prev-custom" aria-label="Previous Slide">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="15" viewBox="0 0 45 15" fill="none">
              <path d="M0.292941 7.98894C-0.0975572 7.59388 -0.0975572 6.96071 0.292941 6.57472L6.65647 0.284639C7.04697 -0.101352 7.68009 -0.0940023 8.07059 0.301055C8.46109 0.696113 8.46109 1.32928 8.07059 1.71527L2.41412 7.30646L8.07059 13.029C8.46109 13.424 8.46109 14.0572 8.07059 14.4432C7.68009 14.8292 7.04697 14.8218 6.65647 14.4268L0.292941 7.98894ZM44.0692 7.79004L44.0692 8.79004L1 8.29004L1 7.29004L1 6.29004L44.0692 6.79004L44.0692 7.79004Z" fill="#555555"/>
            </svg>
          </button>
          <button className="swiper-button-next-custom" aria-label="Next Slide">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="15" viewBox="0 0 45 15" fill="none">
              <path d="M43.7754 6.73909C44.1659 7.13415 44.1659 7.76731 43.7754 8.1533L37.4119 14.4434C37.0214 14.8294 36.3883 14.822 35.9978 14.427C35.6073 14.0319 35.6073 13.3987 35.9978 13.0128L41.6542 7.42157L35.9978 1.69905C35.6073 1.30399 35.6073 0.670827 35.9978 0.284836C36.3883 -0.101155 37.0214 -0.0938047 37.4119 0.301253L43.7754 6.73909ZM-0.000825914 6.93799L-0.000825871 5.93799L43.0684 6.43799L43.0684 7.43799L43.0684 8.43799L-0.000825958 7.93799L-0.000825914 6.93799Z" fill="#555555"/>
            </svg>
          </button>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          centeredSlides={true}
          loop={true}
          slidesPerView="auto"
          spaceBetween={20}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide
              key={slide.id} // ✅ use unique id instead of index
              style={{ width: "75%", height: 'auto' }}
            >
              <div className="relative p-6 banner_sub_grid_item_bg text-white driving-impact-card h-full flex flex-col justify-between">
                <div className="number_fill text-sm">{slide.id}</div>
                <div className="content_fill mt-4">
                  <h3 className="text-lg uppercase">{slide.title}</h3>
                  <p className="mt-2 desc text-sm md:text-lg">{slide.desc}</p>
                </div>
                <img
                  src={LogoShape.src}
                  alt="Vivrithi"
                  className="w-[50px] h-auto absolute right-2 top-2"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="bg-white w-full px-[20px]">
        <a 
          href="/contact" 
          className="contact_cta w-full md:w-auto inline-flex mt-[50px] contact_cta3 items-center gap-2 text-white uppercase hover:text-blue-600 transition mb-2 px-[30px] py-[10px] text-[14px] justify-center"
        >
          <span data-text="Know our story">Know our story</span>
          <img src={LogoShape.src} alt="Vivrithi" className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}


DrivingImpactSwiper.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, 
      title: PropTypes.string.isRequired,
      desc: PropTypes.string,
      img: PropTypes.string,
    })
  ).isRequired,
};
