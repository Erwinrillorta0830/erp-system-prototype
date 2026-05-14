/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  SalesCustomer, SalesProduct, SalesQuote, SalesOrder,
  POSTransaction, SalesInvoice, FulfillmentRecord,
  SalesReturn, DiscountRule, SalesPriceTier, POSCartItem,
} from "../types";
import {
  MOCK_PRICE_TIERS, MOCK_SALES_CUSTOMERS, MOCK_SALES_PRODUCTS,
  MOCK_QUOTES, MOCK_SALES_ORDERS, MOCK_POS_TRANSACTIONS,
  MOCK_INVOICES, MOCK_FULFILLMENTS, MOCK_RETURNS, MOCK_DISCOUNT_RULES,
} from "../mock/data";

interface SalesContextType {
  // Data
  priceTiers: SalesPriceTier[];
  customers: SalesCustomer[];
  products: SalesProduct[];
  quotes: SalesQuote[];
  orders: SalesOrder[];
  posTransactions: POSTransaction[];
  invoices: SalesInvoice[];
  fulfillments: FulfillmentRecord[];
  returns: SalesReturn[];
  discountRules: DiscountRule[];

  // POS Cart (active session)
  posCart: POSCartItem[];
  posWalkInName: string;
  setPosWalkInName: (name: string) => void;
  addToCart: (product: SalesProduct, qty?: number) => void;
  updateCartQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkoutCart: (paymentMethod: POSTransaction["paymentMethod"], tendered?: number) => string;

  // Order Actions
  convertQuoteToOrder: (quoteId: string) => string | null;
  updateOrderStatus: (orderId: string, status: SalesOrder["status"]) => void;

  // Derived helpers
  getCustomerById: (id: string) => SalesCustomer | undefined;
  getProductById: (id: string) => SalesProduct | undefined;
  getPriceTierById: (id: string) => SalesPriceTier | undefined;
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);
const STORAGE_KEY = "sales_module_state";

export const SalesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [priceTiers]      = useState<SalesPriceTier[]>(MOCK_PRICE_TIERS);
  const [customers]       = useState<SalesCustomer[]>(MOCK_SALES_CUSTOMERS);
  const [products]        = useState<SalesProduct[]>(MOCK_SALES_PRODUCTS);
  const [quotes,         setQuotes]         = useState<SalesQuote[]>([]);
  const [orders,         setOrders]         = useState<SalesOrder[]>([]);
  const [posTransactions,setPosTransactions]= useState<POSTransaction[]>([]);
  const [invoices,       setInvoices]       = useState<SalesInvoice[]>([]);
  const [fulfillments,   setFulfillments]   = useState<FulfillmentRecord[]>([]);
  const [returns,        setReturns]        = useState<SalesReturn[]>([]);
  const [discountRules]  = useState<DiscountRule[]>(MOCK_DISCOUNT_RULES);

  // POS session state
  const [posCart, setPosCart]               = useState<POSCartItem[]>([]);
  const [posWalkInName, setPosWalkInName]   = useState<string>("");

  // Initialize from localStorage or mock data
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const p = JSON.parse(stored);
      setQuotes(p.quotes ?? MOCK_QUOTES);
      setOrders(p.orders ?? MOCK_SALES_ORDERS);
      setPosTransactions(p.posTransactions ?? MOCK_POS_TRANSACTIONS);
      setInvoices(p.invoices ?? MOCK_INVOICES);
      setFulfillments(p.fulfillments ?? MOCK_FULFILLMENTS);
      setReturns(p.returns ?? MOCK_RETURNS);
    } else {
      setQuotes(MOCK_QUOTES);
      setOrders(MOCK_SALES_ORDERS);
      setPosTransactions(MOCK_POS_TRANSACTIONS);
      setInvoices(MOCK_INVOICES);
      setFulfillments(MOCK_FULFILLMENTS);
      setReturns(MOCK_RETURNS);
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (!quotes.length) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      quotes, orders, posTransactions, invoices, fulfillments, returns,
    }));
  }, [quotes, orders, posTransactions, invoices, fulfillments, returns]);

  // ── POS Cart Actions ────────────────────────────────────────────────────────
  const addToCart = useCallback((product: SalesProduct, qty = 1) => {
    setPosCart(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        return prev.map(i => i.productId === product.id
          ? { ...i, qty: i.qty + qty, lineTotal: (i.qty + qty) * i.unitPrice }
          : i
        );
      }
      return [...prev, {
        productId: product.id, partNo: product.partNo,
        description: product.description, qty,
        unitPrice: product.srp, discountAmt: 0,
        lineTotal: product.srp * qty,
      }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setPosCart(prev => prev.filter(i => i.productId !== productId));
  }, []);

  const updateCartQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) { removeFromCart(productId); return; }
    setPosCart(prev => prev.map(i => i.productId === productId
      ? { ...i, qty, lineTotal: qty * i.unitPrice } : i
    ));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setPosCart([]);
    setPosWalkInName("");
  }, []);

  const checkoutCart = useCallback((paymentMethod: POSTransaction["paymentMethod"], tendered?: number): string => {
    const subtotal = posCart.reduce((s, i) => s + i.lineTotal, 0);
    const taxAmount = Math.round(subtotal * 0.12);
    const total = subtotal + taxAmount;
    const txNo = `POS-${new Date().getFullYear()}-${String(posTransactions.length + 2000).padStart(4, "0")}`;
    const tx: POSTransaction = {
      id: `pos-${Date.now()}`, transactionNo: txNo,
      cashierId: "EMP-003",
      walkInName: posWalkInName || undefined,
      transactionDate: new Date().toISOString(),
      status: "CHECKED_OUT", paymentMethod,
      items: [...posCart],
      subtotal, discountAmount: 0, taxAmount, totalAmount: total,
      amountTendered: tendered,
      changeAmount: tendered ? tendered - total : undefined,
    };
    setPosTransactions(prev => [tx, ...prev]);
    clearCart();
    return txNo;
  }, [posCart, posWalkInName, posTransactions.length, clearCart]);

  // ── Order Actions ───────────────────────────────────────────────────────────
  const convertQuoteToOrder = useCallback((quoteId: string): string | null => {
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote || quote.status === "EXPIRED" || quote.status === "CONVERTED") return null;
    const orderNo = `SO-${new Date().getFullYear()}-${String(orders.length + 100).padStart(4, "0")}`;
    const newOrder: SalesOrder = {
      id: `so-${Date.now()}`, orderNo,
      customerId: quote.customerId, quotationRef: quote.quoteNo,
      channel: "WHOLESALE", assignedSalesRep: quote.assignedSalesRep,
      warehouseId: "WH-MNL", paymentTerm: "Net 30", priceTierId: "pt-1",
      transactionDate: new Date().toISOString().split("T")[0],
      status: "CONFIRMED",
      lines: quote.lines.map((l, i) => ({
        id: `sl-new-${i}`, productId: l.productId, description: l.description,
        orderedQty: l.qty, releasedQty: 0, unitPrice: l.unitPrice,
        discountAmt: l.discountAmt, lineTotal: l.lineTotal, lineStatus: "PENDING",
      })),
      grossAmount: quote.grossAmount, discountAmount: quote.discountAmount,
      netAmount: quote.netAmount, taxAmount: quote.taxAmount, totalAmount: quote.totalAmount,
    };
    setOrders(prev => [newOrder, ...prev]);
    setQuotes(prev => prev.map(q => q.id === quoteId ? { ...q, status: "CONVERTED" } : q));
    return orderNo;
  }, [quotes, orders.length]);

  const updateOrderStatus = useCallback((orderId: string, status: SalesOrder["status"]) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const getCustomerById  = (id: string) => customers.find(c => c.id === id);
  const getProductById   = (id: string) => products.find(p => p.id === id);
  const getPriceTierById = (id: string) => priceTiers.find(t => t.id === id);

  return (
    <SalesContext.Provider value={{
      priceTiers, customers, products, quotes, orders, posTransactions,
      invoices, fulfillments, returns, discountRules,
      posCart, posWalkInName, setPosWalkInName,
      addToCart, updateCartQty, removeFromCart, clearCart, checkoutCart,
      convertQuoteToOrder, updateOrderStatus,
      getCustomerById, getProductById, getPriceTierById,
    }}>
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => {
  const ctx = useContext(SalesContext);
  if (!ctx) throw new Error("useSales must be used within SalesProvider");
  return ctx;
};
