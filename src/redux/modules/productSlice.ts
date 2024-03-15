import { Product, ProductDetail } from "../../components/types/product";
import { apis } from "../../shared/api";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface PropductInitProps {
    products: Product[];
    count: number;
    productOne: ProductDetail | null;
    sellerProducts: Product[];
    searchProduct: Product[];
}

const initialState: PropductInitProps = {
    products: [],
    count: 1,
    productOne: null,
    sellerProducts: [],
    searchProduct: [],
}

// 상품 리스트 불러오기
export const getProduct = createAsyncThunk(
    "product/getProduct",
    async (page: number) => {
        try {
            const res = await apis.getProduct(page)
            return { products: res.data.results, count: res.data.count };
        } catch (error) {
            console.log("상품에러", error)
            throw error;
        }
    }
);

// 하나의 상품 가져오기
export const getOneProduct = createAsyncThunk(
    "product/getOneProduct",
    async (productId: number, thunkAPI) => {
        try {
            const res = await apis.getOneProduct(productId);
            return thunkAPI.fulfillWithValue(res.data)
        } catch (error) {
            console.log("상품하나", error);
            throw error;
        }
    }
)

// 상품 업로드
export const uploadProduct = createAsyncThunk(
    "product/getProduct",
    async (formData: FormData) => {
        try {
            const res = await apis.addProduct(formData);
            window.location.assign("/seller-center");
            return res.data.results;
        } catch (error) {
            console.log("상품업로드에러", error)
            throw error;
        }
    }
);

// 판매상품 수정하기
export const modifyProduct = createAsyncThunk(
    "product/modifyProduct",
    async ({ id, data }: { id: number, data: FormData }) => {
        try {
            const res = await apis.modifyProduct(id, data);
            window.location.assign("/seller-center");
            return res.data;
        } catch (error) {
            console.log("상품수정에러", error);
            throw error;
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (productId: number) => {
        try {
            const res = await apis.deleteProduct(productId);
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

export const getSellerProduct = createAsyncThunk(
    "product/getSellerProduct",
    async (_, thunkAPI) => {
        try {
            const res = await apis.getSellerProduct();
            return thunkAPI.fulfillWithValue(res.data.results)
        } catch (error) {
            console.log("판매자상품불러오기실패", error);
            throw error;
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.fulfilled, (state, action) => {
                state.products = state.products.concat(action.payload.products);
                state.count = action.payload.count;
            })
            .addCase(getOneProduct.fulfilled, (state, action) => {
                state.productOne = action.payload;
            })
            .addCase(getSellerProduct.fulfilled, (state, action) => {
                state.sellerProducts = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.sellerProducts = action.payload;
            })
    }
})

export default productSlice.reducer;