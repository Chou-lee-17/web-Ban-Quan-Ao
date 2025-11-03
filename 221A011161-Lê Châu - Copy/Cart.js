window.addEventListener("DOMContentLoaded", function () {
  // ========== TÌM KIẾM & LỌC ==========
  let currentFilter = "all";
  const searchBoxes = document.querySelectorAll(".search-box"); 
  const searchIcon = document.getElementById("search-icon");
  const searchBox = document.getElementById("search-box");
  const items = document.querySelectorAll(".top-content-item");
  const productList = document.querySelector(".product-list");

  // Lấy filter từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const urlFilter = urlParams.get("filter");
  const urlSearch = urlParams.get("search");
  if (urlFilter) currentFilter = urlFilter.toLowerCase();
  if (urlSearch) searchBoxes.forEach(box => box.value = urlSearch);

  // Gõ vào tất cả các ô tìm kiếm
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

  // Toggle hiện/ẩn ô tìm kiếm
  searchIcon?.addEventListener("click", function () {
    if (searchBox.style.display === "none" || searchBox.style.display === "") {
      searchBox.style.display = "inline-block";
      searchBox.focus();
    } else {
      searchBox.style.display = "none";
    }
  });

  // Lấy danh sách sản phẩm lọc được
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

  // Lọc và hiển thị sản phẩm
  function filterProducts() {
    const filtered = getFilteredProducts();
    items.forEach(item => item.style.display = "none");

    if (filtered.length > 0) {
      filtered.forEach(product => product.element.style.display = "block");
      if (productList) productList.innerHTML = "";
    } else {
      if (productList) productList.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
    }
  }

  // Sự kiện các nút lọc
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
      currentFilter = btn.dataset.collection;
      filterProducts();
    });
  });

  // Đọc từ khóa từ localStorage
  const savedSearchTerm = localStorage.getItem("searchTerm");
  if (savedSearchTerm) {
    searchBoxes.forEach(box => box.value = savedSearchTerm);
    localStorage.removeItem("searchTerm");
  }

  // ========== GIỎ HÀNG ==========
  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  function renderCart() {
    const cartBody = document.getElementById('cart-body');
    const cart = getCart();
    cartBody.innerHTML = '';

    if (cart.length === 0) {
      document.getElementById('empty-cart').style.display = 'block';
      document.getElementById('cart-table').style.display = 'none';
      document.querySelector('.cart-summary').style.display = 'none';
      document.querySelector('.cart-buttons').style.display = 'none';
      return;
    }
    document.getElementById('empty-cart').style.display = 'none';
    document.getElementById('cart-table').style.display = 'table';
    document.querySelector('.cart-summary').style.display = 'flex';
    document.querySelector('.cart-buttons').style.display = 'flex';

    let total = 0;
    cart.forEach((item, index) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      const subtotal = price * quantity;
      total += subtotal;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td data-label="Sản phẩm">${item.name}</td>
        <td data-label="Đơn giá">${price.toLocaleString()}₫</td>
        <td data-label="Số lượng">
          <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
          <span>${quantity}</span>
          <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
        </td>
        <td data-label="Thành tiền">${subtotal.toLocaleString()}₫</td>
        <td data-label="Xóa"><button class="delete-btn" data-index="${index}">🗑</button></td>
      `;
      cartBody.appendChild(row);
    });
    document.getElementById('cart-total').textContent = total.toLocaleString() + '₫';
  }

  // Sự kiện trong giỏ hàng
  document.getElementById('cart-body')?.addEventListener('click', function (e) {
    const cart = getCart();
    const index = e.target.dataset.index;
    if (!index) return;

    if (e.target.classList.contains('delete-btn')) {
      cart.splice(index, 1);
      saveCart(cart);
      renderCart();
      return;
    }
    if (e.target.classList.contains('qty-btn')) {
      const action = e.target.dataset.action;
      const currentQuantity = parseInt(cart[index].quantity) || 0;
      if (action === 'increase') cart[index].quantity = currentQuantity + 1;
      else if (action === 'decrease' && currentQuantity > 1) cart[index].quantity = currentQuantity - 1;
      saveCart(cart);
      renderCart();
    }
  });

  document.getElementById('checkout-btn')?.addEventListener('click', function () {
    const cart = getCart();
    if (cart.length === 0) {
      alert('Giỏ hàng của bạn đang trống.');
      return;
    }
    alert('Cảm ơn bạn đã mua hàng! (Chức năng thanh toán đang phát triển)');
    localStorage.removeItem('cart');
    renderCart();
  });

  // ========== SIDEBAR LOGIN ==========
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

  // Thực hiện lọc ngay khi tải trang
  filterProducts();
  renderCart();
});
