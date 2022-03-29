import { getAllOrders } from "../api";
import { useEffect, useState } from "react";
import { Orders } from "../interfaces";
const Dashboard: React.FC = (): JSX.Element => {
  const [orders, setOrders] = useState<Orders>();

  const token = localStorage.getItem("token");
  useEffect(() => {
    getAllOrders(token)
      .then((data) => {
        setOrders(data.data[0]);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return orders ? (
    <>
      <div className="mt-32 mx-auto w-3/4">
        <div>
          <h2>Orders</h2>
          <p>Details</p>
        </div>
        <div className=""></div>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default Dashboard;
