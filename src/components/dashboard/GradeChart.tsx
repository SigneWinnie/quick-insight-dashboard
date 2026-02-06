import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useDashboard } from "@/contexts/DashboardContext";
import { groupByGrade } from "@/lib/houseData";
import { useMemo } from "react";

const COLORS = ['hsl(0, 72%, 55%)', 'hsl(20, 80%, 50%)', 'hsl(36, 90%, 55%)', 'hsl(50, 80%, 50%)', 'hsl(80, 60%, 45%)', 'hsl(120, 50%, 45%)', 'hsl(160, 60%, 45%)', 'hsl(180, 50%, 45%)', 'hsl(200, 70%, 50%)', 'hsl(220, 60%, 55%)', 'hsl(260, 50%, 55%)', 'hsl(280, 60%, 55%)'];

const GradeChart = () => {
  const { filteredData } = useDashboard();
  const data = useMemo(() => groupByGrade(filteredData), [filteredData]);
  
  const formatPrice = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };
  
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Price Impact by Property Grade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" vertical={false} />
              <XAxis dataKey="grade" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatPrice} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(220, 18%, 16%)', border: '1px solid hsl(220, 15%, 22%)', borderRadius: '10px', color: 'hsl(0, 0%, 95%)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                formatter={(value: number, name: string) => [
                  name === 'avgPrice' ? `$${value.toLocaleString()}` : value.toLocaleString(),
                  name === 'avgPrice' ? 'Avg Price' : 'Count'
                ]}
                labelFormatter={(label) => `Grade ${label}`}
              />
              <Bar dataKey="avgPrice" name="Avg Price" radius={[6, 6, 0, 0]}>
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

export default GradeChart;
