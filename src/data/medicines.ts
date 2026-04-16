/**
 * Frontend Medicine type — mirrors the Prisma `Medicine` model from the backend
 * schema at Prisma-Next-MediStore-Server/prisma/schema.prisma
 *
 * Backend fields mapped:
 *   id, name, slug, description, price (Decimal), stock (Int),
 *   image, images[], manufacturer, dosage, form,
 *   prescriptionRequired, isActive, sellerId, categoryId
 *
 * Computed/joined fields (from Review relation):
 *   rating, reviewCount — not stored on medicine, aggregated from reviews
 */
export type Medicine = {
  id: string
  name: string
  slug: string
  description: string
  price: number             // backend: Decimal(10,2)
  stock: number             // backend: Int, 0 = out of stock
  image: string | null
  images: string[]
  manufacturer: string
  dosage: string | null
  form: string | null        // "Tablet" | "Capsule" | "Syrup" | "Cream" | "Drops" etc.
  prescriptionRequired: boolean
  isActive: boolean
  sellerId: string
  categoryId: string
  categorySlug: string       // denormalized for frontend filtering

  // Aggregated from reviews (computed, not in DB)
  rating: number
  reviewCount: number

  // Frontend-only display helpers (not in backend schema)
  isFeatured?: boolean
  keyBadges?: string[]          // e.g. ["Fast Relief", "Popular Choice"]
  uses?: string[]               // What it treats
  ingredients?: string          // Active ingredients / composition
  sideEffects?: string[]        // Common side effects
  storage?: string              // Storage instructions
  dosageStructured?: {          // Structured dosage info for detail page
    adults?: string
    children?: string
    maxDaily?: string
    notes?: string
  }
}

// ────────────────────────────────────────────────────────────
//  Mock data — 43 medicines across 12 categories
// ────────────────────────────────────────────────────────────

export const medicines: Medicine[] = [
  // ── Pain Relief ──────────────────────────────────────────
  {
    id: "med-001", name: "Napa Extra", slug: "napa-extra",
    description: "Fast-acting relief for headache, toothache, and body pain. Contains Paracetamol 500mg + Caffeine 65mg.",
    price: 45, stock: 150, image: "https://avatar.vercel.sh/napa", images: [],
    manufacturer: "Beximco Pharma", dosage: "1-2 tablets every 4-6 hours", form: "Tablet",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c1", categorySlug: "pain-relief",
    rating: 4.8, reviewCount: 312, isFeatured: true,
    keyBadges: ["Fast Relief", "Popular Choice", "#1 in Pain Relief"],
    uses: ["Headache", "Toothache", "Fever", "Body pain", "Menstrual cramps"],
    ingredients: "Paracetamol 500mg, Caffeine 65mg",
    sideEffects: ["Nausea (rare)", "Stomach upset", "Allergic reaction (very rare)", "Liver issues on overdose"],
    storage: "Store below 25°C in a cool, dry place. Keep away from direct sunlight and moisture.",
    dosageStructured: {
      adults: "1–2 tablets every 4–6 hours as needed",
      children: "Not recommended for children under 12 without medical advice",
      maxDaily: "Maximum 8 tablets (4g paracetamol) per 24 hours",
      notes: "Take with or after food to reduce stomach upset. Do not exceed recommended dose.",
    },
  },
  {
    id: "med-002", name: "Ace Plus", slug: "ace-plus",
    description: "Anti-inflammatory pain relief for muscle and joint pain. Ibuprofen 400mg.",
    price: 60, stock: 95, image: "https://avatar.vercel.sh/ace", images: [],
    manufacturer: "Square Pharma", dosage: "1 tablet 3 times daily", form: "Tablet",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c1", categorySlug: "pain-relief",
    rating: 4.5, reviewCount: 198,
    keyBadges: ["Anti-Inflammatory", "Fast Acting"],
    uses: ["Muscle pain", "Joint pain", "Arthritis", "Back pain", "Dental pain"],
    ingredients: "Ibuprofen 400mg",
    sideEffects: ["Stomach pain", "Heartburn", "Nausea", "Dizziness", "Mild headache"],
    storage: "Store at room temperature (15–25°C). Keep away from moisture.",
    dosageStructured: {
      adults: "1 tablet 3 times daily with food",
      children: "Not recommended under 12 years",
      maxDaily: "Maximum 3 tablets per 24 hours",
      notes: "Always take with food or milk to protect stomach lining. Avoid on empty stomach.",
    },
  },
  {
    id: "med-003", name: "Voltalin Gel", slug: "voltalin-gel",
    description: "Topical gel for localized pain and inflammation relief. Diclofenac Sodium 1%.",
    price: 120, stock: 60, image: "https://avatar.vercel.sh/voltalin", images: [],
    manufacturer: "Novartis", dosage: "Apply 3-4 times daily", form: "Cream",
    prescriptionRequired: false, isActive: true, sellerId: "s2", categoryId: "c1", categorySlug: "pain-relief",
    rating: 4.6, reviewCount: 145,
  },
  {
    id: "med-004", name: "Maxpro", slug: "maxpro",
    description: "Long-lasting pain relief for arthritis and menstrual cramps. Naproxen 250mg.",
    price: 85, stock: 0, image: "https://avatar.vercel.sh/maxpro", images: [],
    manufacturer: "Incepta Pharma", dosage: "1 tablet twice daily", form: "Tablet",
    prescriptionRequired: true, isActive: true, sellerId: "s2", categoryId: "c1", categorySlug: "pain-relief",
    rating: 4.3, reviewCount: 89,
  },
  {
    id: "med-005", name: "Flexon MR", slug: "flexon-mr",
    description: "Muscle relaxant for back pain and spasms. Ibuprofen + Paracetamol + Chlorzoxazone.",
    price: 95, stock: 120, image: "https://avatar.vercel.sh/flexon", images: [],
    manufacturer: "Healthcare Pharma", dosage: "1 tablet 3 times daily", form: "Tablet",
    prescriptionRequired: true, isActive: true, sellerId: "s1", categoryId: "c1", categorySlug: "pain-relief",
    rating: 4.4, reviewCount: 167, isFeatured: true,
  },

  // ── Cold & Flu ──────────────────────────────────────────
  {
    id: "med-006", name: "Fexo 120", slug: "fexo-120",
    description: "Non-drowsy antihistamine for seasonal allergies. Fexofenadine 120mg.",
    price: 70, stock: 200, image: "https://avatar.vercel.sh/fexo", images: [],
    manufacturer: "Square Pharma", dosage: "1 tablet daily", form: "Tablet",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c2", categorySlug: "cold-flu",
    rating: 4.7, reviewCount: 234, isFeatured: true,
    keyBadges: ["Non-Drowsy", "24hr Relief", "Popular Choice"],
    uses: ["Seasonal allergies", "Hay fever", "Allergic rhinitis", "Hives", "Itching"],
    ingredients: "Fexofenadine Hydrochloride 120mg",
    sideEffects: ["Headache (occasional)", "Nausea (rare)", "Dry mouth (rare)"],
    storage: "Store below 30°C. Keep in original packaging away from light.",
    dosageStructured: {
      adults: "1 tablet once daily, preferably in the morning",
      children: "Not recommended under 12 years",
      maxDaily: "Maximum 1 tablet per 24 hours",
      notes: "Can be taken with or without food. Avoid taking with fruit juices (orange, apple, grapefruit).",
    },
  },
  {
    id: "med-007", name: "Histacin", slug: "histacin",
    description: "24-hour allergy relief for runny nose and sneezing. Cetirizine 10mg.",
    price: 35, stock: 180, image: "https://avatar.vercel.sh/histacin", images: [],
    manufacturer: "ACI Pharma", dosage: "1 tablet at bedtime", form: "Tablet",
    prescriptionRequired: false, isActive: true, sellerId: "s2", categoryId: "c2", categorySlug: "cold-flu",
    rating: 4.4, reviewCount: 178,
  },
  {
    id: "med-008", name: "Tusca DX", slug: "tusca-dx",
    description: "Cough suppressant with nasal decongestant. Dextromethorphan + Phenylephrine.",
    price: 90, stock: 75, image: "https://avatar.vercel.sh/tusca", images: [],
    manufacturer: "Beximco Pharma", dosage: "10ml every 6 hours", form: "Syrup",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c2", categorySlug: "cold-flu",
    rating: 4.2, reviewCount: 96,
  },
  {
    id: "med-009", name: "Nasoclear Spray", slug: "nasoclear",
    description: "Fast nasal congestion relief spray. Oxymetazoline HCI 0.05%.",
    price: 145, stock: 55, image: "https://avatar.vercel.sh/nasoclear", images: [],
    manufacturer: "Renata Pharma", dosage: "2-3 sprays per nostril", form: "Spray",
    prescriptionRequired: false, isActive: true, sellerId: "s2", categoryId: "c2", categorySlug: "cold-flu",
    rating: 4.5, reviewCount: 112,
  },
  {
    id: "med-010", name: "Coldex", slug: "coldex",
    description: "All-in-one cold, flu and fever combination tablet. Paracetamol + Chlorpheniramine + Pseudoephedrine.",
    price: 55, stock: 300, image: "https://avatar.vercel.sh/coldex", images: [],
    manufacturer: "Square Pharma", dosage: "1 tablet 3 times daily", form: "Tablet",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c2", categorySlug: "cold-flu",
    rating: 4.6, reviewCount: 287, isFeatured: true,
  },

  // ── Vitamins & Supplements ──────────────────────────────
  {
    id: "med-011", name: "D-Rise 2000", slug: "d-rise-2000",
    description: "Essential vitamin D for bone health and immunity. Vitamin D3 2000 IU.",
    price: 250, stock: 90, image: "https://avatar.vercel.sh/drise", images: [],
    manufacturer: "Healthcare Pharma", dosage: "1 capsule daily", form: "Capsule",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c3", categorySlug: "vitamins-supplements",
    rating: 4.9, reviewCount: 456, isFeatured: true,
  },
  {
    id: "med-012", name: "Calbo-D", slug: "calbo-d",
    description: "Calcium and vitamin D combination for strong bones. Calcium 600mg + Vitamin D3.",
    price: 320, stock: 65, image: "https://avatar.vercel.sh/calbo", images: [],
    manufacturer: "Square Pharma", dosage: "1 tablet twice daily", form: "Tablet",
    prescriptionRequired: false, isActive: true, sellerId: "s2", categoryId: "c3", categorySlug: "vitamins-supplements",
    rating: 4.7, reviewCount: 234,
  },
  {
    id: "med-013", name: "Multivit Gold", slug: "multivit-gold",
    description: "Complete daily nutrition with 23 essential vitamins and minerals.",
    price: 450, stock: 40, image: "https://avatar.vercel.sh/multivit", images: [],
    manufacturer: "BioVita", dosage: "1 tablet daily after meal", form: "Tablet",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c3", categorySlug: "vitamins-supplements",
    rating: 4.6, reviewCount: 189,
  },
  {
    id: "med-014", name: "Ferogen XT", slug: "ferogen-xt",
    description: "Iron supplement for anemia and pregnancy support. Ferrous Ascorbate + Folic Acid.",
    price: 180, stock: 110, image: "https://avatar.vercel.sh/ferogen", images: [],
    manufacturer: "Incepta Pharma", dosage: "1 tablet daily", form: "Tablet",
    prescriptionRequired: false, isActive: true, sellerId: "s2", categoryId: "c3", categorySlug: "vitamins-supplements",
    rating: 4.5, reviewCount: 167,
  },
  {
    id: "med-015", name: "Omega-3 Plus", slug: "omega-3-plus",
    description: "Heart-healthy omega-3 fatty acids from deep sea fish oil. EPA + DHA 1000mg.",
    price: 520, stock: 0, image: "https://avatar.vercel.sh/omega3", images: [],
    manufacturer: "BioVita", dosage: "1 softgel twice daily", form: "Capsule",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c3", categorySlug: "vitamins-supplements",
    rating: 4.8, reviewCount: 298,
  },

  // ── Digestive Health ────────────────────────────────────
  {
    id: "med-016", name: "Omeprol 20", slug: "omeprol-20",
    description: "Proton pump inhibitor for acid reflux and ulcers. Omeprazole 20mg.",
    price: 65, stock: 250, image: "https://avatar.vercel.sh/omeprol", images: [],
    manufacturer: "Square Pharma", dosage: "1 capsule before breakfast", form: "Capsule",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c4", categorySlug: "digestive-health",
    rating: 4.7, reviewCount: 345, isFeatured: true,
  },
  {
    id: "med-017", name: "Antacid Plus", slug: "antacid-plus",
    description: "Quick relief from heartburn, acid indigestion and gas. Aluminum + Magnesium Hydroxide.",
    price: 40, stock: 180, image: "https://avatar.vercel.sh/antacid", images: [],
    manufacturer: "ACI Pharma", dosage: "10-20ml after meals", form: "Syrup",
    prescriptionRequired: false, isActive: true, sellerId: "s2", categoryId: "c4", categorySlug: "digestive-health",
    rating: 4.3, reviewCount: 156,
  },
  {
    id: "med-018", name: "Moticon", slug: "moticon",
    description: "Anti-nausea and vomiting relief, promotes gastric motility. Domperidone 10mg.",
    price: 50, stock: 130, image: "https://avatar.vercel.sh/moticon", images: [],
    manufacturer: "Renata Pharma", dosage: "1 tablet before meals", form: "Tablet",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c4", categorySlug: "digestive-health",
    rating: 4.4, reviewCount: 123,
  },
  {
    id: "med-019", name: "Enzyplex", slug: "enzyplex",
    description: "Multi-enzyme formula for better digestion and nutrient absorption.",
    price: 180, stock: 70, image: "https://avatar.vercel.sh/enzyplex", images: [],
    manufacturer: "Healthcare Pharma", dosage: "1 capsule with each meal", form: "Capsule",
    prescriptionRequired: false, isActive: true, sellerId: "s2", categoryId: "c4", categorySlug: "digestive-health",
    rating: 4.5, reviewCount: 89,
  },

  // ── Skin Care ───────────────────────────────────────────
  {
    id: "med-020", name: "Dermacort", slug: "dermacort",
    description: "Topical corticosteroid for eczema, rash and skin irritation. Hydrocortisone 1%.",
    price: 95, stock: 85, image: "https://avatar.vercel.sh/dermacort", images: [],
    manufacturer: "Square Pharma", dosage: "Apply thin layer 2-3 times daily", form: "Cream",
    prescriptionRequired: true, isActive: true, sellerId: "s1", categoryId: "c5", categorySlug: "skin-care",
    rating: 4.3, reviewCount: 134,
  },
  {
    id: "med-021", name: "Ketozol Cream", slug: "ketozol",
    description: "Antifungal cream for ringworm, athlete's foot and fungal infections. Ketoconazole 2%.",
    price: 110, stock: 95, image: "https://avatar.vercel.sh/ketozol", images: [],
    manufacturer: "Beximco Pharma", dosage: "Apply once daily for 2-4 weeks", form: "Cream",
    prescriptionRequired: false, isActive: true, sellerId: "s2", categoryId: "c5", categorySlug: "skin-care",
    rating: 4.6, reviewCount: 178, isFeatured: true,
  },
  {
    id: "med-022", name: "Sunguard SPF50", slug: "sunguard-spf50",
    description: "Broad-spectrum sunscreen with UVA/UVB protection. Zinc Oxide + Titanium Dioxide.",
    price: 350, stock: 45, image: "https://avatar.vercel.sh/sunguard", images: [],
    manufacturer: "BioVita", dosage: "Apply 15 min before sun exposure", form: "Cream",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c5", categorySlug: "skin-care",
    rating: 4.7, reviewCount: 245,
  },

  // ── Diabetes Care ───────────────────────────────────────
  {
    id: "med-023", name: "Metfo 500", slug: "metfo-500",
    description: "First-line oral medication for type 2 diabetes. Metformin 500mg.",
    price: 55, stock: 300, image: "https://avatar.vercel.sh/metfo", images: [],
    manufacturer: "Square Pharma", dosage: "1 tablet twice daily with meals", form: "Tablet",
    prescriptionRequired: true, isActive: true, sellerId: "s1", categoryId: "c6", categorySlug: "diabetes-care",
    rating: 4.6, reviewCount: 389, isFeatured: true,
  },
  {
    id: "med-024", name: "Gliptin Plus", slug: "gliptin-plus",
    description: "Dual-action diabetes control with DPP-4 inhibitor. Sitagliptin 50mg + Metformin 500mg.",
    price: 280, stock: 60, image: "https://avatar.vercel.sh/gliptin", images: [],
    manufacturer: "Incepta Pharma", dosage: "1 tablet twice daily", form: "Tablet",
    prescriptionRequired: true, isActive: true, sellerId: "s2", categoryId: "c6", categorySlug: "diabetes-care",
    rating: 4.5, reviewCount: 145,
  },
  {
    id: "med-025", name: "GlucoCheck Monitor", slug: "glucocheck",
    description: "Digital blood sugar meter with 25 free test strips.",
    price: 950, stock: 30, image: "https://avatar.vercel.sh/glucocheck", images: [],
    manufacturer: "Healthcare Pharma", dosage: "Test as directed by physician", form: null,
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c6", categorySlug: "diabetes-care",
    rating: 4.8, reviewCount: 267,
  },

  // ── Heart Health ────────────────────────────────────────
  {
    id: "med-026", name: "Ecosprin 75", slug: "ecosprin-75",
    description: "Low-dose aspirin for heart attack and stroke prevention. Aspirin 75mg.",
    price: 30, stock: 400, image: "https://avatar.vercel.sh/ecosprin", images: [],
    manufacturer: "ACI Pharma", dosage: "1 tablet daily after meal", form: "Tablet",
    prescriptionRequired: true, isActive: true, sellerId: "s2", categoryId: "c7", categorySlug: "heart-health",
    rating: 4.7, reviewCount: 456, isFeatured: true,
  },
  {
    id: "med-027", name: "Atorva 10", slug: "atorva-10",
    description: "Cholesterol-lowering statin for cardiovascular health. Atorvastatin 10mg.",
    price: 75, stock: 150, image: "https://avatar.vercel.sh/atorva", images: [],
    manufacturer: "Square Pharma", dosage: "1 tablet at bedtime", form: "Tablet",
    prescriptionRequired: true, isActive: true, sellerId: "s1", categoryId: "c7", categorySlug: "heart-health",
    rating: 4.5, reviewCount: 234,
  },
  {
    id: "med-028", name: "Losartan 50", slug: "losartan-50",
    description: "ARB medication for high blood pressure management. Losartan Potassium 50mg.",
    price: 90, stock: 0, image: "https://avatar.vercel.sh/losartan", images: [],
    manufacturer: "Renata Pharma", dosage: "1 tablet daily", form: "Tablet",
    prescriptionRequired: true, isActive: true, sellerId: "s2", categoryId: "c7", categorySlug: "heart-health",
    rating: 4.4, reviewCount: 178,
  },

  // ── Eye Care ────────────────────────────────────────────
  {
    id: "med-029", name: "ClearDrop", slug: "cleardrop",
    description: "Lubricating eye drops for dry eyes and computer eye strain. Carboxymethylcellulose 0.5%.",
    price: 120, stock: 80, image: "https://avatar.vercel.sh/cleardrop", images: [],
    manufacturer: "Incepta Pharma", dosage: "1-2 drops as needed", form: "Drops",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c8", categorySlug: "eye-care",
    rating: 4.6, reviewCount: 198, isFeatured: true,
  },
  {
    id: "med-030", name: "Vision Plus", slug: "vision-plus",
    description: "Eye health supplement with antioxidants for vision support. Lutein 20mg + Zeaxanthin.",
    price: 380, stock: 35, image: "https://avatar.vercel.sh/visionplus", images: [],
    manufacturer: "BioVita", dosage: "1 capsule daily", form: "Capsule",
    prescriptionRequired: false, isActive: true, sellerId: "s2", categoryId: "c8", categorySlug: "eye-care",
    rating: 4.5, reviewCount: 87,
  },

  // ── Baby Care ───────────────────────────────────────────
  {
    id: "med-031", name: "Baby D Drops", slug: "baby-d-drops",
    description: "Essential vitamin D drops for infants and toddlers. Vitamin D3 400 IU.",
    price: 180, stock: 55, image: "https://avatar.vercel.sh/babyd", images: [],
    manufacturer: "Healthcare Pharma", dosage: "1 drop daily", form: "Drops",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c9", categorySlug: "baby-care",
    rating: 4.9, reviewCount: 312, isFeatured: true,
  },
  {
    id: "med-032", name: "Gripe Water", slug: "gripe-water",
    description: "Natural relief for infant colic, gas and hiccups. Dill Oil + Sodium Bicarbonate.",
    price: 95, stock: 120, image: "https://avatar.vercel.sh/gripewater", images: [],
    manufacturer: "ACI Pharma", dosage: "5ml 2-3 times daily", form: "Syrup",
    prescriptionRequired: false, isActive: true, sellerId: "s2", categoryId: "c9", categorySlug: "baby-care",
    rating: 4.4, reviewCount: 198,
  },
  {
    id: "med-033", name: "Baby Saline Nasal", slug: "baby-saline",
    description: "Gentle saline drops for baby nasal congestion. Sodium Chloride 0.65%.",
    price: 65, stock: 90, image: "https://avatar.vercel.sh/babysaline", images: [],
    manufacturer: "Renata Pharma", dosage: "2-3 drops per nostril", form: "Drops",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c9", categorySlug: "baby-care",
    rating: 4.3, reviewCount: 134,
  },

  // ── Antibiotics ─────────────────────────────────────────
  {
    id: "med-034", name: "Moxacil 500", slug: "moxacil-500",
    description: "Broad-spectrum antibiotic for bacterial infections. Amoxicillin 500mg.",
    price: 80, stock: 200, image: "https://avatar.vercel.sh/moxacil", images: [],
    manufacturer: "Square Pharma", dosage: "1 capsule 3 times daily", form: "Capsule",
    prescriptionRequired: true, isActive: true, sellerId: "s1", categoryId: "c10", categorySlug: "antibiotics",
    rating: 4.6, reviewCount: 345, isFeatured: true,
  },
  {
    id: "med-035", name: "Azith 250", slug: "azith-250",
    description: "Macrolide antibiotic for respiratory and skin infections. Azithromycin 250mg.",
    price: 120, stock: 140, image: "https://avatar.vercel.sh/azith", images: [],
    manufacturer: "Beximco Pharma", dosage: "2 tablets day 1, then 1 daily", form: "Tablet",
    prescriptionRequired: true, isActive: true, sellerId: "s2", categoryId: "c10", categorySlug: "antibiotics",
    rating: 4.5, reviewCount: 267,
  },
  {
    id: "med-036", name: "Cipro 500", slug: "cipro-500",
    description: "Fluoroquinolone antibiotic for urinary and respiratory infections. Ciprofloxacin 500mg.",
    price: 95, stock: 0, image: "https://avatar.vercel.sh/cipro", images: [],
    manufacturer: "Incepta Pharma", dosage: "1 tablet twice daily", form: "Tablet",
    prescriptionRequired: true, isActive: true, sellerId: "s1", categoryId: "c10", categorySlug: "antibiotics",
    rating: 4.3, reviewCount: 189,
  },
  {
    id: "med-037", name: "Cephrad 250", slug: "cephrad-250",
    description: "First-generation cephalosporin for skin and soft tissue infections. Cephalexin 250mg.",
    price: 70, stock: 100, image: "https://avatar.vercel.sh/cephrad", images: [],
    manufacturer: "ACI Pharma", dosage: "1 capsule 4 times daily", form: "Capsule",
    prescriptionRequired: true, isActive: true, sellerId: "s2", categoryId: "c10", categorySlug: "antibiotics",
    rating: 4.4, reviewCount: 156,
  },

  // ── First Aid ───────────────────────────────────────────
  {
    id: "med-038", name: "Savlon Antiseptic", slug: "savlon-antiseptic",
    description: "Antiseptic liquid for wound cleaning and infection prevention. Chlorhexidine + Cetrimide.",
    price: 85, stock: 160, image: "https://avatar.vercel.sh/savlon", images: [],
    manufacturer: "ACI Pharma", dosage: "Apply diluted to affected area", form: null,
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c11", categorySlug: "first-aid",
    rating: 4.7, reviewCount: 278, isFeatured: true,
  },
  {
    id: "med-039", name: "Elastic Bandage Roll", slug: "elastic-bandage",
    description: "Stretchable bandage for sprains, strains and wound support. Cotton Elastic 4 inch.",
    price: 45, stock: 200, image: "https://avatar.vercel.sh/bandage", images: [],
    manufacturer: "Healthcare Pharma", dosage: "Wrap firmly around affected area", form: null,
    prescriptionRequired: false, isActive: true, sellerId: "s2", categoryId: "c11", categorySlug: "first-aid",
    rating: 4.2, reviewCount: 98,
  },
  {
    id: "med-040", name: "Burnol Cream", slug: "burnol-cream",
    description: "Antiseptic burn cream for minor burns and scalds. Aminacrine HCI + Cetrimide.",
    price: 60, stock: 110, image: "https://avatar.vercel.sh/burnol", images: [],
    manufacturer: "Renata Pharma", dosage: "Apply gently on burn area", form: "Cream",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c11", categorySlug: "first-aid",
    rating: 4.5, reviewCount: 167,
  },

  // ── Mental Wellness ─────────────────────────────────────
  {
    id: "med-041", name: "Melatonin 3", slug: "melatonin-3",
    description: "Natural sleep aid for insomnia and jet lag. Melatonin 3mg.",
    price: 220, stock: 70, image: "https://avatar.vercel.sh/melatonin", images: [],
    manufacturer: "BioVita", dosage: "1 tablet 30 min before bedtime", form: "Tablet",
    prescriptionRequired: false, isActive: true, sellerId: "s2", categoryId: "c12", categorySlug: "mental-wellness",
    rating: 4.6, reviewCount: 198, isFeatured: true,
  },
  {
    id: "med-042", name: "StressEase", slug: "stress-ease",
    description: "Herbal stress relief with adaptogenic ashwagandha root. Ashwagandha 600mg + B-Complex.",
    price: 350, stock: 45, image: "https://avatar.vercel.sh/stressease", images: [],
    manufacturer: "BioVita", dosage: "1 capsule twice daily", form: "Capsule",
    prescriptionRequired: false, isActive: true, sellerId: "s1", categoryId: "c12", categorySlug: "mental-wellness",
    rating: 4.5, reviewCount: 134,
  },
  {
    id: "med-043", name: "CalmPlus", slug: "calm-plus",
    description: "Promotes relaxation and mental clarity without drowsiness. L-Theanine 200mg + Magnesium.",
    price: 280, stock: 0, image: "https://avatar.vercel.sh/calmplus", images: [],
    manufacturer: "Healthcare Pharma", dosage: "1 capsule daily", form: "Capsule",
    prescriptionRequired: false, isActive: true, sellerId: "s2", categoryId: "c12", categorySlug: "mental-wellness",
    rating: 4.4, reviewCount: 87,
  },
]

/** Get all unique manufacturers */
export const getAllManufacturers = (): string[] => {
  return [...new Set(medicines.map((m) => m.manufacturer))].sort()
}

/** Get all unique forms */
export const getAllForms = (): string[] => {
  return [...new Set(medicines.map((m) => m.form).filter(Boolean))] as string[]
}

/** Get medicines by category slug */
export const getMedicinesByCategory = (slug: string): Medicine[] => {
  return medicines.filter((m) => m.categorySlug === slug && m.isActive)
}
