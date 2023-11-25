import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  }
};
const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    return response.data;
  }
};
const getUserWishList = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};
const getUser = async () => {
  const response = await axios.get(`${base_url}user/current-user`, config);
  if (response.data) {
    return response.data;
  }
};
const forgotPassToken = async (data) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    data
  );
  if (response.data) {
    return response.data;
  }
};
const resetPassword = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data?.token}`,
    { password: data?.password }
  );

  if (response.data) {
    return response.data;
  }
};
export const authService = {
  register,
  login,
  getUserWishList,
  getUser,
  forgotPassToken,
  resetPassword,
};
