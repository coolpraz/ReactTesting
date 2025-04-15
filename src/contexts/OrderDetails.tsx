import { pricePerItem } from "@/constants";
import { createContext, useContext, useState } from "react";

export type OptionType = "scoops" | "toppings";
type OptionCounts = {
    scoops: Record<string, number>;
    toppings: Record<string, number>;
};

type OrderDetailsContextValue = {
    optionCounts: OptionCounts;
    totals: Record<OptionType, number>;
    updateItemCount: (
        itemName: string,
        newItemCount: number,
        optionType: OptionType
    ) => void;
    resetOrder: () => void;
};

const OrderDetails = createContext<OrderDetailsContextValue | null>(null);

export const useOrderDetails = () => {
    const contextValue = useContext(OrderDetails);

    if (!contextValue) {
        throw new Error(
            "useOrderDetails must be called from within an OrderDetailsProvider"
        );
    }

    return contextValue;
};

export const OrderDetailsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [optionCounts, setOptionCounts] = useState<OptionCounts>({
        scoops: {}, // example: { Chocolate: 2, Vanilla: 1 }
        toppings: {}, // example: { "Gummi Bears": 1 }
    });

    function updateItemCount(
        itemName: string,
        newItemCount: number,
        optionType: OptionType
    ) {
        setOptionCounts((prevCounts) => ({
            ...prevCounts,
            [optionType]: {
                ...prevCounts[optionType],
                [itemName]: newItemCount,
            },
        }));
    }

    function resetOrder() {
        setOptionCounts({
            scoops: {},
            toppings: {},
        });
    }

    // utility function to derive totals from optionCounts state value
    function calculateTotal(optionType: OptionType) {
        // get an array of counts for the option type (for example, [1, 2])
        const countsArray = Object.values(optionCounts[optionType]);

        // total the values in the array of counts for the number of items
        const totalCount = countsArray.reduce((total, value) => total + value, 0);

        // multiply the total number of items by the price for this item type
        return totalCount * pricePerItem[optionType];
    }

    const totals = {
        scoops: calculateTotal("scoops"),
        toppings: calculateTotal("toppings"),
    }

    const value = { optionCounts, totals, updateItemCount, resetOrder };

    return (
        <OrderDetails.Provider value={value}>{children}</OrderDetails.Provider>
    );
};
