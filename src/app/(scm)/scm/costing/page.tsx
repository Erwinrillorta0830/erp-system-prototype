import LandedCostAllocation from "@/modules/scm/views/LandedCostAllocation";

export const metadata = {
  title: "Landed Cost Allocation | SCM MotorERP",
  description: "Calculate and allocate import costs to shipment line items.",
};

export default function LandedCostPage() {
  return <LandedCostAllocation />;
}
