import { useSCM } from "../context/scm-context";

export { useSCM };

export const useSuppliers = () => {
  const { suppliers } = useSCM();
  return { suppliers };
};

export const useProducts = () => {
  const { products, categories, uoms, addProduct } = useSCM();
  return { products, categories, uoms, addProduct };
};

export const useInventory = () => {
  const { inventory, warehouses, updateInventory } = useSCM();
  return { inventory, warehouses, updateInventory };
};

export const usePurchaseOrders = () => {
  const { purchaseOrders, addPurchaseOrder, updatePOStatus } = useSCM();
  return { purchaseOrders, addPurchaseOrder, updatePOStatus };
};

export const useShipments = () => {
  const { shipments, addShipment, updateShipmentStatus } = useSCM();
  return { shipments, addShipment, updateShipmentStatus };
};
