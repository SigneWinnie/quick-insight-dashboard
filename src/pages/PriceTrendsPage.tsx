import FilterPanel from "@/components/dashboard/FilterPanel";
import PriceTrendChart from "@/components/dashboard/PriceTrendChart";
import SalesVolumeChart from "@/components/dashboard/SalesVolumeChart";
import GradeChart from "@/components/dashboard/GradeChart";
import PriceVsSqftChart from "@/components/dashboard/PriceVsSqftChart";

const PriceTrendsPage = () => {
  return (
    <div className="space-y-6">
      <FilterPanel />
      
      {/* Price Over Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriceTrendChart />
        <SalesVolumeChart />
      </div>
      
      {/* Price Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GradeChart />
        <PriceVsSqftChart />
      </div>
    </div>
  );
};

export default PriceTrendsPage;
