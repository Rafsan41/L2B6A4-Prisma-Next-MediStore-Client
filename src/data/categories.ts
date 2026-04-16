import {
  Pill,
  Thermometer,
  Apple,
  Leaf,
  Droplets,
  Activity,
  Heart,
  Eye,
  Baby,
  ShieldCheck,
  Cross,
  Brain,
  type LucideIcon,
} from "lucide-react"

export type Category = {
  id: string
  name: string
  slug: string
  description: string
  medicineCount: number
  icon: LucideIcon
  isPopular?: boolean
  tag?: "Popular" | "New" | "Essential"
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Pain Relief",
    slug: "pain-relief",
    description: "Headache, body pain & muscle relief medicines",
    medicineCount: 124,
    icon: Pill,
    isPopular: true,
    tag: "Popular",
  },
  {
    id: "2",
    name: "Cold & Flu",
    slug: "cold-flu",
    description: "Fever, cold symptoms & cough remedies",
    medicineCount: 89,
    icon: Thermometer,
    isPopular: true,
    tag: "Essential",
  },
  {
    id: "3",
    name: "Digestive Health",
    slug: "digestive-health",
    description: "Stomach care, antacids & digestion aids",
    medicineCount: 76,
    icon: Apple,
    tag: "Popular",
  },
  {
    id: "4",
    name: "Vitamins & Supplements",
    slug: "vitamins-supplements",
    description: "Daily nutrition, multivitamins & wellness",
    medicineCount: 210,
    icon: Leaf,
    isPopular: true,
    tag: "Popular",
  },
  {
    id: "5",
    name: "Skin Care",
    slug: "skin-care",
    description: "Dermatology, creams & skin treatments",
    medicineCount: 95,
    icon: Droplets,
    tag: "New",
  },
  {
    id: "6",
    name: "Diabetes Care",
    slug: "diabetes-care",
    description: "Blood sugar management & diabetic supplies",
    medicineCount: 64,
    icon: Activity,
    isPopular: true,
    tag: "Essential",
  },
  {
    id: "7",
    name: "Heart Health",
    slug: "heart-health",
    description: "Cardiac care, blood pressure & cholesterol",
    medicineCount: 58,
    icon: Heart,
    tag: "Essential",
  },
  {
    id: "8",
    name: "Eye Care",
    slug: "eye-care",
    description: "Eye drops, vision care & ophthalmic products",
    medicineCount: 42,
    icon: Eye,
  },
  {
    id: "9",
    name: "Baby Care",
    slug: "baby-care",
    description: "Infant health, baby vitamins & care products",
    medicineCount: 53,
    icon: Baby,
    tag: "New",
  },
  {
    id: "10",
    name: "Antibiotics",
    slug: "antibiotics",
    description: "Prescription antibiotics & infection treatment",
    medicineCount: 87,
    icon: ShieldCheck,
    isPopular: true,
    tag: "Essential",
  },
  {
    id: "11",
    name: "First Aid",
    slug: "first-aid",
    description: "Bandages, antiseptics & emergency supplies",
    medicineCount: 68,
    icon: Cross,
  },
  {
    id: "12",
    name: "Mental Wellness",
    slug: "mental-wellness",
    description: "Stress relief, sleep aids & mental health",
    medicineCount: 45,
    icon: Brain,
    tag: "New",
  },
]
