import { Users, UserMinus, TrendingDown, Calendar } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import AgeGroupChart from "@/components/dashboard/AgeGroupChart";
import TenureChart from "@/components/dashboard/TenureChart";
import DepartmentChart from "@/components/dashboard/DepartmentChart";
import logo from "@/assets/green-destinations-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img 
              src={logo} 
              alt="Green Destinations" 
              className="h-12 object-contain"
            />
            <h1 className="text-xl md:text-2xl font-bold text-center flex-1">
              HR Attrition Analysis Dashboard
            </h1>
            <div className="w-12" /> {/* Spacer for balance */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Total Employees"
            value="1,470"
            icon={Users}
          />
          <KPICard
            title="Employees Left"
            value="237"
            icon={UserMinus}
          />
          <KPICard
            title="Attrition Rate"
            value="16.1%"
            icon={TrendingDown}
          />
          <KPICard
            title="Avg Age of Leavers"
            value="33.6"
            icon={Calendar}
            subtitle="years"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AgeGroupChart />
          <TenureChart />
        </div>

        {/* Department Chart - Full Width */}
        <DepartmentChart />
      </main>

      {/* Footer */}
      <footer className="bg-primary/5 border-t border-primary/20 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Green Destinations HR Analytics • Employee Attrition Analysis
        </div>
      </footer>
    </div>
  );
};

export default Index;
