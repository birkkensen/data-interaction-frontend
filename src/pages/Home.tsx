import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProductGrid, Filter } from "../components";
import { getAllProducts, getProductsByName } from "../api";
import { IProduct } from "../interfaces";

const Home: React.FC = (): JSX.Element => {
  const [products, setProducts] = useState<IProduct[]>();
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getProductsByName(search)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [search]);
  return (
    <>
      <FeaturedImage />
      <div className="bg-white">
        <div className="max-w-2x1 mx-auto py-16 px-14 sm:py-24 sm:px-6 lg:max-w-7x1 lg:px-8">
          <div className="flex flex-col w-full md:flex-row md:justify-between items-center mb-8">
            <h2 className="text-stone-900 text-3xl font-bold">Some stuff</h2>
            <Filter setSearch={setSearch} />
          </div>
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
    <section className="flex justify-center flex-col md:flex-row">
      <div className="flex items-center bg-slate-100 h-auto">
        <div className="ml-8 my-16 lg:w-5/6 p-4 lg:p-8">
          <h1 className="text-3xl md:text-6xl text-stone-900 font-bold">Funny fellas</h1>
          <p className="text-xl my-8 text-slate-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, voluptatibus!
          </p>
          <button className="hover:bg-indigo-700 py-3 px-8 bg-indigo-600 text-white font-normal rounded">
            Learn more
          </button>
        </div>
      </div>
      <div>
        <img
          className="w-full h-96 md:h-full object-center object-cover"
          src="./images/lego3.jpg"
          alt=""
        />
      </div>
    </section>
  );
};

export default Home;
