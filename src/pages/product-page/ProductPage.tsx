import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useParams, Params } from "react-router-dom";
import { getProductById, addToCart } from "../../api";
import { Product } from "../../interfaces";

const ProductPage: React.FC = (): JSX.Element => {
  const cookies = new Cookies();
  const [product, setProduct] = useState<Product>();
  const { id } = useParams<Readonly<Params<string>>>();

  useEffect(() => {
    getProductById(id)
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
    window.location.reload();
  };

  return (
    <div className="mt-32  w-full">
      {product && (
        <div className="flex mx-10 flex-col lg:flex-row justify-around">
          <div className="w-full md:w-5/6 lg:w-3/6 mb-6 md:p-6">
            <h2 className="text-4xl font-bold">{product.name}</h2>
            <p className="text-xl my-6">{product.price} kr</p>
            <p className="mb-6">
              {product.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
              dolorem quia nostrum, consequuntur incidunt aliquam exercitationem iusto doloribus
              numquam atque?
            </p>
            <p className="mb-2">Variant</p>
            <div className="flex flex-col md:flex-row mb-6 gap-x-8">
              <div className="py-5 px-3 rounded-xl border-2 border-cyan-600 mb-6 md:mb-0">
                <p className="font-bold">With Suit</p>
                <p className="text-gray-700">Perfect if you want a suite to your fella</p>
              </div>
              <div className="py-5 px-3 rounded-xl border-2 border-gray-200">
                <p className="font-bold">Without Suit</p>
                <p className="text-gray-700">Perfect if you want a suite to your fella</p>
              </div>
            </div>
            <button
              disabled={!product.inStock}
              onClick={handleClick}
              className="w-full py-3 bg-cyan-600 text-white rounded-lg mb-6 transition duration-300 active:ease-in-out active:bg-cyan-500 active:scale-95"
            >
              {product.inStock ? "Add to cart" : "Out of stock"}
            </button>
            {product.inStock && (
              <button className="w-full py-3 border-2 border-cyan-600 text-black rounded-lg transition duration-300 active:ease-in-out active:scale-95">
                Buy now
              </button>
            )}
          </div>
          <img className="w-full object-cover lg:w-3/6" src={product.image} alt={product.name} />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
