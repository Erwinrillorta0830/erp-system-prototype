import Customer360 from "@/modules/crm/views/Customer360";

export const metadata = {
  title: "Customer 360 View | CRM MotorERP",
  description: "Comprehensive relationship oversight for a single account.",
};

export default async function Customer360Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Customer360 customerId={id} />;
}
