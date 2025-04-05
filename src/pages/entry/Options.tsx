import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";

type ScoopOptionProps = {
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

    // TODO: replace `null` with ToppingOption when available
    const ItemComponent = optionType === "scoops" ? ScoopOption : null;

    const optionItems = items.map((item: ScoopOptionProps) => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
        />
    ));

    return <div>{optionItems}</div>;
};

export default Options;
