import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/api";
import { PaymentItem } from "../../components/types/product";

const initialState = {
    paymentList: [],
}

export const addPayment = createAsyncThunk(
    "payment/addPayment",
    async (item: PaymentItem) => {
        try {
            const res = await apis.directOrder(item)
            return res.data
        } catch (error) {
            console.log("바로구매에러", error)
            throw error;
        }
    }
)

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPayment.fulfilled, (state, action) => {
                state.paymentList = action.payload;
            })
    }
})

export default paymentSlice.reducer