 let currentFilter = "all";
  const searchBoxes = document.querySelectorAll(".search-box"); 
  const searchIcon = document.getElementById("search-icon");
  const searchBox = document.getElementById("search-box");
  const items = document.querySelectorAll(".top-content-item");

  // Gõ vào tất cả các ô tìm kiếm
  searchBoxes.forEach(box => {
    box.addEventListener("input", filterProducts);
  box.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const keyword = box.value.trim();
      if (keyword) {
        // Lưu từ khóa vào localStorage
        localStorage.setItem("searchTerm", keyword);
        window.location.href = "Home.html"; 


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

  // Hàm lọc sản phẩm
  function filterProducts() {
    let searchTerm = "";
    searchBoxes.forEach(box => {
      if (box.value) searchTerm = box.value.toLowerCase();
    });

    items.forEach((item) => {
      const name = item.dataset.name?.toLowerCase() || "";
      const price = parseInt(item.dataset.price);
      const category = item.dataset.clothes?.toLowerCase() || "";

      const matchName = name.includes(searchTerm);
      const matchPrice = !isNaN(searchTerm) && price === parseInt(searchTerm);
      const matchCategory = category.includes(searchTerm);
      const matchSearch = matchName || matchPrice || matchCategory;

      const matchType = currentFilter === "all" || category === currentFilter;

      item.style.display = (matchSearch && matchType) ? "block" : "none";
    });
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

  // Bổ sung lọc từ các nút menu dropdown
  document.querySelectorAll(".btn-filter").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      currentFilter = btn.dataset.filter;
      filterProducts();
    });
  });
document.addEventListener('DOMContentLoaded', () => {
const products = [
  {
    id: "1",
    name: "NDAWN POLO BLACK",
    price: 400000,
    image: "Image/image 3.png",
    description: "Áo polo đen sang trọng, thoáng mát cho mùa hè."
  },
  {
    id: "2",
    name: "NDAWN SHORTS BLACK",
    price: 300000,
    image: "Image/image 4.png",
    description: "Quần short đen cá tính, phù hợp dạo phố."
  },
  {
    id: "3",
    name: "NDAWN DENIM JACKET",
    price: 800000,
    image: "Image/image 2.png",
    description: "Áo khoác denim phong cách cổ điển, phù hợp mọi dịp."
  },
  {
    id: "4",
    name: "NDAWN T-Shirt",
    price: 250000,
    image: "Image/image 1.png",
    description: "Áo thun đơn giản, chất liệu cotton cao cấp."
  },
  {
    id: "5",
    name: "NDAWN TEE BLACK",
    price: 400000,
    image: "Image/image 5.png",
    description: "Áo thun đen basic, dễ phối đồ."
  },
  {
    id: "6",
    name: "NDAWN TEE BLACK",
    price: 600000,
    image: "Image/image 6.png",
    description: "Thiết kế cá tính, chất vải co giãn tốt."
  },
  {
    id: "7",
    name: "BANDANA BLACK",
    price: 150000,
    image: "Image/image 7.png",
    description: "Khăn bandana thời trang màu đen cá tính."
  },
  {
    id: "8",
    name: "NDAWN NECKLACE GREY",
    price: 400000,
    image: "Image/image 8.png",
    description: "Dây chuyền xám thời thượng, phong cách đường phố."
  }
];

// Lấy ID sản phẩm từ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Tìm sản phẩm theo ID
const product = products.find(p => p.id === productId);

if (product) {
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").innerHTML = `Giá: ${product.price.toLocaleString()}<sup>đ</sup>`;
  document.getElementById("product-description").textContent = product.description;
} else {
  document.querySelector(".product-info").innerHTML = "<p>Sản phẩm không tồn tại.</p>";
}
  const addToCartBtn = document.querySelector('.add-to-cart');

  addToCartBtn.addEventListener('click', () => {
    const productName = document.getElementById('product-name').innerText;
    const rawPrice = document.getElementById('product-price').innerText;
    const productPrice = Number(rawPrice.replace(/[^\d]/g, ''));
    const productImage = document.getElementById('product-image').src;

    const item = {
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Chuyển sang trang giỏ hàng
    window.location.href = "/Thanh toán/Cart.html";
  });
});