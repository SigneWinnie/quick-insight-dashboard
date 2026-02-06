import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";
import { useDashboard } from "@/contexts/DashboardContext";
import { getPriceVsSqft } from "@/lib/houseData";
import { useMemo } from "react";

const PriceVsSqftChart = () => {
  const { filteredData } = useDashboard();
  const data = useMemo(() => getPriceVsSqft(filteredData), [filteredData]);
  
  const formatPrice = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };
  
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Price vs. Square Footage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" />
              <XAxis type="number" dataKey="sqft" name="Sqft" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(0)}K` : val} />
              <YAxis type="number" dataKey="price" name="Price" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatPrice} />
              <ZAxis range={[30, 80]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3', stroke: 'hsl(220, 10%, 30%)' }}
                contentStyle={{ backgroundColor: 'hsl(220, 18%, 16%)', border: '1px solid hsl(220, 15%, 22%)', borderRadius: '10px', color: 'hsl(0, 0%, 95%)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                formatter={(value: number, name: string) => [
                  name === 'Price' ? `$${value.toLocaleString()}` : `${value.toLocaleString()} sqft`, name
                ]}
              />
              <Scatter data={data} fill="hsl(36, 90%, 55%)" fillOpacity={0.5} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceVsSqftChart;
