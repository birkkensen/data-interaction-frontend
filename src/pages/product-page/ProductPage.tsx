import { useEffect, useState } from "react";
import { useParams, Params } from "react-router-dom";
import { getProductById, addToCart } from "../../api";
import Cookies from "universal-cookie";
import { Navbar } from "../../components";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import "./index.css";
interface Product {
  _id: string;
  productId: number;
  name: string;
  description: string;
  image: string;
  price: number;
  qty: number;
}
const cookies = new Cookies();
const ProductPage: React.FC = (): JSX.Element => {
  const [product, setProduct] = useState<Product>();
  const { id } = useParams<Readonly<Params<string>>>();
  const productUri: string = "/api/products/";
  useEffect(() => {
    getProductById(productUri, id)
      .then((data) => setProduct(data.data))
      .catch((err) => console.log(err));
  }, [id]);
  const handleClick = async () => {
    await addToCart(id)
      .then((res) => {
        if (cookies.get("cartId")) return;
        cookies.set("cartId", res.data, { path: "/", expires: new Date(Date.now() + 86400000) });
      })
      .catch((err) => console.log(err));
  };
  if (!product) return <h1>Loading</h1>;
  return (
    <>
      <Navbar />
      {product && (
        <div className="product-grid">
          <img className="product-image" src={product.image} alt={product.name} />
          <div className="product-description-grid">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-desc">{product.description}</p>
            <p className="product-price">{product.price} kr</p>
            <Button onClick={handleClick} variant="outlined" endIcon={<AddShoppingCartIcon />}>
              Add to cart
            </Button>
            <Button variant="contained" endIcon={<ShoppingCartCheckoutIcon />}>
              Buy now
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
