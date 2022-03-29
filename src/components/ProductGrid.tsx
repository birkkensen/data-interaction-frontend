import { Link } from "react-router-dom";
import { IProduct } from "../interfaces";
const ProductGrid: React.FC<IProduct> = ({ _id, name, description, image, price }): JSX.Element => {
  return (
    <Link className="group" to={`product/${_id}`}>
      <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-center object-cover transition-all duration-300 ease-in-out group-hover:opacity-75"
          src={image}
          alt={name}
        />
      </div>
      <h4 className="mt-4 text-sm text-gray-700">{name}</h4>
      <p className="mt-1 text-sm text-gray-700">{description}</p>
      <p className="mt-1 text-lg font-medium text-gray-900">{price} kr</p>
    </Link>
  );
};

export default ProductGrid;
