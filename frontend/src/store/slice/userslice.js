import { createSlice } from '@reduxjs/toolkit'



export const userSlice = createSlice({
    name: 'user',
    initialState:{
        isAuthenticated:false,
    },
    reducers: {
login:()=>{
    console.log('hello');
}
    },
    
})

// Action creators are generated for each case reducer function
export const {login } = userSlice.actions

export default userSlice.reducer