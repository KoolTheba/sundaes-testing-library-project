import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { server } from "../../../mocks/server";
import { rest } from "msw";

import OrderConfirmation from "../OrderConfirmation";

describe("Order confirmation", () => {
  test("renders correctly all elements with successful order process", async () => {
    render(<OrderConfirmation setOrderPhase={jest.fn()} />);

    const loadingElement = await screen.findByText(/loading/i);

    const thankYouHeading = await screen.findByRole("heading", {
      name: /thank you/i,
    });

    const newOrderButton = await screen.findByRole("button", {
      name: /create new order/i,
    });

    const orderNumberHeading = await screen.findByRole("heading", {
      name: /your order confirmation is 7984796200/i,
    });

    expect(loadingElement).not.toBeVisible();
    expect(thankYouHeading).toBeInTheDocument();
    expect(newOrderButton).toBeInTheDocument();
    expect(orderNumberHeading).toBeInTheDocument();
  });

  test("renders error message with an unsuccessful order process", async () => {
    server.resetHandlers(
      rest.post("http://localhost:3030/order", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderConfirmation setOrderPhase={jest.fn()} />);
    await waitFor(async () => {
      const errorHeading = await screen.findByRole("heading", {
        name: /an error has occured during the order process/i,
      });

      const backToOrderButton = await screen.findByRole("button", {
        name: /back to your order/i,
      });

      expect(errorHeading).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(backToOrderButton).toBeInTheDocument();
    });
  });
});
