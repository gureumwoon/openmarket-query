import { CartDetail, ModifyCartQuantity } from "../../components/types/product";
import { apis } from "../../shared/api";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface CartInit {
    cartList: CartDetail[];
}

const initialState: CartInit = {
    cartList: [],
}

// 장바구니 목록 불러오기
export const getCartList = createAsyncThunk(
    "cart/getCartList",
    async () => {
        try {
            const res = await apis.getCart()
            return res.data.results
        } catch (error) {
            console.log("장바구니에러", error);
            throw error;
        }
    }
)

// 장바구니 개별 아이템
export const getCartItem = createAsyncThunk(
    "cart/getCartItem",
    async (cartId: number) => {
        try {
            const res = await apis.getCartItem(cartId)
            return res.data.results
        } catch (error) {
            console.log("장바구니아이템에러", error);
            throw error;
        }
    }
)

// 장바구니 상품 개별 삭제
export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async (cartItemId: number) => {
        try {
            const res = await apis.deleteItem(cartItemId);
            return res.data;
        } catch (error) {
            console.log("개별삭제 에러", error);
            throw error;
        }
    }
)

// 장바구니 상품 리스트 삭제
export const deleteAllItem = createAsyncThunk(
    "cart/deleteCartItem",
    async () => {
        try {
            const res = await apis.deleteAllItem();
            return res.data;
        } catch (error) {
            console.log("전체삭제에러", error);
            throw error;
        }
    }
)

// 장바구니 아이템 수량변경
export const modifyCartItem = createAsyncThunk(
    "cart/modifyCartItem",
    async ({ itemId, itemData }: { itemId: number, itemData: ModifyCartQuantity }) => {
        try {
            const res = await apis.modifyQuantity(itemId, itemData);
            return res.data
        } catch (error) {
            console.log("수량변경에러", error);
            throw error;
        }
    }
)


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCartList.fulfilled, (state, action) => {
                state.cartList = action.payload;
            })
            .addCase(getCartItem.fulfilled, (state, action) => {
                state.cartList = action.payload;
            })
            .addCase(modifyCartItem.fulfilled, (state, action) => {
                state.cartList = action.payload;
            })
            .addCase(deleteAllItem.fulfilled, (state, action) => {
                state.cartList = action.payload;
            })
    }
})

export default cartSlice.reducer;

