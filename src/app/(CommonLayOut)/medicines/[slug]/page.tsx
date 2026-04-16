"use client"

import { useParams } from "next/navigation"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { medicines } from "@/data/medicines"
import { categories } from "@/data/categories"
import DetailHero from "@/components/medicine-detail/DetailHero"
import DetailTabs from "@/components/medicine-detail/DetailTabs"
import RelatedMedicines from "@/components/medicine-detail/RelatedMedicines"

export default function MedicineDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  const medicine = medicines.find((m) => m.slug === slug && m.isActive)
  if (!medicine) notFound()

  const category = categories.find((c) => c.slug === medicine.categorySlug)

  return (
    <div className="w-full">
      {/* Breadcrumb bar */}
      <div className="border-b bg-muted/20">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb>
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
              {category && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={`/categories/${category.slug}`}>
                        {category.name}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{medicine.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero — image + purchase section */}
      <DetailHero medicine={medicine} category={category} />

      {/* Tabs — Description, Dosage, Reviews */}
      <DetailTabs medicine={medicine} />

      {/* Related medicines */}
      <RelatedMedicines
        currentSlug={medicine.slug}
        categorySlug={medicine.categorySlug}
      />
    </div>
  )
}
