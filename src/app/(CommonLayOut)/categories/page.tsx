"use client"

import { useState, useMemo } from "react"
import { categories } from "@/data/categories"
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed"
import CategoryHero from "@/components/categories/CategoryHero"
import CategoryFilters, {
  type FilterTag,
} from "@/components/categories/CategoryFilters"
import FeaturedCategoryBanner from "@/components/categories/FeaturedCategoryBanner"
import CategoriesGrid from "@/components/categories/CategoriesGrid"
import RecentlyViewed from "@/components/categories/RecentlyViewed"
import PopularCategories from "@/components/categories/PopularCategories"
import WhyChooseUs from "@/components/categories/WhyChooseUs"
import CategoryCTA from "@/components/categories/CategoryCTA"

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterTag>("All")
  const { viewed, addViewed } = useRecentlyViewed()

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesSearch =
        searchQuery === "" ||
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter =
        activeFilter === "All" || category.tag === activeFilter

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, activeFilter])

  return (
    <div className="w-full">
      {/* Section 1 — Hero with search */}
      <CategoryHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Section 2 — Recently Viewed (only shows if user has history) */}
      <RecentlyViewed viewedSlugs={viewed} />

      {/* Section 3 — Featured Category Banner */}
      <FeaturedCategoryBanner />

      {/* Section 4 + 5 — Filters + Categories Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col items-center gap-4">
          <CategoryFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          <p className="text-sm text-muted-foreground">
            Showing {filteredCategories.length} of {categories.length}{" "}
            categories
          </p>
        </div>

        <CategoriesGrid
          categories={filteredCategories}
          onCategoryClick={addViewed}
        />
      </section>

      {/* Section 6 — Popular Categories */}
      <PopularCategories />

      {/* Section 7 — Why Choose Us */}
      <WhyChooseUs />

      {/* Section 8 — CTA */}
      <CategoryCTA />
    </div>
  )
}
