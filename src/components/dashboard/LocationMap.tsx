import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/contexts/DashboardContext";
import { groupByZipcode } from "@/lib/houseData";
import { useMemo, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LocationMap = () => {
  const { filteredData } = useDashboard();
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);

  const zipcodeData = useMemo(() => groupByZipcode(filteredData), [filteredData]);

  const maxCount = useMemo(() => Math.max(...zipcodeData.map(z => z.count), 1), [zipcodeData]);
  const maxPrice = useMemo(() => Math.max(...zipcodeData.map(z => z.avgPrice), 1), [zipcodeData]);

  const getRadius = (count: number) => {
    const min = 5, max = 20;
    return min + (count / maxCount) * (max - min);
  };

  const getColor = (avgPrice: number) => {
    const ratio = avgPrice / maxPrice;
    if (ratio > 0.75) return 'hsl(36, 90%, 55%)';
    if (ratio > 0.5) return 'hsl(160, 60%, 45%)';
    if (ratio > 0.25) return 'hsl(200, 70%, 50%)';
    return 'hsl(220, 15%, 50%)';
  };

  const formatPrice = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [47.5, -122.2],
      zoom: 10,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when data changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Add new markers
    zipcodeData.forEach((zip) => {
      const color = getColor(zip.avgPrice);
      const marker = L.circleMarker([zip.lat, zip.long], {
        radius: getRadius(zip.count),
        color,
        fillColor: color,
        fillOpacity: 0.6,
        weight: 1.5,
      }).addTo(map);

      marker.bindTooltip(
        `<div style="font-size:11px"><b>Zipcode: ${zip.zipcode}</b><br/>Avg Price: ${formatPrice(zip.avgPrice)}<br/>Properties: ${zip.count}</div>`,
        { direction: 'top' }
      );

      markersRef.current.push(marker);
    });
  }, [zipcodeData, maxCount, maxPrice]);

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Property Distribution Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="h-[350px] rounded-lg overflow-hidden" />
        <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: 'hsl(36, 90%, 55%)' }} /> Premium</div>
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: 'hsl(160, 60%, 45%)' }} /> Mid-High</div>
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: 'hsl(200, 70%, 50%)' }} /> Mid</div>
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: 'hsl(220, 15%, 50%)' }} /> Affordable</div>
          <span className="ml-2">● Size = sales volume</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationMap;
