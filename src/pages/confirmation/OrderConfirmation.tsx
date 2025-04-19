import { OrderPhase } from "@/App";
import { useOrderDetails } from "@/contexts/OrderDetails";
import axios from "axios";
import { useEffect, useState } from "react";

interface OrderConfirmationProps {
    setOrderPhase: (phase: OrderPhase) => void;
}

const OrderConfirmation = ({ setOrderPhase }: OrderConfirmationProps) => {
    const { resetOrder } = useOrderDetails();
    const [orderNumber, setOrderNumber] = useState<string | null>(null);

    useEffect(() => {
        axios
            .post(`http://localhost:3030/order`)
            .then((response) => {
                setOrderNumber(response.data.orderNumber);
            })
            .catch((error) => {
                // TODO: handle error
            });
    }, []);

    function handleClick() {
        resetOrder();
        setOrderPhase("inProgress");
    }

    if (orderNumber) {
        return (
            <div>
                <h2>Thank you!</h2>
                <p>Your order number is {orderNumber}</p>
                <p>as per our terms and conditions, nothing will happen now</p>
                <button onClick={handleClick}>Create new order</button>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Loading...</h2>
                <p>Please wait while we process your order.</p>
            </div>
        );
    }
};

export default OrderConfirmation;
