document.addEventListener("DOMContentLoaded", function () {
  // ====== BIẾN DÙNG CHUNG ======
  let currentFilter = "all";
  let currentCollection = "all";

  const searchBoxes = document.querySelectorAll(".search-box");
  const searchIcon = document.getElementById("search-icon");
  const searchBox = document.getElementById("search-box");
  const items = document.querySelectorAll(".top-content-item");
  const productList = document.querySelector(".product-list");
  const urlParams = new URLSearchParams(window.location.search);

  // ====== LẤY DỮ LIỆU TỪ URL ======
  const urlFilter = urlParams.get("filter");
  const urlSearch = urlParams.get("search");
  if (urlFilter) currentFilter = urlFilter.toLowerCase();
  if (urlSearch) {
    searchBoxes.forEach(box => box.value = urlSearch);
  }

  // ====== LỌC SẢN PHẨM ======
  function getFilteredProducts() {
    let searchTerm = "";
    searchBoxes.forEach(box => {
      if (box.value) searchTerm = box.value.toLowerCase();
    });

    return Array.from(items).filter(item => {
      const name = item.dataset.name?.toLowerCase() || "";
      const price = parseInt(item.dataset.price);
      const category = item.dataset.clothes?.toLowerCase() || "";

      const matchSearch = name.includes(searchTerm) ||
                          (!isNaN(searchTerm) && price === parseInt(searchTerm)) ||
                          category.includes(searchTerm);

      const matchType = currentFilter === "all" || category === currentFilter;
      return matchSearch && matchType;
    });
  }

  function filterProducts() {
    const filtered = getFilteredProducts();
    items.forEach(item => item.style.display = "none");

    if (filtered.length > 0) {
      filtered.forEach(item => item.style.display = "block");
      if (productList) productList.innerHTML = "";
    } else {
      if (productList) productList.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
    }
  }

  // ====== XỬ LÝ SỰ KIỆN TÌM KIẾM ======
  searchBoxes.forEach(box => {
    box.addEventListener("input", filterProducts);
    box.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        const keyword = box.value.trim();
        if (keyword) {
          localStorage.setItem("searchTerm", keyword);
          window.location.href = `index.html?search=${encodeURIComponent(keyword)}`;
        }
      }
    });
  });

  // Toggle ô tìm kiếm
  searchIcon?.addEventListener("click", () => {
    const isHidden = searchBox.style.display === "none" || !searchBox.style.display;
    searchBox.style.display = isHidden ? "inline-block" : "none";
    if (isHidden) searchBox.focus();
  });

  // ====== LỌC THEO NÚT ======
  document.querySelectorAll(".btn-filter").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      currentFilter = btn.dataset.filter;
      filterProducts();
    });
  });

  document.querySelectorAll(".btn-collection").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      currentCollection = btn.dataset.collection;
      filterProducts();
    });
  });

  // ====== LOAD LẠI TỪ LOCALSTORAGE ======
  const savedSearchTerm = localStorage.getItem("searchTerm");
  if (savedSearchTerm) {
    searchBoxes.forEach(box => box.value = savedSearchTerm);
    localStorage.removeItem("searchTerm");
  }

  // ====== TRANG CHI TIẾT SẢN PHẨM ======
  const products = [
    { id: "1", name: "NDAWN POLO BLACK", price: 400000, image: "Image/image 3.png", description: "Áo polo đen sang trọng, thoáng mát cho mùa hè." },
    { id: "2", name: "NDAWN SHORTS BLACK", price: 300000, image: "Image/image 4.png", description: "Quần short đen cá tính, phù hợp dạo phố." },
    { id: "3", name: "NDAWN DENIM JACKET", price: 800000, image: "Image/image 2.png", description: "Áo khoác denim phong cách cổ điển, phù hợp mọi dịp." },
    { id: "4", name: "NDAWN T-Shirt", price: 250000, image: "Image/image 1.png", description: "Áo thun đơn giản, chất liệu cotton cao cấp." },
    { id: "5", name: "NDAWN TEE BLACK", price: 400000, image: "Image/image 5.png", description: "Áo thun đen basic, dễ phối đồ." },
    { id: "6", name: "NDAWN TEE BLACK", price: 600000, image: "Image/image 6.png", description: "Thiết kế cá tính, chất vải co giãn tốt." },
    { id: "7", name: "BANDANA BLACK", price: 150000, image: "Image/image 7.png", description: "Khăn bandana thời trang màu đen cá tính." },
    { id: "8", name: "NDAWN NECKLACE GREY", price: 400000, image: "Image/image 8.png", description: "Dây chuyền xám thời thượng, phong cách đường phố." }
  ];

  const productId = urlParams.get("id");
  if (productId) {
    const product = products.find(p => p.id === productId);
    const info = document.querySelector(".product-info");

    if (product) {
      document.getElementById("product-image").src = product.image;
      document.getElementById("product-name").textContent = product.name;
      document.getElementById("product-price").innerHTML = `Giá: ${product.price.toLocaleString()}<sup>đ</sup>`;
      document.getElementById("product-description").textContent = product.description;
    } else if (info) {
      info.innerHTML = "<p>Sản phẩm không tồn tại.</p>";
    }

    document.querySelector('.add-to-cart')?.addEventListener('click', () => {
      const item = {
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      };

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cart.find(i => i.name === item.name);
      existing ? existing.quantity++ : cart.push(item);

      localStorage.setItem('cart', JSON.stringify(cart));
      window.location.href = "Cart.html";
    });
  }

  // ====== CHẠY LỌC KHI VÀO TRANG DANH SÁCH ======
  filterProducts();
});
