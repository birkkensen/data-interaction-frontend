import { useState, useEffect } from "react";
import { Navbar, ProductGrid } from "../../components";
import { getAllProducts } from "../../api";
import "./index.css";

interface Products {
  _id: string;
  productId: number;
  name: string;
  description: string;
  image: string;
  price: number;
  qty: number;
}

const Home: React.FC = (): JSX.Element => {
  const allProductsUri: string = "/api/products";
  const [products, setProducts] = useState<Products[]>();

  useEffect(() => {
    getAllProducts(allProductsUri)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Navbar />
      <FeaturedImage />
      <h2 style={{ margin: "20px" }}>Some stuff</h2>
      <section className="product-grid-container">
        {products &&
          products.map((product) => {
            return (
              <ProductGrid
                key={product._id}
                productId={product.productId}
                name={product.name}
                description={product.description}
                image={product.image}
                price={product.price}
                _id={product._id}
              />
            );
          })}
      </section>
    </>
  );
};

const FeaturedImage = (): JSX.Element => {
  return (
    <div className="featured-container">
      <img className="featured-image" src="./images/lego.jpg" alt="Lego" />
      <h2 className="featured-title">Some whacky text</h2>
    </div>
  );
};

export default Home;
