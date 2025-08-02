// Mảng sản phẩm mẫu (nên thay bằng lấy từ JSON hoặc server thực tế)
document.addEventListener('DOMContentLoaded', () => {
const products = [
  {
    id: "1",
    name: "NDAWN POLO BLACK",
    price: 400000,
    image: "/Trang Chủ/Image/image 3.png",
    description: "Áo polo đen sang trọng, thoáng mát cho mùa hè."
  },
  {
    id: "2",
    name: "NDAWN SHORTS BLACK",
    price: 300000,
    image: "/Trang Chủ/Image/image 4.png",
    description: "Quần short đen cá tính, phù hợp dạo phố."
  },
  {
    id: "3",
    name: "NDAWN DENIM JACKET",
    price: 800000,
    image: "/Trang Chủ/Image/image 2.png",
    description: "Áo khoác denim phong cách cổ điển, phù hợp mọi dịp."
  },
  {
    id: "4",
    name: "NDAWN T-Shirt",
    price: 250000,
    image: "/Trang Chủ/Image/image 1.png",
    description: "Áo thun đơn giản, chất liệu cotton cao cấp."
  },
  {
    id: "5",
    name: "NDAWN TEE BLACK",
    price: 400000,
    image: "/Trang Chủ/Image/image 5.png",
    description: "Áo thun đen basic, dễ phối đồ."
  },
  {
    id: "6",
    name: "NDAWN TEE BLACK",
    price: 600000,
    image: "/Trang Chủ/Image/image 6.png",
    description: "Thiết kế cá tính, chất vải co giãn tốt."
  },
  {
    id: "7",
    name: "BANDANA BLACK",
    price: 150000,
    image: "/Trang Chủ/Image/image 7.png",
    description: "Khăn bandana thời trang màu đen cá tính."
  },
  {
    id: "8",
    name: "NDAWN NECKLACE GREY",
    price: 400000,
    image: "/Trang Chủ/Image/image 8.png",
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
  if (product) {
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").innerHTML = `Giá: ${product.price.toLocaleString()}<sup>đ</sup>`;
    document.getElementById("product-description").textContent = product.description;
  } else {
    document.querySelector(".product-info").innerHTML = "<p>Sản phẩm không tồn tại.</p>";
    return; // không tiếp tục nếu không có sản phẩm
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
