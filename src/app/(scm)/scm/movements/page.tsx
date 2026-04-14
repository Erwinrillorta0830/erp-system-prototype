import StockMovements from "@/modules/scm/views/StockMovements";

export const metadata = {
  title: "Stock Transfers & Adjustments | SCM MotorERP",
  description: "Manage internal stock movements and inventory corrections.",
};

export default function StockMovementsPage() {
  return <StockMovements />;
}
