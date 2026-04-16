"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type SortOption =
  | "popular"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"

const sortLabels: Record<SortOption, string> = {
  popular: "Most Popular",
  newest: "Newest First",
  "price-asc": "Price: Low → High",
  "price-desc": "Price: High → Low",
  rating: "Highest Rated",
}

interface ProductSortProps {
  value: SortOption
  onChange: (value: SortOption) => void
  totalCount: number
  filteredCount: number
}

const ProductSort = ({
  value,
  onChange,
  totalCount,
  filteredCount,
}: ProductSortProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">{filteredCount}</span> of{" "}
        <span className="font-medium text-foreground">{totalCount}</span>{" "}
        medicines
      </p>

      <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {(Object.entries(sortLabels) as [SortOption, string][]).map(
            ([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
    </div>
  )
}

export default ProductSort
