const ToppingOption = ({
    name,
    imagePath,
}: {
    name: string;
    imagePath: string;
}) => {
    return (
        <div>
            <img
                src={`http://localhost:3030/${imagePath}`}
                alt={`${name} topping`}
            />
        </div>
    );
};

export default ToppingOption
