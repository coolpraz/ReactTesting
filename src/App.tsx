import { useState } from "react";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

export type OrderPhase = "inProgress" | "review" | "completed"; // Add all possible phases here

function App() {
    // orderPhase needs to be 'inProgress', 'review' or 'completed'
    const [orderPhase, setOrderPhase] = useState<OrderPhase>("inProgress");

    let Component = OrderEntry; // default to order page
    switch (orderPhase) {
        case "inProgress":
            Component = OrderEntry;
            break;
        case "review":
            Component = OrderSummary;
            break;
        case "completed":
            Component = OrderConfirmation;
            break;
        default:
    }

    return (
        <OrderDetailsProvider>
            {<Component setOrderPhase={setOrderPhase} />}
        </OrderDetailsProvider>
    );
}

export default App;
