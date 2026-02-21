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
  arrows: false, // desktop hides arrows
  infinite: true, // autoplay infinite continues
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  fade: true,
  cssEase: "ease-in-out",

  nextArrow: `
    <button type="button" class="slick-next custom-arrow">
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="12" viewBox="0 0 44 12" fill="none">
        <path d="M43.5987 5.05444C43.8915 5.35073 43.8915 5.82561 43.5987 6.1151L38.826 10.8327C38.5331 11.1222 38.0583 11.1166 37.7654 10.8204C37.4725 10.5241 37.4725 10.0492 37.7654 9.75969L42.0078 5.5663L37.7654 1.27441C37.4725 0.978116 37.4725 0.503243 37.7654 0.21375C38.0583 -0.0757439 38.5331 -0.0702313 38.826 0.226062L43.5987 5.05444ZM-0.000825914 5.07861L-0.000825914 4.32861L43.0684 4.82861L43.0684 5.57861L43.0684 6.32861L-0.000825914 5.82861L-0.000825914 5.07861Z" fill="#666666"/>
      </svg>
    </button>
  `,

  prevArrow: `
    <button type="button" class="slick-prev custom-arrow">
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="12" viewBox="0 0 44 12" fill="none" style="transform:rotate(180deg)">
        <path d="M43.5987 5.05444C43.8915 5.35073 43.8915 5.82561 43.5987 6.1151L38.826 10.8327C38.5331 11.1222 38.0583 11.1166 37.7654 10.8204C37.4725 10.5241 37.4725 10.0492 37.7654 9.75969L42.0078 5.5663L37.7654 1.27441C37.4725 0.978116 37.4725 0.503243 37.7654 0.21375C38.0583 -0.0757439 38.5331 -0.0702313 38.826 0.226062L43.5987 5.05444ZM-0.000825914 5.07861L-0.000825914 4.32861L43.0684 4.82861L43.0684 5.57861L43.0684 6.32861L-0.000825914 5.82861L-0.000825914 5.07861Z" fill="#666666"/>
      </svg>
    </button>
  `,

  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: true,
        dots: false
      }
    }
  ]
});



$slider.on("afterChange", function(event, slick, current){
  const $prev = $(".slick-prev svg path");
  const $next = $(".slick-next svg path");

  if (current === 0) {
    $prev.css("opacity", 0.3);
    $prev.css("pointer-events", "none");
  } else {
    $prev.css("opacity", 1);
    $prev.css("pointer-events", "auto");
  }

  if (current === slick.slideCount - 1) {
    $next.css("opacity", 0.3);
    $next.css("pointer-events", "none");
  } else {
    $next.css("opacity", 1);
    $next.css("pointer-events", "auto");
  }
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