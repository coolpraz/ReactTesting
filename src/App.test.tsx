import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import kebabCaseToTitleCase from "./helper";

test("button click flow", () => {
    render(<App />);

    // find an element with a role of button and text matching /midnight-blue/i
    const buttonElement = screen.getByRole("button", { name: /midnight-blue/i });

    // expect the class to be red
    expect(buttonElement).toHaveClass("medium-voilet-red");

    // click button
    fireEvent.click(buttonElement);

    // expect the class to be midnight-blue
    expect(buttonElement).toHaveClass("midnight-blue");

    // expect the button text to match /medium-voilet-red/i
    expect(buttonElement).toHaveTextContent(/medium-voilet-red/i);
});

test("checkbox flow", () => {
    render(<App />);

    // find elements
    const buttonElement = screen.getByRole("button", { name: /midnight-blue/i });
    const checkboxElement = screen.getByRole("checkbox", {
        name: /disable button/i,
    });

    // check initial conditions
    expect(buttonElement).toBeEnabled();
    expect(checkboxElement).not.toBeChecked();

    // click checkbox to disable button
    fireEvent.click(checkboxElement);
    expect(buttonElement).toBeDisabled();
    expect(checkboxElement).toBeChecked();
    expect(buttonElement).toHaveClass("gray");

    // click checkbox again to re-enable button
    fireEvent.click(checkboxElement);
    expect(buttonElement).toBeEnabled();
    expect(checkboxElement).not.toBeChecked();
    expect(buttonElement).toHaveClass("medium-voilet-red");
});

it("checkbox flow afer button click", () => {
    render(<App />);

    // find elements
    const buttonElement = screen.getByRole("button", { name: /midnight-blue/i });
    const checkboxElement = screen.getByRole("checkbox", {
        name: /disable button/i,
    });

    // click button to change to blue
    fireEvent.click(buttonElement);

    // click checkbox to disable button
    fireEvent.click(checkboxElement);
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass("gray");

    // click checkbox again to re-enable button
    fireEvent.click(checkboxElement);
    expect(buttonElement).toBeEnabled();
    expect(buttonElement).toHaveClass("midnight-blue");
})

describe("kebabCaseToTitleCase", () => {
    it("works for no hyphens", () => {
        expect(kebabCaseToTitleCase("red")).toBe("Red");
    });

    it("works for one hyphen", () => {
        expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
    });

    it("works for multiple hyphens", () => {
        expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
    });
});
