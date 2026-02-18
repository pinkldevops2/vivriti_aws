// src/components/SwiperSlider.jsx
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import LogoShape from '../../../public/Vivrithi_logo.svg';

export default function SwiperSlider({ slides }) {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  if (!slides || !slides.length) return null;

  return (
    <div className="relative w-full testimonials">
      <div className="container mx-auto flex justify-between pb-8 flex-col md:flex-row px-4">
        <h2 className="text-[35px] md:text-4xl font-heading leading-[120%] gradient-text">
          Trusted by emerging<br/>market leaders
        </h2>
        <div className="w-[40%] flex items-end hidden md:flex">
          <h2 className="text-[35px] md:text-4xl font-heading leading-[35px] gradient-text">
            {currentSlide}
          </h2>{" "}
          / <span className="text-gray-700 font-medium">{slides.length}</span>
        </div>

        {/* Navigation & Counter */}
        <div className="flex justify-center items-center gap-6 mt-8">        
          <button className="swiper-button-prev-custom transition" aria-label="Previous Slide">
            <svg width="45" height="15" viewBox="0 0 45 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.292941 7.98894C-0.0975572 7.59388 -0.0975572 6.96071 0.292941 6.57472L6.65647 0.284639C7.04697 -0.101352 7.68009 -0.0940023 8.07059 0.301055C8.46109 0.696113 8.46109 1.32928 8.07059 1.71527L2.41412 7.30646L8.07059 13.029C8.46109 13.424 8.46109 14.0572 8.07059 14.4432C7.68009 14.8292 7.04697 14.8218 6.65647 14.4268L0.292941 7.98894ZM44.0692 7.79004L44.0692 8.79004L1 8.29004L1 7.29004L1 6.29004L44.0692 6.79004L44.0692 7.79004Z" fill="#555555"/>
            </svg>
          </button>

          <button className="swiper-button-next-custom transition" aria-label="Next Slide">
            <svg width="45" height="15" viewBox="0 0 45 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M43.7754 6.73909C44.1659 7.13415 44.1659 7.76731 43.7754 8.1533L37.4119 14.4434C37.0214 14.8294 36.3883 14.822 35.9978 14.427C35.6073 14.0319 35.6073 13.3987 35.9978 13.0128L41.6542 7.42157L35.9978 1.69905C35.6073 1.30399 35.6073 0.670827 35.9978 0.284836C36.3883 -0.101155 37.0214 -0.0938047 37.4119 0.301253L43.7754 6.73909ZM-0.000825914 6.93799L-0.000825871 5.93799L43.0684 6.43799L43.0684 7.43799L43.0684 8.43799L-0.000825958 7.93799L-0.000825914 6.93799Z" fill="#555555"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={2.5}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2.5 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id || index}>
            <div className="relative">
              <img src={LogoShape.src} alt="Vivrithi Logo" className="w-12 h-12 absolute right-5 top-0 logo_in_texti" />
              
              <div className="quote_icon mb-[25px]">
                {/* ... SVG content ... */}
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M31.7812 11.3518C31.5245 11.3518 31.2678 11.3518 31.0111 11.4C31.4724 7.26789 32.8602 3.41953 35.0161 1.83963e-07C27.6738 3.89462 22.6943 11.1625 22.4899 19.5235V19.9985C22.4899 24.7485 26.6494 28.5969 31.7837 28.5969C36.9158 28.5487 41.0754 24.7005 41.0754 19.9505C41.0754 15.2005 36.9155 11.3518 31.7812 11.3518Z" fill="black"/>
<path d="M31.7812 11.3518C31.5245 11.3518 31.2678 11.3518 31.0111 11.4C31.4724 7.26789 32.8602 3.41953 35.0161 1.83963e-07C27.6738 3.89462 22.6943 11.1625 22.4899 19.5235V19.9985C22.4899 24.7485 26.6494 28.5969 31.7837 28.5969C36.9158 28.5487 41.0754 24.7005 41.0754 19.9505C41.0754 15.2005 36.9155 11.3518 31.7812 11.3518Z" fill="url(#paint0_linear_1_5)"/>
<path d="M9.29334 28.5491C14.4274 28.5491 18.5871 24.7008 18.5871 19.9506C18.5871 15.2004 14.4276 11.3522 9.29334 11.3522C9.03663 11.3522 8.77993 11.3522 8.52322 11.4004C8.98449 7.26828 10.3723 3.41992 12.5282 0.00039086C5.18596 3.84865 0.204337 11.1145 -4.7163e-08 19.4754V19.9504C-4.7163e-08 24.7004 4.15903 28.5491 9.29334 28.5491Z" fill="black"/>
<path d="M9.29334 28.5491C14.4274 28.5491 18.5871 24.7008 18.5871 19.9506C18.5871 15.2004 14.4276 11.3522 9.29334 11.3522C9.03663 11.3522 8.77993 11.3522 8.52322 11.4004C8.98449 7.26828 10.3723 3.41992 12.5282 0.00039086C5.18596 3.84865 0.204337 11.1145 -4.7163e-08 19.4754V19.9504C-4.7163e-08 24.7004 4.15903 28.5491 9.29334 28.5491Z" fill="url(#paint1_linear_1_5)"/>
                  <defs>
                    <linearGradient id="paint0_linear_1_5" x1="39.7774" y1="18.1582" x2="22.2705" y2="17.8041" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00018A"/>
                      <stop offset="1" stopColor="#3BBAE2"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_1_5" x1="17.289" y1="18.1279" x2="-0.219384" y2="17.7732" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00018A"/>
                      <stop offset="1" stopColor="#3BBAE2"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>            

              <div className="w-[75%]">
                <p>{slide.title}</p>
              </div>

              <div className="author_block flex justify-between items-end mt-[80px]">
                <div className="author_pic_name flex items-center gap-4">
                  <img src='/Ellipse 39.png' alt="Author"/>
                  <div className="author_data pl-4">
                    <h3 className='mb-2'>John Doe</h3>
                    <p className='text-sm'>CTO, Ailitic<br/>Bangalore, India</p>
                  </div>
                </div>
                <img src='/image 835.png' alt="Author company" className='border border-[#D5D6D8] border-solid rounded-[50px] p-2 w-[110px]' />
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// PropTypes validation
SwiperSlider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};
