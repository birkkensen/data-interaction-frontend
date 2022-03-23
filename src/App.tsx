import { Route, Routes } from "react-router-dom";
// import { useState } from "react";
import { NotFound, Home, ProductPage, Cart, Login, Dashboard, Checkout } from "./pages";
import { Navbar, Footer } from "./components";
const App = () => {
  // const [cart, setCart] = useState();
  return (
    <>
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
    </>
  );
};

export default App;
