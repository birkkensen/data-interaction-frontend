import { useContext, createContext } from "react";
import { ICart } from "../interfaces";
export interface GlobalCart {
  cart: ICart | undefined;
  setCart: (c: ICart) => void;
}
export const GlobalCartContext = createContext<GlobalCart>({
  cart: {
    products: [
      {
        _id: "",
        name: "",
        description: "",
        image: "",
        price: 0,
        inStock: false,
        qty: 0,
      },
    ],
    totalQty: 0,
  },

  setCart: () => {},
});
export const useGlobalContext = () => useContext(GlobalCartContext);
