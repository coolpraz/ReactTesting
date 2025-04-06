import Options from "@/pages/entry/Options";
import { render, screen } from "@testing-library/react";

test("displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);
    // find images
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const alttext = scoopImages.map((el) => (el as HTMLImageElement).alt);
    expect(alttext).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from server", async () => {
    render(<Options optionType="toppings" />);

    // find images
    const toppingImages = await screen.findAllByRole("img", {
        name: /topping$/i,
    });
    expect(toppingImages).toHaveLength(3);

    // confirm alt text of images
    const alttext = toppingImages.map((el) => (el as HTMLImageElement).alt);
    expect(alttext).toEqual([
        "Cherries topping",
        "M&Ms topping",
        "Hot Fudge topping",
    ]);
});
