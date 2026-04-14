export type CustomerStatus = "ACTIVE" | "INACTIVE" | "ON_HOLD" | "BLACKLISTED";
export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "UNQUALIFIED" | "CONVERTED";
export type OpportunityStatus = "OPEN" | "WON" | "LOST" | "ON_HOLD";
export type OpportunityStage = "PROSPECTING" | "NEGOTIATION" | "QUOTED" | "PENDING_DECISION" | "CLOSED_WON" | "CLOSED_LOST";
export type QuoteStatus = "DRAFT" | "SENT" | "VIEWED" | "ACCEPTED" | "REJECTED" | "EXPIRED";
export type ActivityStatus = "PLANNED" | "COMPLETED" | "CANCELLED" | "MISSED";
export type ComplaintStatus = "OPEN" | "UNDER_REVIEW" | "RESOLVED" | "ESCALATED" | "CLOSED";
export type CustomerType = "WHOLESALE" | "RETAILER" | "MECHANIC_SHOP" | "FLEET" | "WALK_IN" | "ONLINE";

export interface ContactPerson {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  role: string; // Ex: Owner, Buyer, Head Mechanic
  mobileNo: string;
  email: string;
  viberId?: string;
  isPrimary: boolean;
}

export interface Customer {
  id: string;
  customerCode: string;
  businessName: string;
  displayName: string;
  ownerName: string;
  contactNo: string;
  email: string;
  customerType: CustomerType;
  assignedSalesRep: string;
  address: string;
  city: string;
  province: string;
  tin: string;
  paymentTerms: string;
  creditLimit: number;
  preferredPriceTier: string;
  status: CustomerStatus;
  notes?: string;
  lastPurchaseDate?: string;
  totalSalesYTD: number;
}

export interface Lead {
  id: string;
  prospectName: string;
  businessName?: string;
  source: string; // FB Ad, Referral, Walk-in
  contactNo: string;
  email?: string;
  interestLevel: "LOW" | "MEDIUM" | "HIGH";
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  assignedTo: string;
}

export interface Opportunity {
  id: string;
  customerId: string;
  name: string;
  projectedValue: number;
  expectedCloseDate: string;
  probability: number; // 0-100
  stage: OpportunityStage;
  status: OpportunityStatus;
  notes?: string;
}

export interface QuotationLine {
  productId: string;
  description: string;
  qty: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface Quotation {
  id: string;
  quoteNo: string;
  customerId: string;
  opportunityId?: string;
  dateCreated: string;
  validUntil: string;
  totalAmount: number;
  status: QuoteStatus;
  lines: QuotationLine[];
}

export interface ActivityLog {
  id: string;
  customerId: string;
  type: "CALL" | "VISIT" | "EMAIL" | "VIBER";
  summary: string;
  notes?: string;
  status: ActivityStatus;
  scheduledDate: string;
  completedDate?: string;
  staffId: string;
}

export interface ComplaintRecord {
  id: string;
  customerId: string;
  category: "DAMAGED" | "LATE" | "WRONG_PART" | "PRICING" | "OTHER";
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: ComplaintStatus;
  dateLogged: string;
  resolvedDate?: string;
  resolutionNotes?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  discountPercentage: number;
}

export interface CustomerCreditProfile {
  customerId: string;
  availableCredit: number;
  outstandingBalance: number;
  overdueAmount: number;
  agingStatus: "CURRENT" | "1-30" | "31-60" | "61-90" | "90+";
}
