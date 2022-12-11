import React, { useEffect, useState } from "react";
import axios from "axios";

import { ORDER_PHASES } from "../../constants/index";
import { useOrderDetails } from "../../context/OrderDetails";

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderError, setOrderError] = useState(null);
  const { resetOrder } = useOrderDetails();

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((error) => setOrderError(error.message));
  }, []);

  if (!orderNumber && !orderError) {
    return <p>Loading....</p>;
  }

  if (orderError) {
    return (
      <>
        <h3>An error has occured during the order process.</h3>
        <button onClick={() => setOrderPhase(ORDER_PHASES.IN_PROGRESS)}>
          Back to your order
        </button>
      </>
    );
  }

  const handleCreateNewOrder = () => {
    resetOrder();
    setOrderPhase(ORDER_PHASES.IN_PROGRESS);
  };

  return (
    <>
      <h1>Thank you!</h1>
      <h2>Your order confirmation is {orderNumber}</h2>
      <button onClick={handleCreateNewOrder}>Create new order</button>
    </>
  );
}
