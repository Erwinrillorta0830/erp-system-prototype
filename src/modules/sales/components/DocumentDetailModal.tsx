"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import {
  Dialog, DialogContent, DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Printer, X, FileText, ShoppingCart, Receipt } from "lucide-react";
import { SalesQuote, SalesOrder, SalesInvoice, SalesCustomer } from "@/modules/sales/types";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type DocType = "quote" | "order" | "invoice";

interface DocumentDetailModalProps {
  open: boolean;
  onClose: () => void;
  type: DocType;
  doc: SalesQuote | SalesOrder | SalesInvoice | null;
  customer: SalesCustomer | undefined;
}

/* ─── Print Utility ──────────────────────────────────────────────────────── */
function buildPrintHTML(
  type: DocType,
  doc: SalesQuote | SalesOrder | SalesInvoice,
  customer: SalesCustomer | undefined,
): string {
  const isQuote   = type === "quote";
  const isOrder   = type === "order";
  const isInvoice = type === "invoice";

  const q  = isQuote   ? (doc as SalesQuote)   : null;
  const so = isOrder   ? (doc as SalesOrder)   : null;
  const inv = isInvoice ? (doc as SalesInvoice) : null;

  const docNo    = q?.quoteNo ?? so?.orderNo ?? inv?.invoiceNo ?? "";
  const dateLabel = isQuote ? "Date Created" : isOrder ? "Order Date" : "Issue Date";
  const dateVal   = q?.dateCreated ?? so?.transactionDate ?? inv?.issueDate ?? "";
  const lines     = q?.lines ?? so?.lines ?? inv?.lines ?? [];

  const customerName = customer?.businessName ?? (inv as SalesInvoice)?.walkInName ?? "Walk-in";
  const customerCity = customer?.city ?? "";
  const customerCode = customer?.customerCode ?? "";

  const _icons: Record<DocType, string> = {
    quote:   "📋",
    order:   "📦",
    invoice: "🧾"
  };

  const titles: Record<DocType, string> = {
    quote:   "SALES QUOTATION",
    order:   "SALES ORDER",
    invoice: "SALES INVOICE"
  };

  const lineRows = lines.map((line: any) => `
    <tr>
      <td style="padding:10px 8px;border-bottom:1px solid #e5e7eb;font-size:12px;">${line.description}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #e5e7eb;font-size:12px;text-align:center;">
        ${(line as any).qty ?? (line as any).orderedQty ?? (line as any).returnQty ?? 0}
      </td>
      <td style="padding:10px 8px;border-bottom:1px solid #e5e7eb;font-size:12px;text-align:right;">
        ₱${((line as any).unitPrice ?? 0).toLocaleString()}
      </td>
      <td style="padding:10px 8px;border-bottom:1px solid #e5e7eb;font-size:12px;text-align:right;font-weight:700;">
        ₱${((line as any).lineTotal ?? 0).toLocaleString()}
      </td>
    </tr>`).join("");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>${titles[type]} – ${docNo}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color:#111; background:#fff; padding:40px; }
  .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:32px; }
  .company { }
  .company h1 { font-size:22px; font-weight:900; letter-spacing:-0.5px; color:#111; }
  .company p  { font-size:11px; color:#6b7280; margin-top:2px; }
  .doc-badge { text-align:right; }
  .doc-badge .type { font-size:10px; font-weight:900; letter-spacing:0.2em; text-transform:uppercase; color:#10b981; }
  .doc-badge .no   { font-size:22px; font-weight:900; color:#111; line-height:1; }
  .meta { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:28px; }
  .meta-box { background:#f9fafb; border-radius:12px; padding:16px; }
  .meta-box .label { font-size:9px; font-weight:900; letter-spacing:0.15em; text-transform:uppercase; color:#9ca3af; margin-bottom:4px; }
  .meta-box .value { font-size:13px; font-weight:700; color:#111; }
  .meta-box .sub   { font-size:10px; color:#6b7280; margin-top:2px; }
  table { width:100%; border-collapse:collapse; margin-bottom:24px; }
  thead tr { background:#f3f4f6; }
  thead th { padding:10px 8px; text-align:left; font-size:9px; font-weight:900; letter-spacing:0.1em; text-transform:uppercase; color:#6b7280; }
  thead th:last-child, thead th:nth-child(3) { text-align:right; }
  thead th:nth-child(2) { text-align:center; }
  .totals { display:flex; justify-content:flex-end; }
  .totals-box { width:280px; }
  .totals-row { display:flex; justify-content:space-between; padding:6px 0; font-size:12px; color:#6b7280; }
  .totals-row.total { border-top:2px solid #111; margin-top:6px; padding-top:10px; font-size:15px; font-weight:900; color:#111; }
  .totals-row.balance { color:#ef4444; font-weight:900; }
  .footer { margin-top:48px; border-top:1px solid #e5e7eb; padding-top:20px; }
  .sigs { display:grid; grid-template-columns:1fr 1fr 1fr; gap:24px; }
  .sig-box { text-align:center; }
  .sig-line { border-top:1px solid #9ca3af; margin-bottom:6px; padding-top:4px; font-size:10px; color:#6b7280; }
  @media print { body { padding:20px; } }
</style>
</head>
<body>
<div class="header">
  <div class="company">
    <h1>MMPA Motor Parts</h1>
    <p>Thailand Import Specialist • Motor Parts Distributor</p>
    <p style="margin-top:6px;font-size:10px;color:#9ca3af;">Manila Main Hub • Quezon City, Metro Manila</p>
  </div>
  <div class="doc-badge">
    <div class="type">${titles[type]}</div>
    <div class="no">${docNo}</div>
    <div style="font-size:10px;color:#6b7280;margin-top:4px;">${dateLabel}: ${dateVal}</div>
  </div>
</div>

<div class="meta">
  <div class="meta-box">
    <div class="label">Bill / Ship To</div>
    <div class="value">${customerName}</div>
    ${customerCode ? `<div class="sub">Code: ${customerCode}</div>` : ""}
    ${customerCity ? `<div class="sub">${customerCity}</div>` : ""}
    ${customer?.contactNo ? `<div class="sub">${customer.contactNo}</div>` : ""}
  </div>
  <div class="meta-box">
    <div class="label">Details</div>
    ${isQuote ? `<div class="sub">Valid Until: <strong>${q?.validUntil}</strong></div><div class="sub">Sales Rep: ${q?.assignedSalesRep}</div>` : ""}
    ${isOrder ? `<div class="sub">Channel: ${so?.channel}</div><div class="sub">Payment: ${so?.paymentTerm}</div><div class="sub">Rep: ${so?.assignedSalesRep}</div>` : ""}
    ${isInvoice ? `<div class="sub">Channel: ${inv?.channel}</div>${inv?.dueDate ? `<div class="sub">Due: <strong>${inv?.dueDate}</strong></div>` : "<div class='sub'>Payment: COD</div>"}` : ""}
  </div>
</div>

<table>
  <thead>
    <tr>
      <th>Description</th>
      <th style="text-align:center;">Qty</th>
      <th style="text-align:right;">Unit Price</th>
      <th style="text-align:right;">Line Total</th>
    </tr>
  </thead>
  <tbody>
    ${lineRows}
  </tbody>
</table>

<div class="totals">
  <div class="totals-box">
    <div class="totals-row"><span>Subtotal</span><span>₱${(doc as any).grossAmount?.toLocaleString() ?? "0"}</span></div>
    ${(doc as any).discountAmount > 0 ? `<div class="totals-row"><span>Discount</span><span>–₱${(doc as any).discountAmount.toLocaleString()}</span></div>` : ""}
    <div class="totals-row"><span>Tax (12% VAT)</span><span>₱${(doc as any).taxAmount?.toLocaleString() ?? "0"}</span></div>
    <div class="totals-row total"><span>TOTAL</span><span>₱${(doc as any).totalAmount?.toLocaleString() ?? "0"}</span></div>
    ${isInvoice && inv && inv.balance > 0 ? `<div class="totals-row balance"><span>Outstanding Balance</span><span>₱${inv.balance.toLocaleString()}</span></div>` : ""}
  </div>
</div>

<div class="footer">
  <div class="sigs">
    <div class="sig-box">
      <div class="sig-line">Prepared by</div>
    </div>
    <div class="sig-box">
      <div class="sig-line">Approved by</div>
    </div>
    <div class="sig-box">
      <div class="sig-line">Received by</div>
    </div>
  </div>
  <p style="text-align:center;font-size:9px;color:#9ca3af;margin-top:20px;">
    This document is computer-generated and valid without signature. • MMPA Motor Parts ERP System
  </p>
</div>
</body>
</html>`;
}

export function printDocument(
  type: DocType,
  doc: SalesQuote | SalesOrder | SalesInvoice,
  customer: SalesCustomer | undefined,
) {
  const html = buildPrintHTML(type, doc, customer);
  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => { win.print(); }, 400);
}

/* ─── Modal Component ────────────────────────────────────────────────────── */
const TYPE_META: Record<DocType, { label: string; color: string; Icon: React.ElementType }> = {
  quote:   { label: "Quotation",    color: "text-blue-600",    Icon: FileText    },
  order:   { label: "Sales Order",  color: "text-emerald-600", Icon: ShoppingCart },
  invoice: { label: "Invoice",      color: "text-violet-600",  Icon: Receipt     }
};

export default function DocumentDetailModal({
  open, onClose, type, doc, customer
}: DocumentDetailModalProps) {
  if (!doc) return null;

  const { label, color, Icon } = TYPE_META[type];

  const isQuote   = type === "quote";
  const isOrder   = type === "order";
  const isInvoice = type === "invoice";

  const q   = isQuote   ? (doc as SalesQuote)   : null;
  const so  = isOrder   ? (doc as SalesOrder)   : null;
  const inv = isInvoice ? (doc as SalesInvoice) : null;

  const docNo  = q?.quoteNo ?? so?.orderNo ?? inv?.invoiceNo ?? "";
  const lines  = q?.lines ?? so?.lines ?? inv?.lines ?? [];
  const customerName = customer?.businessName ?? (inv as SalesInvoice)?.walkInName ?? "Walk-in";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto border-border/30 bg-card/98 backdrop-blur-xl rounded-[2rem] p-0">
        {/* ── Header ── */}
        <div className={`flex items-center justify-between px-8 pt-8 pb-5 border-b border-border/20`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isQuote ? "bg-blue-500" : isOrder ? "bg-emerald-500" : "bg-violet-500"
            } text-white shadow-lg`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{label}</p>
              <DialogTitle className="text-xl font-black tracking-tight">{docNo}</DialogTitle>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => printDocument(type, doc, customer)}
              className="bg-slate-800 hover:bg-slate-900 text-white font-black rounded-xl px-5 h-9 text-xs gap-2 shadow-lg"
            >
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl h-9 w-9">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* ── Customer / Meta ── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-muted/30 border border-border/20 space-y-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Customer</p>
              <p className="text-sm font-black">{customerName}</p>
              {customer?.customerCode && <p className="text-[10px] text-muted-foreground">{customer.customerCode}</p>}
              {customer?.city && <p className="text-[10px] text-muted-foreground">{customer.city}</p>}
            </div>
            <div className="p-4 rounded-2xl bg-muted/30 border border-border/20 space-y-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Details</p>
              {isQuote && q && (
                <>
                  <p className="text-[11px] font-bold">Valid Until: <span className="text-foreground">{q.validUntil}</span></p>
                  <p className="text-[11px] font-bold">Sales Rep: <span className="text-foreground">{q.assignedSalesRep}</span></p>
                  <p className="text-[11px] font-bold">Issued: <span className="text-foreground">{q.dateCreated}</span></p>
                </>
              )}
              {isOrder && so && (
                <>
                  <p className="text-[11px] font-bold">Channel: <span className="text-foreground">{so.channel}</span></p>
                  <p className="text-[11px] font-bold">Payment: <span className="text-foreground">{so.paymentTerm}</span></p>
                  <p className="text-[11px] font-bold">Date: <span className="text-foreground">{so.transactionDate}</span></p>
                </>
              )}
              {isInvoice && inv && (
                <>
                  <p className="text-[11px] font-bold">Issued: <span className="text-foreground">{inv.issueDate}</span></p>
                  {inv.dueDate && <p className="text-[11px] font-bold">Due: <span className="text-foreground">{inv.dueDate}</span></p>}
                  <p className="text-[11px] font-bold">Channel: <span className="text-foreground">{inv.channel}</span></p>
                </>
              )}
            </div>
          </div>

          {/* ── Line Items ── */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-3">Line Items</p>
            <div className="rounded-2xl overflow-hidden border border-border/20">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/20 bg-muted/30">
                    <TableHead className="font-black text-[9px] uppercase tracking-widest text-muted-foreground">Description</TableHead>
                    <TableHead className="font-black text-[9px] uppercase tracking-widest text-muted-foreground text-center">Qty</TableHead>
                    <TableHead className="font-black text-[9px] uppercase tracking-widest text-muted-foreground text-right">Unit Price</TableHead>
                    <TableHead className="font-black text-[9px] uppercase tracking-widest text-muted-foreground text-right">Line Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lines.map((line: any) => (
                    <TableRow key={line.id} className="border-border/10 hover:bg-muted/20">
                      <TableCell>
                        <p className="font-bold text-xs">{line.description}</p>
                        {line.productId && <p className="text-[9px] text-muted-foreground">{line.productId}</p>}
                      </TableCell>
                      <TableCell className="text-center font-bold text-xs">
                        {line.qty ?? line.orderedQty ?? line.returnQty ?? 0}
                        {line.releasedQty !== undefined && (
                          <p className="text-[9px] text-muted-foreground">Released: {line.releasedQty}</p>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-bold text-xs">₱{(line.unitPrice ?? 0).toLocaleString()}</TableCell>
                      <TableCell className="text-right font-black text-xs">₱{(line.lineTotal ?? 0).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* ── Totals ── */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground font-bold">
                <span>Subtotal</span>
                <span>₱{((doc as any).grossAmount ?? 0).toLocaleString()}</span>
              </div>
              {(doc as any).discountAmount > 0 && (
                <div className="flex justify-between text-xs text-muted-foreground font-bold">
                  <span>Discount</span>
                  <span className="text-rose-500">–₱{(doc as any).discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-muted-foreground font-bold">
                <span>VAT (12%)</span>
                <span>₱{((doc as any).taxAmount ?? 0).toLocaleString()}</span>
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between text-base font-black">
                <span>TOTAL</span>
                <span className={isInvoice ? "text-violet-600" : "text-emerald-600"}>
                  ₱{((doc as any).totalAmount ?? 0).toLocaleString()}
                </span>
              </div>
              {isInvoice && inv && inv.balance > 0 && (
                <div className="flex justify-between text-sm font-black text-rose-600 bg-rose-50 rounded-xl p-2 mt-1">
                  <span>Outstanding Balance</span>
                  <span>₱{inv.balance.toLocaleString()}</span>
                </div>
              )}
              {isInvoice && inv && inv.balance === 0 && (
                <div className="flex justify-between text-sm font-black text-emerald-600 bg-emerald-50 rounded-xl p-2 mt-1">
                  <span>FULLY PAID</span>
                  <span>✓</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Remarks ── */}
          {(doc as any).remarks && (
            <div className="p-4 rounded-2xl bg-muted/20 border border-border/20">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Remarks</p>
              <p className="text-xs font-medium text-muted-foreground">{(doc as any).remarks}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
