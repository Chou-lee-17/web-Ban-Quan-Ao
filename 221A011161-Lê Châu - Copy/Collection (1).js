window.addEventListener("DOMContentLoaded", function () {
  let currentFilter = "all";
  const searchBoxes = document.querySelectorAll(".search-box");
  const searchIcon = document.getElementById("search-icon");
  const searchBox = document.getElementById("search-box");
  const items = document.querySelectorAll(".top-content-item");
  const productList = document.querySelector(".product-list");

  // Toggle tìm kiếm
  searchIcon?.addEventListener("click", function () {
    if (searchBox.style.display === "none" || searchBox.style.display === "") {
      searchBox.style.display = "inline-block";
      searchBox.focus();
    } else {
      searchBox.style.display = "none";
    }
  });

  // Lọc sản phẩm
  function getFilteredProducts() {
    let searchTerm = "";
    searchBoxes.forEach(box => {
      if (box.value) searchTerm = box.value.toLowerCase();
    });

    const filtered = [];
    items.forEach((item) => {
      const name = item.dataset.name?.toLowerCase() || "";
      const price = parseInt(item.dataset.price);
      const category = item.dataset.clothes?.toLowerCase() || "";

      const matchName = name.includes(searchTerm);
      const matchPrice = !isNaN(searchTerm) && price === parseInt(searchTerm);
      const matchCategory = category.includes(searchTerm);
      const matchSearch = matchName || matchPrice || matchCategory;
      const matchType = currentFilter === "all" || category === currentFilter;

      if (matchSearch && matchType) {
        filtered.push({ element: item });
      }
    });
    return filtered;
  }

  function filterProducts() {
    const filtered = getFilteredProducts();
    items.forEach((item) => {
      item.style.display = "none";
    });

    if (filtered.length > 0) {
      filtered.forEach(product => {
        product.element.style.display = "block";
      });
      if (productList) productList.innerHTML = "";
    } else {
      if (productList) productList.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
    }
  }

  // Gắn sự kiện input + Enter
  searchBoxes.forEach(box => {
    box.addEventListener("input", filterProducts);
    box.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const keyword = box.value.trim();
        if (keyword) {
          const encoded = encodeURIComponent(keyword);
          window.location.href = `index.html?search=${encoded}`;
        }
      }
    });
  });

  // Gắn filter từ nút
  document.querySelectorAll(".btn-filter").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      currentFilter = btn.dataset.filter;
      filterProducts();
    });
  });

  // Gắn lọc theo collection
  document.querySelectorAll(".btn-collection").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      currentFilter = btn.dataset.collection;
      filterProducts();
    });
  });

  // SIDEBAR LOGIN
  const LogReg = document.querySelector('.LogReg');
  document.querySelectorAll('.register-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      LogReg?.classList.add('active');
    });
  });

  document.querySelectorAll('.login-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      LogReg?.classList.remove('active');
    });
  });

  // SIDEBAR MENU
  const sidebar = document.querySelector('.sidebar');
  const menuButton = document.querySelector('.menu-button');
  window.showsidebar = function () {
    if (window.innerWidth <= 1024) {
      sidebar.style.display = 'flex';
      menuButton.style.display = 'none';
    }
  };
  window.hidesidebar = function () {
    sidebar.style.display = 'none';
    menuButton.style.display = 'block';
  };

  // Lấy filter & search từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const urlFilter = urlParams.get("filter");
  const urlSearch = urlParams.get("search");

  if (urlFilter) currentFilter = urlFilter.toLowerCase();
  if (urlSearch) {
    searchBoxes.forEach(box => {
      box.value = urlSearch;
    });
  }

  // Local storage
  const savedSearchTerm = localStorage.getItem("searchTerm");
  if (savedSearchTerm) {
    searchBoxes.forEach(box => {
      box.value = savedSearchTerm;
    });
    localStorage.removeItem("searchTerm");
  }

  // Chuyển trang khi nhấn filter
  const filterButtons = document.querySelectorAll(".btn-filter");
  filterButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const category = this.dataset.filter;
      window.location.href = `index.html?filter=${category}`;
    });
  });

  // Thực hiện lọc khi tải trang
  filterProducts();
});
