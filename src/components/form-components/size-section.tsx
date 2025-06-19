import { SizeSectionProps } from "@/lib/types/reactComponentsProps"
import { FormLabel } from "../ui/form"
import { SIZES } from "@/lib/types/productType"
import FormInput from "./form-input"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SizeSection({
  idx,
  sizeFields,
  appendSize,
  removeSize,
  control,
}: SizeSectionProps) {
  return (
    <div className="space-y-4">
      <FormLabel className="font-medium text-base">Sizes / Pricing / Stock</FormLabel>

      {/* Size toggle checkboxes */}
      <div className="flex flex-wrap gap-2">
        {SIZES.map((sz) => {
          const isActive = sizeFields.find((r) => r.size === sz)
          return (
            <button
              type="button"
              key={sz}
              onClick={() => {
                const idxRow = sizeFields.findIndex((r) => r.size === sz)
                if (idxRow === -1) {
                  appendSize({ size: sz, marketPrice: 0, sellingPrice: 0, stock: 0 })
                } else {
                  removeSize(idxRow)
                }
              }}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium border transition-all",
                isActive
                  ? "bg-primary text-purple-600 border-primary shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {sz}
            </button>
          )
        })}
      </div>

      {/* Active size rows */}
      <div className="space-y-3">
        {sizeFields.map((row, rIdx) => (
          <div
            key={row.id}
            className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end bg-muted/30 border rounded-lg p-3"
          >
            <div>
              <span className="text-sm font-medium">{row.size}</span>
            </div>
            <FormInput
              control={control}
              name={`variants.${idx}.sizes.${rIdx}.marketPrice`}
              type="number"
              label="Market ₹"
            />
            <FormInput
              control={control}
              name={`variants.${idx}.sizes.${rIdx}.sellingPrice`}
              type="number"
              label="Selling ₹"
            />
            <FormInput
              control={control}
              name={`variants.${idx}.sizes.${rIdx}.stock`}
              type="number"
              label="Stock"
            />
            <div className="flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => removeSize(rIdx)}>
                <X className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
