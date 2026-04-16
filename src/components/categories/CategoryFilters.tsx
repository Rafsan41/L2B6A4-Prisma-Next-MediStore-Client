"use client"

import { cn } from "@/lib/utils"

const filters = ["All", "Popular", "Essential", "New"] as const

type FilterTag = (typeof filters)[number]

interface CategoryFiltersProps {
  activeFilter: FilterTag
  onFilterChange: (filter: FilterTag) => void
}

const CategoryFilters = ({
  activeFilter,
  onFilterChange,
}: CategoryFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
            activeFilter === filter
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilters
export type { FilterTag }
