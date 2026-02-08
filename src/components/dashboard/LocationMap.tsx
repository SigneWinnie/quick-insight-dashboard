import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/contexts/DashboardContext";
import { groupByZipcode } from "@/lib/houseData";
import { useMemo, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationMap = () => {
  const { filteredData } = useDashboard();
  
  const zipcodeData = useMemo(() => groupByZipcode(filteredData), [filteredData]);
  
  const maxCount = useMemo(() => Math.max(...zipcodeData.map(z => z.count), 1), [zipcodeData]);
  const maxPrice = useMemo(() => Math.max(...zipcodeData.map(z => z.avgPrice), 1), [zipcodeData]);
  
  const getRadius = (count: number) => {
    const min = 5, max = 20;
    return min + (count / maxCount) * (max - min);
  };
  
  const getColor = (avgPrice: number) => {
    const ratio = avgPrice / maxPrice;
    if (ratio > 0.75) return 'hsl(36, 90%, 55%)';   // gold - expensive
    if (ratio > 0.5) return 'hsl(160, 60%, 45%)';    // green - mid-high
    if (ratio > 0.25) return 'hsl(200, 70%, 50%)';   // blue - mid
    return 'hsl(220, 15%, 50%)';                      // gray - affordable
  };
  
  const formatPrice = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };

  // Center on King County, WA (dataset location)
  const center: [number, number] = [47.5, -122.2];

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Property Distribution Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] rounded-lg overflow-hidden">
          <MapContainer
            center={center}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {zipcodeData.map((zip) => (
              <CircleMarker
                key={zip.zipcode}
                center={[zip.lat, zip.long]}
                radius={getRadius(zip.count)}
                pathOptions={{
                  color: getColor(zip.avgPrice),
                  fillColor: getColor(zip.avgPrice),
                  fillOpacity: 0.6,
                  weight: 1.5,
                }}
              >
                <Tooltip direction="top" opacity={0.95}>
                  <div className="text-xs">
                    <p className="font-bold">Zipcode: {zip.zipcode}</p>
                    <p>Avg Price: {formatPrice(zip.avgPrice)}</p>
                    <p>Properties: {zip.count}</p>
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
        <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(36, 90%, 55%)' }} /> Premium</div>
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(160, 60%, 45%)' }} /> Mid-High</div>
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(200, 70%, 50%)' }} /> Mid</div>
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(220, 15%, 50%)' }} /> Affordable</div>
          <span className="ml-2">● Size = sales volume</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationMap;
