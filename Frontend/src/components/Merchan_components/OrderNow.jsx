import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { api } from '../../utils/UserControl';

const OrderNow = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulating fetching data from the server
    const fetchData = async () => {
      try {
        const response = await api.get("order/queqe");
        const data = await response.data;
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, []);

  const changeOrderStatus = (orderId) => {
    // TODO: Implement logic to change the order status
    console.log(`Change status of order ${orderId}`);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Status</th>
          <th>Items</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.status}</td>
            <td>
              {order.OrderItems.map((item) => (
                <div key={item.id}>
                  Menu ID: {item.menu_id}, Quantity: {item.quantity}
                </div>
              ))}
            </td>
            <td>{new Date(order.date).toLocaleString()}</td>
            <td>
              <Button onClick={() => changeOrderStatus(order.id)}>
                Change Status
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderNow;
