import { Button } from "@/components/ui/button";
import Options from "./Options";
import { useOrderDetails } from "@/contexts/OrderDetails";
import { formatCurrency } from "@/lib/utils";
import { OrderPhase } from "@/App";

interface OrderEntryProps {
    setOrderPhase: (phase: OrderPhase) => void;
}

const OrderEntry = ({ setOrderPhase }: OrderEntryProps) => {
    const { totals } = useOrderDetails();

    return (
        <div>
            <h1>Design Your Sundae!</h1>
            <Options optionType="scoops" />
            <Options optionType="toppings" />
            <h2>
                Grand total: {formatCurrency(totals.scoops + totals.toppings)}
            </h2>
            <Button onClick={() => setOrderPhase("review")}>
                Order Sundae!
            </Button>
        </div>
    );
};

export default OrderEntry;
