import { useOrderDetails } from "../../context/OrderDetails";

export default function ToppingOption({ name, image }) {
  const { updateItemCount } = useOrderDetails();

  const handleChange = (e) =>
    updateItemCount(name, e.target.checked ? 1 : 0, "toppings");

  return (
    <li key={name}>
      <h1>{name}</h1>
      <img src={`http://localhost:3030/${image}`} alt={`${name} topping`} />
      <div className="toppings-selection-wrapper">
        <label htmlFor={name}>
          <input id={name} type="checkbox" onChange={handleChange} />
          {name}
        </label>
      </div>
    </li>
  );
}
