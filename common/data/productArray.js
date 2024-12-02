
// MẢNG LƯU TRỮ SẢN PHẨM
export const productArray = [
    {productId: 1,brandId: 'Samsung', img:'../common/images/img-prd/ss1.png', name: 'Samsung Galaxy A06', price: [3681000, 3951000, 4491000], pb: ['4GB/128GB', '8GB/256GB', '8GB/512GB'], chip: 'MediaTek G85', pin: '5.000mAh', size: '6.7"', f: '60Hz'},  
    {productId: 2,brandId: 'Samsung', img:'../common/images/img-prd/ss2.png', name: 'Samsung Galaxy A15', price: [3771000, 4041000], pb: ['8GB/128GB', '16GB/512GB'], chip: 'Helio G99', pin: '5.000mAh', size: '6.5"', f: '90Hz'},  
    {productId: 3,brandId: 'Samsung', img:'../common/images/img-prd/ss3.png', name: 'Samsung Galaxy A05S', price: [3591000, 3771000], pb: ['4GB/128GB', '8GB/512GB'], chip: 'Snap 680', pin: '5.000mAh', size: '6.7"', f: '90Hz'},  
    {productId: 4,brandId: 'Samsung', img:'../common/images/img-prd/ss4.png', name: 'Samsung Galaxy A25 5G', price: [5931000, 6291000], pb: ['6GB/128GB', '8GB/512GB'], chip: 'Exynos 1280', pin: '5.000mAh', size: '6.5"', f: '120Hz'},  
    {productId: 5,brandId: 'Samsung', img:'../common/images/img-prd/ss5.png', name: 'Samsung Galaxy M34 5G', price: [7191000, 7371000], pb: ['8GB/128GB', '16GB/512GB'], chip: 'Exynos 1280', pin: '6.000mAh', size: '6.5"', f: '120Hz'},  
    {productId: 6,brandId: 'Samsung', img:'../common/images/img-prd/ss6.png', name: 'Samsung Galaxy S23 FE 5G', price: [13401000, 14301000], pb: ['8GB/128GB', '16GB/512GB'], chip: 'Exynos 2200', pin: '4.500mAh', size: '6.4"', f: '120Hz'},  
    {productId: 7,brandId: 'Samsung', img:'../common/images/img-prd/ss7.png', name: 'Samsung Galaxy Z Flip5', price: [23391000, 25191000], pb: ['8GB/256GB', '16GB/512GB'], chip: 'Snap 8 Gen 2', pin: '3.700mAh', size: '6.7" - 3.4"', f: '120Hz'},  
    {productId: 8,brandId: 'Samsung', img:'../common/images/img-prd/ss8.png', name: 'Samsung Galaxy Z Pro', price: [26991000, 27711000], pb: ['16GB/512GB', '32GB/1TB'], chip: 'Snap 8 Gen 2', pin: '3.700mAh', size: '6.7" - 3.4"', f: '120Hz'},  
    {productId: 9,brandId: 'Samsung', img:'../common/images/img-prd/ss9.png', name: 'Samsung Galaxy S23 Ultra', price: [33291000, 35091000], pb: ['12GB/512GB', '16GB/1TB'], chip: 'Snap 8 Gen 2', pin: '5.000mAh', size: '6.8"', f: '120Hz'},  
    {productId: 10,brandId: 'Samsung', img:'../common/images/img-prd/ss10.png', name: 'Samsung Galaxy Z Fold5', price: [40491000, 42291000], pb: ['12GB/512GB', '16GB/1TB'], chip: 'Snap 8 Gen 2', pin: '4.400mAh', size: '7.6" - 6.2"', f: '120Hz'},  
    {productId: 11,brandId: 'Samsung', img:'../common/images/img-prd/ss11.png', name: 'Samsung Galaxy Z Fold6', price: [41391000, 43191000], pb: ['12GB/512GB', '16GB/1TB'], chip: 'Snap 8 Gen 3', pin: '4.400mAh', size: '7.6" - 6.3"', f: '120Hz'},  
    {productId: 12,brandId: 'Samsung', img:'../common/images/img-prd/ss12.png', name: 'Samsung Galaxy S24 Ultra', price: [40041000, 41931000], pb: ['16GB/1TB', '32GB/1TB'], chip: 'Snap 8 Gen 3', pin: '5.000mAh', size: '6.8"', f: '120Hz'},  
    {productId: 13,brandId: 'Apple', img: '../common/images/img-prd/ap1.png', name: 'iPhone 11', price: [8991000, 9891000], pb: ['8GB/64GB', '12GB/128GB'], chip: 'A13 Bionic', pin: '3.110mAh', size: '6.1"', f: '60Hz'},  
    {productId: 14,brandId: 'Apple', img: '../common/images/img-prd/ap2.png', name: 'iPhone 12', price: [10791000, 11691000], pb: ['8GB/64GB', '12GB/128GB'], chip: 'A14 Bionic', pin: '2.815mAh', size: '6.1"', f: '60Hz'},  
    {productId: 15,brandId: 'Apple', img: '../common/images/img-prd/ap3.png', name: 'iPhone 13', price: [13491000, 14571000], pb: ['8GB/128GB', '16GB/512GB'], chip: 'A15 Bionic', pin: '3.240mAh', size: '6.1"', f: '60Hz'},  
    {productId: 16,brandId: 'Apple', img: '../common/images/img-prd/ap4.png', name: 'iPhone 14', price: [15381000, 16371000], pb: ['8GB/128GB', '16GB/512GB'], chip: 'A15 Bionic', pin: '3.279mAh', size: '6.1"', f: '60Hz'},  
    {productId: 17,brandId: 'Apple', img: '../common/images/img-prd/ap5.png', name: 'iPhone 14 Plus', price: [17451000, 18711000], pb: ['8GB/128GB', '16GB/512GB'], chip: 'A15 Bionic', pin: '4.325mAh', size: '6.7"', f: '60Hz'},  
    {productId: 18,brandId: 'Apple', img: '../common/images/img-prd/ap6.png', name: 'iPhone 15 Plus', price: [19791000, 21411000], pb: ['8GB/128GB', '16GB/512GB'], chip: 'A16 Bionic', pin: '4.383mAh', size: '6.7"', f: '60Hz'},  
    {productId: 19,brandId: 'Apple', img: '../common/images/img-prd/ap7.png', name: 'iPhone 16', price: [22491000, 25031000], pb: ['12GB/256GB', '16GB/1TB'], chip: 'A18 Bionic', pin: '4.500mAh', size: '6.1"', f: '120Hz'},  
    {productId: 20,brandId: 'Apple', img: '../common/images/img-prd/ap8.png', name: 'iPhone 15 Pro Max', price: [25821000, 27531000], pb: ['12GB/256GB', '16GB/1TB'], chip: 'A17 Pro', pin: '4.422mAh', size: '6.7"', f: '120Hz'},  
    {productId: 21,brandId: 'Apple', img: '../common/images/img-prd/ap9.png', name: 'iPhone 16 Plus', price: [26091000, 28341000], pb: ['16GB/256GB', '16GB/1TB'], chip: 'A18 Pro', pin: '3.274mAh', size: '6.1"', f: '120Hz'}, 
    {productId: 22,brandId: 'VIVO', img: '../common/images/img-prd/vv1.png', name: 'Vivo Y03T', price: [2511000, 3006000], pb: ['4GB/64GB', '8GB/128GB'], chip: 'Unisoc Tiger T612', pin: '5.000mAh', size: '6.56"', f: '60Hz'},
    {productId: 23,brandId: 'VIVO', img: '../common/images/img-prd/vv2.png', name: 'Vivo Y02s', price: [2556000, 3123000], pb: ['3GB/32GB', '6GB/64GB'], chip: 'Helio P35', pin: '5.000mAh', size: '6.51"', f: '60Hz'},
    {productId: 24,brandId: 'VIVO', img: '../common/images/img-prd/vv3.png', name: 'Vivo Y19S', price: [4311000, 4923000], pb: ['8GB/128GB', '16GB/512GB'], chip: 'Unisoc Tiger T612', pin: '5.000mAh', size: '6.68"', f: '90Hz'},
    {productId: 25,brandId: 'VIVO', img: '../common/images/img-prd/vv4.png', name: 'Vivo Y35', price: [6291000, 6768000], pb: ['8GB/128GB', '16GB/512GB'], chip: 'Snap 680', pin: '5.000mAh', size: '6.58"', f: '90Hz'},
    {productId: 26,brandId: 'VIVO', img: '../common/images/img-prd/vv5.png', name: 'Vivo Y36', price: [6741000, 7398000], pb: ['8GB/128GB', '16GB/512GB'], chip: 'Snap 680', pin: '5.000mAh', size: '6.64"', f: '90Hz'},
    {productId: 27,brandId: 'VIVO', img: '../common/images/img-prd/vv6.png', name: 'Vivo Y100', price: [6921000, 7758000], pb: ['8GB/256GB', '16GB/512GB'], chip: 'Snap 685', pin: '5.000mAh', size: '6.67"', f: '120Hz'},
    {productId: 28,brandId: 'VIVO', img: '../common/images/img-prd/vv7.png', name: 'Vivo T1X', price: [8991000, 9558000], pb: ['8GB/256GB', '16GB/512GB'], chip: 'SDM 680', pin: '5.000mAh', size: '6.58"', f: '120Hz'},
    {productId: 29,brandId: 'VIVO', img: '../common/images/img-prd/vv8.png', name: 'Vivo V25e', price: [7641000, 8658000], pb: ['8GB/256GB', '16GB/512GB'], chip: 'Helio G99', pin: '4.500mAh', size: '6.44"', f: '90Hz'},
    {productId: 30,brandId: 'VIVO', img: '../common/images/img-prd/vv9.png', name: 'Vivo V27e 4G', price: [14391000, 15858000], pb: ['8GB/256GB', '16GB/512GB'], chip: 'Helio G99', pin: '5.000mAh', size: '6.56"', f: '60Hz'},
    {productId: 31,brandId: 'VIVO', img: '../common/images/img-prd/vv10.png', name: 'Vivo T1 5G', price: [17091000, 18378000], pb: ['8GB/256GB', '16GB/512GB'], chip: 'Helio G99', pin: '4.600mAh', size: '6.62"', f: '120Hz'},
    {productId: 32,brandId: 'VIVO', img: '../common/images/img-prd/vv11.png', name: 'Vivo V29e 5G', price: [11691000, 12573000], pb: ['8GB/128GB', '16GB/512GB'], chip: 'Snap 695', pin: '4.800mAh', size: '6.67"', f: '120Hz'},
    {productId: 33,brandId: 'VIVO', img: '../common/images/img-prd/vv12.png', name: 'Vivo V25 5G', price: [13941000, 15003000], pb: ['8GB/128GB', '16GB/256GB'], chip: 'Dimensity 900', pin: '4.500mAh', size: '6.44"', f: '90Hz'},
    {productId: 34,brandId: 'BPHONE', img: '../common/images/img-prd/bp1.png', name: 'Bphone A85 5G', price: [38241000, 40455000], pb: ['12GB/256GB', '24GB/1TB'], chip: 'Snap 7 Gen 3', pin: '5.200mAh', size: '6.7"', f: '120Hz'}, 
    {productId: 35,brandId: 'BPHONE', img: '../common/images/img-prd/bp2.png', name: 'Bphone A60 5G', price: [40491000, 42246000], pb: ['12GB/1TB', '24GB/1TB'], chip: 'Snap 8 Gen 3', pin: '4.400mAh', size: '7.6" - 6.3"', f: '120Hz'}, 
    {productId: 36,brandId: 'BPHONE', img: '../common/images/img-prd/bp3.png', name: 'Bphone A50 5G', price: [29691000, 31473000], pb: ['12GB/512GB', '12GB/1TB'], chip: 'Snap 8 Gen 3', pin: '4.000mAh', size: '6.7" - 3.4"', f: '120Hz'}, 
    {productId: 37,brandId: 'BPHONE', img: '../common/images/img-prd/bp4.png', name: 'Bphone A40 5G', price: [28341000, 30564000], pb: ['12GB/512GB', '12GB/1TB'], chip: 'Snap 8 Gen 3', pin: '5.000mAh', size: '6.8"', f: '120Hz'}, 
    {productId: 38,brandId: 'XIAOMI', img: '../common/images/img-prd/xm1.png', name: 'Xiaomi Redmi 12', price: [4311000, 4851000], pb: ['8GB/128GB', '12GB/256GB'], chip: 'Helio G88', pin: '5.000mAh', size: '6.79"', f: '90Hz'},
    {productId: 39,brandId: 'XIAOMI', img: '../common/images/img-prd/xm2.png', name: 'Redmi Note 13', price: [4401000, 5049000], pb: ['8GB/128GB', '12GB/256GB'], chip: 'Snap 685', pin: '5.000mAh', size: '6.67"', f: '120Hz'},
    {productId: 40,brandId: 'XIAOMI', img: '../common/images/img-prd/xm3.png', name: 'Redmi Note 12', price: [4491000, 5211000], pb: ['8GB/128GB', '12GB/256GB'], chip: 'Snap 685', pin: '5.000mAh', size: '6.67"', f: '120Hz'},
    {productId: 41,brandId: 'XIAOMI', img: '../common/images/img-prd/xm4.png', name: 'POCO X6 5G', price: [7641000, 8649000], pb: ['8GB/256GB', '16GB/512GB'], chip: 'Snap 7s Gen 2', pin: '5.100mAh', size: '6.67"', f: '120Hz'},
    {productId: 42,brandId: 'XIAOMI', img: '../common/images/img-prd/xm5.png', name: 'Redmi Note 13 Pro 5G', price: [9891000, 10755000], pb: ['8GB/256GB', '16GB/512GB'], chip: 'Dimensity 7200', pin: '5.000mAh', size: '6.67"', f: '120Hz'},
    {productId: 43,brandId: 'XIAOMI', img: '../common/images/img-prd/xm6.png', name: 'Xiaomi 14T', price: [12591000, 14283000], pb: ['12GB/512GB', '16GB/1TB'], chip: 'Dimensity 8300-Ultra', pin: '5.000mAh', size: '6.67"', f: '144Hz'},
    {productId: 44,brandId: 'XIAOMI', img: '../common/images/img-prd/xm7.png', name: 'Xiaomi 13T', price: [11691000, 12123000], pb: ['12GB/256GB', '16GB/512GB'], chip: 'Dimensity 8200', pin: '5.000mAh', size: '6.67"', f: '144Hz'},
    {productId: 45,brandId: 'XIAOMI', img: '../common/images/img-prd/xm8.png', name: 'Xiaomi 14 Ultra', price: [29691000, 31842000], pb: ['16GB/512GB', '32GB/1TB'], chip: 'Snap 8 Gen 3', pin: '5.000mAh', size: '6.73"', f: '120Hz'},
    {productId: 46,brandId: 'XIAOMI', img: '../common/images/img-prd/xm9.png', name: 'Xiaomi 14T Pro', price: [16191000, 17442000], pb: ['12GB/512GB', '16GB/1TB'], chip: 'MediaTek 9300+', pin: '5.000mAh', size: '6.67"', f: '144Hz'},
    {productId: 47,brandId: 'XIAOMI', img: '../common/images/img-prd/xm10.png', name: 'Xiaomi 14', price: [20691000, 21582000], pb: ['12GB/256GB', '16GB/512GB'], chip: 'Snap 8 Gen 3', pin: '4.610mAh', size: '6.36"', f: '120Hz'},
    {productId: 48,brandId: 'XIAOMI', img: '../common/images/img-prd/xm11.png', name: 'Xiaomi 11 Lite 5G NE', price: [8091000, 9054000], pb: ['6GB/128GB', '12GB/256GB'], chip: 'Dimensity 7200', pin: '5.000mAh', size: '6.77"', f: '120Hz'}
];

export let allProducts = JSON.parse(localStorage.getItem('productArray')) || productArray;
// export { allProducts};




























