import $ from "jquery";
  import "slick-carousel";

  document.addEventListener("DOMContentLoaded", () => {
    const $slider = $(".slick-slider");

    $slider.on("init", function (event, slick) {
      // Animate first slide on init
      const $currentSlide = $(slick.$slides[slick.currentSlide]);
      animateOverlay($currentSlide);
    });

    $slider.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      const $nextSlide = $(slick.$slides[nextSlide]);
      // Reset animations before next slide
      $(".overlay span, .overlay p, .overlay .blog_date").removeClass("animate");
      setTimeout(() => animateOverlay($nextSlide), 300);
    });

    $slider.slick({
      dots: true,
      arrows: true,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3500,
      fade: true,
      cssEase: "ease-in-out",
    });

    function animateOverlay($slide) {
      const $overlay = $slide.find(".overlay");
      const $elements = $overlay.find("span, p, .blog_date");
      $elements.each((index, el) => {
        setTimeout(() => {
          $(el).addClass("animate");
        }, index * 200); // stagger each element by 200ms
      });
    }
  });