// product

interface BaseProduct {
    product_id: number;
    product_name: string;
    seller: number;
    image: string;
    price: number;
    shipping_method: string;
    shipping_fee: number;
    stock: number;
    products_info: string;
}

export interface Product extends BaseProduct {
    store_name: string;
}

export interface SellerProduct extends BaseProduct {
    seller_store: string;
}

export interface ProductDetail extends Product {
    created_at: string;
    updated_at: string;
}

// cart product

interface CartProduct {
    product_id: number;
    quantity: number;
    is_active?: boolean;
}

export interface AddCart extends CartProduct {
    check: boolean;
}

export interface ModifyCartQuantity extends CartProduct {
    is_active: boolean;
}

export interface CartDetail extends CartProduct {
    my_cart: number;
    cart_item_id: number;
}

// payment product

export interface PaymentItem extends CartProduct {
    order_kind: string;
    receiver: string;
    receiver_phone_number: string;
    address: string;
    address_message: string;
    payment_method: string;
    total_price: number;
}