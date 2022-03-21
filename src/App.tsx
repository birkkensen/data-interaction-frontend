import { Route, Routes } from "react-router-dom";
import { NotFound, Home, ProductPage, Cart, Login } from "./pages";
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
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
