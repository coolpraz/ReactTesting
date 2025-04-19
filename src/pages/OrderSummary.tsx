import { useOrderDetails } from "@/contexts/OrderDetails";
import { formatCurrency } from "@/lib/utils";
import SummaryForm from "./SummaryForm";
import { OrderPhase } from "@/App";

interface OrderSummaryProps {
    setOrderPhase: (phase: OrderPhase) => void;
}

const OrderSummary = ({ setOrderPhase }: OrderSummaryProps) => {
    const { totals, optionCounts } = useOrderDetails();

    const scoopArray = Object.entries(optionCounts.scoops);
    const scoopList = scoopArray.map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));

    // only display toppings if the toppings total is non-zero
    const hasToppings = totals.toppings > 0;
    let toppingsDisplay = null;

    if (hasToppings) {
        const toppingsArray = Object.keys(optionCounts.toppings);
        const toppingsList = toppingsArray.map((key) => <li key={key}>{key}</li>);
        toppingsDisplay = (
            <>
                <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
                <ul>{toppingsList}</ul>
            </>
        );
    }

    return (
        <div>
            <h1>Order Summary</h1>
            <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
            <ul>{scoopList}</ul>
            {toppingsDisplay}
            <SummaryForm setOrderPhase={setOrderPhase} />
        </div>
    );
};

export default OrderSummary;
