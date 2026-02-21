const heading = document.getElementById("categoriesHeading");
const list = document.getElementById("categoriesList");
const angle = document.getElementById("catAngle");

  heading.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      list.classList.toggle("active");
      angle.classList.toggle("rotate");
    }
  });

  // Reset on desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      list.classList.remove("active");
      angle.classList.remove("rotate");
      list.style.maxHeight = "none";
    }
  });



  const topNewsHeading = document.getElementById("topNewsHeading");
  const topNewsList = document.getElementById("topNewsList");
  const newsArrow = document.getElementById("newsArrow");

  topNewsHeading.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      topNewsList.classList.toggle("active");
      newsArrow.classList.toggle("rotate");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      topNewsList.classList.remove("active");
      newsArrow.classList.remove("rotate");
      topNewsList.style.maxHeight = "none";
    }
  });