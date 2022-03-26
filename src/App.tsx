import { Route, Routes } from "react-router-dom";
import { NotFound, Home, ProductPage, Cart, Login, Dashboard, Checkout } from "./pages";
import { Navbar, Footer } from "./components";
import { ICart } from "./interfaces";
import { useState, useEffect } from "react";
import { GlobalCartContext } from "./hooks/GlobalCart";
import Cookies from "universal-cookie";
import { getCartItems } from "./api";
const App = () => {
  const [cart, setCart] = useState<ICart>();
  const cookies = new Cookies();
  const cartId: Cookies = cookies.get("cartId");
  useEffect(() => {
    if (cartId) {
      getCartItems(cartId).then((data) => {
        const cart: ICart = data.data;
        setCart(cart);
      });
    }
  }, [setCart, cartId]);
  return (
    <>
      <GlobalCartContext.Provider value={{ cart, setCart }}>
        <Navbar />
        <section className="mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
        <Footer />
      </GlobalCartContext.Provider>
    </>
  );
};

export default App;
