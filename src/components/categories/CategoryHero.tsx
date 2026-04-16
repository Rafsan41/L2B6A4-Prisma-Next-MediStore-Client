"use client"

import { Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"

interface CategoryHeroProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

const CategoryHero = ({ searchQuery, onSearchChange }: CategoryHeroProps) => {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-primary/5 to-background mb-10">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="container relative mx-auto px-4 py-14 md:py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Sparkles className="size-4 text-primary" />
            <span>12 categories available</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Browse by{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Categories
            </span>
          </h1>

          <p className="max-w-lg text-lg text-muted-foreground">
            Find the right medicines organized by your health needs. From pain
            relief to vitamins — we&apos;ve got you covered.
          </p>

          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-11 rounded-full border-primary/20 bg-background/80 pl-10 pr-4 text-base shadow-sm backdrop-blur focus-visible:border-primary focus-visible:ring-primary/30"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryHero
