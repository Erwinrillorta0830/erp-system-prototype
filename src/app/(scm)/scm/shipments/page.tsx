import ShipmentTrackingView from "@/modules/scm/views/ShipmentTracking";

export const metadata = {
  title: "Import Shipments | SCM MotorERP",
  description: "Track motor parts in transit from Thailand to Philippines.",
};

export default function ShipmentPage() {
  return <ShipmentTrackingView />;
}
