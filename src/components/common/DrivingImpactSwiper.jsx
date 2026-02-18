// src/components/DrivingImpactSwiper.jsx
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import LogoShape from '../../../public/Vivrithi_logo.svg';

/**
 * @typedef {Object} Slide
 * @property {string|number} id
 * @property {string} title
 * @property {string} desc
 */

/**
 * @param {{ slides: Slide[] }} props
 */
export default function DrivingImpactSwiper({ slides }) {
  const swiperRef = useRef(null);

  return (
    <div className="driving-impact-slider relative w-full">
      {/* Navigation */}
      <div className="relative">
        <div className="container mx-auto flex justify-center items-center mb-4 absolute bottom-[-45px] left-1/2 -translate-x-1/2 gap-5">
          <button className="swiper-button-prev-custom" aria-label="Previous Slide">
            {/* SVG here */}
          </button>
          <button className="swiper-button-next-custom" aria-label="Next Slide">
            {/* SVG here */}
          </button>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"} // Show partial slides
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
              key={slide.id || slide.title} // ✅ Unique key
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
          href="/about" 
          className="contact_cta w-full md:w-auto inline-flex mt-[50px] items-center gap-2 text-white uppercase hover:text-blue-600 transition mb-2 px-[30px] py-[10px] text-[14px] justify-center"
        >
          <span data-text="Know our story">Know our story</span>
          <img src={LogoShape.src} alt="Vivrithi" className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
