import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useDashboard } from "@/contexts/DashboardContext";
import { groupByMonth } from "@/lib/houseData";
import { useMemo } from "react";

const SalesVolumeChart = () => {
  const { filteredData } = useDashboard();
  const data = useMemo(() => groupByMonth(filteredData), [filteredData]);
  
  const formatMonth = (month: string) => {
    const [year, m] = month.split('-');
    const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${names[parseInt(m) - 1]} ${year.slice(2)}`;
  };
  
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Sales Volume by Month
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={formatMonth} interval={1} />
              <YAxis tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(220, 18%, 16%)', border: '1px solid hsl(220, 15%, 22%)', borderRadius: '10px', color: 'hsl(0, 0%, 95%)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                formatter={(value: number) => [`${value.toLocaleString()} sales`, 'Volume']}
                labelFormatter={formatMonth}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="hsl(160, 60%, 45%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesVolumeChart;
