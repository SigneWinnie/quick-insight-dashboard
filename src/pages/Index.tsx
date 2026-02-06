import { useState } from "react";
import { DashboardProvider } from "@/contexts/DashboardContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import OverviewPage from "./OverviewPage";
import PriceTrendsPage from "./PriceTrendsPage";
import LocationAnalysisPage from "./LocationAnalysisPage";
import PropertyDetailsPage from "./PropertyDetailsPage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("overview");
  
  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return <OverviewPage />;
      case "price-trends":
        return <PriceTrendsPage />;
      case "location":
        return <LocationAnalysisPage />;
      case "details":
        return <PropertyDetailsPage />;
      default:
        return <OverviewPage />;
    }
  };
  
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar Navigation */}
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader currentPage={currentPage} onNavigate={setCurrentPage} />
          
          <main className="flex-1 px-6 py-5">
            {renderPage()}
          </main>
          
          <footer className="border-t border-border/50 py-3 px-6">
            <div className="text-center text-xs text-muted-foreground">
              Real Estate Analytics Dashboard • House Price Prediction Dataset
            </div>
          </footer>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Index;
