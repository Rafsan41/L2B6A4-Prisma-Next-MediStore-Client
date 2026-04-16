import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductEmptyProps {
  onResetFilters: () => void
}

const ProductEmpty = ({ onResetFilters }: ProductEmptyProps) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed bg-card/50 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <SearchX className="size-8 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">
          No medicines found
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          No medicines match your current filters. Try adjusting your search
          criteria or reset all filters.
        </p>
      </div>
      <Button variant="outline" onClick={onResetFilters} className="mt-2">
        Reset all filters
      </Button>
    </div>
  )
}

export default ProductEmpty
