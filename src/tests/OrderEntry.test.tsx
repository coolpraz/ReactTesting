import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import { render, screen } from "@/lib/testing-library-utils";
import OrderEntry from "@/pages/entry/OrderEntry";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

test("handels error for scoops and toppings route", async () => {
    server.resetHandlers(
        http.get("http://localhost:3030/scoops", () => {
            return new HttpResponse(null, { status: 500 });
        }),

        http.get("http://localhost:3030/toppings", () => {
            return new HttpResponse(null, { status: 500 });
        })
    );

    render(<OrderEntry setOrderPhase={vi.fn()} />);

    const alert = await screen.findAllByRole("alert");
    expect(alert).toHaveLength(2);
});

test("disable order button if there are no scoops ordered", async () => {
    const user = userEvent.setup();

    render(<OrderEntry setOrderPhase={vi.fn()} />);

    // order button should be disabled at first, even before options load
    const orderButton = screen.getByRole("button", { name: /order sundae/i });
    expect(orderButton).toBeDisabled();

    // expect button to be enabled after scoops are added
    const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(orderButton).toBeEnabled();

    // expect button to be disabled again after removing all scoops
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "0");
    expect(orderButton).toBeDisabled();
});
