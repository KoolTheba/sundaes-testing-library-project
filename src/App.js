import React, { useState } from "react";
import { OrderDetailsProvider } from "./context/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { ORDER_PHASES } from "./constants/index";
import "./index.css";

function App() {
  const [orderPhase, setOrderPhase] = useState(ORDER_PHASES.IN_PROGRESS);
  return (
    <>
      <OrderDetailsProvider>
        <div className="main__wrapper">
          {orderPhase === ORDER_PHASES.IN_PROGRESS && (
            <OrderEntry setOrderPhase={setOrderPhase} />
          )}
          {orderPhase === ORDER_PHASES.IN_REVIEW && (
            <OrderSummary setOrderPhase={setOrderPhase} />
          )}
          {orderPhase === ORDER_PHASES.COMPLETE && (
            <OrderConfirmation setOrderPhase={setOrderPhase} />
          )}
        </div>
      </OrderDetailsProvider>
    </>
  );
}

export default App;
