import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useParams, Params } from "react-router-dom";
import { getProductById, addToCart } from "../../api";
import { Product } from "../../interfaces";
import Button from "@mui/material/Button";
import { AddShoppingCart, ShoppingCartCheckout } from "@mui/icons-material";
import "./index.css";

const ProductPage: React.FC = (): JSX.Element => {
  const cookies = new Cookies();
  const [product, setProduct] = useState<Product>();
  const { id } = useParams<Readonly<Params<string>>>();

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data.data))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(product);
  const handleClick = async () => {
    await addToCart(id)
      .then((res) => {
        if (cookies.get("cartId")) return;
        cookies.set("cartId", res.data, { path: "/", expires: new Date(Date.now() + 86400000) });
      })
      .catch((err) => console.log(err));
    window.location.reload();
  };

  return (
    <>
      {product && (
        <div className="product-grid">
          <img className="product-image" src={product.image} alt={product.name} />
          <div className="product-description-grid">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-desc">{product.description}</p>
            <p className="product-price">{product.price} kr</p>
            <Button
              disabled={!product.inStock}
              onClick={handleClick}
              variant="outlined"
              endIcon={<AddShoppingCart />}
            >
              {product.inStock ? "Add to cart" : "Out of stock"}
            </Button>
            {product.inStock && (
              <Button variant="contained" endIcon={<ShoppingCartCheckout />}>
                Buy now
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
