export default function ScoopOptions({ name, image }) {
  return (
    <li key={name}>
      <h1>{name}</h1>
      <img src={`http://localhost:3030/${image}`} alt={`${name} scoop`} />
    </li>
  );
}
