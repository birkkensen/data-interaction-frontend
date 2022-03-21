import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProductGrid } from "../../components";
import { getAllProducts } from "../../api";
// import "./index.css";
import { Product } from "../../interfaces";

const Home: React.FC = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <FeaturedImage />
      <div className="bg-white">
        <div className="max-w-2x1 mx-auto py-16 px-14 sm:py-24 sm:px-6 lg:max-w-7x1 lg:px-8">
          <h2 className="sr-only">Some stuff</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products &&
              products.map((product) => {
                return (
                  <ProductGrid
                    key={uuidv4()}
                    name={product.name}
                    description={product.description}
                    image={product.image}
                    price={product.price}
                    _id={product._id}
                  />
                );
              })}
          </div>
        </div>
      </div>
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
