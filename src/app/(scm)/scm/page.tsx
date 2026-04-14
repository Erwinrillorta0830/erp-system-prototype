import SCMDashboard from "@/modules/scm/views/SCMDashboard";

export const metadata = {
  title: "SCM Dashboard | MotorERP",
  description: "Real-time supply chain oversight for motor parts imports.",
};

export default function DashboardPage() {
  return <SCMDashboard />;
}
