import { ShieldCheck, Truck, Stethoscope, Headphones } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Products",
    description: "100% genuine and verified medicines from licensed suppliers",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick doorstep delivery across Bangladesh with live tracking",
  },
  {
    icon: Stethoscope,
    title: "Verified Sellers",
    description: "All sellers are pharmacy-licensed and regularly audited",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support for any queries or issues",
  },
]

const WhyChooseUs = () => {
  return (
    <section className="border-y bg-muted/30">
      <div className="container mx-auto px-4 py-14">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Why Choose MediStore?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Trusted by thousands of customers across the country
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-6 text-center transition-all hover:border-primary/20 hover:shadow-md hover:shadow-primary/5"
              >
                <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
