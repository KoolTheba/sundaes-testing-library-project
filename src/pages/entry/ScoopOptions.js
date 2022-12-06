import { useOrderDetails } from "../../context/OrderDetails";

export default function ScoopOptions({ name, image }) {
  const { updateItemCount } = useOrderDetails();

  const handleChange = (e) =>
    updateItemCount(name, Number(e.target.value), "scoops");

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
          defaultValue={0}
          min={0}
          max={100}
          onChange={handleChange}
        />
      </form>
    </li>
  );
}
