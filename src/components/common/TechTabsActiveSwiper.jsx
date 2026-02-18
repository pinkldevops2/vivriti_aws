import { useRef, useState } from "react";
import PropTypes from "prop-types"; // ✅ add this
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function TechtabsSwiper({ slides }) {
  const swiperRef = useRef(null);

  const [activeTab, setActiveTab] = useState(slides[0]?.id || null);

  const handleTabClick = (id, index) => {
    setActiveTab(id);
    swiperRef.current?.slideToLoop(index, 0);
    window.dispatchEvent(
      new CustomEvent("tab-change", {
        detail: { id },
      })
    );
  };

  return (
    <div role="tablist" className="mx-auto relative w-full py-0">
      <style>{`
        button.techtabs-btn:not(.tabactive) {
          color:#000;
          padding-top: 20px;
          padding-bottom: 20px;
          transition: all 0.3s ease-in-out;
        }
        .tabactive {
          color:#fff !important;
          padding-top: 40px;
          padding-bottom: 40px;
          background: linear-gradient(
            312deg,
            rgba(59, 186, 226, 1),
            rgba(0, 1, 138, 1)
          );
        }
        .tabactive p {
          font-weight: 700;
        }
      `}</style>

      {/* Navigation Buttons */}
      <div className="flex justify-end mb-5 items-center gap-5">
        <button className="swiper-button-prev-custom" aria-label="Previous Slide">
          Prev
        </button>
        <button className="swiper-button-next-custom" aria-label="Next Slide">
          Next
        </button>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={3}
        loop
        autoplay={{ delay: 250000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
        }}
        onSlideChange={(swiper) => {
          const realIndex = swiper.realIndex;
          const selectedTab = slides[realIndex].id;
          setActiveTab(selectedTab);
          window.dispatchEvent(
            new CustomEvent("tab-change", {
              detail: { id: selectedTab },
            })
          );
          swiper.slideToLoop(realIndex, 0);
        }}
      >
        {slides.map((tab) => (
          <SwiperSlide key={tab.id}>
            <button
              role="tab"
              className={`techtabs-btn px-8 w-full text-left border border-dashed border-[#F58220] transition ${
                activeTab === tab.id ? "tabactive" : ""
              }`}
              aria-selected={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id, slides.indexOf(tab))}
            >
              <h4 className="text-[28px] md:text-[35px] font-normal mb-3">
                {tab.num}.
              </h4>
              <p className="text-[16px] md:text-[18px] uppercase">{tab.title}</p>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// ✅ Add prop types validation
TechtabsSwiper.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
    })
  ).isRequired,
};
 