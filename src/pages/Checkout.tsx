import { useState, useEffect } from "react";
import { CheckoutForm, ICart } from "../interfaces";
import { placeOrder, getCartItems, removeItemFromCart } from "../api";
import Cookies from "universal-cookie";

const Checkout = () => {
  const cookies: Cookies = new Cookies();
  const cartId: Cookies = cookies.get("cartId");
  const [cart, setCart] = useState<ICart>();
  // Random number transaction id between 1 and 10000
  const transactionId: number = Math.floor(Math.random() * 10000) + 1;
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: "",
    adress: "",
    country: "",
    zipcode: "",
    phone: "",
    creditCard: "",
    cvv: "",
    expireDate: "",
    orderStatus: "Processing",
    transactionId: transactionId,
  });

  useEffect(() => {
    getCartItems(cartId)
      .then((data) => setCart(data.data))
      .catch((err) => console.log(err));
  }, [cartId]);

  const {
    firstName,
    lastName,
    email,
    adress,
    country,
    zipcode,
    phone,
    creditCard,
    cvv,
    expireDate,
  }: CheckoutForm = formData;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await placeOrder(formData, cart)
      .then((res) => console.log(res.data))
      .then(async () => {
        await removeItemFromCart(cartId, "", true);
        cookies.remove("cartId");
      })
      .then(() => (window.location.href = "/"))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <section className="w-3/4 mx-auto mt-32">
        <h2 className="text-2xl mb-4">Personal information</h2>
        <form onSubmit={onSubmit} className="flex flex-col items-center">
          <div className="flex flex-col sm:flex-row w-full gap-2 mb-4">
            <input
              className="basis-1/2 p-2 border border-gray-200 rounded"
              required
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              placeholder="First name"
              onChange={onChange}
            />
            <input
              className="basis-1/2 p-2 border border-gray-200 rounded"
              required
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              placeholder="Last name"
              onChange={onChange}
            />
          </div>
          <input
            className="w-full p-2 border border-gray-200 rounded mb-4"
            required
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />
          <input
            className="w-full p-2 border border-gray-200 rounded mb-4"
            required
            type="text"
            name="adress"
            id="adress"
            value={adress}
            placeholder="Enter your adress"
            onChange={onChange}
          />
          <div className="flex flex-col sm:flex-row w-full gap-2 mb-4">
            <input
              className="basis-1/2 p-2 border border-gray-200 rounded"
              required
              type="text"
              name="country"
              id="country"
              value={country}
              placeholder="Country"
              onChange={onChange}
            />
            <input
              className="basis-1/2 p-2 border border-gray-200 rounded"
              required
              type="number"
              name="zipcode"
              id="zipcode"
              value={zipcode}
              placeholder="Zipcode"
              onChange={onChange}
            />
          </div>
          <input
            className="w-full p-2 border border-gray-200 rounded mb-4"
            required
            type="number"
            name="phone"
            id="phone"
            value={phone}
            placeholder="(+46) 760 15 8935"
            onChange={onChange}
          />
          <p className="text-2xl self-start my-4">Payments details</p>
          <input
            className="w-full p-2 border border-gray-200 rounded mb-4"
            required
            type="number"
            name="creditCard"
            id="creditCard"
            value={creditCard}
            placeholder="0000 0000 0000 0000"
            onChange={onChange}
          />
          <div className="flex flex-col sm:flex-row w-full gap-2 mb-4">
            <input
              className="basis-1/2 p-2 border border-gray-200 rounded"
              required
              type="number"
              name="cvv"
              id="cvv"
              value={cvv}
              placeholder="123"
              onChange={onChange}
            />
            <input
              className="basis-1/2 p-2 border border-gray-200 rounded"
              required
              type="text"
              name="expireDate"
              id="expireDate"
              value={expireDate}
              placeholder="MM/YY"
              onChange={onChange}
            />
          </div>
          <button className="p-2 bg-black text-white font-bold rounded w-full" type="submit">
            Place order
          </button>
        </form>
      </section>
    </>
  );
};

export default Checkout;
