import { render, screen, waitFor } from "@testing-library/react";
import SummaryForm from "../summary/SummaryForm";
import userEvent from "@testing-library/user-event";

test("initial conditions", () => {
  render(<SummaryForm />);
  const confirmButton = screen.getByRole("button", {
    name: "Confirm your order",
  });

  // checkbox starts unchecked
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  // button starts out enabled
  expect(confirmButton).toBeDisabled();
});

test("button should be enabled if checkbox is checked and disabled on second click", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", {
    name: "Confirm your order",
  });

  expect(checkbox).not.toBeChecked();
  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  expect(checkbox).toBeChecked();
  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test.skip("popover responds to label hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(/no icecream will be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const tycLabelElement = screen.getByLabelText(
    /I agree on terms and conditions/i
  );
  await user.hover(tycLabelElement);
  const popover = screen.getByText(/no icecream will be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(tycLabelElement);
  const visiblePopover = screen.queryByText(/no icecream will be delivered/i);
  expect(visiblePopover).not.toBeInTheDocument();
});
