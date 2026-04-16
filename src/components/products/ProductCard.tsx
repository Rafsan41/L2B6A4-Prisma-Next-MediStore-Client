"use client"

import Link from "next/link"
import {
  ShoppingCart,
  Star,
  Heart,
  Eye,
  Pill,
  FlaskConical,
  Droplets,
  Wind,
  Package,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"
import { useState } from "react"
import type { Medicine } from "@/data/medicines"

// ── Form → icon mapping ───────────────────────────────────
const formIconMap: Record<string, React.ElementType> = {
  Tablet: Pill,
  Capsule: Pill,
  Syrup: FlaskConical,
  Cream: Droplets,
  Drops: Droplets,
  Spray: Wind,
}

// ── Form → gradient color ─────────────────────────────────
const formGradientMap: Record<string, string> = {
  Tablet: "from-primary/15 to-primary/5",
  Capsule: "from-primary/15 to-blue-500/5",
  Syrup: "from-orange-400/15 to-primary/5",
  Cream: "from-pink-400/10 to-primary/5",
  Drops: "from-cyan-400/10 to-primary/5",
  Spray: "from-sky-400/10 to-primary/5",
}

function MedicinePlaceholder({ form }: { form: string | null }) {
  const Icon = form ? (formIconMap[form] ?? Package) : Package
  const gradient = form
    ? (formGradientMap[form] ?? "from-primary/15 to-primary/5")
    : "from-muted to-muted/50"

  return (
    <div
      className={`flex size-full items-center justify-center bg-gradient-to-br ${gradient}`}
    >
      <Icon className="size-14 text-primary/40" strokeWidth={1.2} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────
interface ProductCardProps {
  medicine: Medicine
  featured?: boolean
}

const ProductCard = ({ medicine, featured }: ProductCardProps) => {
  const outOfStock = medicine.stock === 0
  const [wishlisted, setWishlisted] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (outOfStock) return

    toast.success(`${medicine.name} added to cart`, {
      description: `${medicine.form ?? "Item"} — ৳${medicine.price}`,
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlisted((prev) => !prev)
    toast(wishlisted ? "Removed from wishlist" : "Saved to wishlist", {
      icon: wishlisted ? "🤍" : "❤️",
    })
  }

  return (
    <TooltipProvider>
      <Link
        href={`/medicines/${medicine.slug}`}
        className={`group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 ${
          featured
            ? "border-primary/30 ring-1 ring-primary/20"
            : "hover:border-primary/30"
        }`}
      >
        {/* ── Image ─────────────────────────────────────── */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <MedicinePlaceholder form={medicine.form} />

          {/* Wishlist button — top-left */}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute left-2 top-2 flex size-8 items-center justify-center rounded-full border bg-background/80 backdrop-blur transition-all hover:scale-110 hover:bg-background"
          >
            <Heart
              className={`size-4 transition-colors ${
                wishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground"
              }`}
            />
          </button>

          {/* Badges — top-right stack */}
          <div className="absolute right-2 top-2 flex flex-col items-end gap-1.5">
            {featured && (
              <Badge variant="default" className="text-xs">
                Featured
              </Badge>
            )}
            {medicine.prescriptionRequired && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="destructive"
                    className="cursor-default text-xs"
                  >
                    Rx
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="left">
                  Prescription required — consult your doctor before purchase
                </TooltipContent>
              </Tooltip>
            )}
            {outOfStock && (
              <Badge variant="secondary" className="text-xs">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>

        {/* ── Content ───────────────────────────────────── */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          {/* Manufacturer */}
          <p className="text-xs font-medium text-primary">
            {medicine.manufacturer}
          </p>

          {/* Name */}
          <h3 className="line-clamp-1 text-base font-semibold text-foreground">
            {medicine.name}
          </h3>

          {/* Description */}
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {medicine.description}
          </p>

          {/* Form + Dosage tags */}
          {(medicine.form || medicine.dosage) && (
            <div className="flex flex-wrap gap-1.5">
              {medicine.form && (
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {medicine.form}
                </span>
              )}
              {medicine.dosage && (
                <span className="line-clamp-1 max-w-[140px] rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {medicine.dosage}
                </span>
              )}
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{medicine.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({medicine.reviewCount} reviews)
            </span>
          </div>

          <div className="flex-1" />

          {/* Delivery info */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Truck className="size-3.5 shrink-0 text-primary" />
            <span>2–3 day delivery &bull; Cash on delivery</span>
          </div>

          {/* Price + Actions */}
          <div className="mt-2 flex items-center justify-between border-t pt-3">
            <span className="text-xl font-bold text-primary">
              ৳{medicine.price}
            </span>

            <div className="flex gap-2">
              {/* View Details */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className="flex size-8 items-center justify-center rounded-lg border bg-muted transition-colors hover:bg-primary/10 hover:text-primary"
                    onClick={(e) => e.stopPropagation()} // let Link handle navigation
                  >
                    <Eye className="size-4" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>View Details</TooltipContent>
              </Tooltip>

              {/* Add to Cart */}
              <Button
                size="sm"
                className="gap-1.5"
                disabled={outOfStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="size-3.5" />
                {outOfStock ? "Unavailable" : "Add"}
              </Button>
            </div>
          </div>

          {/* Low stock warning */}
          {!outOfStock && medicine.stock <= 20 && (
            <p className="text-xs font-medium text-destructive">
              Only {medicine.stock} left in stock — order soon
            </p>
          )}
        </div>
      </Link>
    </TooltipProvider>
  )
}

export default ProductCard
