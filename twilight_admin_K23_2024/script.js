import { allProducts } from '../common/data/productArray.js'; // Import mảng sản phẩm từ file productArray.js
import { customerArray } from '../common/data/customerArray.js'; // Import class Customer và Address từ file customerArray.js
import { orderArray, addOrderToArray, filterOrderByStatus, filterOrdersBetweenTwoDate, sortOrderByDistrict, addTestOrderToArray, createStatisticsProductArray, createStatisticsCustomerArray } from '../common/data/orderArray.js'; 
import {customAlert, customConfirm} from '../common/data/utilities.js';


// LOGIN
document.addEventListener('DOMContentLoaded', function() {
    const loginPopup = document.getElementById('login-popup');
    const overlay = document.getElementById('overlay');
    const wrap = document.getElementById('wrap');

    // Function to check login status and session expiration
    function checkAdminLogin() {
        const adminLoggedIn = localStorage.getItem('adminLoggedIn');
        const loginTimestamp = localStorage.getItem('loginTimestamp');

        if (adminLoggedIn && loginTimestamp) {
            const currentTime = Date.now();
            const sessionDuration = 5 * 60 * 1000; // 5 minutes in milliseconds

            if (currentTime - parseInt(loginTimestamp) < sessionDuration) {
                // Admin is logged in and session is still valid
                loginPopup.style.display = 'none';
                overlay.style.display = 'none';
                wrap.style.display = 'block';
                return true;
            } else {
                // Session has expired
                localStorage.removeItem('adminLoggedIn');
                localStorage.removeItem('loginTimestamp');
                loginPopup.style.display = 'block';
                overlay.style.display = 'block';
                wrap.style.display = 'none';
                return false;
            }
        } else {
            // Admin is not logged in
            loginPopup.style.display = 'block';
            overlay.style.display = 'block';
            wrap.style.display = 'none';
            return false;
        }
    }

    // Call checkAdminLogin on page load
    checkAdminLogin();
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        document.getElementById('login-popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('wrap').style.display = 'block';

        // Store login status and timestamp in localStorage
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('loginTimestamp', Date.now().toString());
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
}

// SIDEBAR 
function updateContentWidth() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    
    if (sidebar.classList.contains('hide')) {
        content.style.width = 'calc(100% - 70px)';
        content.style.left = '70px';
    } else {
        content.style.width = 'calc(100% - 250px)';
        content.style.left = '250px';
    }
}
// TOGGLE SIDEBAR
function zoomInSideBar(){
    const menuBars = document.querySelectorAll('#hidden-sidebar-btn');
    const sideBar = document.getElementById('sidebar');

    if (menuBars.length > 0 && sideBar) {
        menuBars.forEach(menuBar => {
            menuBar.addEventListener('click', () => {
                sideBar.classList.toggle('hide');
                updateContentWidth(); // Gọi hàm để cập nhật kích thước content
            });
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    zoomInSideBar();
    handleResize();
});
// Hàm thay đổi kích thước khi thay đổi kích thước màn hình
function handleResize() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const sidebarItems = document.querySelectorAll('#sidebar .side-menu li');
    
    if (window.innerWidth < 1360) {
        sidebar.classList.add('hide');
        content.style.width = 'calc(100% - 70px)';
        content.style.left = '70px';
        sidebarItems.forEach(item => item.classList.add('disable'));
    } else {
        sidebar.classList.remove('hide');
        content.style.width = 'calc(100% - 250px)';
        content.style.left = '250px';
        sidebarItems.forEach(item => item.classList.remove('disable'));
    }
}

// Sự kiện khi thay đổi kích thước màn hình
window.addEventListener('resize', handleResize);

// Thay đổi trạng thái "active | disable" cho các <li>: 
// click -> active, remove active cho các <li> khác
function changeActiveSideBar(){
    const allSideMenuItems = document.querySelectorAll('#sidebar .side-menu li a');
    allSideMenuItems.forEach(item => {
        // Lưu lại <li> muốn show
        const li = item.parentElement;
        item.addEventListener('click', () => {
            // Tất cả <li> bị xóa class item--active khi 'click'
            allSideMenuItems.forEach(i => {
                i.parentElement.classList.remove('item--active');
            });
            // Thêm lớp item--active vào thẻ <li> cha, cái được 'click'
            li.classList.add('item--active');
        });
    });
}
changeActiveSideBar();

/* END SIDEBAR */ 

/** HIỆN TỪNG MAIN-ITEM TƯƠNG ỨNG KHI ẤN VÀO THANH SIDEBAR 
 *  Ấn Dashboard hiện main__dashboard, ẩn các cái khác,...
 * */
// Func: ẩn toàn bộ các main-item
function hideAllMainItems() {
    // Duyệt qua toàn bộ main-item và gán style 'none'
    document.querySelectorAll('.main-item').forEach(item => {
        item.style.display = 'none';
    });
}
// Func: hiển thị cụ thể main-item được 'click' tương ứng tại sidebar
function showMainItem(itemId) {
    hideAllMainItems();
    const item = document.getElementById(itemId);
    if (item) {
        item.style.display = 'block';  // Hiển thị main-item theo id
    }
    localStorage.setItem('currentPage', itemId); // Lưu trạng thái trang hiện tại
}
// Đặt event 'click' cho phần main-item tương ứng tại sidebar
function showCorrespondingMain(){
    const sidebarItems = ['sidebar__dashboard', 'sidebar__products', 'sidebar__customers', 'sidebar__orders', 'sidebar__statistics'];
    sidebarItems.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.onclick = () => showMainItem(`main__${id.split('__')[1]}`);
        }
    });
}
showCorrespondingMain();

// Hiển thị main__dashboard mặc định khi tải trang
showMainItem('main__dashboard');

// // Hàm thông báo tự thiết kế
// function customAlert({
//     title = '', 
//     message = '', 
//     type = '', 
//     duration = 3000
// }) {
//     const main = document.getElementById('custom-alert');
//     if (main) {
//         const alert = document.createElement('div');
//         // Tự động xóa thông báo sau thời gian xác định
//         const autoRemoveId = setTimeout(function() {
//             main.removeChild(alert);
//         }, duration + 1000);
//         // Xóa thông báo khi người dùng nhấp vào
//         alert.onclick = function(e) {
//             if (e.target.closest('.custom-alert__close')) {
//                 main.removeChild(alert);
//                 clearTimeout(autoRemoveId);
//             }
//         };
//         const icons ={
//             success: 'fa-solid fa-circle-check',
//             warning: 'fa-solid fa-circle-exclamation',
//         };
//         const icon = icons[type];
//         const delay = (duration / 1000).toFixed(2);
//         alert.classList.add('custom-alert', `custom-alert--${type}`);
//         alert.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
//         alert.innerHTML = `
//             <div class="custom-alert__icon">
//                 <i class="${icon}"></i>
//             </div>
//             <div class="custom-alert__body">
//                 <h3 class="custom-alert__title">${title}</h3>
//                 <p class="custom-alert__msg">${message}</p>
//             </div>
//             <div class="custom-alert__close">
//                 <i class="fa-solid fa-xmark"></i>
//             </div>
//         `;
//         main.appendChild(alert);
//     }
// }

// function customConfirm(message, callback) {
//     // Tạo phần tử modal
//     const modal = document.createElement('div');
//     modal.classList.add('modal');
  
//     // Nội dung của modal
//     const modalContent = document.createElement('div');
//     modalContent.classList.add('modal-confirm');
  
//     // Thông điệp
//     const msg = document.createElement('p');
//     msg.textContent = message;
  
//     // Container cho nút
//     const buttonContainer = document.createElement('div');
//     buttonContainer.classList.add('button-container');
  
//     // Nút "Có"
//     const yesButton = document.createElement('button');
//     yesButton.textContent = 'Có';
//     yesButton.id = 'confirmYes';
//     yesButton.onclick = function() {
//       document.body.removeChild(modal);
//       callback(true);
//     };
  
//     // Nút "Không"
//     const noButton = document.createElement('button');
//     noButton.textContent = 'Không';
//     noButton.id = 'confirmNo';
//     noButton.onclick = function() {
//       document.body.removeChild(modal);
//       callback(false);
//     };
  
//     // Lắp ráp các phần tử
//     buttonContainer.appendChild(yesButton);
//     buttonContainer.appendChild(noButton);
//     modalContent.appendChild(msg);
//     modalContent.appendChild(buttonContainer);
//     modal.appendChild(modalContent);
//     document.body.appendChild(modal);
  
//     // Hiển thị modal
//     modal.style.display = 'flex';
// }
/* MAIN__PRODUCTS */
let filteredProducts = []; // Lấy productArray từ localStorage đã được import từ productArray.js
let currentOrdersArray = [];
// *** Bắt đầu thêm các biến phân trang cho Products và Customers ***
// Phân trang cho Products với 8 sản phẩm mỗi trang
let currentProductPage = 1;
let totalProductPages = 1;
const itemsPerPageProduct = 8;

// Phân trang cho Customers với 10 khách hàng mỗi trang
let currentCustomerPage = 1;
let totalCustomerPages = 1;
const itemsPerPageCustomer = 10;

// Phân trang cho Orders với 5 đơn hàng mỗi trang
let currentOrderPage = 1;
let totalOrderPages = 1;
const itemsPerPageOrder = 5;

// Phân trang cho Statistics với 10 thống kê mỗi trang
let currentStatisticsProductPage = 1;
let totalStatisticsProductPages = 1;
const itemsPerPageStatisticsProduct = 10;

// Phân trang cho Statistics với 10 thống kê mỗi trang
let currentStatisticsCustomerPage = 1;
let totalStatisticsCustomerPages = 1;
const itemsPerPageStatisticsCustomer = 10;
// *** Kết thúc thêm các biến phân trang ***

// Chức năng tìm kiếm sản phẩm
const searchInput = document.getElementById('product-name');
const brandFilter = document.getElementById('brand');
if (searchInput && brandFilter) {
    searchInput.addEventListener('input', filterProducts);
    brandFilter.addEventListener('change', filterProducts);
}

// Hàm lọc sản phẩm
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedBrand = brandFilter.value.toUpperCase().trim();

    // Lọc sản phẩm dựa trên tiêu chí tìm kiếm
    filteredProducts = allProducts.filter(product => {
        const nameMatches = product.name.toLowerCase().includes(searchTerm);
        const brandMatches = selectedBrand === 'ALL' || product.brandId.toUpperCase() === selectedBrand;

        return nameMatches && brandMatches;
    });

    // Tạo phân trang cho sản phẩm đã lọc
    totalProductPages = Math.ceil(filteredProducts.length / itemsPerPageProduct);

    // Hiển thị trang đầu tiên của sản phẩm đã lọc
    currentProductPage = 1;
    displayProductPage(currentProductPage);

    // Tạo lại nút phân trang cho Products
    createPagination(totalProductPages, 'product');
}
let currentVersionIndex = 0; // Biến toàn cục để lưu trữ phiên bản hiện tại

// Sau khi tạo bảng sản phẩm
function displayProductPage(page) {
    let s = '<tr><th>#ID</th><th>Ảnh</th><th>Tên sản phẩm</th><th>Thương hiệu</th><th>Giá<br> Phiên Bản <input type="number" id="version-index" value="' + (currentVersionIndex + 1) + '" min="1" max="' + getMaxVersions() + '" onchange="updateVersionIndex(this.value - 1)"></th><th>Thông tin</th><th>Hành động</th></tr>';
    let dem = 0;
    const start = (page - 1) * itemsPerPageProduct;
    const end = start + itemsPerPageProduct;
    for (let i = start; i < filteredProducts.length && i < end; i++) {
        const product = filteredProducts[i];
        s += '<tr>' +
            '<td>' + product.productId + '</td>' +
            '<td>' +
                '<div class="product-image-container">' +
                '<img src="' + product.img + '" alt="Sản phẩm"></div></td>' +
            '<td>' + product.name + '</td>' +
            '<td>' + product.brandId.toUpperCase() + '</td>' +
            '<td>' + (product.price[currentVersionIndex] !== undefined ? formatPrice(product.price[currentVersionIndex]) : '-') + '</td>' +
            '<td>' +
                '<button class="detail-btn" data-index="' + i + '">Chi tiết</button>' +
            '</td>' +
            '<td>' +
                '<button class="delete-btn" data-index="' + i + '">Xóa</button>' +
                '<button class="edit-btn" data-index="' + i + '">Sửa</button>' +
            '</td>' +
        '</tr>';
        dem++;
        if (dem === itemsPerPageProduct) {
            break; // Nếu đã đủ số sản phẩm trên một trang thì dừng
        }
    }
    document.getElementById('product-table-content__body').innerHTML = s; // Hiển thị nội dung bảng
    updatePagination('product'); // Cập nhật nút phân trang

    // Thêm event listeners cho các nút xem chi tiết
    document.querySelectorAll('#main__products .detail-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productIndex = parseInt(this.getAttribute('data-index'), 10);
            showDetailsProductBox(productIndex);
        });
    });

    // Thêm event listeners cho các nút sửa
    document.querySelectorAll('#main__products .edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productIndex = parseInt(this.getAttribute('data-index'), 10);
            showChangeProductBox(productIndex);
        });
    });

    // Thêm event listeners cho các nút xóa
    document.querySelectorAll('#table_list .delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productIndex = parseInt(this.getAttribute('data-index'), 10);
            deleteProduct(productIndex);
        });
    });
}

function getMaxVersions() {
    return Math.max(...filteredProducts.map(product => product.price.length));
}

function updateVersionIndex(index) {
    currentVersionIndex = index;
    displayProductPage(currentProductPage);
}

// Tạo nút phân trang
function createPagination(totalPages, type) {
    let paginationId = '';
    if (type === 'product') {
        paginationId = 'pagination-products';
    } else if (type === 'customer') {
        paginationId = 'pagination-customers';
    } else if (type === 'order') {
        paginationId = 'pagination-orders';
    } else if (type === 'statistics-product') {
        paginationId = 'pagination-statistics-products';
    } else if (type === 'statistics-customer') {
        paginationId = 'pagination-statistics-customers';
    } else {
        paginationId = 'pagination';
    }

    const pagination = document.getElementById(paginationId);
    if (!pagination) return;
    pagination.innerHTML = '';

    if (totalPages <= 1) return; // Không cần phân trang nếu chỉ có một trang

    // Nút Trước
    const prevButton = document.createElement('a');
    prevButton.href = "#";
    prevButton.innerHTML = "&laquo;";
    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (type === 'product' && currentProductPage > 1) {
            currentProductPage--;
            displayProductPage(currentProductPage);
            updatePagination('product');
        } else if (type === 'customer' && currentCustomerPage > 1) {
            currentCustomerPage--;
            displayCustomerPage(currentCustomerPage);
            updatePagination('customer');
        } else if (type === 'order' && currentOrderPage > 1) {
            currentOrderPage--;
            displayOrdersTable(currentOrdersArray);
            updatePagination('order');
        } else if (type === 'statistics-product' && currentStatisticsProductPage > 1) {
            currentStatisticsProductPage--;
            displayStatisticsProduct(currentStatisticsProductPage);
            updatePagination('statistics-product');
        } else if (type === 'statistics-customer' && currentStatisticsCustomerPage > 1) {
            currentStatisticsCustomerPage--;
            displayStatisticsCustomer(currentStatisticsCustomerPage);
            updatePagination('statistics-customer');
        }
    });
    pagination.appendChild(prevButton);

    // Các Nút Số Trang
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('a');
        button.href = "#";
        button.textContent = i;
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (type === 'product') {
                currentProductPage = i;
                displayProductPage(currentProductPage);
                updatePagination('product');
            } else if (type === 'customer') {
                currentCustomerPage = i;
                displayCustomerPage(currentCustomerPage);
                updatePagination('customer');
            } else if (type === 'order') {
                currentOrderPage = i;
                displayOrdersTable(currentOrdersArray);
                updatePagination('order');
            } else if (type === 'statistics-product') {
                 currentStatisticsProductPage = i;
                 displayStatisticsProduct( currentStatisticsProductPage);
                updatePagination('statistics-product');
            } else if (type === 'statistics-customer') {
                currentStatisticsCustomerPage = i;
                displayStatisticsCustomer(currentStatisticsCustomerPage);
                updatePagination('statistics-customer');
            }
        });
        if (
            (type === 'product' && i === currentProductPage) ||
            (type === 'customer' && i === currentCustomerPage) ||
            (type === 'order' && i === currentOrderPage) ||
            (type === 'statistics-product' && i === currentStatisticsProductPage) ||
            (type === 'statistics-customer' && i === currentStatisticsCustomerPage)
        ) {
            button.classList.add('active');
        }
        pagination.appendChild(button);
    }

    // Nút Tiếp Theo
    const nextButton = document.createElement('a');
    nextButton.href = "#";
    nextButton.innerHTML = "&raquo;";
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (type === 'product' && currentProductPage < totalProductPages) {
            currentProductPage++;
            displayProductPage(currentProductPage);
            updatePagination('product');
        } else if (type === 'customer' && currentCustomerPage < totalCustomerPages) {
            currentCustomerPage++;
            displayCustomerPage(currentCustomerPage);
            updatePagination('customer');
        } else if (type === 'order' && currentOrderPage < totalOrderPages) {
            currentOrderPage++;
            displayOrdersTable(currentOrdersArray);
            updatePagination('order');
        } else if (type === 'statistics-product' && currentStatisticsProductPage < totalStatisticsProductPages) {
            currentStatisticsProductPage++;
            displayStatisticsProduct(currentStatisticsProductPage);
            updatePagination('statistics-product');
        } else if (type === 'statistics-customer' && currentStatisticsCustomerPage < totalStatisticsCustomerPages) {
            currentStatisticsCustomerPage++;
            displayStatisticsCustomer(currentStatisticsCustomerPage);
            updatePagination('statistics-customer');
        }
    });
    pagination.appendChild(nextButton);
}

function updatePagination(type) { // Thêm tham số 'type'
    let paginationId = '';
    if (type === 'product') {
        paginationId = 'pagination-products';
    } else if (type === 'customer') {
        paginationId = 'pagination-customers';
    } else if (type === 'order') {
        paginationId = 'pagination-orders';
    } else if (type === 'statistics-product') {
        paginationId = 'pagination-statistics-products';
    } else if (type === 'statistics-customer') {
        paginationId = 'pagination-statistics-customers';
    } else {
        paginationId = 'pagination';
    }

    const paginationLinks = document.querySelectorAll(`#${paginationId} a`);
    paginationLinks.forEach(link => {
        link.classList.remove('active');
        if (type === 'product') {
            if (parseInt(link.textContent) === currentProductPage) {
                link.classList.add('active');
            }
        } else if (type === 'customer') {
            if (parseInt(link.textContent) === currentCustomerPage) {
                link.classList.add('active');
            }
        } else if (type === 'order') {
            if (parseInt(link.textContent) === currentOrderPage) {
                link.classList.add('active');
            }
        } else if (type === 'statistics-product') {
            if (parseInt(link.textContent) === currentStatisticsProductPage) {
                link.classList.add('active');
            }
        } else if (type === 'statistics-customer') {
            if (parseInt(link.textContent) === currentStatisticsCustomerPage) {
                link.classList.add('active');
            }
        }
    });
}

// Thêm các sự kiện khi trang được tải 
document.addEventListener('DOMContentLoaded', () => {
    showCorrespondingMain();

    // Kiểm tra nếu allProducts rỗng thì tải từ localStorage
    if (allProducts.length === 0) {
        // alert('Không có sản phẩm nào trong productArray. Vui lòng kiểm tra lại.');
        customAlert({
            title: 'Thất bại!',
            message: 'Không có sản phẩm nào trong productArray. Vui lòng kiểm tra lại.',
            type: 'warning'
        });
    } else {
        filteredProducts = allProducts.slice(); // Sao chép mảng sản phẩm
        totalProductPages = Math.ceil(filteredProducts.length / itemsPerPageProduct);
        createPagination(totalProductPages, 'product'); // Tạo nút phân trang cho sản phẩm
        displayProductPage(currentProductPage); // Hiển thị trang đầu tiên của sản phẩm
    }

    // Thêm sự kiện submit cho form thêm sản phẩm 
    const addProductForm = document.getElementById('add-product-form'); 
    if (addProductForm) { 
        addProductForm.addEventListener('submit', addProduct); 
    }

    totalCustomerPages = Math.ceil(customerArray.length / itemsPerPageCustomer);
    createPagination(totalCustomerPages, 'customer'); // Tạo nút phân trang cho khách hàng
    displayCustomerPage(currentCustomerPage);
    // Thêm sự kiện submit cho form thêm khách hàng
    const addCustomerForm = document.getElementById('add-customer-form'); 
    if (addCustomerForm) { 
        addCustomerForm.addEventListener('submit', addCustomer); 
    }

    totalOrderPages = Math.ceil(orderArray.length / itemsPerPageOrder);
    createPagination(totalOrderPages, 'order'); // Tạo nút phân trang cho đơn hàng
    displayOrdersTable(orderArray); // Hiển thị trang đầu tiên của đơn hàng


    totalStatisticsProductPages = Math.ceil(statisticsProductArray.length / itemsPerPageStatisticsProduct);    createPagination(totalStatisticsProductPages, 'statistics-product'); // Tạo nút phân trang cho thống kê
    displayStatisticsProduct(currentStatisticsProductPage); // Hiển thị trang đầu tiên của thống kê


    totalStatisticsCustomerPages = Math.ceil(createStatisticsCustomerArray.length / itemsPerPageStatisticsCustomer);
    createPagination(totalStatisticsCustomerPages, 'statistics-customer'); // Tạo nút phân trang cho thống kê
    displayStatisticsCustomer(currentStatisticsCustomerPage); // Hiển thị trang đầu tiên của thống kê

});

document.getElementById('new-number-of-versions').addEventListener('input', function() {
    const container = document.getElementById('versions-container');
    container.innerHTML = ''; // Clear previous inputs
    const num = parseInt(this.value, 10);
    if (isNaN(num) || num < 1) return;
    for (let i = 1; i <= num; i++) {
        const versionDiv = document.createElement('div');
        versionDiv.innerHTML = `
            <h3>Phiên bản ${i}</h3>
            <div class="short_info">
                <label class="short-label" for="version-price-${i}">Giá:</label>
                <input type="number" class="short-input" id="version-price-${i}" placeholder="Nhập giá phiên bản ${i}..." min="0" step="1" required>
            </div>
            <div class="short_info">
                <label class="short-label" for="version-pb-${i}">Chi tiết phiên bản:</label>
                <input type="text" class="short-input" id="version-pb-${i}" placeholder="Nhập chi tiết phiên bản ${i}..." required>
            </div>
        `;
        container.appendChild(versionDiv);
    }
});
// Test_script.js

function addProduct(event) {
    event.preventDefault();

    const productName = document.getElementById('new-product-name').value.trim();
    const brand = document.getElementById('new-brand').value.trim();
    const numberOfVersions = parseInt(document.getElementById('new-number-of-versions').value.trim(), 10);

    if (!productName || !brand || isNaN(numberOfVersions) || numberOfVersions < 1) {
        customAlert({
            title: 'Thất bại!',
            message: 'Vui lòng nhập tên sản phẩm, thương hiệu và số phiên bản hợp lệ.',
            type: 'warning'
        });
        return false;
    }

    let prices = [];
    let pbs = [];
    for (let i = 1; i <= numberOfVersions; i++) {
        const versionPrice = document.getElementById(`version-price-${i}`).value.trim();
        const versionDetails = document.getElementById(`version-pb-${i}`).value.trim();

        if (!versionPrice || !versionDetails) {
            customAlert({
                title: 'Thất bại!',
                message: `Vui lòng nhập đầy đủ thông tin cho phiên bản ${i}.`,
                type: 'warning'
            });
            return false;
        }

        prices.push(parseFloat(versionPrice));
        pbs.push(versionDetails);
    }

    const chip = document.getElementById('new-chip').value.trim();
    const pin = document.getElementById('new-pin').value.trim();
    const size = document.getElementById('new-size').value.trim();
    const f = document.getElementById('new-f').value.trim();
    const imgInput = document.getElementById('new-image-upload');
    let imgPath = '../common/images/img-prd/default.png'; // Đường dẫn mặc định nếu không có ảnh

    if (imgInput.files && imgInput.files[0]) {
        const file = imgInput.files[0];
        const imgURL = URL.createObjectURL(file);

        // Tạo liên kết tải xuống
        const a = document.createElement('a');
        a.href = imgURL;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // Lưu đường dẫn ảnh
        imgPath = `../common/images/img-prd/${file.name}`;
    }

    if (!chip || !pin || !size || !f) {
        customAlert({
            title: 'Thất bại!',
            message: 'Vui lòng nhập đầy đủ thông số kỹ thuật sản phẩm.',
            type: 'warning'
        });
        return false;
    }

    const newProduct = {
        productId: generateNewProductId(),
        brandId: brand,
        name: productName,
        price: prices,
        pb: pbs,
        chip: chip,
        pin: pin,
        size: size,
        f: f,
        img: imgPath
    };

    allProducts.push(newProduct);
    localStorage.setItem('productArray', JSON.stringify(allProducts));

    filterProducts();
    customAlert({
        title: 'Thành công!',
        message: 'Sản phẩm đã được thêm thành công.',
        type: 'success'
    });

    document.querySelector('.subsection form').reset();
}
function generateNewProductId() {
    return allProducts.length > 0
        ? (parseInt(allProducts[allProducts.length - 1].productId) + 1).toString()
        : "1";
}
// Xóa sản phẩm
function deleteProduct(productIndex) {
    if (productIndex !== -1) {
        customConfirm('Bạn có muốn xóa sản phẩm này không?', function(result) {
            if (result) {
            // Xóa sản phẩm khỏi dữ liệu
            allProducts.splice(productIndex, 1);
  
            // Cập nhật localStorage
            localStorage.setItem('productArray', JSON.stringify(allProducts));
  
            // Cập nhật lại danh sách sản phẩm
            filterProducts();
  
            customAlert({
                title: 'Thành công!',
                message: 'Sản phẩm đã được xóa thành công.',
                type: 'success'
            });
        }
      });
    }
  }

// Hiển thị modal chỉnh sửa sản phẩm
function showChangeProductBox(productIndex) {
    // Hiển thị modal
    const modalChangeProduct = document.getElementById('modal-changeproduct');
    if (modalChangeProduct) {
        modalChangeProduct.style.display = 'flex';
    }

    // Lấy thông tin sản phẩm
    const product = allProducts[productIndex];

    // Điền thông tin vào modal
    document.getElementById('edit-name').value = product.name;
    const editPriceInput = document.getElementById('edit-price');
    if (product.price[currentVersionIndex] !== undefined) {
        editPriceInput.value = product.price[currentVersionIndex];
        editPriceInput.disabled = false;
    } else {
        editPriceInput.value = 'Không có phiên bản này';
        editPriceInput.disabled = true;
    }
    document.getElementById('imgbefore').src = product.img;
    document.getElementById('imgafter').src = 'img-prd/add-img-phone.webp';

    // Cập nhật sự kiện lưu
    const saveProductButton = document.getElementById('save-product');
    saveProductButton.onclick = () => saveProductChanges(productIndex);

    // Thêm sự kiện đóng pop-up
    document.getElementById('close-changeproduct').addEventListener('click', closeChangeProductBox);
}

// Lưu thay đổi sản phẩm
function saveProductChanges(productIndex) {
    const updatedName = document.getElementById('edit-name').value.trim();
    const editPriceInput = document.getElementById('edit-price');
    const updatedPrice = parseFloat(editPriceInput.value.trim()) || 0;
    const updatedImageInput = document.getElementById('edit-image-upload');
    let updatedImage = document.getElementById('imgafter').src;

    if (updatedImageInput.files && updatedImageInput.files[0]) {
        updatedImage = URL.createObjectURL(updatedImageInput.files[0]);
    }

    // Cập nhật thông tin sản phẩm trong mảng
    allProducts[productIndex].name = updatedName;
    if (!editPriceInput.disabled) {
        allProducts[productIndex].price[currentVersionIndex] = updatedPrice;
    }
    if (updatedImageInput.files && updatedImageInput.files[0]) {
        allProducts[productIndex].img = updatedImage;
    }

    // Kiểm tra thông tin cập nhật
    if (
        !allProducts[productIndex].brandId ||
        !allProducts[productIndex].name ||
        (!editPriceInput.disabled && !allProducts[productIndex].price[currentVersionIndex])
    ) {
        customAlert({
            title: 'Thất bại!',
            message: 'Bạn chưa nhập đủ thông tin sản phẩm.',
            type: 'warning'
        });
        return false;
    }

    if (!editPriceInput.disabled && isNaN(allProducts[productIndex].price[currentVersionIndex])) {
        customAlert({
            title: 'Thất bại!',
            message: 'Giá không hợp lệ.',
            type: 'warning'
        });
        return false;
    }

    // Cập nhật localStorage
    localStorage.setItem('productArray', JSON.stringify(allProducts));
    
    // Cập nhật lại danh sách sản phẩm
    filterProducts();

    // Đóng modal
    closeChangeProductBox();

    // Hiển thị thông báo thành công
    customAlert({
        title: 'Thành công!',
        message: 'Sản phẩm đã được chỉnh sửa thành công.',
        type: 'success'
    });
}

// Đóng modal
function closeChangeProductBox() {
    const modalChangeProduct = document.getElementById('modal-changeproduct');
    if (modalChangeProduct) {
        modalChangeProduct.style.display = 'none';
    }
}

// Cập nhật hình ảnh xem trước khi chọn ảnh mới
function changeImagePreview(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imgafter').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
// Hiển thị ảnh ở phần thêm Sản phẩm
function previewImage(event) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function() {
        const img = document.getElementById('img-preview');
        img.src = reader.result;
        img.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]); // Đọc file ảnh
    // Thêm reset ảnh khi reset form
    document.getElementById('add-product-form').addEventListener('reset', function() {
        document.getElementById('img-preview').src = './img-prd/img-add2.png';
    });
}
// Hàm hiển thị chi tiết sản phẩm
function showDetailsProductBox(productIndex) {
    const modalProductDetails = document.getElementById('modal-detailproduct');
    if (modalProductDetails) {
        modalProductDetails.style.display = 'flex';
    }
    
    // Lấy thông tin sản phẩm
    const product = allProducts[productIndex];

    // Điền dữ liệu vào pop-up
    document.getElementById('detail-img').src = product.img;
    document.getElementById('detail-name').innerText = product.name;
    document.getElementById('detail-brand').innerText = product.brandId;
    document.getElementById('detail-chip').innerText = product.chip || "";
    document.getElementById('detail-pin').innerText = product.pin || "";
    document.getElementById('detail-size').innerText = product.size || "";
    document.getElementById('detail-f').innerText = product.f || "";

    // Hiển thị các phiên bản
    const versionsContainer = document.getElementById('detail-versions');
    versionsContainer.innerHTML = ''; // Xóa nội dung cũ

    for (let i = 0; i < product.pb.length; i++) {
        const versionDiv = document.createElement('div');
        versionDiv.innerHTML = `
            <h3>Phiên bản ${i + 1}</h3>
            <p>Giá: <span>${formatPrice(product.price[i])}</span></p>
            <p>Chi tiết: <span>${product.pb[i]}</span></p>
        `;
        versionsContainer.appendChild(versionDiv);
    }

    // Thêm sự kiện đóng pop-up
    document.getElementById('close-detailproduct').addEventListener('click', closeDetailProductBox);
}

// Hàm đóng pop-up
function closeDetailProductBox() {
    const modalProductDetails = document.getElementById('modal-detailproduct');
    if (modalProductDetails) {
        modalProductDetails.style.display = 'none';
    }
}


/* MAIN_CUSTOMERS */

// Hàm Chuyển Pass --> *****
function addPasswordToggleListeners() {
    const passwordCells = document.querySelectorAll('.table-cell-password');
    passwordCells.forEach(cell => {
        cell.addEventListener('click', function() {
            const isMasked = cell.textContent.startsWith('*'); // khai báo biến kiểm tra mật khẩu đã được mask chưa
            if (isMasked) {
                cell.textContent = cell.getAttribute('data-password'); 
                cell.classList.add('active');// hiển thị mật khẩu
            } else {
                cell.textContent = '*'.repeat(cell.getAttribute('data-password').length); // mask mật khẩu * bằng số lượng ký tự
                cell.classList.remove('active');// ẩn mật khẩu
            }
        });
    });
}

// ---CUSTOMER---
// Hiển thị trang khách hàng
function displayCustomerPage(page) {
    // let s = '<tr><th>NO.</th><th>Tên đăng nhập</th><th>Mật khẩu</th><th>Số điện thoại</th><th>Địa chỉ</th><th>Hành động</th><th>Trạng thái</th></tr>';
    let s = '';
    let dem = 0;
    const start = (page - 1) * itemsPerPageCustomer;
    const end = start + itemsPerPageCustomer;
    for (let i = start; i < customerArray.length && i < end; i++) {
        const customer = customerArray[i];
        s += '<tr data-id="' + i + '"' + (customer.locked ? ' class="locked"' : '') + '>' +  // Thêm class "locked" nếu khách hàng bị khóa
            '<td>' + (i + 1) + '</td>' +
            '<td>' + customer.username + '</td>' +
            '<td class="table-cell-password" data-password="' + customer.password + '">' + '*'.repeat(customer.password.length) + '</td>' +
            '<td>' + customer.phone + '</td>' +
            '<td>' + customer.address.numberAndRoad + ', ' + customer.address.district + ', ' + customer.address.city + '</td>' +
            '<td>' + '<button class="edit-btn" data-index="' + i + '"' + (customer.locked ? ' disabled' : '') + '>Sửa</button>' + '</td>' +
            '<td>' + '<button class="key-customer-btn">' + (customer.locked ? 'MỞ KHÓA' : 'KHÓA') + '</button>' +'</td>' +
        '</tr>';
        dem++;
        if (dem == itemsPerPageCustomer) {
            break;
        }
    }

    document.getElementById('customer-table-content__body').innerHTML = s;
    updatePagination('customer');

    // Tính toán tổng số trang cho Customers
    totalCustomerPages = Math.ceil(customerArray.length / itemsPerPageCustomer);
    
    // Tạo phân trang cho khách hàng
    createPagination(totalCustomerPages, 'customer');

    // Thêm event listeners cho các nút sửa
    document.querySelectorAll('#main__customers .edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const customerIndex = parseInt(this.getAttribute('data-index'));
            showChangeCustomerBox(customerIndex);
        });
    });

    // Thêm event listeners cho các nút khóa/mở khóa
    document.querySelectorAll('.key-customer-btn').forEach(button => {
        button.addEventListener('click', function() {
            const customerIndex = parseInt(this.closest('tr').getAttribute('data-id'));
            toggleCustomerLock(customerIndex);
        });
    });

    // Thêm event listeners cho các ô mật khẩu
    addPasswordToggleListeners();
}

// Hàm khóa/mở khóa khách hàng
function toggleCustomerLock(customerIndex) {
    const customer = customerArray[customerIndex];
    customer.locked = !customer.locked; // Toggle trạng thái khóa

    // Cập nhật localStorage
    localStorage.setItem('customerArray', JSON.stringify(customerArray));

    if (customer.locked) {
        // alert('Khách hàng đã bị khóa');
        customAlert({
            title: 'Thành công!',
            message: 'Khách hàng đã bị khóa',
            type: 'success'
        });
        
    } else {
        // alert('Khách hàng đã được mở khóa');
        customAlert({
            title: 'Thành công!',
            message: 'Khách hàng đã được mở khóa.',
            type: 'success'
        });
    }

    // Cập nhật lại bảng khách hàng
    displayCustomerPage(currentCustomerPage);
}

// Hàm kiểm tra username đã tồn tại chưa
function checkExistedUsername(username) {
    for (let customer of customerArray) {
        if (customer.username === username) {
            return true; // Username đã tồn tại
        }
    }
    return false; // Username chưa tồn tại
}

function addCustomer(event) {
    event.preventDefault(); // Ngăn form tự submit

    // Lấy mảng khách hàng từ localStorage
    console.log('Mảng khách hàng trước khi thêm:', customerArray);

    // Lấy giá trị từ các trường nhập liệu
    const username = document.getElementById('new-customer-name').value.trim();
    const password = document.getElementById('new-customer-password').value.trim();
    const phone = document.getElementById('new-customer-phone').value.trim();
    const addressInput = document.getElementById('new-customer-address').value.trim();

    // Kiểm tra thông tin nhập vào
    if (!username || !password || !phone || !addressInput) {
        customAlert({
            title: 'Thất bại!',
            message: 'Bạn chưa nhập đủ thông tin khách hàng.',
            type: 'warning'
        });
        return false;
    }

    // Kiểm tra xem username đã tồn tại chưa
    if (checkExistedUsername(username)) {
        customAlert({
            title: 'Thất bại!',
            message: 'Tên tài khoản đã tồn tại.',
            type: 'warning'
        });
        return false;
    }

    // Tách địa chỉ thành các phần
    const addressParts = addressInput.split(',').map(part => part.trim());

    //Chia thành các phần: Số nhà và đường, Phường, Quận, Thành phố
    const numberAndRoad = addressParts[0] || ''; 
    let district = addressParts[1] || '';
    district = district.replace(/quận\s*/i, ''); // Xóa chữ "Quận" nếu có
    const city = addressParts[2] || '';
    // const ward = addressParts[1] || '';
    // let district = addressParts[2] || '';
    // district = district.replace(/quận\s*/i, ''); // Xóa chữ "Quận" nếu có
    // const city = addressParts[3] || '';

    //Kiểm tra địa chỉ có dạng hợp lệ không
    if (!numberAndRoad || !district || !city) {
        // if (!numberAndRoad || !ward || !district || !city) {
        customAlert({
            title: 'Thất bại!',
            message: "Địa chỉ không hợp lệ.<br>Vui lòng nhập đầy đủ các phần: <br>Số nhà và đường + Phường, Quận, Thành phố.",
            type: 'warning'
        });
        return false;
    }

    // Tạo đối tượng khách hàng mới
    const newCustomer = {
        username: username,
        password: password,
        phone: phone,
        address: {
            city: city,
            district: district,
            // ward: ward,
            numberAndRoad: numberAndRoad
        },
        locked: false // Trạng thái hoạt động
    };

    // Thêm khách hàng vào mảng và lưu vào localStorage
    customerArray.push(newCustomer);
    localStorage.setItem('customerArray', JSON.stringify(customerArray));

    // Cập nhật danh sách khách hàng và thông báo thành công
    displayCustomerPage(currentCustomerPage);
    customAlert({
        title: 'Thành công!',
        message: 'Thêm khách hàng thành công.',
        type: 'success'
    });

    // Reset form
    document.querySelector('#add-customer-form').reset();
}
function showChangeCustomerBox(customerIndex) {
    // Hiển thị modal
    const modalChangeCustomer = document.getElementById('modal-changecustomer');
    if (modalChangeCustomer) {
        modalChangeCustomer.style.display = 'flex';
    }

    // Lấy thông tin sản phẩm
    const customer = customerArray[customerIndex];

    // Điền thông tin vào modal
    document.getElementById('edit-username').value = customer.username;
    document.getElementById('edit-password').value = customer.password;
    document.getElementById('edit-phone').value = customer.phone;
    document.getElementById('edit-address').value = `${customer.address.numberAndRoad}, ${customer.address.district}, ${customer.address.city}`;
    // document.getElementById('edit-address').value = `${customer.address.numberAndRoad}, ${customer.address.ward}, ${customer.address.district}, ${customer.address.city}`;

    // Cập nhật sự kiện lưu
    const saveCustomerButton = document.getElementById('save-customer');
    saveCustomerButton.onclick = () => saveCustomerChanges(customerIndex);

    // Thêm sự kiện đóng pop-up
    document.getElementById('close-changecustomer').addEventListener('click', closeChangeCustomerBox);
}

// Lưu thay đổi sản phẩm
function saveCustomerChanges(customerIndex) {
    const updatedUsername = document.getElementById('edit-username').value.trim();
    const updatedPassword = document.getElementById('edit-password').value.trim();
    const updatedPhone = document.getElementById('edit-phone').value.trim();
    const updatedAddress = document.getElementById('edit-address').value.trim();

    // Cập nhật thông tin khách hàng trong mảng
    customerArray[customerIndex].username = updatedUsername;
    customerArray[customerIndex].password = updatedPassword;
    customerArray[customerIndex].phone = updatedPhone;

    // Tách địa chỉ thành các phần 
    const addressParts = updatedAddress.split(',').map(part => part.trim());
    customerArray[customerIndex].address = {
        numberAndRoad: addressParts[0] || '',
        district: addressParts[1] || '',
        city: addressParts[2] || ''
        // numberAndRoad: addressParts[0] || '',
        // ward: addressParts[1] || '',
        // district: addressParts[2] || '',
        // city: addressParts[3] || ''
    };

    // Kiểm tra thông tin cập nhật
    if (
        !customerArray[customerIndex].username ||
        !customerArray[customerIndex].password ||
        !customerArray[customerIndex].phone ||
        !customerArray[customerIndex].address.numberAndRoad ||
        !customerArray[customerIndex].address.district ||
        !customerArray[customerIndex].address.city
        // !customerArray[customerIndex].username ||
        // !customerArray[customerIndex].password ||
        // !customerArray[customerIndex].phone ||
        // !customerArray[customerIndex].address.numberAndRoad ||
        // !customerArray[customerIndex].address.ward ||
        // !customerArray[customerIndex].address.district ||
        // !customerArray[customerIndex].address.city
    ) {
        customAlert({
            title: 'Thất bại!',
            message: 'Bạn chưa nhập đủ thông tin khách hàng.',
            type: 'warning'
        });
        return false;
    }

    // Cập nhật localStorage
    localStorage.setItem('customerArray', JSON.stringify(customerArray));

    // Cập nhật lại bảng khách hàng
    displayCustomerPage(currentCustomerPage);

    // Đóng modal
    closeChangeCustomerBox();

    // Hiển thị thông báo thành công
    // alert('Khách hàng đã được chỉnh sửa thành công!');
    customAlert({
        title: 'Thành công!',
        message: 'Khách hàng đã được chỉnh sửa thành công!',
        type: 'success'
    });
}

// Đóng modal
function closeChangeCustomerBox() {
    const modalChangeCustomer = document.getElementById('modal-changecustomer');
    if (modalChangeCustomer) {
        modalChangeCustomer.style.display = 'none';
    }
}

/* MAIN_ORDERS */
/** Tìm khách hàng theo username */
function findCustomerByUsername(username) {
    return customerArray.find((customer) => customer.username === username);
}

function getOrdersByPage(page) {
    const start = (page - 1) * itemsPerPageOrder;
    const end = start + itemsPerPageOrder;
    return currentOrdersArray.slice(start, end);
}

function displayOrdersTable(orders, withCondition = false) {
    let tableHTML = ``;
    if(withCondition == false){
        // Cập nhật mảng đơn hàng hiện tại
        currentOrdersArray = orders;
    
        // Tính toán tổng số trang dựa trên tổng số đơn hàng
        totalOrderPages = Math.ceil(currentOrdersArray.length / itemsPerPageOrder);
    
        // Điều chỉnh currentOrderPage nếu vượt quá tổng số trang
        if (currentOrderPage > totalOrderPages) {
            currentOrderPage = totalOrderPages;
        }
        if (currentOrderPage < 1) {
            currentOrderPage = 1;
        }
    
        // Lấy ra các đơn hàng của trang hiện tại
        const currentPageOrders = getOrdersByPage(currentOrderPage);
    
        currentPageOrders.forEach((order, index) => {
            const realIndex = (currentOrderPage - 1) * itemsPerPageOrder + index; // Tính chỉ số thực
            const formattedDate = new Date(order.date).toLocaleDateString('vi-VN');
            const formattedAddress = `${order.address.numberAndRoad}, ${order.address.district}, ${order.address.city}`;
            tableHTML += `
                <tr>
                    <td>${order.customerId}</td>
                    <td>${order.name}</td>
                    <td>${order.phone}</td>
                    <td>${formattedDate}</td>
                    <td>${formattedAddress}</td>    
                    <td>
                        <button class="detail-btn" data-index="${realIndex}">Chi tiết</button>
                    </td>
                    <td> 
                        <button class="order-status-table" id="order-status-inTable-${realIndex}" data-table-status="${order.status}">
                        ${convertOrderStatusToVN(order.status)}
                        </button>
                    </td>
                </tr> 
            `;
            console.log("Status in table: " + order.status);
        });
    } else {
        // Mảng index (return của các tính năng)
        orders.forEach((index) => {
            const order = orderArray[index];
            const formattedDate = new Date(order.date).toLocaleDateString('vi-VN');
            const formattedAddress = `${order.address.numberAndRoad}, ${order.address.district}, ${order.address.city}`;
            tableHTML += `
                <tr>
                    <td>${order.customerId}</td>
                    <td>${order.name}</td>
                    <td>${order.phone}</td>
                    <td>${formattedDate}</td>
                    <td>${formattedAddress}</td>    
                    <td>
                        <button class="detail-btn" data-index="${index}">Chi tiết</button>
                    </td>
                    <td> 
                        <button class="order-status-table" id="order-status-inTable-${index}" data-table-status="${order.status}">
                        ${convertOrderStatusToVN(order.status)}
                        </button>
                    </td>
                </tr> 
            `;
            console.log("Status in table: " + order.status);
        });
    }
    document.getElementById('orders-table-content__body').innerHTML = tableHTML;
    
    // Thêm sự kiện cho nút chi tiết
    document.querySelectorAll('#main__orders .detail-btn').forEach((button) => {
        const realIndex = button.getAttribute('data-index'); // Lấy chỉ số thực từ thuộc tính data-index
        button.addEventListener('click', () => {
            console.log(`Show detail order for index: ${realIndex}`);
            showOrderDetails(realIndex);
        });
    });

    document.querySelectorAll('.order-status-table').forEach((elem) => {
        const status = elem.textContent.trim(); // Lấy giá trị trạng thái từ nội dung
        elem.setAttribute('data-status', status); // Gán giá trị vào data-status
    });

    // Tạo phân trang
    createPagination(totalOrderPages, 'order');
}

displayOrdersTable(orderArray);

function updateOrderStatusTable(index, newStatus) {
    // Cập nhật trạng thái trong mảng orderArray
    orderArray[index].status = newStatus;

    // Tìm phần tử trong bảng có chỉ số tương ứng
    const statusButton = document.getElementById(`order-status-inTable-${index}`);
    if (statusButton) {
        // Cập nhật nội dung văn bản và thuộc tính data-table-status
        statusButton.textContent = convertOrderStatusToVN(newStatus);
        statusButton.setAttribute('data-table-status', newStatus);
    }
}

// Function to update the color of the select box
function updateSelectColor(selectElement) {
    const status = selectElement.value; // Lấy giá trị trạng thái
    selectElement.setAttribute('data-status', status); // Gắn data-status
    console.log(`Updated select color for status: ${status}`);
}

/** FUNC: thay đổi status của từng order */
function handleStatusChange(orderIndex, newStatus) {
    console.log("New status: " + newStatus);
    // Tính chỉ số thực trong currentOrdersArray
    // Khi phân trang -> chỉ số phải được cập nhật mới
    // const realIndex = (currentOrderPage - 1) * itemsPerPageOrder + orderIndex;
    const order = currentOrdersArray[orderIndex];
    if (order) {
        const previousStatus = order.status;
        const isChange = order.changeOrderStatus(newStatus);
        // Nếu trạng thái mới hợp lệ
        if (isChange) {
            // Cập nhật trạng thái trong mảng và bảng
            currentOrdersArray[orderIndex].status = newStatus;
            document.getElementById(`order-status-inTable-${orderIndex}`).textContent = convertOrderStatusToVN(newStatus);
            document.getElementById(`order-status-inTable-${orderIndex}`).setAttribute('data-status', newStatus); // Thêm data-status cho ô trong bảng
            console.log(orderIndex + ' ' + newStatus);

            updateOrderStatusTable(orderIndex, newStatus);
        } else {
            // Khôi phục trạng thái cũ trong select box
            document.getElementById(`order-status__selection-${orderIndex}`).value = previousStatus;
        }
    } else {
        console.log("Error: không tìm thấy order(index) để thay đổi status");
    }
}
function showOrderDetails(orderIndex) {
    console.log('Show popup order detail');
    const modalOrderDetails = document.getElementById('modal-detailorder');
    if (modalOrderDetails) {
        modalOrderDetails.style.display = 'flex';
    }
    // Lấy thông tin đơn hàng
    const order = orderArray[orderIndex];

    // Hiển thị các sản phẩm trong đơn hàng
    let checkoutCartHTML = '';
    order.checkoutCart.forEach(product => {
        checkoutCartHTML += `
            <div class="product-item">
                <span>${product.name}</span>
                <span>${product.quantity}</span>
                <span>${formatPrice(product.price)}</span>
            </div>
        `;
    });
    let detailOrderHTML = `
        <div id="detailorder">
            <button class="close-pop" id="close-detailorder">+</button>
            <h2>Chi tiết đơn hàng</h2>
            <div class="order-content">
                <div class="info">
                    <p>Tên khách hàng: <span id="detail-order-customername">${order.name}</span></p>
                    <p>Số điện thoại: <span id="detail-order-phone">${order.phone}</span></p>
                    <p>Địa chỉ: <span id="detail-order-address">${order.address.numberAndRoad}, ${order.address.district}, ${order.address.city}</span></p>
                    <p>Thời điểm đặt hàng: <span id="detail-date">${(order.date).toLocaleDateString('vi-VN')}</span></p>
                </div>
                <div class="checkout-section">
                    <div class="checkout-info">
                        <p>Sản phẩm đã đặt:</p>
                        <div id="detail-checkoutCart">${checkoutCartHTML}</div>
                    </div>
                    <div class="checkout-total-payment">
                        <p>Tổng tiền: <span id="detail-total-payment">${formatPrice(order.calculateTotalPayment())}</span></p>
                    </div>
                    <div class="checkout-status-select">
                        <p>Tình trạng đơn hàng: 
                            <span>
                                <select class="order-status-select" id="order-status__selection-${orderIndex}" onchange="handleStatusChange(${orderIndex}, this.value); updateSelectColor(this);">
                                    <option value="UNPROCESSED" ${order.status === 'UNPROCESSED' ? 'selected' : ''}>Chưa xử lý</option>
                                    <option value="CONFIRMED" ${order.status === 'CONFIRMED' ? 'selected' : ''}>Đã xác nhận</option>
                                    <option value="SUCCEEDED" ${order.status === 'SUCCEEDED' ? 'selected' : ''}>Thành công</option>
                                    <option value="FAILED" ${order.status === 'FAILED' ? 'selected' : ''}>Đã hủy</option>
                                </select>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
    // Chèn nội dung vào modal
    modalOrderDetails.innerHTML = detailOrderHTML;

    // Cập nhật màu nền cho select
    const selectElement = document.getElementById(`order-status__selection-${orderIndex}`);
    updateSelectColor(selectElement);
    
    // document.getElementById('detail-checkoutCart').innerHTML = checkoutCartHTML;
    // Thêm sự kiện đóng pop-up
    document.getElementById('close-detailorder').addEventListener('click', closeDetailOrderBox);
}

function closeDetailOrderBox() {
    const modalOrderDetails = document.getElementById('modal-detailorder');
    if (modalOrderDetails) {
        modalOrderDetails.style.display = 'none';
    }
}



/* CÁC TÍNH NĂNG Ở BỘ LỌC */
// Lọc sản phẩm theo Date
// Kiểm tra 2 input Date hợp lệ: ngày dateStart phải trước dateEnd
//...
//------------------------

/** FUNC: Hiển thị bảng order table với các đơn hàng ở giữa 2 ngày được nhập */
function displayOrdersByDate() {
    const dateStartElem = document.getElementById('order__date-start');
    const dateEndElem = document.getElementById('order__date-end');
    const dateForm = document.getElementById('filter-date-form')
    let dateStart;
    let dateEnd;
    dateForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn hành động default: reload page
        dateStart = new Date(dateStartElem.value);
        dateEnd = new Date(dateEndElem.value);
        
        // Mảng các order trong 2 date đã chọn
        const filterOrderArrayIndex = filterOrdersBetweenTwoDate(dateStart, dateEnd);
        // Hiển thị bảng:
        displayOrdersTable(filterOrderArrayIndex, true);

        console.log("Filter table: ");
        console.log(filterOrderArrayIndex);
    });
}
displayOrdersByDate();

/** FUNC: hiển thị order table với status tương ứng.  */
function displayOrderByStatus(){
    const status = document.getElementById('filter__status-selection').value;
    if('ALL' === status){
        // Hiển thị lại toàn bộ orderArray:
        currentOrderPage = 1; // Đặt lại trang hiện tại về 1
        displayOrdersTable(orderArray);
    } else {    
        // Hiển thị orderArray với status tương ứng:
        const filteredOrdersIndex = filterOrderByStatus(status);
        currentOrderPage = 1; // Đặt lại trang hiện tại về 1
        displayOrdersTable(filteredOrdersIndex, true);
    }
}
document.getElementById('filter__status-selection').addEventListener('change', displayOrderByStatus);

/** FUNC: sort order array theo quận (tạo ra một orderArray mới):
 * 1. Số nhỏ -> số lớn
 * 2. Alphabet
 */
function displaySortOrderArrayByDistrict(){
    document.getElementById('order__sort-by-district').addEventListener('click',(event) => {
        const sortedOrdersIndex = sortOrderByDistrict();
        currentOrderPage = 1; // Đặt lại trang hiện tại về 1
        displayOrdersTable(sortedOrdersIndex, true);
    });
}
displaySortOrderArrayByDistrict();

function initializeOrdersDisplay() {
    displayOrdersTable(orderArray);
}
document.addEventListener('DOMContentLoaded', initializeOrdersDisplay);

function resetOrderFilter(){
    const resetBtn = document.getElementById('order__reset-filter-btn');
    resetBtn.addEventListener('click', () => {
        // Reset các trường input type="date"
        document.getElementById('order__date-start').value = '';
        document.getElementById('order__date-end').value = '';

        // Reset trường select về giá trị mặc định
        document.getElementById('filter__status-selection').value = 'ALL';

        currentOrderPage = 1; // Đặt lại trang hiện tại về 1
        displayOrdersTable(orderArray);
    });
}
resetOrderFilter();



/** FUNC: thống kê, tạo ra một array các product đã được bán, trong đó:
 * 1. Tên sản phẩm
 * 2. Số lượng đã bán 
 * 3. Tổng doanh thu
 * NOTE: mặc định(khi admin chưa nhập ngày): sẽ hiện toàn bộ 
 */
// Mảng statisticsProductArray:
let statisticsProductArray = createStatisticsProductArray();
function displayStatisticsProduct(page = 1) {
    currentStatisticsProductPage = page;
    const itemsPerPage = itemsPerPageStatisticsProduct;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    // statisticsProductArray = createStatisticsProductArray();
    console.log('Thống kê sản phẩm: ');
    console.log(statisticsProductArray);
    const paginatedDataProduct = statisticsProductArray.slice(start, end);

    let tableHTML = ``;
    paginatedDataProduct.forEach((product) => {
        tableHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${formatPrice(product.quantity * product.price)}</td>
                <td>
                    <button type="button" class="statistics-product__show-bill-btn" data-name="${product.name}">Hóa đơn</button>
                </td>
            </tr>
        `;
    });
    document.getElementById('statistics-product-table__body').innerHTML = tableHTML;

    // Tính toán tổng số trang cho Statistics
    totalStatisticsProductPages = Math.ceil(statisticsProductArray.length / itemsPerPage);

    // Tạo phân trang cho statistics-product
    createPagination(totalStatisticsProductPages, 'statistics-product');

    // Gắn sự kiện cho các nút sau khi chúng được tạo
    document.querySelectorAll('.statistics-product__show-bill-btn').forEach((btn) => {
        btn.addEventListener('click', function(){
            const productName = this.getAttribute('data-name');
            showStatisticsProductBill(productName);
            console.log('Statistics product show bill of ' + productName);
        });
    });
}

// Gọi hàm để hiển thị trang đầu tiên
displayStatisticsProduct(currentStatisticsProductPage);

/** Tổng doanh thu trên các đơn hàng */
function calcTotalProductRevenue(){
    let totalRevenue = 0;
    statisticsProductArray.forEach((product) => {
        if(product.name){
            totalRevenue += (product.quantity) * (product.price);        
        }
    });
    document.getElementById('statistics-product__total-revenue').innerHTML = formatPrice(totalRevenue);
    console.log('Tổng doanh thu theo sản phẩm: ' + totalRevenue);
}
calcTotalProductRevenue();

function displaySpecialProduct(){
    let bestProduct = statisticsProductArray[0];
    let worstProduct = statisticsProductArray[statisticsProductArray.length - 1];

    /** VÌ MẢNG TRẢ VỀ ĐÃ ĐƯỢC SORT 
     * => bestProduct: statisticsProductArray[0];
     * => worstProduct: statisticsProductArray[length - 1];
     */
    // statisticsProductArray.forEach((product) => {
        // // Nếu sản phẩm nào có doanh số cao hơn thì gán lại, nếu bằng nhau thì lấy cái nào có giá cao hơn
        // if(product.quantity > bestProduct.quantity){
        //     bestProduct = product;
        // } else if(product.quantity === bestProduct.quantity){
        //     if(product.price > bestProduct.price){
        //         bestProduct = product;
        //     }
        // }
        // // Nếu sản phẩm nào có doanh số thấp hơn thì gán lại, nếu bằng nhau thì lấy cái nào có giá thấp hơn
        // if(product.quantity < worstProduct.quantity){
        //     worstProduct = product;
        // } else if(product.quantity === worstProduct.quantity){
        //     if(product.price < worstProduct.price){
        //         worstProduct = product;
        //     }
        // }
    // });
    // Kiểm tra special product tồn tại (mảng không rỗng)
    if(!bestProduct && !worstProduct){
        bestProduct = {name: '', quantity: '', price: ''};
        worstProduct = {name: '', quantity: '', price: ''};
    }
    let specialProductHTML = `
                                <div id="bestProduct">
                                    <h2>Sản phẩm chạy nhất</h2>
                                    <p>Tên: <span>${bestProduct.name}</span> </p>
                                    <p>Doanh số: <span>${bestProduct.quantity}</span> </p>
                                </div>
                                <div id="worstProduct">
                                    <h2>Sản phẩm ế nhất</h2>
                                    <p>Tên: <span>${worstProduct.name}</span> </p>
                                    <p>Doanh số: <span>${worstProduct.quantity}</span> </p>
                                </div>
                           `;

    document.getElementById('statistics-product__special-product').innerHTML = specialProductHTML;
}
displaySpecialProduct();

// Show chi tiết hóa đơn của sản phẩm được thống kê:
function showStatisticsProductBill(productName){
    const orderProductArray = [];
    orderArray.forEach((order) => {
        order.checkoutCart.forEach((product) => {
            if(product.name === productName){
                orderProductArray.push(order);
            }
        });
    });
    // Gọi hàm hiện popup toàn bộ bill:
    showStatisticsProductBillPopup(orderProductArray);
    console.log(orderProductArray);

}
function showStatisticsProductBillPopup(orderProductArray) {
    console.log('Show popup statistics product bill');
    const modalOrderDetails = document.getElementById('modal-detailStatistic');
    if (modalOrderDetails) {
        modalOrderDetails.style.display = 'flex';
    }

    let billHTML = `
                    <button class="close-popStatistics" id="close-detailStatistic">+</button>
    `;
    orderProductArray.forEach((order) => {
        // Hiển thị các sản phẩm trong đơn hàng
        let checkoutCartHTML = '';
        order.checkoutCart.forEach(product => {
            checkoutCartHTML += `
                <div class="detailStatistic-item">
                    <span>${product.name}</span>
                    <span>${product.quantity}</span>
                    <span>${formatPrice(product.price)}</span>
                </div>
            `;
        });
        
        billHTML += `
                        <h2>Chi tiết đơn hàng</h2>
                        <div class="detailStatistic-content">
                            <div class="detailStatistic-info">
                                <p>Tên khách hàng: <span id="detailStatistic-customername">${order.name}</span></p>
                                <p>Số điện thoại: <span id="detailStatistic-phone">${order.phone}</span></p>
                                <p>Địa chỉ: <span id="detailStatistic-address">${order.address.numberAndRoad}, ${order.address.district}, ${order.address.city}</span></p>
                                <p>Thời điểm đặt hàng: <span id="detailStatistic-date">${(order.date).toLocaleDateString('vi-VN')}</span></p>
                                <p>Trạng thái: <span id="detailStatistic-status">${convertOrderStatusToVN(order.status)}</span></p>                        
                            </div>
                            <div class="checkout-detailStatistic">
                                <div class="checkout-detailStatistic">
                                    <p>Sản phẩm đã đặt:</p>
                                    <div id="detailStatistic-checkoutCart">${checkoutCartHTML}</div>
                                </div>
                                <div class="checkout-detailStatistic-total-payment">
                                    <p>Tổng tiền: <span id="detailStatistic-total-payment">${formatPrice(order.calculateTotalPayment())}</span></p>
                                </div>
                            </div>
                        </div>
                        <hr>
        `;
    });
    // Chèn nội dung vào modal
    modalOrderDetails.innerHTML = billHTML;
    // Thêm sự kiện đóng pop-up
    document.getElementById('close-detailStatistic').addEventListener('click', closeDetailStatisticProductBox);
}

function closeDetailStatisticProductBox() {
    const modalOrderDetails = document.getElementById('modal-detailStatistic');
    if (modalOrderDetails) {
        modalOrderDetails.style.display = 'none';
    }
}

/** FUNC: thống kê, tạo ra một array các customer đã mua hàng, trong đó:
 * 1. Username
 * 2. Họ và tên 
 * 3. Số điện thoại 
 * 4. Doanh thu
 * NOTE: mặc định(khi admin chưa nhập ngày): sẽ hiện toàn bộ 
 */
let statisticsCustomerArray = createStatisticsCustomerArray();
/**  FUNC: hiển thị mảng thống kê theo khách hàng đã mua. */
function displayStatisticsCustomer(page = 1, array = null) {
    currentStatisticsCustomerPage = page;
    const itemsPerPage = itemsPerPageStatisticsCustomer;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    // statisticsCustomerArray = createStatisticsCustomerArray();
    
    let paginatedDataCustomer;
    if(array == null){
        paginatedDataCustomer = statisticsCustomerArray.slice(start, end);
    } else {
        paginatedDataCustomer = array;
    }

    let tableHTML = ``;
    paginatedDataCustomer.forEach((customer) => {
        tableHTML += `
            <tr>
                <td>${customer.customerId}</td>
                <td>${customer.phone}</td>
                <td>${formatPrice(customer.totalRevenue)}</td>
                <td>
                    <button type="button" class="statistics-customer__show-bill-btn" data-username="${customer.customerId}">Hóa đơn</button>
                </td>
            </tr>
        `;
    });
    document.getElementById('statistics-customer-table__body').innerHTML = tableHTML;
    // console.log(statisticsCustomerArray);

    // Tính toán tổng số trang cho Statistics Customer
    totalStatisticsCustomerPages = Math.ceil(statisticsCustomerArray.length / itemsPerPage);

    // Tạo phân trang cho statistics-customer
    createPagination(totalStatisticsCustomerPages, 'statistics-customer');
    // Gắn sự kiện cho các nút sau khi chúng được tạo
    document.querySelectorAll('.statistics-customer__show-bill-btn').forEach((btn) => {
        btn.addEventListener('click', function(){
            const customerId = this.getAttribute('data-username');
            showStatisticsCustomerBill(customerId);
            console.log('Statistics customer show bill of ' + customerId);
        });
    });
}
// Gọi hàm để hiển thị trang đầu tiên
displayStatisticsCustomer(currentStatisticsCustomerPage);

function showStatisticsCustomerBill(customerId){
    const orderCustomerArray = [];
    orderArray.forEach((order) => {
        if(order.customerId === customerId){
            orderCustomerArray.push(order);
        }
    });
    showStatisticsCustomerBillPopup(orderCustomerArray);
    console.log(orderCustomerArray);
}
function showStatisticsCustomerBillPopup(orderCustomerArray){
    console.log('Show popup statistics customer bill');
    const modalOrderDetails = document.getElementById('modal-detailStatistic');
    if (modalOrderDetails) {
        modalOrderDetails.style.display = 'flex';
    }

    let billHTML = `
                    <button class="close-popStatistics" id="close-detailStatistic">+</button>
    `;
    orderCustomerArray.forEach((order) => {
        // Hiển thị các sản phẩm trong đơn hàng
        let checkoutCartHTML = '';
        order.checkoutCart.forEach(product => {
            checkoutCartHTML += `
                <div class="detailStatistic-item">
                    <span>${product.name}</span>
                    <span>${product.quantity}</span>
                    <span>${formatPrice(product.price)}</span>
                </div>
            `;
        });
        
        billHTML += `
                        <h2>Chi tiết đơn hàng</h2>
                        <div class="detailStatistic-content">
                            <div class="detailStatistic-info">
                                <p>Tên khách hàng: <span id="detailStatistic-customername">${order.name}</span></p>
                                <p>Số điện thoại: <span id="detailStatistic-phone">${order.phone}</span></p>
                                <p>Địa chỉ: <span id="detailStatistic-address">${order.address.numberAndRoad}, ${order.address.district}, ${order.address.city}</span></p>
                                <p>Thời điểm đặt hàng: <span id="detailStatistic-date">${(order.date).toLocaleDateString('vi-VN')}</span></p>
                                <p>Trạng thái: <span id="detailStatistic-status">${convertOrderStatusToVN(order.status)}</span></p>                        
                            </div>
                            <div class="checkout-detailStatistic">
                                <div class="checkout-detailStatistic">
                                    <p>Sản phẩm đã đặt:</p>
                                    <div id="detailStatistic-checkoutCart">${checkoutCartHTML}</div>
                                </div>
                                <div class="checkout-detailStatistic-total-payment">
                                    <p>Tổng tiền: <span id="detailStatistic-total-payment">${formatPrice(order.calculateTotalPayment())}</span></p>
                                </div>
                            </div>
                        </div>
                        <hr>
        `;
    });
    // Chèn nội dung vào modal
    modalOrderDetails.innerHTML = billHTML;
    // Thêm sự kiện đóng pop-up
    document.getElementById('close-detailStatistic').addEventListener('click', closeDetailStatisticProductBox);
}


/** Tổng doanh thu theo khách hàng */
function calcTotalCustomerRevenue(){
    let total = 0;
    statisticsCustomerArray.forEach((customer) => {
        total += customer.totalRevenue;
    });
    document.getElementById('statistics-customer__total-revenue').innerHTML = formatPrice(total);
    console.log("Tổng doanh thu theo khách hàng: " + total);
}
calcTotalCustomerRevenue();

/** FUNC: hiển thị top khách hàng có doanh thu cao nhất */
function displayTopCustomer() {
    // Nhận giá trị người dùng nhập vào input -> top
    const topInput = document.getElementById('statistics-customer__top-input');
    // Số | 0 (nếu người dùng nhập không phải số)
    const top = parseInt(topInput.value) || 0; 
    const tableBody = document.getElementById('statistics-customer-table__body');

    // Kiểm tra nếu không hợp lệ hoặc nhỏ hơn 1
    if (top < 1 || isNaN(top)) {
        tableBody.innerHTML = '<tr><td colspan="4">Không có dữ liệu</td></tr>';
        return;
    }

    // Hiển thị bảng cho top khách hàng được nhập
    const topArray = [];
    for(let i = 0; i < top && i < statisticsCustomerArray.length; i++){
        topArray.push(statisticsCustomerArray[i]);
    }
    displayStatisticsCustomer(1, topArray);
    
}
// Lắng nghe sự kiện khi nhập vào ô input
document.getElementById('statistics-customer__top-input').addEventListener('input', displayTopCustomer);
   

/** TÍNH NĂNG statistics: lọc 2 mảng product và customer theo ngày được nhập */
function filterStatisticsByDate(){
    const dateStartElem = document.getElementById('statistics__date-start');
    const dateEndElem = document.getElementById('statistics__date-end');
    const filterBtn = document.getElementById('statistics__date-btn');
    let dateStart;
    let dateEnd;
    filterBtn.addEventListener('click', (event) => {
        // Lấy giá trị từ các input
        const dateStartValue = dateStartElem.value;
        const dateEndValue = dateEndElem.value;

        // Kiểm tra nếu cả hai ngày đều đã được nhập
        if (!dateStartValue || !dateEndValue) {
            // alert("Vui lòng nhập đầy đủ cả ngày bắt đầu và ngày kết thúc.");
            customAlert({
                title: 'Thất bại!',
                message: 'Vui lòng nhập đầy đủ cả ngày bắt đầu và ngày kết thúc!',
                type: 'warning'
            });
            return;
        }

        // Chuyển đổi giá trị thành đối tượng Date
        dateStart = new Date(dateStartValue);
        dateEnd = new Date(dateEndValue);

        // Kiểm tra ngày bắt đầu có trước hoặc bằng ngày kết thúc
        if (dateStart > dateEnd) {
            // alert("Ngày bắt đầu phải trước hoặc bằng ngày kết thúc. Vui lòng nhập lại.");
            customAlert({
                title: 'Thất bại!',
                message: 'Ngày bắt đầu phải trước hoặc bằng ngày kết thúc. Vui lòng nhập lại.!',
                type: 'warning'
            });
            return;
        }

        // Kiểm tra tính hợp lệ của các ngày
        // if (isValidDateRange(dateStart, dateEnd)) {
        console.log('Ngày hợp lệ: ', dateStart, dateEnd);
        
        statisticsProductArray = createStatisticsProductArray(dateStart, dateEnd);
        console.log(statisticsProductArray);
        // Cho phần Product
        displayStatisticsProduct(currentStatisticsProductPage);
        calcTotalProductRevenue();
        displaySpecialProduct();

        statisticsCustomerArray = createStatisticsCustomerArray(dateStart, dateEnd);
        console.log(statisticsCustomerArray);
        // Cho phần Customer
        displayStatisticsCustomer(currentStatisticsCustomerPage);
        calcTotalCustomerRevenue();
    
        // } else {
        //     alert('Vui lòng nhập lại ngày hợp lệ: \n1. Cả 2 ngày phải được chọn. \n2. Ngày bắt đầu phải trước hoặc bằng ngày kết thúc.');
        // }

    });
    const resetBtn = document.getElementById('statistics__date-reset-btn');
    resetBtn.addEventListener('click', (event) => {
        // Trả về giá trị rỗng cho các input
        document.getElementById('statistics__date-start').value = null;
        document.getElementById('statistics__date-end').value = null;
    

        statisticsProductArray = createStatisticsProductArray();
        console.log(statisticsProductArray);
        // Cho phần Product
        displayStatisticsProduct(currentStatisticsProductPage);
        calcTotalProductRevenue();
        displaySpecialProduct();

        statisticsCustomerArray = createStatisticsCustomerArray();
        console.log(statisticsCustomerArray);
        // Cho phần Customer
        displayStatisticsCustomer(currentStatisticsCustomerPage);
        calcTotalCustomerRevenue();
    });
}
filterStatisticsByDate();




/** UTILITIES  */
//-----------------------------------------
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}
function convertOrderStatusToVN(status) {
    switch (status) {
        case 'UNPROCESSED': return 'Chưa xử lý';
        case 'CONFIRMED': return 'Đã xác nhận';
        case 'SUCCEEDED': return 'Thành công';
        case 'FAILED': return 'Đã hủy';
        default: return 'Không xác định';
    }
}
function convertOrderStatusToForm(vnStatus){
    switch(vnStatus){
        case 'Chưa xử lý': return 'UNPROCESSED';
        case 'Đã xác nhận': return 'CONFIRMED' ;
        case 'Thành công': return 'SUCCEEDED';
        case 'Đã hủy': return 'FAILED' ;
        default: return 'Không xác định';
    }
}

/** Hàm kiểm tra 2 ngày được nhập có lệ hay không:
    1. Cả 2 ngày phải nhập đủ
    2. Ngày start phải trước hoặc bằng ngày end 
*/
function isValidDateRange(start, end) {
    // Kiểm tra cả hai ngày đã được nhập
    if (!start || !end) {
        return false;
    }
    // Kiểm tra ngày bắt đầu phải trước hoặc bằng ngày kết thúc
    if (start > end) {
        return false;
    }
    return true;
}




window.login = login;

window.showDetailsProductBox = showDetailsProductBox;
window.closeDetailProductBox = closeDetailProductBox;
window.showChangeProductBox = showChangeProductBox;
window.closeChangeProductBox = closeChangeProductBox;
window.changeImagePreview = changeImagePreview;
window.previewImage = previewImage;
window.showChangeCustomerBox = showChangeCustomerBox;
window.closeChangeCustomerBox = closeChangeCustomerBox;
window.saveProductChanges = saveProductChanges;

window.displayOrdersTable = displayOrdersTable;
window.handleStatusChange = handleStatusChange;
window.displayOrderByStatus = displayOrderByStatus;
window.displayStatisticsProduct = displayStatisticsProduct;
window.displaySpecialProduct = displaySpecialProduct;
window.displayTopCustomer = displayTopCustomer;

window.showOrderDetails = showOrderDetails;
window.closeDetailOrderBox = closeDetailOrderBox;
window.updateSelectColor = updateSelectColor;

window.showStatisticsProductBill = showStatisticsProductBill;

window.updateVersionIndex = updateVersionIndex;
