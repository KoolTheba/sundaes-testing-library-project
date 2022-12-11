// component
import Options from "./Options";

// utility
import { formatCurrency } from "../../utilities";

// custom hook
import { useOrderDetails } from "../../context/OrderDetails";

// constants
import { ORDER_PHASES } from "../../constants/index";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();
  const grandTotal = formatCurrency(totals.scoops + totals.toppings);
  return (
    <>
      <div>
        <Options optionType={"scoops"} />
        <Options optionType={"toppings"} />
      </div>
      <div className="grand_total_wrapper">
        <h2>
          Grand total:
          {grandTotal}
        </h2>
      </div>
      <button
        className="place-order__button"
        onClick={() => setOrderPhase(ORDER_PHASES.IN_REVIEW)}
      >
        Place order
      </button>
    </>
  );
}
