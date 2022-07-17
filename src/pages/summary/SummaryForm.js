import React from "react";

const SummaryForm = () => {
  const [tcChecked, setTcChecked] = React.useState(false);
  const [popoverDisplayed, setPopoverDisplayed] = React.useState(false);

  return (
    <div className="form__wrapper">
      <form>
        <input
          onChange={(e) => setTcChecked(e.target.checked)}
          type="checkbox"
          checked={tcChecked}
          aria-checked={tcChecked}
          id="terms-and-conditions-checkbox"
        />
        <label
          className="tyc__label"
          htmlFor="terms-and-conditions-checkbox"
          onMouseOver={() => setPopoverDisplayed(true)}
          onMouseOut={() => setPopoverDisplayed(false)}
        >
          I agree on terms and conditions
        </label>
        {popoverDisplayed && (
          <div className="tyc__popover">No icecream will be delivered</div>
        )}
        <button
          className="confirm__btn"
          type="submit"
          disabled={!tcChecked}
          onClick={() => console.log("I've been clicked!")}
          style={{
            backgroundColor: tcChecked ? "teal" : "grey",
          }}
        >
          Confirm your order
        </button>
      </form>
    </div>
  );
};

export default SummaryForm;
