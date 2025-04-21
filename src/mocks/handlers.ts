import { delay, http, HttpResponse } from "msw";

export const handlers = [
    // Intercept "GET https://example.com/user" requests...
    http.get("http://localhost:3030/scoops", () => {
        // ...and respond to them using this JSON response.
        return HttpResponse.json([
            { name: "Vanilla", imagePath: "/images/vanilla.png" },
            { name: "Chocolate", imagePath: "/images/chocolate.png" },
        ]);
    }),
    http.get("http://localhost:3030/toppings", () => {
        // ...and respond to them using this JSON response.
        return HttpResponse.json([
            { name: "Cherries", imagePath: "/images/cherries.png" },
            { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
            { name: "Hot Fudge", imagePath: "/images/hot-fudge.png" },
        ]);
    }),

    http.post("http://localhost:3030/order", async () => {
        // add a 100ms pause here to give the tests a chance to see the "loading" state
        await delay(400);
        return HttpResponse.json({ orderNumber: 123455676 }, { status: 201});
    }),
];
