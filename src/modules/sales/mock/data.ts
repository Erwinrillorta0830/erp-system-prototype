import {
  SalesPriceTier, SalesCustomer, SalesProduct,
  SalesQuote, SalesOrder, POSTransaction,
  SalesInvoice, FulfillmentRecord, SalesReturn, DiscountRule,
} from "../types";

// ─── Price Tiers ─────────────────────────────────────────────────────────────
export const MOCK_PRICE_TIERS: SalesPriceTier[] = [
  { id: "pt-1", name: "Wholesale VIP",     discountPct: 25 },
  { id: "pt-2", name: "Standard Retailer", discountPct: 15 },
  { id: "pt-3", name: "Mechanic Shop",     discountPct: 10 },
  { id: "pt-4", name: "Walk-in / Public",  discountPct: 0  },
];

// ─── Customers ───────────────────────────────────────────────────────────────
export const MOCK_SALES_CUSTOMERS: SalesCustomer[] = [
  {
    id: "SC-001", customerCode: "WH-MNL-001",
    businessName: "Metro Manila Auto Supply",
    contactNo: "0917-111-2222", city: "Manila", province: "Metro Manila",
    channel: "WHOLESALE", priceTierId: "pt-1", paymentTerm: "Net 30",
    creditLimit: 1_000_000, outstandingBalance: 126_000,
    assignedSalesRep: "John Sales",
  },
  {
    id: "SC-002", customerCode: "MS-CEB-001",
    businessName: "Speedy Fix Motor Workshop",
    contactNo: "0920-333-4444", city: "Mandaue City", province: "Cebu",
    channel: "RETAIL", priceTierId: "pt-3", paymentTerm: "COD",
    creditLimit: 50_000, outstandingBalance: 8_568,
    assignedSalesRep: "Maria Rep",
  },
  {
    id: "SC-003", customerCode: "RT-DVO-001",
    businessName: "Davao Parts Center",
    contactNo: "0918-555-6666", city: "Davao City", province: "Davao del Sur",
    channel: "RETAIL", priceTierId: "pt-2", paymentTerm: "Net 15",
    creditLimit: 250_000, outstandingBalance: 0,
    assignedSalesRep: "John Sales",
  },
];

// ─── Products (Motor Parts) ──────────────────────────────────────────────────
export const MOCK_SALES_PRODUCTS: SalesProduct[] = [
  { id: "P-001", partNo: "HW125-PISTON-KIT", description: "Honda Wave 125 Piston Kit (STD)", brand: "OEM", category: "Piston", unit: "Set", srp: 420, stockAvailable: 180 },
  { id: "P-002", partNo: "NMAX155-BELT",      description: "Yamaha NMAX 155 Drive Belt",       brand: "OEM", category: "Belt",   unit: "Pcs", srp: 1_150, stockAvailable: 45  },
  { id: "P-003", partNo: "BRK-FRT-BREMBO-01", description: "Brembo Brake Pads Front (Universal)", brand: "Brembo",category:"Brake", unit:"Set", srp:195, stockAvailable: 320 },
  { id: "P-004", partNo: "ADV150-AIRFLT",     description: "Honda ADV 150 Air Filter",          brand: "OEM", category: "Filter",unit: "Pcs", srp: 310, stockAvailable: 95  },
  { id: "P-005", partNo: "MIO-CLUTCH-ASM",    description: "Yamaha Mio Clutch Assembly",        brand: "OEM", category: "Clutch",unit: "Set", srp: 890, stockAvailable: 60  },
  { id: "P-006", partNo: "BEAT-OIL-SEAL",     description: "Honda Beat Oil Seal Set",           brand: "OEM", category: "Seal",  unit: "Set", srp: 155, stockAvailable: 200 },
  { id: "P-007", partNo: "UNV-SPK-PLG-D8EA",  description: "NGK Spark Plug D8EA (Universal)",   brand: "NGK", category: "Ignition",unit:"Pcs",srp:85,  stockAvailable: 500 },
  { id: "P-008", partNo: "BRG-6202-ZZ",       description: "Ball Bearing 6202ZZ",               brand: "SKF", category: "Bearing",unit:"Pcs",srp:95,  stockAvailable: 400 },
  { id: "P-009", partNo: "NMAX-FORK-SEAL",    description: "Yamaha NMAX Fork Oil Seal",         brand: "OEM", category: "Seal",  unit: "Pcs", srp: 185, stockAvailable: 75  },
  { id: "P-010", partNo: "CRB-CARB-WAVE110",  description: "Honda Wave 110 Carburetor Assembly",brand: "OEM", category: "Fuel",  unit: "Pcs", srp: 1_850, stockAvailable: 22 },
];

// ─── Sales Quotations ────────────────────────────────────────────────────────
export const MOCK_QUOTES: SalesQuote[] = [
  {
    id: "qt-001", quoteNo: "QT-2026-0045",
    customerId: "SC-001", assignedSalesRep: "John Sales",
    dateCreated: "2026-04-12", validUntil: "2026-05-12",
    status: "SENT",
    lines: [
      { id: "ql-1", productId: "P-001", description: "Honda Wave 125 Piston Kit (STD)", qty: 200, unitPrice: 315, discountAmt: 0, lineTotal: 63_000 },
      { id: "ql-2", productId: "P-003", description: "Brembo Brake Pads Front",         qty: 500, unitPrice: 146, discountAmt: 0, lineTotal: 73_000 },
    ],
    grossAmount: 136_000, discountAmount: 11_000, netAmount: 125_000,
    taxAmount: 15_000, totalAmount: 140_000,
    remarks: "Bulk order for Q2 stock-up. 25% tier discount applied.",
  },
  {
    id: "qt-002", quoteNo: "QT-2026-0046",
    customerId: "SC-003", assignedSalesRep: "John Sales",
    dateCreated: "2026-04-10", validUntil: "2026-04-25",
    status: "ACCEPTED",
    lines: [
      { id: "ql-3", productId: "P-007", description: "NGK Spark Plug D8EA",    qty: 100, unitPrice: 72, discountAmt: 0, lineTotal: 7_200 },
      { id: "ql-4", productId: "P-008", description: "Ball Bearing 6202ZZ",    qty: 200, unitPrice: 80, discountAmt: 0, lineTotal: 16_000 },
    ],
    grossAmount: 23_200, discountAmount: 3_480, netAmount: 19_720,
    taxAmount: 2_366, totalAmount: 22_086,
    remarks: "Retailer mid-month restock.",
  },
  {
    id: "qt-003", quoteNo: "QT-2026-0044",
    customerId: "SC-001", assignedSalesRep: "Maria Rep",
    dateCreated: "2026-03-25", validUntil: "2026-04-10",
    status: "EXPIRED",
    lines: [
      { id: "ql-5", productId: "P-002", description: "Yamaha NMAX 155 Drive Belt", qty: 50, unitPrice: 862, discountAmt: 0, lineTotal: 43_100 },
    ],
    grossAmount: 43_100, discountAmount: 10_775, netAmount: 32_325,
    taxAmount: 3_879, totalAmount: 36_204,
  },
];

// ─── Sales Orders ─────────────────────────────────────────────────────────────
export const MOCK_SALES_ORDERS: SalesOrder[] = [
  {
    id: "so-001", orderNo: "SO-2026-0088",
    customerId: "SC-001", quotationRef: "QT-2026-0045",
    channel: "WHOLESALE", assignedSalesRep: "John Sales",
    warehouseId: "WH-MNL", paymentTerm: "Net 30", priceTierId: "pt-1",
    transactionDate: "2026-04-13", status: "PARTIALLY_FULFILLED",
    lines: [
      { id: "sl-1", productId: "P-001", description: "Honda Wave 125 Piston Kit (STD)", orderedQty: 200, releasedQty: 150, unitPrice: 315, discountAmt: 0, lineTotal: 63_000, lineStatus: "PARTIAL" },
      { id: "sl-2", productId: "P-003", description: "Brembo Brake Pads Front",         orderedQty: 500, releasedQty: 500, unitPrice: 146, discountAmt: 0, lineTotal: 73_000, lineStatus: "FULFILLED" },
    ],
    grossAmount: 136_000, discountAmount: 11_000, netAmount: 125_000, taxAmount: 15_000, totalAmount: 140_000,
    remarks: "50 pcs of Piston Kit held for next shipment.",
  },
  {
    id: "so-002", orderNo: "SO-2026-0089",
    customerId: "SC-002", channel: "RETAIL",
    assignedSalesRep: "Maria Rep", warehouseId: "WH-CEB",
    paymentTerm: "COD", priceTierId: "pt-3",
    transactionDate: "2026-04-14", status: "FULFILLED",
    lines: [
      { id: "sl-3", productId: "P-007", description: "NGK Spark Plug D8EA", orderedQty: 10, releasedQty: 10, unitPrice: 77, discountAmt: 0, lineTotal: 770, lineStatus: "FULFILLED" },
      { id: "sl-4", productId: "P-008", description: "Ball Bearing 6202ZZ",  orderedQty: 20, releasedQty: 20, unitPrice: 86, discountAmt: 0, lineTotal: 1_720, lineStatus: "FULFILLED" },
    ],
    grossAmount: 2_490, discountAmount: 249, netAmount: 2_241, taxAmount: 269, totalAmount: 2_510,
  },
  {
    id: "so-003", orderNo: "SO-2026-0090",
    customerId: "SC-003", quotationRef: "QT-2026-0046",
    channel: "RETAIL", assignedSalesRep: "John Sales",
    warehouseId: "WH-MNL", paymentTerm: "Net 15", priceTierId: "pt-2",
    transactionDate: "2026-04-14", status: "CONFIRMED",
    lines: [
      { id: "sl-5", productId: "P-007", description: "NGK Spark Plug D8EA",  orderedQty: 100, releasedQty: 0, unitPrice: 72,  discountAmt: 0, lineTotal: 7_200,  lineStatus: "PENDING" },
      { id: "sl-6", productId: "P-008", description: "Ball Bearing 6202ZZ",  orderedQty: 200, releasedQty: 0, unitPrice: 80,  discountAmt: 0, lineTotal: 16_000, lineStatus: "PENDING" },
    ],
    grossAmount: 23_200, discountAmount: 3_480, netAmount: 19_720, taxAmount: 2_366, totalAmount: 22_086,
  },
];

// ─── POS Transactions ─────────────────────────────────────────────────────────
export const MOCK_POS_TRANSACTIONS: POSTransaction[] = [
  {
    id: "pos-001", transactionNo: "POS-2026-1042",
    cashierId: "EMP-003", walkInName: "Juan dela Cruz",
    transactionDate: "2026-04-14T14:30:00", status: "CHECKED_OUT",
    paymentMethod: "CASH",
    items: [
      { productId: "P-004", partNo: "ADV150-AIRFLT",   description: "Honda ADV 150 Air Filter",    qty: 1, unitPrice: 310, discountAmt: 0, lineTotal: 310 },
      { productId: "P-008", partNo: "BRG-6202-ZZ",     description: "Ball Bearing 6202ZZ",          qty: 3, unitPrice: 95,  discountAmt: 0, lineTotal: 285 },
    ],
    subtotal: 595, discountAmount: 0, taxAmount: 71, totalAmount: 666,
    amountTendered: 700, changeAmount: 34,
  },
  {
    id: "pos-002", transactionNo: "POS-2026-1043",
    cashierId: "EMP-003", walkInName: "Mang Rolando",
    transactionDate: "2026-04-14T15:10:00", status: "CHECKED_OUT",
    paymentMethod: "GCASH",
    items: [
      { productId: "P-007", partNo: "UNV-SPK-PLG-D8EA", description: "NGK Spark Plug D8EA",         qty: 4, unitPrice: 85, discountAmt: 0, lineTotal: 340 },
      { productId: "P-006", partNo: "BEAT-OIL-SEAL",    description: "Honda Beat Oil Seal Set",      qty: 2, unitPrice: 155, discountAmt: 0, lineTotal: 310 },
    ],
    subtotal: 650, discountAmount: 0, taxAmount: 78, totalAmount: 728,
  },
  {
    id: "pos-003", transactionNo: "POS-2026-1044",
    cashierId: "EMP-005", walkInName: undefined,
    transactionDate: "2026-04-14T16:05:00", status: "OPEN",
    paymentMethod: "CASH",
    items: [],
    subtotal: 0, discountAmount: 0, taxAmount: 0, totalAmount: 0,
  },
];

// ─── Invoices ─────────────────────────────────────────────────────────────────
export const MOCK_INVOICES: SalesInvoice[] = [
  {
    id: "inv-001", invoiceNo: "INV-2026-0321",
    salesOrderRef: "SO-2026-0088", customerId: "SC-001",
    channel: "WHOLESALE", issueDate: "2026-04-13", dueDate: "2026-05-13",
    status: "PARTIALLY_PAID",
    lines: [
      { id: "il-1", productId: "P-001", description: "Honda Wave 125 Piston Kit (STD)", qty: 150, unitPrice: 315, lineTotal: 47_250 },
      { id: "il-2", productId: "P-003", description: "Brembo Brake Pads Front",         qty: 500, unitPrice: 146, lineTotal: 73_000 },
    ],
    grossAmount: 120_250, discountAmount: 11_000, netAmount: 109_250, taxAmount: 13_110, totalAmount: 122_360,
    amountPaid: 60_000, balance: 62_360,
  },
  {
    id: "inv-002", invoiceNo: "INV-2026-0322",
    salesOrderRef: "SO-2026-0089", customerId: "SC-002",
    channel: "RETAIL", issueDate: "2026-04-14",
    status: "PAID",
    lines: [
      { id: "il-3", productId: "P-007", description: "NGK Spark Plug D8EA", qty: 10, unitPrice: 77,  lineTotal: 770  },
      { id: "il-4", productId: "P-008", description: "Ball Bearing 6202ZZ",  qty: 20, unitPrice: 86,  lineTotal: 1_720 },
    ],
    grossAmount: 2_490, discountAmount: 249, netAmount: 2_241, taxAmount: 269, totalAmount: 2_510,
    amountPaid: 2_510, balance: 0,
  },
  {
    id: "inv-003", invoiceNo: "POS-INV-2026-1042",
    posTransactionRef: "POS-2026-1042", walkInName: "Juan dela Cruz",
    channel: "WALKIN", issueDate: "2026-04-14",
    status: "PAID",
    lines: [
      { id: "il-5", productId: "P-004", description: "Honda ADV 150 Air Filter", qty: 1, unitPrice: 310, lineTotal: 310 },
      { id: "il-6", productId: "P-008", description: "Ball Bearing 6202ZZ",       qty: 3, unitPrice: 95,  lineTotal: 285 },
    ],
    grossAmount: 595, discountAmount: 0, netAmount: 595, taxAmount: 71, totalAmount: 666,
    amountPaid: 666, balance: 0,
  },
];

// ─── Fulfillment Records ──────────────────────────────────────────────────────
export const MOCK_FULFILLMENTS: FulfillmentRecord[] = [
  {
    id: "ff-001", fulfillmentNo: "FF-2026-0088A",
    salesOrderRef: "SO-2026-0088", customerId: "SC-001",
    warehouseId: "WH-MNL", status: "COMPLETED",
    assignedTo: "Warehouse Staff A", releaseDate: "2026-04-13",
    lines: [
      { id: "ffl-1", productId: "P-001", description: "Honda Wave 125 Piston Kit (STD)", orderedQty: 200, releasedQty: 150, pendingQty: 50 },
      { id: "ffl-2", productId: "P-003", description: "Brembo Brake Pads Front",         orderedQty: 500, releasedQty: 500, pendingQty: 0  },
    ],
  },
  {
    id: "ff-002", fulfillmentNo: "FF-2026-0090A",
    salesOrderRef: "SO-2026-0090", customerId: "SC-003",
    warehouseId: "WH-MNL", status: "PENDING",
    assignedTo: "Warehouse Staff B",
    lines: [
      { id: "ffl-3", productId: "P-007", description: "NGK Spark Plug D8EA",  orderedQty: 100, releasedQty: 0, pendingQty: 100 },
      { id: "ffl-4", productId: "P-008", description: "Ball Bearing 6202ZZ",  orderedQty: 200, releasedQty: 0, pendingQty: 200 },
    ],
  },
];

// ─── Sales Returns ────────────────────────────────────────────────────────────
export const MOCK_RETURNS: SalesReturn[] = [
  {
    id: "rtn-001", returnNo: "RTN-2026-0012",
    invoiceRef: "INV-2026-0321", salesOrderRef: "SO-2026-0088",
    customerId: "SC-001", status: "APPROVED",
    resolutionType: "REPLACEMENT", dateLogged: "2026-04-14",
    lines: [
      { id: "rl-1", productId: "P-001", description: "Honda Wave 125 Piston Kit (STD)", returnQty: 5, unitPrice: 315, lineTotal: 1_575, reason: "WRONG_FITMENT", remarks: "Customer ordered STD bore; actual engine needs +0.25" },
    ],
    totalReturnAmount: 1_575,
    remarks: "Replacement stock to be sourced from next Thailand shipment.",
  },
];

// ─── Discount Rules ───────────────────────────────────────────────────────────
export const MOCK_DISCOUNT_RULES: DiscountRule[] = [
  { id: "dr-001", promoName: "Summer Brake Promo",    promoType: "PERCENT", discountValue: 10, validFrom: "2026-04-01", validUntil: "2026-04-30", appliesToChannel: "WALKIN",    isActive: true  },
  { id: "dr-002", promoName: "Volume Buy 50+ Piston", promoType: "VOLUME",  discountValue: 5,  minQty: 50,            validFrom: "2026-04-01", validUntil: "2026-06-30", appliesToChannel: "WHOLESALE", isActive: true  },
  { id: "dr-003", promoName: "Holy Week Flash Sale",  promoType: "FLAT",    discountValue: 100, validFrom: "2026-04-17", validUntil: "2026-04-20",                           isActive: false },
];
