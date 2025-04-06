import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";

type OptionProps = {
    name: string;
    imagePath: string;
};

const Options = ({ optionType }: { optionType: string }) => {
    const [items, setItems] = useState([]);

    // optionType is either "scoops" or "toppings"
    useEffect(() => {
        axios
            .get(`http://localhost:3030/${optionType}`)
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [optionType]);

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
