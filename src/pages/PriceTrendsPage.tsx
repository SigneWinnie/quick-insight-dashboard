import PriceTrendChart from "@/components/dashboard/PriceTrendChart";
import SalesVolumeChart from "@/components/dashboard/SalesVolumeChart";
import GradeChart from "@/components/dashboard/GradeChart";
import PriceVsSqftChart from "@/components/dashboard/PriceVsSqftChart";

const PriceTrendsPage = () => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PriceTrendChart />
        <SalesVolumeChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <GradeChart />
        <PriceVsSqftChart />
      </div>
    </div>
  );
};

export default PriceTrendsPage;
