"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { notFound } from "next/navigation"
import { categories } from "@/data/categories"
import {
  getMedicinesByCategory,
  getAllManufacturers,
  getAllForms,
} from "@/data/medicines"
import CategoryHeader from "@/components/products/CategoryHeader"
import ProductFilters, {
  defaultFilters,
  type FiltersState,
} from "@/components/products/ProductFilters"
import MobileFilterSheet from "@/components/products/MobileFilterSheet"
import ProductSort, { type SortOption } from "@/components/products/ProductSort"
import ProductCard from "@/components/products/ProductCard"
import ProductEmpty from "@/components/products/ProductEmpty"
import ProductPagination from "@/components/products/ProductPagination"

const ITEMS_PER_PAGE = 8

export default function CategorySlugPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  // ── Resolve category ────────────────────────────────────
  const category = categories.find((c) => c.slug === slug)
  if (!category) notFound()

  const allMedicines = getMedicinesByCategory(slug)

  // ── Filter + sort + pagination state ────────────────────
  const [filters, setFilters] = useState<FiltersState>(defaultFilters)
  const [sortBy, setSortBy] = useState<SortOption>("popular")
  const [currentPage, setCurrentPage] = useState(1)

  // Count active filters (for badge)
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.priceRange) count++
    count += filters.manufacturers.length
    if (filters.minRating) count++
    if (filters.inStockOnly) count++
    if (filters.prescriptionOnly) count++
    count += filters.forms.length
    return count
  }, [filters])

  // Available filter options for this category
  const availableManufacturers = useMemo(
    () =>
      [...new Set(allMedicines.map((m) => m.manufacturer))].sort(),
    [allMedicines]
  )
  const availableForms = useMemo(
    () =>
      [
        ...new Set(
          allMedicines.map((m) => m.form).filter(Boolean)
        ),
      ] as string[],
    [allMedicines]
  )

  // ── Apply filters ───────────────────────────────────────
  const filteredMedicines = useMemo(() => {
    let result = [...allMedicines]

    // Price range
    if (filters.priceRange) {
      result = result.filter(
        (m) =>
          m.price >= filters.priceRange!.min &&
          m.price < (filters.priceRange!.max === Infinity ? 999999 : filters.priceRange!.max)
      )
    }

    // Manufacturer
    if (filters.manufacturers.length > 0) {
      result = result.filter((m) =>
        filters.manufacturers.includes(m.manufacturer)
      )
    }

    // Rating
    if (filters.minRating) {
      result = result.filter((m) => m.rating >= filters.minRating!)
    }

    // In stock
    if (filters.inStockOnly) {
      result = result.filter((m) => m.stock > 0)
    }

    // Prescription
    if (filters.prescriptionOnly) {
      result = result.filter((m) => m.prescriptionRequired)
    }

    // Form
    if (filters.forms.length > 0) {
      result = result.filter((m) => m.form && filters.forms.includes(m.form))
    }

    // ── Sort ────────────────────────────────────────────────
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case "newest":
        result.sort((a, b) => a.id.localeCompare(b.id)) // mock: higher id = newer
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
  }, [allMedicines, filters, sortBy])

  // ── Pagination ──────────────────────────────────────────
  const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE)
  const paginatedMedicines = filteredMedicines.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Reset page when filters/sort change
  const handleFiltersChange = (newFilters: FiltersState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setFilters(defaultFilters)
    setCurrentPage(1)
  }

  return (
    <div className="w-full">
      {/* Section 1 — Category header with breadcrumb */}
      <CategoryHeader
        category={category}
        medicineCount={allMedicines.length}
      />

      {/* Section 2 — Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar filters — desktop only */}
          <div className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl border bg-card p-5">
              <ProductFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                manufacturers={availableManufacturers}
                forms={availableForms}
                activeCount={activeFilterCount}
              />
            </div>
          </div>

          {/* Products area */}
          <div className="flex-1">
            {/* Sort bar + mobile filter toggle */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <MobileFilterSheet
                filters={filters}
                onFiltersChange={handleFiltersChange}
                manufacturers={availableManufacturers}
                forms={availableForms}
                activeCount={activeFilterCount}
              />
              <ProductSort
                value={sortBy}
                onChange={handleSortChange}
                totalCount={allMedicines.length}
                filteredCount={filteredMedicines.length}
              />
            </div>

            {/* Product grid or empty state */}
            {paginatedMedicines.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedMedicines.map((medicine) => (
                  <ProductCard key={medicine.id} medicine={medicine} />
                ))}
              </div>
            ) : (
              <ProductEmpty onResetFilters={handleResetFilters} />
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
