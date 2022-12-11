import { render, screen } from "@testing-library/react";
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
