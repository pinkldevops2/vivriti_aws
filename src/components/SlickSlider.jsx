import React, { useEffect } from "react";
import PropTypes from "prop-types"; // ✅ add prop-types
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";

/**
 * Reusable Slick Slider component for Astro.
 * @param {string} id - Unique ID for the slider instance.
 * @param {Array} slides - Array of slide objects (title, text, img, id, etc.)
 * @param {Object} settings - Optional slick settings override.
 */
export default function SlickSlider({ id = "astro-slider", slides = [], settings = {} }) {
  useEffect(() => {
    const selector = `#${id}`;
    if ($(selector).hasClass("slick-initialized")) return;

    $(selector).slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      ...settings,
    });

    return () => {
      if ($(selector).hasClass("slick-initialized")) {
        $(selector).slick("unslick");
      }
    };
  }, [id, settings]);

  return (
    <div id={id} className="slick-slider-container">
      {slides.map((slide, index) => (
        <div
          key={slide.id || `${id}-${index}`} // ✅ use unique id if available
          className="px-6 py-8 bg-gray-100 text-center rounded-lg flex flex-col items-center justify-center"
        >
          {slide.img && (
            <img
              src={slide.img}
              alt={slide.title || `Slide ${index + 1}`}
              className="w-full h-64 object-cover mb-4 rounded-md"
            />
          )}
          {slide.title && <h3 className="text-lg font-semibold mb-2">{slide.title}</h3>}
          {slide.text && <p className="text-gray-600">{slide.text}</p>}
        </div>
      ))}
    </div>
  );
}

// ✅ Add PropTypes validation
SlickSlider.propTypes = {
  id: PropTypes.string,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      img: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
    })
  ).isRequired,
  settings: PropTypes.object,
};
