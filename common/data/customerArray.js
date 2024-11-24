/** CUSTOMER ARRAY: lưu toàn bộ thông tin của khách hàng.
 * Mỗi phần từ là một Customer Object, với: 
 * Property: username, password, status, phone, email,
 *           address (obj)   
 * Method:
 *  -
 *  -
 */
export class Address {
    city = '';           // String: Thành phố
    district = '';       // Number: Quận *
    // ward = '';           // Phường
    numberAndRoad = '';  // Số nhà và tên đường

    constructor(city, district, numberAndRoad) {
        this.city = city;
        this.district = district;
        // this.ward = ward;
        this.numberAndRoad = numberAndRoad;
      }

    /* METHOD */
    // Lấy ra district field
    getDistrict(){
        return this.district;
    }
    // Lấy ra district field với từ 'Quận' thêm vào
   
}
export class InfoCard {
    cardNumber = '';
    expiryDate = '';
    cvv = '';
    cardholderName = '';
    billingAddress = '';
    zipCode = '';
    constructor(cardNumber, expiryDate, cvv, cardholderName, billingAddress, zipCode){
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
        this.cardholderName = cardholderName;
        this.billingAddress = billingAddress;
        this.zipCode = zipCode;
    }

}
class Customer {
    username = '';   // (Work like ID), unique
    password = '';   
    
    /* Information của khách hàng: 
    có thể gộp thành Object nhưng để đơn giản -> không gộp */
    name = '';
    phone = '';      
    address;// Địa chỉ của khách hàng
    infoCard;
    /** locked: trạng thái của khách hàng, bị khóa hay chưa
     * true: unavailable (đã bị khóa)
     * false: available (chưa khóa, đang hoạt động)
     */
    locked = false;     // Default: false
    
    constructor(username, password, name, phone, address = new Address(), infoCard = new InfoCard(), locked = false){
        this.username = username;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.infoCard = infoCard;
        this.locked = locked;
    }

    /* METHOD */
    lockCustomer(){
        this.locked = true;
    }
    unlockCustomer(){
        if(this.locked){
            this.locked = false;
        } else {
            console.log('Failed: Tài khoản người dùng chưa bị khóa.');
        }
    }
}

/* MẢNG KHÁCH HÀNG */
const AllCustomerArray = [
    // new Customer("user1", "pass1111", "User one", "1000000001", new Address("City1", "8", "Ward1", "1 Road A"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user2", "pass2", "User Two", "1000000002", new Address("City2", "5", "Ward2", "2 Road B"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user3", "pass3", "1000000003", new Address("City3", "Bình Thạnh", "Ward3", "3 Road C"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user4", "pass4", "1000000004", new Address("City4", "Tân Phú", "Ward4", "4 Road D"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user5", "pass5", "1000000005", new Address("City5", "Tân Bình", "Ward5", "5 Road E"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user6", "pass6", "1000000006", "user6@example.com", new Address("City6", "District6", "Ward6", "6 Road F"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user7", "pass7", "1000000007", "user7@example.com", new Address("City7", "District7", "Ward7", "7 Road G"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user8", "pass8", "1000000008", "user8@example.com", new Address("City8", "District8", "Ward8", "8 Road H"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user9", "pass9", "1000000009", "user9@example.com", new Address("City9", "District9", "Ward9", "9 Road I"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user10", "pass10", "1000000010", "user10@example.com", new Address("City10", "District10", "Ward10", "10 Road J"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user11", "pass11", "1000000011", "user11@example.com", new Address("City11", "District11", "Ward11", "11 Road K"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user12", "pass12", "1000000012", "user12@example.com", new Address("City12", "District12", "Ward12", "12 Road L"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user13", "pass13", "1000000013", "user13@example.com", new Address("City13", "District13", "Ward13", "13 Road M"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user14", "pass14", "1000000014", "user14@example.com", new Address("City14", "District14", "Ward14", "14 Road N"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user15", "pass15", "1000000015", "user15@example.com", new Address("City15", "District15", "Ward15", "15 Road O"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user16", "pass16", "1000000016", "user16@example.com", new Address("City16", "District16", "Ward16", "16 Road P"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user17", "pass17", "1000000017", "user17@example.com", new Address("City17", "District17", "Ward17", "17 Road Q"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user18", "pass18", "1000000018", "user18@example.com", new Address("City18", "District18", "Ward18", "18 Road R"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user19", "pass19", "1000000019", "user19@example.com", new Address("City19", "District19", "Ward19", "19 Road S"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user20", "pass20", "1000000020", "user20@example.com", new Address("City20", "District20", "Ward20", "20 Road T"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user21", "pass21", "1000000021", "user21@example.com", new Address("City21", "District21", "Ward21", "21 Road U"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user22", "pass22", "1000000022", "user22@example.com", new Address("City22", "District22", "Ward22", "22 Road V"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user23", "pass23", "1000000023", "user23@example.com", new Address("City23", "District23", "Ward23", "23 Road W"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user24", "pass24", "1000000024", "user24@example.com", new Address("City24", "District24", "Ward24", "24 Road X"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user25", "pass25", "1000000025", "user25@example.com", new Address("City25", "District25", "Ward25", "25 Road Y"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user26", "pass26", "1000000026", "user26@example.com", new Address("City26", "District26", "Ward26", "26 Road Z"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user27", "pass27", "1000000027", "user27@example.com", new Address("City27", "District27", "Ward27", "27 Road A"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user28", "pass28", "1000000028", "user28@example.com", new Address("City28", "District28", "Ward28", "28 Road B"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user29", "pass29", "1000000029", "user29@example.com", new Address("City29", "District29", "Ward29", "29 Road C"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user30", "pass30", "1000000030", "user30@example.com", new Address("City30", "District30", "Ward30", "30 Road D"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user31", "pass31", "1000000031", "user31@example.com", new Address("City31", "District31", "Ward31", "31 Road E"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user32", "pass32", "1000000032", "user32@example.com", new Address("City32", "District32", "Ward32", "32 Road F"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user33", "pass33", "1000000033", "user33@example.com", new Address("City33", "District33", "Ward33", "33 Road G"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user34", "pass34", "1000000034", "user34@example.com", new Address("City34", "District34", "Ward34", "34 Road H"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user35", "pass35", "1000000035", "user35@example.com", new Address("City35", "District35", "Ward35", "35 Road I"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user36", "pass36", "1000000036", "user36@example.com", new Address("City36", "District36", "Ward36", "36 Road J"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user37", "pass37", "1000000037", "user37@example.com", new Address("City37", "District37", "Ward37", "37 Road K"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user38", "pass38", "1000000038", "user38@example.com", new Address("City38", "District38", "Ward38", "38 Road L"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user39", "pass39", "1000000039", "user39@example.com", new Address("City39", "District39", "Ward39", "39 Road M"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false),
    // new Customer("user40", "pass40", "1000000040", "user40@example.com", new Address("City40", "District40", "Ward40", "40 Road N"), new InfoCard("1234567812345678", "12/24", "123", "John Doe", "123 Billing St", "54321"), false)
];
// Load mảng lên từ localStorage hoặc sử dụng AllCustomerArray
export let customerArray = JSON.parse(localStorage.getItem('customerArray')) || AllCustomerArray;
console.log(customerArray);
// console.log(customerArray);
// Nếu customerArray chưa được tạo:
// if(!customerArray){
//     customerArray = AllCustomerArray ;
//     console.log(customerArray);
// }

// Lưu mảng vào localStorage:
export function saveCustomerArrayToStorage(){
    try {  
        // Convert the array to a JSON string and save it to local storage  
        localStorage.setItem('customerArray', JSON.stringify(customerArray));  
        console.log('Saved customerArray to localStorage');  
    } catch (error) {  
        console.error('Error saving customer data:', error);  
    } 
}

/** ----- USER ----- */
// Kiểm tra trong mảng customer đã có tồn tại username hoặc đã bị khóa
// Có: return true
// Không: return false
export function checkExistedUsername(username) {
    // !!! forEach: duyệt từ đầu đến cuối mảng không dừng với return.
    // some: dừng lại vòng lặp ngay khi tìm thấy username tương ứng.
    return customerArray.some((customer) => {
        if (username === customer.username) {

            console.log('Existed: pass user: ' + username);
            return true; // Đã tồn tại
        }
        return false;
    });
}

// Kiểm tra đăng nhập đúng và tài khoản chưa bị khóa
// -1: username không tồn tại hoặc mật khẩu không đúng.
// 0: tài khoản đã bị khóa
// 1: hợp lệ
export function checkValidAccount(username, password){
    const matchingCustomer = customerArray.find(customer => (customer.username === username));
    // if(!matchingCustomer || matchingCustomer.password !== password){
    //     return false;
    // }    
    if(!matchingCustomer){
        console.log(`Username "${username}" không tồn tại.`);
        return -1;
    } else {
        if(matchingCustomer.locked){
            console.log(`Username ${username} đã bị khóa`);
            return 0;
        }
        if(matchingCustomer.password !== password){
            console.log('Mật khẩu không đúng.');
            return -1;
        }

    }
    return 1;
}
// export function checkValidAccount(username, password){
//     const matchingCustomer = customerArray.find(customer => (customer.username === username));
//     // if(!matchingCustomer || matchingCustomer.password !== password){
//     //     return false;
//     // }    
//     if(!matchingCustomer){
//         console.log(`Username "${username}" không tồn tại.`);
//         return false;
//     } else {
//         if(matchingCustomer.locked){
//             console.log(`Username ${username} đã bị khóa`);
//             return false;
//         }
//         if(matchingCustomer.password !== password){
//             console.log('Mật khẩu không đúng.');
//             return false;
//         }

//     }
//     console.log('Lock: ');
//     console.log(matchingCustomer.locked);
//     return true;
// }

// Thêm new customer vào Array
// Chỉ cần truyền username, password (khi customer mới đăng kí)
export function addCustomerToArray(username, password, name = '', phone = '', address = new Address(), infoCard = new InfoCard(), locked = false){
    // Kiểm tra username đã tồn tại chưa
    if(checkExistedUsername(username)){
        console.log(`Username "${username}" đã tồn tại.`);
        return false;
    }
    const customer = new Customer(username, password, name, phone, address, infoCard, locked = false);
    customerArray.push(customer);
    console.log('Added customer to customerArray');

    // Lưu thay đổi vào localStorage:
    saveCustomerArrayToStorage();
}
