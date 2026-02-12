
import { createAsyncThunk } from "@reduxjs/toolkit"
const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async () => {
     console.log("hello");
    },
)