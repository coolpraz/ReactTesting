import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "@/components/AlertBanner";
import { pricePerItem } from "@/constants";
import { OptionType, useOrderDetails } from "@/contexts/OrderDetails";
import { formatCurrency } from "@/lib/utils";

type OptionProps = {
    name: string;
    imagePath: string;
};

const Options = ({ optionType }: { optionType: OptionType }) => {
    const [items, setItems] = useState([]);
    const [error, seterror] = useState(false);
    const { totals } = useOrderDetails();

    // optionType is either "scoops" or "toppings"
    useEffect(() => {
        axios
            .get(`http://localhost:3030/${optionType}`)
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => seterror(true));
    }, [optionType]);

    if (error) {
        return <AlertBanner
            variant="destructive"
            title="Error"
            message="An unexpected error occurred. Please try again later."
        />
    }

    const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    const optionItems = items.map((item: OptionProps) => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
        />
    ));

    return (
        <>
            <h2>{title}</h2>
            <p>{formatCurrency(pricePerItem[optionType])} each</p>
            <p>{title} total: {formatCurrency(totals[optionType])}</p>
            <div>{optionItems}</div>
        </>
    );
};

export default Options;
