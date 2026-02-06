import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  percentage?: number;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const KPICard = ({ title, value, icon: Icon, subtitle, percentage, color = 'hsl(var(--primary))', trend }: KPICardProps) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const pct = percentage ?? 0;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <Card className="border-border/50 bg-card hover:bg-muted/50 transition-colors">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          {/* Donut Ring */}
          {percentage !== undefined ? (
            <div className="relative shrink-0">
              <svg width="68" height="68" viewBox="0 0 68 68">
                <circle cx="34" cy="34" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="5" />
                <circle
                  cx="34" cy="34" r={radius} fill="none"
                  stroke={color} strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 34 34)"
                  className="transition-all duration-700"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
                {pct}%
              </span>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-muted">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {trend && (
                <span className={`text-xs font-medium ${trend.isPositive ? 'text-accent' : 'text-destructive'}`}>
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value).toFixed(1)}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
