import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";

const PropertyTable = () => {
  const { filteredData } = useDashboard();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  
  const searchedData = useMemo(() => {
    if (!searchTerm) return filteredData;
    const term = searchTerm.toLowerCase();
    return filteredData.filter(d => 
      d.zipcode.includes(term) || d.id.toLowerCase().includes(term) || d.priceCategory.toLowerCase().includes(term)
    );
  }, [filteredData, searchTerm]);
  
  const totalPages = Math.ceil(searchedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = searchedData.slice(startIndex, startIndex + itemsPerPage);
  
  const formatDate = (date: Date) => date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const formatPrice = (price: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Property List
          </CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by zipcode, ID..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="pl-9 h-8 text-xs bg-muted border-border"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 border-b border-border/50">
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Date</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Price</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Beds</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Baths</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Area (Sqft)</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Grade</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Zipcode</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((property) => (
                <TableRow key={property.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <TableCell className="text-xs">{formatDate(property.date)}</TableCell>
                  <TableCell className="font-medium text-primary text-xs">{formatPrice(property.price)}</TableCell>
                  <TableCell className="text-xs">{property.bedrooms}</TableCell>
                  <TableCell className="text-xs">{property.bathrooms}</TableCell>
                  <TableCell className="text-xs">{property.sqft_living.toLocaleString()}</TableCell>
                  <TableCell className="text-xs">{property.grade}</TableCell>
                  <TableCell className="text-xs">{property.zipcode}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      property.priceCategory === 'Luxury' ? 'bg-primary/20 text-primary' :
                      property.priceCategory === 'Premium' ? 'bg-accent/20 text-accent' :
                      property.priceCategory === 'Mid-Range' ? 'bg-chart-4/20 text-chart-4' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {property.priceCategory}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, searchedData.length)} of {searchedData.length.toLocaleString()}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-7 w-7 p-0 border-border">
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <span className="text-xs text-muted-foreground">
              {currentPage} / {totalPages}
            </span>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-7 w-7 p-0 border-border">
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyTable;
