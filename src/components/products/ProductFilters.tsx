"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

// ── Price ranges ──────────────────────────────────────────
export const priceRanges = [
  { label: "Under ৳100", min: 0, max: 100 },
  { label: "৳100 – ৳300", min: 100, max: 300 },
  { label: "৳300 – ৳500", min: 300, max: 500 },
  { label: "Over ৳500", min: 500, max: Infinity },
] as const

export type PriceRange = (typeof priceRanges)[number]

// ── Rating options ────────────────────────────────────────
export const ratingOptions = [4, 3, 2, 1] as const

// ── Filters state shape ───────────────────────────────────
export type FiltersState = {
  priceRange: PriceRange | null
  manufacturers: string[]
  minRating: number | null
  inStockOnly: boolean
  prescriptionOnly: boolean
  forms: string[]
  categories: string[]   // used by the all-medicines page; empty = show all
}

export const defaultFilters: FiltersState = {
  priceRange: null,
  manufacturers: [],
  minRating: null,
  inStockOnly: false,
  prescriptionOnly: false,
  forms: [],
  categories: [],
}

// Optional category filter option shape
export type CategoryOption = { slug: string; name: string }

interface ProductFiltersProps {
  filters: FiltersState
  onFiltersChange: (filters: FiltersState) => void
  manufacturers: string[]
  forms: string[]
  activeCount: number
  /** Pass this prop to show the category filter section (used on /medicines) */
  categoryOptions?: CategoryOption[]
}

const ProductFilters = ({
  filters,
  onFiltersChange,
  manufacturers,
  forms,
  activeCount,
  categoryOptions,
}: ProductFiltersProps) => {
  const update = (partial: Partial<FiltersState>) => {
    onFiltersChange({ ...filters, ...partial })
  }

  const toggleManufacturer = (m: string) => {
    const next = filters.manufacturers.includes(m)
      ? filters.manufacturers.filter((x) => x !== m)
      : [...filters.manufacturers, m]
    update({ manufacturers: next })
  }

  const toggleForm = (f: string) => {
    const next = filters.forms.includes(f)
      ? filters.forms.filter((x) => x !== f)
      : [...filters.forms, f]
    update({ forms: next })
  }

  const toggleCategory = (slug: string) => {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((x) => x !== slug)
      : [...filters.categories, slug]
    update({ categories: next })
  }

  return (
    <aside className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto gap-1 px-2 py-1 text-xs text-muted-foreground"
            onClick={() => onFiltersChange(defaultFilters)}
          >
            <X className="size-3" />
            Clear all ({activeCount})
          </Button>
        )}
      </div>

      <Separator />

      {/* Category — only shown on the all-medicines page */}
      {categoryOptions && categoryOptions.length > 0 && (
        <>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Category</h4>
            <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
              {categoryOptions.map((cat) => (
                <label
                  key={cat.slug}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <Checkbox
                    checked={filters.categories.includes(cat.slug)}
                    onCheckedChange={() => toggleCategory(cat.slug)}
                  />
                  <span className="text-muted-foreground">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Price range */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label
              key={range.label}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Checkbox
                checked={filters.priceRange?.label === range.label}
                onCheckedChange={(checked) =>
                  update({ priceRange: checked ? range : null })
                }
              />
              <span className="text-muted-foreground">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Manufacturer */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Manufacturer</h4>
        <div className="max-h-40 space-y-2 overflow-y-auto">
          {manufacturers.map((m) => (
            <label
              key={m}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Checkbox
                checked={filters.manufacturers.includes(m)}
                onCheckedChange={() => toggleManufacturer(m)}
              />
              <span className="text-muted-foreground">{m}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Rating</h4>
        <div className="space-y-2">
          {ratingOptions.map((r) => (
            <label
              key={r}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Checkbox
                checked={filters.minRating === r}
                onCheckedChange={(checked) =>
                  update({ minRating: checked ? r : null })
                }
              />
              <span className="flex items-center gap-1 text-muted-foreground">
                {"★".repeat(r)}
                {"☆".repeat(5 - r)}
                <span className="ml-1">& up</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Medicine form */}
      {forms.length > 0 && (
        <>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Form</h4>
            <div className="space-y-2">
              {forms.map((f) => (
                <label
                  key={f}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <Checkbox
                    checked={filters.forms.includes(f)}
                    onCheckedChange={() => toggleForm(f)}
                  />
                  <span className="text-muted-foreground">{f}</span>
                </label>
              ))}
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Availability */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Availability</h4>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <Checkbox
            checked={filters.inStockOnly}
            onCheckedChange={(checked) =>
              update({ inStockOnly: checked === true })
            }
          />
          <span className="text-muted-foreground">In stock only</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <Checkbox
            checked={filters.prescriptionOnly}
            onCheckedChange={(checked) =>
              update({ prescriptionOnly: checked === true })
            }
          />
          <span className="text-muted-foreground">Prescription required</span>
        </label>
      </div>
    </aside>
  )
}

export default ProductFilters
