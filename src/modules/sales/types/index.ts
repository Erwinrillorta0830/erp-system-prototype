// ─── Status Enums ────────────────────────────────────────────────────────────
export type SalesQuoteStatus     = "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "EXPIRED" | "CONVERTED";
export type SalesOrderStatus     = "DRAFT" | "CONFIRMED" | "PARTIALLY_FULFILLED" | "FULFILLED" | "CANCELLED";
export type InvoiceStatus        = "DRAFT" | "ISSUED" | "PARTIALLY_PAID" | "PAID" | "VOIDED";
export type FulfillmentStatus    = "PENDING" | "PREPARING" | "RELEASED" | "COMPLETED" | "CANCELLED";
export type ReturnStatus         = "DRAFT" | "FOR_APPROVAL" | "APPROVED" | "REJECTED" | "COMPLETED";
export type POSTransactionStatus = "OPEN" | "CHECKED_OUT" | "CANCELLED" | "REFUNDED";
export type SalesChannel         = "WHOLESALE" | "RETAIL" | "WALKIN" | "COUNTER";
export type PaymentMethodType    = "CASH" | "GCASH" | "CARD" | "BANK_TRANSFER" | "CHARGE";
export type ReturnReasonType     = "WRONG_PART" | "WRONG_FITMENT" | "DAMAGED" | "OVER_PURCHASE" | "OTHER";
export type ResolutionType       = "REPLACEMENT" | "CREDIT_MEMO" | "REFUND";

// ─── Core Entities ────────────────────────────────────────────────────────────
export interface SalesPriceTier {
  id: string;
  name: string;
  discountPct: number;  // e.g. 25 = 25% off SRP
}

export interface SalesCustomer {
  id: string;
  customerCode: string;
  businessName: string;
  contactNo: string;
  city: string;
  province: string;
  channel: SalesChannel;
  priceTierId: string;
  paymentTerm: string;       // "COD" | "Net 15" | "Net 30"
  creditLimit: number;
  outstandingBalance: number;
  assignedSalesRep: string;
}

export interface SalesProduct {
  id: string;
  partNo: string;
  description: string;
  brand: string;
  category: string;          // "Piston", "Brake", "Belt", "Filter", etc.
  unit: string;
  srp: number;               // Standard Retail Price
  stockAvailable: number;    // Mock available qty
}

// ─── Quotation ────────────────────────────────────────────────────────────────
export interface SalesQuoteLine {
  id: string;
  productId: string;
  description: string;
  qty: number;
  unitPrice: number;
  discountAmt: number;
  lineTotal: number;
}

export interface SalesQuote {
  id: string;
  quoteNo: string;
  customerId: string;
  assignedSalesRep: string;
  dateCreated: string;
  validUntil: string;
  status: SalesQuoteStatus;
  lines: SalesQuoteLine[];
  remarks?: string;
  grossAmount: number;
  discountAmount: number;
  netAmount: number;
  taxAmount: number;
  totalAmount: number;
}

// ─── Sales Order ──────────────────────────────────────────────────────────────
export interface SalesOrderLine {
  id: string;
  productId: string;
  description: string;
  orderedQty: number;
  releasedQty: number;
  unitPrice: number;
  discountAmt: number;
  lineTotal: number;
  lineStatus: "PENDING" | "PARTIAL" | "FULFILLED";
}

export interface SalesOrder {
  id: string;
  orderNo: string;
  customerId: string;
  quotationRef?: string;
  channel: SalesChannel;
  assignedSalesRep: string;
  warehouseId: string;
  paymentTerm: string;
  priceTierId: string;
  transactionDate: string;
  status: SalesOrderStatus;
  lines: SalesOrderLine[];
  remarks?: string;
  grossAmount: number;
  discountAmount: number;
  netAmount: number;
  taxAmount: number;
  totalAmount: number;
}

// ─── POS / Walk-in ────────────────────────────────────────────────────────────
export interface POSCartItem {
  productId: string;
  partNo: string;
  description: string;
  qty: number;
  unitPrice: number;
  discountAmt: number;
  lineTotal: number;
}

export interface POSTransaction {
  id: string;
  transactionNo: string;
  cashierId: string;
  walkInName?: string;
  transactionDate: string;
  status: POSTransactionStatus;
  paymentMethod: PaymentMethodType;
  items: POSCartItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  amountTendered?: number;
  changeAmount?: number;
}

// ─── Invoice ──────────────────────────────────────────────────────────────────
export interface SalesInvoiceLine {
  id: string;
  productId: string;
  description: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

export interface SalesInvoice {
  id: string;
  invoiceNo: string;
  salesOrderRef?: string;
  posTransactionRef?: string;
  customerId?: string;
  walkInName?: string;
  channel: SalesChannel;
  issueDate: string;
  dueDate?: string;
  status: InvoiceStatus;
  lines: SalesInvoiceLine[];
  grossAmount: number;
  discountAmount: number;
  netAmount: number;
  taxAmount: number;
  totalAmount: number;
  amountPaid: number;
  balance: number;
}

// ─── Fulfillment ──────────────────────────────────────────────────────────────
export interface FulfillmentLine {
  id: string;
  productId: string;
  description: string;
  orderedQty: number;
  releasedQty: number;
  pendingQty: number;
}

export interface FulfillmentRecord {
  id: string;
  fulfillmentNo: string;
  salesOrderRef: string;
  customerId: string;
  warehouseId: string;
  status: FulfillmentStatus;
  assignedTo: string;
  releaseDate?: string;
  lines: FulfillmentLine[];
}

// ─── Sales Return ─────────────────────────────────────────────────────────────
export interface SalesReturnLine {
  id: string;
  productId: string;
  description: string;
  returnQty: number;
  unitPrice: number;
  lineTotal: number;
  reason: ReturnReasonType;
  remarks?: string;
}

export interface SalesReturn {
  id: string;
  returnNo: string;
  invoiceRef: string;
  salesOrderRef?: string;
  customerId: string;
  status: ReturnStatus;
  resolutionType: ResolutionType;
  dateLogged: string;
  approvedDate?: string;
  lines: SalesReturnLine[];
  totalReturnAmount: number;
  remarks?: string;
}

// ─── Discount / Promo ─────────────────────────────────────────────────────────
export interface DiscountRule {
  id: string;
  promoName: string;
  promoType: "FLAT" | "PERCENT" | "VOLUME";
  discountValue: number;   // Amount or percentage
  minQty?: number;         // For VOLUME type
  validFrom: string;
  validUntil: string;
  appliesToChannel?: SalesChannel;
  isActive: boolean;
}
