import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "@/components/AlertBanner";

type OptionProps = {
    name: string;
    imagePath: string;
};

const Options = ({ optionType }: { optionType: string }) => {
    const [items, setItems] = useState([]);
    const [error, seterror] = useState(false);

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

    const optionItems = items.map((item: OptionProps) => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
        />
    ));

    return <div>{optionItems}</div>;
};

export default Options;
