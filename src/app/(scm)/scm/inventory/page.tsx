import InventoryView from "@/modules/scm/views/InventoryView";

export const metadata = {
  title: "Warehouse & Inventory | SCM MotorERP",
  description: "Monitor stock balances across Philippine warehouses.",
};

export default function InventoryPage() {
  return <InventoryView />;
}
