"use client";

import React from "react";
import { useSuppliers } from "../hooks/use-scm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  MoreVertical,
  Plus,
  Search,
  ChevronRight,
  TrendingUp,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SupplierDirectory: React.FC = () => {
  const { suppliers } = useSuppliers();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Supplier Management</h1>
          <p className="text-muted-foreground mt-1">Directory of Thai and local vendors for motor parts procurement.</p>
        </div>
        <Button className="bg-primary rounded-full px-6 shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Onboard Supplier
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-border/50 backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, country, or code..." 
            className="pl-10 bg-background border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary h-11"
          />
        </div>
        <Button variant="outline" className="border-border bg-background rounded-xl">Thailand (2)</Button>
        <Button variant="outline" className="border-border bg-background rounded-xl">Philippines (1)</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="group overflow-hidden border-primary/5 bg-card/50 backdrop-blur-md hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/5">
            <CardHeader className="pb-4 relative">
              <div className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/10">
                  <span className="text-xl font-black text-primary">{supplier.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-extrabold">{supplier.name}</CardTitle>
                    <Badge variant="outline" className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/5 border-emerald-500/10">
                      Active
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1.5 mt-0.5">
                    <Globe className="h-3 w-3" /> {supplier.country} • {supplier.code}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="grid grid-cols-2 gap-3 py-4 border-y border-border/40">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Avg Lead Time
                  </p>
                  <p className="text-sm font-black">{supplier.avgLeadTimeDays} Days</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                    <CreditCard className="h-3 w-3" /> Payment Terms
                  </p>
                  <p className="text-sm font-black">{supplier.paymentTerms}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm pt-2">
                <div className="flex items-center gap-3 text-muted-foreground group/link hover:text-primary transition-colors cursor-pointer">
                  <Mail className="h-4 w-4" />
                  <span className="font-medium">{supplier.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">{supplier.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground leading-snug">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="font-medium text-[13px]">{supplier.address}</span>
                </div>
              </div>

              <Button variant="secondary" className="w-full mt-4 bg-muted/50 hover:bg-primary hover:text-primary-foreground font-bold transition-all h-10 rounded-xl">
                Purchase History <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SupplierDirectory;
