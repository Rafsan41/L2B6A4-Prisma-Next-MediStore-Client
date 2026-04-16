"use client"

import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import ProductFilters, {
  type FiltersState,
  type CategoryOption,
} from "./ProductFilters"

interface MobileFilterSheetProps {
  filters: FiltersState
  onFiltersChange: (filters: FiltersState) => void
  manufacturers: string[]
  forms: string[]
  activeCount: number
  categoryOptions?: CategoryOption[]
}

const MobileFilterSheet = ({
  filters,
  onFiltersChange,
  manufacturers,
  forms,
  activeCount,
  categoryOptions,
}: MobileFilterSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 lg:hidden">
          <SlidersHorizontal className="size-4" />
          Filters
          {activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Medicines</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <ProductFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
            manufacturers={manufacturers}
            forms={forms}
            activeCount={activeCount}
            categoryOptions={categoryOptions}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileFilterSheet
