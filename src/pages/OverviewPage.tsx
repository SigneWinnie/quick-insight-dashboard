import { Building, DollarSign, Home, TrendingUp, Droplets } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";
import { calculateMetrics } from "@/lib/houseData";
import { useMemo } from "react";
import KPICard from "@/components/dashboard/KPICard";
import FilterPanel from "@/components/dashboard/FilterPanel";
import BedroomsChart from "@/components/dashboard/BedroomsChart";
import PriceCategoryChart from "@/components/dashboard/PriceCategoryChart";
import ConditionChart from "@/components/dashboard/ConditionChart";

const OverviewPage = () => {
  const { filteredData, isLoading } = useDashboard();
  
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
  
  return (
    <div className="space-y-6">
      <FilterPanel />
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Properties"
          value={metrics.totalProperties.toLocaleString()}
          icon={Building}
        />
        <KPICard
          title="Average Price"
          value={formatPrice(metrics.avgPrice)}
          icon={DollarSign}
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
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BedroomsChart />
        <PriceCategoryChart />
      </div>
      
      {/* Full Width Chart */}
      <ConditionChart />
    </div>
  );
};

export default OverviewPage;
