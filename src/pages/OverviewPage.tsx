import { Building, DollarSign, TrendingUp, Droplets } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";
import { calculateMetrics } from "@/lib/houseData";
import { useMemo } from "react";
import KPICard from "@/components/dashboard/KPICard";
import BedroomsChart from "@/components/dashboard/BedroomsChart";
import PriceCategoryChart from "@/components/dashboard/PriceCategoryChart";
import ConditionChart from "@/components/dashboard/ConditionChart";

const OverviewPage = () => {
  const { filteredData, allData, isLoading } = useDashboard();
  
  const metrics = useMemo(() => {
    if (filteredData.length === 0) return null;
    return calculateMetrics(filteredData);
  }, [filteredData]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!metrics) return null;
  
  const formatPrice = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };
  
  const formatValue = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const filteredPct = Math.round((filteredData.length / allData.length) * 100);
  
  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Properties"
          value={metrics.totalProperties.toLocaleString()}
          icon={Building}
          percentage={filteredPct}
          color="hsl(var(--chart-1))"
        />
        <KPICard
          title="Average Price"
          value={formatPrice(metrics.avgPrice)}
          icon={DollarSign}
          percentage={Math.min(Math.round(metrics.avgPrice / 10000), 100)}
          color="hsl(var(--chart-2))"
        />
        <KPICard
          title="Total Market Value"
          value={formatValue(metrics.totalValue)}
          icon={TrendingUp}
        />
        <KPICard
          title="Waterfront Premium"
          value={`+${metrics.waterfrontPremium.toFixed(0)}%`}
          icon={Droplets}
          subtitle="vs non-waterfront"
          percentage={Math.min(Math.round(metrics.waterfrontPremium), 100)}
          color="hsl(var(--chart-4))"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BedroomsChart />
        <PriceCategoryChart />
      </div>
      
      <ConditionChart />
    </div>
  );
};

export default OverviewPage;
