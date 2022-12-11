import { useState, useCallback } from "react";
import { useOrderDetails } from "../../context/OrderDetails";

export default function ToppingOption({ name, image }) {
  const { updateItemCount, optionCounts } = useOrderDetails();
  const [checkedBox, setCheckedBox] = useState(false);

  const toppingCheckedRef = useCallback(
    (node) => {
      if (node && optionCounts.toppings[node.id]) {
        setCheckedBox(true);
      }
    },
    [optionCounts.toppings]
  );

  const handleChange = (e) => {
    setCheckedBox(e.target.checked);
    updateItemCount(name, e.target.checked ? 1 : 0, "toppings");
  };

  return (
    <li key={name}>
      <h1>{name}</h1>
      <img src={`http://localhost:3030/${image}`} alt={`${name} topping`} />
      <div className="toppings-selection-wrapper">
        <label htmlFor={name}>
          <input
            id={name}
            type="checkbox"
            onChange={handleChange}
            checked={checkedBox}
            ref={toppingCheckedRef}
          />
          {name}
        </label>
      </div>
    </li>
  );
}
