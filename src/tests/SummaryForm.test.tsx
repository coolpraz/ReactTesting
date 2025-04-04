import { render, screen } from "@testing-library/react";
import SummaryForm from "../pages/SummaryForm";
import userEvent from "@testing-library/user-event";

test("Initial conditions", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole('button', { name: /confirm order/i });
    expect(confirmButton).toBeDisabled();
});

test("Checkbox disables button on first click and enables on second click", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const confirmButton = screen.getByRole('button', { name: /confirm order/i });

    // Click checkbox
    await user.click(checkbox);
    expect(confirmButton).toBeEnabled();

    // Click checkbox again
    await user.click(checkbox);
    expect(confirmButton).toBeDisabled();
})

test("popover responds to hover", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    // Popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears on mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeVisible();

    // popover disappears on mouseout of checkbox label
    await user.unhover(termsAndConditions);
    expect(popover).not.toBeVisible();
})
