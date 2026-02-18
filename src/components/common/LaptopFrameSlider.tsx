import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface LaptopFrameSliderProps {
  readonly laptopImage: string;
  readonly slides: readonly string[];
  readonly sliderId?: string;
}

export default function LaptopFrameSlider({
  laptopImage,
  slides = [],
  sliderId = "laptop",
}: LaptopFrameSliderProps) {
  const swiperRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const nextClass = `${sliderId}-next`;
  const prevClass = `${sliderId}-prev`;

  // 🔥 Handle tab visibility automatically
  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && swiperRef.current) {
          swiperRef.current.update();
          swiperRef.current.autoplay?.start();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="laptop-frame-wrapper" ref={wrapperRef}>
      {/* Laptop Image */}
      <img
        src={laptopImage}
        alt="Laptop Frame"
        className="laptop-frame"
      />
      {/* Screen Area */}
      <div className="laptop-screen">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          loop
          observer
          observeParents
          resizeObserver
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: `.${nextClass}`,
            prevEl: `.${prevClass}`,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="laptop-swiper"
        >
          {slides.map((img) => (
            <SwiperSlide key={img}>
              <img
                src={img}
                alt={`Slide for ${img}`}
                className="slide-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
