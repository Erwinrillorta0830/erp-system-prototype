import CustomerList from "@/modules/crm/views/CustomerList";

export const metadata = {
  title: "Customer Master | CRM MotorERP",
  description: "Manage client relationships and customer profiles.",
};

export default function CustomersPage() {
  return <CustomerList />;
}
