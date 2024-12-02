import {customerArray, Address} from './customerArray.js';
import {customAlert, customConfirm} from './utilities.js'

/** ORDER CLASS: đối tượng hóa đơn, sau khi user chọn product trong cart và thanh toán. */
class Order {
    customerId = undefined;
    checkoutCart = [];      // Array
    date = undefined;       // Date object
    
    name = undefined;       // Real name
    phone = undefined;      // Phone to call for receiver order
    address = undefined;    // Address object
    
    // Tình trạng đơn hàng: UNPROCESSED | CONFIRMED | SUCCEEDED | FAILED
    status = undefined;             

    constructor(customerId, checkoutCart, date, name, phone, address, status = 'UNPROCESSED'){
        this.customerId = customerId;
        this.checkoutCart = checkoutCart;
        this.date = date;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.status = status;
    }

    // METHOD:
    // Tính tổng số tiền cần phải thanh toán của đơn hàng.
    calculateTotalPayment(){
        let total = 0;
        this.checkoutCart.forEach((item) => {
            total += item.quantity * item.price;
        });
        return total;
    }
    // Admin thay đổi status của order: UNPROCESSED -> CONFIRMED | SUCCEEDED | FAILED
    changeOrderStatus(newStatus){
        let isChange = false;
        switch (this.status) {
            case 'UNPROCESSED':
                // Nếu chưa xử lí -> CONFIRMED | FAILED
                if(newStatus === 'SUCCEEDED'){
                    //...
                    // alert('Failed: Đơn hàng chưa được xác nhận');
                    customAlert({
                        title: 'Thất bại!',
                        message: 'Đơn hàng chưa được xác nhận!',
                        type: 'warning'
                    });
                    console.log('Failed: Đơn hàng chưa được xác nhận');
                } else {
                    this.status = newStatus;
                    isChange = true;
                }
                break;
            case 'CONFIRMED':
                // Nếu đã xác nhận -> SUCCEEDED | FAILED
                if(newStatus === 'UNPROCESSED'){
                    // alert('Failed: Đơn hàng đã được xác nhận');
                    customAlert({
                        title: 'Thất bại!',
                        message: 'Đơn hàng chưa được xác nhận!',
                        type: 'warning'
                    });
                    console.log('Failed: Trạng thái không hợp lệ (Đơn hàng đã được xác nhận)');
                } else {
                    this.status = newStatus;
                    isChange = true;
                }
                break;
            /** Khi đã ở trạng thái SUCCEEDED | FAILED: trạng thái bị vô hiệu hóa. */
            case 'SUCCEEDED':
                // alert('Failed: Đơn hàng đã hoàn thành. Trạng thái bị vô hiệu hóa');
                customAlert({
                    title: 'Thất bại!',
                    message: 'Đơn hàng đã hoàn thành. Trạng thái bị vô hiệu hóa!',
                    type: 'warning'
                });
                console.log('Failed: Đơn hàng đã hoàn thành. Trạng thái bị vô hiệu hóa');
                break;
            case 'FAILED':
                // alert('Failed: Đơn hàng đã thất bại. Trạng thái bị vô hiệu hóa');
                customAlert({
                    title: 'Thất bại!',
                    message: 'Đơn hàng đã thất bại. Trạng thái bị vô hiệu hóa!',
                    type: 'warning'
                });
                console.log('Failed: Đơn hàng đã hoàn thành. Trạng thái bị vô hiệu hóa');
                break;
            default:
                break;
        }
        if(isChange === true){
            console.log("Success: thay đổi status thành: " + newStatus);
            saveOrderArrayToStorage();
        } else {
            console.log("Failed: thay đổi status thất bại.");
        }
        return isChange;
    }
}


/** MẢNG ĐƠN HÀNG */
// Load mảng lên từ localStorage, nếu chưa được tạo thì gán rỗng:
export let orderArray = JSON.parse(localStorage.getItem('orderArray'));
if (!orderArray) {
    orderArray = [];
} else {
    // Khi lưu Order obj vào local, tự chuyển đổi thành string, khi lấy lên và parse, không được chuyển đổi ngược lại Order obj
    // => Chuyển đổi string -> Order object
    // Chuyển đổi từng đối tượng thành instance của Order
    orderArray = orderArray.map(order => 
        new Order(order.customerId, order.checkoutCart, new Date(order.date), order.name, order.phone, new Address(order.address.city, order.address.district, order.address.numberAndRoad), order.status)
    );

}


// Lưu orderArray vào localStorage với key: orderArray
export function saveOrderArrayToStorage(){
    localStorage.setItem('orderArray', JSON.stringify(orderArray));

}
export function addOrderToArray(customerId, checkoutCart, date, name, phone, address, status = 'UNPROCESSED'){
    const newOrder = new Order(customerId, checkoutCart, date, name, phone, address, status);
    orderArray.push(newOrder);
    saveOrderArrayToStorage();
}


// True: stDate <= checkDate <= ndDate
function isBetweenTwoDate(checkDate, stDate, ndDate){
    // Chuẩn hóa: chỉ lấy ngày tháng năm để so sánh
    const normalizeDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

    const firstDate = normalizeDate(new Date(stDate));
    const secondDate = normalizeDate(new Date(ndDate));
    const currentDate = normalizeDate(new Date(checkDate));

    return firstDate <= currentDate && currentDate <= secondDate;

}

/* FUNC: Trả vê một order array với date nằm trong khoảng [stDate, ndDate] */
export function filterOrdersBetweenTwoDate(stDate, ndDate){
    const filterDateArrayIndex = [];
    orderArray.forEach((order, index) => {
        if(true === isBetweenTwoDate(order.date, stDate, ndDate)){
            console.log('Include: ', order.date);
            filterDateArrayIndex.push(index);
        }
    });
    return filterDateArrayIndex;
}

/** FUNC: trả về một order array với status tương ứng */
export function filterOrderByStatus(status){
    const filterStatusArrayIndex = [];
    orderArray.forEach((order, index) => {
        if(status === order.status){
            filterStatusArrayIndex.push(index);
        }
    });
    return filterStatusArrayIndex;
}

/** FUNC: trả về một order array mới với các quận được sắp xếp:
 * 1. Số nhỏ -> số lớn
 * 2. Alphabet
 */
export function sortOrderByDistrict() {
    
    const orderArrayWithIndex = [];
    orderArray.forEach((order, index) => {
        orderArrayWithIndex.push({
            order: order,
            index: index,
        });
    });
    const sortedArray = orderArrayWithIndex.slice().sort((orderA, orderB) => {
        const districtA = orderA.order.address.district;
        const districtB = orderB.order.address.district;
        return compareDistrict(districtA, districtB);
    });

    const indexArray = [];
    sortedArray.forEach((orderWithIndex) => {
        indexArray.push(orderWithIndex.index);
    });

    // Trả về mảng đã sắp xếp
    return indexArray;
}


function compareDistrict(districtA, districtB){
    // Kiểm tra xem 2 district có phải là số ?
    // "8" -> 8 (Number) -> isNaN: false -> !isNaN: true
    // "Binh Thanh" -> (string) -> isNaN: true -> !isNaN: false
    const isNumberA = !isNaN(districtA);
    const isNumberB =  !isNaN(districtB);
    
    // Nếu cả 2 đều là số:
    if(isNumberA && isNumberB){
        return Number(districtA) - Number(districtB); 
    } else if(isNumberA){   // districtA là số: A trước
        return -1;
    } else if (isNumberB){  // districtB là số: B trước
        return 1;
    } else {                // Cả 2 đều là chữ:
        // localeCompare: so sánh chuỗi theo alphabet
        return districtA.localeCompare(districtB);
    }
}

/** FUNC: thống kê, tạo ra một array các product đã được bán, trong đó:
 * 1. Tên sản phẩm
 * 2. Số lượng đã bán 
 * 3. Tổng doanh thu
 */
export function createStatisticsProductArray(stDate = null, ndDate = null){
    let statisticsProductArray = [
        // {
        //     name: undefined,
        //     quantity: undefined,
        //     price: undefined,
        // }
    ];
    if(stDate == null && ndDate == null){
        // Duyệt qua từng order trong orderArray
        orderArray.forEach((order) => {
            //  Trong mỗi order, duyệt từng item trong checkoutCart
            order.checkoutCart.forEach((item) => {
                // Tìm trong staArray đã có item.name chưa?
                const matchingProduct = statisticsProductArray.find((product) => product.name === item.name);
                // Nếu sản phẩm đã có trong staArray thì tăng quantity và totalRevenue
                if(matchingProduct){   
                    matchingProduct.quantity += item.quantity;
                } else {    // Nếu chưa có thì thêm vào.
                    statisticsProductArray.push(
                        {
                            name: item.name,
                            quantity: item.quantity,
                            price: item.price,
                        }
                    );
                }
            });
        });
    } else {
        orderArray.forEach((order) => {
            if(isBetweenTwoDate(order.date, stDate, ndDate)){
                //  Trong mỗi order, duyệt từng item trong checkoutCart
                order.checkoutCart.forEach((item) => {
                    // Tìm trong staArray đã có item.name chưa?
                    const matchingProduct = statisticsProductArray.find((product) => product.name === item.name);
                    // Nếu sản phẩm đã có trong staArray thì tăng quantity và totalRevenue
                    if(matchingProduct){   
                        matchingProduct.quantity += item.quantity;
                    } else {    // Nếu chưa có thì thêm vào.
                        statisticsProductArray.push(
                            {
                                name: item.name,
                                quantity: item.quantity,
                                price: item.price,
                            }
                        );
                    }
                });
            }
        });
    }
    // Sắp xếp giảm dần trước khi trả về:
    statisticsProductArray = sortStatisticsProductArrayBySales(statisticsProductArray);
    return statisticsProductArray;
}
// Sắp xếp mảng thống kê giảm dần theo doanh số của từng sản phẩm
function sortStatisticsProductArrayBySales(statisticsProductArray){
    return statisticsProductArray.slice().sort((productA, productB) => {
        // return productB.quantity - productA.quantity;
        // Nếu khách số lượng thì sort giảm dần theo số lượng
        if(productA.quantity != productB.quantity){
            return productB.quantity - productA.quantity;
        } else {
            // Nếu bằng số lượng thì sort giảm dần theo giá
            return productB.price - productA.price;
        }
    });
}

export function createStatisticsCustomerArray(stDate = null, ndDate = null){
    let statisticsCustomerArray = [
        // {
        //     customerId: undefined,
        //     phone: undefined,
        //     totalRevenue: undefined,
        // }
    ];
    if(stDate == null && ndDate == null){
        orderArray.forEach((order) => {
            const matchingCustomer = statisticsCustomerArray.find((customer) => customer.customerId === order.customerId);
            if(matchingCustomer){
                // Nếu đã có thì tăng doanh thu
                matchingCustomer.totalRevenue += order.calculateTotalPayment();
            } else {
                // Nếu chưa có thì thêm vào
                // Tìm thông tin của khách đã đặt đơn:
                const newCustomer = customerArray.find((customer) => customer.username === order.customerId);
                statisticsCustomerArray.push(
                    {
                        customerId: order.customerId,
                        phone: newCustomer.phone,
                        totalRevenue: order.calculateTotalPayment(),
                    }
                );
            }
        });
    } else {
        orderArray.forEach((order) => {
            if(isBetweenTwoDate(order.date, stDate, ndDate)){
                const matchingCustomer = statisticsCustomerArray.find((customer) => customer.customerId === order.customerId);
                if(matchingCustomer){
                    // Nếu đã có thì tăng doanh thu
                    matchingCustomer.totalRevenue += order.calculateTotalPayment();
                } else {
                    // Nếu chưa có thì thêm vào
                    // Tìm thông tin của khách đã đặt đơn:
                    const newCustomer = customerArray.find((customer) => customer.username === order.customerId);
                    statisticsCustomerArray.push(
                        {
                            customerId: order.customerId,
                            phone: newCustomer.phone,
                            totalRevenue: order.calculateTotalPayment(),
                        }
                    );
                }
            }
        });
    }
    // Sắp xếp trước khi trả về
    statisticsCustomerArray = sortStatisticsCustomerArrayByRevenue(statisticsCustomerArray);
    return statisticsCustomerArray;
}
// Sắp xếp mảng thống kê giảm dần theo doanh thu của từng khách hàng
function sortStatisticsCustomerArrayByRevenue(statisticsCustomerArray){
    return statisticsCustomerArray.slice().sort((customerA, customerB) => {
        return customerB.totalRevenue - customerA.totalRevenue;
    });
}


/** TÍNH NĂNG statistics: lọc Product và Customer theo ngày được nhập */
export function filterStatisticsBetweenTwoDate(stDate, ndDate, statisticsArray){
    const filterDateArray = [];
    orderArray.forEach((order) => {
        if(true === isBetweenTwoDate(order.date, stDate, ndDate)){
            filterDateArray.push(order);
        }
    });
    return filterDateArray;
}



export function addTestOrderToArray(){
    addOrderToArray('user1', [], new Date('2024-02-10'));
    addOrderToArray('user2', [], new Date('2024-05-10'));
    addOrderToArray('user3', [], new Date('2024-07-20'));
    addOrderToArray('user4', [], new Date('2024-07-25'));
    addOrderToArray('user5', [], new Date('2024-10-01'));
}

/** CÁC TÍNH NĂNG BÊN PHÍA ADMIN: 
 * --- Đơn hàng:
 * 1. Lọc đơn hàng theo khoảng thời gian
 * 2. Lọc đơn hàng theo tình trạng
 * 3. Săp xếp đơn hàng theo quận (được giao, trong Customer)
 * 4. *CSS - Đánh dấu đơn hàng theo tình trạng đơn hàng (thể hiện thông qua css)
 * 
 * --- Thống kê:
 * - MỌI TÍNH NĂNG ĐỀU CÓ PHẦN XEM CHI TIẾT HÓA ĐƠN(xuất hóa đơn từ ORDER).
 * - HÓA ĐƠN: được xuất từ Order với status: 'SUCCEEDED'
 * 
 * 1. User: top [n] user mua nhiều nhất (tính theo totalPayment)
 * 2. Product:  bán chạy nhất, ế nhất.
 *              số lượng bán ra, tổng doanh thu.
 */


