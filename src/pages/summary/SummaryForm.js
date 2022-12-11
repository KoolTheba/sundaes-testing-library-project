import React from "react";

// constants
import { ORDER_PHASES } from "../../constants/index";

const SummaryForm = ({ setOrderPhase }) => {
  const [tcChecked, setTcChecked] = React.useState(false);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setOrderPhase(ORDER_PHASES.COMPLETE);
  };

  return (
    <>
      <div className="form__wrapper">
        <form>
          <input
            onChange={(e) => setTcChecked(e.target.checked)}
            type="checkbox"
            checked={tcChecked}
            aria-checked={tcChecked}
            id="terms-and-conditions-checkbox"
          />
          <label className="tyc__label" htmlFor="terms-and-conditions-checkbox">
            I agree on terms and conditions
          </label>
          <button
            className="confirm__btn"
            type="submit"
            disabled={!tcChecked}
            onClick={handleSubmit}
            style={{
              backgroundColor: tcChecked ? "teal" : "grey",
            }}
          >
            Confirm your order
          </button>
        </form>
      </div>
      <div>
        <button onClick={() => setOrderPhase(ORDER_PHASES.IN_PROGRESS)}>
          Back to your order
        </button>
      </div>
    </>
  );
};

export default SummaryForm;
