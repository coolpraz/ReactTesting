import { render, screen } from "@/lib/testing-library-utils";
import Options from "@/pages/entry/Options";
import OrderEntry from "@/pages/entry/OrderEntry";
import userEvent from "@testing-library/user-event";

test("update scoop subtotal when scoop change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />);

    // make sure total starts out at $0.00
    const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
    expect(scoopSubtotal).toHaveTextContent("0.00");

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(scoopSubtotal).toHaveTextContent("2.00");

    // update chocolate scoops to 2 and check the subtotal
    const chocolateInput = await screen.findByRole("spinbutton", {
        name: "Chocolate",
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings" />);

    // make sure total starts out at $0.00
    const toppingsSubtotal = screen.getByText("Toppings total: $", {
        exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent("0.00");

    // update cherries to 1 and check the subtotal
    const cherriesCheckbox = await screen.findByRole("checkbox", {
        name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent("1.50");

    // update hot fudge to 1 and check the subtotal
    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
        name: "Hot Fudge",
    });
    await user.click(hotFudgeCheckbox);
    expect(toppingsSubtotal).toHaveTextContent("3.00");

    // uncheck cherries and check the subtotal
    await user.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent("1.50");
})

describe("grand total", () => {
    test("grand total starts at $0.00", () => {
        // Test that the grand total starts out at $0.00
        render(<OrderEntry />);
        const grandTotal = screen.getByRole("heading", {
            name: /Grand total: \$/i,
        });
        expect(grandTotal).toHaveTextContent("0.00");
    });

    test("grand total updates properly if scoop is added first", async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);

        const grandTotal = screen.getByRole("heading", {
            name: /Grand total: \$/i,
        });

        // update vanilla scoops to 2 and check the grand total
        const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });

        await user.clear(vanillaInput);
        await user.type(vanillaInput, "2");
        expect(grandTotal).toHaveTextContent("4.00");

        // add cherries and check the grand total
        const cherriesCheckbox = await screen.findByRole("checkbox", {
            name: "Cherries",
        });
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent("5.50");
    });

    test("grand total updates properly if topping is added first", async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);
        const grandTotal = screen.getByRole("heading", {
            name: /Grand total: \$/i,
        });

        // add cherries and check the grand total
        const cherriesCheckbox = await screen.findByRole("checkbox", {
            name: "Cherries",
        });
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent("1.50");

        // update vanilla scoops to 2 and check the grand total
        const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "2");
        expect(grandTotal).toHaveTextContent("5.50");
    });

    test("grand total updates properly if item is removed", async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);

        const grandTotal = screen.getByRole("heading", {
            name: /Grand total: \$/i,
        });

        // add cherries
        const cherriesCheckbox = await screen.findByRole("checkbox", {
            name: "Cherries",
        });
        await user.click(cherriesCheckbox);
        // grand total $1.50

        // update vanilla scoops to 2; grand total should be $5.50
        const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "2");

        // remove 1 scoop of vanilla and check the grand total
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "1");

        // check the grand total
        expect(grandTotal).toHaveTextContent("3.50");

        // remove cherries and check the grand total
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent("2.00");
    });
});
