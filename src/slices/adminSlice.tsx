/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
// import axios from 'axios';

// Define a type for the slice state
interface CounterState {
  adminName:string;
  isAuthenticated: boolean;
  loading: boolean;
  error?: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  adminName:"",
  isAuthenticated: true,
  loading: false,
  error: undefined
}

// 1) Login: fetch all questions
export const login = createAsyncThunk<
  { username:string },
  { username: string; password: string; },
  { rejectValue: string }
>("admin/login", async ({ username, password }, thunkAPI) => {
  try {
    // const response = await axios.post(
    //   process.env.NEXT_PUBLIC_FRONTEND_URL + "/api/login",
    //   {
    //     payload: {
    //       username,
    //       dbname: process.env.NEXT_PUBLIC_DATABASE_NAME?.toString(),
    //       password: password,
    //     },
    //   }
    // );
    console.log(password); //todo :remove this line for production 
     
    return { username };
  } catch (err: any) {
    const message =
      err.response?.data?.message || err.message || "Login failed";
    return thunkAPI.rejectWithValue(message);
  }
});

export const counterSlice = createSlice({
  name: 'admin',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAdminName:(state,action:PayloadAction<{ adminName: string; }>)=>{
      state.adminName=action.payload.adminName
    },
    setIsLoading:(state,action:PayloadAction<boolean>)=>{
      state.loading=action.payload
    },
  },
  
  extraReducers: (builder) => {
    builder
      // login Admin
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { username } = action.payload;
        state.loading = false;
        state.adminName = username
        state.isAuthenticated=true
        state.error = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
  },
})

export const { setAdminName,setIsLoading } = counterSlice.actions

export default counterSlice.reducer