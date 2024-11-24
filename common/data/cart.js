/** CART ĐƯỢC LƯU RỜI RẠC, 
 * TRUY XUẤT THÔNG QUA USERNAME(of CUSTOMER)
 */
export class Cart {
    /* localStorageKey: username của customer tương ứng với cart */
    localStorageKey;        
    cartItem = [];          // mảng các products
    counterProducts;         // Tổng số lượng product trong Cart
    
    // Khởi tạo cart ban đầu: load lên từ localStorage
    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadCartFromStorage();
    }

    // Private method
    loadCartFromStorage()
    {
        /** Get data for cart from localStorage:
         * Lấy cart JSON từ localStorage thông qua key
         * Parse -> array để lưu vào cartItem
         */ 
        try {  
            const localCart = JSON.parse(localStorage.getItem(this.localStorageKey));  
            // Nếu localCart tồn tại, lấy giá trị từ đó.
            if (localCart) {  
                this.cartItem = localCart.cartItem || [];
                if(this.cartItem.length === 0)  
                    this.counterProducts = 0;
                else this.counterProducts = localCart.counterProducts;   
            } // Nếu ko tồn tại, thì lấy giá trị mặc định: 
            else {  
                this.cartItem = [];  
                this.counterProducts = 0;  
            }  
            console.log('Loaded cart: ', this.cartItem);  
        } catch (error) {  
            console.error('Failed to load cart from storage', error);  
            this.cartItem = [];  
            this.counterProducts = 0;  
        }  
    }
    /** SAVE CART TO localStorage: 
     * Chuyển cartItem về string
     * Lưu vào localStorage
     */
    saveCartToStorage(){
        const cartData = {
            cartItem: this.cartItem,
            counterProducts: this.counterProducts,
        }
        localStorage.setItem(this.localStorageKey, JSON.stringify(cartData));
        // localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItem));

        console.log('Saved cart of ' + this.localStorageKey);
    }
    /** THÊM PRODUCT VÀO CART: tìm trong cart product cần thêm
     * Có: tăng quantity lên
     * Không: thêm product mới vào cart
     */
    addToCart(product){
        // Tìm product với name và phiên bản tương ứng trong cart
        let matchingProduct;
        this.cartItem.forEach((item) => {
            if(item.name === product.name && item.pb === product.pb){
                console.log(item.pb);
                matchingProduct = item;
            }
        });
        // Có sản phẩm với name và phiên bản tương ứng
        // thì tăng quantity, ngược lại: add
        if(matchingProduct){
            matchingProduct.quantity += product.quantity;
            // matchingProduct.quantity++;
            console.log('Product ' + matchingProduct.name + ' existed, increase quantity.');
        } else {
            this.cartItem.push(
                product
                // {
                //     name: product.name,
                //     quantity: product.quantity,
                //     isPicked: false,
                //     //--------------
                //     brandId: product.brandId,
                //     img: product.img,
                //     name: product.name,
                //     pb: product.pb,
                //     price: product.price,
                //     chip: product.chips,
                //     pin: product.pin,
                //     size: product.size,
                //     f: product.f,
                // }
            );
            console.log('Added product ' + product.name + ' to cart of ' + this.localStorageKey);
        }
        // Thay đổi counterProducts:
        this.counterProducts += product.quantity;
        // Cập nhật lại cart mới:
        this.saveCartToStorage();
    }
    removeFromCart(productName, productVersion){
        const newCartItem = [];
        this.counterProducts = 0;
        this.cartItem.forEach((item) => {
            // Không phải product cần xóa thì thêm vào newCartItem
            if(!(item.name === productName && item.pb === productVersion)){
                newCartItem.push(item);
                this.counterProducts += item.quantity;
            }
        });
        this.cartItem = newCartItem;

        this.saveCartToStorage();
    }
    removeAllFromCart()
    {
        this.cartItem = [];          // Reset mảng các products
        this.counterProducts = 0;
        this.saveCartToStorage();
    }

    /** Chọn các product để mua:
     * Arg: name
     * Thay đổi trạng thái của isPicked -> true (được chọn)
     */
    markProductToPay(productName, productVersion){
        this.cartItem.forEach((item) => {
            if(!(item.name === productName && item.pb === productVersion)){
                item.isPicked = true;
            }
        });
        console.log('Marked ' + productName);
        // Lưu vào localStorage sau khi thay đổi:
        this.saveCartToStorage();
    }
}