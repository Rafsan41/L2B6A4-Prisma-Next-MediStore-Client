"use client"

import { useState, useMemo } from "react"
import { medicines, getAllManufacturers, getAllForms } from "@/data/medicines"
import { categories } from "@/data/categories"
import MedicinesHero from "@/components/medicines/MedicinesHero"
import ProductFilters, {
  defaultFilters,
  type FiltersState,
} from "@/components/products/ProductFilters"
import MobileFilterSheet from "@/components/products/MobileFilterSheet"
import ProductSort, { type SortOption } from "@/components/products/ProductSort"
import ProductCard from "@/components/products/ProductCard"
import ProductEmpty from "@/components/products/ProductEmpty"
import ProductPagination from "@/components/products/ProductPagination"

const ITEMS_PER_PAGE = 12

export default function MedicinesPage() {
  // All active medicines — stable reference
  const allActive = useMemo(() => medicines.filter((m) => m.isActive), [])

  // ── State ──────────────────────────────────────────────
  const [filters, setFilters] = useState<FiltersState>(defaultFilters)
  const [sortBy, setSortBy] = useState<SortOption>("popular")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  // ── Static filter option lists ─────────────────────────
  const availableManufacturers = useMemo(() => getAllManufacturers(), [])
  const availableForms = useMemo(() => getAllForms(), [])
  const categoryOptions = useMemo(
    () => categories.map((c) => ({ slug: c.slug, name: c.name })),
    []
  )

  // ── Active filter badge count (excludes search — that's cleared separately) ──
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.priceRange) count++
    count += filters.manufacturers.length
    if (filters.minRating) count++
    if (filters.inStockOnly) count++
    if (filters.prescriptionOnly) count++
    count += filters.forms.length
    count += filters.categories.length
    return count
  }, [filters])

  // Total active = filter count + 1 if search active (used for chips row visibility)
  const totalActiveCount = activeFilterCount + (searchQuery.trim() ? 1 : 0)

  // ── Filtering + sorting ────────────────────────────────
  const filteredMedicines = useMemo(() => {
    let result = [...allActive]

    // Full-text search (name / manufacturer / description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.manufacturer.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      )
    }

    // Category
    if (filters.categories.length > 0) {
      result = result.filter((m) =>
        filters.categories.includes(m.categorySlug)
      )
    }

    // Price range
    if (filters.priceRange) {
      result = result.filter(
        (m) =>
          m.price >= filters.priceRange!.min &&
          m.price <
            (filters.priceRange!.max === Infinity
              ? 999999
              : filters.priceRange!.max)
      )
    }

    // Manufacturer
    if (filters.manufacturers.length > 0) {
      result = result.filter((m) =>
        filters.manufacturers.includes(m.manufacturer)
      )
    }

    // Min rating
    if (filters.minRating) {
      result = result.filter((m) => m.rating >= filters.minRating!)
    }

    // In stock only
    if (filters.inStockOnly) {
      result = result.filter((m) => m.stock > 0)
    }

    // Prescription required only
    if (filters.prescriptionOnly) {
      result = result.filter((m) => m.prescriptionRequired)
    }

    // Form
    if (filters.forms.length > 0) {
      result = result.filter((m) => m.form && filters.forms.includes(m.form))
    }

    // Sort
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case "newest":
        result.sort((a, b) => b.id.localeCompare(a.id))
        break
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    return result
  }, [allActive, filters, sortBy, searchQuery])

  // ── Pagination ─────────────────────────────────────────
  const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE)
  const paginated = filteredMedicines.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // ── Handlers ───────────────────────────────────────────
  const handleFiltersChange = (next: FiltersState) => {
    setFilters(next)
    setCurrentPage(1)
  }
  const handleSortChange = (next: SortOption) => {
    setSortBy(next)
    setCurrentPage(1)
  }
  const handleSearchChange = (q: string) => {
    setSearchQuery(q)
    setCurrentPage(1)
  }
  const handleResetAll = () => {
    setFilters(defaultFilters)
    setSearchQuery("")
    setCurrentPage(1)
  }

  return (
    <div className="w-full">
      {/* ── Hero with search ──────────────────────────── */}
      <MedicinesHero
        totalCount={allActive.length}
        filteredCount={filteredMedicines.length}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* ── Main content ──────────────────────────────── */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar filters */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl border bg-card p-5">
              <ProductFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                manufacturers={availableManufacturers}
                forms={availableForms}
                activeCount={activeFilterCount}
                categoryOptions={categoryOptions}
              />
            </div>
          </aside>

          {/* Products area */}
          <div className="flex-1 min-w-0">
            {/* Sort bar + mobile filter */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <MobileFilterSheet
                filters={filters}
                onFiltersChange={handleFiltersChange}
                manufacturers={availableManufacturers}
                forms={availableForms}
                activeCount={activeFilterCount}
                categoryOptions={categoryOptions}
              />
              <ProductSort
                value={sortBy}
                onChange={handleSortChange}
                totalCount={allActive.length}
                filteredCount={filteredMedicines.length}
              />
            </div>

            {/* Active filter chips */}
            {totalActiveCount > 0 && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Active filters:
                </span>
                {searchQuery && (
                  <FilterChip
                    label={`"${searchQuery}"`}
                    onRemove={() => handleSearchChange("")}
                  />
                )}
                {filters.categories.map((slug) => {
                  const cat = categories.find((c) => c.slug === slug)
                  return cat ? (
                    <FilterChip
                      key={slug}
                      label={cat.name}
                      onRemove={() =>
                        handleFiltersChange({
                          ...filters,
                          categories: filters.categories.filter((s) => s !== slug),
                        })
                      }
                    />
                  ) : null
                })}
                {filters.priceRange && (
                  <FilterChip
                    label={filters.priceRange.label}
                    onRemove={() =>
                      handleFiltersChange({ ...filters, priceRange: null })
                    }
                  />
                )}
                {filters.manufacturers.map((m) => (
                  <FilterChip
                    key={m}
                    label={m}
                    onRemove={() =>
                      handleFiltersChange({
                        ...filters,
                        manufacturers: filters.manufacturers.filter((x) => x !== m),
                      })
                    }
                  />
                ))}
                {filters.forms.map((f) => (
                  <FilterChip
                    key={f}
                    label={f}
                    onRemove={() =>
                      handleFiltersChange({
                        ...filters,
                        forms: filters.forms.filter((x) => x !== f),
                      })
                    }
                  />
                ))}
                {filters.minRating && (
                  <FilterChip
                    label={`${filters.minRating}★ & up`}
                    onRemove={() =>
                      handleFiltersChange({ ...filters, minRating: null })
                    }
                  />
                )}
                {filters.inStockOnly && (
                  <FilterChip
                    label="In stock"
                    onRemove={() =>
                      handleFiltersChange({ ...filters, inStockOnly: false })
                    }
                  />
                )}
                {filters.prescriptionOnly && (
                  <FilterChip
                    label="Rx required"
                    onRemove={() =>
                      handleFiltersChange({ ...filters, prescriptionOnly: false })
                    }
                  />
                )}
                <button
                  onClick={handleResetAll}
                  className="text-xs font-medium text-destructive hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product grid or empty state */}
            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paginated.map((medicine) => (
                  <ProductCard key={medicine.id} medicine={medicine} />
                ))}
              </div>
            ) : (
              <ProductEmpty onResetFilters={handleResetAll} />
            )}

            {/* Pagination */}
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Filter chip component ─────────────────────────────────
function FilterChip({
  label,
  onRemove,
}: {
  label: string
  onRemove: () => void
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary">
      {label}
      <button
        onClick={onRemove}
        className="ml-0.5 rounded-full text-primary/60 hover:text-primary"
        aria-label={`Remove ${label} filter`}
      >
        ×
      </button>
    </span>
  )
}
