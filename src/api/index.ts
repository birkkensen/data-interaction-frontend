import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";

const BASE_URL_PRODUCTS: string = "http://localhost:8080/api/products";
const BASE_URL_CART: string = "http://localhost:8080/api/cart";

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

export { getAllProducts, getProductById, addToCart, getCartItems };
