import Cookies from "universal-cookie";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { getCartItems, removeItemFromCart } from "../../api";
import { CartItems } from "../../interfaces";
import CloseIcon from "@mui/icons-material/Close";
import "./index.css";
import { Button } from "@mui/material";

const Cart: React.FC = (): JSX.Element => {
  const [cart, setCart] = useState<CartItems>();
  const cookies: Cookies = new Cookies();
  const cartId: Cookies = cookies.get("cartId");

  useEffect(() => {
    getCartItems(cartId)
      .then((data) => setCart(data.data))
      .catch((err) => console.log(err));
  }, [cartId]);

  const handleClick = async (id: string) => {
    await removeItemFromCart(cartId, id).catch((err) => console.log(err));
  };
  let sum: number = 0;
  return (
    <section className="cart-section">
      <h2 className="cart-title">Your basket</h2>

      {cart?.products.map((product, i) => {
        sum += product.product.price;
        return (
          <div className="cart-flex" key={uuidv4()}>
            <img className="cart-image" src={product.product.image} alt={product.product.name} />
            <div className="cart-desc">
              <div>
                <h4>{product.product.name}</h4>
                <p>{product.product.description}</p>
                <p>{product.product.price}</p>
              </div>
              <button className="cart-remove-button">
                <CloseIcon
                  onClick={() => {
                    handleClick(cart.products[i]._id);
                  }}
                />
              </button>
            </div>
          </div>
        );
      })}
      <SumOfProducts sum={sum} />
    </section>
  );
};

const SumOfProducts = ({ sum }: { sum: number }): JSX.Element => {
  return (
    <section className="cart-total-container">
      <div className="cart-total">
        <p>Products</p>
        <p>{sum},00 kr</p>
      </div>
      <div className="cart-total">
        <p>Discount</p>
        <p>0,00 kr</p>
      </div>
      <div className="cart-total">
        <p>Total</p>
        <p>{sum},00 kr</p>
      </div>
      <div className="line"></div>
      <div className="cart-total">
        <p>
          <b>Total to pay</b>
        </p>
        <p>
          <b>{sum},00 kr</b>
        </p>
      </div>
      <Button disabled size="large" style={{ marginTop: "16px" }} variant="contained" fullWidth>
        Checkout
      </Button>
    </section>
  );
};
export default Cart;
