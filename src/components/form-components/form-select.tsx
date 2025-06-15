import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: string[];
  externalClassName?:string;
}

const FormSelect = <T extends FieldValues>({
  name,
  label,
  options,
  control,
  externalClassName
}: FormSelectProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="w-full">
        <FormLabel className={externalClassName}>{label}</FormLabel>
        <Select onValueChange={field.onChange} value={field.value ?? undefined}>
          <FormControl>
            <SelectTrigger className={`w-full ${externalClassName ?? ""}`}>
              <SelectValue placeholder={`Select ${label}`}  />
            </SelectTrigger>
          </FormControl>
          <SelectContent className={`${externalClassName} w-full`} >
            {options.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage className="text-red-700"/>
      </FormItem>
    )}
  />
);

export default FormSelect;
