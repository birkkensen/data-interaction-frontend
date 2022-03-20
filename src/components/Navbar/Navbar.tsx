import "./index.css";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
const Navbar = () => {
  return (
    <nav>
      <Link to={"/"}>
        <h1>E-Commerce</h1>
      </Link>
      <Stack spacing={2} justifyContent="space-between" direction="row">
        <Badge badgeContent={2} color="primary">
          <ShoppingBagOutlinedIcon color="primary" fontSize="large" />
        </Badge>
        <AccountCircleOutlinedIcon color="primary" fontSize="large" />
      </Stack>
    </nav>
  );
};

export default Navbar;
