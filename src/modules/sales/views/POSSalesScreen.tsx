"use client";

import React, { useState, useMemo } from "react";
import { useSales } from "@/modules/sales/context/sales-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart, Search, Plus, Minus, Trash2, X,
  CreditCard, Banknote, Smartphone, Tag, ChevronRight,
  CheckCircle2, Package, ArrowRight,
} from "lucide-react";
import { SalesProduct } from "@/modules/sales/types";

const PAYMENT_METHODS = [
  { id: "CASH",          label: "Cash",          icon: Banknote    },
  { id: "GCASH",         label: "GCash",         icon: Smartphone  },
  { id: "CARD",          label: "Card",          icon: CreditCard  },
  { id: "BANK_TRANSFER", label: "Bank Transfer", icon: CreditCard  },
] as const;

export default function POSSalesScreen() {
  const {
    products, posCart, posWalkInName, setPosWalkInName,
    addToCart, updateCartQty, removeFromCart, clearCart, checkoutCart,
    posTransactions,
  } = useSales();

  const [search, setSearch] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<typeof PAYMENT_METHODS[number]["id"]>("CASH");
  const [tendered, setTendered] = useState("");
  const [lastTxNo, setLastTxNo] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredProducts = useMemo(() =>
    products.filter(p =>
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.partNo.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    ),
    [products, search]
  );

  const subtotal = posCart.reduce((s, i) => s + i.lineTotal, 0);
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;
  const change = parseFloat(tendered) - total;

  const handleCheckout = () => {
    if (posCart.length === 0) return;
    const txNo = checkoutCart(selectedPayment as any, parseFloat(tendered) || undefined);
    setLastTxNo(txNo);
    setShowSuccess(true);
    setTendered("");
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const recentTx = posTransactions.filter(t => t.status === "CHECKED_OUT").slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Walk-in / Counter Sales</p>
          <h1 className="text-3xl font-black tracking-tight">POS Terminal</h1>
        </div>
        <Button variant="outline" className="rounded-xl border-emerald-500/20 font-bold">
          <Tag className="mr-2 h-4 w-4" /> Apply Promo
        </Button>
      </div>

      {/* Success Banner */}
      {showSuccess && (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500 text-white animate-in slide-in-from-top duration-500">
          <CheckCircle2 className="h-6 w-6 shrink-0" />
          <div>
            <p className="font-black">Transaction Complete! {lastTxNo}</p>
            <p className="text-emerald-100 text-xs font-medium">Receipt ready. Change: ₱{Math.max(0, change).toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        {/* ── Product Picker (Left 3 cols) ─────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative group">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
            <Input
              placeholder="Search by part name, part no., or category..."
              className="pl-12 h-13 text-sm rounded-2xl bg-card border-border/50 focus-visible:ring-emerald-400/30"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="group p-4 rounded-2xl border border-border/40 bg-card/60 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all cursor-pointer active:scale-95"
                onClick={() => addToCart(product)}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">{product.partNo}</p>
                    <p className="text-xs font-black leading-snug line-clamp-2">{product.description}</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <Plus className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-[8px] h-4 px-1.5 border-border/40">{product.category}</Badge>
                    <Badge variant="outline" className={`text-[8px] h-4 px-1.5 ${product.stockAvailable > 20 ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-rose-600 border-rose-200 bg-rose-50"}`}>
                      {product.stockAvailable} {product.unit}
                    </Badge>
                  </div>
                  <p className="text-sm font-black text-emerald-600">₱{product.srp.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Cart + Checkout (Right 2 cols) ───────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="flex-1 border-border/40 bg-card/60 rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/30">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-black flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-emerald-500" /> Cart
                  {posCart.length > 0 && <Badge className="bg-emerald-500 text-white h-5 w-5 p-0 flex items-center justify-center text-[10px] rounded-full">{posCart.length}</Badge>}
                </CardTitle>
                {posCart.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearCart} className="h-7 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold">
                    <X className="h-3 w-3 mr-1" /> Clear
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3 max-h-52 overflow-y-auto custom-scrollbar">
              {posCart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Package className="h-10 w-10 mb-3 opacity-20" />
                  <p className="text-xs font-bold">Cart is empty</p>
                  <p className="text-[10px]">Click a product to add</p>
                </div>
              ) : posCart.map(item => (
                <div key={item.productId} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 group">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black truncate">{item.description}</p>
                    <p className="text-[10px] text-muted-foreground">₱{item.unitPrice.toLocaleString()} / {item.qty > 1 ? `${item.qty} pcs` : "pc"}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => updateCartQty(item.productId, item.qty - 1)} className="w-6 h-6 rounded-lg bg-muted hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center transition-all">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-black">{item.qty}</span>
                    <button onClick={() => updateCartQty(item.productId, item.qty + 1)} className="w-6 h-6 rounded-lg bg-muted hover:bg-emerald-100 hover:text-emerald-600 flex items-center justify-center transition-all">
                      <Plus className="h-3 w-3" />
                    </button>
                    <button onClick={() => removeFromCart(item.productId)} className="w-6 h-6 rounded-lg hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center ml-1 transition-all opacity-0 group-hover:opacity-100">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-xs font-black text-emerald-600 shrink-0 w-16 text-right">₱{item.lineTotal.toLocaleString()}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Walk-in name */}
          <Input
            placeholder="Walk-in customer name (optional)"
            value={posWalkInName}
            onChange={e => setPosWalkInName(e.target.value)}
            className="rounded-2xl h-11 bg-card/60 border-border/40"
          />

          {/* Payment Method */}
          <div className="grid grid-cols-2 gap-2">
            {PAYMENT_METHODS.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedPayment(m.id)}
                className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-black transition-all ${
                  selectedPayment === m.id
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20"
                    : "bg-card/60 border-border/40 text-muted-foreground hover:border-emerald-400/40"
                }`}
              >
                <m.icon className="h-4 w-4" /> {m.label}
              </button>
            ))}
          </div>

          {/* Summary */}
          <Card className="border-border/30 bg-card/60 rounded-2xl">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-foreground">
                <span>Subtotal</span><span>₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-muted-foreground">
                <span>VAT (12%)</span><span>₱{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-black border-t border-border/40 pt-2">
                <span>TOTAL</span><span className="text-emerald-600">₱{total.toLocaleString()}</span>
              </div>
              {selectedPayment === "CASH" && (
                <Input
                  type="number"
                  placeholder="Amount tendered..."
                  value={tendered}
                  onChange={e => setTendered(e.target.value)}
                  className="mt-2 rounded-xl h-10 bg-muted/50 border-border/30 text-sm font-bold"
                />
              )}
              {selectedPayment === "CASH" && tendered && !isNaN(change) && change >= 0 && (
                <div className="flex justify-between text-sm font-black text-emerald-600 bg-emerald-500/10 p-2 rounded-xl">
                  <span>Change</span><span>₱{change.toFixed(2)}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            onClick={handleCheckout}
            disabled={posCart.length === 0}
            className="h-14 w-full rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-black text-base shadow-xl shadow-emerald-500/30 disabled:opacity-40 transition-all active:scale-95"
          >
            <CheckCircle2 className="mr-2 h-5 w-5" /> Checkout — ₱{total.toLocaleString()}
          </Button>
        </div>
      </div>

      {/* Recent Transactions */}
      {recentTx.length > 0 && (
        <Card className="border-border/30 bg-card/40 rounded-[2rem]">
          <CardHeader>
            <CardTitle className="text-base font-black">Recent Transactions Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
              {recentTx.map(tx => (
                <div key={tx.id} className="p-4 rounded-2xl bg-muted/30 border border-border/30 hover:border-emerald-400/30 transition-all cursor-pointer">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{tx.transactionNo}</p>
                  <p className="text-xs font-black mt-1 truncate">{tx.walkInName || "Counter Sale"}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" className="text-[8px] h-4 px-1">{tx.paymentMethod}</Badge>
                    <span className="text-xs font-black text-emerald-600">₱{tx.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
