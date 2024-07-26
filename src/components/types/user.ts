export interface UserLogin {
    username: string,
    password: string,
    login_type: string
}

export interface UserSignUp {
    username: string;
    password: string;
    password2: string;
    phone_number: string;
    name: string;
}

export interface SellerSignUp extends UserSignUp {
    company_registration_number: string,
    store_name: string,
}