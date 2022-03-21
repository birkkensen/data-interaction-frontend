import { getAllOrders } from "../../api";
import { useEffect, useState } from "react";
const Dashboard: React.FC = (): JSX.Element => {
  const [orders, setOrders] = useState();

  const token = localStorage.getItem("token");
  useEffect(() => {
    getAllOrders(token)
      .then((data) => setOrders(data.data))
      .catch((err) => console.log(err));
  }, [token]);

  return <div>fjhiudeopafhuiopa</div>;
};

export default Dashboard;
