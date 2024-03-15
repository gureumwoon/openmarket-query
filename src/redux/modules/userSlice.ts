import { SellerSignUp, UserLogin, UserSignUp } from "../../components/types/user";
import { apis } from "../../shared/api";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface UserType {
    user: string | null;
    isLogin: boolean;
}

const initialState: UserType = {
    user: null,
    isLogin: false,
}

// 회원가입
export const signUpUser = createAsyncThunk(
    "user/signUp",
    async (data: UserSignUp) => {
        try {
            const res = await apis.signUp(data);
            window.alert("회원가입에 성공했습니다!")
            window.location.assign("/login")
            return res.data;
        } catch (error: any) {
            if (error.response.data.username[0] === '이 필드는 blank일 수 없습니다.') {
                console.log(error)
            } else {
                window.alert(error.response.data.errorMessage)
            }
        }
    }
);

// 판매자 회원가입
export const signUpSeller = createAsyncThunk(
    "user/signUpSeller",
    async (data: SellerSignUp) => {
        try {
            const res = await apis.sellerSignUp(data);
            window.alert("회원가입에 성공했습니다!")
            window.location.assign("/login")
            return res.data;
        } catch (error: any) {
            window.alert(error.response.data.errorMessage);
        }
    }
);

// 로그인
export const signInUser = createAsyncThunk(
    "user/signIn",
    async (data: UserLogin, thunkAPI) => {
        try {
            const res = await apis.signIn(data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("type", res.data.user_type);
            localStorage.setItem("id", res.data.id);
            window.alert(`환영합니다 ${data.username}님 :)`)
            window.location.assign("/")
            console.log(res.data)
            return thunkAPI.fulfillWithValue(res.data);;
        } catch (error: any) {
            window.alert(error.response.data.FAIL_Message)
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signInUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLogin = true;
            })
    }
});

export default userSlice.reducer;

