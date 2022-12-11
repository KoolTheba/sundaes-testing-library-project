import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("Order phases for happy path", async () => {
  render(<App />);
  const user = userEvent.setup();
  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  expect(vanillaInput).toBeInTheDocument();
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  expect(chocolateInput).toBeInTheDocument();
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherriesCheckbox).toBeInTheDocument();
  await user.click(cherriesCheckbox);

  // find and click order button
  const orderButton = screen.getByRole("button", { name: /place order/i });
  expect(orderButton).toBeInTheDocument();
  await user.click(orderButton);

  // check summary information based on order
  const summaryHeading = await screen.findByRole("heading", {
    name: /order summary/i,
  });

  const scoopsSummaryHeading = await screen.findByRole("heading", {
    name: /scoops/i,
  });

  const toppingsSummaryHeading = await screen.findByRole("heading", {
    name: /toppings/i,
  });
  expect(summaryHeading).toBeInTheDocument();
  expect(scoopsSummaryHeading).toBeInTheDocument();
  expect(scoopsSummaryHeading).toHaveTextContent("6.00");
  expect(toppingsSummaryHeading).toBeInTheDocument();
  expect(toppingsSummaryHeading).toHaveTextContent("1.50");

  // option items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = await screen.findByRole("checkbox", {
    name: /agree on terms and conditions/i,
  });

  expect(tcCheckbox).toBeInTheDocument();
  await user.click(tcCheckbox);
  expect(tcCheckbox).toBeChecked();

  // confirm order number on confirmation page
  const confirmButton = await screen.findByRole("button", {
    name: /confirm your order/i,
  });
  expect(confirmButton).toBeInTheDocument();
  await user.click(confirmButton);

  // order confirmation page
  const loadingElement = screen.getByText(/loading/i);
  expect(loadingElement).toBeVisible();

  const thankYouHeading = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  const orderNumber = await screen.findByText(/your order confirmation is/i);

  expect(thankYouHeading).toBeInTheDocument();
  expect(loadingElement).not.toBeVisible();
  expect(orderNumber).toBeInTheDocument();

  // click 'new order' button on order confirmation page
  const newOrderButton = await screen.findByRole("button", {
    name: /create new order/i,
  });
  expect(newOrderButton).toBeInTheDocument();
  await user.click(newOrderButton);

  // check that coops and toppings subtotals have been reset
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  const grandTotalHeader = screen.getByRole("heading", {
    name: /grand total/i,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  expect(toppingsSubtotal).toHaveTextContent("0.00");
  expect(grandTotalHeader).toHaveTextContent("0.00");

  // happening after test is over
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});

test("Toppings header is not on the page if no toppings were ordered", async () => {
  render(<App />);
  const user = userEvent.setup();
  // add ice cream scoops and NO toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  expect(vanillaInput).toBeInTheDocument();
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  expect(chocolateInput).toBeInTheDocument();
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const orderButton = screen.getByRole("button", { name: /place order/i });
  await user.click(orderButton);

  // check summary information based on order
  const scoopsSummaryHeading = await screen.findByRole("heading", {
    name: /scoops/i,
  });
  expect(scoopsSummaryHeading).toBeInTheDocument();
  expect(scoopsSummaryHeading).toHaveTextContent("6.00");
  expect(
    screen.queryByRole("heading", {
      name: /toppings/i,
    })
  ).not.toBeInTheDocument();
});

test("Toppings header is not on the page if toppings were ordered and then removed", async () => {
  render(<App />);
  const user = userEvent.setup();
  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  expect(vanillaInput).toBeInTheDocument();
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();

  const orderButton = screen.getByRole("button", { name: /place order/i });
  await user.click(orderButton);

  // check summary information based on order
  const scoopsSummaryHeading = await screen.findByRole("heading", {
    name: /scoops/i,
  });
  const toppingsSummaryHeading = await screen.findByRole("heading", {
    name: /toppings/i,
  });

  expect(scoopsSummaryHeading).toHaveTextContent("2.00");
  expect(toppingsSummaryHeading).toHaveTextContent("1.50");

  // back to order and unselect toppings
  const backToOrderButton = await screen.findByRole("button", {
    name: /back to your order/i,
  });
  expect(backToOrderButton).toBeVisible();
  await user.click(backToOrderButton);

  expect(
    await screen.findByRole("checkbox", {
      name: "Cherries",
    })
  ).toBeInTheDocument();
  await user.click(
    await screen.findByRole("checkbox", {
      name: "Cherries",
    })
  );
  expect(screen.getByRole("checkbox", { name: "Cherries" })).not.toBeChecked();

  // click place order button and check the correct headings on the summary page
  await user.click(screen.getByRole("button", { name: /place order/i }));
  expect(
    await screen.findByRole("heading", {
      name: /scoops/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", {
      name: /toppings/i,
    })
  ).not.toBeInTheDocument();
});
