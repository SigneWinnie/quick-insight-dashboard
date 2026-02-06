import ZipcodeChart from "@/components/dashboard/ZipcodeChart";
import ZipcodeVolumeChart from "@/components/dashboard/ZipcodeVolumeChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/contexts/DashboardContext";
import { groupByZipcode } from "@/lib/houseData";
import { useMemo } from "react";
import { MapPin, DollarSign, Home, TrendingUp } from "lucide-react";

const LocationAnalysisPage = () => {
  const { filteredData } = useDashboard();
  
  const topZipcodes = useMemo(() => groupByZipcode(filteredData).slice(0, 5), [filteredData]);
  
  const formatPrice = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };
  
  return (
    <div className="space-y-5">
      {/* Top Zipcodes */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {topZipcodes.map((zip, index) => (
          <Card key={zip.zipcode} className="border-border/50 bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  index === 0 ? 'bg-primary/20 text-primary' :
                  index === 1 ? 'bg-muted text-muted-foreground' :
                  index === 2 ? 'bg-destructive/20 text-destructive' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span className="font-semibold text-sm text-foreground">{zip.zipcode}</span>
              </div>
              <p className="text-lg font-bold text-primary">{formatPrice(zip.avgPrice)}</p>
              <p className="text-[10px] text-muted-foreground">{zip.count} properties</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ZipcodeChart />
        <ZipcodeVolumeChart />
      </div>
      
      {/* Insights */}
      <Card className="border-border/50 bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Location Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Highest Avg Price</span>
              </div>
              {topZipcodes[0] && (
                <>
                  <p className="text-2xl font-bold text-primary">{topZipcodes[0].zipcode}</p>
                  <p className="text-xs text-muted-foreground">{formatPrice(topZipcodes[0].avgPrice)} average</p>
                </>
              )}
            </div>
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Home className="h-4 w-4 text-accent" />
                <span className="font-medium text-sm">Most Active Market</span>
              </div>
              {(() => {
                const byVolume = [...topZipcodes].sort((a, b) => b.count - a.count);
                return byVolume[0] && (
                  <>
                    <p className="text-2xl font-bold text-accent">{byVolume[0].zipcode}</p>
                    <p className="text-xs text-muted-foreground">{byVolume[0].count} sales</p>
                  </>
                );
              })()}
            </div>
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-chart-4" />
                <span className="font-medium text-sm">Geographic Coverage</span>
              </div>
              <p className="text-2xl font-bold text-chart-4">{groupByZipcode(filteredData).length}</p>
              <p className="text-xs text-muted-foreground">unique zipcodes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationAnalysisPage;
