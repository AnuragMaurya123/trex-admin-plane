import { ProductFormValues } from "@/validationSchema/productSchema";
import Image from "next/image";
import { Control, Controller, Path } from "react-hook-form";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "../ui/input";

export function GalleryUpload({
  control,
  name,
}: {
  control: Control<ProductFormValues>;
  name: Path<ProductFormValues>;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const images: string[] = Array.isArray(field.value)
          ? field.value.filter((v): v is string => typeof v === "string")
          : [];

        return (
          <div className="space-y-2">

            <div className="flex flex-wrap gap-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative w-24 h-24 rounded-md border overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`Gallery ${i}`}
                    fill
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute top-1 right-1 bg-white/70 hover:bg-white"
                    onClick={() => {
                      const updated = [...images];
                      updated.splice(i, 1);
                      field.onChange(updated);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              ))}

              {images.length < 4 && (
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const url = URL.createObjectURL(file);
                    const updated = [...images, url];
                    field.onChange(updated.slice(0, 4));
                  }}
                  className="w-48"
                />
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
