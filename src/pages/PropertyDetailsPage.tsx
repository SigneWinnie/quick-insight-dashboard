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
    const avgBedrooms = filteredData.reduce((sum, d) => sum + d.bedrooms, 0) / filteredData.length;
    const avgBathrooms = filteredData.reduce((sum, d) => sum + d.bathrooms, 0) / filteredData.length;
    const avgGrade = filteredData.reduce((sum, d) => sum + d.grade, 0) / filteredData.length;
    const waterfrontCount = filteredData.filter(d => d.waterfront).length;
    return { median, min: prices[0], max: prices[prices.length - 1], avgBedrooms, avgBathrooms, avgGrade, waterfrontCount };
  }, [filteredData]);
  
  const formatPrice = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };
  
  return (
    <div className="space-y-5">
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Info, label: 'Median Price', value: formatPrice(stats.median), color: 'text-primary' },
            { icon: TrendingDown, label: 'Lowest Price', value: formatPrice(stats.min), color: 'text-destructive' },
            { icon: TrendingUp, label: 'Highest Price', value: formatPrice(stats.max), color: 'text-accent' },
            { icon: Star, label: 'Avg Grade', value: stats.avgGrade.toFixed(1), color: 'text-primary' },
          ].map((item) => (
            <Card key={item.label} className="border-border/50 bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</span>
                </div>
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <PropertyTable />
      
      {stats && (
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Dataset Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              {[
                { label: 'Avg Bedrooms', value: stats.avgBedrooms.toFixed(1) },
                { label: 'Avg Bathrooms', value: stats.avgBathrooms.toFixed(2) },
                { label: 'Waterfront', value: stats.waterfrontCount.toLocaleString() },
                { label: 'Total Records', value: filteredData.length.toLocaleString() },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-base">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertyDetailsPage;
