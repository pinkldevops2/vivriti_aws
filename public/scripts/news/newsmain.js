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

  // ---------------- RENDERING ----------------

  function renderTopNews(news = []) {
    if (!topNewsContainer) return;

    const topNews = news
      .filter(item => item.newsCategories?.nodes?.some(cat => cat.slug === "media-release"))
      .slice(0, 3);

    topNewsContainer.innerHTML = topNews.map((item, index) => {
      const newsUrl = item.news?.link || `/news/${item.slug}`;
      const target = item.news?.link ? 'target="_blank" rel="noopener noreferrer"' : '';
      
      return `<div class="flex gap-5 mb-8 cursor-pointer">
            <h2 class="text-[28px] md:text-[35px] md:text-4xl font-heading leading-[120%] gradient-text">${index + 1}</h2>
            <div class="blog_body">
              <p>  <a href="${newsUrl}" ${hasCustomLink ? 'target="_blank" rel="noopener noreferrer"' : ''}> ${item.title}</a></p>
              <span class="blog_date pt-[10px] text-sm flex gap-2 items-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 0C4.40887 0 2.88274 0.632146 1.75707 1.75707C0.632078 2.88261 0 4.40887 0 6C0 7.59113 0.632146 9.11726 1.75707 10.2429C2.88261 11.3679 4.40887 12 6 12C7.59113 12 9.11726 11.3679 10.2429 10.2429C11.3679 9.11739 12 7.59113 12 6C11.9984 4.40942 11.3657 2.88425 10.2407 1.75927C9.11575 0.634286 7.59058 0.00164571 6 0ZM6 11.1429C4.63607 11.1429 3.32791 10.6013 2.36352 9.63648C1.39869 8.6722 0.857143 7.36402 0.857143 6C0.857143 4.63598 1.39875 3.32791 2.36352 2.36352C3.3278 1.39869 4.63598 0.857143 6 0.857143C7.36402 0.857143 8.67209 1.39875 9.63648 2.36352C10.6013 3.3278 11.1429 4.63598 11.1429 6C11.1412 7.36339 10.5991 8.67058 9.63483 9.63483C8.67056 10.5991 7.36347 11.1412 6 11.1429ZM6.42857 2.14286V5.6448C6.42964 5.98605 6.29411 6.31337 6.05196 6.55391L4.16035 8.44552V8.44605C3.99213 8.60838 3.72481 8.6057 3.55928 8.4407C3.39429 8.27516 3.3916 8.00785 3.55392 7.83963L5.44554 5.94802H5.44607C5.52643 5.86766 5.57143 5.75837 5.57143 5.64481V2.14286C5.57143 1.90607 5.76321 1.71429 6 1.71429C6.23679 1.71429 6.42857 1.90607 6.42857 2.14286Z" fill="#2E2E2E"/>
                </svg>
                ${date}
              </span>
            </div>
          </div>`;
    }).join("");
  }

  function renderCategories(edges = []) {
    if (!categoriesUl) return;
    categoriesUl.innerHTML = "";

    edges.forEach(({ node }) => {
      const isActive = activeCategory === node.slug;
      const li = document.createElement("li");
      li.className = "py-2 cursor-pointer mb-2";

      const anchor = document.createElement("a");
      anchor.style.display = "block";
      anchor.style.width = "100%";
      anchor.style.padding = "15px";
      anchor.textContent = node.name; // Secure from XSS

      if (isActive) {
        anchor.style.background = "linear-gradient(212deg, rgba(59,186,226,1) 0%, rgba(0,1,138,1) 100%)";
        anchor.style.color = "#fff";
      } else {
        anchor.style.background = "transparent";
        anchor.style.color = "#000";
      }

      li.appendChild(anchor);
      li.addEventListener("click", () => {
        activeCategory = node.slug;
        renderCategories(edges);
        
        filteredData = newsData.filter(n => {
          const matchesCat = !activeCategory || activeCategory === "all" || 
            (n.newsCategories?.nodes || []).some(c => c.slug.toLowerCase() === activeCategory.toLowerCase());
          return matchesCat;
        });

        if (searchInput?.value) {
          const qv = searchInput.value.trim().toLowerCase();
          filteredData = filteredData.filter(n => 
            n.title?.toLowerCase().includes(qv) || n.content?.toLowerCase().includes(qv)
          );
        }

        renderPage(1);
        renderTopNews(filteredData);
      });
      categoriesUl.appendChild(li);
    });
  }

  function renderMediaKit() {
    container.className = "grid grid-cols-1 gap-6";
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
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="34" viewBox="0 0 106 95" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M29.2189 58.7612C26.5688 64.4007 25.0938 70.6847 25.0938 77.3164C25.0938 83.4138 26.3459 89.2144 28.61 94.4977C33.1468 83.9057 42.066 76.2648 52.5546 71.2783C51.5255 70.7865 50.4792 70.3285 49.4157 69.8875C42.8635 67.1738 35.8568 63.7901 29.2189 58.7697V58.7612Z" fill="url(#paint0_linear_584_313)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M105.109 0C105.109 0 74.3896 16.24 52.5547 33.1669C58.4122 37.704 63.6351 42.3004 67.4429 46.6338C70.8991 50.1532 73.7635 54.2493 75.8818 58.7608C89.3464 48.5928 101.327 31.6998 105.101 0H105.109Z" fill="url(#paint1_linear_584_313)"/>
<path d="M75.8904 58.7608C75.0614 59.3884 75.0614 59.3884 75.8904 58.7608C73.7721 54.2493 70.9076 50.1532 67.4515 46.6423C63.6351 42.3003 58.4208 37.7124 52.5633 33.1669C50.1219 35.0609 50.1219 35.0609 52.5633 33.1669C30.7198 16.24 0 0 0 0C3.77351 31.6913 15.763 48.5843 29.219 58.7608C35.8655 63.7812 42.8636 67.1649 49.4158 69.8787C50.4792 70.3197 51.517 70.7861 52.5547 71.2695C52.5633 71.2695 52.5718 71.2695 52.5804 71.261C52.5718 71.261 52.5633 71.2695 52.5547 71.2779C63.0004 76.239 71.8767 83.829 76.4393 94.3447C76.465 94.4041 76.5508 94.4041 76.5679 94.3447C78.7891 89.1123 80.0155 83.3541 80.0155 77.3245C80.0155 70.6928 78.5318 64.4088 75.8904 58.7693V58.7608Z" fill="url(#paint2_linear_584_313)"/>
<defs>
<linearGradient id="paint0_linear_584_313" x1="18.2328" y1="98.9584" x2="46.3383" y2="55.8931" gradientUnits="userSpaceOnUse">
<stop stop-color="#F58220"/>
<stop offset="1" stop-color="#F2728C"/>
</linearGradient>
<linearGradient id="paint1_linear_584_313" x1="117.468" y1="-12.6698" x2="55.7173" y2="57.9732" gradientUnits="userSpaceOnUse">
<stop stop-color="#F58220"/>
<stop offset="1" stop-color="#F2728C"/>
</linearGradient>
<linearGradient id="paint2_linear_584_313" x1="-26.2688" y1="-28.7571" x2="94.0919" y2="107.009" gradientUnits="userSpaceOnUse">
<stop stop-color="#0074BC"/>
<stop offset="1" stop-color="#44C8F5"/>
</linearGradient>
</defs>
</svg>
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
      const target = item.news?.link ? 'target="_blank" rel="noopener noreferrer"' : '';

      let card = `
        <a href="${newsUrl}" ${target}>
          <div class="blog-card border-b border-dotted pb-4 pr-4 sm:border-r last:border-b-0">
            <div class="blog_card flex flex-col gap-4">
              <img src="${imageUrl}" class="w-full h-auto aspect-80/57 object-cover" alt="Blog Image" />
              <div class="blog_body">
                <span class="small text-sm gradient-text">News | ${getReadingTime(item.content)}</span>
                <p class="pt-[10px]">${sanitize(item.title)}</p>
                <span class="text-sm">${formatDate(item.date)}</span>
              </div>
            </div>
          </div>
        </a>`;
      
      if ((index + 1) % 2 === 0 && (index + 1) !== list.length) {
        card += `<div class="col-span-2 w-full border-b border-dashed border-[#F2994A] mb-6"></div>`;
      }
      return card;
    }).join("");

    renderPagination();
  }

  function renderPagination() {
    if (!paginationEl) return;
    paginationEl.innerHTML = "";
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (totalPages <= 1) return;

    const nav = document.createElement("div");
    nav.className = "flex items-center justify-center space-x-4 mt-6 mb-10";

    const prev = document.createElement("button");
    prev.textContent = "Previous";
    prev.disabled = currentPage === 1;
    prev.onclick = () => renderPage(currentPage - 1);
    nav.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = i === currentPage ? "font-bold underline" : "";
      btn.onclick = () => renderPage(i);
      nav.appendChild(btn);
    }

    const next = document.createElement("button");
    next.textContent = "Next";
    next.disabled = currentPage === totalPages;
    next.onclick = () => renderPage(currentPage + 1);
    nav.appendChild(next);

    paginationEl.appendChild(nav);
  }

  // ---------------- FETCH ----------------

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

      const jsonNews = await resNews.json();
      const jsonCat = await resCat.json();

      newsData = jsonNews?.data?.news?.nodes || [];
      filteredData = newsData.filter(n => (n.newsCategories?.nodes || []).some(c => c.slug === "media-kit"));
      if (!filteredData.length) filteredData = [...newsData];

      renderTopNews(newsData);
      renderCategories(jsonCat?.data?.newsCategories?.edges || []);
      renderPage(1);
    } catch (err) {
      console.error("News Load Error:", err);
    }
  }

  searchInput?.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    filteredData = newsData.filter(n => {
      const match = n.title?.toLowerCase().includes(q) || n.content?.toLowerCase().includes(q);
      const cat = activeCategory === "all" || (n.newsCategories?.nodes || []).some(c => c.slug === activeCategory);
      return match && cat;
    });
    renderPage(1);
  });

  loadInitial();
});// JavaScript Document