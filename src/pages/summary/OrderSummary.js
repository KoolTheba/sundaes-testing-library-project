import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency, removeZeroElementsFromObject } from "../../utilities";

const OrderSummary = ({ setOrderPhase }) => {
  const { totals, optionCounts } = useOrderDetails();

  const cleanedScoopsObject = removeZeroElementsFromObject(optionCounts.scoops);
  const scoopList = Object.entries(cleanedScoopsObject).map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const cleanedToppingsObject = removeZeroElementsFromObject(
    optionCounts.toppings
  );
  const toppingList = Object.keys(cleanedToppingsObject).map((key) => (
    <li key={key}>{key}</li>
  ));

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingList.length > 0 && (
        <>
          <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
          <ul>{toppingList}</ul>
        </>
      )}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
