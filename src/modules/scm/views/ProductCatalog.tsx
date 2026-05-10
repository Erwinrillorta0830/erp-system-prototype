"use client";

import React, { useState } from "react";
import { useProducts } from "../hooks/use-scm";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, Package, Filter, MoreVertical, 
  ArrowUpDown, Download, Plus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProductCatalog: React.FC = () => {
  const { products, categories, uoms, addProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPartOpen, setIsAddPartOpen] = useState(false);

  // Form State
  const [newPart, setNewPart] = useState<{
    sku: string;
    partNumberThai: string;
    description: string;
    categoryId: string;
    uomId: string;
    weight: string;
    brand: string;
    srp: string;
  }>({
    sku: "",
    partNumberThai: "",
    description: "",
    categoryId: "",
    uomId: "",
    weight: "0",
    brand: "",
    srp: "0",
  });

  const handleSavePart = () => {
    if (!newPart.sku || !newPart.description) return;
    
    addProduct({
      id: `prod-${Date.now()}`,
      sku: newPart.sku,
      partNumberThai: newPart.partNumberThai,
      description: newPart.description,
      categoryId: newPart.categoryId,
      uomId: newPart.uomId,
      weight: parseFloat(newPart.weight) || 0,
      brand: newPart.brand || "Generic",
      srp: parseFloat(newPart.srp) || 0,
      dimensions: { length: 0, width: 0, height: 0 },
      minOrderQty: 10,
      primarySupplierId: "sup-001"
    });
    
    setIsAddPartOpen(false);
    setNewPart({
      sku: "", partNumberThai: "", description: "", 
      categoryId: "", uomId: "", weight: "0", brand: "", srp: "0"
    });
  };

  const filteredProducts = products.filter(product => 
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.partNumberThai.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || id;
  const getUomName = (id: string) => uoms.find(u => u.id === id)?.abbreviation || id;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Catalog</h1>
          <p className="text-muted-foreground">Manage and view all motor parts imported from Thailand.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Dialog open={isAddPartOpen} onOpenChange={setIsAddPartOpen}>
            <DialogTrigger render={
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" /> Add Part
              </Button>
            } />
            <DialogContent className="sm:max-w-[600px] border-primary/20 bg-card/95 backdrop-blur-xl rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tight text-primary flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xi bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                    <Package className="h-5 w-5" />
                  </div>
                  Register New Part
                </DialogTitle>
                <DialogDescription className="font-medium text-muted-foreground">
                  Add a new motor part imported from Thailand to your master catalog.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">PH SKU</label>
                    <Input 
                      placeholder="e.g. SKU-123456"
                      value={newPart.sku}
                      onChange={(e) => setNewPart(prev => ({ ...prev, sku: e.target.value }))}
                      className="h-12 rounded-xl bg-background/50 border-primary/10 focus-visible:ring-primary/20 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Thai Part Number</label>
                    <Input 
                      placeholder="e.g. TH-998-X"
                      value={newPart.partNumberThai}
                      onChange={(e) => setNewPart(prev => ({ ...prev, partNumberThai: e.target.value }))}
                      className="h-12 rounded-xl bg-background/50 border-primary/10 focus-visible:ring-primary/20 font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Part Description</label>
                  <Input 
                    placeholder="Full descriptive name of the part..."
                    value={newPart.description}
                    onChange={(e) => setNewPart(prev => ({ ...prev, description: e.target.value }))}
                    className="h-12 rounded-xl bg-background/50 border-primary/10 focus-visible:ring-primary/20 font-bold"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Brand</label>
                    <Input 
                      placeholder="e.g. Honda, Yamaha, Brembo..."
                      value={newPart.brand}
                      onChange={(e) => setNewPart(prev => ({ ...prev, brand: e.target.value }))}
                      className="h-12 rounded-xl bg-background/50 border-primary/10 focus-visible:ring-primary/20 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Retail Price (SRP)</label>
                    <Input 
                      type="number"
                      placeholder="e.g. 1500"
                      value={newPart.srp}
                      onChange={(e) => setNewPart(prev => ({ ...prev, srp: e.target.value }))}
                      className="h-12 rounded-xl bg-background/50 border-primary/10 focus-visible:ring-primary/20 font-bold"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category</label>
                    <Select 
                      value={newPart.categoryId}
                      onValueChange={(val) => setNewPart(prev => ({ ...prev, categoryId: val ?? "" }))}
                    >
                      <SelectTrigger className="h-12 rounded-xl bg-background/50 border-primary/10 focus:ring-primary/20">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-primary/10 bg-card/95 backdrop-blur-xl">
                        {categories.map(c => (
                          <SelectItem key={c.id} value={c.id} className="font-bold text-xs">{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">UoM</label>
                      <Select 
                        value={newPart.uomId}
                        onValueChange={(val) => setNewPart(prev => ({ ...prev, uomId: val ?? "" }))}
                      >
                        <SelectTrigger className="h-12 rounded-xl bg-background/50 border-primary/10 focus:ring-primary/20">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-primary/10 bg-card/95 backdrop-blur-xl">
                          {uoms.map(u => (
                            <SelectItem key={u.id} value={u.id} className="font-bold text-xs">{u.abbreviation}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Weight (kg)</label>
                      <Input 
                        type="number"
                        value={newPart.weight}
                        onChange={(e) => setNewPart(prev => ({ ...prev, weight: e.target.value }))}
                        className="h-12 rounded-xl bg-background/50 border-primary/10 focus-visible:ring-primary/20 font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="ghost" className="font-bold rounded-xl" onClick={() => setIsAddPartOpen(false)}>Cancel</Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 font-black rounded-xl px-8 shadow-lg shadow-primary/20"
                  onClick={handleSavePart}
                  disabled={!newPart.sku || !newPart.description}
                >
                  Save to Catalog
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total SKUs</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Master Parts List</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search SKU, Part#, or Desc..."
                  className="pl-8 bg-background/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-primary/10">
                <TableHead>SKU / Thai Part#</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>UoM</TableHead>
                <TableHead className="text-right">Weight</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-primary/5 border-primary/5">
                  <TableCell className="font-medium">
                    <div>{product.sku}</div>
                    <div className="text-xs text-muted-foreground">{product.partNumberThai}</div>
                  </TableCell>
                  <TableCell className="max-w-md truncate">
                    {product.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                      {getCategoryName(product.categoryId)}
                    </Badge>
                  </TableCell>
                  <TableCell>{getUomName(product.uomId)}</TableCell>
                  <TableCell className="text-right">{product.weight} kg</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      } />
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Specs</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Archive Part</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCatalog;
