export type SCMStatus = "ACTIVE" | "INACTIVE" | "PROBATIONARY";
export type PRStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED" | "CONVERTED";
export type POStatus = "DRAFT" | "SENT" | "CONFIRMED" | "PARTIAL" | "COMPLETED" | "CANCELLED";
export type ShipmentStatus = "BOOKED" | "SAILED" | "ARRIVED_PORT" | "IN_CUSTOMS" | "DELIVERED";
export type ReceivingStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "DISCREPANCY";
export type TransferStatus = "REQUESTED" | "IN_TRANSIT" | "RECEIVED" | "CANCELLED";
export type AdjustmentStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "POSTED" | "CANCELLED";

export interface Supplier {
  id: string;
  code: string;
  name: string;
  country: string;
  currency: "THB" | "PHP" | "USD";
  email: string;
  phone: string;
  address: string;
  status: SCMStatus;
  paymentTerms: string;
  avgLeadTimeDays: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
}

export interface UnitOfMeasure {
  id: string;
  name: string; // Piece, Box, Set, Roll
  abbreviation: string;
}

export interface Product {
  id: string;
  sku: string;
  partNumberThai: string;
  description: string;
  categoryId: string;
  uomId: string;
  weight: number; // in kg
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  minOrderQty: number;
  primarySupplierId: string;
  image?: string;
  brand?: string;
  srp: number; // Unified Retail Price
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  type: "MAIN" | "BRANCH" | "RETAIL";
  contactPerson: string;
  contactPhone: string;
}

export interface PurchaseOrderLine {
  id: string;
  productId: string;
  qtyOrdered: number;
  qtyReceived: number;
  unitCost: number; // In Supplier Currency
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  orderDate: string;
  expectedDate: string;
  status: POStatus;
  currency: string;
  exchangeRate: number; // Conversion to PHP
  incoterms: "FOB" | "CIF" | "EXW";
  totalAmount: number;
  lines: PurchaseOrderLine[];
}

export interface ShipmentTracking {
  id: string;
  shipmentNumber: string;
  poIds: string[];
  vesselName: string;
  containerNumber: string;
  carrier: string;
  portOfLoading: string;
  portOfDischarge: string;
  etd: string;
  eta: string;
  status: ShipmentStatus;
  lastUpdate: string;
}

export interface ShipmentCost {
  id: string;
  shipmentId: string;
  costType: "FREIGHT" | "DUTY" | "VAT" | "BROKERAGE" | "INSURANCE";
  amount: number; // In PHP
  description: string;
}

export interface ReceivingRecord {
  id: string;
  poId: string;
  warehouseId: string;
  receivedBy: string;
  dateReceived: string;
  status: ReceivingStatus;
  lines: {
    productId: string;
    qtyReceived: number;
    qtyDamaged: number;
    notes?: string;
  }[];
}

export interface InventoryStock {
  productId: string;
  warehouseId: string;
  qtyOnHand: number;
  qtyReserved: number;
  qtyInTransit: number;
  reorderPoint: number;
  safetyStock: number;
  binLocation?: string;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  warehouseId: string;
  type: "IN" | "OUT" | "ADJ" | "TRF";
  referenceId: string; // PO Number, TRF Number, etc.
  qty: number;
  balanceAfter: number;
  timestamp: string;
  userId: string;
  reason?: string;
}

export interface StockTransfer {
  id: string;
  transferNumber: string;
  sourceWarehouseId: string;
  destinationWarehouseId: string;
  status: TransferStatus;
  dateRequested: string;
  dateReceived?: string;
  items: {
    productId: string;
    qty: number;
  }[];
}
