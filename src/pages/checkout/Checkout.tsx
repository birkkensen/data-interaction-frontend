import { useState, useEffect } from "react";
import { CheckoutForm, CartItems } from "../../interfaces";
import { placeOrder, getCartItems, clearCart } from "../../api";
import Cookies from "universal-cookie";
import "./index.css";

const Checkout = () => {
  const cookies: Cookies = new Cookies();
  const cartId: Cookies = cookies.get("cartId");
  const [cart, setCart] = useState<CartItems>();
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

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await placeOrder(formData, cart)
      .then((res) => console.log(res.data))
      .then(async () => {
        await clearCart();
        cookies.remove("cartId");
      })
      .then(() => (window.location.href = "/"))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <section className="form">
        <section className="checkout-heading">
          <p>Personal information</p>
        </section>
        <form onSubmit={onSubmit}>
          <div className="form-group-half">
            <input
              required
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              placeholder="First name"
              onChange={onChange}
            />
          </div>
          <div className="form-group-half">
            <input
              required
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              placeholder="Last name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              required
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              required
              type="text"
              name="adress"
              id="adress"
              value={adress}
              placeholder="Enter your adress"
              onChange={onChange}
            />
          </div>
          <div className="form-group-half">
            <input
              required
              type="text"
              name="country"
              id="country"
              value={country}
              placeholder="Country"
              onChange={onChange}
            />
          </div>
          <div className="form-group-half">
            <input
              required
              type="number"
              name="zipcode"
              id="zipcode"
              value={zipcode}
              placeholder="Zipcode"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              required
              type="number"
              name="phone"
              id="phone"
              value={phone}
              placeholder="(+46) 760 15 8935"
              onChange={onChange}
            />
          </div>
          <section className="checkout-heading">
            <p>Payments details</p>
          </section>
          <div className="form-group">
            <input
              required
              type="number"
              name="creditCard"
              id="creditCard"
              value={creditCard}
              placeholder="0000 0000 0000 0000"
              onChange={onChange}
            />
          </div>
          <div className="form-group-half">
            <input
              required
              type="number"
              name="cvv"
              id="cvv"
              value={cvv}
              placeholder="123"
              onChange={onChange}
            />
          </div>
          <div className="form-group-half">
            <input
              required
              type="text"
              name="expireDate"
              id="expireDate"
              value={expireDate}
              placeholder="MM/YY"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Place order
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Checkout;
