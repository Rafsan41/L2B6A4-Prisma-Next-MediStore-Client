import Link from "next/link"
import { ArrowRight, Thermometer, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const FeaturedCategoryBanner = () => {
  return (
    <section className="container mx-auto px-4">
      <Link
        href="/categories/cold-flu"
        className="group relative block overflow-hidden rounded-2xl border"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-primary/8 to-background transition-all duration-500 group-hover:from-primary/20 group-hover:via-primary/12" />

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 size-56 rounded-full bg-primary/10 blur-3xl" />

        {/* Large faded icon in the background */}
        <Thermometer className="pointer-events-none absolute -right-4 top-1/2 size-48 -translate-y-1/2 rotate-12 text-primary/[0.06] md:right-12 md:size-56" />

        <div className="relative flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-10">
          {/* Left side */}
          <div className="flex items-start gap-4 md:items-center">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 shadow-sm">
              <Thermometer className="size-7 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <Sparkles className="size-3" />
                Seasonal Pick
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                Cold &amp; Flu Season Essentials
              </h3>
              <p className="max-w-md text-sm text-muted-foreground">
                Stock up on fever reducers, cough syrups &amp; immunity boosters
                before the season peaks.
              </p>
            </div>
          </div>

          {/* Right side CTA */}
          <Button
            size="lg"
            className="w-full gap-2 shadow-md md:w-auto"
            tabIndex={-1}
          >
            Shop This Category
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </Link>
    </section>
  )
}

export default FeaturedCategoryBanner
