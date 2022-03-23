import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-4">404 - Not Found!</h1>
      <Link
        className="text-2xl underline text-purple-600 hover:text-purple-300 transition duration-300 hover:ease-in-out"
        to="/"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
