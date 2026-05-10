import { 
  Supplier, Product, ProductCategory, UnitOfMeasure, Warehouse, 
  PurchaseOrder, ShipmentTracking, InventoryStock, InventoryMovement 
} from "../types";

export const MOCK_CATEGORIES: ProductCategory[] = [
  { id: "cat-eng", name: "Engine Parts", description: "Internal engine components" },
  { id: "cat-cha", name: "Chassis & Body", description: "Frames, fairings, and bodywork" },
  { id: "cat-ele", name: "Electrical", description: "Wiring, ECUs, and lights" },
  { id: "cat-tra", name: "Transmission", description: "Belts, chains, and sprockets" },
  { id: "cat-bra", name: "Braking System", description: "Pads, discs, and calipers" },
];

export const MOCK_UOMS: UnitOfMeasure[] = [
  { id: "uom-pc", name: "Piece", abbreviation: "pc" },
  { id: "uom-bx", name: "Box", abbreviation: "box" },
  { id: "uom-st", name: "Set", abbreviation: "set" },
];

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: "sup-001",
    code: "SIAM-MOTO",
    name: "Siam Moto-Tech Co., Ltd.",
    country: "Thailand",
    currency: "THB",
    email: "export@siammoto.th",
    phone: "+66 2 123 4567",
    address: "123 Ratchadaphisek Rd, Din Daeng, Bangkok 10400, Thailand",
    status: "ACTIVE",
    paymentTerms: "Net 30",
    avgLeadTimeDays: 21,
  },
  {
    id: "sup-002",
    code: "BKK-PARTS",
    name: "Bangkok Parts Global",
    country: "Thailand",
    currency: "THB",
    email: "sales@bkkparts.com",
    phone: "+66 38 456 789",
    address: "Chonburi Industrial Estate, Chon Buri 20000, Thailand",
    status: "ACTIVE",
    paymentTerms: "LC at Sight",
    avgLeadTimeDays: 35,
  },
  {
    id: "sup-003",
    code: "PH-LOGI",
    name: "PH-Thai Logistics Services",
    country: "Philippines",
    currency: "PHP",
    email: "ops@phthailogistics.ph",
    phone: "+63 2 8456 7890",
    address: "Port Area, Manila, Philippines",
    status: "ACTIVE",
    paymentTerms: "COD",
    avgLeadTimeDays: 3,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    sku: "W125-PST-KIT",
    partNumberThai: "13101-KPH-900",
    description: "Honda Wave 125 Piston Kit (Standard)",
    categoryId: "cat-eng",
    uomId: "uom-st",
    weight: 0.45,
    dimensions: { length: 15, width: 10, height: 10 },
    minOrderQty: 50,
    primarySupplierId: "sup-001",
    brand: "OEM",
    srp: 420,
  },
  {
    id: "prod-002",
    sku: "NMX-BELT-V",
    partNumberThai: "2DP-E7641-00",
    description: "Yamaha NMAX Drive Belt (V-Belt)",
    categoryId: "cat-tra",
    uomId: "uom-pc",
    weight: 0.3,
    dimensions: { length: 30, width: 20, height: 5 },
    minOrderQty: 30,
    primarySupplierId: "sup-002",
    brand: "OEM",
    srp: 1150,
  },
  {
    id: "prod-003",
    sku: "BRM-PD-FRONT",
    partNumberThai: "BR-7788-X",
    description: "Brembo Brake Pads (Front) - Sport Series",
    categoryId: "cat-bra",
    uomId: "uom-st",
    weight: 0.2,
    dimensions: { length: 12, width: 8, height: 4 },
    minOrderQty: 100,
    primarySupplierId: "sup-001",
    brand: "Brembo",
    srp: 195,
  },
  {
    id: "prod-004",
    sku: "CLICK-FIL-OIL",
    partNumberThai: "15410-KYJ-901",
    description: "Honda Click 150/125i Oil Filter",
    categoryId: "cat-eng",
    uomId: "uom-pc",
    weight: 0.15,
    dimensions: { length: 8, width: 8, height: 8 },
    minOrderQty: 200,
    primarySupplierId: "sup-002",
    brand: "OEM",
    srp: 310,
  },
];

export const MOCK_WAREHOUSES: Warehouse[] = [
  {
    id: "wh-main",
    name: "Manila Main Hub",
    location: "Quezon City, Metro Manila",
    type: "MAIN",
    contactPerson: "Juan Dela Cruz",
    contactPhone: "+63 917 123 4567",
  },
  {
    id: "wh-cebu",
    name: "Cebu Distribution Center",
    location: "Mandaue City, Cebu",
    type: "BRANCH",
    contactPerson: "Maria Santos",
    contactPhone: "+63 918 987 6543",
  },
];

export const MOCK_POS: PurchaseOrder[] = [
  {
    id: "po-1001",
    poNumber: "PO-2026-001",
    supplierId: "sup-001",
    orderDate: "2026-03-01",
    expectedDate: "2026-03-25",
    status: "CONFIRMED",
    currency: "THB",
    exchangeRate: 1.58,
    incoterms: "FOB",
    totalAmount: 45000,
    lines: [
      { id: "pol-1", productId: "prod-001", qtyOrdered: 100, qtyReceived: 0, unitCost: 350 },
      { id: "pol-2", productId: "prod-003", qtyOrdered: 200, qtyReceived: 0, unitCost: 50 },
    ],
  },
];

export const MOCK_SHIPMENTS: ShipmentTracking[] = [
  {
    id: "sh-2001",
    shipmentNumber: "SHIP-TH-PH-001",
    poIds: ["po-1001"],
    vesselName: "MV SIAMESE PRIDE",
    containerNumber: "TCNU8822991",
    carrier: "Maersk Line",
    portOfLoading: "Laem Chabang, Thailand",
    portOfDischarge: "Manila North Harbor, Philippines",
    etd: "2026-03-05",
    eta: "2026-03-20",
    status: "SAILED",
    lastUpdate: "2026-03-10T10:00:00Z",
  },
];

export const MOCK_INVENTORY: InventoryStock[] = [
  {
    productId: "prod-001",
    warehouseId: "wh-main",
    qtyOnHand: 154,
    qtyReserved: 20,
    qtyInTransit: 100,
    reorderPoint: 100,
    safetyStock: 50,
    binLocation: "A-12-3",
  },
  {
    productId: "prod-002",
    warehouseId: "wh-main",
    qtyOnHand: 45,
    qtyReserved: 5,
    qtyInTransit: 0,
    reorderPoint: 50,
    safetyStock: 20,
    binLocation: "B-05-1",
  },
];

export const MOCK_MOVEMENTS: InventoryMovement[] = [
  {
    id: "mov-001",
    productId: "prod-001",
    warehouseId: "wh-main",
    type: "IN",
    referenceId: "PO-2025-088",
    qty: 200,
    balanceAfter: 200,
    timestamp: "2026-01-15T09:00:00Z",
    userId: "user-001",
  },
  {
    id: "mov-002",
    productId: "prod-001",
    warehouseId: "wh-main",
    type: "OUT",
    referenceId: "SO-12345",
    qty: 46,
    balanceAfter: 154,
    timestamp: "2026-02-10T14:30:00Z",
    userId: "user-002",
  },
];
