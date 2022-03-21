import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import { ShoppingBagOutlined, AccountCircleOutlined } from "@mui/icons-material";
import "./index.css";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <h1>E-Commerce</h1>
      </Link>
      <Stack spacing={2} justifyContent="space-between" direction="row">
        <Link to="/cart">
          <Badge badgeContent={2} color="primary">
            <ShoppingBagOutlined color="primary" fontSize="large" />
          </Badge>
        </Link>
        <AccountCircleOutlined color="primary" fontSize="large" />
      </Stack>
    </nav>
  );
};

export default Navbar;
