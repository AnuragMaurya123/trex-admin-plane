import { type Control } from "react-hook-form";
import { ProductFormValues } from "@/validationSchema/productSchema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { FormField, FormItem, FormMessage } from "../ui/form";

type ThumbnailUploadProps = {
  control: Control<ProductFormValues>;
  name: `variants.${number}.thumbnail`; // ✅ Use template literal to allow indexed paths
};

export default function ThumbnailUpload({ control, name }: ThumbnailUploadProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const img = typeof field.value === "string" ? field.value : "";

        return (
          <FormItem className="space-y-2">
            {img ? (
              <div className="relative w-28 h-28 rounded-md border overflow-hidden">
                <Image
                  src={img}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute top-1 right-1 bg-white/70 hover:bg-white"
                  onClick={() => {
                    URL.revokeObjectURL(img);
                    field.onChange("");
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            ) : (
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  field.onChange(url);
                }}
                className="w-48"
              />
            )}

            <FormMessage className=" text-red-600"/>
          </FormItem>
        );
      }}
    />
  );
}
