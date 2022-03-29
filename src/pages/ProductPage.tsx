import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useParams, Params } from "react-router-dom";
import { getProductById, addToCart, getCartItems } from "../api";
import { IProduct } from "../interfaces";
import { BtnFullWidth, DisabledBtn, Modal } from "../components";
import { useGlobalContext } from "../hooks/GlobalCart";
const ProductPage: React.FC = (): JSX.Element => {
  const cookies: Cookies = new Cookies();
  const [product, setProduct] = useState<IProduct>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { id } = useParams<Readonly<Params<string>>>();
  const { setCart } = useGlobalContext();
  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleClick = async (): Promise<void> => {
    setIsOpen(true);
    await addToCart(id)
      .then((res) => {
        if (cookies.get("cartId")) return;
        cookies.set("cartId", res.data, { path: "/", expires: new Date(Date.now() + 86400000) });
      })
      .then(async () => {
        await getCartItems(cookies.get("cartId"))
          .then((res) => setCart(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-32  w-full">
      {product && (
        <div className="flex mx-10 flex-col justify-around md:items-center lg:flex-row ">
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
            {product.inStock ? (
              <BtnFullWidth onClick={handleClick} title="Add to cart" />
            ) : (
              <DisabledBtn title="Out of stock" />
            )}
            <div className="my-6"></div>
            {product.inStock && (
              <button className="w-full py-3 border-2 border-cyan-600 text-black rounded-lg transition duration-300 active:ease-in-out active:scale-95">
                Buy now
              </button>
            )}
          </div>
          <img
            className="w-full object-cover md:w-5/6 lg:w-3/6 rounded-md"
            src={product.image}
            alt={product.name}
          />
        </div>
      )}
      <Modal name={product?.name} open={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ProductPage;
