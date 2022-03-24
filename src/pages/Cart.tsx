import Cookies from "universal-cookie";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getCartItems, removeItemFromCart } from "../api";
import { ICart } from "../interfaces";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BtnFullWidth, DisabledBtn } from "../components";

const Cart: React.FC = (): JSX.Element => {
  const [cart, setCart] = useState<ICart>();
  const cookies: Cookies = new Cookies();
  const cartId: Cookies | undefined = cookies.get("cartId");
  useEffect(() => {
    if (cartId) {
      getCartItems(cartId)
        .then((data) => setCart(data.data))
        .catch((err) => console.log(err));
    }
  }, [cartId]);
  console.log(cart);
  const handleClick = async (id: string) => {
    await removeItemFromCart(cartId, id).catch((err) => console.log(err));
    window.location.reload();
  };
  let sum: number = 0;
  return (
    <section className="container mx-auto mt-32">
      <div className="flex flex-col items-center sm:mx-auto mx-4 sm:w-full md:w-4/6 lg:w-1/2">
        {cart?.products.length ? <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2> : ""}
        {cart?.products.length ? (
          cart.products.map((product, i) => {
            sum += product.price * cart.cartItems[i].qty;
            return (
              <React.Fragment key={uuidv4()}>
                <div className="h-0.5 w-full bg-gray-300 my-6"></div>
                <div className="flex w-full justify-between">
                  <img
                    className="w-28 sm:max-w-[150px] rounded-md object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="flex justify-between w-full">
                    <div className="flex basis-2/3 flex-col justify-between ml-6">
                      <div>
                        <p>{product.name}</p>
                        <p className="text-gray-500">{product.description}</p>
                      </div>
                      <p>Something</p>
                    </div>

                    <div className="flex basis-1/3 flex-col justify-between text-right">
                      <p>{product.price}.00 kr</p>
                      <form action="/action_page.php">
                        <label htmlFor="quantity">Qty</label>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          value={cart.cartItems[i].qty}
                          readOnly
                          min="1"
                          max="100"
                          className="text-center border-2 border-purple-600 rounded-lg ml-2"
                        />
                      </form>
                      <button
                        onClick={() => {
                          handleClick(cart.products[i]._id);
                        }}
                        className="text-cyan-600 font-bold self-end w-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <h2 className="text-3xl font-bold mb-6">Oh no, your cart is empty!</h2>
        )}
        <SumOfProducts sum={sum} cart={cart} />
      </div>
    </section>
  );
};

const SumOfProducts = ({ sum, cart }: { sum: number; cart: ICart | undefined }): JSX.Element => {
  return (
    <section className="flex flex-col w-full">
      <div className="h-0.5 w-full bg-gray-300 my-6"></div>
      <div className="flex justify-between mb-6">
        <div className="basis-2/3">
          <p className="font-semibold text-gray-800">Total to pay</p>
          <p className="text-sm text-gray-600">Shipping and taxes will be calculated at checkout</p>
        </div>
        <p className="font-semibold text-gray-800 basis-1/3 text-right">{sum},00 kr</p>
      </div>
      {cart?.products.length ? (
        <Link to="/cart/checkout">
          <BtnFullWidth />
        </Link>
      ) : (
        <DisabledBtn />
      )}
      <p className="text-center text-sm my-6">
        or{" "}
        <Link className="text-cyan-600" to="/">
          Continue Shopping <AiOutlineArrowRight className="inline" />
        </Link>
      </p>
    </section>
  );
};
export default Cart;
