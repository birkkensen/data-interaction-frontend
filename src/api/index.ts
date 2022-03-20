import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";
const BASE_URL: string = "http://localhost:8080";
const BASE_URL_CART: string = "http://localhost:8080/api/cart";
const cookies = new Cookies();
const getAllProducts = async (uri: string): Promise<AxiosResponse> => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}${uri}`,
  });
  return response;
};
const getProductById = async (uri: string, id: string | undefined): Promise<AxiosResponse> => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}${uri}/${id}`,
  });
  return response;
};
const addToCart = async (id: string | undefined): Promise<AxiosResponse> => {
  const cartId = cookies.get("cartId");
  console.log(cartId);
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
export { getAllProducts, getProductById, addToCart };
