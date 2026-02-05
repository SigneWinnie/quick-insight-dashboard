import FilterPanel from "@/components/dashboard/FilterPanel";
import PropertyTable from "@/components/dashboard/PropertyTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/contexts/DashboardContext";
import { useMemo } from "react";
import { Info, TrendingUp, TrendingDown, Star } from "lucide-react";

const PropertyDetailsPage = () => {
  const { filteredData } = useDashboard();
  
  const stats = useMemo(() => {
    if (filteredData.length === 0) return null;
    
    const prices = filteredData.map(d => d.price).sort((a, b) => a - b);
    const median = prices[Math.floor(prices.length / 2)];
    const min = prices[0];
    const max = prices[prices.length - 1];
    
    const avgBedrooms = filteredData.reduce((sum, d) => sum + d.bedrooms, 0) / filteredData.length;
    const avgBathrooms = filteredData.reduce((sum, d) => sum + d.bathrooms, 0) / filteredData.length;
    const avgGrade = filteredData.reduce((sum, d) => sum + d.grade, 0) / filteredData.length;
    
    const waterfrontCount = filteredData.filter(d => d.waterfront).length;
    
    return { median, min, max, avgBedrooms, avgBathrooms, avgGrade, waterfrontCount };
  }, [filteredData]);
  
  const formatPrice = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };
  
  return (
    <div className="space-y-6">
      <FilterPanel />
      
      {/* Quick Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-primary/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Info className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Median Price</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatPrice(stats.median)}</p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Lowest Price</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatPrice(stats.min)}</p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Highest Price</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatPrice(stats.max)}</p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-accent-foreground" />
                <span className="text-sm text-muted-foreground">Avg Grade</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.avgGrade.toFixed(1)}</p>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Property Table */}
      <PropertyTable />
      
      {/* Summary Stats */}
      {stats && (
        <Card className="border-primary/20 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">
              Dataset Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Avg Bedrooms</p>
                <p className="font-semibold text-foreground">{stats.avgBedrooms.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg Bathrooms</p>
                <p className="font-semibold text-foreground">{stats.avgBathrooms.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Waterfront Properties</p>
                <p className="font-semibold text-foreground">{stats.waterfrontCount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Records</p>
                <p className="font-semibold text-foreground">{filteredData.length.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertyDetailsPage;
