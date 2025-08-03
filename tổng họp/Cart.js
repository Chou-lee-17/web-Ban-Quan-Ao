// Lấy giỏ hàng từ localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Lưu giỏ hàng vào localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Hiển thị giỏ hàng
function renderCart() {
  const cartBody = document.getElementById('cart-body');
  const cart = getCart();
  cartBody.innerHTML = '';

  // Nếu giỏ hàng trống
  if (cart.length === 0) {
    document.getElementById('empty-cart').style.display = 'block';
    document.getElementById('cart-table').style.display = 'none';
    document.querySelector('.cart-summary').style.display = 'none';
    document.querySelector('.cart-buttons').style.display = 'none';
    return;
  }

  // Nếu có sản phẩm
  document.getElementById('empty-cart').style.display = 'none';
  document.getElementById('cart-table').style.display = 'table';
  document.querySelector('.cart-summary').style.display = 'flex';
  document.querySelector('.cart-buttons').style.display = 'flex';

  let total = 0;

  cart.forEach((item, index) => {
    // Ép kiểu dữ liệu an toàn
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

  // Hiển thị tổng tiền
  document.getElementById('cart-total').textContent = total.toLocaleString() + '₫';
}

// Xử lý các nút trong bảng giỏ hàng
document.getElementById('cart-body').addEventListener('click', function (e) {
  const cart = getCart();
  const index = e.target.dataset.index;

  if (!index) return;

  // Xóa sản phẩm
  if (e.target.classList.contains('delete-btn')) {
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
    return;
  }

  // Tăng/giảm số lượng
  if (e.target.classList.contains('qty-btn')) {
    const action = e.target.dataset.action;
    const currentQuantity = parseInt(cart[index].quantity) || 0;

    if (action === 'increase') {
      cart[index].quantity = currentQuantity + 1;
    } else if (action === 'decrease' && currentQuantity > 1) {
      cart[index].quantity = currentQuantity - 1;
    }

    saveCart(cart);
    renderCart();
  }
});

// Xử lý nút "Thanh toán"
document.getElementById('checkout-btn').addEventListener('click', function () {
  const cart = getCart();

  if (cart.length === 0) {
    alert('Giỏ hàng của bạn đang trống.');
    return;
  }

  alert('Cảm ơn bạn đã mua hàng! (Chức năng thanh toán đang phát triển)');
  localStorage.removeItem('cart');
  renderCart();
});

// Gọi khi trang load
renderCart();
