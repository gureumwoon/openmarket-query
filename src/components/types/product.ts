// product

export interface Product {
    product_id: number;
    product_name: string;
    seller: number;
    store_name: string;
    image: string;
    price: number;
    shipping_method: string;
    shipping_fee: number;
    stock: number;
    products_info: string;
}

export interface ProductDetail extends Product {
    created_at: string;
    updated_at: string;
}

// cart product

export interface AddCart {
    product_id: number;
    quantity: number;
    check: boolean;
}

export interface ModifyCartQuantity {
    product_id: number;
    quantity: number;
    is_active: boolean;
}

export interface CartDetail {
    my_cart: number;
    cart_item_id: number;
    product_id: number;
    quantity: number;
    is_active?: boolean;
}

// payment product

export interface PaymentItem {
    product_id: number;
    quantity: number;
    order_kind: string;
    receiver: string;
    receiver_phone_number: string;
    address: string;
    address_message: string;
    payment_method: string;
    total_price: number;
}