document.getElementById('dashboardForm').addEventListener('submit', function(e) {
    e.preventDefault();

    document.getElementById('totalUsers').textContent = document.getElementById('inputUsers').value || '0';
    document.getElementById('totalOrders').textContent = document.getElementById('inputOrders').value || '0';
    document.getElementById('totalSales').textContent = document.getElementById('inputSales').value || '0';
    document.getElementById('userGrowth').textContent = document.getElementById('inputGrowth').value || '0';

    this.reset();
});

// Add New User
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('inputID').value;
    const name = document.getElementById('inputName').value;
    const date = document.getElementById('inputDate').value;
    const rank = document.getElementById('inputRank').value;
    const price = document.getElementById('inputPrice').value;

    const table = document.getElementById('userTable');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${date}</td>
        <td>${rank}</td>
        <td>${price}</td>
    `;

    table.appendChild(newRow);
    this.reset();
});
window.addEventListener("DOMContentLoaded", function () {
    const dashboardSection = document.querySelector(".main");

    const btnDashboard = document.querySelector(".sidebar ul li:nth-child(1)");
    const btnProduct = document.querySelector(".sidebar ul li:nth-child(2)");
    const btnInbox = document.querySelector(".sidebar ul li:nth-child(3)");

    btnDashboard.addEventListener("click", function () {
        dashboardSection.innerHTML = `
            <h2>Dashboard</h2>
            <div class="cards">
                <div class="card"><div class="number">1300</div><div class="label">Total Users</div></div>
                <div class="card"><div class="number">15.5K</div><div class="label">Total Orders</div></div>
                <div class="card"><div class="number">$60.8K</div><div class="label">Total Sales</div></div>
                <div class="card"><div class="number">800</div><div class="label">User Growth</div></div>
            </div>
        `;
    });

    btnProduct.addEventListener("click", function () {
        dashboardSection.innerHTML = `
            <h2>Product</h2>
            <p>Danh sach san pham se hien o day...</p>
        `;
    });

    btnInbox.addEventListener("click", function () {
        dashboardSection.innerHTML = `
            <h2>Inbox</h2>
            <p>Danh sach tin nhan se hien o day...</p>
        `;
    });
});
