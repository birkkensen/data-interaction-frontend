import Cookies from "universal-cookie";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCartItems, removeItemFromCart } from "../../api";
import { CartItems } from "../../interfaces";
import { AiOutlineArrowRight } from "react-icons/ai";

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
    window.location.reload();
  };

  let sum: number = 0;
  return (
    <section className="container mx-auto mt-32">
      <div className="flex flex-col items-center w-1/2 mx-auto">
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
        {cart &&
          cart.products.map((product, i) => {
            sum += product.product.price;
            return (
              <>
                <div className="h-0.5 w-full bg-gray-300 my-6"></div>
                <div className="flex w-full justify-between">
                  <div className="flex " key={uuidv4()}>
                    <img
                      className="max-w-[150px]"
                      src={product.product.image}
                      alt={product.product.name}
                    />
                    <div className="flex flex-col justify-between ml-6">
                      <div>
                        <p>{product.product.name}</p>
                        <p className="text-gray-500">{product.product.description}</p>
                      </div>
                      <p>Something</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between text-right">
                    <p>{product.product.price}.00 kr</p>
                    <button
                      onClick={() => {
                        handleClick(cart.products[i]._id);
                      }}
                      className="text-cyan-600 font-bold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        <SumOfProducts sum={sum} cart={cart} />
      </div>
    </section>
  );
};

const SumOfProducts = ({
  sum,
  cart,
}: {
  sum: number;
  cart: CartItems | undefined;
}): JSX.Element => {
  return (
    <section className="flex flex-col w-full">
      <div className="h-0.5 w-full bg-gray-300 my-6"></div>
      <div className="flex justify-between mb-6">
        <div>
          <p className="font-semibold text-gray-800">Total to pay</p>
          <p className="text-sm text-gray-600">Shipping and taxes will be calculated at checkout</p>
        </div>
        <p className="font-semibold text-gray-800">{sum},00 kr</p>
      </div>
      <button className="py-3 bg-cyan-600 rounded-md text-white">Checkout</button>
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
