import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";
import Options from "../Options";

test("update scoop subtotal when scoops selection change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // starts out as $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  expect(vanillaInput).toBeInTheDocument();

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  expect(chocolateInput).toBeInTheDocument();

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings selection change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // default toppings subtotal
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // find and check a box, assert on updated subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherriesCheckbox).toBeInTheDocument();
  await user.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // tick another box, assert again on new subtotal
  const hotfudgeCheckbox = screen.getByRole("checkbox", {
    name: "Hot fudge",
  });
  expect(hotfudgeCheckbox).toBeInTheDocument();
  await user.click(hotfudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // tick one of the boxes off, assetrt again the subtotal
  await user.click(hotfudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("Grand total", () => {
  test("Grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotalHeader = screen.getByRole("heading", {
      name: /grand total/i,
    });
    expect(grandTotalHeader).toBeInTheDocument();
    expect(grandTotalHeader).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    expect(vanillaInput).toBeInTheDocument();

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotalHeader).toHaveTextContent("4.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    expect(cherriesCheckbox).toBeInTheDocument();
    await user.click(cherriesCheckbox);

    expect(grandTotalHeader).toHaveTextContent("5.50");
  });

  test("Grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotalHeader = screen.getByRole("heading", {
      name: /grand total/i,
    });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    expect(cherriesCheckbox).toBeInTheDocument();
    await user.click(cherriesCheckbox);

    expect(grandTotalHeader).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    expect(vanillaInput).toBeInTheDocument();

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotalHeader).toHaveTextContent("5.50");
  });

  test("Grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotalHeader = screen.getByRole("heading", {
      name: /grand total/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    expect(vanillaInput).toBeInTheDocument();

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    expect(cherriesCheckbox).toBeInTheDocument();
    await user.click(cherriesCheckbox);

    expect(grandTotalHeader).toHaveTextContent("3.50");

    await user.click(cherriesCheckbox);
    expect(grandTotalHeader).toHaveTextContent("2.00");
  });
});
