import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories } from "@/data/categories"

export function CategoryCard() {
  // Show first 8 categories on the home page as a preview
  const preview = categories.slice(0, 8)

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {preview.map((category) => {
          const Icon = category.icon

          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Icon className="size-7 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {category.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {category.medicineCount} medicines
              </p>
            </Link>
          )
        })}
      </div>

      {/* View All link */}
      <div className="mt-8 flex justify-center">
        <Button asChild variant="outline" className="gap-2">
          <Link href="/categories">
            View All Categories
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
