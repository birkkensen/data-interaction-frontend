import Cookies from "universal-cookie";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { getCartItems } from "../../api";
import { CartItems } from "../../interfaces";
import { Navbar } from "../../components";
import "./index.css";

const Cart: React.FC = (): JSX.Element => {
  const [cart, setCart] = useState<CartItems>();
  const cookies: Cookies = new Cookies();
  const cartId: Cookies = cookies.get("cartId");
  useEffect(() => {
    getCartItems(cartId)
      .then((data) => setCart(data.data))
      .catch((err) => console.log(err));
  }, [cartId]);
  return (
    <>
      <Navbar />
      {cart?.products.map((product) => {
        return (
          <div key={uuidv4()}>
            <img src={product.image} alt={product.name} />
            <div>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Cart;
