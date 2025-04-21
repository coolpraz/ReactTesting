import { useOrderDetails } from "@/contexts/OrderDetails";
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
            <input
                id={name.toLowerCase()}
                name={name.toLowerCase()}
                type="number"
                placeholder="0"
                defaultValue={0}
                onChange={handleChange}
                role="spinbutton"
                aria-label={name}
                className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            />
        </div>
    );
};

export default ScoopOption;
