window.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.getElementById("search-box");
  const searchIcon = document.getElementById("search-icon");
  const items = document.querySelectorAll(".top-content-item");

  let currentFilter = "all"; // all | tops | bottoms

  // Hiện/ẩn ô tìm kiếm
  searchIcon.addEventListener("click", function () {
    if (searchBox.style.display === "none" || searchBox.style.display === "") {
      searchBox.style.display = "inline-block";
      searchBox.focus();
    } else {
      searchBox.style.display = "none";
    }
  });

  // Lọc sản phẩm
  function filterProducts() {
    const searchTerm = searchBox.value.toLowerCase();

    items.forEach((item) => {
      const name = item.dataset.name.toLowerCase();
      const price = parseInt(item.dataset.price);
      const category = item.dataset.clothes.toLowerCase();

      const matchName = name.includes(searchTerm);
      const matchPrice = !isNaN(searchTerm) && price === parseInt(searchTerm);
      const matchCategory = category.includes(searchTerm);
      const matchSearch = matchName || matchPrice || matchCategory;

      const matchType = currentFilter === "all" || category === currentFilter;

      item.style.display = (matchSearch && matchType) ? "block" : "none";
    });
  }

  // Sự kiện khi nhập vào ô tìm kiếm
  searchBox.addEventListener("input", filterProducts);

  // Gán sự kiện cho các nút lọc
  document.getElementById("btn-tops")?.addEventListener("click", (e) => {
    e.preventDefault();
    currentFilter = "tops";
    filterProducts();
  });

  document.getElementById("btn-bottoms")?.addEventListener("click", (e) => {
    e.preventDefault();
    currentFilter = "bottoms";
    filterProducts();
  });

  document.getElementById("btn-all")?.addEventListener("click", (e) => {
    e.preventDefault();
    currentFilter = "all";
    filterProducts();
  });
});


  // =======================
  // PHẦN LOGIN / REGISTER
  // =======================
  const LogReg = document.querySelector(".LogReg");
  const loginLink = document.querySelector(".login-link");
  const registerLink = document.querySelector(".register-link");

  registerLink?.addEventListener("click", () => {
    LogReg.classList.add("active");
  });

  loginLink?.addEventListener("click", () => {
    LogReg.classList.remove("active");
  });

