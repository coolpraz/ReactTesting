import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import { render, screen } from "@/lib/testing-library-utils";
import OrderEntry from "@/pages/entry/OrderEntry";

test("handels error for scoops and toppings route", async () => {
    server.resetHandlers(
        http.get("http://localhost:3030/scoops", () => {
            return new HttpResponse(null, { status: 500 });
        }),

        http.get("http://localhost:3030/toppings", () => {
            return new HttpResponse(null, { status: 500 });
        })
    );

    render(<OrderEntry />);

    const alert = await screen.findAllByRole("alert");
    expect(alert).toHaveLength(2);
});
