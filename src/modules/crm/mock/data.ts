import { 
  Customer, ContactPerson, Lead, Opportunity, 
  Quotation, ActivityLog, ComplaintRecord, PricingTier 
} from "../types";

export const MOCK_PRICING_TIERS: PricingTier[] = [
  { id: "tier-1", name: "Wholesale VIP", discountPercentage: 25 },
  { id: "tier-2", name: "Standard Retailer", discountPercentage: 15 },
  { id: "tier-3", name: "Mechanic / Workshop", discountPercentage: 10 },
  { id: "tier-4", name: "General Public", discountPercentage: 0 },
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "cust-001",
    customerCode: "WH-MNL-001",
    businessName: "Metro Manila Auto Supply",
    displayName: "Metro Manila Auto",
    ownerName: "Ricardo Lim",
    contactNo: "0917-111-2222",
    email: "ricardo@metromanila-auto.ph",
    customerType: "WHOLESALE",
    assignedSalesRep: "John Sales",
    address: "123 Rizal Ave, Santa Cruz",
    city: "Manila",
    province: "Metro Manila",
    tin: "123-456-789-000",
    paymentTerms: "Net 30",
    creditLimit: 1000000,
    preferredPriceTier: "tier-1",
    status: "ACTIVE",
    lastPurchaseDate: "2026-03-15",
    totalSalesYTD: 4500000,
  },
  {
    id: "cust-002",
    customerCode: "MS-CEB-001",
    businessName: "Speedy Fix Motor Workshop",
    displayName: "Speedy Fix Cebu",
    ownerName: "Elena Garcia",
    contactNo: "0920-333-4444",
    email: "elena@speedyfix.ph",
    customerType: "MECHANIC_SHOP",
    assignedSalesRep: "Maria Representative",
    address: "456 AS Fortuna St",
    city: "Mandaue City",
    province: "Cebu",
    tin: "987-654-321-000",
    paymentTerms: "COD",
    creditLimit: 50000,
    preferredPriceTier: "tier-3",
    status: "ACTIVE",
    lastPurchaseDate: "2026-04-01",
    totalSalesYTD: 125000,
  },
  {
    id: "cust-003",
    customerCode: "RT-DVO-001",
    businessName: "Davao Parts Center",
    displayName: "Davao Parts",
    ownerName: "Antonio Santos",
    contactNo: "0918-555-6666",
    email: "antonio@davaoparts.ph",
    customerType: "RETAILER",
    assignedSalesRep: "John Sales",
    address: "789 JP Laurel Ave",
    city: "Davao City",
    province: "Davao del Sur",
    tin: "555-444-333-000",
    paymentTerms: "Net 15",
    creditLimit: 250000,
    preferredPriceTier: "tier-2",
    status: "ON_HOLD",
    lastPurchaseDate: "2026-02-20",
    totalSalesYTD: 850000,
  },
];

export const MOCK_CONTACTS: ContactPerson[] = [
  {
    id: "cont-001",
    customerId: "cust-001",
    firstName: "Ricardo",
    lastName: "Lim",
    role: "Proprietor",
    mobileNo: "0917-111-2222",
    email: "ricardo@metromanila-auto.ph",
    viberId: "ricardo_lim_88",
    isPrimary: true,
  },
  {
    id: "cont-002",
    customerId: "cust-001",
    firstName: "Ana",
    lastName: "Santos",
    role: "Purchasing Manager",
    mobileNo: "0917-111-3333",
    email: "purchasing@metromanila-auto.ph",
    isPrimary: false,
  },
];

export const MOCK_LEADS: Lead[] = [
  {
    id: "lead-001",
    prospectName: "Mario Rodriguez",
    businessName: "Mario's Moto Service",
    source: "Facebook Ad",
    contactNo: "0915-777-8888",
    interestLevel: "HIGH",
    status: "NEW",
    createdAt: "2026-04-10",
    assignedTo: "John Sales",
  },
  {
    id: "lead-002",
    prospectName: "Grace Tan",
    businessName: "Sunshine Resale Parts",
    source: "Referral",
    contactNo: "0916-999-0000",
    interestLevel: "MEDIUM",
    status: "CONTACTED",
    createdAt: "2026-04-05",
    assignedTo: "Maria Representative",
  },
];

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-001",
    customerId: "cust-001",
    name: "Annual Fleet Supply Contract",
    projectedValue: 1500000,
    expectedCloseDate: "2026-05-15",
    probability: 60,
    stage: "NEGOTIATION",
    status: "OPEN",
  },
];

export const MOCK_QUOTES: Quotation[] = [
  {
    id: "quo-001",
    quoteNo: "QT-2026-0045",
    customerId: "cust-001",
    dateCreated: "2026-04-12",
    validUntil: "2026-05-12",
    totalAmount: 125000,
    status: "SENT",
    lines: [
      { productId: "prod-001", description: "Honda Wave 125 Piston Kit", qty: 200, unitPrice: 350, discount: 50, total: 60000 },
      { productId: "prod-003", description: "Brembo Brake Pads (Front)", qty: 500, unitPrice: 150, discount: 20, total: 65000 },
    ],
  },
];

export const MOCK_ACTIVITIES: ActivityLog[] = [
  {
    id: "act-001",
    customerId: "cust-001",
    type: "VISIT",
    summary: "Quarterly Review & Order Planning",
    status: "COMPLETED",
    scheduledDate: "2026-04-01",
    completedDate: "2026-04-01",
    staffId: "John Sales",
    notes: "Ricardo is interested in expanding to Honda ADV parts.",
  },
  {
    id: "act-002",
    customerId: "cust-002",
    type: "CALL",
    summary: "Inquiry on NMAX Belt stock",
    status: "PLANNED",
    scheduledDate: "2026-04-15",
    staffId: "Maria Representative",
  },
];

export const MOCK_COMPLAINTS: ComplaintRecord[] = [
  {
    id: "comp-001",
    customerId: "cust-001",
    category: "DAMAGED",
    description: "3 sets of Piston kits arrived with bent rings.",
    priority: "HIGH",
    status: "UNDER_REVIEW",
    dateLogged: "2026-04-10",
  },
];
