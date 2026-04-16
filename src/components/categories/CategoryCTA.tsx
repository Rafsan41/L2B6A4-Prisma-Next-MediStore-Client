import Link from "next/link"
import { ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const CategoryCTA = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 md:p-14">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative flex flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Sparkles className="size-4 text-primary" />
            <span>1000+ medicines available</span>
          </div>

          <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            Start shopping for your health needs
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">
            Pick a category above or head straight to our medicine store. Cash on
            delivery available nationwide.
          </p>

          <Button asChild size="lg" className="mt-2 gap-2">
            <Link href="/medicines">
              <ShoppingBag className="size-5" />
              Explore All Medicines
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CategoryCTA
