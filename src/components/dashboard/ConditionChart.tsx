import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useDashboard } from "@/contexts/DashboardContext";
import { groupByCondition } from "@/lib/houseData";
import { useMemo } from "react";

const COLORS = ['hsl(0, 72%, 55%)', 'hsl(36, 90%, 55%)', 'hsl(50, 80%, 50%)', 'hsl(160, 60%, 45%)', 'hsl(200, 70%, 50%)'];

const ConditionChart = () => {
  const { filteredData } = useDashboard();
  const data = useMemo(() => groupByCondition(filteredData), [filteredData]);
  
  const formatPrice = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };
  
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Average Price by Condition
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 80, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatPrice} />
              <YAxis type="category" dataKey="label" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(220, 18%, 16%)', border: '1px solid hsl(220, 15%, 22%)', borderRadius: '10px', color: 'hsl(0, 0%, 95%)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Avg Price']}
              />
              <Bar dataKey="avgPrice" radius={[0, 6, 6, 0]}>
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

export default ConditionChart;
