import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user: User | null = JSON.parse(localStorage.getItem('user') || '{}');

interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}

interface UserLogin {
    email: string;
    password: string;

}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const register = createAsyncThunk<
    User,
    User,
    { rejectValue: string }
>('auth/register', async (user: User, thunkAPI) => {
    try {
        const response = await authService.register(user);
        return response.data;
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk<
    UserLogin,
    UserLogin,
    { rejectValue: string }
>('auth/login', async (user: UserLogin, thunkAPI) => {
    try {
        const response = await authService.login(user);
        return response.data;
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await authService.logout();
            return null;
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload as any
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.user = null
            })

            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            ;
    },
});

export const { reset } = authSlice.actions
export default authSlice.reducer;
