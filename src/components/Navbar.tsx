import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { useGlobalContext } from "../hooks/GlobalCart";

const Navbar = () => {
  const { cart } = useGlobalContext();
  return (
    <nav className="fixed top-0 w-full bg-indigo-600 flex justify-between items-center p-5 z-50">
      <div className="flex">
        <Link to="/">
          <img className="h-12 w-12 rounded-full mr-8" src="./images/logo.jpg" alt="LOGO" />
        </Link>
        <ul className="items-center text-white gap-x-8 font-medium hidden sm:flex">
          <li>Products</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="flex">
        <Link to="/cart">
          <Badge badgeContent={cart?.totalQty} color="primary">
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
