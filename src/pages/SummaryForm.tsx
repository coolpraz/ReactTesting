"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const FormSchema = z.object({
    terms: z.boolean().default(false).optional(),
});

const SummaryForm = () => {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            terms: false,
        },
    });

    const termsAccepted = form.watch("terms");

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values:", {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    I agree to{" "}
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <span
                                                style={{ color: "blue" }}
                                                onMouseEnter={() =>
                                                    setOpen(true)
                                                }
                                                onMouseLeave={() =>
                                                    setOpen(false)
                                                }
                                            >
                                                {" "}
                                                Terms and Conditions
                                            </span>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            No ice cream will actually be
                                            delivered
                                        </PopoverContent>
                                    </Popover>
                                </FormLabel>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={!termsAccepted}>
                    Confirm Order
                </Button>
            </form>
        </Form>
    );
};

export default SummaryForm;
