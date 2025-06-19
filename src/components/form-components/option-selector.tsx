import { ProductFormValues } from "@/validationSchema/productSchema";
import { Control, Controller } from "react-hook-form";
import { FormLabel } from "../ui/form";
import { X } from "lucide-react";
import { Button } from "../ui/button";

export default function OptionSelector({
  control,
  idx,
  value,
  toggle,
}: {
  control: Control<ProductFormValues>;
  idx: number;
  value: ("sleeve" | "fit" | "waistRise")[] | undefined;
  toggle: (o: "sleeve" | "fit" | "waistRise") => void;
}) {
  return (
    <Controller
      control={control}
      name={`variants.${idx}.selectedOptionTypes`}
      render={() => (
        <div className="space-y-3">
          <div>
            <FormLabel className="mb-2 block">Add Options</FormLabel>
            <select
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
              onChange={(e) => {
                const opt = e.target.value as "sleeve" | "fit" | "waistRise";
                if (opt) toggle(opt);
                e.target.value = "";
              }}
            >
              <option value="">{value ? "Add another…" : "Select option…"}</option>
              {!value?.includes("sleeve") && <option value="sleeve">Sleeve Length</option>}
              {!value?.includes("fit") && <option value="fit">Fit Type</option>}
              {!value?.includes("waistRise") && <option value="waistRise">Waist Rise</option>}
            </select>
          </div>

          {/* Selected options with delete buttons */}
          {value && value.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {value.map((opt) => (
                <span
                  key={opt}
                  className="inline-flex items-center bg-muted px-3 py-1 text-sm rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                >
                  {optionLabel(opt)}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => toggle(opt)}
                    className="ml-1 h-5 w-5"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );
}

function optionLabel(opt: "sleeve" | "fit" | "waistRise") {
  switch (opt) {
    case "sleeve":
      return "Sleeve";
    case "fit":
      return "Fit";
    case "waistRise":
      return "Waist Rise";
  }
}
