import SupplierDirectory from "@/modules/scm/views/SupplierDirectory";

export const metadata = {
  title: "Supplier Directory | SCM MotorERP",
  description: "Manage relationships with Thai and local suppliers.",
};

export default function SuppliersPage() {
  return <SupplierDirectory />;
}
