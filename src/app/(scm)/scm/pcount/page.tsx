import PhysicalInventory from "@/modules/scm/views/PhysicalInventory";

export const metadata = {
  title: "Physical Inventory Count | SCM MotorERP",
  description: "Conduct stock takes and reconcile physical counts.",
};

export default function InventoryCountPage() {
  return <PhysicalInventory />;
}
