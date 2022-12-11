import { useCallback, useState } from "react";
import { useOrderDetails } from "../../context/OrderDetails";

export default function ScoopOptions({ name, image }) {
  const { updateItemCount, optionCounts } = useOrderDetails();
  const [amount, setAmount] = useState(0);

  const scoopsAmountRef = useCallback(
    (node) => {
      if (node && optionCounts.scoops[node.id]) {
        setAmount(optionCounts.scoops[node.id]);
      }
    },
    [optionCounts.scoops]
  );

  const handleChange = (e) => {
    setAmount(e.target.value);
    updateItemCount(name, Number(e.target.value), "scoops");
  };

  return (
    <li key={name}>
      <h1>{name}</h1>
      <img src={`http://localhost:3030/${image}`} alt={`${name} scoop`} />
      <form className="scoops-form">
        <label htmlFor={name}>{name}</label>
        <input
          className="scoops-input"
          id={name}
          type="number"
          value={amount}
          min={0}
          max={100}
          onChange={handleChange}
          ref={scoopsAmountRef}
        />
      </form>
    </li>
  );
}
