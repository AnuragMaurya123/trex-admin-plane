import { Control, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form";
import { ProductFormValues } from "@/validationSchema/productSchema";

export default function CheckboxGroup({
  control,
  idx,
  option,
  items,
}: {
  control: Control<ProductFormValues>;
  idx: number;
  option: "sleeve" | "fit" | "waistRise";
  items: string[];
}) {
  return (
    <Controller
      control={control}
      name={`variants.${idx}.${option}` as const}
      render={({ field }) => (
        <div className="space-y-2">
          <FormLabel className="text-sm capitalize">{option} Options</FormLabel>
          <div className="flex flex-wrap gap-3 border p-3 rounded-md">
            {items.map((val) => {
              const valueArray = (field.value ?? []) as string[];

              return (
                <label
                  key={val}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Checkbox
                    checked={valueArray.includes(val)}
                    onCheckedChange={(checked:boolean) => {
                      if (checked) {
                        field.onChange([...valueArray, val]);
                      } else {
                        field.onChange(valueArray.filter((v) => v !== val));
                      }
                    }}
                  />
                  <span>{val}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    />
  );
}
