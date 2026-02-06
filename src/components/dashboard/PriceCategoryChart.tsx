import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useDashboard } from "@/contexts/DashboardContext";
import { groupByPriceCategory } from "@/lib/houseData";
import { useMemo } from "react";

const COLORS = ['hsl(36, 90%, 55%)', 'hsl(160, 60%, 45%)', 'hsl(200, 70%, 50%)', 'hsl(0, 72%, 55%)'];

const PriceCategoryChart = () => {
  const { filteredData } = useDashboard();
  
  const data = useMemo(() => groupByPriceCategory(filteredData), [filteredData]);
  
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Price Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data} cx="50%" cy="50%"
                innerRadius={65} outerRadius={100}
                paddingAngle={3} dataKey="count" nameKey="category"
                label={({ category, percentage }) => `${category}: ${percentage.toFixed(1)}%`}
                labelLine={false}
                stroke="hsl(220, 18%, 14%)" strokeWidth={2}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(220, 18%, 16%)',
                  border: '1px solid hsl(220, 15%, 22%)',
                  borderRadius: '10px',
                  color: 'hsl(0, 0%, 95%)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
                }}
                formatter={(value: number, name: string) => [`${value.toLocaleString()} properties`, name]}
              />
              <Legend 
                wrapperStyle={{ fontSize: '11px', color: 'hsl(220, 10%, 55%)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceCategoryChart;
