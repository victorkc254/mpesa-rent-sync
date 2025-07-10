
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar, MobileMenuTrigger } from "@/components/AppSidebar";
import Dashboard from "@/components/Dashboard";
import PropertyManagement from "@/components/PropertyManagement";
import PaymentTracking from "@/components/PaymentTracking";
import BillManagement from "@/components/BillManagement";
import Reports from "@/components/Reports";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "properties":
        return <PropertyManagement />;
      case "payments":
        return <PaymentTracking />;
      case "bills":
        return <BillManagement />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-green-50 via-white to-yellow-50">
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3">
                  <MobileMenuTrigger activeTab={activeTab} setActiveTab={setActiveTab} />
                  <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">R</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                      RentEasy
                    </h1>
                    <p className="text-sm text-gray-500">The Landlord's Chill Pill</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    🇰🇪 Kenya
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
