import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function TechtabsSwiper({ slides }) {
  const swiperRef = useRef(null);

  const [activeTab, setActiveTab] = useState(slides[0]?.id || null);
  const [showNav, setShowNav] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleTabClick = (id) => {
    setActiveTab(id);

    window.dispatchEvent(
      new CustomEvent("tab-change", {
        detail: { id },
      })
    );
  };

  // Recalculate navigation on resize
  useEffect(() => {
    const handleResize = () => {
      const swiper = swiperRef.current;
      if (!swiper) return;

      const visibleSlides =
        typeof swiper.params.slidesPerView === "number"
          ? swiper.params.slidesPerView
          : 1;

      setShowNav(swiper.slides.length > visibleSlides);
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div role="tablist" className="mx-auto relative w-full py-0">
      <style>{`
        button.techtabs-btn:not(.tabactive) {
          color:#000;
          transition: all 0.3s ease-in-out;
          padding: 20px 40px;
        }
        .tabactive {
          color: #fff !important;
          padding: 40px 40px;
          background: linear-gradient(
            312deg,
            rgba(59, 186, 226, 1) 0%,
            rgba(0, 1, 138, 1) 100%
          );
        }
        .tabactive p {
          font-weight: 700;
        }
        button.techtabs-btn:not(.tabactive):hover {
          color: #fff !important;
          background: linear-gradient(
            312deg,
            rgba(59, 186, 226, 1) 0%,
            rgba(0, 1, 138, 1) 100%
          );
        }
      `}</style>

      {/* Navigation Buttons */}
      {showNav && (
        <div className="flex justify-end flex-col md:flex-row absolute bottom-[-45px] left-1/2 -translate-x-1/2 md:relative md:bottom-auto md:left-auto md:translate-x-0">
          <div className="flex justify-end mb-5 items-center gap-5">
            {!isBeginning && (
              <button
                className="swiper-button-prev-custom"
                aria-label="Previous Slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="15" viewBox="0 0 45 15" fill="none">
                  <path d="M0.292941 7.98894L6.65647 0.284639M0.292941 7.98894L6.65647 14.4268M0.292941 7.98894L44.0692 7.79004" stroke="#555" />
                </svg>
              </button>
            )}

            {!isEnd && (
              <button
                className="swiper-button-next-custom"
                aria-label="Next Slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="15" viewBox="0 0 45 15" fill="none">
                  <path d="M43.7754 6.73909L37.4119 14.4434M43.7754 6.73909L37.4119 0.301253M43.7754 6.73909L0 6.93799" stroke="#555" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      <Swiper        
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={3}
        loop={false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;

          const visibleSlides =
            typeof swiper.params.slidesPerView === "number"
              ? swiper.params.slidesPerView
              : 1;

          setShowNav(swiper.slides.length > visibleSlides);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
        }}
      >
        {slides.map((tab, index) => (
          <SwiperSlide key={index}>
            <button
              role="tab"
              className={`techtabs-btn border border-dashed border-[#F58220] w-full text-left px-8 ${
                activeTab === tab.id ? "tabactive" : ""
              }`}
              aria-selected={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
            >
              <h4 className="text-[28px] md:text-[35px] mb-3">{tab.num}.</h4>
              <p className="text-[16px] md:text-[18px] uppercase">
                {tab.title}
              </p>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}