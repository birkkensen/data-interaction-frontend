import { Link } from "react-router-dom";
import { Product } from "../../interfaces";
const ProductGrid: React.FC<Product> = ({ _id, name, description, image, price }) => {
  return (
    <Link className="group" to={`product/${_id}`}>
      <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-center object-cover group-hover:opacity-75"
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
