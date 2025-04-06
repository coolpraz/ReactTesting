import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { VariantProps } from "class-variance-authority";
import { AlertCircle } from "lucide-react";

const AlertBanner = ({
    variant = "destructive",
    title = "Error",
    message,
}: {
    variant: VariantProps<typeof Alert>["variant"];
    title: string;
    message: string;
}) => {
    const alertMessage =
        message || "An unexpected error occurred. Please try again later.";

    return (
        <Alert variant={variant}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
    );
};

export default AlertBanner;
