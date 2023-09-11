// 获取博客文章列表和分页链接容器
const blogList = document.getElementById("blog-list");
const paginationLinks = document.getElementById("pagination-links");

// 每页显示的博客数量
const itemsPerPage = 6;

// 获取所有博客文章卡片
const blogCards = Array.from(blogList.querySelectorAll(".card"));

// 计算总页数
const totalPages = Math.ceil(blogCards.length / itemsPerPage);

// 当前页码
let currentPage = 1;

// 更新博客文章显示
function updateBlogDisplay() {
  blogCards.forEach((card, index) => {
    card.style.display =
      index >= (currentPage - 1) * itemsPerPage &&
      index < currentPage * itemsPerPage
        ? "block"
        : "none";
  });
}

// 生成分页链接
for (let page = 1; page <= totalPages; page++) {
  const pageLink = document.createElement("a");
  pageLink.href = `?page=${page}`;
  pageLink.textContent = page;
  paginationLinks.appendChild(pageLink);

  // 添加点击事件处理程序
  pageLink.addEventListener("click", (event) => {
    event.preventDefault();
    currentPage = parseInt(event.target.textContent);
    updateBlogDisplay();
  });
}

// 添加"Previous"和"Next"链接
const previousLink = document.createElement("a");
previousLink.textContent = "Previous";
previousLink.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateBlogDisplay();
  }
});

const nextLink = document.createElement("a");
nextLink.textContent = "Next";
nextLink.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    updateBlogDisplay();
  }
});

paginationLinks.insertBefore(previousLink, paginationLinks.firstChild);
paginationLinks.appendChild(nextLink);

// 初始化显示
updateBlogDisplay();
