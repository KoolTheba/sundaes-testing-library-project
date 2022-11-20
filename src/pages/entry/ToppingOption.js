import { useOrderDetails } from "../../context/OrderDetails";

export default function ToppingOption({ name, image }) {
  const { updateItemCount } = useOrderDetails();

  const handleChange = (e) =>
    updateItemCount(name, Number(e.target.value), "scoops");

  return (
    <li key={name}>
      <h1>{name}</h1>
      <img src={`http://localhost:3030/${image}`} alt={`${name} topping`} />
      <form>
        <label htmlFor={name}>{name}</label>
        <input
          id={name}
          type="number"
          defaultValue={0}
          onChange={handleChange}
        />
      </form>
    </li>
  );
}
