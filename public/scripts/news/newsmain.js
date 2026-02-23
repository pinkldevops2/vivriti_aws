document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const topNewsContainer = document.getElementById("topNewsList");
  const searchInput = document.getElementById("searchInput");
  const container = document.getElementById("news-container");
  const paginationEl = document.getElementById("pagination");
  const categoriesUl = document.getElementById("categoriesUl");

  // State
  let newsData = [];
  let filteredData = [];
  let currentPage = 1;
  const itemsPerPage = 10;
  let activeCategory = "media-kit";

  // ---------------- HELPERS ----------------

  /**
   * Sanitizes strings to prevent XSS. 
   * Vital for SonarQube "Security Hotspot" flags.
   */
  function sanitize(str) {
    if (!str) return "";
    const temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  }

  function formatDate(d) {
    if (!d) return "";
    const date = new Date(d);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  }

  function getReadingTime(htmlContent) {
    if (!htmlContent) return "1 min read";
    const text = htmlContent.replace(/<[^>]*>/g, "").trim();
    const words = text.split(/\s+/).length;
    const wordsPerMinute = 200;
    return `${Math.max(1, Math.ceil(words / wordsPerMinute))} min read`;
  }

  // ---------------- TEMPLATES ----------------

  const MEDIA_KIT_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="34" viewBox="0 0 106 95" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M29.2189 58.7612C26.5688 64.4007 25.0938 70.6847 25.0938 77.3164C25.0938 83.4138 26.3459 89.2144 28.61 94.4977C33.1468 83.9057 42.066 76.2648 52.5546 71.2783C51.5255 70.7865 50.4792 70.3285 49.4157 69.8875C42.8635 67.1738 35.8568 63.7901 29.2189 58.7697V58.7612Z" fill="url(#paint0_linear)"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M105.109 0C105.109 0 74.3896 16.24 52.5547 33.1669C58.4122 37.704 63.6351 42.3004 67.4429 46.6338C70.8991 50.1532 73.7635 54.2493 75.8818 58.7608C89.3464 48.5928 101.327 31.6998 105.101 0H105.109Z" fill="url(#paint1_linear)"/>
      <path d="M75.8904 58.7608C75.0614 59.3884 75.0614 59.3884 75.8904 58.7608C73.7721 54.2493 70.9076 50.1532 67.4515 46.6423C63.6351 42.3003 58.4208 37.7124 52.5633 33.1669C50.1219 35.0609 50.1219 35.0609 52.5633 33.1669C30.7198 16.24 0 0 0 0C3.77351 31.6913 15.763 48.5843 29.219 58.7608C35.8655 63.7812 42.8636 67.1649 49.4158 69.8787C50.4792 70.3197 51.517 70.7861 52.5547 71.2695C52.5633 71.2695 52.5718 71.2695 52.5804 71.261C52.5718 71.261 52.5633 71.2695 52.5547 71.2779C63.0004 76.239 71.8767 83.829 76.4393 94.3447C76.465 94.4041 76.5508 94.4041 76.5679 94.3447C78.7891 89.1123 80.0155 83.3541 80.0155 77.3245C80.0155 70.6928 78.5318 64.4088 75.8904 58.7693V58.7608Z" fill="url(#paint2_linear)"/>
      <defs>
        <linearGradient id="paint0_linear" x1="18.23" y1="98.9" x2="46.3" y2="55.8" gradientUnits="userSpaceOnUse"><stop stop-color="#F58220"/><stop offset="1" stop-color="#F2728C"/></linearGradient>
        <linearGradient id="paint1_linear" x1="117.4" y1="-12.6" x2="55.7" y2="57.9" gradientUnits="userSpaceOnUse"><stop stop-color="#F58220"/><stop offset="1" stop-color="#F2728C"/></linearGradient>
        <linearGradient id="paint2_linear" x1="-26.2" y1="-28.7" x2="94.0" y2="107" gradientUnits="userSpaceOnUse"><stop stop-color="#0074BC"/><stop offset="1" stop-color="#44C8F5"/></linearGradient>
      </defs>
    </svg>`;

  // ---------------- RENDERING ----------------

  function renderTopNews(news = []) {
    if (!topNewsContainer) return;

    const topNews = news
      .filter(item => item.newsCategories?.nodes?.some(cat => cat.slug === "media-release"))
      .slice(0, 3);

    topNewsContainer.innerHTML = topNews.map((item, index) => {
      const newsUrl = item.news?.link || `/news/${item.slug}`;
      const target = item.news?.link ? 'target="_blank" rel="noopener noreferrer"' : '';
      
      return `
        <div class="flex gap-5 mb-8 cursor-pointer">
          <h2 class="text-[28px] md:text-4xl font-heading leading-[120%] gradient-text">${index + 1}</h2>
          <div class="blog_body">
            <p><a href="${newsUrl}" ${target}>${sanitize(item.title)}</a></p>
            <span class="blog_date pt-[10px] text-sm flex gap-2 items-center">
               <i class="clock-icon"></i> ${formatDate(item.date)}
            </span>
          </div>
        </div>`;
    }).join("");
  }

  function renderMediaKit() {
    container.className = "grid grid-cols-1 gap-6";
    // Mocking the file list to keep the function clean
    const files = [
      { name: "Image of Vineet Sukumar - Founder & MD", url: "Vineet-recent-photo.jpg" },
      { name: "Profile of Vineet Sukumar - Founder & MD", url: "Vineet-Sukumar-Profile.docx" },
      { name: "VNL Logo", url: "VNL-Logo.zip" },
      { name: "VNL Brand Guidelines", url: "VNL-Brand-Guidelines.pdf" }
    ];

    let html = `<h1 class="gradient-text text-[28px] md:text-[35px] font-heading mb-4">Media Kit</h1><ul class="list_of_files">`;
    files.forEach(file => {
      const fullUrl = `https://vivritinextdev.wpenginepowered.com/wp-content/uploads/2025/12/${file.url}`;
      html += `
        <li>
          <div class="flex items-center gap-[10px]">
            ${MEDIA_KIT_SVG}
            <a target="_blank" href="${fullUrl}" download>${file.name}</a>
          </div>
          <a target="_blank" href="${fullUrl}" class="contact_cta flex items-center gap-2 text-white uppercase mb-2">
            <span style="min-width: 88px;">Download</span>
          </a>
        </li>`;
    });
    html += `</ul>`;
    container.innerHTML = html;
  }

  function renderPage(page) {
    if (!container) return;
    currentPage = page;

    if (activeCategory === "media-kit") {
      renderMediaKit();
      renderPagination();
      return;
    }

    const start = (page - 1) * itemsPerPage;
    const list = filteredData.slice(start, start + itemsPerPage);

    if (!list.length) {
      container.innerHTML = `<p class="text-gray-500 col-span-2">No results found.</p>`;
      if (paginationEl) paginationEl.innerHTML = "";
      return;
    }

    container.className = "grid grid-cols-1 sm:grid-cols-2 gap-6";
    container.innerHTML = list.map((item, index) => {
      const imageUrl = item.featuredImage?.node?.sourceUrl || "/b1.png";
      const newsUrl = item.news?.link || `/news/${item.slug}`;
      const isExternal = !!item.news?.link;

      let card = `
        <a href="${newsUrl}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>
          <div class="blog-card border-b border-dotted pb-4 pr-4 sm:border-r last:border-b-0">
            <div class="blog_card flex flex-col gap-4">
              <img src="${imageUrl}" class="w-full h-auto aspect-80/57 object-cover" alt="${sanitize(item.title)}" />
              <div class="blog_body">
                <span class="small text-sm gradient-text">News | ${getReadingTime(item.content)}</span>
                <p class="pt-[10px]">${sanitize(item.title)}</p>
                <span class="text-sm">${formatDate(item.date)}</span>
              </div>
            </div>
          </div>
        </a>`;
      
      if ((index + 1) % 2 === 0 && (index + 1) !== itemsPerPage) {
        card += `<div class="col-span-2 w-full border-b border-dashed border-[#F2994A] mb-6"></div>`;
      }
      return card;
    }).join("");

    renderPagination();
  }

  // ---------------- LOGIC ----------------

  async function loadInitial() {
    const newsQuery = `{ news(first: 1000) { nodes { id title slug content date news { link } featuredImage { node { sourceUrl } } newsCategories { nodes { name slug } } } } }`;
    const catQuery = `{ newsCategories { edges { node { name slug } } } }`;

    try {
      const [resNews, resCat] = await Promise.all([
        fetch("https://vivritinextdev.wpenginepowered.com/graphql/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: newsQuery }),
        }),
        fetch("https://vivritinextdev.wpenginepowered.com/graphql/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: catQuery }),
        })
      ]);

      if (!resNews.ok || !resCat.ok) throw new Error("Network response was not ok");

      const jsonNews = await resNews.json();
      const jsonCat = await resCat.json();

      newsData = jsonNews?.data?.news?.nodes || [];
      filteredData = newsData.filter(n => 
        (n.newsCategories?.nodes || []).some(c => c.slug === "media-kit")
      );

      if (!filteredData.length) filteredData = [...newsData];

      // Initial Renders
      renderTopNews(newsData);
      renderCategories(jsonCat?.data?.newsCategories?.edges || []);
      renderPage(1);

    } catch (err) {
      console.error("News Load Error:", err);
      if (container) container.innerHTML = `<p class='text-red-500'>Failed to load content.</p>`;
    }
  }

  // Event Listeners for search & filters
  searchInput?.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    filteredData = newsData.filter(n => {
      const matchesSearch = !q || n.title?.toLowerCase().includes(q) || n.content?.toLowerCase().includes(q);
      const matchesCat = activeCategory === "all" || (n.newsCategories?.nodes || []).some(c => c.slug === activeCategory);
      return matchesSearch && matchesCat;
    });
    renderPage(1);
  });

  loadInitial();
});