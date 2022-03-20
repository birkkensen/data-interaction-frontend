import { Link } from "react-router-dom";
import "./index.css";
function NotFound() {
  return (
    <div className="container">
      <h1 className="notFound">404 - Not Found!</h1>
      <Link className="notFoundLink" to="/">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
