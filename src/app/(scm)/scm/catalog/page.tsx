import ProductCatalog from "@/modules/scm/views/ProductCatalog";

export const metadata = {
  title: "Product Catalog | SCM MotorERP",
  description: "View and manage all motor parts imported from Thailand.",
};

export default function CatalogPage() {
  return <ProductCatalog />;
}
