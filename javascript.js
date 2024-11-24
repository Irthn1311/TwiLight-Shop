import {customerArray, checkExistedUsername, checkValidAccount, addCustomerToArray} from './common/data/customerArray.js';
import {Cart } from './common/data/cart.js';
import {productArray, allProducts} from './common/data/productArray.js';
//-----
let cart = undefined;
//-----

var slideIndex = 0;
showSlides();
function showSlides() 
{
    var i;
    var slides = document.getElementsByClassName("slideShow");
    //var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    /*for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }*/
    slides[slideIndex-1].style.display = "flex";  
    //dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 8000);
}

// THANH TÌM KIẾM GIÁ
const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");

let priceGap = 1000;

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function unformatNumber(str) {
    return parseInt(str.replace(/\./g, ""));
}

// Function to synchronize and format price inputs with range inputs
function updatePriceInput(inputElement, value) {
    inputElement.value = formatNumber(value);
}

// Function to synchronize and format range inputs with price inputs
function updateRangeInput(rangeElement, value) {
    rangeElement.value = value;
}

priceInput.forEach(input => {
    input.addEventListener("input", e => {
        let minPrice = unformatNumber(priceInput[0].value),
            maxPrice = unformatNumber(priceInput[1].value);

        if (!isNaN(unformatNumber(e.target.value))) {
            e.target.value = formatNumber(unformatNumber(e.target.value));
        }

        if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
            if (e.target.className === "input-min") {
                updateRangeInput(rangeInput[0], minPrice);
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            } else {
                updateRangeInput(rangeInput[1], maxPrice);
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });

    input.addEventListener("blur", e => {
        e.target.value = formatNumber(unformatNumber(e.target.value));
    });
});

// Adjust range input to also format the price inputs when sliding
rangeInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if ((maxVal - minVal) < priceGap) {
            if (e.target.className === "range-min") {
                updateRangeInput(rangeInput[0], maxVal - priceGap);
                minVal = maxVal - priceGap;
            } else {
                updateRangeInput(rangeInput[1], minVal + priceGap);
                maxVal = minVal + priceGap;
            }
        }

        updatePriceInput(priceInput[0], minVal);
        updatePriceInput(priceInput[1], maxVal);
        range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
        range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    });

    // Ensure the price inputs are formatted after sliding stops
    input.addEventListener("change", e => {
        updatePriceInput(priceInput[0], parseInt(rangeInput[0].value));
        updatePriceInput(priceInput[1], parseInt(rangeInput[1].value));
    });
});

//ĐĂNG NHẬP - ĐĂNG KÝ
const DNDK = document.getElementsByClassName('nav-link');  //Nút đăng nhập - đăng ký
const modal=document.querySelector('.modal'); //form dkdn
const modalOverlay = document.querySelector('.modal__overlay');// Nền đen
const switchButtons = document.querySelectorAll('.auto-form_switch-btn');
const backButtons = document.querySelectorAll('.auto-form__controls-back');
const a = document.getElementById('register-form');  //Form đăng ký
const b = document.getElementById('login-form');     //Form đăng nhập
const u1 = document.querySelector('.header__navbar-item'); // Form đã đăng nhập
const u2 = document.querySelector('.header__navbar-user');// Form đã đăng nhập

function TRANGCHU()
{
    modal.style.display = "none";
    modalOverlay.style.display = "none";  
    a.style.display = "none";
    b.style.display = "none"; 
    for (let i = 0; i < DNDK.length; i++) 
        {  
            DNDK[i].addEventListener('click', function(event) 
            {  
                event.preventDefault();  // Ngăn chặn hành động nhấp chuột mặc định  
                modal.style.display = "flex";     
                b.style.display = "block";  
                modalOverlay.style.display = "flex";  
            });  
        }
    //Nút trở về 
    backButtons.forEach(button => 
        {
            button.addEventListener('click', function() {
                modal.style.display = "none";
                modalOverlay.style.display = "none";  
                a.style.display = "none";
                b.style.display = "none";  
            });
        });
    modalOverlay.addEventListener('click', function() 
        {  
            modalOverlay.style.display = "none";    
            modal.style.display = "none";  
            a.style.display = "none";
            b.style.display = "none"; 
        });  
    
    // Nút click form Đăng Ký
    switchButtons[0].addEventListener('click', function(event) 
        {  
            event.preventDefault();   
            a.style.display = "block";  
            b.style.display = "none";  
        });  
    // Nút click form Đăng nhập
    switchButtons[1].addEventListener('click', function(event) 
        {  
            event.preventDefault();  
            a.style.display = "none";  
            b.style.display = "block";  
        });
 
}
TRANGCHU();

//HÀM CHUYỂN ĐỔI ĐÃ ĐĂNG NHẬP
function TAIKHOAN(username)
{
    u1.style.display = "flex";
    u2.style.display = "flex";
    a.style.display = "none";
    b.style.display = "none";  
    const userNameElement = document.querySelector('.header__navbar-user-name'); // Lấy phần tử tên người dùng  
    userNameElement.textContent = username;
    console.log(username + ": current user");
    for (let i = 0; i < DNDK.length; i++) 
        {  
            DNDK[i].style.display = "none";
        }
}

//===== HÀM XỬ LÝ ĐĂNG NHẬP =====//
/** KIỂM TRA NGƯỜI DÙNG CÓ ĐĂNG NHẬP HAY CHƯA (dùng biến current user để kiểm soát người đang đăng nhập)
 * DONE: current_user = username    ## Đã đăng nhập
 * NOT: current_user = ''    ## Chưa đăng nhập nhưng vẫn có thể thêm vào giỏ hàng như tài khoản vô danh 
 */

let current_user = ''; 
function Dangnhap() 
{
    const username = document.querySelector('.auto-form__input[type="username"]').value;
    const password = document.querySelector('.auto-form__input[type="password"]').value;
    if (!username || !password) 
    {  
        alert("Vui lòng điền đầy đủ thông tin!");  
        return;  
    }  
    
    // Change: kiểm tra đăng nhập đúng với customerArray
    if(1 == checkValidAccount(username, password))
    {
        // Khi đăng nhập thành công, load Cart tưng ứng lên từ localStorage
        cart = new Cart(username);
        updateCartCount();
        current_user = username;
        localStorage.setItem('currentUser',JSON.stringify(current_user));       
        //-----------
        alert("Đã đăng nhập thành công với tài khoản: " + username);  
        modal.style.display = 'none'; // Đóng modal khi đăng nhập thành công  
        TAIKHOAN(username);
    } else if(0 == checkValidAccount(username, password)){
        // Tài khoản đã bị khóa
        alert("Tài khoản không còn hoạt động");
    }
    else if(checkExistedUsername(username) == true) 
    {
        alert("Sai mật khẩu!\nVui lòng nhập lại!");
    }
    else
    {  
        alert("Tài khoản chưa được đăng ký!\nVui lòng đăng ký tài khoản mới!");  
        b.style.display = "none"; // Ẩn phần thông tin đăng nhập  
        a.style.display = "block"; // Hiển thị phần đăng ký  
    }  
}
// function Dangnhap() 
// {
//     const username = document.querySelector('.auto-form__input[type="username"]').value;
//     const password = document.querySelector('.auto-form__input[type="password"]').value;
//     if (!username || !password) 
//     {  
//         alert("Vui lòng điền đầy đủ thông tin!");  
//         return;  
//     }  
    
//     // Change: kiểm tra đăng nhập đúng với customerArray
//     if(true == checkValidAccount(username, password))
//     {
//         // Khi đăng nhập thành công, load Cart tưng ứng lên từ localStorage
//         cart = new Cart(username);
//         updateCartCount();
//         current_user = username;
//         localStorage.setItem('currentUser',JSON.stringify(current_user));       
//         //-----------
//         alert("Đã đăng nhập thành công với tài khoản: " + username);  
//         modal.style.display = 'none'; // Đóng modal khi đăng nhập thành công  
//         TAIKHOAN(username);
//     } 
//     else if(checkExistedUsername(username) == true) 
//     {
//         alert("Sai mật khẩu!\nVui lòng nhập lại!");
//     }
//     else
//     {  
//         alert("Tài khoản chưa được đăng ký!\nVui lòng đăng ký tài khoản mới!");  
//         b.style.display = "none"; // Ẩn phần thông tin đăng nhập  
//         a.style.display = "block"; // Hiển thị phần đăng ký  
//     }  
// }
//===== HÀM XỬ LÝ ĐĂNG KÝ =====//
function Dangky() 
{
    const username = document.querySelector('#register-form .auto-form__input[type="username"]').value;
    const password = document.querySelector('#register-form .auto-form__input[type="password"]').value;
    const confirmPassword = document.querySelector('#register-form .auto-form__input[placeholder="Nhập lại mật khẩu"]').value;

    // Kiểm tra xem các trường đã được điền chưa  
    if (!username || !password || !confirmPassword)   
        {  
            alert("Vui lòng điền đầy đủ thông tin!");  
            return;  
        }
    // Kiểm tra mật khẩu có khớp hay không  
    if (password !== confirmPassword)   
        {  
            alert('Mật khẩu nhập lại không khớp!');  
            return;  
        }  
    // Hàm kiểm tra có ký tự in hoa và ký tự đặc biệt
    function containsUppercaseOrSpecialChar(str) 
    {  
        // Biểu thức chính quy để kiểm tra ký tự in hoa và ký tự đặc biệt  
        const inhoa = /[A-Z]/;
        const dacbiet = /[!@#$%^&*(),.?":{}|<>]/;  
        return (inhoa.test(str) && dacbiet.test(str) && str.length>8);  
    }  
    if(username.includes(' ')) 
        {
            alert("Tên đăng nhập không có khoảng trống!");
            return;
        }
    if(!containsUppercaseOrSpecialChar(password))
        {
            alert("Mật khẩu phải dài hơn 8 ký tự, chứa ký tự IN HOA và ký tự ĐẶC BIỆT!")
            return;
        }
    // Change: kiểm tra sự tồn tại của username trong customerArray  
    if(checkExistedUsername(username) == true){
        alert("Tên tài khoản " + username +" đã được đăng ký!\nVui lòng đăng nhập hoặc đổi tên tài khoản khác!");   
        return;
    } else 
    {
        alert("Đã đăng ký thành công với tài khoản: " + username + "\nVui lòng đăng nhập lại!");   
        b.style.display = "block"; // Hiển thị phần thông tin  
        a.style.display = "none";  // Ẩn phần đăng ký  

        // Change: thêm new customer vào customerArray khi đăng kí thành công
        addCustomerToArray(username, password);
        console.log('Added to customerArray user: ' + username );

        // Khi đăng kí thành công, tạo Cart obj tương ứng với username
        //cart = new Cart(username);
        console.log('Create Cart with username: ' + username);
        //-----------------
    }
}
//===== HÀM ĐĂNG XUẤT =====//
document.getElementById('log-out').addEventListener('click', function(event) 
{  
    event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết  
        
    //--- Đăng xuất nên reset current_user thành tài khoản vô danh 
    current_user = '';
    cart = new Cart(current_user);
    cart.removeAllFromCart();    // Reset lại toàn bộ như một khách mới 
    localStorage.setItem('currentUser',JSON.stringify(current_user));
    //-------
        
    u1.style.display = "none";
    u2.style.display = "none";
    for (let i = 0; i < DNDK.length; i++) 
        DNDK[i].style.display = "flex";
    TRANGCHU();

    updateCartCount();  // Cập nhật số lượng giỏ thành 0
}); 


const ITEMS_PER_PAGE = 8;
let currentPage = 1;
let currentProducts = allProducts;
let allProductArray = allProducts;

function newPrice(a) {
    return a * 0.9;
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Lắng nghe sự kiện click cho các liên kết sản phẩm
document.querySelectorAll('.sub-nav-links-text a').forEach(link => {
    
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const brandId = link.getAttribute('href').substring(1); // Lấy brandId từ href
        currentPage = 1; // Reset trang hiện tại

        if (brandId === 'TRANG_CHU') {
            currentProducts = shuffleArray(allProducts.slice()); // Xáo trộn mảng sản phẩm khi vào trang chủ
        } else {
            currentProducts = shuffleArray(filterProductsByBrand(brandId));
        }
        allProductArray = currentProducts; // Update allProductArray
        renderProducts(currentProducts, currentPage);
    });
});
// Hàm search theo tên Brand
function filterProductsByBrand(brandId) {
    return allProducts.filter(product => product.brandId.toUpperCase() === brandId.toUpperCase());
}
// Lắng nghe sự kiện click cho các liên kết sắp xếp
document.querySelectorAll('.select-input__link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const sortType = link.textContent.includes('Tăng') ? 'asc' : 'desc';

        currentProducts.sort((a, b) => {
            if (sortType === 'asc') {
                return a.oldPrice - b.oldPrice;
            } else {
                return b.oldPrice - a.oldPrice;
            }
        });

        currentPage = 1; // Reset trang hiện tại
        renderProducts(currentProducts, currentPage);
    });
});

// Lắng nghe sự kiện input cho ô tìm kiếm và nút tìm kiếm
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.header__search-btn');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = allProductArray.filter(product => {
        return product.name.toLowerCase().includes(searchTerm);
    });

    currentPage = 1; // Reset trang hiện tại
    currentProducts = filteredProducts; // Update sản phẩm thỏa
    renderProducts(filteredProducts, currentPage);
}

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        performSearch();
    }
});

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    performSearch();
});


// Synchronize range inputs with text inputs
const rangeMinInput = document.querySelector('.range-min');
const rangeMaxInput = document.querySelector('.range-max');
const checkboxAll = document.querySelector('.checkbox.value-all input');

rangeMinInput.addEventListener('input', (event) => {
    document.querySelector('.input-min').value = formatNumber(event.target.value);
});

rangeMaxInput.addEventListener('input', (event) => {
    document.querySelector('.input-max').value = formatNumber(event.target.value);
});

checkboxAll.addEventListener('change', () => {
    // If "TẤT CẢ" checkbox is checked, reset other brand checkboxes
    const otherCheckboxes = document.querySelectorAll('.category-list .checkbox input:not(.value-all input)');
    otherCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
});

document.querySelectorAll('.category-list .checkbox input:not(.value-all input)').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            checkboxAll.checked = false;
        }
    });
});



//===== XỬ LÝ LỌC SẢN PHẨM =====//
function filterProducts() 
{
    const minPrice = parseInt(document.querySelector('.input-min').value.replace(/\./g, ''));
    const maxPrice = parseInt(document.querySelector('.input-max').value.replace(/\./g, ''));

    // Nút chọn Brands
    let selectedBrands = [];
    if (!checkboxAll.checked) {
        selectedBrands = Array.from(document.querySelectorAll('.category-list .checkbox input:checked')).map(checkbox => checkbox.value.toUpperCase());
    }

    const searchTerm = document.querySelector('.auto-form__input2').value.toLowerCase();

    let filteredProducts = allProducts.slice(); 
    // 1. Search theo tên Brands
    if (selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter(product => selectedBrands.includes(product.brandId.toUpperCase()));
    }
    // 2. Search theo thanh giá
    filteredProducts = filteredProducts.filter(product => {
        const productPrice = parseInt(newPrice(product.oldPrice));
        return productPrice >= minPrice && productPrice <= maxPrice;
    });
    // 3. Search term filter
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchTerm));
    }
    // Update sản phẩm thỏa điều kiện 
    currentPage = 1; // Reset trang
    currentProducts = filteredProducts;
    renderProducts(currentProducts, currentPage);
}
// Nút xử lý để search
document.querySelector('.btnprocess').addEventListener('click', filterProducts);

//===== HIỂN THỊ THÔNG TIN CHI TIẾT SẢN PHẨM =====//
const detailsContainer = document.getElementById('hienthi');
let vs,gia;
function showProductDetails(productName)
{
    const product = allProducts.find(p => p.name === productName);
    if(!product) return;

    const chooseHTML = `
        <div class="modal__body-item">
                <div class="auto-form-item"> 
                    <div class="left">
                        <div class="img">
                            <img src="${product.img}" alt="${product.name}">
                        </div>
                        <div class="description">
                            <p class="title">${product.name}<br></p>
                            <p class="price" id="updatePrice">
                                <strong class="price quickOrderPrice">${formatPrice(newPrice(product.oldPrice))}</strong>
                                <strike class="price quickOrderPriceLast">${formatPrice(product.oldPrice)}</strike>
                            </p>
                        </div>
                    </div>
                    <div class="right">
                        <h3 class="ttsp">THÔNG TIN SẢN PHẨM</h3>
                        <div class="grid-options">
                            <div class="cms"><strong>Thông số kỹ thuật</strong></div>
                            <div class="optionse">

                            </div>
                            <div class="paradox">
                                <div class="cms"><strong>Chọn phiên bản</strong></div>
                                <div class="options">
                                     <div class="option active">
                                        <label class="textspan">${product.pb1}<br></label>
                                    </div> 
                                    <div class="option">
                                        <label class="textspan"><span>${product.pb2}<br></span></label>
                                    </div>     
                                </div>
                            </div>
                        </div>
        
                        <div class="number">
                            <label class="soluong">Số lượng</label>
                            <div class="control">
                                <button class="btnMinutes">-</button>
                                <input class="Number" type="text" value="1">
                                <button class="btnPlus">+</button>
                            </div>
                        </div>
        
                        <div class="add-to-cart-form">  
                            <div class="control-button">  
                                <div class="quykhach">  
                                    <p>Quý khách có thể lựa chọn hình thức thanh toán sau khi đặt hàng.</p>  
                                </div>  
                                <button class="submit-to-cart" onclick='giohang(${JSON.stringify(product)}); quayve();'>THÊM VÀO GIỎ HÀNG</button>  
                            </div>  
                        </div> 
                    </div>
                    <div class="exit-to-lobby" onclick = "quayve();">
                        <i class="exit-icon fa-solid fa-xmark"></i>
                    </div>
                </div>  
        </div>
    `;
    detailsContainer.innerHTML = chooseHTML;  
    detailsContainer.style.display = 'flex';
    displayProductDetails(product, 'pb1'); // Hiện thông tin mặc định pb1

    // Nút thay đổi version
    const switchVersions = document.querySelectorAll('.options .option');
    const price = document.getElementById('updatePrice');

    switchVersions[0].addEventListener('click', function(event) 
    {  
        event.preventDefault(); 
        document.querySelectorAll('.options .option').forEach(opt => {  
            opt.classList.remove('active');  
        });  
        this.classList.add('active');   
        displayProductDetails(product, 'pb1');
        price.innerHTML = 
            `<strong class="price quickOrderPrice">${formatPrice(newPrice(product.oldPrice))}</strong>
            <strike class="price quickOrderPriceLast">${formatPrice(product.oldPrice)}</strike>`;    
    });
    switchVersions[1].addEventListener('click', function(event) 
    {  
        event.preventDefault();  
        document.querySelectorAll('.options .option').forEach(opt => {  
            opt.classList.remove('active');  
        });  
        this.classList.add('active');  
        displayProductDetails(product, 'pb2');
        price.innerHTML = 
            `<strong class="price quickOrderPrice">${formatPrice(newPrice(product.oldPrice*1.1))}</strong>
            <strike class="price quickOrderPriceLast">${formatPrice(product.oldPrice*1.1)}</strike>`;   
    });
    setupSL();
}
// Cập nhật thông tin chi tiết theo phiên bản được chọn  
function displayProductDetails(product, version) 
{    
    const optionsElements = document.querySelectorAll('.optionse');  
    let pbHTML; 
    let selectedVersionData;
    if(version === 'pb1') 
    {
        selectedVersionData = product.pb1.split('/');
        vs = product.pb1;
        gia = newPrice(product.oldPrice);
    }
    else
    {
        selectedVersionData = product.pb2.split('/');
        vs = product.pb2;
        gia = newPrice(product.oldPrice*1.1);
    }
    const ram = selectedVersionData[0];    
    const storage = selectedVersionData[1];   

    pbHTML = `  
        <div class="line1">  
            <div class="op1" title="Vi xử lý">  
                <i class="icon-tech fa-solid fa-microchip"></i>  
                <span class="text-tech">${product.chip}</span>  
            </div>  
            <div class="op1" title="Bộ nhớ trong">  
                <i class="icon-tech fa-solid fa-memory"></i>  
                <span class="text-tech">${storage}</span>  
            </div>                                                
            <div class="op1" title="Dung lượng pin hiển thị">  
                <i class="icon-tech fa-solid fa-battery-full"></i>  
                <span class="text-tech">${product.pin}</span>  
            </div>  
        </div>  
    
        <div class="line2">  
            <div class="op1" title="Kích thước màn hình">  
                <i class="icon-tech fa-solid fa-tablet-screen-button"></i>  
                <span class="text-tech">${product.size}</span>  
            </div>  
            <div class="op1" title="RAM">  
                <i class="icon-tech fa-solid fa-sd-card"></i>  
                <span class="text-tech">${ram}</span>  
            </div>  
            <div class="op1" title="Tần số quét (Hz)">  
                <i class="icon-tech fa-solid fa-display"></i>  
                <span class="text-tech">${product.f}</span>  
            </div>  
        </div>  
    `;  
    optionsElements[0].innerHTML = pbHTML;  
}
// Nút chỉnh số lượng 
function setupSL() 
{
    const numberInput = document.querySelector('.Number');
    const minusBtn = document.querySelector('.btnMinutes');
    const plusBtn = document.querySelector('.btnPlus');

    minusBtn.addEventListener('click', () => {
        let value = parseInt(numberInput.value);
        if (value > 1) {
            numberInput.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(numberInput.value);
        numberInput.value = value + 1;
    });

    numberInput.addEventListener('input', () => {
        let value = parseInt(numberInput.value);
        if (isNaN(value) || value < 1) {
            numberInput.value = 1;
        }
    });
}
// Nút tắt bảng chi tiết
function quayve()
{
    if (detailsContainer) {  
        detailsContainer.style.display = 'none'; 
    }  
}


//===== HIỂN THỊ SẢN PHẨM VÀ PHÂN TRANG =====//
function renderProducts(products, page) {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = products.slice(startIndex, endIndex);

    paginatedProducts.forEach(product => {
        const productHTML = `
            <div class="grid__column-2-4">
                <a class="home-product-item" onclick="showProductDetails('${product.name}')">
                    <div class="home-product-item__img" 
                        style="background-image: url(${product.img});">
                    </div>
                    <h4 class="home-product-item__name" >${product.name}</h4>
                    <div class="home-product-item__price">
                        <span class="home-product-item__price-old">${formatPrice(product.oldPrice)}</span>
                        <span class="home-product-item__price-current">${formatPrice(newPrice(product.oldPrice))}</span>
                    </div>
                    <div class="add-to-cart">  
                        <span class="add-to-cart-text">Xem sản phẩm</span>  
                        <i class="add-to-cart-icon fa-solid fa-gift"></i>  
                    </div>
                </a>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', productHTML);
    });
    renderPagination(products);
}

function renderPagination(products) {
    const paginationContainer = document.getElementById('pagination');
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

    let paginationHTML = `
        <li class="pagination-item ${currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-item__link" onclick="event.preventDefault(); changePage(${currentPage - 1})">
                <i class="pagination-item__icon fa-solid fa-angle-left"></i>
            </a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <li class="pagination-item ${currentPage === i ? 'pagination-item--active' : ''}">
                <a href="#" class="pagination-item__link" onclick="event.preventDefault(); changePage(${i})">${i}</a>
            </li>
        `;
    }

    paginationHTML += `
        <li class="pagination-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-item__link" onclick="event.preventDefault(); changePage(${currentPage + 1})">
                <i class="pagination-item__icon fa-solid fa-angle-right"></i>
            </a>
        </li>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(currentProducts.length / ITEMS_PER_PAGE);

    if (page < 1 || page > totalPages) {
        return;
    }

    currentPage = page;
    renderProducts(currentProducts, currentPage);
    document.getElementById('productContainer').scrollIntoView({
        behavior: 'smooth'
    });
}

//-----------TAO HAM KHOI TAO LAI TRANG------------
function reloadPage(){
    document.addEventListener('DOMContentLoaded', () => {
        currentProducts = shuffleArray(allProducts.slice());
        allProductArray = currentProducts;
        renderProducts(currentProducts, currentPage);
        
        // Lấy thông tin người đang đăng nhập để reset trang không bị mất thông tin
        const flag = localStorage.getItem('currentUser');
        if (flag) 
            {
                current_user = JSON.parse(flag);
                cart = new Cart(current_user);
            }
        else 
        {
            current_user = '';
            cart = new Cart(current_user);
        }
        localStorage.setItem('currentUser',JSON.stringify(current_user));
        
        if(current_user == '') TRANGCHU();  // Nếu chưa đăng nhập thì để trang mặc định
        else TAIKHOAN(current_user);        // Nếu đã đăng nhập thì để giao diện đã đăng nhập

        updateCartCount();  // Cập nhật số lượng giỏ hàng tùy vào user
    });
}
reloadPage();

//===== THÊM VÀO GIỎ HÀNG =====//
/** HTML onclick: khi user nhấn THÊM VÀO GIỎ HÀNG -> call function giohang()
 * @param: object - product (JSON.stringify(productPicked) | product in productArray
 * 
 * Khi người dùng đăng nhập thành công, tạo Cart Object tương ứng với khách hàng đó.
 * Thao tác với Cart đó, trong lúc người dùng đang đăng nhập với tài khoản của mình.
 */

function giohang(product)
{
    // console.log(typeof product);         // => object
    // Số lượng product mà người dùng addToCart
    const addQuantity = parseInt(document.querySelector('.Number').value);   
    // Product mà người dùng addToCart
    const addProduct = {  
        quantity: addQuantity,
        isPicked: false,
        brandId: product.brandId || 'Unknown',  
        img: product.img || 'default-image.jpg', 
        name: product.name || 'Unnamed Product',  
        pb: vs,  
        price: gia,
    };  
    console.log(product);
    console.log(addProduct);
    // addToCart sản phẩm được người dùng chọn
    cart.addToCart(addProduct); 

    // slproductPicked += addQuantity;
    updateCartCount();   
    console.log(cart.counterProducts);
}

function updateCartCount() 
{   
    const cartBadge = document.querySelector('.cart-badge');  
    cartBadge.textContent = cart.counterProducts; // Cập nhật số lượng sản phẩm  
    console.log(cart.counterProducts);
}


//-------------------------------------------
/** MODULE: khi tạo 'module', các file trong js trở thành scope chỉ trong file đó.
 * Dẫn đến: khi dùng DOM để tạo html, không thể dùng 'onclick',
 *          vì chúng không được gán cho window
 * ==> Gán cho 'window' các hàm dùng DOM để tạo html.
 */
window.showProductDetails = showProductDetails;
window.quayve = quayve;
window.giohang = giohang;
window.Dangky = Dangky;
window.Dangnhap = Dangnhap;
window.reloadPage = reloadPage;
window.renderProducts = renderProducts;
window.renderPagination = renderPagination;
window.changePage = changePage;
window.updateCartCount = updateCartCount;
//-------------------------------------------



