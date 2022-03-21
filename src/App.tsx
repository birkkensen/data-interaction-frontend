import { Route, Routes } from "react-router-dom";
import { NotFound, Home, ProductPage, Cart, Login, Dashboard, Checkout } from "./pages";
import { Navbar } from "./components";
const App = () => {
  return (
    <>
      <Navbar />
      <div className="container2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
