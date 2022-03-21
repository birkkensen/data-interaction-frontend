import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import { ShoppingBagOutlined, AccountCircleOutlined } from "@mui/icons-material";
import "./index.css";
import { getCartItems } from "../../api";
import { CartItems } from "../../interfaces";

const Navbar = () => {
  const cookies = new Cookies();
  const cartId: Cookies = cookies.get("cartId");
  const [productCount, setProductCount] = useState<number>(0);
  useEffect(() => {
    getCartItems(cartId).then((data) => {
      const cart: CartItems = data.data;
      setProductCount(cart.products.length);
    });
  });
  return (
    <nav>
      <Link to="/">
        <h1>E-Commerce</h1>
      </Link>
      <Stack spacing={2} justifyContent="space-between" direction="row">
        <Link to="/cart">
          <Badge badgeContent={productCount} color="primary">
            <ShoppingBagOutlined color="primary" fontSize="large" />
          </Badge>
        </Link>
        <Link to="/login">
          <AccountCircleOutlined color="primary" fontSize="large" />
        </Link>
      </Stack>
    </nav>
  );
};

export default Navbar;
