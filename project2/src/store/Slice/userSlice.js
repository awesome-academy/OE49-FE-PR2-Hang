import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_API_URL } from "../../constants";

export const signup = createAsyncThunk("user/signup", async (user) => {
  try {
    const response = await axios.post(USER_API_URL, user);
    return response.data;
  } catch (error) {
    return error;
  }
});
