import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";

test("Place order button is disabled when no scoops are selected", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);
  const user = userEvent.setup();

  const orderButton = screen.getByRole("button", { name: /place order/i });
  expect(orderButton).toBeDisabled();

  // add ice cream scoop ancd check button is enabled
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  expect(vanillaInput).toBeInTheDocument();
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(orderButton).toBeEnabled();

  // add ice cream scoop ancd check button is disabled
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");
  expect(orderButton).toBeDisabled();
});

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
