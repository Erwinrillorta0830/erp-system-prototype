import MovementHistory from "@/modules/scm/views/MovementHistory";

export const metadata = {
  title: "Inventory Movement Ledger | SCM MotorERP",
  description: "Detailed audit trail of all stock movements.",
};

export default function HistoryPage() {
  return <MovementHistory />;
}
