"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  MoreVertical,
  ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PRList: React.FC = () => {
  
  // Mock PRs for the prototype
  const mockPRs = [
    {
      id: "pr-001",
      prNumber: "PR-2026-001",
      requester: "Juan Dela Cruz",
      date: "2026-04-10",
      status: "APPROVED",
      priority: "HIGH",
      itemCount: 5,
      totalEstValue: 125000
    },
    {
      id: "pr-002",
      prNumber: "PR-2026-002",
      requester: "Maria Santos",
      date: "2026-04-12",
      status: "SUBMITTED",
      priority: "NORMAL",
      itemCount: 2,
      totalEstValue: 45000
    },
    {
      id: "pr-003",
      prNumber: "PR-2026-003",
      requester: "Juan Dela Cruz",
      date: "2026-04-14",
      status: "DRAFT",
      priority: "NORMAL",
      itemCount: 12,
      totalEstValue: 280000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT": return "bg-zinc-500/10 text-zinc-600 border-zinc-200";
      case "SUBMITTED": return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "APPROVED": return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      case "REJECTED": return "bg-rose-500/10 text-rose-600 border-rose-200";
      case "CONVERTED": return "bg-purple-500/10 text-purple-600 border-purple-200";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Requisitions</h1>
          <p className="text-muted-foreground">Internal demand requests waiting for approval and PO conversion.</p>
        </div>
        <Button className="bg-primary px-6 shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Create Request
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/5 bg-card/50">
          <CardHeader className="py-4">
            <CardDescription className="text-[10px] font-black uppercase tracking-widest">Active Requests</CardDescription>
            <CardTitle className="text-2xl font-black">{mockPRs.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-emerald-500/10 bg-card/50">
          <CardHeader className="py-4">
            <CardDescription className="text-[10px] font-black uppercase tracking-widest">Awaiting Approval</CardDescription>
            <CardTitle className="text-2xl font-black text-blue-500">1</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-primary/5 bg-card/50">
          <CardHeader className="py-4">
            <CardDescription className="text-[10px] font-black uppercase tracking-widest">Urgent Fulfillment</CardDescription>
            <CardTitle className="text-2xl font-black text-rose-500">1</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Requisition Ledger</CardTitle>
                <CardDescription>Track the lifecycle from draft to PO fulfillment.</CardDescription>
              </div>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search PR or Requester..."
                className="pl-8 bg-background/50"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-primary/10">
                <TableHead>PR Number</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Date Filed</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Est. Value (PHP)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPRs.map((pr) => (
                <TableRow key={pr.id} className="hover:bg-primary/5 border-primary/5 cursor-pointer group">
                  <TableCell className="font-black text-primary group-hover:underline">{pr.prNumber}</TableCell>
                  <TableCell className="font-bold">{pr.requester}</TableCell>
                  <TableCell className="text-muted-foreground font-medium text-xs">{pr.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${pr.priority === 'HIGH' ? 'border-rose-500 text-rose-600 bg-rose-50' : 'border-zinc-200'} text-[10px] font-black uppercase`}>
                      {pr.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-black text-xs">
                    {pr.totalEstValue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(pr.status)} font-black uppercase text-[10px]`}>
                      {pr.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-black text-lg">System Suggestion</h4>
            <p className="text-sm text-muted-foreground">We found 8 SKUs currently below reorder point. Would you like to generate a draft PR?</p>
          </div>
        </div>
        <Button className="font-bold rounded-xl" variant="secondary">
          Review Suggestions <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PRList;
