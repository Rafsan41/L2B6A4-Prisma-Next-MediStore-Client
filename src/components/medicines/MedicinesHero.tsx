"use client"

import { Search, X, Pill, Package2, Building2, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface MedicinesHeroProps {
  totalCount: number
  filteredCount: number
  searchQuery: string
  onSearchChange: (q: string) => void
}

const MedicinesHero = ({
  totalCount,
  filteredCount,
  searchQuery,
  onSearchChange,
}: MedicinesHeroProps) => {
  return (
    <div className="relative overflow-hidden border-b bg-gradient-to-br from-primary/8 via-background to-background py-12">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-primary/6 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 left-4 size-60 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-foreground">All Medicines</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          {/* ── Left: Title + Stats ──────────────────────── */}
          <div>
            {/* Live badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-primary shadow-sm">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              {totalCount}+ Medicines Available
            </div>

            <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              Browse All Medicines
            </h1>
            <p className="max-w-sm leading-relaxed text-muted-foreground">
              Genuine medicines from trusted manufacturers. Search, filter by category, price, or form — and find exactly what you need.
            </p>

            {/* Stats row */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Pill, value: "43+", label: "Medicines" },
                { icon: Package2, value: "12", label: "Categories" },
                { icon: Building2, value: "15+", label: "Manufacturers" },
                { icon: CheckCircle, value: "38+", label: "In Stock" },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-0.5 rounded-xl border bg-card/60 px-3 py-2.5 text-center"
                >
                  <Icon className="size-4 text-primary" />
                  <span className="text-base font-bold text-foreground">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Search ─────────────────────────────── */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search medicines, brands, conditions…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-12 rounded-xl pl-11 pr-14 text-sm shadow-sm"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 size-8 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => onSearchChange("")}
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>

            {/* Search result hint */}
            {searchQuery && (
              <p className="text-center text-xs text-muted-foreground">
                {filteredCount === 0 ? (
                  <span className="text-destructive">
                    No results for <strong className="text-foreground">"{searchQuery}"</strong>
                  </span>
                ) : (
                  <>
                    <span className="font-semibold text-foreground">{filteredCount}</span> result
                    {filteredCount !== 1 ? "s" : ""} for{" "}
                    <strong className="text-foreground">"{searchQuery}"</strong>
                  </>
                )}
              </p>
            )}

            {/* Quick hint */}
            {!searchQuery && (
              <p className="text-center text-xs text-muted-foreground">
                Try: <button onClick={() => onSearchChange("Napa")} className="text-primary hover:underline cursor-pointer">Napa</button>{" · "}
                <button onClick={() => onSearchChange("Vitamin")} className="text-primary hover:underline cursor-pointer">Vitamin</button>{" · "}
                <button onClick={() => onSearchChange("Antacid")} className="text-primary hover:underline cursor-pointer">Antacid</button>{" · "}
                <button onClick={() => onSearchChange("Syrup")} className="text-primary hover:underline cursor-pointer">Syrup</button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicinesHero
