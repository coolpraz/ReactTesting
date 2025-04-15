import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useOrderDetails } from "@/contexts/OrderDetails";

const ToppingOption = ({
    name,
    imagePath,
}: {
    name: string;
    imagePath: string;
}) => {
    const { updateItemCount } = useOrderDetails();
    const handleChange = (checked: boolean) => {
        updateItemCount(name, checked ? 1 : 0, "toppings");
    };

    return (
        <div>
            <img
                src={`http://localhost:3030/${imagePath}`}
                alt={`${name} topping`}
            />
            <Checkbox
                id={`${name.toLowerCase()}-topping-checkbox`}
                onCheckedChange={handleChange}
            />
            <Label htmlFor={`${name.toLowerCase()}-topping-checkbox`}>{name}</Label>
        </div>
    );
};

export default ToppingOption;
