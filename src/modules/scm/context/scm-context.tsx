"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  Supplier, Product, PurchaseOrder, ShipmentTracking, 
  InventoryStock, Warehouse, ProductCategory, UnitOfMeasure 
} from "../types";
import { 
  MOCK_SUPPLIERS, MOCK_PRODUCTS, MOCK_POS, MOCK_SHIPMENTS, 
  MOCK_INVENTORY, MOCK_WAREHOUSES, MOCK_CATEGORIES, MOCK_UOMS 
} from "../mock/data";

interface SCMContextType {
  suppliers: Supplier[];
  products: Product[];
  categories: ProductCategory[];
  uoms: UnitOfMeasure[];
  purchaseOrders: PurchaseOrder[];
  shipments: ShipmentTracking[];
  inventory: InventoryStock[];
  warehouses: Warehouse[];
  
  // Actions
  addPurchaseOrder: (po: PurchaseOrder) => void;
  updatePOStatus: (id: string, status: PurchaseOrder["status"]) => void;
  addShipment: (shipment: ShipmentTracking) => void;
  updateShipmentStatus: (id: string, status: ShipmentTracking["status"]) => void;
  updateInventory: (productId: string, warehouseId: string, qtyDelta: number) => void;
}

const SCMContext = createContext<SCMContextType | undefined>(undefined);

export const SCMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [categories] = useState<ProductCategory[]>(MOCK_CATEGORIES);
  const [uoms] = useState<UnitOfMeasure[]>(MOCK_UOMS);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(MOCK_POS);
  const [shipments, setShipments] = useState<ShipmentTracking[]>(MOCK_SHIPMENTS);
  const [inventory, setInventory] = useState<InventoryStock[]>(MOCK_INVENTORY);
  const [warehouses] = useState<Warehouse[]>(MOCK_WAREHOUSES);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPOs = localStorage.getItem("scm_pos");
    const savedShipments = localStorage.getItem("scm_shipments");
    const savedInventory = localStorage.getItem("scm_inventory");
    
    if (savedPOs) setPurchaseOrders(JSON.parse(savedPOs));
    if (savedShipments) setShipments(JSON.parse(savedShipments));
    if (savedInventory) setInventory(JSON.parse(savedInventory));
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("scm_pos", JSON.stringify(purchaseOrders));
  }, [purchaseOrders]);

  useEffect(() => {
    localStorage.setItem("scm_shipments", JSON.stringify(shipments));
  }, [shipments]);

  useEffect(() => {
    localStorage.setItem("scm_inventory", JSON.stringify(inventory));
  }, [inventory]);

  const addPurchaseOrder = (po: PurchaseOrder) => {
    setPurchaseOrders(prev => [po, ...prev]);
  };

  const updatePOStatus = (id: string, status: PurchaseOrder["status"]) => {
    setPurchaseOrders(prev => prev.map(po => po.id === id ? { ...po, status } : po));
  };

  const addShipment = (shipment: ShipmentTracking) => {
    setShipments(prev => [shipment, ...prev]);
  };

  const updateShipmentStatus = (id: string, status: ShipmentTracking["status"]) => {
    setShipments(prev => prev.map(sh => sh.id === id ? { ...sh, status } : sh));
  };

  const updateInventory = (productId: string, warehouseId: string, qtyDelta: number) => {
    setInventory(prev => {
      const existing = prev.find(i => i.productId === productId && i.warehouseId === warehouseId);
      if (existing) {
        return prev.map(i => 
          (i.productId === productId && i.warehouseId === warehouseId) 
            ? { ...i, qtyOnHand: i.qtyOnHand + qtyDelta } 
            : i
        );
      }
      return [...prev, {
        productId,
        warehouseId,
        qtyOnHand: qtyDelta,
        qtyReserved: 0,
        qtyInTransit: 0,
        reorderPoint: 50,
        safetyStock: 10
      }];
    });
  };

  return (
    <SCMContext.Provider value={{
      suppliers,
      products,
      categories,
      uoms,
      purchaseOrders,
      shipments,
      inventory,
      warehouses,
      addPurchaseOrder,
      updatePOStatus,
      addShipment,
      updateShipmentStatus,
      updateInventory
    }}>
      {children}
    </SCMContext.Provider>
  );
};

export const useSCM = () => {
  const context = useContext(SCMContext);
  if (context === undefined) {
    throw new Error("useSCM must be used within an SCMProvider");
  }
  return context;
};
