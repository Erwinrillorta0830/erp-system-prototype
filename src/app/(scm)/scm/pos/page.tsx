import POManagement from "@/modules/scm/views/POManagement";

export const metadata = {
  title: "Purchase Orders | SCM MotorERP",
  description: "Manage procurement and orders from Thai suppliers.",
};

export default function POPage() {
  return <POManagement />;
}
