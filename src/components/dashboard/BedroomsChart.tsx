import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useDashboard } from "@/contexts/DashboardContext";
import { groupByBedrooms } from "@/lib/houseData";
import { useMemo } from "react";

const COLORS = ['hsl(36, 90%, 55%)', 'hsl(160, 60%, 45%)', 'hsl(0, 72%, 55%)', 'hsl(200, 70%, 50%)', 'hsl(280, 60%, 55%)', 'hsl(36, 70%, 45%)'];

const BedroomsChart = () => {
  const { filteredData } = useDashboard();
  
  const data = useMemo(() => {
    return groupByBedrooms(filteredData).filter(d => d.bedrooms >= 1 && d.bedrooms <= 6);
  }, [filteredData]);
  
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Properties by Bedrooms
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" vertical={false} />
              <XAxis 
                dataKey="bedrooms" 
                tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }}
                axisLine={{ stroke: 'hsl(220, 15%, 20%)' }}
                tickLine={false}
                tickFormatter={(val) => `${val} BR`}
              />
              <YAxis 
                tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(220, 18%, 16%)',
                  border: '1px solid hsl(220, 15%, 22%)',
                  borderRadius: '10px',
                  color: 'hsl(0, 0%, 95%)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
                }}
                formatter={(value: number, name: string) => [
                  name === 'count' ? `${value.toLocaleString()} properties` : `$${value.toLocaleString()}`,
                  name === 'count' ? 'Count' : 'Avg Price'
                ]}
                labelFormatter={(label) => `${label} Bedrooms`}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BedroomsChart;
