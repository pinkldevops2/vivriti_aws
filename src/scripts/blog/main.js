document.addEventListener("DOMContentLoaded", () => {
  const topNewsContainer = document.getElementById("topNewsList");
  const searchInput = document.getElementById("searchInput");
  const container = document.getElementById("news-container");
  const paginationEl = document.getElementById("pagination");
  const categoriesUl = document.getElementById("categoriesUl");

  let newsData = [];
  let filteredData = [];
  let currentPage = 1;
  const itemsPerPage = 6;
  let activeCategory = "all";

  // ---------------- UTIL ----------------
  function formatDate(d) {
    if (!d) return "";
    const date = new Date(d);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  }

  // ---------------- TOP NEWS ----------------
  function renderTopNews(news = []) {
    if (!topNewsContainer) return;

    const topNews = news.slice(0, 3); // top 3 news
    topNewsContainer.innerHTML = topNews
      .map((item, index) => {
        const date = formatDate(item.date);
        return `
          <div class="flex gap-5 mb-8 cursor-pointer">
            <h2 class="text-[28px] md:text-[35px] md:text-4xl font-heading leading-[120%] gradient-text">${index + 1}</h2>
            <div class="blog_body">
              <p class="blogdetails"><a href="/blog/${item.slug}">${item.title}</a></p>
              <span class="blog_date pt-[10px] text-sm flex gap-2 items-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 0C4.40887 0 2.88274 0.632146 1.75707 1.75707C0.632078 2.88261 0 4.40887 0 6C0 7.59113 0.632146 9.11726 1.75707 10.2429C2.88261 11.3679 4.40887 12 6 12C7.59113 12 9.11726 11.3679 10.2429 10.2429C11.3679 9.11739 12 7.59113 12 6C11.9984 4.40942 11.3657 2.88425 10.2407 1.75927C9.11575 0.634286 7.59058 0.00164571 6 0ZM6 11.1429C4.63607 11.1429 3.32791 10.6013 2.36352 9.63648C1.39869 8.6722 0.857143 7.36402 0.857143 6C0.857143 4.63598 1.39875 3.32791 2.36352 2.36352C3.3278 1.39869 4.63598 0.857143 6 0.857143C7.36402 0.857143 8.67209 1.39875 9.63648 2.36352C10.6013 3.3278 11.1429 4.63598 11.1429 6C11.1412 7.36339 10.5991 8.67058 9.63483 9.63483C8.67056 10.5991 7.36347 11.1412 6 11.1429ZM6.42857 2.14286V5.6448C6.42964 5.98605 6.29411 6.31337 6.05196 6.55391L4.16035 8.44552V8.44605C3.99213 8.60838 3.72481 8.6057 3.55928 8.4407C3.39429 8.27516 3.3916 8.00785 3.55392 7.83963L5.44554 5.94802H5.44607C5.52643 5.86766 5.57143 5.75837 5.57143 5.64481V2.14286C5.57143 1.90607 5.76321 1.71429 6 1.71429C6.23679 1.71429 6.42857 1.90607 6.42857 2.14286Z" fill="#2E2E2E"/>
                </svg>
                ${date}
              </span>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // ---------------- CATEGORIES ----------------
  function renderCategories(edges = []) {
    if (!categoriesUl) return;

    categoriesUl.innerHTML = edges
      .map(({ node }) => `
        <li class="py-2 cursor-pointer rounded mb-2 ${activeCategory === node.slug ? "bg-gradient-to-r" : ""}" data-slug="${node.slug}">
          <a>${node.name}</a>
        </li>
      `)
      .join("");

    categoriesUl.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", () => {
        activeCategory = li.dataset.slug;
        categoriesUl.querySelectorAll("li").forEach((x) => x.classList.remove("bg-gradient-to-r"));
        li.classList.add("bg-gradient-to-r");
        filterAndRender();
      });
    });
  }

  // ---------------- SEARCH & FILTER ----------------
  searchInput?.addEventListener("input", filterAndRender);

  function filterAndRender() {
    const q = searchInput?.value.trim().toLowerCase() || "";

    filteredData = newsData.filter((n) => {
      const cats = (n.categories?.edges || []).map((c) => c.node.slug.toLowerCase());
      const categoryMatch = activeCategory === "all" || !activeCategory || cats.includes(activeCategory.toLowerCase());

      const searchMatch =
        !q ||
        (n.title && n.title.toLowerCase().includes(q)) ||
        (n.content && n.content.toLowerCase().includes(q));

      return categoryMatch && searchMatch;
    });

    renderPage(1);
    renderTopNews(filteredData);
  }

  // ---------------- NEWS CARDS ----------------
  function createBlogCardHtml(item, index) {
    const imageUrl = item.featuredImage?.node?.sourceUrl || "/b1.png";
    const date = formatDate(item.date);
    const pdfUrl = item.blog?.uploadPdf?.node?.mediaItemUrl;
    const detailUrl = `/blog/${item.slug}`;
    const link = pdfUrl ? pdfUrl : detailUrl;

    let html = `
      <div class="blog-card flex flex-col gap-2">
        <div class="blog_body">
          <a href="${link}" target="_blank">
            <h1 class="text-[22px] font-semibold leading-[32px]">${item.title}</h1>
          </a>
          <span class="blog_date block pt-5 text-sm flex gap-2 items-center text-[#333]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 0C4.40887 0 2.88274 0.632146 1.75707 1.75707C0.632078 2.88261 0 4.40887 0 6C0 7.59113 0.632146 9.11726 1.75707 10.2429C2.88261 11.3679 4.40887 12 6 12C7.59113 12 9.11726 11.3679 10.2429 10.2429C11.3679 9.11739 12 7.59113 12 6C11.9984 4.40942 11.3657 2.88425 10.2407 1.75927C9.11575 0.634286 7.59058 0.00164571 6 0ZM6 11.1429C4.63607 11.1429 3.32791 10.6013 2.36352 9.63648C1.39869 8.6722 0.857143 7.36402 0.857143 6C0.857143 4.63598 1.39875 3.32791 2.36352 2.36352C3.3278 1.39869 4.63598 0.857143 6 0.857143C7.36402 0.857143 8.67209 1.39875 9.63648 2.36352C10.6013 3.3278 11.1429 4.63598 11.1429 6C11.1412 7.36339 10.5991 8.67058 9.63483 9.63483C8.67056 10.5991 7.36347 11.1412 6 11.1429ZM6.42857 2.14286V5.6448C6.42964 5.98605 6.29411 6.31337 6.05196 6.55391L4.16035 8.44552V8.44605C3.99213 8.60838 3.72481 8.6057 3.55928 8.4407C3.39429 8.27516 3.3916 8.00785 3.55392 7.83963L5.44554 5.94802H5.44607C5.52643 5.86766 5.57143 5.75837 5.57143 5.64481V2.14286C5.57143 1.90607 5.76321 1.71429 6 1.71429C6.23679 1.71429 6.42857 1.90607 6.42857 2.14286Z" fill="#2E2E2E"/></svg>
            ${date}
          </span>
        </div>
        <div class="blog_image w-full image-flash-container">
          <a href="${link}" target="_blank">
            <img src="${imageUrl}" class="w-full h-auto aspect-[4/3] object-cover" />
          </a>
        </div>
      </div>
    `;

    if ((index + 1) % 2 === 0 && (index + 1) !== itemsPerPage) {
      html += `<div class="col-span-2 w-full border-b border-dashed border-[#F2994A] mb-3"></div>`;
    }
    return html;
  }

  function renderPage(page) {
    if (!container) return;
    currentPage = page;

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const list = filteredData.slice(start, end);

    if (!list.length) {
      container.innerHTML = `<p class="text-gray-500 col-span-2">No results found.</p>`;
      if (paginationEl) paginationEl.innerHTML = "";
      return;
    }

    container.innerHTML = list.map(createBlogCardHtml).join("");
    renderPagination();
  }

  // ---------------- PAGINATION ----------------
  function createPaginationButton(text, page, isDisabled, className) {
    const btn = document.createElement("button");
    btn.innerHTML = text;
    btn.className = className;
    btn.disabled = isDisabled;
    btn.addEventListener("click", () => renderPage(page));
    return btn;
  }

  function renderPagination() {
    if (!paginationEl) return;
    paginationEl.innerHTML = "";

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (totalPages <= 1) return;

    const wrapper = document.createElement("div");
    wrapper.className = "flex items-center justify-center space-x-1 lg:space-x-10 mt-6 mb-10";
    paginationEl.appendChild(wrapper);

    // Previous text
    wrapper.appendChild(createPaginationButton("Previous", currentPage - 1, currentPage === 1, "px-2 lg:px-8 py-2 hidden sm:block"));

    // LEFT ARROW (SVG)
    const leftArrowClass = currentPage === 1
      ? "contact_cta px-[14px] py-[12px] flex items-center gap-2 bg-gray-300 cursor-not-allowed"
      : "contact_cta px-[14px] py-[12px] flex items-center gap-2 bg-gradient-to-r from-pink-600 to-red-400";
    
    wrapper.appendChild(createPaginationButton(`
      <span class="rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="15" viewBox="0 0 11 15" fill="none">
          <path d="M1 13.5001L9 7.00006L1 1.00006" stroke="white" stroke-width="2" stroke-linecap="round"></path>
        </svg>
      </span>`, currentPage - 1, currentPage === 1, leftArrowClass));

    // PAGE NUMBERS
    let pagesToShow = [];
    if (totalPages <= 5) {
      pagesToShow = [...Array(totalPages).keys()].map((i) => i + 1);
    } else {
      pagesToShow = [1, currentPage - 1, currentPage, currentPage + 1, totalPages]
        .filter((p) => p >= 1 && p <= totalPages)
        .sort((a, b) => a - b);
      pagesToShow = [...new Set(pagesToShow)];
    }

    let lastRendered = 0;
    pagesToShow.forEach((p) => {
      if (p - lastRendered > 1) {
        const dots = document.createElement("span");
        dots.textContent = "...";
        dots.className = "px-3 py-2 select-none";
        wrapper.appendChild(dots);
      }

      const btn = document.createElement("button");
      btn.textContent = p;
      btn.className = p === currentPage ? "border-gradent border-gradent-active" : "border-gradent";
      btn.addEventListener("click", () => renderPage(p));
      wrapper.appendChild(btn);
      lastRendered = p;
    });

    // RIGHT ARROW (SVG)
    const rightArrowClass = currentPage === totalPages
      ? "contact_cta px-[14px] py-[12px] bg-gray-300 cursor-not-allowed"
      : "contact_cta px-[14px] py-[12px] bg-gradient-to-r from-blue-600 to-indigo-500";
    
    wrapper.appendChild(createPaginationButton(`
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="15" viewBox="0 0 11 15" fill="none">
          <path d="M1 13.5001L9 7.00006L1 1.00006" stroke="white" stroke-width="2" stroke-linecap="round"></path>
        </svg>
      </span>`, currentPage + 1, currentPage === totalPages, rightArrowClass));

    // Next text
    wrapper.appendChild(createPaginationButton("Next", currentPage + 1, currentPage === totalPages, "px-2 lg:px-8 py-2 hidden sm:block"));
  }

  // ---------------- INITIAL LOAD ----------------
  async function loadInitial() {
    try {
      const postQuery = `{
        posts(first: 1000) {
          nodes {
            id title slug date
            blog {
              description
              uploadPdf { node { mediaItemUrl mimeType } }
            }
            featuredImage { node { sourceUrl } }
            categories {
              edges { node { id name slug } }
            }
          }
        }
      }`;

      const postCategoryQuery = `{
        categories {
          edges { node { id name slug } }
        }
      }`;

      const [resPosts, resCat] = await Promise.all([
        fetch("https://vivritinextdev.wpenginepowered.com/graphql/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: postQuery }),
        }),
        fetch("https://vivritinextdev.wpenginepowered.com/graphql/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: postCategoryQuery }),
        }),
      ]);

      const jsonPosts = await resPosts.json().catch(() => ({ data: { posts: { nodes: [] } } }));
      const jsonCat = await resCat.json().catch(() => ({ data: { categories: { edges: [] } } }));

      newsData = jsonPosts?.data?.posts?.nodes || [];
      filteredData = [...newsData];

      renderTopNews(newsData);
      renderCategories(jsonCat?.data?.categories?.edges || []);
      renderPage(1);

    } catch (err) {
      console.error("Initial load error:", err);
      if (container) container.innerHTML = `<p class='text-red-500'>Failed to load posts</p>`;
      if (topNewsContainer) topNewsContainer.innerHTML = `<p class='text-red-500'>Failed to load top posts</p>`;
    }
  }

  loadInitial();
});