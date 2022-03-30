import { getAllOrders } from "../api";
import { useEffect, useState } from "react";
import { Orders } from "../interfaces";
import { v4 as uuidv4 } from "uuid";
import { updateOrder } from "../api";
const Dashboard: React.FC = (): JSX.Element => {
  const [orders, setOrders] = useState<Orders[]>();
  const [status, setStatus] = useState<number>(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllOrders(token)
      .then((data) => {
        setOrders(data.data);
      })
      .catch((err) => console.log(err));
  }, [token, status]);

  console.log(orders);
  return orders ? (
    <section className="h-screen">
      <section className="mx-4 mt-32">
        <table className="w-full rounded bg-slate-300 table-fixed">
          <thead>
            <tr className=" w-full">
              <th className="p-2">Order</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">CartId</th>
              <th className="p-2">Do stuff</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders.map((order, i) => {
              return (
                <tr key={uuidv4()}>
                  <td className="p-2">{order.formData.transactionId}</td>
                  <td className="p-2">{new Date().toISOString().split("T")[0]}</td>
                  <td className="p-2">{order.formData.orderStatus}</td>
                  <td className="p-2">{order.cart.cartItems[i]._id}</td>
                  <td>
                    {" "}
                    <button
                      onClick={() => {
                        updateOrder(orders[0]._id)
                          .then((res) => setStatus(res))
                          .catch((err) => console.log(err));
                      }}
                      className="bg-purple-400 text-white rounded p-2 hover:bg-purple-500"
                    >
                      Ship this thang {status}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </section>
  ) : (
    <div>Loading</div>
  );
};

export default Dashboard;
