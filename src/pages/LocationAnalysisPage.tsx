import FilterPanel from "@/components/dashboard/FilterPanel";
import ZipcodeChart from "@/components/dashboard/ZipcodeChart";
import ZipcodeVolumeChart from "@/components/dashboard/ZipcodeVolumeChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/contexts/DashboardContext";
import { groupByZipcode } from "@/lib/houseData";
import { useMemo } from "react";
import { MapPin, DollarSign, Home, TrendingUp } from "lucide-react";

const LocationAnalysisPage = () => {
  const { filteredData } = useDashboard();
  
  const topZipcodes = useMemo(() => {
    return groupByZipcode(filteredData).slice(0, 5);
  }, [filteredData]);
  
  const formatPrice = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };
  
  return (
    <div className="space-y-6">
      <FilterPanel />
      
      {/* Top Zipcodes Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {topZipcodes.map((zip, index) => (
          <Card key={zip.zipcode} className="border-primary/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-gray-100 text-gray-600' :
                  index === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-primary/10 text-primary'
                }`}>
                  {index + 1}
                </div>
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">{zip.zipcode}</span>
              </div>
              <p className="text-lg font-bold text-primary">{formatPrice(zip.avgPrice)}</p>
              <p className="text-xs text-muted-foreground">{zip.count} properties</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Zipcode Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ZipcodeChart />
        <ZipcodeVolumeChart />
      </div>
      
      {/* Location Insights */}
      <Card className="border-primary/20 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Location Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="font-medium">Highest Avg Price</span>
              </div>
              {topZipcodes[0] && (
                <>
                  <p className="text-2xl font-bold text-primary">{topZipcodes[0].zipcode}</p>
                  <p className="text-sm text-muted-foreground">{formatPrice(topZipcodes[0].avgPrice)} average</p>
                </>
              )}
            </div>
            
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Home className="h-5 w-5 text-primary" />
                <span className="font-medium">Most Active Market</span>
              </div>
              {(() => {
                const byVolume = [...topZipcodes].sort((a, b) => b.count - a.count);
                return byVolume[0] && (
                  <>
                    <p className="text-2xl font-bold text-primary">{byVolume[0].zipcode}</p>
                    <p className="text-sm text-muted-foreground">{byVolume[0].count} sales</p>
                  </>
                );
              })()}
            </div>
            
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">Geographic Coverage</span>
              </div>
              <p className="text-2xl font-bold text-primary">{groupByZipcode(filteredData).length}</p>
              <p className="text-sm text-muted-foreground">unique zipcodes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationAnalysisPage;
