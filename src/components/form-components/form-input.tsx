import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface FormInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeHolder: string;
    type?: string;
    className?: string;
}

export default function FormInput<T extends FieldValues>({
    control,
    name,
    label,
    placeHolder,
    className = "",
    type = "text"
}: FormInputProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={className}>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeHolder} type={type} autoComplete="off" {...field} className={`${className} h-11 focus-visible:ring-purple-500`} />
                    </FormControl>
                    <FormMessage className="text-red-600"/>
                </FormItem>
            )}
        />
    );
}
