import { useOrderDetails } from "@/contexts/OrderDetails";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ScoopOption = ({
    name,
    imagePath,
}: {
    name: string;
    imagePath: string;
}) => {
    const { updateItemCount } = useOrderDetails();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateItemCount(name, Number(event.target.value), "scoops");
    };

    return (
        <div>
            <img
                src={`http://localhost:3030/${imagePath}`}
                alt={`${name} scoop`}
            />
            <Label htmlFor={name.toLowerCase()}>{name}</Label>
            <Input
                id={name.toLowerCase()}
                name={name.toLowerCase()}
                type="number"
                placeholder="0"
                defaultValue={0}
                onChange={handleChange}
                role="spinbutton"
                aria-label={name}
            />
        </div>
    );
};

export default ScoopOption;
