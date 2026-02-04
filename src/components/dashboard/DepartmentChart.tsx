import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";

const data = [
  { department: "R&D", count: 133, percentage: "13.8%" },
  { department: "Sales", count: 92, percentage: "20.6%" },
  { department: "HR", count: 12, percentage: "19.0%" },
];

const DepartmentChart = () => {
  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Attrition by Department
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              layout="vertical"
              margin={{ top: 20, right: 80, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis 
                type="number"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                type="category"
                dataKey="department" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 14 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                width={50}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value} employees (${props.payload.percentage})`, 
                  'Left'
                ]}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {data.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`hsl(var(--chart-${(index % 3) + 1}))`}
                  />
                ))}
                <LabelList 
                  dataKey="percentage" 
                  position="right" 
                  fill="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentChart;
