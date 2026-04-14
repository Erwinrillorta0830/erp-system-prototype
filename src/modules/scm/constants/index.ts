export const SCM_STATUSES = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PROBATIONARY: "PROBATIONARY",
} as const;

export const PR_STATUSES = {
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CONVERTED: "CONVERTED",
} as const;

export const PO_STATUSES = {
  DRAFT: "DRAFT",
  SENT: "SENT",
  CONFIRMED: "CONFIRMED",
  PARTIAL: "PARTIAL",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export const SHIPMENT_STATUSES = {
  BOOKED: "BOOKED",
  SAILED: "SAILED",
  ARRIVED_PORT: "ARRIVED_PORT",
  IN_CUSTOMS: "IN_CUSTOMS",
  DELIVERED: "DELIVERED",
} as const;

export const RECEIVING_STATUSES = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  DISCREPANCY: "DISCREPANCY",
} as const;

export const TRANSFER_STATUSES = {
  REQUESTED: "REQUESTED",
  IN_TRANSIT: "IN_TRANSIT",
  RECEIVED: "RECEIVED",
  CANCELLED: "CANCELLED",
} as const;

export const CURRENCIES = {
  THB: { code: "THB", symbol: "฿", name: "Thai Baht" },
  PHP: { code: "PHP", symbol: "₱", name: "Philippine Peso" },
  USD: { code: "USD", symbol: "$", name: "US Dollar" },
};

export const INCOTERMS = ["FOB", "CIF", "EXW"] as const;

export const COST_TYPES = {
  FREIGHT: "FREIGHT",
  DUTY: "DUTY",
  VAT: "VAT",
  BROKERAGE: "BROKERAGE",
  INSURANCE: "INSURANCE",
} as const;
