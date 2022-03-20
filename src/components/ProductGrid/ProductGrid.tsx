import { Link } from "react-router-dom";
import "./index.css";
interface Products {
  _id: string;
  productId: number;
  name: string;
  description: string;
  image: string;
  price: number;
}
const ProductGrid: React.FC<Products> = ({ _id, name, description, image, price }) => {
  return (
    <Link className="product-link" to={`product/${_id}`}>
      <img className="product-image" src={image} alt={name} />
      <div className="product-details">
        <h4 className="product-details-title">{name}</h4>
        <p className="product-details-desc">{description}</p>
        <p className="product-details-price">{price} kr</p>
      </div>
    </Link>
  );
};

export default ProductGrid;
