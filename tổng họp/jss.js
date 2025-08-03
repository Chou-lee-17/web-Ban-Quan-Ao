window.addEventListener("DOMContentLoaded", function () {
  // ========== TÌM KIẾM & LỌC ==========

  let currentFilter = "all";
  const searchBoxes = document.querySelectorAll(".search-box"); 
  const searchIcon = document.getElementById("search-icon");
  const searchBox = document.getElementById("search-box");
  const items = document.querySelectorAll(".top-content-item");
  const productList = document.querySelector(".product-list");

  // Gõ vào tất cả các ô tìm kiếm
  searchBoxes.forEach(box => {
    box.addEventListener("input", filterProducts);
  });

  // Toggle hiện/ẩn ô tìm kiếm
  searchIcon?.addEventListener("click", function () {
    if (searchBox.style.display === "none" || searchBox.style.display === "") {
      searchBox.style.display = "inline-block";
      searchBox.focus();
    } else {
      searchBox.style.display = "none";
    }
  });
function filterProducts() {
  let searchTerm = "";
  searchBoxes.forEach(box => {
    if (box.value) searchTerm = box.value.toLowerCase();
  });

  let found = false;

  items.forEach((item) => {
    const name = item.dataset.name?.toLowerCase() || "";
    const price = parseInt(item.dataset.price);
    const category = item.dataset.clothes?.toLowerCase() || "";

    const matchName = name.includes(searchTerm);
    const matchPrice = !isNaN(searchTerm) && price === parseInt(searchTerm);
    const matchCategory = category.includes(searchTerm);
    const matchSearch = matchName || matchPrice || matchCategory;
    const matchType = currentFilter === "all" || category === currentFilter;

    const visible = matchSearch && matchType;
    item.style.display = visible ? "block" : "none";

    if (visible) found = true; // ✅ đúng chỗ
  });


  if (!found) {
    productList.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
  }
}


  // Sự kiện các nút lọc
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

  document.querySelectorAll(".btn-filter").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      currentFilter = btn.dataset.filter;
      filterProducts();
    });
  });

  // ======= Đọc từ khóa từ localStorage nếu có ========
  const savedSearchTerm = localStorage.getItem("searchTerm");
  if (savedSearchTerm) {
    searchBoxes.forEach(box => {
      box.value = savedSearchTerm;
    });

    filterProducts(); // Lọc ngay sau khi gán từ khóa
    localStorage.removeItem("searchTerm"); // Xóa để tránh lọc lại lần sau
  }
let currentCollection = "all";

document.querySelectorAll(".btn-collection").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    currentCollection = btn.dataset.collection;
    filterProducts();
  });
});

  // ========== LOGIN / REGISTER ==========
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

  // ========== SIDEBAR MENU ==========
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
});
