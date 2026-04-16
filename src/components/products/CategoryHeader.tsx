import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/data/categories"
import type { LucideIcon } from "lucide-react"

interface CategoryHeaderProps {
  category: Category
  medicineCount: number
}

const CategoryHeader = ({ category, medicineCount }: CategoryHeaderProps) => {
  const Icon: LucideIcon = category.icon

  return (
    <section className="border-b bg-gradient-to-br from-primary/8 via-primary/3 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/categories">Categories</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Category info */}
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="size-7 text-primary" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {category.name}
              </h1>
              <Badge variant="secondary">
                {medicineCount} medicines
              </Badge>
            </div>
            <p className="max-w-xl text-muted-foreground">
              {category.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryHeader
