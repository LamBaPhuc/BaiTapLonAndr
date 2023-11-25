import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const addToCart = async (cartData) => {
  const response = await axios.post(
    `${base_url}order/add-to-cart`,
    cartData,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const getCart = async () => {
  const response = await axios.get(
    `${base_url}order/cart`,

    config
  );
  if (response.data) {
    return response.data;
  }
};

const removeProductFromCart = async (id) => {
  const response = await axios.delete(
    `${base_url}order/remove-from-cart/${id}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const updateProductQuantity = async (updatedProduct) => {
  console.log(updatedProduct.quantity);
  const response = await axios.put(
    `${base_url}order/update-from-cart/${updatedProduct.cartItemId}`,
    { newQuantity: updatedProduct.quantity },
    config
  );
  if (response.data) {
    return response.data;
  }
};
const getOrderByUserId = async () => {
  const response = await axios.get(`${base_url}order/getmyorders`, config);
  if (response.data) {
    return response.data;
  }
};
const createOrder = async (orderData) => {
  const response = await axios.post(
    `${base_url}order/cash-order`,
    orderData,
    config
  );
  if (response.data) {
    return response.data;
  }
};
export const orderService = {
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductQuantity,
  getOrderByUserId,
  createOrder,
};
