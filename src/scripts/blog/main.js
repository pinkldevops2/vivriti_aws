document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://vivritinextdev.wpenginepowered.com/graphql/";
  const ITEMS_PER_PAGE = 6;

  const dom = {
    topNews: document.getElementById("topNewsList"),
    search: document.getElementById("searchInput"),
    container: document.getElementById("news-container"),
    pagination: document.getElementById("pagination"),
    categories: document.getElementById("categoriesUl"),
  };

  if (!dom.container) return;

  let state = {
    news: [],
    filtered: [],
    page: 1,
    activeCategory: "all",
  };

  /* ---------------- UTIL ---------------- */

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  };

  const safeJson = async (res, fallback) => {
    try {
      return await res.json();
    } catch {
      return fallback;
    }
  };

  const fetchGraphQL = async (query) =>
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

  /* ---------------- FILTER LOGIC ---------------- */

  const applyFilters = () => {
    const q = dom.search?.value.trim().toLowerCase() || "";

    state.filtered = state.news.filter((n) => {
      const categories =
        (n.categories?.edges || []).map((c) =>
          c.node.slug.toLowerCase()
        ) || [];

      const categoryMatch =
        state.activeCategory === "all" ||
        categories.includes(state.activeCategory.toLowerCase());

      const searchMatch =
        !q ||
        n.title?.toLowerCase().includes(q) ||
        n.content?.toLowerCase().includes(q);

      return categoryMatch && searchMatch;
    });

    renderPage(1);
    renderTopNews(state.filtered);
  };

  /* ---------------- TOP NEWS ---------------- */

  const renderTopNews = (data) => {
    if (!dom.topNews) return;

    const list = data.slice(0, 3);

    dom.topNews.innerHTML = list
      .map(
        (item, i) => `
        <div class="flex gap-5 mb-8 cursor-pointer">
          <h2 class="text-[28px] md:text-[35px] md:text-4xl font-heading leading-[120%] gradient-text">
            ${i + 1}
          </h2>
          <div class="blog_body">
            <p class="blogdetails">
              <a href="/blog/${item.slug}">${item.title}</a>
            </p>
            <span class="blog_date pt-[10px] text-sm flex gap-2 items-center">
              ${formatDate(item.date)}
            </span>
          </div>
        </div>`
      )
      .join("");
  };

  /* ---------------- NEWS CARDS ---------------- */

  const buildCard = (item, index) => {
    const image =
      item.featuredImage?.node?.sourceUrl || "/b1.png";
    const pdf = item.blog?.uploadPdf?.node?.mediaItemUrl;
    const link = pdf || `/blog/${item.slug}`;

    let html = `
      <div class="blog-card flex flex-col gap-2">
        <div class="blog_body">
          <a href="${link}" target="_blank">
            <h1 class="text-[22px] font-semibold leading-[32px]">
              ${item.title}
            </h1>
          </a>
          <span class="blog_date block pt-5 text-sm flex gap-2 items-center text-[#333]">
            ${formatDate(item.date)}
          </span>
        </div>
        <div class="blog_image w-full image-flash-container">
          <a href="${link}" target="_blank">
            <img src="${image}" class="w-full h-auto aspect-[4/3] object-cover"/>
          </a>
        </div>
      </div>
    `;

    if ((index + 1) % 2 === 0 && index + 1 !== ITEMS_PER_PAGE) {
      html += `<div class="col-span-2 w-full border-b border-dashed border-[#F2994A] mb-3"></div>`;
    }

    return html;
  };

  const renderPage = (page) => {
    state.page = page;

    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const slice = state.filtered.slice(start, end);

    if (!slice.length) {
      dom.container.innerHTML =
        "<p class='text-gray-500 col-span-2'>No results found.</p>";
      renderPagination();
      return;
    }

    dom.container.innerHTML = slice
      .map(buildCard)
      .join("");

    renderPagination();
  };

  /* ---------------- PAGINATION ---------------- */

  const renderPagination = () => {
    if (!dom.pagination) return;

    dom.pagination.innerHTML = "";

    const totalPages = Math.ceil(
      state.filtered.length / ITEMS_PER_PAGE
    );

    if (totalPages <= 1) return;

    const wrapper = document.createElement("div");
    wrapper.className =
      "flex items-center justify-center space-x-1 lg:space-x-10 mt-6 mb-10";

    const createButton = (label, disabled, onClick, className) => {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.disabled = disabled;
      btn.className = className;
      btn.addEventListener("click", onClick);
      return btn;
    };

    wrapper.appendChild(
      createButton(
        "Previous",
        state.page === 1,
        () => renderPage(state.page - 1),
        "px-2 lg:px-8 py-2 hidden sm:block"
      )
    );

    for (let i = 1; i <= totalPages; i++) {
      wrapper.appendChild(
        createButton(
          i,
          false,
          () => renderPage(i),
          i === state.page
            ? "border-gradent border-gradent-active"
            : "border-gradent"
        )
      );
    }

    wrapper.appendChild(
      createButton(
        "Next",
        state.page === totalPages,
        () => renderPage(state.page + 1),
        "px-2 lg:px-8 py-2 hidden sm:block"
      )
    );

    dom.pagination.appendChild(wrapper);
  };

  /* ---------------- CATEGORIES ---------------- */

  const renderCategories = (edges) => {
    if (!dom.categories) return;

    dom.categories.innerHTML = edges
      .map(
        ({ node }) => `
        <li class="py-2 cursor-pointer rounded mb-2"
            data-slug="${node.slug}">
          <a>${node.name}</a>
        </li>`
      )
      .join("");

    dom.categories
      .querySelectorAll("li")
      .forEach((li) =>
        li.addEventListener("click", () => {
          state.activeCategory = li.dataset.slug;
          applyFilters();
        })
      );
  };

  /* ---------------- INITIAL LOAD ---------------- */

  const loadInitial = async () => {
    try {
      const postQuery = `{ posts(first: 1000) { nodes { id title slug date blog { uploadPdf { node { mediaItemUrl } } } featuredImage { node { sourceUrl } } categories { edges { node { slug } } } } } }`;

      const catQuery = `{ categories { edges { node { name slug } } } }`;

      const [resPosts, resCats] = await Promise.all([
        fetchGraphQL(postQuery),
        fetchGraphQL(catQuery),
      ]);

      const postsJson = await safeJson(resPosts, {
        data: { posts: { nodes: [] } },
      });

      const catJson = await safeJson(resCats, {
        data: { categories: { edges: [] } },
      });

      state.news = postsJson.data.posts.nodes || [];
      state.filtered = [...state.news];

      renderTopNews(state.news);
      renderCategories(catJson.data.categories.edges || []);
      renderPage(1);
    } catch (err) {
      console.error("Load error:", err);
      dom.container.innerHTML =
        "<p class='text-red-500'>Failed to load posts</p>";
    }
  };

  dom.search?.addEventListener("input", applyFilters);

  loadInitial();
});