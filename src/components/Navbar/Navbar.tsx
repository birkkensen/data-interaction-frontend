import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Badge from "@mui/material/Badge";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { getCartItems } from "../../api";
import { CartItems } from "../../interfaces";

const Navbar = () => {
  const cookies = new Cookies();
  const cartId: Cookies = cookies.get("cartId");
  const [productCount, setProductCount] = useState<number>(0);
  useEffect(() => {
    getCartItems(cartId).then((data) => {
      const cart: CartItems = data.data;
      setProductCount(cart?.products.length);
    });
  }, [cartId]);
  return (
    <nav className="fixed top-0 w-full bg-gray-900 flex justify-between items-center p-5 z-50">
      <Link to="/">
        <img className="h-12 w-12 rounded-full" src="./images/logo.jpg" alt="LOGO" />
      </Link>
      <div className="flex">
        <Link to="/cart">
          <Badge badgeContent={productCount} color="primary">
            <AiOutlineShoppingCart className="text-white text-3xl" />
          </Badge>
        </Link>
        <Link className="ml-4" to="/login">
          <AiOutlineUser className="text-white text-3xl" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
