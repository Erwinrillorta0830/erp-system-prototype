"use client";

import React from "react";
import { useSales } from "@/modules/sales/context/sales-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Edit2, ToggleLeft, ToggleRight, Plus } from "lucide-react";

const CHANNEL_STYLE: Record<string, string> = {
  WHOLESALE: "bg-violet-50 text-violet-600 border-violet-200",
  RETAIL:    "bg-blue-50   text-blue-600   border-blue-200",
  WALKIN:    "bg-emerald-50 text-emerald-600 border-emerald-200"
};

const TYPE_STYLE: Record<string, string> = {
  PERCENT: "bg-blue-50 text-blue-700 border-blue-200",
  FLAT:    "bg-amber-50 text-amber-700 border-amber-200",
  VOLUME:  "bg-violet-50 text-violet-700 border-violet-200"
};

export default function PricingRules() {
  const { priceTiers, discountRules } = useSales();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Sales Module</p>
          <h1 className="text-3xl font-black tracking-tight">Pricing & Discounts</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage tier-based pricing and promotional discount rules.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 font-black rounded-xl px-6">
          <Plus className="mr-2 h-4 w-4" /> New Promo Rule
        </Button>
      </div>

      {/* Price Tiers */}
      <div>
        <h2 className="text-base font-black uppercase tracking-widest text-muted-foreground mb-4">Customer Price Tiers</h2>
        <div className="grid gap-5 md:grid-cols-4">
          {priceTiers.map(tier => (
            <Card key={tier.id} className="border-border/30 bg-card/50 rounded-[2rem] hover:border-emerald-400/30 transition-all group">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-3 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <Tag className="h-6 w-6 text-emerald-600 group-hover:text-white" />
                </div>
                <CardTitle className="text-base font-black">{tier.name}</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest font-bold">Tier ID: {tier.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-center">
                  <p className="text-3xl font-black text-emerald-600">{tier.discountPct}%</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Off SRP</p>
                </div>
                <Button variant="ghost" className="w-full mt-3 h-9 rounded-2xl font-bold text-xs hover:bg-emerald-500/5 hover:text-emerald-600">
                  <Edit2 className="h-3 w-3 mr-2" /> Edit Tier
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Discount Rules */}
      <div>
        <h2 className="text-base font-black uppercase tracking-widest text-muted-foreground mb-4">Active Promo Rules</h2>
        <div className="space-y-4">
          {discountRules.map(rule => (
            <Card key={rule.id} className={`border-border/30 rounded-2xl transition-all ${rule.isActive ? "bg-card/50" : "bg-muted/20 opacity-60"}`}>
              <CardContent className="p-5 flex items-center gap-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${rule.isActive ? "bg-emerald-500/10" : "bg-muted"}`}>
                  <Tag className={`h-6 w-6 ${rule.isActive ? "text-emerald-600" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <p className="font-black text-sm">{rule.promoName}</p>
                    <Badge variant="outline" className={`text-[9px] font-black uppercase h-5 ${TYPE_STYLE[rule.promoType]}`}>
                      {rule.promoType}
                    </Badge>
                    {rule.appliesToChannel && (
                      <Badge variant="outline" className={`text-[9px] font-black uppercase h-5 ${CHANNEL_STYLE[rule.appliesToChannel] ?? ""}`}>
                        {rule.appliesToChannel}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-[11px] font-bold text-muted-foreground flex-wrap">
                    <span>
                      Discount: <span className="text-foreground font-black">
                        {rule.promoType === "PERCENT" ? `${rule.discountValue}%` : rule.promoType === "FLAT" ? `₱${rule.discountValue}` : `${rule.discountValue}% (min ${rule.minQty} pcs)`}
                      </span>
                    </span>
                    <span>Valid: <span className="text-foreground font-black">{rule.validFrom} → {rule.validUntil}</span></span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase ${rule.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"}`}>
                    {rule.isActive ? "Active" : "Inactive"}
                  </div>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/5">
                    {rule.isActive ? <ToggleRight className="h-5 w-5 text-emerald-500" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
