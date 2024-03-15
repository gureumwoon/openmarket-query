import axios, { AxiosInstance } from "axios";
import { AddCart, ModifyCartQuantity, PaymentItem } from "../components/types/product";
import { SellerSignUp, UserLogin, UserSignUp } from "../components/types/user";

export const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        'Content-type': 'application/json;charset=UTF-8',
        accept: 'application/json,',
    },
});


api.interceptors.request.use((config: any) => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken !== undefined) {
        config.headers.common["authorization"] = jwtToken ? `JWT ${jwtToken}` : "";
    }
    return config;
});


export const apis = {
    // user
    signUp: (data: UserSignUp) => api.post("accounts/signup/", data),
    userNameDupcheck: (data: string) => api.post("accounts/signup/valid/username/", data),
    companyNumCheck: (data: string) => api.post("accounts/signup/valid/company_registration_number/", data),
    signIn: (data: UserLogin) => api.post("accounts/login/", data),
    signOut: () => api.post("accounts/logout/"),
    // seller-user
    sellerSignUp: (data: SellerSignUp) => api.post("accounts/signup_seller/", data),
    // product
    getProduct: (page: number) => api.get(`products/?page=${page}`),
    getOneProduct: (id: number) => api.get(`products/${id}/`),
    addProduct: (data: FormData) => api.post("products/", data),
    getSellerProduct: () => api.get("seller/"),
    deleteProduct: (id: number) => api.delete(`products/${id}/`),
    modifyProduct: (id: number, data: FormData) => api.put(`products/${id}/`, data),
    // cart
    addCart: (data: AddCart) => api.post("cart/", data),
    getCart: () => api.get("cart/"),
    getCartItem: (id: number) => api.get(`cart/${id}/`),
    modifyQuantity: (id: number, data: ModifyCartQuantity) => api.put(`cart/${id}/`, data),
    deleteItem: (id: number) => api.delete(`cart/${id}/`),
    deleteAllItem: () => api.delete("cart/"),
    // order
    directOrder: (data: PaymentItem) => api.post("order/", data),
    // search
    searchProduct: (data: string) => api.get(`products/?search=${data}`)
}

