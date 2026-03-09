import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../services/ordersService";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./Orders.css";

function OrderDetailPage() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const loadOrder = async () => {
    try {

      setLoading(true);

      const data = await getOrderById(id);

      setOrder(data);

    } catch (err) {

      setError("Order not found");

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadOrder();
  }, [id]);


  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={error} />;


  const statusClass = `status-${order.status.toLowerCase()}`;


  return (
    <div className="page-container">

      <h1 className="page-header">Order #{order.id}</h1>

      <div className="order-detail">

        <div className="order-detail-header">

          <span className={`order-status ${statusClass}`}>
            {order.status}
          </span>

          <p className="order-date">
            Placed on {order.createdAt}
          </p>

        </div>

        <h3>Items</h3>

        <div className="order-items">

          {order.items.map(item => (

            <div key={item.id} className="order-item">

              <span>{item.name}</span>

              <span>
                {item.quantity} x ${item.price}
              </span>

            </div>

          ))}

        </div>

        <div className="order-total">

          Total: ${order.total.toFixed(2)}

        </div>

        <button className="refresh-btn" onClick={loadOrder}>
          Refresh Status
        </button>

      </div>

    </div>
  );
}

export default OrderDetailPage;