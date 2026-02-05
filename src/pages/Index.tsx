import { useState } from "react";
import { DashboardProvider } from "@/contexts/DashboardContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
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
      <div className="min-h-screen bg-background">
        <DashboardHeader currentPage={currentPage} onNavigate={setCurrentPage} />
        
        <main className="container mx-auto px-4 py-6">
          {renderPage()}
        </main>
        
        <footer className="bg-primary/5 border-t border-primary/20 py-4 mt-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            Real Estate Analytics Dashboard • House Price Prediction Dataset Analysis
          </div>
        </footer>
      </div>
    </DashboardProvider>
  );
};

export default Index;
