import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";
import { CartItems, CheckoutForm } from "../interfaces";

const BASE_URL_PRODUCTS: string = "http://localhost:8080/api/products";
const BASE_URL_CART: string = "http://localhost:8080/api/cart";
const BASE_URL_LOGIN: string = "http://localhost:8080/api/warehouse/login";
const BASE_URL_EMPLOYEE: string = "http://localhost:8080/api/orders";

const cookies = new Cookies();

const getAllProducts = async (): Promise<AxiosResponse> => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL_PRODUCTS}`,
  });
  return response;
};

const getProductById = async (id: string | undefined): Promise<AxiosResponse> => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL_PRODUCTS}/${id}`,
  });
  return response;
};

const addToCart = async (id: string | undefined): Promise<AxiosResponse> => {
  const cartId = cookies.get("cartId");
  const data = {
    _id: id,
    cartId: cartId,
  };
  const response = await axios({
    method: "post",
    url: `${BASE_URL_CART}`,
    data,
  });
  return response;
};

const getCartItems = async (id: Cookies): Promise<AxiosResponse> => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL_CART}/${id}`,
  });
  return response;
};

const removeItemFromCart = async (
  cartId: Cookies | undefined,
  id: string
): Promise<AxiosResponse> => {
  const response = await axios({
    method: "delete",
    url: `${BASE_URL_CART}`,
    data: {
      cartId,
      id,
    },
  });
  return response;
};

const loginUser = async (email: string, password: string): Promise<AxiosResponse> => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL_LOGIN}`,
    data: {
      email,
      password,
    },
  });
  return response;
};

const placeOrder = async (
  formData: CheckoutForm,
  cartItems: CartItems | undefined
): Promise<AxiosResponse> => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL_EMPLOYEE}`,
    data: {
      formData,
      products: cartItems,
    },
  });
  return response;
};

const getAllOrders = async (token: string | null): Promise<AxiosResponse> => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL_EMPLOYEE}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const clearCart = async (): Promise<number> => {
  const response = await axios({
    method: "delete",
    url: `${BASE_URL_CART}/clear`,
  });
  return response.status;
};

export {
  getAllProducts,
  getProductById,
  addToCart,
  getCartItems,
  removeItemFromCart,
  loginUser,
  getAllOrders,
  placeOrder,
  clearCart,
};
