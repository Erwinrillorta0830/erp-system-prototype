export const MOCK_ALERTS = [
  { id: "al_1", type: "Inventory", severity: "High", message: "Out of Stock: prd_yamaha_nmax_vbelt in Manila Main" },
  { id: "al_2", type: "Supplier", severity: "Critical", message: "Delayed Shipment from sup_bkk_thai_motor_parts (Over 14 days late)" },
  { id: "al_3", type: "Finance", severity: "Medium", message: "Overdue Receivables > 60 Days: cust_visayas_dealers_inc (₱ 450,000)" },
];

export const MOCK_FINANCE_SUMMARY = {
  totalAccountsReceivable: 4500000.00,
  overdueReceivables: 850000.00,
  totalAccountsPayable: 2100000.00,
  overduePayables: 0.00,
  cashBalance: 12500000.00
};
